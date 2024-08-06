<?php

namespace App\Http\Controllers;

use App\Helpers\Notifications;
use App\Models\Deposit;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Withdrawals;
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
        Deposit::updateOrCreate(
            ['cryptomus_uuid' => $uuid],
            [
                'user_id' => $user->id,
                'currency_id' => $address->currency_id,
                'wallet_address' => $address->address,
                'network' => $address->network,
                'total_amount' => $payment_amount,
                'charge' => $req->get('commission'),
                'cryptomus_uuid' => $uuid,
                'txid' => $req->get('txid'),
                'status' => $status
            ],
        );

        // $deposit->status = $status;
        // $deposit->save();
    }

    public function send(string $key, string $url_id, string $id, Request $request)
    {
        $user = User::findOrFail($id);
        $order_id = $request->get('order_id');
        // $amount = $request->get('amount');
        $status = getStatus($request->get('status'));
        $txid = $request->get('txid');
        /**
         * @var Withdrawals
         */
        $withdrawal = Withdrawals::where(['ref' => $order_id])->firstOrFail();
        $trans = Transaction::where(['ref' => $order_id])->first();
        //---------
        if ($status == 'pending') return;
        if ($status == 'success') $withdrawal->status = 4;
        else $withdrawal->status = 3;

        $withdrawal->trx = $txid;
        $withdrawal->save();
        $trans->status = 'success';
        $trans->trnx = $txid;
        $trans->save();
        //--------
        $withdrawal->escrow()->delete();
        $user->notify(Notifications::withdraw_request($withdrawal));
    }
}
