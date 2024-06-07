<?php

use App\Models\Currency;
use App\Models\User;
use Cryptomus\Api\Client;
use Cryptomus\Api\Payment;
use Cryptomus\Api\Payout;
use Illuminate\Support\Collection;

class Cryptomus
{
    private string $api_key;
    private string $payment_key;
    private string $payout_key;
    private string $merchant_id;

    private Payout $payout;
    private Payment $payment;
    public function __construct()
    {
        $this->api_key = config('app.cryptomus_key');
        $this->payment_key = config('app.payment_key');
        $this->payout_key = config('app.payout_key');
        $this->merchant_id = config('app.merchant_id');

        $this->payout = Client::payout($this->payout_key, $this->merchant_id);
        $this->payment = Client::payment($this->payment_key, $this->merchant_id);
    }

    public function services(): array
    {
        $supported = Currency::where(['type' => 2])->get();
        $services = $this->payment->services();
        $serviceList = array();

        foreach ($services as $service) {
            $code = $service['currency'];
            if ($supported->contains('code', $code)) {
                $item = collect($service);
                $item->put('currency_id', $supported->where('code', '=', $code)->first()->id);
                $serviceList[] = $item;
            };
        }

        //-------
        return $serviceList;
    }


    public function createWallet(string $network, string $code, $url = '')
    {
        $user_id = auth()->id();
        return $this->payment->createWallet([
            'network' => $network,
            'currency' => $code,
            'order_id' => (string) $user_id,
            'url_callback' => $url
        ]);
    }
}
