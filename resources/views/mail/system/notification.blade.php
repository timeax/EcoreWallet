
<x-mail::message :subject="$subject">

{{$message}}

Thanks,<br>
From {{ config('app.name') }}
</x-mail::message>
