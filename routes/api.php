<?php

use App\Http\Controllers\CryptomusWebhookController;
use App\Http\Middleware\EnsureValidWebhook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::middleware(EnsureValidWebhook::class)->group(function () {
    Route::post(
        '/cryptomus/withdraws/webhook/{key}/{url_id}/{user_id}',
        [CryptomusWebhookController::class, 'send']
    )->name('cryptomus.withdraw.webhooks');

    Route::post(
        '/cryptomus/deposits/webhook/{key}/{url_id}/{user_id}',
        [CryptomusWebhookController::class, 'recieve']
    )->name('cryptomus.deposit.webhooks');
});


Route::post('/webhooks', function (Cryptomus $cryptomus) {
    $cryptomus->setBuilder('payment');
    $stats = $cryptomus->testhook([
        'currency' => 'ETH',
        "url_callback" => "https://66ab-129-205-124-203.ngrok-free.app/api/cryptomus/deposits/webhook/714927ce-c801-4b86-9d98-133bfbe356c4/171750661900/20",
        'network' => 'eth',
        'status' => 'paid'
    ]);

    return compact('stats');
})->name('api.webhook');
