<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OnboardingController extends Controller
{
    //
    public function create()
    {
        $user = auth()->user();
        if ($user->hasAddedAddress()) {
            return redirect(route('user.dashboard'));
        }

        return Inertia::render('Auth/Onboarding');
    }
}
