<?php

namespace App\Jobs;

use App\Models\Currency;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class NewCurrency implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public Currency $currency)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $users = User::where(['status' => 1])->get();
        //--------
        UpdateCryptoPrices::dispatch('historical-data');
        UpdateCryptoPrices::dispatch('market-data');
        //--------
        $users->each(function ($user) {
            Wallet::create([
                'balance' => 0.00000000,
                'user_id' => $user->id,
                'crypto_id' => $this->currency->id
            ]);
        });
    }
}
