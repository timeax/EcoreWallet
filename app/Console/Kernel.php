<?php

namespace App\Console;

use App\Jobs\UpdateCryptoPrices;
use App\Jobs\UpdateExchangeRates;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Illuminate\Support\Facades\Log;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('live:rates')->runInBackground()->withoutOverlapping()->everyThirtySeconds();
        $schedule->command('live:notifications')->runInBackground()->withoutOverlapping()->everyThirtySeconds();
        $schedule->command('queue:work --queue=market --once --stop-when-empty')->runInBackground()->everyMinute();
        // $schedule->command('supervisor limiting')->runInBackground()->everyThirtySeconds();

        $schedule->command('quit')->everyTwoMinutes();

        //---- update
        $schedule->job(new UpdateCryptoPrices('market-data'))->everyFiveMinutes();
        //--- update the historical data of the wallets
        $schedule->job(new UpdateCryptoPrices('historical-data'))->dailyAt('1:00');
        //--- update the exchange rates of the cryptomus api
        $schedule->job(new UpdateExchangeRates)->everyFiveSeconds();
        //------------
        // $schedule->command('queue:monitor database:exchange-rates,database:limiting --max=12')->everyMinute();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
