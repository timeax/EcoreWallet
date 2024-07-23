<?php

namespace App\Models;

use Auth;
use Cryptomus;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DepositAddress extends Model
{
    use HasFactory;

    protected $hidden = [
        'wallet_uuid',
        'url_id'
    ];

    protected $guarded = [];

    public function curr()
    {
        return $this->belongsTo(Currency::class, 'currency_id')->withDefault(['code' => 'BTC']);
    }

    public static function initiateUser(User $user, Cryptomus $cryptomus)
    {
        $gs = Generalsetting::first();
        $networks = $cryptomus->services() ?? [];
        $id = $user->id;

        //--------
        $base_id = $id * strtotime('now');

        foreach ($networks as $key => $network) {
            $network_name = $network->get('network');
            $curr_id = $network->get('currency_id');
            $url_id = $base_id * ($key + 2);

            $url_hook = route('cryptomus.deposit.webhooks', [
                'url_id' => $url_id,
                'key' => $gs->webhook_uuid,
                'user_id' => $id
            ]);

            if (self::where(['user_id' => $id, 'network' => $network_name, 'currency_id' => $curr_id])->count() > 0) continue;

            $wallet = $cryptomus->createWallet(
                $network_name,
                $network->get('currency'),
                $url_hook
            );

            self::create([
                'url_id' => $url_id,
                'network' => $network_name,
                'currency_id' => $curr_id,
                'user_id' => $id,
                'uuid' => $wallet['uuid'],
                'address' => $wallet['address'],
                'wallet_uuid' => $wallet['wallet_uuid']
            ]);
        }
    }
}
