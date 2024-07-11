<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Currency;
use App\Models\Exchange;
use App\Models\Rate;
use App\Models\Transaction;
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
    public function wallets()
    {
        $user = Auth::user();
        $wallets = $user->wallets()->with('curr')->get();

        return Inertia::render('Trade/Wallets', compact('wallets'));
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


    public function summary()
    {
    }

    public function withdraw(Request $request)
    {
        $required_in_wallet = 'required_if:type,wallet';
        $request->validate([
            'type' => 'required',
            'amount'      => 'required|numeric|gt:0',
            'currency_id' => 'required',
            'wallet_id'   => 'required',
            'wallet_address'   => $required_in_wallet,
            "charge" => $required_in_wallet,
            'network' => $required_in_wallet,
            'ecoreuser' => 'required_if:type,@ecore'
        ]);

        $user = Auth::user();

        $wallet = $user->wallets()->with('curr')->find($request->wallet_id);

        $curr = $wallet->curr;

        if ($request->amount < @$curr->charges->withdraw_limit_min || $request->amount > @$curr->charges->withdraw_limit_max) {
            return back()->withErrors(['amount' => 'Please follow the limit'])->withInput();
        }


        $charge = ($request->amount * $curr->charges->withdraw_charge / 100) + $request->charge;
        $finalAmount = numFormat($request->amount + $charge);

        if ($request->type === '@ecore') {
            $finalAmount = $request->amount;
        }

        if ($wallet->balance < $finalAmount) {
            return back()->with('error', 'Insufficient balance')->withInput();
        }

        if ($request->type === '@ecore') {
            ///--- verify the account number and debit user
            return back()->with('success', 'Successfully transferred to ' . $request->ecoreuser);
        }

        Withdrawals::create([
            'trx' => 'WR' . strtotime('now') . $user->id,
            'user_id' => $user->id,
            'amount' => $request->amount,
            'charge' => $charge,
            'total_amount' => $finalAmount,
            'wallet_address' => $request->wallet_address,
            'currency_id' => $curr->id
        ]);

        return back()->with('success', 'Withdraw request has been submitted successfully.');
    }

    public function history(Request $request)
    {
        $transactions = Transaction::where(['user_id' => $request->user()->id])->with('currency')->get();
        return Inertia::render('Trade/History', compact('transactions'));
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

    public function exchange(Request $request)
    {
        $user = Auth::user();
        //-------
        $request->validate([
            'from' => "required",
            'to' => "required",
            'amount' => ['required', 'numeric', 'min_digits:0.00000001'],
            'type' => ['required'],
            'expire' => ['required_if:type,limit'],
            'limitRate' => ['required_if:type,limit'],
            'rate' => 'required_if:type,instant',
        ]);

        $data = $request->validated();

        $from = $user->wallets()
            ->where(['currency_id' => $data['from']])
            ->with('curr')->get();

        $to = $user->wallets()
            ->where(['currency_id' => $data['to']])
            ->with('curr')->get();

        if (!$from || !$to) return back()->with(['error' => 'Something went wrong, try again later']);
        //-------
        //---
        $charge = @$from->curr->charges->exchange_charge ?? 0;
        $chargeType = @$from->curr->charges->exchange_charge_type ?? '%';
        $amount = (float) $data['amount'];
        $fee = getFee($amount, $charge, $chargeType);
        $loss = $amount + $fee;
        //----
        if ($from->all_balance->available < $loss) return back()->with([
            'error' => 'Insufficient funds'
        ]);
        //-------
        if ($data['type'] == 'instant') {
            $rate = (float) $data['rate'];
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
                    'from' => $from->curr->id,
                    'to' => $to->curr->id,
                    'status' => 'success',
                    'rate' => $rate
                ]);
            } else return back()->with(['error' => 'Something went wrong, try again later']);

            return back()->with('success', 'Withdraw request has been submitted successfully.');
        }

        $rate = (float) $data['limitRate'];
        $expire = $data['expire'];

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
            'status' => 'pending',
            'rate' => $rate,
            'limit_rate' => $rate,
            'expire_in' => toTime($expire)
        ]);

        return back()->with('success', 'Withdraw request has been submitted successfully.');
    }
}


/**
//-- get the wallet codes for the exchange
        $with = $request->get('exchangeWith');
        $walletCode = $request->get('wallet');
        //---------
        $amount = (float) $request->get('amount');
        //----------
if ($with && $walletCode) {
            $exchangeWallet = Wallet::where(['code' => $with], '=')->with('curr')->first();
            $wallet = Wallet::where(['code' => $walletCode], '=')->with('curr')->first();

            $exchange = Rate::where(['currency_id' => $wallet->curr->id], '=')
                ->firstOr(function () {
                    return Rate::where(['currency_id' => '*'])->firstOrCreate([
                        'currency_id' => '*',
                        'charge' => Generalsetting::first()->exchange_rate
                    ]);
                });

            $charge = (float) $exchange->charge;

            $rates = json_decode($exchange->rates || '[]');

            $rate = -1;

            foreach ($rates as $item) {
                if ($item['to'] === $with) {
                    $rate = $item['course'];
                    break;
                }
            }

            if ($rate === -1) {
                return back()->with(['error' => 'Something went wrong, try again later.']);
            }

            if ($wallet && $exchangeWallet) {
                $balance = (float) $wallet->balance;
                // total amount with charges
                $total = $amount + $charge;
                //----
                if ($balance < $total) {
                    return back()->with(['error' => 'Insufficient Funds']);
                }


                $wallet->balance = numFormat($balance - $total, 8);
                $wallet->save();
                //--------
                $balance = (float) $exchangeWallet->balance;
                $exchangeWallet->balance = numFormat(($balance + $amount) * $rate);
                $exchange->save();
                //-------
                $user = Auth::user();
                $ref = strtotime('now') . $user->id;
                // --
                $user->notify(new TransactionNotifications(Transaction::create([
                    'trnx' => null,
                    'user_id' => $user->id,
                    'charge' => $charge,
                    'amount' => $total,
                    'remark' => 'swap',
                    'type' => '-',
                    'ref' => 'debit' . $ref,
                    'currency_id' => $wallet->curr->id
                ])));

                $user->notify(new TransactionNotifications(Transaction::create([
                    'trnx' => null,
                    'user_id' => $user->id,
                    'amount' => $amount * $rate,
                    'remark' => 'swap',
                    'type' => '+',
                    'ref' => 'credit' . $ref,
                    'currency_id' => $exchangeWallet->curr->id
                ])));
            }
        }

 */
