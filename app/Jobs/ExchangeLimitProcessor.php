<?php

namespace App\Jobs;

use App\Models\Currency;
use App\Models\Exchange;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

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

        // foreach ($this->rates as $key => $value ) {
        //     if($key == 'id')             Log::info(json_encode($value));
        // }
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
                $from = $limit->from;
                //---------
                $curr = $currs->firstWhere('id', $from);

                if ($curr) {
                    $match = null;
                    $rates = json_decode($this->rates['rates']);

                    foreach ($rates as $rate) {
                        if ($rate->to === $curr->code) {
                            $match = $rate;
                            break;
                        }
                    }


                    if ($match) {
                        Log::info($rateLimit . " $match->course");
                        if ($rateLimit <= $match->course) {
                            $rate = (float) $match->course;
                            //----
                            $limit->rate = $rate;
                            $limit->status = 'success';
                            $limit->save();
                        }
                    }
                }
            }
        }
    }
}
