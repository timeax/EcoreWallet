<?php

namespace App\Models;

use App\Notifications\TransactionNotifications;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Withdrawals extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function currency()
    {
        return $this->belongsTo(Currency::class, 'currency_id')->withDefault();
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    protected static function boot()
    {
        parent::boot();
        static::created(function ($withdraw) {
            $user = User::find($withdraw->user_id);
            $transaction = Transaction::create([
                'trnx' => $withdraw->trx,
                'ref' => $withdraw->trx,
                'user_id' => $withdraw->user_id,
                'charge' => $withdraw->charge,
                'amount' => numFormat($withdraw->amount, 8),
                'remark' => 'withdraw_money',
                'currency_id' => $withdraw->currency_id,
                'type' => '-',
                'status' => 'pending',
                'details' => translate('Withdraw requested.')
            ]);

            $wallet = $user->wallets()->where(['crypto_id' => $withdraw->currency_id])->first();

            Escrow::create([
                'transaction_ref' => $transaction->ref,
                'amount' => $transaction->amount,
                'type' => 'out',
                'user_id' => $user->id,
                'wallet_id' => @$wallet->id
            ]);

            $user->notify(new TransactionNotifications($transaction));
        });

        static::saved(function (self $withdraw) {
            if ($withdraw->status == 0) return;
            $escrow = $withdraw->escrow()->first();
            @$escrow->delete();
        });
    }

    public function escrow()
    {
        return $this->belongsTo(Escrow::class, 'trx', 'transaction_ref');
    }

    public function transaction()
    {
        return $this->belongsTo(Transaction::class, 'trx', 'ref');
    }
}
