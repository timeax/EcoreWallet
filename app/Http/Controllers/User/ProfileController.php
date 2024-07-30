<?php

namespace App\Http\Controllers\User;

use App\Helpers\MediaHelper;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use App\Models\Currency;
use App\Models\Language;
use App\Models\User;
use App\Notifications\NotifyMail;
use App\Notifications\SystemNotification;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());
        $message = 'Successfully updated email';

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified = 0;
            $message = 'Email did not change';
        }

        $request->user()->save();

        return back()->with(['message' => msg($message), 'status' => 200]);
    }

    public function general(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'type' => 'required',
            'username' => 'required_if:type,username|min:4',
            'photo' => 'required_if:type,avatar|image|mimes:png,jpg,PNG,jpeg',
            'lang' => 'required_if:type,lang',
            'currency' => 'required_if:type,currency',
        ]);
        $data = [];
        $type = $request->type;

        if ($type == 'avatar') {
            $data['photo'] = MediaHelper::handleUpdateImage($request->photo, $user->photo);
            //-----------
        }

        if ($type == 'username') {
            $exsiting = User::where(['username' => $request->username])->first();
            if ($exsiting) return back()->withErrors(['username' => 'Username already exists']);

            $data['username'] = $request->username;
        }

        if ($type == 'lang') {
            $lang = Language::find($request->lang);
            if ($lang) $data['lang'] = $lang->id;
            else return back()->with(message('This language is not supported'));
        }

        if ($type == 'currency') {
            $currency = Currency::find($request->currency);
            if ($currency) $data['currency'] = $currency->id;
            else return back()->with(message('This currency is not supported'));
        }

        $user->update($data);

        //-----
        return back()->with([
            'status' => 200,
            'message' => msg('Sucessfully updated ' . $request->type)
        ]);
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        @$user->notify(new NotifyMail('Account Deactivated', [
            mText("Hello $user->name, "),
            mText("As per your requests, you account has been deactivated, if you didn't authorise this action, contact customer support and secure your account!."),
        ]));

        Auth::logout();

        $user->status = 0;
        $user->save();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
