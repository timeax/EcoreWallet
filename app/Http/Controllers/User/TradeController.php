<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Cryptomus\Api\Client;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class TradeController extends Controller
{
    public function wallets()
    {
        $user = Auth::user();
        $wallets = $user->wallets()->with('curr')->get();

        return Inertia::render('Trade/Wallets', compact('wallets'));
    }
}
