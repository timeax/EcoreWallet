<?php

namespace App\Http\Controllers\User;

use App\Helpers\MediaHelper;
use App\Helpers\Notifications;
use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Notifications\NotifyMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;
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

    public function store(Request $request)
    {
        $request->validate([
            'fname' => ['required'],
            'lname' => ['required'],
            'email' => ['required'],
            'phone' => ['required'],
            'dob' => ['required'],
            'home1' => ['required'],
            'city' => ['required'],
            'state' => ['required'],
            'country' => ['required'],
            'zip' => ['required'],
            'idType' => ['required'],
            'idFront' => ['required', 'image', 'mimes:png,jpg,jpeg|max:5120'],
            'idBack' => ['required', 'image', 'mimes:png,jpg,jpeg|max:5120'],
        ]);

        $user = Auth::user();
        $data = $request->all();
        $kycData = [
            'image' => [],
            'details' => []
        ];
        //==========
        try {
            foreach ($data as $key => $value) {
                //----------
                if ($value) {
                    if ($key == 'idFront') $kycData['image']['front'] = MediaHelper::handleMakeImage($value);
                    else if ($key == 'idType') $kycData['details']['ID Type'] = $value;
                    else if ($key == 'idBack') $kycData['image']['back'] = MediaHelper::handleMakeImage($value);

                    else $kycData['details'][$key] = $value;
                }
            }
        } catch (\Throwable $th) {
            $admins = Admin::all();
            Notification::send($admins, new NotifyMail('Error during KYC Submitting', [
                mText('Hello'),
                mText('The following error ocurred during KYC submission, Please contact the developer and submit the code for review'),
                mText('<span style="color: red">' . $th->getMessage() . '<span>')
            ]));

            return back(200)->with(message('Something went wrong, try later', 'warn'));
        }
        $user->kyc_info = $kycData;
        $user->kyc_status = 2;
        $user->save();

        @$user->notify(Notifications::kycSubmitted($user));

        return redirect(route('user.dashboard'))->with(message('KYC data has been submitted for review'));
    }
}
