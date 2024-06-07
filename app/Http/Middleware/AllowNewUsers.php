<?php

namespace App\Http\Middleware;

use App\Models\Generalsetting;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AllowNewUsers
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $gs = Generalsetting::first();
        //--- make sure registrations are on
        if ($gs->registration == 0) {
            return redirect(route('front.index', ['error' => 'Registrations are currently off.']));
        }
        return $next($request);
    }
}
