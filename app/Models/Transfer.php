<?php

namespace App\Models;

use App\Helpers\Notifications;
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
            $user = User::find($transfer->user_id);
            $curr = $transfer->currency_id;
            $ref = $transfer->transaction_ref;
            //---
            $status = $transfer->status;
            //----
            $amount = $transfer->amount;
            //----------
            Transaction::create([
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

            $user->notify(Notifications::transfer($transfer));
        });
    }
}
