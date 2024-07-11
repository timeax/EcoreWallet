<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\User\ChatController;
use App\Http\Controllers\User\OnboardingController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\User\SupportTicketController;
use App\Http\Controllers\User\TradeController;
use App\Jobs\UpdateCryptoPrices;
use App\Models\Currency;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::name('user.')->middleware('maintenance')->group(function () {
    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        // Route::post('/chat', function (Cryptomus $cryptomus) {
        //     auth()->user()->initiateUser($cryptomus);
        //     return 'it worked';
        // });

        Route::post('/chat/connect', [ChatController::class, 'create'])->name('chat.connect');

        Route::get('/settings', function () {
            return 'Settings';
        })->name('settings.all');

        Route::get('/support', [SupportTicketController::class, 'view'])->name('support');
        //------
        Route::middleware(['email_verified'])->group(function () {
            Route::middleware(['2fa'])->group(function () {
                Route::get('/dashboard', function () {
                    $user = Auth::user();

                    $wallets = $user->wallets()->with('curr')->get();
                    $currencies = Currency::all();
                    //------
                    $transactions = $user->transactions()->with('currency')->get();
                    $trades = $user->trades;

                    return Inertia::render('Dashboard/Page', compact('wallets', 'transactions', 'currencies'));
                })->name('dashboard');



                Route::get('/wallets', [TradeController::class, 'wallets'])->name('wallets');
                Route::name('crypto.')->group(function () {
                    Route::get('/history', [TradeController::class, 'history'])->name('history');
                    Route::get('/trades/deposit/{wallet?}', [TradeController::class, 'deposits'])->name('deposit');
                    Route::get('/trades/withdraw/{wallet?}', [TradeController::class, 'withdrawal'])->name('withdraw');
                    Route::post('/trades/withdraw', [TradeController::class, 'withdraw'])->name('process.withdraw');
                    Route::get('/trades/swap/{wallet?}', [TradeController::class, 'swap_ui'])->name('swap');
                    Route::post('/trades/swap', [TradeController::class, 'exchange'])->name('process.swap');

                    Route::name('trades.')->group(function () {
                        Route::get('/trades/spot/{type}/{wallet}', [TradeController::class, 'wallets'])->name('spot');
                    });
                });
            });

            Route::get('/onboarding', [OnboardingController::class, 'create'])->name('onboarding');
        });

        Route::post('/verify-email', [VerifyEmailController::class, 'store'])
            ->middleware(['throttle:6,1'])
            ->name('verify.check');

        Route::get('/verify-email', [VerifyEmailController::class, 'create'])->name('verify.email');

        Route::post('/verification-notification', [EmailVerificationNotificationController::class, 'store'])
            ->middleware('throttle:6,1')
            ->name('verification.send');


        Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
            ->name('password.confirm');

        Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

        Route::put('password', [PasswordController::class, 'update'])->name('password.update');

        Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
            ->name('logout');
    });
});


Route::get('/myadmin', function () {
    // $rate = Rate::where(['currency_id' => 1])->get();

    $arr = Auth::user()->wallets()->get();

    return response()->json($arr);
});
