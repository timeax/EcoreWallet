<?php

namespace App\Http\Controllers\Front;

use App\Http\Controllers\Controller;
use App\Models\Currency;
use App\Models\Generalsetting;
use App\Models\Language;
use App\Models\SiteContent;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FrontendController extends Controller
{
    public function index(Request $request)
    {
        if ($request->inertia())  return Inertia::location('/');
        //---
        return display('front.index');
    }


    public function maintenance()
    {
        $gs = Generalsetting::first();
        if ($gs->is_maintenance == 1) {
            abort(503);
        } else {
            return redirect()->route('front.index');
        }
    }


    public function about()
    {
        return display('front.about');
    }

    public function terms()
    {
        return display('front.terms');
    }

    public function contact()
    {
        return display('front.contact');
    }
    public function contactSubmit(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|max:191',
            'email' => 'required|max:191',
            'subject' => 'required|max:100',
            'message' => 'required',
        ]);

        $contact = SiteContent::where('slug', 'contact')->firstOrFail();

        try {
            @email([
                'name' => 'Admin',
                'subject' => 'Contact',
                'email'  => $contact->content->email,
                'message' => "One contact query is for you.<br><br> <b>Customer Details</b> <br><br> Name : $request->name. <br><br> Email : $request->email. <br><br>  Subject : $request->subject. <br><br> Message : <br><br> $request->message."
            ]);
            return back()->with('success', 'Thanks for contact with us. You will be replied shortly in your mail.');
        } catch (\Throwable $th) {
            return back()->with('error', 'Sorry! can\'t take your query right now.');
        }
    }

    public function privacy()
    {
        // $faq = SiteContent::where('slug', 'faq')->firstOrFail();
        return display('front.privacy');
    }

    public function assets()
    {
        $currencies = Currency::where(['type' => 2, 'status' => 1])->get();
        return display('front.assets', compact('currencies'));
    }

    public function langChange($code = null)
    {
        $language = Language::where('code', $code)->first();
        if (!$language) $code = 'en';
        session()->put('lang', $code);
        return back();
    }
}
