<?php

namespace App\Jobs;

use App\Events\LivePriceUpdater;
use App\Models\Admin;
use App\Models\Currency;
use App\Models\HistoricalData;
use App\Models\MarketData;
use App\Notifications\SystemNotification;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Client\Response as ClientResponse;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;
use Str;

class UpdateCryptoPrices implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public array $data = [];
    public string $names;
    public array $store = [];
    public string $href;
    public function __construct(public string $type)
    {
        //
        $this->run($type);
    }

    private function buildLink(string $coins)
    {
        $curr = @Currency::where(['default' => '1'])->first()->code;
        $def = @Str::lower($curr) ?? 'usd';
        return "https://api.coingecko.com/api/v3/coins/markets?vs_currency={$def}&ids={$coins}&sparkline=true&price_change_percentage=1h%2C24h%2C7d&precision=8";
    }

    private function buildLink2(string $name, string $days = '1')
    {
        $curr = @Currency::where(['default' => '1'])->first()->code;
        $def = @Str::lower($curr) ?? 'usd';
        return "https://api.coingecko.com/api/v3/coins/{$name}/market_chart?vs_currency={$def}&days={$days}&precision=8";
    }

    private function run($type)
    {
        //------
        if ($type == 'historical-data') {
            $this->store = Currency::where(['type' => 2])->take(35)->get()->map(function ($curr) {
                $name = $curr->curr_name;
                $name = Str::lower($name);
                return ['name' => Str::remove(' ', $name), 'id' => $curr->id];
            })->toArray();
        } else {
            $names = Arr::join(Currency::where(['type' => 2])->get()->map(function ($curr) {
                $name = $curr->curr_name;
                $name = Str::lower($name);
                $name = Str::remove(' ', $name);
                //------
                $this->store = Arr::add($this->store, $name, $curr->id);
                return $name;
            })->toArray() ?? [], '%2C');

            $this->href = $this->buildLink($names);
            $this->names = $names;
        }
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        if ($this->type === 'market-data') {
            $this->http(Http::withHeaders([
                'accept' => 'application/json',
                'x-cg-demo-api-key' => 'CG-AehBGrm1z687tSxFmWz4RRNb',
            ])->get($this->href));
        } else {
            foreach ($this->store as $coin) {
                $id = $coin['id'];
                $name = $coin['name'];
                //---
                $num = HistoricalData::where(['currency_id' => $id])->count();
                $days = 1;
                //--------
                if ($num === 0) $days = 360;
                $href = $this->buildLink2($name, $days);
                //-----------
                $this->http(Http::withHeaders([
                    'accept' => 'application/json',
                    'x-cg-demo-api-key' => 'CG-AehBGrm1z687tSxFmWz4RRNb',
                ])->get($href), $id);
            }
        }
    }

    protected function http(ClientResponse $response, $id = null)
    {
        if ($response->ok()) {
            $data = $response->json();

            //-----------
            if ($this->type === 'market-data') {
                foreach ($data as $coin) {
                    $id = $this->store[$coin['id']];
                    //------
                    MarketData::create([
                        'currency_id' => $id,
                        'data' => json_encode($coin)
                    ]);
                }
            } else {
                HistoricalData::create([
                    'currency_id' => $id,
                    'data' => json_encode($data)
                ]);
            }
            //----------
        } else if ($response->tooManyRequests()) {
            $admins = Admin::where(['role' => 'admin'])->get();
            Notification::send($admins, new SystemNotification());
        }
    }
}
