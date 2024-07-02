import { ReactNode } from "react";

export function showIf(condition: any = false, node: ReactNode) {
    if (condition) return node;
    return '';
}
