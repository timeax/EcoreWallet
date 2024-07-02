<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SupportTicketController extends Controller
{
    //
    public function view(Request $request)
    {
        $user = Auth::user();
        $tickets = $user->tickets;
        //-------
        return Inertia::render('Support/index', compact('tickets'));
    }

    public function guest(Request $request)
    {
    }
}
