<?php

use App\Events\LivePriceUpdater;
use App\Jobs\UpdateCryptoPrices;
use App\Jobs\UpdateExchangeRates;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Foundation\Application;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Http\Response;

/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| The first thing we will do is create a new Laravel application instance
| which serves as the "glue" for all the components of Laravel, and is
| the IoC container for the system binding all of the various parts.
|
*/

$app = Application::configure(basePath: $_ENV['APP_BASE_PATH'] ?? dirname(__DIR__))
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        //
    })->withExceptions(function (Exceptions $exceptions) {
        $exceptions->respond(function ($response) {
            if ($response->getStatusCode() === 419) {
                Log::info('there was an error ' . $response->getContent());
                return back()->with([
                    'toast' => [
                        'type'
                    ],
                ]);
            }

            return $response;
        });
    })->withSchedule(function (Schedule $schedule) {
        //---- update
        $schedule->job(new UpdateCryptoPrices('market-data'))->everyFiveMinutes();
        //--- update the historical data of the wallets
        $schedule->job(new UpdateCryptoPrices('historical-data'))->dailyAt('1:00');
        //--- update the exchange rates of the cryptomus api
        $schedule->job(new UpdateExchangeRates())->everyTenSeconds();
    })->create();


/*
|--------------------------------------------------------------------------
| Bind Important Interfaces
|--------------------------------------------------------------------------
|
| Next, we need to bind some important interfaces into the container so
| we will be able to resolve them when needed. The kernels serve the
| incoming requests to this application from both the web and CLI.
|
*/

$app->singleton(
    Illuminate\Contracts\Http\Kernel::class,
    App\Http\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Console\Kernel::class,
    App\Console\Kernel::class
);

$app->singleton(
    Illuminate\Contracts\Debug\ExceptionHandler::class,
    App\Exceptions\Handler::class
);


// $app->useEnvironmentPath(realpath(__DIR__ . '/../vendor/markury/src/'));

/*
|--------------------------------------------------------------------------
| Return The Application
|--------------------------------------------------------------------------
|
| This script returns the application instance. The instance is given to
| the calling script so we can separate the building of the instances
| from the actual running of the application and sending responses.
|
*/

return $app;
