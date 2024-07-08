import Text from '@components/Text';
import React, { PropsWithChildren, ReactNode } from 'react';
import { RiErrorWarningFill } from 'react-icons/ri';
import { Title } from '.';
import { create } from '@assets/fn/create-color';
import { classNames } from 'primereact/utils';

const Note: React.FC<PropsWithChildren<WarningProps>> = ({ title, children, variant = 'disclaimer', lg }) => {
    //--- code here ---- //
    let icon: ReactNode;
    switch (variant) {
        case 'disclaimer':
            icon = <RiErrorWarningFill />
            break;
        case 'warning':
            icon = <RiErrorWarningFill color={create('warning')} />
            break;
        case 'tip':
            icon = <RiErrorWarningFill color={create('success')} />
            break;
    }

    return (
        <div className='flex flex-col gap-2 p-4 mt-4'>
            <Text variant={'other'} size='30px'>{icon}</Text>
            <Title noPad bold xl>{title}</Title>
            <Title noPad brighter className={classNames({
                'text-[16px]': lg,
                '': !lg
            })}>{children}</Title>
        </div>
    );
}

interface WarningProps {
    title: ReactNode,
    variant?: 'disclaimer' | 'warning' | 'tip';
    lg?: boolean
}

export default Note
