import React, { useEffect, useRef, useState } from 'react';
import layout from '@styles/layout/index.module.scss';
import { BreadCrumb, BreadCrumbProps } from 'primereact/breadcrumb';
import Text from '@components/Text';
import { classNames } from 'primereact/utils';
import { FaHome } from 'react-icons/fa';
import HeaderNav from '@widgets/HeaderNav/HeaderNav';
import { useWrapper } from '@context/AuthenticatedContext';

const Header: React.FC<HeaderProps> = ({ title, header }) => {
    //--- code here ---- //
    const home = { icon: <FaHome />, url: 'https://primereact' };
    const ref = useRef<HTMLDivElement>();

    const [notifications, setNotifications] = useState([])

    const { onChange } = useWrapper();

    onChange('notifications', e => {
        let unread;

    })

    return (
        <header className={`flex items-center justify-between relative`}>
            this is the header
        </header>
    );
}

interface HeaderProps {
    title: string;
    header: BreadCrumbProps['model']
}

export default Header
