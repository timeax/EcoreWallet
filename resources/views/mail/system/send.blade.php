<x-mail::message :subject="$subject">

@foreach ($data as $el)
@php
$value = $el['value'];
$type = $el['type'];
//----------
$url = @$value['url'] ?? null;
$text = $value['text'];
$options = $value['options'];
@endphp
@if ($type == 'text')
@php
$opening = '';
$closing = '';
foreach ($options as $key) {
$trimed = trim($key);
$opening .= "<$trimed>";
$closing .= "</$trimed>";
}
$textValue = "$opening $text $closing";
@endphp
{!! $textValue !!}<br>
@elseif ($type == 'button')
@php
$color = $options['color'];
$align = $options['align'];
@endphp
<x-mail::button :color="$color" :align="$align" :url="$url">
{{ $text }}
</x-mail::button>
@endif
@endforeach

Thanks,<br>
From {{ config('app.name') }}
</x-mail::message>
