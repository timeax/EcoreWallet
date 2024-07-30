<?php

use App\Helpers\Display;
use Carbon\Carbon;
use App\Models\Offer;
use App\Models\Trade;
use App\Models\Charge;
use Twilio\Rest\Client;
use App\Models\Currency;
use App\Models\OfferLimit;
use App\Models\SmsGateway;
use Illuminate\Support\Str;
use App\Models\EmailTemplate;
use App\Models\Generalsetting;
use App\Models\PaymentGateway;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;


function getPhoto($filename)
{
    if ($filename) {
        if (file_exists('assets/images' . '/' . $filename)) return asset('assets/images/' . $filename);
        else if (file_exists("storage/$filename")) return asset('storage/' . $filename);
        else return asset('assets/images/default.png');
    } else {
        return asset('assets/images/default.png');
    }
}

function message(string $text, string $color = 'success', $variant = 'outlined')
{
    return ['message' => compact('text', 'color', 'variant')];
}

function msg(string $text, string $color = 'success', $variant = 'outlined')
{
    return compact('text', 'color', 'variant');
}

function getFee($amount, $fee, $type = 'fixed')
{
    if ($type == 'fixed') $fee;
    //------------
    $amount = (float) $amount;
    $fee = (float) $fee;
    //--------
    return ($fee / 100) * $amount;
}

function views_path(string $path, array $options = ['separator' => '.', 'ext' => '.php'])
{
    $path = trim(implode(DIRECTORY_SEPARATOR, explode($options['separator'], $path)));
    //---
    $path .= trim($options['ext']);

    $base = resource_path('views');
    return   preg_replace('~[/\\\\]+~', DIRECTORY_SEPARATOR, implode(DIRECTORY_SEPARATOR, [$base, $path]));
}

function display(string $route, $props = [])
{
    Display::render($route, $props);
}

function admin()
{
    return auth()->guard('admin')->user();
}

function addonLicenceCheck($script_key, $addon_key)
{
    return Http::get("https://geniusocean.com/verify/addoncheck.php?script_code=$script_key&addon_code=$addon_key")->json();
}

function user()
{
    if (auth()->check()) {
        $user = auth()->user();
        $type = 1;
    }

    if (auth()->guard('merchant')->check()) {
        $user = auth()->guard('merchant')->user();
        $type = 2;
    }

    return json_decode(json_encode(['user' => $user, 'type' => $type]));
}

function menu($route)
{
    if (is_array($route)) {
        foreach ($route as $value) {
            if (request()->routeIs($value)) {
                return 'active';
            }
        }
    } elseif (request()->routeIs($route)) {
        return 'active';
    }
}


function tagFormat($tag)
{
    $common_rep   = ["value", "{", "}", "[", "]", ":", "\""];
    $tag = str_replace($common_rep, '', $tag);
    if (!empty($tag))  return $tag;
    else  return  null;
}

function numFormat($amount, $length = 0)
{
    if (0 < $length) return number_format($amount, $length);
    return $amount + 0;
}

function amount($amount, $type = 1, $length = 2)
{
    if ($type == 2) return numFormat($amount, 8);
    else return numFormat($amount, $length);
}



function chargeCalc($charge, $amount)
{
    return ($charge->fixed_charge) + ($amount * ($charge->percent_charge / 100));
}

function dateFormat($date, $format = 'd M Y -- h:i a')
{
    return Carbon::parse($date)->format($format);
}

function randNum($digits = 6)
{
    return rand(pow(10, $digits - 1), pow(10, $digits) - 1);
}

function str_rand($length = 12, $up = false)
{
    if ($up) return Str::random($length);
    else return strtoupper(Str::random($length));
}


function getCurrency()
{
    if (Session::has('currency')) {
        $currency = Currency::findOrFail(Session::get('currency'));
    } else {
        $currency = Currency::whereIsDefault(1)->first();
    }
    return json_encode($currency->toArray());
}


// Payment Gateway Keyword Calculation 0
function getCallback($id)
{
    return PaymentGateway::findOrFail($id)->keyword;
}


function email($data)
{
    $gs = Generalsetting::first();

    if ($gs->email_notify) {
        if ($gs->mail_type == 'php_mail') {
            $headers = "From: $gs->sitename <$gs->email_from> \r\n";
            $headers .= "Reply-To: $gs->sitename <$gs->email_from> \r\n";
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/html; charset=utf-8\r\n";
            @mail($data['email'], $data['subject'], $data['message'], $headers);
        } else {
            $mail = new PHPMailer(true);

            try {
                // $mail->isSMTP();
                $mail->Host       = $gs->smtp_host;
                $mail->SMTPAuth   = true;
                $mail->Username   = $gs->smtp_user;
                $mail->Password   = $gs->smtp_pass;
                if ($gs->mail_encryption == 'ssl') {
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                } else {
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                }
                $mail->Port       = $gs->smtp_port;
                $mail->CharSet = 'UTF-8';
                $mail->setFrom($gs->from_email, $gs->from_name);
                $mail->addAddress($data['email'], $data['name']);
                $mail->addReplyTo($gs->from_email, $gs->from_name);
                $mail->isHTML(true);
                $mail->Subject = $data['subject'];
                $mail->Body    = $data['message'];
                $mail->send();
            } catch (Exception $e) {
                throw new Exception($e);
            }
        }
    }
}

