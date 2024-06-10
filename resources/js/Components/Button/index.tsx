'use client';

import { SxProps } from "..";
import React, { ReactNode } from "react";
import styles from '@styles/components/button.module.scss';
import { ColorNames, color } from "@assets/fn/create-color"
import StyledButton, { DefStyledProps, StyledIcon } from "./StyledButton";
import { Link } from "@inertiajs/react";

const getColor = color('background');

const Button: React.FC<ButtonProps> = ({ id,
    className = '', bgColor = 'primary',
    children, color, effects, ripple,
    icon, shape = 'smooth',
    size = 'md', spacing = '10px', icc: icoClass = '',
    variant = 'contained', linkComponent = Link, iconStyle = 'none',
    sx, iconLoc = 'left', iconSize = '12px', inset, height,
    ...rest
}) => {
    //--- code here ---- //
    const classes = [styles.btn, className, styles['btn-' + size], rest.href ? styles['btn-link'] : '', styles[variant], styles[shape], effects ? styles.effects : '']
    const tagName = rest.href ? (linkComponent || 'a') : 'button';
    //---
    const colors = getColor(bgColor), cfx = colors.effects();

    const styleProps: DefStyledProps = {
        bgFocus: cfx.focus,
        bgHover: cfx.hover,
        bgColor: cfx.value,
        //@ts-ignore
        color: color ? color : variant === 'none' ? colors.focus : cfx.text,
        hColor: cfx.text,
        iconStyle,
        effects: variant === 'none',
        shadowInset: inset,
        lineHeight: height,
        //@ts-ignore
        sx,
        variant,
        spacing
    }

    return (
        <StyledButton
            {...styleProps}
            id={id}
            className={classes.join(' ').trim()}
            element={tagName} {...rest}>
            <span className="btn-text">
                {children}
            </span>
            {icon ? <StyledIcon
                order={iconLoc == 'left' ? -1 : 'initial'}
                bgColor={styleProps.bgColor || ''}
                bgFocus={styleProps.bgFocus}
                bgHover={styleProps.bgHover}
                className={icoClass + ' ' + styles['icon-' + iconStyle]}
                //@ts-ignore
                color={iconStyle === 'none' ? styleProps.color : colors.color}
                hColor={styleProps.hColor}
                iconStyle={iconStyle}
                size={iconSize}
            >{icon}</StyledIcon> : ''}
        </StyledButton>
    );
};


interface DefButtonProps extends AppElement<any> {
    shape?: "pill" | "smooth" | "square" | "circle";
    variant?: "none" | "contained" | "outlined";
    color?: string;
    bgColor?: ColorNames;
    icon?: ReactNode;
    iconLoc?: 'left' | 'right';
    spacing?: string;
    size?: "lg" | "sm" | "md";
    height?: number;
    inset?: boolean;
    sx?: SxProps;
    iconStyle?: 'circle' | 'square' | 'none';
    /**This is the Icon Class Name */
    icc?: string
    ripple?: boolean;
    effects?: boolean
    iconSize?: string;
}

interface PropsWithLink extends DefButtonProps {
    href: string;
    linkComponent?: any
    [x: string]: any
}

interface PropsWithoutLink extends DefButtonProps {
    href?: undefined;
    linkComponent?: undefined
}

export type ButtonProps = PropsWithLink | PropsWithoutLink;

export default Button;
