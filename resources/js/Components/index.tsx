"use client";

import React from "react";
import { type CSSProperties } from "react";
import styled from "styled-components";
import isPropValid from '@emotion/is-prop-valid';
import cssprops from "@assets/fn/cssprops";

const StyledTag = styled.div
    .withConfig({ shouldForwardProp: (prop) => prop === 'tabIndex' || (isPropValid(prop) && prop !== 'color') })
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

const Tag: React.FC<TagProps & StyledProps & { [x: string]: any }> = ({ element: TagName = "div", sx, ...props }) => {
    //--- code here ---- //
    return <StyledTag sx={sx} as={TagName} {...props} />;
};

interface TagProps extends PropsWithSx, AppElement {
    element?: ElementType<HTMLTags> | React.FunctionComponent;
}

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
    [x: string]: CSSProperties | CSSRule | string;
}

export type SxProps = CSSProperties | CSSRule;

export default Tag;
