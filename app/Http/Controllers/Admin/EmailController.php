<?php

namespace App\Http\Controllers\Admin;

use App\{
    Models\EmailTemplate,
    Models\Generalsetting,
    Models\User
};
use App\Helpers\MailHelper;
use App\Helpers\Notifications;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class EmailController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:admin');
    }

    public function index()
    {
        $templates = EmailTemplate::orderBy('id', 'desc')->get();
        return view('admin.email.index', compact('templates'));
    }

    public function config()
    {
        return view('admin.email.config');
    }


    public function edit($id)
    {
        $data = EmailTemplate::findOrFail($id);
        return view('admin.email.edit', compact('data'));
    }

    public function groupEmail()
    {
        $config = Generalsetting::findOrFail(1);
        $users = User::all();
        //---------
        return view('admin.email.group_mail', compact('config', 'users'));
    }

    public function groupemailpost(Request $request)
    {
        // dd($request->users);
        $list = $request->users ?? ['*'];
        $all = false;
        $userIds = [];

        foreach ($list as $id) {
            if ($id == '*') {
                $all = true;
                break;
            }

            $userIds[] = $id;
        }

        if (count($userIds) == 0) $all = true;

        if ($all) $users = User::whereStatus(1)->where('email_verified', 1)->get(['id', 'name', 'email']);
        else $users = User::whereIn('id', $userIds)->get(['id', 'name', 'email']);

        foreach ($users as $user) {
            if ($user) {
                @$user->notify(Notifications::system($request->subject, clean($request->message)));
            }
        }
        return back()->with('success', 'Email sent to all users.');
    }

    public function update(Request $request, $id)
    {
        $data = EmailTemplate::findOrFail($id);
        $input = $request->all();
        $input['email_body'] = clean($input['email_body']);
        $data->update($input);
        $msg = __('Data Updated Successfully.');
        return response()->json($msg);
    }
}
