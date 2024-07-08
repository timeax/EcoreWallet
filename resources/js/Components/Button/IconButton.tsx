import React from 'react';
import StyledButton, { DefStyledProps } from './StyledButton';
import { Color, ColorNames, color as getColor } from '@assets/fn/create-color';
import styles from '@styles/components/button.module.scss';

const IconButton: React.FC<IconButtonProps> = ({ inset, variant = 'none', children, className = '', bgColor = 'primary', color, shape = 'square', size = '16px', ...rest }) => {
    //--- code here ---- //
    const colorFunc = getColor('background');
    const colors = colorFunc(bgColor);
    const effects = colors.effects();

    const classNames: string[] = [className, styles['icon-' + shape], styles.icon];

    const props: DefStyledProps = {
        variant,
        bgColor: colors.color,
        bgFocus: effects.focus,
        bgHover: effects.hover,
        color: color || (variant == 'none' || variant == 'outlined' ? effects.focus : effects.text),
        effects: true,
        hColor: effects.hoverColor || colors.color,
        iconStyle: shape,
        size,
        shadowInset: inset
    }


    return (
        <StyledButton spacing={0} {...props} {...rest} className={classNames.join(' ').trim()}>
            {children}
        </StyledButton>
    );
}

interface IconButtonProps extends AppElement<React.ButtonHTMLAttributes<HTMLButtonElement>> {
    variant?: "none" | "contained" | "outlined";
    shape?: 'circle' | 'square',
    href?: string;
    linkComponent?: any;
    inset?: boolean
    bgColor?: ColorNames;
    color?: Color
    size?: string
}

export default IconButton
