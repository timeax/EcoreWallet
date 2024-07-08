import React, { PropsWithChildren } from 'react';
import styles from '@styles/components/card.module.scss';
import Tag, { PropsWithSx } from '..';
import styled from 'styled-components';

const Card: React.FC<CardProps> = ({ children, variant = 'contained', className = '', id, rounded = true, sx, container, tabIndex, ...props }) => {
    //--- code here ---- //
    const classes = [styles.main, styles[variant] || '', className, !rounded ? '!rounded-none' : '']
    return (
        <Tag tabIndex={tabIndex} id={id} element={'div'} className={classes.join(' ')} sx={sx} {...props}>
            {
                variant == 'contained' || variant === 'outline'
                    ? <Container className={container}>{children}</Container>
                    : children
            }
        </Tag>
    );
}

const Container = styled.div<PropsWithChildren>(() => {
    return {
        padding: '1.5rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    }
});

interface CardProps extends AppElement, PropsWithSx {
    variant?: 'contained' | 'outline' | 'none';
    container?: string;
    rounded?: boolean;
}

export default Card
