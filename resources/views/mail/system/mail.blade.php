<x-mail::message :subject="$subject">

{!!$message!!}

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
