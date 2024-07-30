<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Notifications\PasswordIsReset;
use App\Notifications\PasswordReset;
use Hash;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Validation\Rules\Password;
use Str;

class ConfirmablePasswordController extends Controller
{
    /**
     * Show the confirm password view.
     */
    public function show(): Response
    {
        return Inertia::render('Auth/ConfirmPassword');
    }

    /**
     * Confirm the user's password.
     */
    public function store(Request $request): RedirectResponse
    {
        if (!Auth::guard('web')->validate([
            'email' => $request->user()->email,
            'password' => $request->password,
        ])) {
            throw ValidationException::withMessages([
                'password' => __('auth.password'),
            ]);
        }

        $request->session()->put('auth.password_confirmed_at', time());

        return redirect()->intended(route('user.dashboard', absolute: false));
    }

    public function confirm(LoginRequest $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password:web'],
            'new_password_confirmation' => ['required'],
            'new_password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $validated = $request->only(['new_password', 'password_confirmation']);

        $request->user()->update([
            'password' => Hash::make($validated['new_password']),
        ]);
        $request->user()->expire();

        Auth::logout();

        return back()->with(message('Successfully updated password'));
    }
}
