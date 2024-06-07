<?php

namespace App\Http\Middleware;

use Closure;
use Cryptomus;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureNetworkAddress
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // $networks = Cryptomus::services();
        return $next($request);
    }
}
