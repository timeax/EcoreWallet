<?php

use App\Models\Currency;
use App\Models\User;
use Cryptomus\Api\Client;
use Cryptomus\Api\RequestBuilder;
use Cryptomus\Api\Payment;
use Cryptomus\Api\Payout;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

class Cryptomus
{
    private string $api_key;
    private string $payment_key;
    private string $payout_key;
    private string $merchant_id;

    /**
     * Summary of payout
     * @var Payout
     */
    private Payout $payout;
    private Payment $payment;
    private RequestBuilder $builder;
    private RequestBuilder $build;
    public function __construct()
    {
        $this->api_key = config('app.cryptomus_key');
        $this->payment_key = config('app.payment_key');
        $this->payout_key = config('app.payout_key');
        $this->merchant_id = config('app.merchant_id');

        $this->builder = new RequestBuilder($this->payout_key, $this->merchant_id);


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

    public function payoutServices()
    {
        $services = $this->builder->sendRequest('v1/payout/services');
        $supported = Currency::where(['type' => 2])->get();
        $serviceList = array();

        foreach ($services as $service) {
            $code = $service['currency'];
            if ($supported->contains('code', $code)) {
                $item = collect($service);
                $item->put('currency_id', $supported->where('code', '=', $code)->first()->id);
                $serviceList[] = $item;
            };
        }

        return $serviceList;
    }

    public function testhook(array $data = [])
    {
        return $this->build->sendRequest('v1/test-webhook/payment', $data);
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

    /**
     * @param string $builder
     * @return self
     */
    public function setBuilder(string $builder): self
    {
        if ($builder === 'payment')
            $this->build = new RequestBuilder($this->payment_key, $this->merchant_id);
        else if ($builder === 'payout')
            $this->build = new RequestBuilder($this->payout_key, $this->merchant_id);


        return $this;
    }
}
