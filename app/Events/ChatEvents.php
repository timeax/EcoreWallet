<?php

namespace App\Events;

use App\Models\Admin;
use App\Models\Chat;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatEvents
{
    use Dispatchable, InteractsWithSockets, SerializesModels;
    protected array $data = [];
    /**
     * Create a new event instance.
     */
    public function __construct(public Chat $chat, public User|Admin $user)
    {
        $this->data = [
            'name' => $user->name,
            'message' => $chat->msg
        ];
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('live.chats.{id}'),
        ];
    }

    public function broadcaseAs()
    {
        return $this->data;
    }

    public function broadcastAs(): string
    {
        return 'live.chat';
    }
}
