<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EmailTemplate extends Model
{
    protected $fillable = ['email_type', 'email_subject', 'email_body', 'status', 'codes'];
    public $timestamps = false;
    protected $casts = [
        'codes' => 'object'
    ];
}
