<?php

namespace App\Models;

use App\Helpers\Notifications;
use App\Notifications\NotifyMail;
use App\Notifications\SystemNotification;
use App\Notifications\TransactionNotifications;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Deposit extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function currency()
    {
        return $this->belongsTo(Currency::class, 'currency_id')->withDefault(['code' => 'BTC']);
    }
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function escrow()
    {
        return $this->belongsTo(Escrow::class, 'transaction_ref', 'ref');
    }

    protected static function boot()
    {
        parent::boot();
        static::created(function (self $deposit) {
            $user = User::find($deposit->user_id);
            $status = $deposit->status;
            //-------
            Transaction::create([
                'trnx'    => $deposit->txid,
                'user_id' => $deposit->user_id,
                'charge'  => 0.0, //$deposit->charge,
                'amount'  => numFormat($deposit->total_amount, 8),
                'remark'  => 'deposit',
                'currency_id'  => $deposit->currency_id,
                'ref' => $deposit->cryptomus_uuid,
                'type'    => '+',
                'status' => $status,
                'details' => translate(getStatusMessage($status, 'Deposit'))
            ]);

            $user->notify(Notifications::deposit($deposit));
        });

        static::saved(function ($deposit) {
            if ($deposit->status == 'pending') return;
            //----------
            $user = User::find($deposit->user_id);

            Transaction::where(['uuid' => $deposit->cryptomus_uuid])->findOrCreate([
                'trnx'    => $deposit->txid,
                'user_id' => $deposit->user_id,
                'charge'  =>  0.0, //$deposit->charge,
                'amount'  => numFormat($deposit->total_amount, 8),
                'remark'  => 'deposit',
                'currency_id'  => $deposit->currency_id,
                'ref' => $deposit->cryptomus_uuid,
                'type'    => '+',
                'details' => getStatusMessage($deposit->status, 'Deposit')
            ], ['status' => $deposit->status]);

            $user->notify(Notifications::deposit($deposit));
        });
    }

    static private function resolvePending(self $deposit, User $user)
    {
        $status = $deposit->status;
        $wallet = $user->wallets()->where(['currency_id' => $deposit->currency_id])->first();

        if ($status === 'pending') {
            return Escrow::create([
                'type' => 'in',
                'ref' => $deposit->cryptomus_uuid,
                'user_id' => $deposit->user_id,
                'wallet_id' => $wallet->id,
                'transaction_ref' => $deposit->ref,
                'amount' => $deposit->amount
            ]);
        }

        $escrow = $deposit->escrow()->first();

        if ($escrow) $escrow->delete();
    }
}
