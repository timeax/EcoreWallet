<?php

namespace App\Http\Controllers\User;

use App\Helpers\Notifications;
use App\Http\Controllers\Controller;
use App\Models\Currency;
use App\Models\Exchange;
use App\Models\Rate;
use App\Models\Transaction;
use App\Models\Transfer;
use App\Models\User;
use App\Models\Withdrawals;
use Cryptomus;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TradeController extends Controller
{
    public function __construct(public Cryptomus $cryptomus)
    {
    }
    public function wallets(?string $id = null)
    {
        $user = Auth::user();
        $wallets = $user->wallets()->with('curr')->get();
        $currencies = Currency::all();
        $deposits = $user->deposits;
        $withdrawals = $user->withdrawals;
        $exchanges = $user->exchanges;
        $transfers = $user->transfers;

        return Inertia::render('Trade/Wallets', compact('wallets', 'currencies', 'deposits', 'withdrawals', 'exchanges', 'transfers', 'id'));
    }


    public function deposits(?string $wallet = 'BTC')
    {
        $user = Auth::user();
        $wallets = $user->wallets()->with('curr')->get();

        $services = $this->cryptomus->services();
        $addresses = $user->addresses()->get();
        //-------
        return Inertia::render('Trade/Deposit', compact('wallets', 'wallet', 'addresses', 'services'));
    }

    public function withdrawal(?string $wallet = 'BTC')
    {
        $user = Auth::user();
        $wallets = $user->wallets()->with('curr')->get();
        //------------
        $services = $this->cryptomus->payoutServices();

        return Inertia::render('Trade/Withdraw', compact('wallets', 'wallet', 'services'));
    }

    public function transferDetails($account_no)
    {
        $to = User::where(['account_no' => $account_no])->first();

        return response()->json([
            "username" => $to?->username ?? '???',
            "verified" => $to?->kyc_status,
            "photo" => $to?->photo,
            "name" => str($to?->name || 'Unknown')->charAt(0)
        ], $to ? 200 : 500);
    }

    public function withdraw(Request $request)
    {
        $user = Auth::user();

        $required_in_wallet = 'required_if:type,wallet';
        $request->validate([
            'type' => 'required',
            'amount'      => 'required|numeric|gt:0',
            'currency_id' => 'required',
            'wallet_id'   => 'required',
            'wallet_address'   => $required_in_wallet,
            "charge" => $required_in_wallet,
            'network' => $required_in_wallet,
            'ecoreuser' => 'required_if:type,@ecore',
        ]);

        if ($user->kyc_status == 0) return back()->with(message('Complete KYC verification process to continue with this transaction'));

        $wallet = $user->wallets()->with('curr')->find($request->wallet_id);

        $curr = $wallet->curr;

        if ($request->amount < @$curr->charges->withdraw_limit_min || $request->amount > @$curr->charges->withdraw_limit_max) {
            return back()->withErrors(['amount' => 'Please follow the limit'])->withInput();
        }

        $charge = 0;
        $finalAmount = $request->amount;

        if ($request->type !== '@ecore') {
            $charge = ($request->amount * $curr->charges->withdraw_charge / 100) + $request->charge;
            $finalAmount = $request->amount + $charge;
        }

        if ($wallet->balance < $finalAmount) {
            return back()->with('error', 'Insufficient balance')->withInput();
        }

        if ($request->type === '@ecore') {
            ///--- verify the account number and debit user
            $to = User::where(['account_no' => $request->ecoreuser])->get();
            $toWallet = $to->wallets()->where(['crypto_id' => $curr])->first();
            //---------
            if (!$to) return back()->withErrors(['ecoreuser' => "User account does not exist"]);
            if ($to->status == 0) return back()->withErrors(['ecoreuser' => "User account has be blocked"]);
            if (!$to->account_no) return back()->withErrors(['ecoreuser' => "User account is not verified"]);
            //-----------
            $wallet->balance -= $finalAmount;
            $toWallet->balance += $finalAmount;
            //---
            $wallet->saveOrFail();
            $toWallet->save();
            //------------
            Transfer::create([
                'user_id' => $user->id,
                'to_user' => $to->id,
                'account_no' => $to->account_no,
                'currency_id' => $curr->id,
                'status' => 'success',
                'ref' => uuid($user->id, 'trns'),
                'transaction_ref' => uuid('transfer' . $user->id),
                'amount' => $finalAmount
            ]);
            //--------
            return back(303)->with(message('Transfer request submitted successfully', [
                'code' => $wallet->curr->code
            ]));
        }

        Withdrawals::create([
            'trx' => uuid('withdraw'),
            'ref' => uuid($user->id, 'wdrw'),
            'user_id' => $user->id,
            'amount' => $request->amount,
            'network' => $request->network,
            'charge' => $charge,
            'total_amount' => $finalAmount,
            'wallet_address' => $request->wallet_address,
            'currency_id' => $curr->id
        ]);

        return back(303)->with(message('Withdraw request has been submitted successfully.', [
            'code' => $wallet->curr->code
        ]));
    }

    public function history(Request $request)
    {
        $user = Auth::user();
        $currencies = Currency::all();
        $deposits = $user->deposits;
        $withdrawals = $user->withdrawals;
        $exchanges = $user->exchanges;
        $transfers = $user->transfers;
        $transactions = Transaction::where(['user_id' => $request->user()->id])->with('currency')->orderByDesc('updated_at')->get();
        return Inertia::render('Trade/History', compact('transactions', 'currencies', 'deposits', 'withdrawals', 'exchanges', 'transfers'));
    }

    public function swap_ui(string $code = 'BTC')
    {
        $user = Auth::user();
        $wallets = $user->wallets()->with('curr')->get();
        $rates = Rate::all();
        $history = $user->transactions()->where(['type' => 'swap'])->get();

        $currencies = Currency::all();

        $wallet = $wallets->filter(function ($item) use ($code) {
            return $item->curr->code === $code;
        })->first();

        //------------
        $services = $this->cryptomus->payoutServices();

        return Inertia::render('Trade/Exchange', compact('wallets', 'wallet', 'history', 'currencies'));
    }

    public function cancelExchange(Request $request)
    {
        $id = $request->get('id');
        //---
        if (!$id) return back()->with(message('Transaction ID is missing', 'warn'));

        $exchange = Exchange::find($id);
        if ($exchange) {
            if ($exchange->status !== 'pending') back()->with(message('Transaction is already resolved..', 'warn'));

            $exchange->status = 'failed';
            $exchange->save();
            //--------------
            $request->user->notify(Notifications::exchange(($exchange)));
            //---------
            return back(303)->with(message('Exchange transaction has been cancelled'));
        }

        return back()->with(message('Could not find transaction..', 'warn'));
    }

    public function exchange(Request $request)
    {
        $user = Auth::user();
        //-------
        $request->validate([
            'from' => "required",
            'to' => "required",
            'amount' => ['required', 'numeric'],
            'type' => ['required'],
            'expire' => ['required_if:type,limit'],
            'limitRate' => ['required_if:type,limit'],
            'rate' => 'required_if:type,instant',
        ]);

        $data = $request->all();

        $from = $user->wallets()
            ->with('curr')
            ->where(['crypto_id' => $data['from']])
            ->first();

        $to = $user->wallets()
            ->with('curr')
            ->where(['crypto_id' => $data['to']])
            ->first();

        if (!$from || !$to) return back()->with(message('Something went wrong, try again later', 'error'));
        //-------
        $rate = (float) $data['rate'];
        //---
        $charge = @$from->curr->charges->exchange_charge ?? 0;
        $chargeType = @$from->curr->charges->exchange_charge_type ?? '%';
        $amount = (float) $data['amount'];
        $fee = getFee($amount, $charge, $chargeType);
        $loss = $amount + $fee;
        //----
        if ($from->all_balance['available'] < $loss) return back()->with([
            'error' => 'Insufficient funds'
        ]);
        //-------
        if ($data['type'] == 'instant') {
            //--------
            $gain = $amount * $rate;
            //----
            $from->balance -= $loss;
            $to->balance += $gain;
            //--
            if ($from->save() && $to->save()) {
                Exchange::create([
                    'user_id' => $user->id,
                    'transaction_id' => uuid($user->id, 'exchange'),
                    'type' => 'instant',
                    'amount' => $amount,
                    'charges' => $fee,
                    'total' => $loss,
                    'gain' => round($gain, 8),
                    'from' => $from->curr->id,
                    'to' => $to->curr->id,
                    'status' => 'success',
                    'rate' => $rate
                ]);
            } else return back()->with(message('Something went wrong, try again later', 'warn'));

            return back(303)->with(message('Exchange request has been submitted successfully.'));
        }

        $limit = (float) $data['limitRate'];
        $expire = $data['expire'];
        $gain = $amount * $rate;
        //--------
        $loss = $amount + $fee;

        Exchange::create([
            'user_id' => $user->id,
            'transaction_id' => uuid($user->id, 'exchange'),
            'type' => 'limit',
            'amount' => $amount,
            'charges' => $fee,
            'total' => $loss,
            'from' => $from->curr->id,
            'to' => $to->curr->id,
            'gain' => round($gain, 8),
            'status' => 'pending',
            'rate' => $rate,
            'limit_rate' => $limit,
            'expire_in' => toTime($expire)
        ]);

        return back()->with(message('Exchange request has been submitted successfully.', [
            'code' => $from->crypto_id
        ]));
    }
}
