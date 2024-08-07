<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

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
        $schedule->command('rates')->runInBackground()->everyFiveSeconds()->withoutOverlapping();
        $schedule->command('live:notifications')->runInBackground()->withoutOverlapping()->everyMinute();
        $schedule->command('market-data')->runInBackground()->withoutOverlapping()->everyFiveMinutes();
        $schedule->command('historical')->runInBackground()->withoutOverlapping()->dailyAt('1:00');
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
