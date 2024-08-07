import React, { ReactNode } from 'react';
import styles from '@styles/components/card.module.scss';
import Text from '../Text';
import { Title } from '@components/Trade';

const Cardheader: React.FC<CardheaderProps> = ({ children, className = '', variant = 'title' }) => {
    //--- code here ---- //
    let title = children, helpers;
    if (Array.isArray(children)) {
        [title, helpers] = children;
    }

    return (
        <div className={styles.header + ' *:select-none ' + className}>
            <Title noPad bright data-section='card-title' className={styles[variant]}>{title}</Title>
            {
                helpers ? <div className={styles.nav}>{helpers}</div> : ''
            }
        </div>
    );
}

interface CardheaderProps extends AppElement {
    children: [ReactNode, ReactNode] | ReactNode;
    variant?: 'mini' | 'title'
}

export default Cardheader
