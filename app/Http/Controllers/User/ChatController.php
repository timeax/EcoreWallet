<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use App\Models\Chat;
use App\Models\User;
use App\Notifications\SystemNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Notification;

use function React\Promise\all;

class ChatController extends Controller
{
    //

    public function create()
    {
        $user = Auth::user();
        $chat = Chat::where(['chat_id' => $user->chat_ref])->firstOrCreate([
            'status' => 'pending',
            'user_id' => $user->id,
            'chat_id' => uuid($user->id, 'chat'),
            'msg' => json_encode(['from' => 'user'])
        ]);

        @$admins = @Admin::whereIn('role', ['customer_service', 'admin'])->get();

        Notification::sendNow($admins, new SystemNotification());
        ///---------
        return response()->json($chat);
    }

    public function adminCreate(string $to, string $message)
    {
        $admin = Auth::user();
        $user = User::findOrFail($to);
        //----------
        $chat = Chat::where(['chat_id' => $admin->chat_ref])->firstOrCreate([
            'status' => 'pending',
            'admin_id' => $admin->id,
            'user_id' => $user->id,
            'chat_id' => uuid($admin->id, 'chat'),
            'msg' => json_encode(['from' => 'admin', 'content' => $message, 'type' => 'text'])
        ]);

        @$user->notify(new SystemNotification());

        return response()->json($chat);
    }

    public function index()
    {
        return view('admin.chat.index');
    }
}
