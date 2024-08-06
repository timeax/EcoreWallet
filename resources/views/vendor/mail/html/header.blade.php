@props(['url', 'title'])
<tr>
    <td class="header" style="text-align: center; vertical-align: middle">
        <a href="{{ $url }}">
            <table style="width: 100%">
                <tr>
                    <td>
                        <img src="{{ config('app.url') . '/frontend/images/icon.png' }}" class="logo" alt="Ecore Logo">
                    </td>
                </tr>
            </table>
            <table style="width: 100%">
                <tr>
                    <td
                        style="position: relative; padding: 0px; text-align: center;">
                        <span style="line-height: 28px">{{ config('app.name') }}</span>
                    </td>
                </tr>
            </table>
        </a>

        <h2>{{ $title ?? '' }}</h2>
    </td>
</tr>
