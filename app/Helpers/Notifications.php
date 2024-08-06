<?php

namespace App\Helpers;

use App\Models\Admin;
use App\Models\Currency;
use App\Models\Deposit;
use App\Models\EmailTemplate;
use App\Models\Exchange;
use App\Models\Generalsetting;
use App\Models\Transfer;
use App\Models\User;
use App\Models\Withdrawals;
use App\Notifications\Mail;
use App\Notifications\NotifyMail;
use App\Notifications\SystemNotification as Notify;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class Notifications
{
    static function system(string $subject, string $message)
    {
        return new NotifyMail($subject, [
            mText($message)
        ]);
    }

    static function group(string $subject, string $message, User $user)
    {
        @$user->notify(new Notify($subject, [
            'raw' => $message
        ], 'Newsletter'));

        return static::format($subject, [], $user, true, $message);
    }

    static function deposit(Deposit $deposit)
    {
        $status = $deposit->status;
        $amount = $deposit->amount;
        $curr = $deposit->currency;

        $data = $deposit->toArray();

        $data['currency'] = $curr->code;
        //-----------
        if ($status == 'success') {
            $user = User::find($deposit->user_id);
            if ($user) {
                $user->notify(new Notify("Your $curr->curr_name wallet has been credited with $amount $curr->code", [], 'Transactions'));
            }

            return static::format('deposit_completed', $data, $user);
        } else if ('pending') {
            return new Notify("Your $curr->curr_name wallet has been credited with $amount $curr->code", [], 'Transactions');
        } else if ($status == 'failed') {
            return new Notify("Your deposit of $amount $curr->code was unsuccessful", ['summary' => 'Deposit failed'], 'Transactions');
        }
    }

    static function withdraw_request(Withdrawals $withdrawals)
    {
        $status = $withdrawals->status;
        $ref = $withdrawals->ref;
        $user = User::find($withdrawals->user_id);
        $data = static::addCurr($withdrawals->toArray(), $withdrawals->currency);

        if ($status == 0) {
            if ($user) {
                $user->notify(new Notify("Your withdrawal request has been submitted", [
                    'summary' => 'Withdrawal request',
                    'link' => [
                        'label' => 'See details',
                        'url' => route('user.crypto.history', ['ref' => $ref]),
                    ]
                ], 'Withdrawal Request'));

                return static::format('withdrawal_request', $data, $user);
            }
        } else if ($status == 1) {
            $user->notify(new Notify("Your withdrawal request is being processed..", [
                'summary' => 'Withdrawal Accepted',
                'link' => [
                    'label' => 'See details',
                    'url' => route('user.crypto.history', ['ref' => $ref]),
                ]
            ], 'Withdrawal Request'));

            return static::format('accept_withdraw', $data, $user);
        } else if ($status == 2) {
            $user->notify(new Notify("Your withdrawal request has been rejected", [
                'summary' => 'Withdrawal Rejected',
                'more' => "Reason: $withdrawals->reject_reason",
                'link' => [
                    'label' => 'See details',
                    'url' => route('user.crypto.history', ['ref' => $ref]),
                ]
            ], 'Withdrawal Request'));

            return static::format('reject_withdraw', $data, $user);
        } else if ($status == 3) {
            $user->notify(new Notify("Your withdrawal has failed", [
                'summary' => 'Withdrawal Failed',
                'link' => [
                    'label' => 'See details',
                    'url' => route('user.crypto.history', ['ref' => $ref]),
                ]
            ], 'Transactions'));

            return static::format('withdraw_failed', $data, $user);
        } else if ($status == 4) {
            $user->notify(new Notify("Your withdrawal was successful", [
                'summary' => 'Withdrawal Successful',
                'link' => [
                    'label' => 'See details',
                    'url' => route('user.crypto.history', ['ref' => $ref]),
                ]
            ], 'Transactions'));

            $user->notify(new Notify("Your account has been debited", [
                'link' => [
                    'label' => 'See details',
                    'url' => route('user.crypto.history', ['ref' => $ref]),
                ]
            ], 'Transactions'));

            return static::format('withdraw_successful', $data, $user);
        }
    }

    private static function addCurr($data, Currency $curr)
    {
        $data['currency'] = $curr->code;
        $data['symbol'] = $curr->symbol;
        $data['curr_name'] = $curr->curr_name;

        return $data;
    }

    static function transfer(Transfer $transfer)
    {
        $status = $transfer->status;
        $ref = $transfer->ref;
        $to = $transfer->account_no;
        $user = User::find($transfer->user_id);
        $toUser = User::find($transfer->to_user);
        $curr = $transfer->currency;

        $data = static::addCurr($transfer->toArray(), $curr);

        //---
        if ($status == 'pending') {
            //----------
            $user->notify(new Notify("Transfer to `$to` is pending", [
                'summary' => 'Transfer',
                'link' => [
                    'label' => 'See details',
                    'url' => route('user.crypto.history', ['ref' => $ref]),
                ]
            ], 'Transactions'));
        } else if ($status == 'success') {
            if ($user) {
                $user->notify(new Notify("Your $curr->curr_name wallet has been debited", [], 'Transactions'));
            }

            @$toUser->notify(new NotifyMail('Transfer recieved', [
                mText("Hello $toUser->name"),
                mText("Your $curr->curr_name has been credited with $transfer->amount, from $user->username")
            ]));

            return static::format('transfer_completed', $data, $user);
        } else if ($status == 'failed') {
            if ($user) {
                $user->notify(new Notify("Transfer to `$to` failed", [], 'Transactions'));
            }

            return static::format('transfer_failed', $data, $curr, $user);
        }
    }

    static function exchange(Exchange $exchange)
    {
        $status = $exchange->status;
        //------
        $to = $exchange->transferTo();
        $from = $exchange->transferFrom();
        $user = User::find($exchange->user_id);

        $prefix = is_null($exchange->limit_rate) ? '' : "Limit";
        $data = $exchange->toArray();

        $data['from'] = $from->code;
        $data['to'] = $to->code;

        //---
        if ($status == 'pending') {
            return new Notify("$prefix Exchange from $from->code to $to->code has been activated", [
                'summary' => 'Exchange request',
            ], 'Trade');
        } else if ($status == 'success') {
            if ($user) {
                $user->notify(new Notify("$prefix Exchange from $from->code to $to->code was successful", [], 'Trade'));
            }

            return static::format('exchange_completed', $data, $user);
        } else if ($status == 'failed') {
            if ($user) {
                $user->notify(new Notify("$prefix Exchange from $from->code to $to->code failed", [], 'Trade'));
            }

            return static::format('exchange_failed', $data, $user);
        }
    }

    static function kycSubmitted(User $user)
    {
        $user->notify(new Notify("Your KYC info has been submitted for review", [], 'Other'));

        return static::format('kyc_submitted', [], $user);
    }

    static function kycApproved(User $user)
    {
        $user->notify(new Notify("Your KYC info has been approved..", [], 'Other'));

        return static::format('kyc_approved', [], $user);
    }

    static function kycRejected(User $user, $reason)
    {
        $user->notify(new Notify("Your KYC info has been rejected", [
            "more" => "Reason: $reason"
        ], 'Other'));
        //-----------
        return static::format('kyc_reject', compact('reason'), $user);
    }

    static function format(string $key, array $data, User $user, $isGroup = false, $msg = '')
    {
        $gs = Generalsetting::first();

        if ($isGroup) {
            $subject = $key;
            if ($gs->email_notify) {
                $message = static::clean($user->name, $data, $msg);
            }
        } else {
            $template =  EmailTemplate::where('email_type', $key)->first();
            $subject = $template->email_subject;

            if ($gs->email_notify) {
                $message = static::clean($user->name, $data, $template->email_body);
            }

            if (str($key)->contains(['withdraw', 'deposit', 'exchange'])) {
                Notification::send(
                    Admin::where(['role' => 'admin'])->get(),
                    new Mail($subject, "<p>This message was sent to the user</p><br><br>$message")
                );
            }
        }

        return new Mail($subject, $message);
    }

    static function clean($name, $data, $message)
    {
        $message = str_replace('{name}', $name, $message);
        //------------
        foreach ($data as $key => $value) {
            if (is_array($value)) continue;
            $message = str_replace("{" . $key . "}", $value, $message);
        }

        return $message;
    }

    static function credit(array $data, User $user)
    {
        $amount = $data['amount'];
        $code = $data['curr'];
        //---------
        $user->notify(new Notify("Your account has been credited with $amount $code", [], 'Transactions'));
        return static::format('add_balance', $data, $user);
    }

    static function debit(array $data, User $user)
    {
        $user = User::find($data['user_id']);
        $amount = $data['amount'];
        $code = $data['curr'];
        //---------
        $user->notify(new Notify("$amount$code has been debited from you account", [], 'Transactions'));
        return static::format('subtract_balance', $data, $user);
    }

    static function forgotPassword(User $user, string $url)
    {
        return static::format('forgot_password', compact('url'), $user);
    }

    static function authenticator(User $user)
    {
        $user->notify(new Notify('Authentication app has been added to your account', [], 'Other'));
        return static::format('added_authenticator', [], $user);
    }

    static function welcome(User $user)
    {
        return static::format('welcome', [], $user);
    }

    static function apiErrorWithdrawal(Withdrawals $withdrawals, string $message)
    {
        return new NotifyMail('Withdrawal Request', [
            mText('Hello,'),
            mText(''),
            mText("Withdrawal attempt with ref `$withdrawals->ref`, could not be placed"),
            mText("Please take a look at the code below and send to your developer to take a look.."),
            mText("Note: <b>Please don't forget to process the withdrawal</b>"),
            mText("ErrorCode: <b>$message</b>"),
            mText("<small>This is a note from Ecore-system</small>"),
        ]);
    }
}
