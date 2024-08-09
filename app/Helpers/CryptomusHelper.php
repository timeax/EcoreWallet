<?php

use App\Helpers\Notifications;
use App\Models\Admin;
use App\Models\Currency;
use App\Models\Generalsetting;
use App\Models\User;
use App\Models\Withdrawals;
use App\Notifications\NotifyMail;
use Cryptomus\Api\Client;
use Cryptomus\Api\Payment;
use Cryptomus\Api\Payout;
use Cryptomus\Api\RequestBuilder;

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
        try {
            $services = $this->payment->services();
        } catch (\Throwable $th) {
            $message = $th->getMessage();
            //----
            $admins = Admin::where(['role' => 'admin'])->get();
            Notification::sendNow($admins, new NotifyMail('API Error', [
                mText('Hello Admin'),
                mText('The following errors where found when connecting to cryptomus'),
                mText("<b>$message</b>"),
                mText("If you think this a code-based-problem please foward this mail to your developer"),
            ]));

            return [];
        }

        $serviceList = array();
        $supported = Currency::where(['type' => 2])->get();

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
        try {
            $services = @$this->builder->sendRequest('v1/payout/services');
        } catch (\Throwable $th) {
            $message = $th->getMessage();
            //----
            $admins = Admin::where(['role' => 'admin'])->get();
            Notification::sendNow($admins, new NotifyMail('API Error', [
                mText('Hello Admin'),
                mText('The following errors where found when connecting to cryptomus'),
                mText("<b>$message</b>"),
                mText("If you think this a code-based-problem please foward this mail to your developer"),
            ]));

            return [];
        }
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

    public function resendPI(array $data = [])
    {
        return $this->build->sendRequest('v1/payment/resend', $data);
    }

    public function createWallet(string $network, string $code, $url, $user_id)
    {
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

    public function payout(Withdrawals $withdrawals)
    {
        /**
         * @var User $user
         */
        $user = $withdrawals->user;
        $gs = Generalsetting::first();
        $services = false;
        try {
            self::setBuilder('payout');
            $services = @$this->builder->sendRequest('v1/payout', [
                'amount' => $withdrawals->amount,
                'currency' => $withdrawals->currency->code,
                'order_id' => $withdrawals->ref,
                'address' => $withdrawals->wallet_address,
                'is_subtract' => true,
                'network' => $withdrawals->network,
                'url_callback' => route('cryptomus.withdraw.webhooks', [
                    'url_id' => $user->addresses()->first()->url_id,
                    'key' => $gs->webhook_uuid,
                    'user_id' => $user->id
                ])
            ]);
            //----

            if ($services && isset($services["state"]) && $services["state"]) {
                static::sendError($withdrawals, json_encode($services));
            }
        } catch (\Throwable $th) {
            static::sendError($withdrawals, $th->getMessage());
        }

        return $services;
    }

    static function sendError(Withdrawals $withdrawals, string $message)
    {
        session(null)->flash('withdraw', 'fail');
        //----
        $admins = Admin::where(['role' => 'admin'])->get();
        Notification::sendNow($admins, Notifications::apiErrorWithdrawal($withdrawals, $message));
        //---------
    }
}
