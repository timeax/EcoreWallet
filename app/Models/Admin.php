<?php

namespace App\Models;

use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable
{
    use HasFactory, HasRoles, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */

    protected $guard_name = 'admin';
    protected $fillable = [
        'name',
        'email',
        'email_verify_token',
        'phone',
        'status',
        'role_id',
        'photo'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    public function receivesBroadcastNotificationsOn(): string
    {
        return 'App.Models.Admin.'.$this->id;
    }
}
