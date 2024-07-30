<?php

namespace App\Jobs;

use App\Models\Currency;
use App\Models\Exchange;
use App\Models\Generalsetting;
use App\Models\Rate;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;

class UpdateExchangeRates implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        $this->onQueue('exchange-rates');
    }

    private function buildLink(string $code)
    {
        return "https://api.cryptomus.com/v1/exchange-rate/{$code}/list";
    }

    private function buildLink2(string $name, string $days = '1')
    {
        $curr = @Currency::where(['default' => '1'])->first()->code;
        $def = @str($curr)->lower() ?? 'usd';
        return "https://api.coingecko.com/api/v3/coins/{$name}/market_chart?vs_currency={$def}&days={$days}&precision=8";
    }

    private function addHistoricalData(array $rates = [])
    {
        if(count($rates) > 0) {

        }
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $rate = Generalsetting::first()->exchange_rate ?? 0.02;
        //--------
        Currency::all()->map(function ($curr) use ($rate) {
            $code = $curr->code;
            $response = Http::get($this->buildLink($code));
            //---------
            if ($response->ok()) {
                $data = json_encode($response['result']);

                if (Exchange::where(['status' => 'pending', 'to' => $curr->id])->count() > 0)
                    ExchangeLimitProcessor::dispatch(['id' => $curr->id, 'rates' => $data]);

                $rates = Rate::where(['currency_id' => $curr->id])->first();
                if ($rates) {
                    $rates->charges = $rate;
                    $rates->rates = $data;
                    $rates->save();
                } else Rate::create([
                    'currency_id' => $curr->id,
                    'charges' => $rate,
                    'rates' => $data
                ]);
            }
        })->toArray();
    }
}
