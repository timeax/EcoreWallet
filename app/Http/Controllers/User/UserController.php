<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Trade;
use App\Models\Wallet;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    //

    public function index(Request $request)
    {
        $user = auth()->user();
        $wallets = Wallet::whereBelongsTo($user, 'user')->with('curr')->get();
        $trades = Trade::where('offer_user_id', auth()->id())->with(['crypto', 'fiat', 'trader'])->latest()->take(7)->get();

        $transactions = $user->transactions;
        //====
        return Inertia::render('Dashboard/Page', compact('wallets', 'transactions', 'trades'));
    }
}
