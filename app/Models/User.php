<?php

namespace App\Models;

use App\Notifications\OtpSent;
use App\Notifications\PasswordReset;
use Cryptomus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PragmaRX\Google2FA\Google2FA;


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
        'username',
        'email_verified',
        'verification_link',
        'address',
        'account_no',
        'lang',
        'currency',
        'two_fa',
        'two_fa_status',
        'two_fa_code',
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
        // return $this->hasMany(Chat::class);
    }

    public function chat()
    {
        // return $this->belongsTo(Chat::class, 'chat_ref');
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

            $user->generateTwoStepToken();
        });
    }
    public function expire()
    {
        $this->two_fa_status = 0;
        $this->save();
    }
    public function generateTwoStepToken()
    {
        $user = $this;
        //------
        $google = new Google2FA();
        $secret = $google->generateSecretKey(16, str_pad($user->id, 10, 'X'));
        $qr = $google->getQRCodeUrl(
            config('app.name'),
            config('app.url'),
            $secret
        );

        $user->two_fa_code = $qr;
        $user->two_fa = $secret;
        //---------
        $user->save();
    }

    public function tickets()
    {
        return @$this->hasMany(SupportTicket::class)->with('messages');
    }

    public function hasAddedAddress()
    {
        return $this->kyc_status == 1 || $this->kyc_status == 2;
    }

    public function sendEmailVerificationNotification()
    {
        $gs = Generalsetting::first();

        if ($gs->is_verify == 1) {
            $this->verify_code = randNum();
            $this->save();

            $this->notify(new OtpSent($this->verify_code));

            session(null)->flash('emailcode_sent_at', strtotime('now'));
            session(null)->flash('status', 'sent');
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
                    'user_id' => $this->id,
                    'crypto_id' => $curr->id,
                    'balance' => 0
                ]);
            }
        }

        if (!$this->account_no) {
            $account_no = randNum(6);
            while (User::where(['account_no' => $account_no])->count() > 0) $account_no = randNum(6);
            //------------
            $this->account_no = randNum(6);
            $this->save();
        }

        DepositAddress::initiateUser($this, $cryptomus);
    }

    public function sendPasswordResetNotification($token)
    {
        $this->notify(new PasswordReset($token));
    }

    public function addresses()
    {
        return $this->hasMany(DepositAddress::class);
    }

    public function deposits()
    {
        return $this->hasMany(Deposit::class);
    }

    public function withdrawals()
    {
        return $this->hasMany(Withdrawals::class);
    }

    public function exchanges()
    {
        return $this->hasMany(Exchange::class);
    }

    public function transfers()
    {
        return $this->hasMany(Transfer::class);
    }

    public function receivesBroadcastNotificationsOn(): string
    {
        return 'user.' . $this->id;
    }
}
