<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\User\OnboardingController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\User\SupportTicketController;
use App\Http\Controllers\User\TradeController;
use App\Models\Currency;
use App\Models\Language;
use App\Models\LoginLogs;
use App\Models\Setting;
use App\Notifications\NotifyMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::name('user.')->middleware('maintenance')->group(function () {
    Route::middleware(['auth', 'active_accounts'])->group(function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::post('/profile', [ProfileController::class, 'general'])->name('profile.update.general');
        Route::post('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


        Route::get('/settings', function () {
            $languages = Language::all();
            $currencies = Currency::where(['type' => 1])->get();
            $settings = Setting::where(['user_id' => Auth::id()]);
            $activities = LoginLogs::all();
            //-----------
            return Inertia::render('Settings/Page', compact('languages', 'currencies', 'settings', 'activities'));
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

        Route::get('/verification-notification', [EmailVerificationNotificationController::class, 'store'])
            ->middleware('throttle:6,1')
            ->name('verification.send.redirect');


        Route::get('confirm-password', [ConfirmablePasswordController::class, 'show'])
            ->name('password.confirm');

        Route::post('confirm-password', [ConfirmablePasswordController::class, 'store']);

        Route::put('password', [PasswordController::class, 'update'])->name('password.update');

        Route::put('password/new', [ConfirmablePasswordController::class, 'confirm'])->name('password.update');

        Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
            ->name('logout');

        Route::get('user-forgot-password', function (Request $request) {
            Auth::guard('web')->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            //-------------
            redirect(route('password.request'));
        })->name('forgot-password');
    });
});


Route::get('/myadmin', function () {

    $user = Auth::user();

    return (new NotifyMail('Account Deactivated', [
        mText("Hello $user->name, ", ['b']),
        mText("As per your requests, you account has been deactivated, if you didn't authorise this action, contact customer support and secure your account!."),
    ]))->toMail($user);
});
