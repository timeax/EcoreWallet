<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user(),
                'notifications' => $request->user()?->notifications
            ],
            'flash' => [
                'message' => fn () => $request->session()->get('message'),
                'params' => fn () => $request->session()->get('params'),
                'errors' => fn () => $request->session()->get('errors')
            ],

            'updated_props' => fn () => $request->session()->get('props')
            // 'errors' => fn () => $request->session()->get('messages')
        ];
    }
}
