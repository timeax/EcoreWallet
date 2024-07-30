import React, { ReactNode } from 'react';
import Tag from '@components/index';
import { Title } from '@components/Trade';
import { classNames } from 'primereact/utils';

const NoData: React.FC<NoDataProps> = ({ icon, children: [title, desc, action], className = '' }) => {
    //--- code here ---- //
    return (
        <Tag data-section={'no-data'} element={'div'} py={'2rem'} className={classNames('flex flex-col h-full grow gap-3 w-full justify-center items-center', className)}>
            <Tag fontSize={80} color='rgb(var(--color-theme-emphasis))'>{icon}</Tag>
            <Title noPad xl bold className='text-center'>{title}</Title>
            <Title normal lg className='noData-p w-[50%] max-sm:w-full justify-center text-center' brighter>{desc}</Title>
            <div>{action}</div>
        </Tag>
    );
}

interface NoDataProps {
    icon?: ReactNode;
    className?: string;
    children: [
        title: ReactNode,
        desc: ReactNode,
        action?: ReactNode,
    ]
}

export default NoData
