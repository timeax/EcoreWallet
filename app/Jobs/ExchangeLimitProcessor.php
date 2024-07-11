<?php

namespace App\Jobs;

use App\Models\Currency;
use App\Models\Exchange;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ExchangeLimitProcessor implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;
    /**
     * Create a new job instance.
     */
    public function __construct(public array $rates)
    {
        $this->onQueue('limiting');
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $currs = Currency::all();
        $list = Exchange::where(['status' => 'pending', 'type' => 'limit'])->get();
        //----------
        foreach ($list as $limit) {
            $time = strtotime('now');
            $expire = $limit->expire_in;
            //----------
            if ($time >= $expire) {
                $limit->status = 'failed';
                $limit->save();
            } else {
                $rateLimit = $limit->rate;
                $from = $limit->from;
                $to = $limit->to;
                //---------
                $curr = $currs->where(['id' => $from]);

                if ($curr) {
                    $match = null;
                    foreach ($this->rates as $rate) {
                        if ($rate['id'] === $to) {
                            foreach ($rate as $item) {
                                if ($item['from'] === $curr->code) {
                                    $match = $item;
                                    break;
                                }
                            }
                            break;
                        }
                    }

                    if ($match) {
                        if ($rateLimit <= $match['course']) {
                            $rate = (float) $match['course'];
                            //----
                            $limit->rate = $rate;
                            $limit->save();
                        }
                    }
                }
            }
        }
    }
}
