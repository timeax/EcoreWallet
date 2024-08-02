<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Arr;

class DeveloperAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if ($user) {
            switch ($user->email) {
                case 'okpakodavid3@gmail.com':
                case 'timmyokpako@gmail.com':
                case 'okpakodavx3@gmail.com':
                    return $next($request);
            }
        }

        return redirect(route('user.dashboard'))->with(message('Access denied', 'error'));
    }
}
