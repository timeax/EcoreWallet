<?php

namespace App\Models;

use App\Helpers\Notifications;
use App\Notifications\NotifyMail;
use App\Notifications\SystemNotification;
use App\Notifications\TransactionNotifications;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Log;

class Exchange extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected static function boot()
    {
        parent::boot();
        static::created(function (self $exchange) {
            $type = $exchange->type;
            //-----------
            $to = $exchange->to;
            $from = $exchange->from;
            //---------
            $user = User::find($exchange->user_id);
            $transferTo = $user->wallets()->where(['crypto_id' => $to])->first();
            $transferFrom = $user->wallets()->where(['crypto_id' => $from])->first();
            $ref = $exchange->transaction_id;
            $amount = (float) $exchange->amount;
            $total = $exchange->total;
            $fee = $exchange->charges;
            //---------
            Transaction::create([
                'trnx' => $ref,
                'ref' => $ref . 'in',
                'user_id' => $user->id,
                'charge' => 0.00,
                'currency_id' => $to,
                'remark' => 'exchange',
                'details' => getStatusMessage($exchange->status, 'Exchange'),
                'status' => $exchange->status,
                'type' => '+',
                'amount' => $amount * (float) $exchange->rate
            ]);

            Transaction::create([
                'trnx' => $ref,
                'ref' => $ref . 'out',
                'user_id' => $user->id,
                'charge' => $fee,
                'currency_id' => $from,
                'remark' => 'exchange',
                'details' => getStatusMessage($exchange->status, 'Exchange'),
                'status' => $exchange->status,
                'type' => '-',
                'amount' => $total
            ]);

            //------------
            if ($type == 'instant') return;
            //-------
            Escrow::create([
                'type' => 'in',
                'wallet_id' => $transferTo->id,
                'user_id' => $user->id,
                'transaction_ref' => $ref . 'in',
                'amount' => $amount * (float) $exchange->rate
            ]);

            Escrow::create([
                'type' => 'out',
                'wallet_id' => $transferFrom->id,
                'user_id' => $user->id,
                'transaction_ref' => $ref . 'out',
                'amount' => $amount
            ]);

            @$user->notify(Notifications::exchange($exchange));
        });

        static::saved(function (self $exchange) {
            if ($exchange->status == 'pending') return;
            //----
            $user = $exchange->user()->get();
            $to = $exchange->transferTo;
            $from = $exchange->transferFrom;
            $transactions = $exchange->transactions()->get();

            //------------
            foreach ($transactions as $transaction) {
                if ($transaction->status !== 'pending') return;
                //--------
                $escrow = $transaction->escrow;

                if ($transaction->type === '+') {
                    $amount = $exchange->amount * (float) $exchange->rate;
                    $transaction->amount = $amount;
                    //---
                    @$escrow->amount = $amount;
                } else {
                    // $amount = numFormat($exchange->amount * (float) $exchange->rate, 8);
                    // $transaction->amount = $amount;
                    // //---
                    // @$escrow->amount = $amount;
                }

                $transaction->status = $exchange->status;
                $transaction->details = getStatusMessage($exchange->status, 'Exchange');
                //------------------
                $transaction->save();
                @$escrow->delete();
            }

            $transactions->each(function ($item) {
                return @$item->escrow()->delete();
            });

            @$user->notify(Notifications::exchange($exchange));
        });
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class, 'trnx', 'transaction_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function transferTo()
    {
        return $this->hasOne(Currency::class, 'id', 'to');
    }


    public function transferFrom()
    {
        return $this->hasOne(Currency::class, 'id', 'from');
    }
}
