<?php

use App\Jobs\UpdateCryptoPrices;
use App\Jobs\UpdateExchangeRates;
use App\Models\Currency;
use App\Models\GeckoCoins;
use App\Models\User;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('market-data', function () {
    UpdateCryptoPrices::dispatch('market-data');
});

Artisan::command('data', function () {
    UpdateCryptoPrices::dispatch('historical');
    UpdateCryptoPrices::dispatch('market-data');
});

Artisan::command('update-users', function () {
    //-------
    User::all()->each(function ($user) {
        $user->initiateUser(new Cryptomus());
    });
});


Artisan::command('load-gecko', function () {
    $response = Http::withHeaders([
        'accept' => 'application/json',
        'x-cg-demo-api-key' => env('GECKO_KEY'),
    ])->get('https://api.coingecko.com/api/v3/coins/list');

    if ($response->ok()) {
        $data = $response->json();
        foreach ($data as $coin) {
            GeckoCoins::updateOrCreate(['name' => $coin['name']], [
                'name' => $coin['name'],
                'code' => $coin['id'],
                'symbol' => $coin['symbol']
            ]);
        }
    }
});


Artisan::command('rates', function() {
    UpdateExchangeRates::dispatch();
});
