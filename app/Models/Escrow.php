<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Broadcast;

class Escrow extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected static function boot()
    {
        parent::boot();

        // static::saved(function (self $escrow) {
        //     $escrow->reload();
        // });

        static::deleted(function (self $escrow) {
            $transaction = $escrow->transaction()->firstOrFail();
            $wallet = $escrow->wallet()->firstOrFail();
            //--------
            $status = $transaction->status;
            $charge = (float) $transaction->charge;
            $type = $escrow->type;
            //--------
            if ($status === 'failed') return;
            //--------
            $balance = (float) $wallet->balance;
            //-------
            if ($type === 'in') $balance += (float) $escrow->amount;
            else $balance -= (float) $escrow->amount;
            //-----
            $wallet->balance = $balance - $charge;
            //------
            $wallet->save();
            $escrow->reload();
        });
    }

    private function reload()
    {
        Broadcast::private('users.' . $this->user->id)
            ->as('DataRefresh')
            ->sendNow();
    }
    public function transaction()
    {
        return $this->hasOne(Transaction::class, 'ref', 'transaction_ref');
    }

    public function wallet()
    {
        return $this->belongsTo(Wallet::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
