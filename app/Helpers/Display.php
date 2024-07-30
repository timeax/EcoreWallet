<?php

namespace App\Helpers;

// use Illuminate\Support\Str;
// use Intervention\Image\ImageManagerStatic as Image;

use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Log;

class Display
{

    public function __construct()
    {
    }

    private static $views = 'views';

    public function lookUp(string $loc = 'views')
    {
        static::$views = $loc;
    }

    private static function view(string $path)
    {
        $path = trim(implode(DIRECTORY_SEPARATOR, explode('.', $path)));
        $path .= '.php';
        //--------
        $base = resource_path(static::$views);
        return   preg_replace('~[/\\\\]+~', DIRECTORY_SEPARATOR, implode(DIRECTORY_SEPARATOR, [$base, $path]));
    }

    public static function render(string $route, array $props = [])
    {
        $props = static::use($route, $props);
        extract($props);
        //------------
        return require Display::view($route);
    }

    private static function compare(string $a, string $b)
    {
        $a = trim($a);
        $b = trim($b);
        //
        if ($a == '*') return true;
        return $a == $b;
    }
    private static function use(string $route, array $sentData = [])
    {
        $list = static::$shareable;
        if (empty($list)) return $sentData;
        $newData = [];
        //--
        foreach ($list as $value) {
            $routes = $value['routes'];
            $data = $value['data'];
            //----- Check if route is valid
            $exists = false;
            if (is_array($routes)) {
                foreach ($routes as $r) {
                    $exists = static::compare($r, $route);
                    if ($exists) break;
                }
            } else $exists = static::compare($routes, $route);
            //----------
            if ($exists) {
                $extract = $data;
                if (is_callable($data)) {
                    $extract = $data(request());
                    if (is_null($extract)) continue;
                }

                $newData[] = $extract;
            }
        }

        if (empty($newData)) return $sentData;
        $newData = array_merge(...$newData);

        if (empty($sentData)) return $newData;
        return array_merge($sentData, $newData);
    }

    public function share(string | array $routes, array | callable $data)
    {
        static::$shareable[] = compact('data', 'routes');
    }

    private static array $shareable = [];
}
