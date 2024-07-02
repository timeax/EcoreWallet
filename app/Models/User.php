<?php

namespace App\Models;

use App\Events\EmailVerificationSent;
use Cryptomus;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var string[]
     */
    protected $fillable = [
        'name',
        'email',
        'photo',
        'phone',
        'country',
        'city',
        'email_verified',
        'verification_link',
        'address',
        'status',
        'zip',
        'password',
    ];

    protected $casts = ['kyc_info' => 'object'];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }

    public function wallets()
    {
        return $this->hasMany(Wallet::class, 'user_id');
    }

    public function chats()
    {
        return $this->hasMany(Chat::class);
    }

    public function chat()
    {
        return $this->belongsTo(Chat::class, 'chat_ref');
    }

    public function trades()
    {
        return $this->hasMany(Trade::class, 'offer_user_id');
    }
    public function offers()
    {
        return $this->hasMany(Offer::class, 'user_id');
    }
    public function completedTrade()
    {
        return Trade::where(function ($q) {
            $q->where('offer_user_id', $this->id)->orWhere('trader_id', $this->id);
        })->where('status', 3)->count();
    }


    protected static function boot()
    {
        parent::boot();
        static::created(function ($user) {
            LoginLogs::create([
                'user_id' => auth()->id(),
                'ip' => @loginIp()->geoplugin_request,
                'country' => @loginIp()->geoplugin_countryName,
                'city' => @loginIp()->geoplugin_city,
            ]);
        });
    }

    public function tickets()
    {
        return @$this->hasMany(SupportTicket::class)->with('messages');
    }

    public function hasAddedAddress()
    {
        if ($this) {
            return isset($this->city) && isset($this->address) && $this->country;
        }

        return false;
    }

    public function sendEmailVerificationNotification()
    {
        $gs = Generalsetting::first();

        if ($gs->is_verify == 1) {
            $this->verify_code = randNum();
            $this->save();

            @email([
                'email'   => $this->email,
                'name'    => $this->name,
                'subject' => translate('Email Verification Code'),
                'message' => translate('Email Verification Code is : ') . $this->verify_code,
            ]);

            session()->flash('emailcode_sent_at', strtotime('now'));
            session()->flash('status', 'sent');
            session()->flash('code', $this->verify_code);
            // event(new EmailVerificationSent($this));
        }
    }

    public function markEmailAsVerified()
    {
        $code = session('verification_code');
        //--------
        if (isset($this->verify_code)) {
            if ($code == $this->verify_code) {
                $this->verify_code = null;
                $this->email_verified = true;
                $this->save();
                //------
                return true;
            }

            return false;
        }

        return false;
    }

    public function initiateUser(Cryptomus $cryptomus)
    {
        $currencies = Currency::where('type', 2)->get(['id', 'code']);
        foreach ($currencies as $curr) {
            $exist = $this->wallets()->where('crypto_id', $curr->id)->first();
            if (!$exist) {
                Wallet::create([
                    'user_id' => auth()->id(),
                    'crypto_id' => $curr->id,
                    'balance' => 0
                ]);
            }
        }

        DepositAddress::initiateUser($this, $cryptomus);
    }

    public function addresses()
    {
        return $this->hasMany(DepositAddress::class);
    }

    public function receivesBroadcastNotificationsOn(): string
    {
        return 'user.' . $this->id;
    }
}
