<?php

namespace App\Jobs;

use App\Models\Currency;
use App\Models\Exchange;
use App\Models\Rate;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Arr;

class UpdateExchangeRates implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $tries = 1;
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
    /**
     * Execute the job.
     */
    public function handle(): void
    {
        //--------
        Currency::all()->map(function ($curr) {
            $code = $curr->code;
            $response = Http::get($this->buildLink($code));
            //---------
            if ($response->ok()) {
                $raw = $response['result'];
                $data = json_encode($raw);

                $exchange = Exchange::where(['type' => 'limit', 'status' => 'pending', 'to' => $curr->id])->with('transferFrom')->get();

                if ($exchange) {
                    // ExchangeLimitProcessor::dispatch(['id' => $curr->id, 'rates' => $data]);
                    $this->exchange($curr, $raw, $exchange);
                }
                Rate::updateOrCreate(
                    ['currency_id' => $curr->id],
                    [
                        'currency_id' => $curr->id,
                        'charges' => 0,
                        'rates' => $data
                    ]
                );
            }
        });
    }

    /**
     * @param Collection<int, Exchange> $list
     */
    private function exchange(Currency $curr, array $rates, $list)
    {
        //----------
        foreach ($list as $limit) {
            $time = strtotime('now');
            $expire = $limit->expire_in;
            //---------
            //----------
            if ($time >= $expire) {
                // Log::info("$time -> $expire");
                $limit->status = 'failed';
                $limit->save();
            } else {
                $rateLimit = $limit->rate;
                $from = $limit->transferFrom->code;
                //---------
                if ($curr) {
                    $match = null;
                    // $rates = json_decode($rates['rates']);

                    foreach ($rates as $rate) {
                        if ($rate["to"] === $curr->code && $rate["from"] == $from) {
                            $match = $rate;
                            break;
                        }
                    }


                    if ($match) {
                        if ($rateLimit <= $match->course) {
                            $rate = (float) $match->course;
                            //----
                            // $limit->rate = $rate;
                            $limit->status = 'success';
                            $limit->save();
                        }
                    }
                }
            }
        }
    }
}





 // try {
                //     $historical = HistoricalData::where(['currency_id' => $curr->id])->latest()->first();

                //     $list = Arr::where($raw, function ($data) {
                //         return $data['to'] == Currency::where(['default' => 1])->first()->code;
                //     });

                //     if (!$historical) {
                //         if (HistoricalData::all()->count() == 0) UpdateCryptoPrices::dispatch('historical-data');
                //         else {
                //             if (count($list))
                //                 HistoricalData::create([
                //                     'currency_id' => $curr->id,
                //                     'data' => [
                //                         'live' => [
                //                             [strtotime('now'), Arr::first($list)['course']]
                //                         ]
                //                     ]
                //                 ]);
                //         }
                //     } else {
                //         $data = json_decode($historical->data);

                //         if (count($list)) {
                //             //---
                //             $live = isset($data->live) ? $data->live :  [];
                //             //------
                //             $live[] =  [strtotime('now'), Arr::first($list)['course']];
                //             $data->live = $live;
                //         }

                //         $historical->data = json_encode($data);
                //         $historical->save();
                //     }
                // } catch (\Throwable $th) {
                //     //throw $th;
                //     Log::info('Error from UpdateExchangeRates ' . $th->getMessage());
                // }
