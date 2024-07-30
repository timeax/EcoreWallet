import React, { useEffect, useRef, useState } from 'react';
import layout from '@styles/layout/index.module.scss';
import { classNames } from 'primereact/utils';
import { useAuth, useNotify, useWrapper } from '@context/AuthenticatedContext';
import { Title } from '@components/Trade';
import ClassicSections from './ClassicSections';
import IconButton from '@components/Button/IconButton';
import { CiSearch } from 'react-icons/ci';
import { FiBell } from 'react-icons/fi';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { Avatar } from 'primereact/avatar';
import { assets, showIf } from '@assets/fn';
import Dropdown from '@components/Dropdown';
import styles from '@styles/layout/header.module.scss';
import { CgMenuMotion } from 'react-icons/cg';
import Tag from '@components/index';
import { routeById } from '@routes/index';
import { router, useForm, usePage } from '@inertiajs/react';
import Notify from '@widgets/Notification';
import { FaCog, FaLock, FaSignOutAlt } from 'react-icons/fa';
import { AiOutlineProfile } from 'react-icons/ai';
import { Notifications, User } from '@typings/index';
import { Badge } from 'primereact/badge';

const Header: React.FC<HeaderProps> = ({ title, header, desc, toggleSidebar }) => {
    //--- code here ---- //
    const { onChange, user, } = useWrapper();
    const [notification, setNotification] = useState<Notifications[]>([]);
    // console.log(notifications, user)
    //--------
    const notify = useNotify();
    const ref = useRef<HTMLElement>();
    //---------
    const scrollEvent = function (event?: Event) {
        if(ref.current) {
            // console.log(ref.current.getBoundingClientRect().y)
        }
    }

    useEffect(() => {
        onChange('notifications', e => {
            // console.log(e.data)
            setNotification(e.data);
            if (e.event !== 'user.notify') {
                notify({ closable: true, summary: 'New notification', severity: 'info' })
            }
        });

        scrollEvent();

        window.addEventListener('wheel', scrollEvent);

        return () => window?.removeEventListener?.('resize', scrollEvent);
    }, []);

    return (
        <header
            //@ts-ignore
            ref={ref}
            className={classNames(`flex items-center justify-between relative`)}>
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
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <IconButton
                                            className='relative'
                                            bgColor='primary'
                                            shape='icon'
                                            size='18px'
                                            variant='contained'
                                            data-section='icon'
                                        >
                                            <FiBell />
                                            <Badge className={classNames('absolute  right-1 top-1 p-1 rounded-full', {
                                                'bg-danger-600': notification.length > 0
                                            })} value={''}>
                                            </Badge>
                                        </IconButton>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content width={classNames(styles.notifications)}>
                                        {showIf(notification.length > 0, (
                                            <>
                                                {notification.map(item => {
                                                    return <Dropdown.Link key={item.id} onClick={() => {
                                                        setNotification(notification.filter(n => n.id !== item.id));
                                                        window.axios.post(route('data.mark.as.read'), {
                                                            notify: item.id,
                                                            user: user.id
                                                        });
                                                    }}>
                                                        {/* @ts-ignore */}
                                                        <Notify data={item.data.text || item.data.content} date={item.created_at} title={item.type} />
                                                    </Dropdown.Link>
                                                })}
                                                <Dropdown.Link onClick={() => {
                                                    setNotification([]);
                                                    window.axios.post(route('data.mark.as.read'), {
                                                        notify: '*',
                                                        user: user.id
                                                    })
                                                }} className='!py-1 border-t'>
                                                    Mark all as read
                                                </Dropdown.Link>
                                            </>
                                        ), <Title normal lg bright>No new notifications</Title>)}
                                    </Dropdown.Content>
                                </Dropdown>
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

    const { post } = useForm()

    const [first, last = 'User'] = user.name.split(' ');

    return (
        <Dropdown className={styles.user}>
            <Dropdown.Trigger>
                <div className='flex gap-1 cursor-pointer'>
                    <Avatar shape='circle' icon={showIf(user.photo, (
                        <img src={assets(user.photo)} />
                    ), <>{last.charAt(0).toUpperCase()}</>)} style={{ backgroundColor: 'rgb(var(--color-primary-800))', color: '#ffffff' }} />
                    <Title noPad className={styles.avatarText}>
                        <KycStatus {...user} />
                        {first}
                    </Title>
                </div>
            </Dropdown.Trigger>
            <Dropdown.Content>
                {/* @ts-ignore */}
                {showIf(!(user.kyc_status == 1 || user.kyc_status == 2), (
                    <Dropdown.Link href={route('user.onboarding')}>
                        <div className="flex gap-2 items-center">
                            <AiOutlineProfile /> KYC Verification
                        </div>
                    </Dropdown.Link>
                ))}
                {/* @ts-ignore */}
                {showIf(user.two_fa_status == 0, (
                    <Dropdown.Link href={route('user.settings.all')}>
                        <div className="flex gap-2 items-center">
                            <FaLock /> 2Fa Authentication
                        </div>
                    </Dropdown.Link>
                ))}

                <Dropdown.Link href={route('user.settings.all')}>
                    <div className="flex gap-2 items-center">
                        <FaCog /> Profile Settings
                    </div>
                </Dropdown.Link>

                <Dropdown.Link onClick={e => post(route('user.logout'))}>
                    <div className="flex gap-2 items-center">
                        <FaSignOutAlt />Log out
                    </div>
                </Dropdown.Link>
            </Dropdown.Content>
        </Dropdown>
    );
}

const KycStatus = (user: User) => {
    return <>
        <Title noPad xs className={classNames('!text-[.7em]', {
            //@ts-ignore
            'text-danger-500': user.kyc_status == 0,
            //@ts-ignore
            'text-warning-500': user.kyc_status == 2,
            //@ts-ignore
            'text-primary-500': user.kyc_status == 1,
        })}>
            {/* @ts-ignore */}
            {showIf(user.kyc_status == 0, 'Unverified', showIf(user.kyc_status == 2, 'Pending', 'Verified'))}
        </Title>
    </>
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
