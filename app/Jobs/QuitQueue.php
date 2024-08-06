<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class QuitQueue implements ShouldQueue
{
    use Queueable;

    public $timeout = 1;
    public $tries = 1;
    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        //this force quits
        while (strtotime('now') > strtotime('-20 seconds'));
    }
}
