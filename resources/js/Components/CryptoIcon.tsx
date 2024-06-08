import React from 'react';
import colors from '@styles/utils/crypo_colors.module.scss';
import Tag from '.';
import styled from 'styled-components';

const keys = Object.keys(colors).map(key => key.split('__').join(' ').trim().toLowerCase());

function getColor(name: string) {
    const colorKey = keys.find(item => item === name.toLowerCase() || name.startsWith(item)) || 'defaultColor';
    //---------
    return colors[colorKey.split(' ').join('__')]
}

const CryptoIcon: React.FC<CryptoIconProps> = ({ name: coin, shape = 'circle', label = coin, ...props }) => {
    //--- code here ---- //
    let classes = ['flex items-center justify-center'];
    //---
    if (shape === 'circle') classes.push('rounded-full')
    if (shape === 'pill') classes.push('rounded-[999px]')
    if (shape === 'smooth') classes.push('rounded')

    return (
        <Coin className={classes.join(' ')} name={coin} {...props}>
            {label}
        </Coin>
    );
}

const Coin = styled(Tag)<DefProps>(({ size, width = '3rem', height = '3rem', shape = 'circle', variant = 'contained', name }) => {
    const color = getColor(name);

    const contained = {
        background: color,
        color: 'white',
    };

    const outlined = {
        border: '1px solid ' + color,
        color,
    }

    return {
        ...(variant === 'contained' ? contained : outlined),
        minWidth: width,
        height,
        ...(size ? { fontSize: size } : '')
    }
});

interface DefProps {
    width?: string;
    size?: string;
    height?: string;
    variant?: 'contained' | 'outlined';
    shape?: 'circle' | 'pill' | 'smooth' | 'sqaure';
    name: string;
}

interface CryptoIconProps extends DefProps {
    label?: string;
}

export default CryptoIcon
