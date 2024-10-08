<?php

namespace App\Notifications;

use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class TransactionNotifications extends Notification
{
    use Queueable;
    /**
     * Create a new notification instance.
     */
    private array $data;
    public function __construct(
        public array|Transaction $transaction
    ) {

        $isArray = is_array($transaction);

        $this->data = [
            'remark' => $isArray ? $transaction['remark'] : $transaction->remark,
            'type' => $isArray ? $transaction['type'] : $transaction->type,
            'amount' => !$isArray ? $transaction->amount : $transaction['amount'],
            'ref' => !$isArray ? $transaction->ref : $transaction['ref']
        ];
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database', 'broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)->markdown('mail.system.notification', $this->transaction->toArray());
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return $this->data;
    }

    /**
     * Get the broadcastable representation of the notification.
     */
    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage($this->data);
    }

    public function broadcastType()
    {
        return 'user.transactions.notifications';
    }
}