function uuid($id, string $identifier = 'ref')
{
    $currentTime = strtotime('now');
    $randStr = Str::random(10);
    //---
    return str_shuffle($randStr . $currentTime . $identifier . $id);
}
function getHours(string $sym)
{
    $sym = Str::lower($sym);

    switch ($sym) {
        case 'y':
            return 365 * 24;
        case 'm':
            return 30 * 24;
        case 'd':
            return 24;
        case 'w':
            return 7 * 24;
        default:
            return 1;
    }
}
function toTime(string $frame)
{
    preg_match('/(?<digit>\d+)(?<name>\w+[^\s]*)/', $frame, $matches);
    if ($matches) {
        $hours = getHours($matches['name']);
        $count = ((int) $matches['digit'] ?? 1) * $hours;
        $name = $count > 1 ? 'hours' : 'hour';
        //--------
        return strtotime("+$count $name");
    }
}

function getStatusMessage(string $status, string $prefix)
{
    $status = getStatus($status);
    switch ($status) {
        case 'success':
            return $prefix . ' Completed';
        case 'pending':
            return 'Pending' . " $prefix";
        case 'failed':
            return $prefix . ' Failure';
        case 'refund':
            return $prefix . ' refund in proccess';
        case 'refund failed':
            return $prefix . ' refund failed';
        case 'refunded':
            return $prefix . ' cash successfully refunded';
    }
}

function getStatus(string $status)
{
    switch ($status) {
        case 'paid':
            return 'success';
        case 'process':
            return 'pending';
        case 'cancel':
        case 'system_fail':
        case 'fail':
            return 'failed';
        case 'refund_process':
            return 'refund';
        case 'refund_failed':
            return 'refund failed';
        case 'refund_paid':
            return 'refunded';
    }

    return $status;
}

function mailSend($key, array $data, $user)
{

    $gs = GeneralSetting::first();
    $template =  EmailTemplate::where('email_type', $key)->first();

    if ($gs->email_notify) {
        $message = str_replace('{name}', $user->name, $template->email_body);

        foreach ($data as $key => $value) {
            $message = str_replace("{" . $key . "}", $value, $message);
        }

        if ($gs->mail_type == 'php_mail') {
            $headers = "From: $gs->sitename <$gs->email_from> \r\n";
            $headers .= "Reply-To: $gs->sitename <$gs->email_from> \r\n";
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: text/html; charset=utf-8\r\n";
            @mail($user->email, $template->email_subject, $message, $headers);
        } else {
            $mail = new PHPMailer(true);

            try {
                //$mail->isSMTP();
                $mail->Host       = $gs->smtp_host;
                $mail->SMTPAuth   = true;
                $mail->Username   = $gs->smtp_user;
                $mail->Password   = $gs->smtp_pass;
                if ($gs->mail_encryption == 'ssl') {
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                } else {
                    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                }
                $mail->Port       = $gs->smtp_port;
                $mail->CharSet = 'UTF-8';
                $mail->setFrom($gs->from_email, $gs->from_name);
                $mail->addAddress($user->email, $user->name);
                $mail->addReplyTo($gs->from_email, $gs->from_name);
                $mail->isHTML(true);
                $mail->Subject = $template->email_subject;
                $mail->Body    = $message;
                $mail->send();
            } catch (Exception $e) {
                // throw new Exception($e);
            }
        }
    }

    if ($gs->sms_notify) {
        $message = str_replace('{name}', $user->name, $template->sms);
        foreach ($data as $key => $value) {
            $message = str_replace("{" . $key . "}", $value, $message);
        }
        sendSMS($user->phone, $message, $gs->contact_no);
    }
}

function sendSMS($recipient, $message, $from)
{
    $sg = SmsGateway::where('status', 1)->first();
    try {
        if ($sg->name == 'Nexmo')       nexmo($recipient, $message, $from, $sg->config);
        else if ($sg->name == 'Twilio') twilio($recipient, $message, $sg->config);
    } catch (\Throwable $th) {
    }
}

function twilio($recipient, $message, $config)
{
    $sid = $config->sid;
    $token = $config->token;
    $from_number = $config->from_number;

    $client = new Client($sid, $token);
    $client->messages->create(
        '+' . $recipient,
        array(
            'from' => $from_number,
            'body' => $message
        )
    );
}

function nexmo(string $recipient, $message, $from, $config)
{
    $basic  = new \Vonage\Client\Credentials\Basic($config->api_key, $config->api_secret);
    $client = new \Vonage\Client($basic);
    $client->sms()->send(
        new \Vonage\SMS\Message\SMS($recipient, $from, $message)
    );
}


