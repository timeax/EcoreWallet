<x-mail::message :subject="$subject">

Hello,

We've recieved a request to reset your password.

If you didn't make the request, just ignore this message, Otherwise, you can reset you password using this link

<x-mail::button :url="$url">
Click here to Reset your password
</x-mail::button>
Click or copy this link below if button doesn't work
{{$url}}

Thanks,<br>
The Ecore Team

</x-mail::message>
