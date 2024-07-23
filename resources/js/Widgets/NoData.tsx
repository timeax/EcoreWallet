import Text from '@components/Text';
import React, { ReactNode } from 'react';
import Tag from '@components/index';
import { Title } from '@components/Trade';

const NoData: React.FC<NoDataProps> = ({ icon, children: [title, desc, action] }) => {
    //--- code here ---- //
    return (
        <Tag element={'div'} py={'2rem'} className='flex flex-col h-full grow gap-3 w-full justify-center items-center'>
            <Tag fontSize={80} color='rgb(var(--color-theme-emphasis))'>{icon}</Tag>
            <Title noPad xl bold className='text-center'>{title}</Title>
            <Text size={'16px'} sx={{
                width: '50%',
                textAlign: 'center'
            }}>{desc}</Text>
            <div>{action}</div>
        </Tag>
    );
}

interface NoDataProps {
    icon?: ReactNode;
    children: [
        title: ReactNode,
        desc: ReactNode,
        action?: ReactNode,
    ]
}

export default NoData
