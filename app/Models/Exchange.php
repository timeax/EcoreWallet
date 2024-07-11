<?php

namespace App\Models;

use App\Notifications\TransactionNotifications;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Exchange extends Model
{
    use HasFactory;

    protected $guarded = [];
    protected static function boot()
    {
        parent::boot();
        static::created(function (self $exchange) {
            $type = $exchange->type;
            if ($type == 'instant') return;
            //-----------
            $to = $exchange->to;
            $from = $exchange->from;
            //---------
            $user = User::find($exchange->user_id);
            $transferTo = $user->wallets()->where(['currency_id' => $to->id])->first();
            $transferFrom = $user->wallets()->where(['currency_id' => $from->id])->first();
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
                'currency_id' => $to->id,
                'remark' => 'exchange',
                'details' => 'Pending exchange',
                'status' => $exchange->status,
                'type' => '+',
                'amount' => numFormat($amount * (float) $exchange->rate, 8)
            ]);

            Transaction::create([
                'trnx' => $ref,
                'ref' => $ref . 'out',
                'user_id' => $user->id,
                'charge' => $fee,
                'currency_id' => $from->id,
                'remark' => 'exchange',
                'details' => 'Pending exchange',
                'status' => $exchange->status,
                'type' => '-',
                'amount' => $total
            ]);

            //-------
            Escrow::create([
                'type' => 'in',
                'wallet_id' => $transferTo->id,
                'user_id' => $user->id,
                'transaction_ref' => $ref . 'in',
                'amount' => numFormat($amount * (float) $exchange->rate, 8)
            ]);

            Escrow::create([
                'type' => 'out',
                'wallet_id' => $transferFrom->id,
                'user_id' => $user->id,
                'transaction_ref' => $ref . 'out',
                'amount' => $amount
            ]);

            $user->notify(new TransactionNotifications([
                'remark' => 'exchange',
                'type' => '+-',
                'amount' => $amount,
                'extra' => [
                    'to' => $transferTo->curr->code,
                    'from' => $transferFrom->curr->code,
                    'rate' => $exchange->rate,
                    'fee' => $fee
                ]
            ]));
        });

        static::saved(function (self $exchange) {
            if ($exchange->status == 'pending') return;
            //----
            $user = $exchange->user()->get();
            $transactions = $exchange->transactions()->get();
            foreach ($transactions as $transaction) {
                if ($transaction->status !== 'peniding') return;
                //--------
                $escrow = $transaction->escrow()->get();

                if ($transaction->type === '+') {
                    $amount = numFormat($exchange->amount * (float) $exchange->rate, 8);
                    $transaction->amount = $amount;
                    //---
                    @$escrow->amount = $amount;
                }

                if ($exchange->status !== 'success') $escrow->status = 'failed';

                $transaction->status = $exchange->status;
                $transaction->details = getStatusMessage($exchange->status, 'Exchange');
                //------------------
                $transaction->save();
                @$escrow->save();
            }

            $transactions->each(function ($item) {
                return @$item->escrow()->delete();
            });

            $user->notify(new TransactionNotifications([
                'remark' => 'exchange',
                'type' => '+-',
                'amount' => $exchange->amount,
                'extra' => [
                    'to' => $exchange->to->code,
                    'from' => $exchange->from->code,
                    'rate' => $exchange->rate,
                    'fee' => $exchange->charges
                ],
                'status' => $exchange->status
            ]));
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
        return $this->hasMany(Currency::class, 'id', 'from');
    }
}
