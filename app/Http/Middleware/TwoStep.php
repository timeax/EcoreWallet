<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Generalsetting;
use Illuminate\Support\Facades\Log;

class TwoStep
{

    public function handle(Request $request, Closure $next)
    {
        $two_fa = Generalsetting::value('two_fa');
        if ($two_fa) {
            $user = auth()->user();
            $pref = 'user';
            if ($user->two_fa_status == 0 && is_null($user->two_fa_code) && $user->two_fa) {
                return redirect(route($pref . '.two.step.verification'));
            }
            return $next($request);
        }
        return $next($request);
    }

    protected $except = [
        'merchant/resend/two-step/verify-code',
        '/twostep/verification',
        'tostep/verify'
    ];
}
