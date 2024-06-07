<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Cryptomus\Api\Client;
use Illuminate\Support\Facades\Http;

class TradeController extends Controller
{
    //
    public function deposit_ui(Request $request, ?string $wallet = '*')
    {
        $user = $request->user();

        $walletRes = Http::get('http://localhost:3000/wallets');
        $currencyRes = Http::get('http://localhost:3000/currencies');

        $wallets = $walletRes->json();
        $currences = $currencyRes->json();

        $wallets = $this->process_wallets($user, $wallets, $currences);

        $payment = Client::payment(config('app.payment_key'), config('app.merchant_id'));

        //---
        $services = $payment->services();

        return Inertia::render('Trade/Deposit', ['wallet' => $wallet, 'services' => $services, 'wallets' => $wallets, 'currencies' => $currences]);
    }

    private function get_payment_methods()
    {
    }

    private function process_wallets(User $user, array $wallets, array $currences)
    {
        $newWallets = array();
        if ($wallets && $currences)
            foreach ($wallets as $wallet) {
                $id = $wallet['crypto_id'];
                $userid = $wallet['user_id'];

                // dd($user->id, $userid);

                if ($userid != $user->id) continue;

                foreach ($currences as $curr) {
                    if ($curr['id'] === $id) {
                        $wallet['curr'] = $curr;
                        // dd($wallet);
                        break;
                    }
                }

                $newWallets[] = $wallet;
            }
        return $newWallets;
    }
}
