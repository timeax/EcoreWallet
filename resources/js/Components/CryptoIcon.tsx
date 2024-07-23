import React, { useEffect, useRef, useState } from 'react';
import colors from '@styles/utils/crypo_colors.module.scss';
import Tag from '.';
import styled from 'styled-components';
import { assets, showIf } from '@assets/fn';
import { Currencies } from '@typings/index';

const keys = Object.keys(colors).map(key => key.split('__').join(' ').trim().toLowerCase());

function getColor(name: string) {
    const colorKey = keys.find(item => item === name.toLowerCase() || name.startsWith(item)) || 'defaultColor';
    //---------
    return colors[colorKey.split(' ').join('__')]
}

const CryptoIcon: React.FC<CryptoIconProps> = ({ name: coin = '', shape = 'circle', label = coin, curr, img, ...props }) => {
    //--- code here ---- //
    let classes = ['flex items-center justify-center'];
    //---
    if (shape === 'circle') classes.push('rounded-full')
    if (shape === 'pill') classes.push('rounded-[999px]')
    if (shape === 'smooth') classes.push('rounded');

    if (curr) {
        coin = curr.curr_name;
        label = curr.symbol;
        //@ts-ignore-----------
        if (!img) img = assets(curr.icon);
    }

    const [loaded, setLoaded] = useState<boolean>();
    const ref = useRef<HTMLDivElement>();
    useEffect(() => {
        if (ref.current) {
            const image = ref.current.querySelector('img');
            if (image) {
                setLoaded(image.complete);
            };
        }
    }, []);

    return (
        <Coin tagRef={ref} loaded={loaded} className={classes.join(' ')} name={coin} {...props}>
            {showIf(img, <img src={img} />)}
            {showIf(!loaded, label)}
        </Coin>
    );
}

const Coin = styled(Tag)<DefProps>(({ size, width = '3rem', loaded, height = '3rem', shape = 'circle', variant = 'contained', name = '' }) => {
    const color = getColor(name);

    const img = {
        background: 'none',
        img: { width: '100%' }
    }

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
        width,
        display: 'flex',
        height,
        position: 'relative',
        ...(loaded ? img : {}),
        ...(size ? { fontSize: size } : '')
    }
});

interface DefProps extends AppElement {
    width?: string;
    size?: string;
    height?: string;
    variant?: 'contained' | 'outlined';
    shape?: 'circle' | 'pill' | 'smooth' | 'sqaure';
    name?: string;
    img?: string;
    curr?: Currencies[number]
}

interface CryptoIconProps extends DefProps {
    label?: string;
}

export default CryptoIcon
