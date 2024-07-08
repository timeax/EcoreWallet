<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    use HasFactory;
    protected $guarded = [];

    protected $appends = ['all_balance', 'transactions'];

    public function curr()
    {
        return $this->belongsTo(Currency::class, 'crypto_id')->withDefault();
    }

    public function escrow()
    {
        return $this->hasMany(Escrow::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    protected function transactions(): Attribute
    {
        $curr = $this->curr->id;
        $all = $this->user->transactions();

        return new Attribute(
            get: fn() => $all->where(['currency_id' => $curr])->get()
        );
    }

    protected function allBalance(): Attribute
    {
        $escrows = $this->escrow()->with('transaction')->get();
        $balance = $this->balance;
        ///-----
        $total_in = 0;
        $total_out = 0;
        $sum = 0.0;

        foreach ($escrows as $value) {
            $amount = $value->amount;
            $sum += $amount;
            //---------
            if ($value->type === 'in') $total_in += ($amount - $value->charge);
            else $total_out += ($amount + $value->charge);
        }

        return new Attribute(
            get: fn () => ([
                "total" => numFormat($balance + $total_in, 8),
                "available" => numFormat($balance - $total_out, 8),
                'escrow' => numFormat($sum, 8)
            ])
        );
    }
}
