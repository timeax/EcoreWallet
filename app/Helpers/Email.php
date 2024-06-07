<?php

use Mailjet\Client;
use \Mailjet\Resources;

class Email
{
    private Client $mail;
    public function __construct()
    {
        $this->mail = new Client(config('app.mailjet_key'), config('app.mailjet_secret'));
    }

    public function send(array $data)
    {
        $response = $this->mail->post(Resources::$Email, ['body' => $data]);
        return $response;
    }
}
