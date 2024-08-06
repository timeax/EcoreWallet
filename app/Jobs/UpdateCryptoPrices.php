<?php

namespace App\Jobs;

use App\Models\Admin;
use App\Models\Currency;
use App\Models\HistoricalData;
use App\Models\MarketData;
use App\Notifications\Mail;
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
    private string $key = '';

    public array $data = [];
    public string $names;
    public array $store = [];
    public string $href;

    /**
     * The number of times the job may be attempted.
     *
     * @var int
     */
    public $tries = 5;

    /**
     * The maximum number of unhandled exceptions to allow before failing.
     *
     * @var int
     */
    public $maxExceptions = 3;

    public function __construct(public string $type, public array $rates = [])
    {
        $this->onQueue('market');
        //
        $this->key = env('GECKO_KEY');
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
            Currency::where(['type' => 2])->take(35)->get()->map(function ($curr) {
                $name = $curr->gecko_id;
                $name = Str::lower($name);

                $this->store = Arr::add($this->store, $name, $curr->id);
            });

            // Log::info(json_encode($this->store));
        } else if ($type == 'market-data') {
            $names = Arr::join(Currency::where(['type' => 2])->get()->map(function ($curr) {
                $name = $curr->gecko_id;
                $name = Str::lower($name);
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
                'x-cg-demo-api-key' => $this->key,
            ])->get($this->href));
        } else if ($this->type == 'historical-data') {
            foreach ($this->store as $name => $id) {
                //---
                $num = HistoricalData::where(['currency_id' => $id])->count();
                $days = 1;
                //--------
                if ($num === 0) $days = 360;
                $href = $this->buildLink2($name, $days);
                //-----------
                $this->http(Http::withHeaders([
                    'accept' => 'application/json',
                    'x-cg-demo-api-key' => $this->key,
                ])->get($href), $id, $name);
            }
        }
    }

    protected function http(ClientResponse $response, $id = null, $name = '')
    {
        if ($response->ok()) {
            $data = $response->json();
            //-----------
            if ($this->type === 'market-data') {
                foreach ($data as $coin) {
                    $id = $this->store[$coin['id']];
                    //------
                    MarketData::updateOrCreate([
                        'currency_id' => $id,
                    ], [
                        'data' => json_encode($coin),
                        'currency_id' => $id,
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
            Notification::send($admins, new Mail('Coingecko Limit exceeded', 'You have exceeded the api call limitations on coin gekco, sign in to the account and check or call your developer'));
        } else {
            Log::info($name);
            Log::info($response->body());
        }
    }
}
