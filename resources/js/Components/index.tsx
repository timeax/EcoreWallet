"use client";

import React, { JSXElementConstructor, RefObject } from "react";
import { type CSSProperties } from "react";
import styled, { WebTarget } from "styled-components";
import isPropValid from '@emotion/is-prop-valid';
import cssprops from "@assets/fn/cssprops";
import Button from "./Button";



const StyledTag = styled.div
    .withConfig({ shouldForwardProp: (prop, element) => verify(prop, element) })
    //@ts-ignore
    <{ sx?: SxProps } & StyledProps>(({ sx = {}, ...props }) => {
        let cssProps: StyledProps = {};

        Object.keys(props).forEach(item => {
            if (item == 'mx') {
                cssProps.marginLeft = props[item];
                cssProps.marginRight = props[item];
            } else if (item === 'my') {
                cssProps.marginTop = props[item];
                cssProps.marginBottom = props[item];
            } else if (item === 'px') {
                cssProps.paddingLeft = props[item];
                cssProps.paddingRight = props[item];
            } else if (item === 'py') {
                cssProps.paddingTop = props[item];
                cssProps.paddingBottom = props[item];
                //@ts-ignore
            } else cssprops.includes(item) && (cssProps[item] = props[item]);
        });

        return { ...cssProps, ...sx }
    });


type TT = JSXElementConstructor<any> | keyof React.JSX.IntrinsicElements;

//@ts-ignore
function Tag<T extends TT>(args: TagProps<{ element?: T }> & StyledProps & { [x: string]: any }) {
    //@ts-ignore
    const { element = 'div', sx, tagRef, ...props } = args;
    //@ts-ignore--- code here ---- //
    return <StyledTag sx={sx} as={element} {...(tagRef ? { ref: tagRef } : {})}  {...props} />;
}

type TagProps<T extends { element: TT }>
    = PropsWithSx &
    AppElement & {
        tagRef?: React.RefObject<any>
    } & React.ComponentProps<T['element'] | 'div'> & T

export interface PropsWithSx {
    sx?: SxProps
}


type CSSRule = {
    [P in ElementType<HTMLTags>]?: CSSProperties | CSSRuleRef;
} & AnyRule;

type CSSRuleRef = {
    [P in ElementType<HTMLTags>]?: CSSProperties | CSSRule;
} & AnyRule;

type AnyRule = {
    [x: string]: CSSProperties | CSSRule | string | number;
}

export type SxProps = CSSProperties | CSSRule;

export default Tag;
function verify(prop: string, element: WebTarget): boolean {
    if (typeof element !== 'string') return true;
    return prop === 'tabIndex' || (isPropValid(prop) && prop !== 'color')
}
