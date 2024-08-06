<?php

use App\Jobs\QuitQueue;
use App\Jobs\UpdateCryptoPrices;
use App\Jobs\UpdateExchangeRates;
use App\Models\Escrow;
use App\Models\GeckoCoins;
use App\Models\Job;
use App\Models\QueueCache;
use App\Models\User;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

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
    UpdateCryptoPrices::dispatch('historical-data');
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


Artisan::command('rates', function () {
    UpdateExchangeRates::dispatch();
});


Artisan::command('escrows', function () {
    Escrow::all()->each(function (Escrow $escrow) {
        $status = $escrow->transaction?->status;
        if (is_null($status)) return;
        if ($status !== 'pending') $escrow->delete();
    });
});

function forceStop(string $name)
{
    QuitQueue::dispatch()->onQueue($name);
}
//------------------------
Artisan::command('supervisor {name}', function (string $name) {
    $values = compact('name');
    //=---
    $cache = QueueCache::where($values)->first();
    //-------
    if ($cache) {
        $at = strtotime($cache->created_at);
        $this->info($at);
        if ($at < $at + 6000) return;

        $job = Job::where(['queue' => $name])->first();

        if ($job) {
            $created = (int) $job->created_at;
            //---
            $diff = strtotime('now') - $created;
            if (($diff / 1000) >= 25) {
                //----- force stop any queues running on this
                forceStop($name);
                //-----
                $cache->delete();
                Artisan::call("supervisor $name");
            }
        } else forceStop($name);


        return 1;
    } else $cache = QueueCache::create($values);

    //------
    Artisan::call("queue:work --queue=$name");
    //----
    $cache->delete();
});

Artisan::command('live:rates', function () {
    Artisan::call('supervisor exchange-rates');
});

Artisan::command('live:notifications', function () {
    Artisan::call('supervisor default');
});

Artisan::command('quit {name=all}', function (string $name) {
    if ($name == 'all') {
        Job::where(['queue' => 'exchange-rates'])->where(['attempts' => 0])->where("created_at", '<', strtotime('-10 seconds'))->delete();

        Artisan::call("queue:restart");
        Artisan::call("queue:restart");
        Artisan::call("queue:restart");
        Artisan::call("queue:restart");
        //-----
        QueueCache::truncate();
        return;
    }

    forceStop($name);

    QueueCache::where(compact('name'))->delete();
});
