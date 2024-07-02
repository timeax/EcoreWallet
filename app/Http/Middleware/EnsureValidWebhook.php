<?php

namespace App\Http\Middleware;

use App\Models\Generalsetting;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class EnsureValidWebhook
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        //Make sure the IP is from Cryptomus
        $header = 'X-Forwarded-For';
        if (
            !$request->hasHeader($header)
            || $request->header($header) !== env('CRYPTOMUS_IP')
        ) return response('Wrong Request', 419);

        //-------- Verify Signature
        $sign = $request->get('sign');
        $type = $request->get('type');

        $data = $request->all();
        unset($data['sign']);
        //------
        $hash = md5(base64_encode(json_encode($data, JSON_UNESCAPED_UNICODE)) . env($type === 'payment' ? 'PAYMENT_KEY' : 'PAYOUT_KEY'));
        //--------
        if ($hash !== $sign) return response('Wrong Request', 419);
        //------------ Check the url tokens
        $sysKey = $request->route('key');
        $url_id = $request->route('url_id');
        $user_id = $request->route('user_id');
        //-------
        $gs = Generalsetting::first();
        //---------
        if (!$sysKey || !$url_id || !$user_id) return response('Wrong Request', 419);
        $user = User::where(['id' => $user_id], '=')->firstOrFail();
        //----
        if ($sysKey !== $gs->webhook_uuid) return response('Wrong Request', 419);

        $user->addresses()->where(['url_id' => $url_id])->firstOrFail();

        return $next($request);
    }
}
