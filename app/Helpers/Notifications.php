<?php

namespace App\Helpers;

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

class Notifications
{
    static function system(string $subject, string $message)
    {
        return new NotifyMail($subject, [
            mText($message)
        ]);
    }

    static function deposit(Deposit $deposit)
    {
        $status = $deposit->status;
        $amount = $deposit->amount;
        $curr = $deposit->currency;
        //-----------
        if ($status == 'success') {
            $user = User::find($deposit->user_id);
            if ($user) {
                $user->notify(new Notify("Your $curr->curr_name wallet has been credited with $amount $curr->code", [], 'Transactions'));
            }

            return static::format('deposit_completed', $deposit->toArray(), $user);
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

        if ($status == 0) {
            if ($user) {
                $user->notify(new Notify("Your withdrawal request has been submitted", [
                    'summary' => 'Withdrawal request',
                    'link' => [
                        'label' => 'See details',
                        'url' => route('user.crypto.history', ['ref' => $ref]),
                    ]
                ], 'Withdrawal Request'));

                return static::format('withdrawal_request', $withdrawals->toArray(), $user);
            }
        } else if ($status == 1) {
            $user->notify(new Notify("Your withdrawal request has been accepted", [
                'summary' => 'Withdrawal Accepted',
                'link' => [
                    'label' => 'See details',
                    'url' => route('user.crypto.history', ['ref' => $ref]),
                ]
            ], 'Withdrawal Request'));

            return static::format('accept_withdraw', $withdrawals->toArray(), $user);
        } else if ($status == 2) {
            $user->notify(new Notify("Your withdrawal request has been rejected", [
                'summary' => 'Withdrawal Rejected',
                'link' => [
                    'label' => 'See details',
                    'url' => route('user.crypto.history', ['ref' => $ref]),
                ]
            ], 'Withdrawal Request'));

            return static::format('reject_withdraw', $withdrawals->toArray(), $user);
        }
    }

    static function transfer(Transfer $transfer)
    {
        $status = $transfer->status;
        $ref = $transfer->ref;
        $to = $transfer->account_no;
        $user = User::find($transfer->user_id);
        $toUser = User::find($transfer->to_user);
        $curr = $transfer->currency;

        //---
        if ($status == 'pending') {
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

            return static::format('transfer_completed', $transfer->toArray(), $user);
        } else if ($status == 'failed') {
            if ($user) {
                $user->notify(new Notify("Transfer to `$to` failed", [], 'Transactions'));
            }

            return static::format('transfer_failed', $transfer->toArray(), $user);
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
            $user->notify(new Notify("$prefix Exchange from $from->code to $to->code has been activated", [
                'summary' => 'Exchange request',
            ], 'Trade'));
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

    static function format(string $key, array $data, User $user)
    {
        $gs = Generalsetting::first();
        $template =  EmailTemplate::where('email_type', $key)->first();
        $subject = $template->email_subject;

        if ($gs->email_notify) {
            $message = str_replace('{name}', $user->name, $template->email_body);
            //------------
            foreach ($data as $key => $value) {
                $message = str_replace("{" . $key . "}", $value, $message);
            }
        }

        return new Mail($subject, $message);
    }

    static function credit(array $data, User $user)
    {
        $amount = $data['amount'];
        //---------
        $user->notify(new Notify("Your account has been credited with $amount", [], 'Transactions'));
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
}
