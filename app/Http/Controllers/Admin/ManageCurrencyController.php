<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\MediaHelper;
use App\Helpers\Notifications;
use App\Models\Currency;
use Illuminate\Http\Request;
use App\Models\Generalsetting;
use App\Http\Controllers\Controller;
use App\Jobs\NewCurrency;
use App\Models\GeckoCoins;
use App\Models\User;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Notification;

class ManageCurrencyController extends Controller
{
    public function index(Request $request)
    {
        return view('admin.currency.index');
    }
    public function manageCurrency(Request $request, $type)
    {
        if ($type != 'fiat' && $type != 'crypto') abort(404);
        else $type == 'fiat' ? $flag = 1 : $flag = 2;

        $search = $request->search;
        $currencies = Currency::when($search, function ($q) use ($search) {
            return $q->where('code', 'like', "%$search%")->orWhere('curr_name', 'like', "%$search%");
        })->where('type', $flag)->orderBy('default', 'DESC')->paginate(20);
        return view('admin.currency.' . $type . '_currencies', compact('currencies'));
    }

    public function addCurrency()
    {
        $gecko_coins = GeckoCoins::all();
        return view('admin.currency.create', compact('gecko_coins'));
    }

    public function store(Request $request)
    {
        $request->validate(
            [
                'icon'               => 'required_if:type,2|image|mimes:png,jpg,PNG,jpeg',
                'curr_name'          => 'required',
                'color'          => 'required',
                'code'               => 'required|max:4',
                'symbol'             => 'required|unique:currencies',
                'rate'               => 'required|gt:0',
                'type'               => 'required|in:1,2',
                'default'            => 'required_if:type,1|in:1,0',
                'status'             => 'required|in:1,0',
                'deposit_charge'     => 'required_if:type,2|lt:100',
                'exchange_charge'     => 'required_if:type,2|lt:100',
                'withdraw_charge'    => 'required_if:type,2|lt:100',
                'withdraw_charge_type'    => 'required_if:type,2',
                'deposit_charge_type'    => 'required_if:type,2',
                'exchange_charge_type'    => 'required_if:type,2',
                'withdraw_limit_min' => 'required_if:type,2|gt:0',
                'withdraw_limit_max' => 'required_if:type,2|gt:0',
                'gecko_id' => 'required_if:type,2',
            ],
            [
                'curr_name.required'              => 'Currency name is required.',
                'withdraw_limit_min.required_if'  => 'Withdraw minimum limit is required when currency type is crypto.',
                'withdraw_limit_max.required_if'  => 'Withdraw maximum limit is required when currency type is crypto.',
                'icon.required_if'                => 'Icon is required when currency type is crypto.',
            ]
        );

        $data = $request->only('icon', 'curr_name', 'code', 'color', 'symbol', 'rate', 'type', 'default', 'status', 'geckco_id');

        if ($request->default && $request->type != 2) {
            $default = Currency::where('default', 1)->firstOrFail();
            $default->default = 0;
            $default->save();

            $gs = Generalsetting::first();
            $gs->curr_code = $request->code;
            $gs->curr_sym = $request->symbol;
            Cache::forget('generalsettings');
            $gs->update();
        } else {
            $data['default'] = 0;
            $data['charges'] = [
                'deposit_charge'     => $request->deposit_charge,
                'withdraw_charge_type'     => $request->withdraw_charge_type,
                'deposit_charge_type'     => $request->deposit_charge_type,
                'exchange_charge_type'     => $request->exchange_charge_type,
                'exchange_charge'     => $request->exchange_charge,
                'withdraw_charge'    => $request->withdraw_charge,
                'withdraw_limit_min' => $request->withdraw_limit_min,
                'withdraw_limit_max' => $request->withdraw_limit_max
            ];
        }
        $data['icon'] = $request->icon ? MediaHelper::handleMakeImage($request->icon) : null;
        $curr = Currency::create($data);
        //---
        NewCurrency::dispatch($curr);
        //-------
        Notification::send(User::where(['status' => 1, 'email_verified' => 1])->get(), Notifications::system('New Currency Update', 'A new asset has been added'));
        return back()->with('success', 'New currency has been added');
    }

    public function editCurrency($id)
    {
        $gecko_coins = GeckoCoins::all();
        ///
        $currency = Currency::findOrFail($id);
        return view('admin.currency.edit', compact('currency', 'gecko_coins'));
    }

    public function updateCurrency(Request $request, $id)
    {
        $request->validate(
            [
                // '
                'curr_name'          => 'required',
                'color'              => 'required',
                'code'               => 'required|max:4|unique:currencies,code,' . $id,
                'symbol'             => 'required|unique:currencies,symbol,' . $id,
                'rate'               => 'required|gt:0',
                'type'               => 'required|in:1,2',
                'default'            => 'required_if:type,1|in:1,0',
                'status'             => 'required|in:1,0',
                'exchange_charge'    => 'required_if:type,2|lt:100',
                'deposit_charge'     => 'required_if:type,2|lt:100',
                'withdraw_charge'    => 'required_if:type,2|lt:100',
                'withdraw_charge_type'    => 'required_if:type,2',
                'deposit_charge_type'    => 'required_if:type,2',
                'exchange_charge_type'    => 'required_if:type,2',
                'withdraw_limit_min' => 'required_if:type,2|gt:0',
                'withdraw_limit_max' => 'required_if:type,2|gt:0',
                'gecko_id' => 'required_if:type,2',
            ],
            [
                'curr_name.required'              => 'Currency name is required.',
                'withdraw_limit_min.required_if'  => 'Withdraw minimum limit is required when currency type is crypto.',
                'withdraw_limit_max.required_if'  => 'Withdraw maximum limit is required when currency type is crypto.',
                'icon.required_if'                => 'Icon is required when currency type is crypto.',
            ]
        );

        if (!is_null($request->icon)) {
            $request->validate(['icon' => 'required_if:type,2|image|mimes:png,jpg,PNG,jpeg']);
        }

        $data = $request->only('curr_name', 'code', 'color', 'symbol', 'rate', 'type', 'default', 'status', 'gecko_id');
        $curr = Currency::findOrFail($id);
        if ($request->default && $request->type != 2) {
            $defaultCurr = Currency::where('default', 1)->firstOrFail();
            $defaultCurr->default = 0;
            $defaultCurr->save();

            $gs = Generalsetting::first();
            $gs->curr_code = $curr->code;
            $gs->curr_sym = $request->symbol;
            Cache::forget('generalsettings');
            $gs->update();
        }
        $data['charges'] = [
            'exchange_charge'     => $request->exchange_charge,
            'withdraw_charge_type'     => $request->withdraw_charge_type,
            'deposit_charge_type'     => $request->deposit_charge_type,
            'exchange_charge_type'     => $request->exchange_charge_type,
            'deposit_charge'     => $request->deposit_charge,
            'withdraw_charge'    => $request->withdraw_charge,
            'withdraw_limit_min' => $request->withdraw_limit_min,
            'withdraw_limit_max' => $request->withdraw_limit_max
        ];

        if ($request->icon) $data['icon'] = MediaHelper::handleUpdateImage($request->icon, $curr->icon);
        $curr->update($data);
        //-------------
        return back()->with('success', 'Currency has been updated');
    }

    public function updateCurrencyAPI(Request $request)
    {
        $request->validate(['crypto_access_key' => 'required', 'fiat_access_key' => 'required']);

        $gs = Generalsetting::first();
        $gs->fiat_access_key = $request->fiat_access_key;
        $gs->crypto_access_key = $request->crypto_access_key;
        $gs->update();

        return back()->with('success', 'Currency API Updated');
    }
}
