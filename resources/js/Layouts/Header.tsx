import React, { useState } from 'react';
import layout from '@styles/layout/index.module.scss';
import { classNames } from 'primereact/utils';
import { useAuth, useWrapper } from '@context/AuthenticatedContext';
import { Title } from '@components/Trade';
import ClassicSections from './ClassicSections';
import IconButton from '@components/Button/IconButton';
import { CiSearch } from 'react-icons/ci';
import { FiBell } from 'react-icons/fi';
import { MdOutlineLightMode } from 'react-icons/md';
import { Avatar } from 'primereact/avatar';
import { showIf } from '@assets/fn';
import Dropdown from '@components/Dropdown';
import styles from '@styles/layout/header.module.scss';

const Header: React.FC<HeaderProps> = ({ title, header, desc }) => {
    //--- code here ---- //
    const [notifications, setNotifications] = useState([])

    const { onChange } = useWrapper();

    onChange('notifications', e => {
        let unread;

    })

    return (
        <header className={classNames(`flex items-center justify-between relative`)}>
            <div className={classNames(layout.container, 'justify-center')}>
                <ClassicSections className={styles.headernav}>
                    <div className={classNames("items-center", styles.titlebar)}>
                        <div>
                            <Title noPad xl4>{title}</Title>
                            {showIf(desc, <Title noPad bright className={styles.desc}>{desc}</Title>)}
                        </div>
                        <div className={classNames('flex items-center', { 'mb-3': Boolean(desc) })}>{showIf(header, header)}</div>
                    </div>

                    <div className={classNames('flex items-center', styles.nav)}>
                        <div className={styles.search}>
                            <IconButton
                                bgColor='theme'
                                shape='circle'
                                size='18px'
                                color='rgb(var(--color-theme-emphasis))'
                            // variant='contained'
                            >
                                <CiSearch />
                            </IconButton>
                        </div>
                        <div className='flex gap-4'>
                            <IconButton
                                bgColor='theme'
                                shape='circle'
                                size='17px'
                                color='rgb(var(--color-theme-emphasis))'
                            // variant='contained'
                            >
                                <FiBell />
                            </IconButton>
                            <IconButton
                                bgColor='theme'
                                shape='circle'
                                size='16px'
                                color='rgb(var(--color-theme-emphasis))'
                                variant='contained'
                                className={styles.themeBtn}
                            >
                                <MdOutlineLightMode />
                            </IconButton>
                            <UserWidget />

                        </div>
                    </div>
                </ClassicSections>
            </div>
        </header>
    );
}



const UserWidget: React.FC<UserWidgetProps> = () => {
    //--- code here ---- //
    const user = useAuth();

    const [first, last = 'User'] = user.name.split(' ');

    return (
        <Dropdown>
            <Dropdown.Trigger>
                <div className='flex gap-1 cursor-pointer'>
                    <Avatar shape='circle' label={last.charAt(0).toUpperCase()} style={{ backgroundColor: 'rgb(var(--color-primary))', color: '#ffffff' }} />
                    <Title noPad className={styles.avatarText}>
                        {first}
                    </Title>
                </div>
            </Dropdown.Trigger>
            <Dropdown.Content>
                <Dropdown.Link>
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
    desc?: React.ReactNode
}

export default Header
