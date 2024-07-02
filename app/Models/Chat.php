<?php

namespace App\Models;

use App\Events\ChatEvents;
use App\Notifications\SystemNotification;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Notification;

class Chat extends Model
{
    use HasFactory;

    protected $fillable = [
        'status',
        'user_id',
        'chats',
        'msg',
        'chat_id'
    ];
    protected static function boot()
    {
        parent::boot();
        static::saved(function (self $chat) {
            $status = $chat->status;
            $chats = $chat->chats ?? [];
            $auth = Auth::user();
            $id = $chat->user_id;
            //-----------
            if (count($chats) == 4 && $status === 'pending') {
                broadcast(new Chat([
                    'status' => 'pending',
                    'admin_id' => null,
                    'chat_id' => uuid('system', 'chat'),
                    'msg' => json_encode([
                        'from' => 'system',
                        'type' => 'text',
                        'content' => translate("We are sorry for the delay. A representative will attend to you shortly")
                    ])
                ]));


                $admins = Admin::whereIn('role', ['customer_service', 'admin'])->get();
                Notification::sendNow($admins, new SystemNotification());
                return;
            }
            //---
            $latest = $chat->msg ?? [];
            @$from = $latest['from'] ?? (is_null($auth->role) ? 'user' : 'admin');
            //--------
            $user = $from == 'user' ? User::find($id) : Admin::find($id);
            broadcast(new ChatEvents($chat, $user));
        });
    }

    protected function casts()
    {
        return [
            'msg' => 'array',
            'chats' => 'array'
        ];
    }
}
