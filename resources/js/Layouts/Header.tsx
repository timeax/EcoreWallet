import React, { useState } from 'react';
import layout from '@styles/layout/index.module.scss';
import { classNames } from 'primereact/utils';
import { useAuth, useWrapper } from '@context/AuthenticatedContext';
import { Title } from '@components/Trade';
import ClassicSections from './ClassicSections';
import IconButton from '@components/Button/IconButton';
import { CiSearch } from 'react-icons/ci';
import { FiBell } from 'react-icons/fi';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { Avatar } from 'primereact/avatar';
import { showIf } from '@assets/fn';
import Dropdown from '@components/Dropdown';
import styles from '@styles/layout/header.module.scss';
import { CgMenuMotion } from 'react-icons/cg';
import Tag from '@components/index';
import { routeById } from '@routes/index';
import { router } from '@inertiajs/react';

const Header: React.FC<HeaderProps> = ({ title, header, desc, toggleSidebar }) => {
    //--- code here ---- //
    const [notifications, setNotifications] = useState([])

    const { onChange } = useWrapper();

    onChange('notifications', e => {
        let unread;

    })

    return (
        <header className={classNames(`flex items-center justify-between relative`)}>
            <div className={classNames(layout.container, 'justify-center')}>
                <div className={styles.headernav}>
                    <div className={classNames("items-center", styles.titlebar)}>
                        <Tag className={styles.menuButton} element='div' onClick={() => toggleSidebar()}>
                            <CgMenuMotion />
                        </Tag>
                        <div className='flex items-center '>
                            <Title noPad xl4>{title}</Title>
                            {/*showIf(desc, <Title noPad bright className={styles.desc}>{desc}</Title>) */}
                        </div>
                        <div className={classNames('flex items-center', { 'mb-3': Boolean(desc) })}>{showIf(header, header)}</div>
                    </div>

                    <div className={classNames('flex items-center justify-end', styles.nav)}>
                        {/* <div className={styles.search}>
                            <IconButton
                                bgColor='theme'
                                shape='circle'
                                size='18px'
                                color='rgb(var(--color-theme-emphasis))'
                            // variant='contained'
                            >
                                <CiSearch />
                            </IconButton>
                        </div> */}
                        <div className='flex gap-12 ml-auto items-center'>
                            <div className='flex gap-4 items-center'>
                                <IconButton
                                    bgColor='primary'
                                    shape='icon'
                                    size='16px'
                                    variant='contained'
                                    data-section='icon'
                                    className={styles.themeBtn}
                                >
                                    <MdOutlineDarkMode />
                                    <span>|</span>
                                    <MdOutlineLightMode />
                                </IconButton>
                            </div>

                            <div className='flex gap-4 items-center'>
                                <IconButton
                                    bgColor='primary'
                                    shape='icon'
                                    size='18px'
                                    variant='contained'
                                    data-section='icon'
                                >
                                    <FiBell />
                                </IconButton>
                                <UserWidget />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}



const UserWidget: React.FC<UserWidgetProps> = () => {
    //--- code here ---- //
    const user = useAuth();

    const [first, last = 'User'] = user.name.split(' ');

    return (
        <Dropdown className={styles.user}>
            <Dropdown.Trigger>
                <div className='flex gap-1 cursor-pointer'>
                    <Avatar shape='circle' label={last.charAt(0).toUpperCase()} style={{ backgroundColor: 'rgb(var(--color-primary-800))', color: '#ffffff' }} />
                    <Title noPad className={styles.avatarText}>
                        {first}
                    </Title>
                </div>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Link onClick={e => router.post(route('user.logout'))}>
                    Log out
                </Dropdown.Link>
            </Dropdown.Content>
        </Dropdown>
    );
}

interface UserWidgetProps {

}


interface HeaderProps {
    title: string;
    header?: React.ReactNode;
    desc?: React.ReactNode;
    toggleSidebar(): void
}

export default Header
