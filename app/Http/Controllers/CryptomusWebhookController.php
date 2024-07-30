<?php

namespace App\Http\Controllers;

use App\Models\Deposit;
use App\Models\User;
use Illuminate\Http\Request;

class CryptomusWebhookController extends Controller
{
    public function recieve(string $key, string $url_id, string $id, Request $req)
    {
        $user = User::findOrFail($id);
        $address = $user->addresses()->where(['url_id' => $url_id])->first();
        //------
        $status = getStatus($req->get('status'));
        $payment_amount = $req->get('payment_amount');
        $uuid = $req->get('uuid');
        //----
        //----
        $wallet = $user->wallets()->where(['crypto_id' => $address->currency_id])->first();
        $previousBalance = (float) $wallet->balance;
        //----
        $wallet->balance = $previousBalance + ((float) $payment_amount);
        $wallet->save();
        //---------
        Deposit::where(['cryptomus_uuid' => $uuid])->firstOrcreate([
            'user_id' => $user->id,
            'currency_id' => $address->currency_id,
            'wallet_address' => $address->address,
            'network' => $address->network,
            'total_amount' => $payment_amount,
            'charge' => $req->get('commission'),
            'cryptomus_uuid' => $uuid,
            'txid' => $req->get('txid'),
            'status' => $status
        ], ['status' => $status]);
    }

    public function send(string $key, string $url_id, string $id)
    {
        return ['status' => 'worked'];
    }
}
