<?php

namespace App\Http\Controllers\Admin;

use App\Notifications\NotifyMail;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\KycForm;
use App\Models\Merchant;
use App\Models\User;
use App\Notifications\SystemNotification;

class KycManageController extends Controller
{
    public function index()
    {
        return view('admin.kyc.index');
    }

    public function userKycForm()
    {

        $userForms = KycForm::get();
        return view('admin.kyc.user_forms', compact('userForms'));
    }


    public function kycForm(Request $request)
    {
        $request->validate(
            [
                'type' => 'required|in:1,2,3',
                'label' => 'required',
                'required' => 'required'
            ]
        );

        $kyc = new KycForm();
        $kyc->type      = $request->type;
        $kyc->label     = $request->label;
        $kyc->name      = Str::slug($request->label, '_');
        $kyc->required  = $request->required;
        $kyc->save();

        return back()->with('success', 'Form field added successfully');
    }

    public function removeField($id)
    {
        KycForm::findOrFail($id)->delete();
        $notify[] = ['success', 'Field has been removed'];
        return back()->withNotify($notify);
    }

    public function editField($id)
    {
        $page_title = 'Edit Fields';
        $field = KycForm::findOrFail($id);
        return view('admin.category.editFields', compact('page_title', 'field'));
    }

    public function kycFormUpdate(Request $request)
    {
        $request->validate(
            [
                'type' => 'required|in:1,2,3',
                'label' => 'required',
                'required' => 'required'
            ]
        );

        $kyc            = KycForm::findOrFail($request->id);
        $kyc->type      = $request->type;
        $kyc->label     = $request->label;
        $kyc->name      = Str::slug($request->label, '_');
        $kyc->required  = $request->required;
        $kyc->save();

        return back()->with('success', 'Form field updated successfully');
    }

    public function deletedField(Request $request)
    {
        KycForm::findOrFail($request->id)->delete();
        return back()->with('success', 'Form field has removed');
    }

    public function kycInfo()
    {
        $status = 2;
        if (request('status') == 'pending')  $status = 2;
        if (request('status') == 'approved') $status = 1;
        if (request('status') == 'rejected') $status = 3;

        $userKycInfo = User::when(request('search'), function ($q) {
            return $q->where('email', request('search'));
        })->where('kyc_status', $status)->paginate(15);

        return view('admin.kyc.kyc_info', compact('userKycInfo'));
    }

    public function kycDetails($id)
    {
        $info = User::findOrFail($id);
        return view('admin.kyc.details', compact('info'));
    }

    public function rejectKyc(Request $request, $id)
    {
        $request->validate(['reason' => 'required']);
        $info = User::findOrFail($id);
        $info->kyc_status = 0;
        $info->kyc_reject_reason = $request->reason;
        $info->update();

        @$info->notify(new NotifyMail('KYC info rejected', [
            mText(__("Hello $info->name")),
            mText(__("Your KYC information has been rejected")),
            mText(__("<b>Reasons: </b> $request->reason"))
        ]));

        $info->notify(new SystemNotification('Your KYC information has been rejected', [
            'meta' => "Reason: $request->reason"
        ]));

        return back()->with('success', 'KYC info has been rejected');
    }
    public function approveKyc($id)
    {
        $info = User::findOrFail($id);
        $info->kyc_status = 1;
        $info->update();

        @$info->notify(new NotifyMail('KYC info approved', [
            mText(__("Hello $info->name")),
            mText(__("Your KYC information has been approved")),
        ]));

        $info->notify(new SystemNotification('Your KYC information has been approved'));

        //-----------
        return back()->with('success', 'KYC info has been approved');
    }
}
