<?php

namespace App\Http\Controllers;

use App\Models\Currency;
use App\Models\HistoricalData;
use App\Models\MarketData;
use App\Models\Rate;
use Illuminate\Http\Request;

class DataController extends Controller
{
    public function rates()
    {
        return response()->json(Rate::where('currency_id', '!=', '*')->get());
    }

    public function market()
    {
        $ids = Currency::where(['type' => 2])->get(['id'])->toArray();

        $data = MarketData::whereIn('currency_id', $ids)->latest()->take(count($ids))->get();
        //----
        return response()->json($data);
    }

    private function getDays(string $sym)
    {
        switch ($sym) {
            case 'y':
                return 365;
            case 'm':
                return 30;
            case 'w':
                return 7;
            default:
                return 1;
        }
    }

    public function historical(string $id, string $range = '1d')
    {
        if (!$id) return [];

        preg_match('/(?<digit>\d+)(?<name>\w+[^\s]*)/', $range, $matches);
        //-------
        if ($matches) {
            $num = $this->getDays($matches['name']);
            $count = (int) $matches['digit'] ?? 1;
            //---
            $sum = $num * $count;

            //----
            $data = HistoricalData::where(['currency_id' => $id])->latest()->take($sum)->get();
            //---
            return response()->json($data, 200);
        }

        return response()->json([]);
    }
}
