<x-mail::message :subject="$subject">

@if ($status =='complete')
Your email has been successfully verified
@else
<b>Your code: </b>{{$otp}}
@endif

If you did not make this request, you can simply ignore this email.
</x-mail::message>