function access($permission)
{
    return admin()->can($permission);
}


//gateway helpers

function storePrice($amount)
{

    $curr = Session::has('currency') ? Session::get('currency') : Currency::whereDefault(1)->first();
    return $amount;
}

function setCurrencyPrice($amount)
{
    $curr = Session::has('currency') ? Currency::findOrFail(Session::get('currency')) : Currency::whereDefault(1)->first();
    return $curr->symbol . round($amount * $curr->rate, 2);
}

function currency()
{
    return Session::has('currency') ? Session::get('currency') : Currency::whereDefault(1)->first()->id;
}
function getCurrencyCode()
{
    return Session::has('currency') ? Currency::find(currency())->code : Currency::whereDefault(1)->first()->code;
}

function sessionCurrency()
{
    $curr = Session::has('currency') ? Currency::find(currency()) : Currency::whereDefault(1)->first();
    return json_encode($curr);
}

function loginIp()
{
    $info = unserialize(file_get_contents('http://www.geoplugin.net/php.gp?ip=' . $_SERVER['REMOTE_ADDR']));
    return json_decode(json_encode($info));
}

function filter($key, $value)
{
    $queries = request()->query();
    if (count($queries) > 0) $delimeter = '&';
    else  $delimeter = '?';

    if (request()->has($key)) {
        $url = request()->getRequestUri();
        $pattern = "\?$key";
        $match = preg_match("/$pattern/", $url);
        if ($match != 0) return  preg_replace('~(\?|&)' . $key . '[^&]*~', "\?$key=$value", $url);
        $filteredURL = preg_replace('~(\?|&)' . $key . '[^&]*~', '', $url);
        return  $filteredURL . $delimeter . "$key=$value";
    }
    return  request()->getRequestUri() . $delimeter . "$key=$value";
}

function generateQR($data)
{
    return "https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=$data&choe=UTF-8";
}

function diffTime($time)
{
    return Carbon::parse($time)->diffForHumans();
}

function amountConv($amount, $currency)
{
    return amount($amount / $currency->rate);
}

function defaultCurr()
{
    return Currency::where('default', 1)->first();
}

function translate($key)
{
    $default = json_decode(file_get_contents(resource_path('lang/default.json')), true);
    $key = trim($key);
    if (!array_key_exists($key, $default)) {
        $default[$key] = $key;
        file_put_contents(resource_path('lang/default.json'), json_encode($default));
    }
    return trans($key);
}

function crypto_rate($offer)
{

    if ($offer->price_type == 1) {
        $amount = $offer->crypto->rate * $offer->margin / 100;
        if ($offer->neg_margin == 1) $rate = numFormat($offer->crypto->rate - $amount);
        else $rate = numFormat($offer->crypto->rate + $amount);
    } else {
        $rate = numFormat($offer->fixed_rate);
    }
    return $rate;
}

function counts()
{
    $offer_count = Offer::where('user_id', auth()->id())->count();
    $trade_completed = Trade::where('status', 3)->where(function ($q) {
        $q->orWhere('offer_user_id', auth()->id())->orWhere('trader_id', auth()->id());
    })->count();
    return ['offer_count' => $offer_count, 'trade_completed' => $trade_completed];
}

function offerLimit()
{
    $counts = counts();
    $offer_count = $counts['offer_count'];
    $trade_completed = $counts['trade_completed'];
    $limit = OfferLimit::where('trade_complete', '<=', $trade_completed)->first();
    if ($limit && $offer_count >= $limit->offer_limit) {
        return false;
    }
    return true;
}

function kycOfferLimit()
{
    if (auth()->user()->kyc_status == 1) return true;
    $gs = GeneralSetting::first(['kyc', 'kyc_offer_limit']);
    if ($gs->kyc == 1) {
        $counts = counts();
        $offer_count  = $counts['offer_count'];
        if ($gs->kyc_offer_limit != 0 && $gs->kyc_offer_limit <= $offer_count) return false;
        return true;
    }
    return true;
}
function kycTradeLimit()
{
    if (auth()->user()->kyc_status == 1) return true;
    $gs = GeneralSetting::first(['kyc', 'kyc_trade_limit']);
    if ($gs->kyc == 1) {
        $trade_count  = Trade::where(function ($q) {
            $q->orWhere('offer_user_id', auth()->id())->orWhere('trader_id', auth()->id());
        })->count();
        if ($gs->kyc_trade_limit != 0 && $gs->kyc_trade_limit <= $trade_count) return false;
        return true;
    }
    return true;
}



function mText(string $value, $format = [])
{
    return [
        'type' => 'text',
        'value' => [
            'text' => $value,
            'options' => $format
        ]
    ];
}

function mButton(string $value, string $url, string $color = 'primary', $align = 'center')
{
    return [
        'type' => 'button',
        'value' => [
            'text' => $value,
            'options' => [
                'color' => $color,
                'align' => $align
            ],
            'url' => $url
        ]
    ];
}

function sysVersion()
{
    return '1.2';
}
