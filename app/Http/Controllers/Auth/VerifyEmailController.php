<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Auth;
use Cryptomus;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function store(Request $request, Cryptomus $cryptomus)
    {
        $user = Auth::user();
        //----
        session(['verification_code' => $request->verification_code]);
        if ($user->markEmailAsVerified()) {
            //event(new Verified($user));
        } else {
            return redirect()->route('user.verify.email')->with([
                'email.validation.error' => 'Invalid Verfication Code',
                'status' => 'error',
                'code' => session('code'),
                'emailcode_sent_at' => session('emailcode_sent_at')
            ]);
        }

        //------
        $user->initiateUser($cryptomus);

        session()->flush();

        return redirect()->intended(route('user.dashboard'));
    }


    public function create(Request $request)
    {
        $user = $request->user();
        if ($user->email_verified) return back();

        //--------
        $created_at = session('emailcode_sent_at');

        session()->keep(['emailcode_sent_at', 'status', 'code']);

        if (!isset($created_at) || ((strtotime('now') - $created_at) > 900)) {
            $user->verify_code = null;
            $user->save();

            session(['status' => 'expired']);
            session()->forget('emailcode_sent_at');
        }

        return Inertia::render('Auth/VerifyEmail', [
            'status' => session('status'),
            'code' => session('code'),
            'error' => session('email.validation.error')
        ]);
    }
}

// K924RMU1KUMQXJ7FFW28W2WL
