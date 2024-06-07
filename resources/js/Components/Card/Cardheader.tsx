import React, { ReactNode } from 'react';
import styles from '@styles/components/card.module.scss';
import Text from '../Text';

const Cardheader: React.FC<CardheaderProps> = ({ children, className = '', variant = 'main' }) => {
    //--- code here ---- //
    let title = children, helpers;
    if (Array.isArray(children)) {
        [title, helpers] = children;
    }

    return (
        <div className={styles.header + ' ' + className}>
            <Text variant={'header'} className={styles[variant]}>{title}</Text>
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
