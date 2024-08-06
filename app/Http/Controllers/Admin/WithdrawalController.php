<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\Notifications;
use App\Models\Withdrawals;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class WithdrawalController extends Controller
{
    public function accepted()
    {
        $withdrawlogs = Withdrawals::where('status', 1)->latest()->with(['user', 'currency'])->paginate(15);
        return view('admin.withdraw.withdraw_all', compact('withdrawlogs'));
    }
    public function pending()
    {
        $withdrawlogs = Withdrawals::where('status', 0)->latest()->with(['user', 'currency'])->paginate(15);
        return view('admin.withdraw.withdraw_all', compact('withdrawlogs'));
    }
    public function rejected()
    {
        $withdrawlogs = Withdrawals::where('status', 2)->latest()->with(['user', 'currency'])->paginate(15);
        return view('admin.withdraw.withdraw_all', compact('withdrawlogs'));
    }

    public function withdrawAccept(Request $request, Withdrawals $withdraw)
    {

        $withdraw->status = 1;
        $withdraw->handler = $request->handler;

        $trnx = $withdraw->transaction()->first();
        //----------
        $trnx->remark      = 'withdraw';
        $trnx->type        = '-';
        $trnx->status        = 'pending';
        $trnx->details     = trans('Withdraw money');
        //-----------
        $trnx->save();
        $withdraw->save();

        // @mailSend('accept_withdraw', , $withdraw->user);

        $user = $withdraw->user;
        if (session(null)->get('withdraw') == 'fail') {
            $withdraw->status = 0;
            $withdraw->save();
            return back()->with('error', 'Withdraw Failed with errors.. Please check your mail');
        }

        if ($withdraw->isDirty()) {
            $withdraw->save();
        }

        $user->notify(Notifications::withdraw_request($withdraw));

        return back()->with('success', 'Withdraw Accepted Successfully');
    }


    public function withdrawReject(Request $request, Withdrawals $withdraw)
    {
        $request->validate(['reason_of_reject' => 'required']);

        $withdraw->status = 2;
        $withdraw->reject_reason = $request->reason_of_reject;
        $trnx = $withdraw->transaction()->first();
        //----------
        $trnx->remark      = 'withdraw';
        // $trnx->type        = '-';
        $trnx->status        = 'failed';
        $trnx->details     = trans('Withdraw request rejected');
        //---------
        $trnx->save();
        $withdraw->save();
        //------

        // @mailSend('reject_withdraw', ['amount' => numFormat($withdraw->amount, 8), 'trnx' => $trnx->trnx, 'curr' => $withdraw->currency->code, 'reason' => $withdraw->reject_reason], $withdraw->user);

        $user = $withdraw->user;
        $user->notify(Notifications::withdraw_request($withdraw));

        return back()->with('success', 'Withdraw Rejected Successfully');
    }
}
