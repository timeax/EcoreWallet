import React from 'react';
import StyledButton, { DefStyledProps } from './StyledButton';
import { ColorNames, color } from '@assets/fn/create-color';
import styles from '@styles/components/button.module.scss';

const IconButton: React.FC<IconButtonProps> = ({ inset, variant = 'none', children, className = '', bgColor = 'primary', color, shape = 'square', size = '16px', ...rest }) => {
    //--- code here ---- //
    const colors = getColor(bgColor);

    const classNames: string[] = [className, styles['icon-' + shape], styles.icon];

    const props: DefStyledProps = {
        variant,
        bgColor: colors.value,
        bgFocus: colors.focus,
        bgHover: colors.hover,
        color: variant == 'none' ? colors.focus : colors.color,
        effects: true,
        hColor: colors.colorHover,
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

interface IconButtonProps extends AppElement<React.ButtonHTMLAttributes<any>> {
    variant?: "none" | "contained" | "outlined";
    shape?: 'circle' | 'square',
    href?: string;
    linkComponent?: any;
    inset?: boolean
    bgColor?: ColorNames;
    color?: string
    size?: string
}

export default IconButton
