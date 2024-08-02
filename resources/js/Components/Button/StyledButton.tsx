import { Color } from "@assets/fn/create-color";
import Tag, { SxProps } from "..";
import styled from "styled-components";

//@ts-ignore
const StyledButton = styled(Tag)<Props>(({ spacing, shadowInset, variant, bgColor, color, bgFocus, bgHover, hColor, effects, size, iconStyle, hardCodedColor = false, lineHeight }) => {
    const inset = shadowInset ? 'inset' : '';
    const widths = shadowInset ? '7px 6px ' : '0 0'
    const boxShadow = `${widths} 2px 1px ${bgColor} ${inset}`
    //---
    const contained: SxProps = {
        background: bgColor,
        color,

        '&:focus': {
            background: bgFocus,
            boxShadow,
            color: hColor
        },

        '&:hover': {
            background: bgHover,
            color: hColor
        }
    }

    const outline: SxProps = {
        border: `1px solid ${bgColor}`,
        color: bgColor,

        '&:hover': {
            border: `1px solid ${bgHover}`,
            color: bgHover,
        },

        '&:focus': {
            border: `1px solid ${bgFocus}`,
            color: bgFocus,
            boxShadow
        }
    }


    let mouseEffects = {
        '&:hover': {
            color: bgFocus,
            ...(effects ? {
                //@ts-ignore
                [StyledIcon]: {
                    ...(iconStyle === 'none' ? {
                    } : { background: bgHover, svg: { color: hColor } }),
                }
            } : {})
        },

        '&:focus': {
            color: bgFocus,
            ...(effects ? {
                //@ts-ignore
                [StyledIcon]: {
                    ...(iconStyle === 'none' ? {
                        svg: {
                            color: bgFocus
                        }
                    } : { background: bgFocus, svg: { color: hColor } }),
                }
            } : {})
        }
    }

    const none: SxProps = {
        border: 'none',
        backgroundColor: 'transparent',
        color,
        ...mouseEffects,
    }


    return {
        ...(lineHeight ? { lineHeight: lineHeight + ' !important' } : {}),
        ...(variant === 'contained' ? contained : variant == 'outlined' ? outline : none),
        ...(size ? { fontSize: size } : {}),
        columnGap: spacing,
    }
});

export interface IconProps {
    bgColor: string;
    bgHover: string;
    bgFocus: string;
    hColor: string;
    color: string;
    size: string;
    effects: boolean;
    shadowInset?: boolean
    iconStyle: 'circle' | 'square' | 'none';
}

export const StyledIcon = styled(Tag)<IconProps>(props => {
    const { iconStyle = 'none', bgColor, bgFocus, shadowInset, bgHover, hColor, color, size, effects } = props;


    return {
        fontSize: size,
        ...(iconStyle !== 'none' ? { background: bgColor } : {}),
        ...(effects ? {
            '&:hover': {
                ...(iconStyle === 'none' ? {
                    color: bgHover
                } : { background: bgColor, color: hColor }),
            },

            '&:focus': {
                ...(iconStyle === 'none' ? {
                    color: bgFocus
                } : { background: bgFocus, color: hColor, boxShadow: `${shadowInset ? '4px 4px' : '0 0'} 5px 1px ${bgColor} ${shadowInset ? 'inset' : ''}` }),
            }
        } : {}),
        svg: {
            color
        }
    }
})

export interface DefStyledProps {
    color?: Color;
    bgColor?: Color;
    spacing?: string | number;
    size?: string;
    variant?: "none" | "contained" | "outlined";
    bgFocus: string;
    bgHover: string;
    hColor: string;
    lineHeight?: number;
    iconStyle: string
    shadowInset?: boolean;
    effects: boolean;
    hardCodedColor?: boolean
}


type Props = DefStyledProps;

export default StyledButton;
