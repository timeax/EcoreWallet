import { ReactNode } from "react";
import colors from '@styles/utils/crypo_colors.module.scss';
const keys = Object.keys(colors).map(key => key.split('__').join(' ').trim().toLowerCase());
import calc from 'number-precision';
import { Currencies } from "@typings/index";
//@ts-ignore
export function showIf<T = ReactNode | (() => JSX.Element), R = ReactNode>(condition: any = false, El: T, elseNode: R = '') {
    if (condition) {
        //@ts-ignore0
        if (isFC(El)) return El();
        return El;
    }
    return elseNode;
}
function isFC(value: any): value is React.FC {
    return typeof value === 'function'
}

export function getCrptoColor(curr?: Currencies[number] & { color?: string }) {
    const name = curr?.curr_name || '';

    if (curr?.color) return curr.color;

    const colorKey = keys.find(item => item === name.toLowerCase() || name.startsWith(item)) || 'defaultColor';
    //---------
    return colors[colorKey.split(' ').join('__')]
}


export function cutArr(arr: any, limit: number = 10) {
    if (!Array.isArray(arr)) return [];
    if (arr.length <= limit) return arr;

    return arr.slice(0, limit + 1);
}

export function getDate(date: string | Date) {
    const d = typeof date == 'string' ? new Date(date) : date;
    return {
        time: d.toLocaleTimeString(),
        date: d.toDateString(),
        get localTime() {
            return d.toLocaleDateString()
        },
        get miliseconds() {
            return d.getTime();
        }
    }
}

export function assets(resource?: string | null) {
    if (resource) {
        resource = resource.replace(/\\/g, '/');
        //@ts-ignore
        resource = showIf(resource.startsWith('/'), resource.substring(1), resource);
        //---
        return '/storage/' + resource
    }
}


export function nFormatter(num: string | number, digits: number) {
    if (typeof num == 'string') num = parseFloat(num);

    if (Number.isNaN(num)) return '...';

    const lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "k" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "B" },
        { value: 1e12, symbol: "T" },
        { value: 1e15, symbol: "P" },
        { value: 1e18, symbol: "E" }
    ];
    const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
    const item = lookup.findLast(item => num >= item.value);
    return item ? (calc.round(calc.divide(num, item.value), digits) + '').replace(regexp, "").concat(item.symbol) : "0";
}

export function lower(value: string) {
    return value.toLowerCase();
}
