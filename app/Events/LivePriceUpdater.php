<?php

namespace App\Events;

use App\Models\HistoricalData;
use App\Models\MarketData;
use App\Models\User;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class LivePriceUpdater implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    /**
     * Create a new event instance.
     */
    public function __construct(
        public string $type,
        public array $data,
    ) {
        //
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel('live.crypto.price.updates'),
        ];
    }

    public function broadcastAs()
    {
        return 'LivePriceUpdater';
    }

    public function broadcastWith()
    {
        return [
            'type' => $this->type,
            'data' => $this->data
        ];
    }
}
