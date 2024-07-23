<?php

use App\Models\Admin;
use App\Models\Chat;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('user.{id}', function (User $user, int $id) {
    return (int) $user->id === $id;
});

Broadcast::channel('App.Models.Admin.{id}', function ($user, int $id) {
    return (int) auth()->guard('admin')->user()->id === $id;
});

Broadcast::channel('updates', function () {
    return Auth::check();
});
