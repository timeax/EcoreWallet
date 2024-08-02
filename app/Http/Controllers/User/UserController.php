<?php

namespace App\Http\Controllers\User;

use App\Helpers\Notifications;
use App\Http\Controllers\Controller;
use App\Models\Currency;
use App\Models\Trade;
use App\Models\Wallet;
use App\Notifications\NotifyMail;
use App\Notifications\SystemNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use PragmaRX\Google2FA\Google2FA;

class UserController extends Controller
{
    //

    public function index(Request $request)
    {
        $user = Auth::user();

        $wallets = $user->wallets()->with('curr')->get();
        $currencies = Currency::all();
        //------
        $transactions = $user->transactions()->latest()->with('currency')->get();
        $deposits = $user->deposits;
        $withdrawals = $user->withdrawals;
        $exchanges = $user->exchanges;
        $transfers = $user->transfers;

        return Inertia::render('Dashboard/Page', compact('wallets', 'transactions', 'currencies', 'deposits', 'withdrawals', 'exchanges', 'transfers'));
    }

    public function verify(Request $request, Google2FA $google2fa)
    {
        $user = $request->user();

        $request->validate(['code' => 'required']);
        //-------
        $secret = $request->input('code');
        //------

        $window = 8; // 8 keys (respectively 4 minutes) past and future

        $valid = $google2fa->verifyKey($user->two_fa, $secret, $window);

        if ($valid) {
            $user->two_fa_code = null;
            $user->two_fa_status = 1;

            $user->save();

            if ($request->input('to') == 'login') {
                return back()->with([
                    'message' => msg('Login Successful'),
                    'status' => 200
                ]);
            } else {
                $user->notify(Notifications::authenticator($user));
                //-------
                return back()->with([
                    'message' => msg('Authenticator has been added to your account'),
                    'status' => 200
                ]);
            }
        }

        return back()->with(message('Invalid code', 'error'));
    }

    public function twostep()
    {
        $user = Auth::user();

        if (!($user->two_fa_status == 0 && is_null($user->two_fa_code) && isset($user->two_fa))) {
            return redirect(route('user.dashboard'));
        }
        return Inertia::render('Auth/TwoFactor');
    }
}
