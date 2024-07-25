<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class LogoutDiactivatedAccounts
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Auth::user();
        if ($user->status == 0) {
            Auth::logout();
            //----------
            return redirect(route('login'))->with(['message' => msg('Your account has been deactivated, contact support for more info', 'error')]);
        }
        return $next($request);
    }
}
