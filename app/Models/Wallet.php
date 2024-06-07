<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Wallet extends Model
{
    use HasFactory;
    protected $guarded = [];

    public function curr()
    {
        return $this->belongsTo(Currency::class,'crypto_id')->withDefault();
    }

    public function user() {
        return $this->belongsTo(User::class);
    }
}
