<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class Supervisor extends Command
{

    protected $signature = 'app:supervisor {type=default}';
    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Watch queues and restart when necessary';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        /**
         * @var string
         */
        $type = $this->argument('type');
        //--------
        //----
        Artisan::call("queue:work --queue=$type --max-jobs=1000");
        //------
        $this->info("Command was successful");
        //------------
    }

    public function key()
    {
        return $this->argument('type') . '-supervisor';
    }



    protected function promptForMissingArgumentsUsing(): array
    {
        return [
            'user' => 'Which queue do you wish to supervise?',
        ];
    }
}
