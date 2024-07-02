<x-mail::message>
# Introduction

The body of your message.

<x-mail::button :url="''">
Button Text
</x-mail::button>
<x-mail::panel>
This is the panel content.
</x-mail::panel>

Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
