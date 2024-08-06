import React, { PropsWithChildren } from 'react';
import styles from '@styles/components/card.module.scss';
import Tag, { PropsWithSx } from '..';
import styled from 'styled-components';
import { classNames } from 'primereact/utils';
import { showIf } from '@assets/fn';
import { Title } from '@components/Trade';

const Card: React.FC<CardProps> = ({ bb, children, variant = 'contained', className = '', id, rounded = true, sx, container, tabIndex, ...props }) => {
    //--- code here ---- //
    const classes = [styles.main, styles[variant] || '', className, !rounded ? '!rounded-none' : '', bb ? styles.borderBottom : '']
    return (
        <Tag data-section={'card'} tabIndex={tabIndex} id={id} element={'div'} className={classes.join(' ')} sx={sx} {...props}>
            {
                variant == 'contained' || variant === 'outline'
                    ? <Container data-section='container' className={container}>{children}</Container>
                    : children
            }
        </Tag>
    );
}


export const UICard: React.FC<UICardProps> = ({ children, header, contained = true, rounded = true, body = '', variant = 'contained', container = '', className = '', ...props }) => {
    //--- code here ---- //
    const add = (node: any, className: string = '') => contained ? <div data-section='container' className={classNames(styles.container, className, container)}>{node}</div> : node;
    return (
        <Tag data-section={'card'} element='div' className={classNames('flex flex-col overflow-hidden', className, {
            'rounded-lg': rounded,
            'bg-theme-bgColor': variant == 'contained',
            'border border-theme-bgContent': variant == 'outline',
            'bg-transparent': variant == 'none',
        })} {...props}>
            {showIf(header, add(header, '!h-fit'))}
            <div data-section='card-body' className={'overflow-auto pb-[.6rem] ' + body}>
                {add(children, header ? '!pt-0' : '')}
            </div>
        </Tag>
    );
}


export const UICHeader: React.FC<UICHeaderProps> = ({ children, title, sm = true, lg, className = '' }) => {
    //--- code here ---- //
    return (
        <div className='flex items-center justify-between *:select-none pb-[0.6rem'>
            <Title data-section={'card-title'} noPad className={classNames(className, {
                [styles.mini]: sm,
                [styles.title]: lg,
            })}>{typeof title == 'function' ? title() : title}</Title>

            <div className='flex items-center' data-section='card-action'>
                {children}
            </div>
        </div>
    );
}

interface UICHeaderProps extends PropsWithChildren {
    title: string | (() => React.ReactNode);
    sm?: boolean;
    className?: string
    lg?: boolean;
}


interface UICardProps extends React.PropsWithChildren<PropsWithSx>, AppElement {
    header?: React.ReactNode;
    contained?: boolean;
    rounded?: boolean;
    variant?: 'contained' | 'outline' | 'none';
    container?: string;
    body?: string
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
    bb?: boolean
}

export default Card
