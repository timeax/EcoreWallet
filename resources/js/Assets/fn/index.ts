import { ReactNode } from "react";
import colors from '@styles/utils/crypo_colors.module.scss';
const keys = Object.keys(colors).map(key => key.split('__').join(' ').trim().toLowerCase());

export function showIf(condition: any = false, node: ReactNode, elseNode: React.ReactNode = '') {
    if (condition) return node;
    return elseNode;
}


export function getCrptoColor(name: string) {
    const colorKey = keys.find(item => item === name.toLowerCase() || name.startsWith(item)) || 'defaultColor';
    //---------
    return colors[colorKey.split(' ').join('__')]
}


export function cutArr(arr: any, limit: number = 10) {
    if (!Array.isArray(arr)) return [];
    if (arr.length <= limit) return arr;

    return arr.slice(0, limit + 1);
}

export function getDate(date: string) {
    const d = new Date(date);
    return {
        time: d.toLocaleTimeString(),
        date: d.toDateString()
    }
}

