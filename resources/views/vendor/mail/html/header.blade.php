@props(['url', 'title'])
<tr>
    <td class="header" style="text-align: center">
        <a href="{{ $url }}" style="display: inline-flex; text-align: center; align-items: center">
            <img src="{{ config('app.url').'/assets/frontend/images/icon.png' }}" class="logo" alt="Ecore Logo">
            {{ config('app.name') }}
        </a>

        <h2>{{$title ?? ''}}</h2>
    </td>
</tr>
