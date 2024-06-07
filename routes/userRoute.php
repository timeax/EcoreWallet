<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\ProfileController;
use Inertia\Inertia;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\CryptomusWebhookController;
use App\Http\Controllers\User\OnboardingController;
use App\Models\Currency;
use App\Models\Wallet;

Route::name('user.')->middleware('maintenance')->group(function () {
    Route::middleware('auth')->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::get('/test', function (Cryptomus $cryptomus) {
            auth()->user()->initiateUser($cryptomus);
            return 'it worked';
        });

        //------
        Route::middleware(['email_verified'])->group(function () {
            Route::middleware(['2fa'])->group(function () {
                Route::get('/dashboard', function () {
                    $user = Auth::user();

                    $wallets = $user->wallets()->with('curr')->get();
                    $transactions = $user->transactions;
                    $trades = $user->trades;

                    return Inertia::render('Dashboard', compact('wallets', 'transactions'));
                })->name('dashboard');
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


Route::get('/cryptomus/deposits/webhook/{key}/{wallet_id}/{user_id}', CryptomusWebhookController::class)->name('cryptomus.deposit.webhooks');
