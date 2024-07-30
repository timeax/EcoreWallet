<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\ConfirmablePasswordController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\Auth\PasswordController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\DataController;
use App\Http\Controllers\User\OnboardingController;
use App\Http\Controllers\User\ProfileController;
use App\Http\Controllers\User\SupportTicketController;
use App\Http\Controllers\User\TradeController;
use App\Http\Controllers\User\UserController;
use App\Models\Currency;
use App\Models\EmailTemplate;
use App\Models\Language;
use App\Models\LoginLogs;
use App\Models\Setting;
use App\Models\User;
use App\Notifications\NotifyMail;
use App\Notifications\Refreshed;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {
    Route::get('/rates', [DataController::class, 'rates'])->name('data.rates');
    Route::get('/market', [DataController::class, 'market'])->name('data.market');
    Route::get('/historical/{id}/{range?}', [DataController::class, 'historical'])->name('data.historical');

    Route::get('/notifications/all/{userId}', function (string $id) {
        //--------
        $user = User::find($id);
        if ($user) return response()->json($user->unreadnotifications);
        return response()->json([]);
        //----
    })->name('data.notifications');

    Route::get('/template', function () {
        $templates = EmailTemplate::all();

        $deposits = Schema::getColumnListing('deposits');
        $withdraws = Schema::getColumnListing('withdrawals');
        $transfers = Schema::getColumnListing('transfers');
        $exchanges = Schema::getColumnListing('exchanges');
        $transactions = Schema::getColumnListing('transactions');

        return Inertia::render('Welcome', compact('templates', 'deposits', 'withdraws', 'transfers', 'exchanges', 'transactions'));
    });

    Route::post('/template', function (Request $request) {
        $request->validate([
            'email_type' => 'required',
            'email_subject' => 'required',
            'email_body' => 'required',
            'codes' => ['required', 'min:4']
        ]);

        $id = $request->input('id') ?? -1;
        Log::info('This is the id: ' . $id);
        if ($id >= 0) {
            $template = EmailTemplate::find($id)->first();
            if ($template) {
                $template->email_body = clean($request->input('email_body'));
                $template->email_subject = $request->input('email_subject');
                $template->email_type = $request->input('email_type');
                $template->codes = $request->input('codes');
                $template->save();
            }
        } else {
            EmailTemplate::create([
                'email_body' => clean($request->input('email_body')),
                'email_subject' => $request->input('email_subject'),
                'email_type' => $request->input('email_type'),
                'codes' => $request->input('codes'),
                'status' => 1
            ]);
        }

        return back()->with(message('Updated the mail templates'));
    })->name('template');

    Route::post('/notifications/markasread', function (Request $request) {
        $id = $request->input('user');
        $nId = $request->input('notify');
        //----
        $user = User::find($id);
        if ($user) {
            if ($nId == '*') {
                @$user->unreadNotifications->markAsRead();
            } else {
                $notification = $user->notifications()->find($nId);
                if ($notification) {
                    $notification->read_at = now()->toDateString();
                    $notification->save();
                }
            }

            $user->notifyNow(new Refreshed());
        }
        return response()->json(['done' => 'done']);
    })->name('data.mark.as.read');
});



Route::name('user.')->middleware('maintenance')->group(function () {
    Route::middleware(['auth', 'active_accounts'])->group(function () {
        Route::get('/twostep/verification', [UserController::class, 'twostep'])->name('two.step.verification');
        Route::post('/tostep/verify', [UserController::class, 'verify'])->name('two.step.verify');

        Route::middleware(['2fa'])->group(function () {
            Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
            Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
            Route::post('/profile/general', [ProfileController::class, 'general'])->name('profile.update.general');
            Route::post('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


            Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
                ->name('logout');

            Route::get('user-forgot-password', function (Request $request) {
                $request->user()->expire();

                Auth::guard('web')->logout();
                $request->session()->invalidate();
                $request->session()->regenerateToken();
                //-------------
                redirect(route('password.request'));
            })->name('forgot-password');


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
                Route::get('/dashboard', function () {
                    $user = Auth::user();

                    $wallets = $user->wallets()->with('curr')->get();
                    $currencies = Currency::all();
                    //------
                    $transactions = $user->transactions()->with('currency')->get();
                    $trades = $user->trades;

                    return Inertia::render('Dashboard/Page', compact('wallets', 'transactions', 'currencies'));
                })->name('dashboard');



                Route::get('/wallets/{id?}', [TradeController::class, 'wallets'])->name('wallets');
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

                Route::get('/onboarding', [OnboardingController::class, 'create'])->name('onboarding');
                Route::post('/onboarding', [OnboardingController::class, 'store'])->name('onboarding.post');
            });
        });
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
});


Route::get('/myadmin', function () {

    $user = Auth::user();

    $users = User::all();

    foreach ($users as $person) {
        $person->generateTwoStepToken();
    }

    return (new NotifyMail('Account Deactivated', [
        mText("Hello $user->name, ", ['b']),
        mText("As per your requests, you account has been deactivated, if you didn't authorise this action, contact customer support and secure your account!."),
    ]))->toMail($user);
});
