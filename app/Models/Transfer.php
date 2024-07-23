<?php

namespace App\Models;

use App\Notifications\TransactionNotifications;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transfer extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected static function boot()
    {
        parent::boot();

        static::saved(function (self $transfer) {
            $to = User::find($transfer->to);
            $user = User::find($transfer->user_id);
            $curr = $transfer->currency_id;
            $ref = $transfer->transaction_ref;
            //---
            $status = $transfer->status;
            //----
            $amount = $transfer->amount;
            //------
            $wallet = $user->wallets()->where(['crypto_id' => $curr])->first();
            $toWallet = $to->wallets()->where(['crypto_id' => $curr])->first();
            //--------
            if ($wallet && $toWallet && $status == 'pending') {
                //---
                $wallet->balance -= $amount;
                $toWallet->balance += $amount;
                //--------
                $wallet->save();
                $toWallet->save();
                //---

                $send = Transaction::create([
                    'trnx' => $ref,
                    'ref' => $ref . $user->id,
                    'user_id' => $user->id,
                    'charge' => 0.00,
                    'currency_id' => $curr,
                    'remark' => 'transfer',
                    'details' => getStatusMessage($status, 'Exchange'),
                    'status' => $status,
                    'type' => '-',
                    'amount' => $amount
                ]);

                $receive = Transaction::create([
                    'trnx' => $ref,
                    'ref' => $ref . $to->id,
                    'user_id' => $to->id,
                    'charge' => 0.00,
                    'currency_id' => $curr,
                    'remark' => 'transfer',
                    'details' => getStatusMessage($status, 'Transfer from ' . $user->account_no),
                    'status' => $status,
                    'type' => '+',
                    'amount' => $amount
                ]);

                $user->notify(new TransactionNotifications($send));
                $to->notify(new TransactionNotifications($receive));
            } else {
                $transaction = Transaction::create([
                    'trnx' => $ref,
                    'ref' => $ref . $user->id,
                    'user_id' => $user->id,
                    'charge' => 0.00,
                    'currency_id' => $curr,
                    'remark' => 'transfer',
                    'details' => getStatusMessage($status, 'Transfer'),
                    'status' => $status,
                    'type' => '-',
                    'amount' => $amount
                ]);

                $user->notify(new TransactionNotifications($transaction));
            }
        });
    }
}
