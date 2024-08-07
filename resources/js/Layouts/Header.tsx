import React, { useEffect, useRef } from 'react';
import layout from '@styles/layout/index.module.scss';
import { classNames } from 'primereact/utils';
import { useAuth, useWrapper } from '@context/AuthenticatedContext';
import { Title } from '@components/Trade';
import IconButton from '@components/Button/IconButton';
import { FiBell } from 'react-icons/fi';
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md';
import { Avatar } from 'primereact/avatar';
import { assets, showIf } from '@assets/fn';
import Dropdown from '@components/Dropdown';
import styles from '@styles/layout/header.module.scss';
import { CgMenuMotion } from 'react-icons/cg';
import Tag from '@components/index';
import { router, useForm } from '@inertiajs/react';
import Notify from '@widgets/Notification';
import { FaCog, FaLock, FaSignOutAlt } from 'react-icons/fa';
import { AiOutlineProfile } from 'react-icons/ai';
import { User } from '@typings/index';
import { Badge } from 'primereact/badge';
import Select from '@components/Trade/Select';
import Button from '@components/Button';
import { useNotifications } from '@context/Notifications';


const Header: React.FC<HeaderProps> = ({ title, header, desc, toggleSidebar }) => {
    //--- code here ---- //
    const { user, theme, setTheme } = useWrapper();
    // console.log(notifications, user)
    const { show, unread: notification, asRead } = useNotifications();
    //--------
    const ref = useRef<HTMLElement>();
    const watch = useRef<HTMLElement>();
    //---------
    let stickyAnchor = styles.stickyAnchor;
    let sticky = styles.sticky;
    //-------
    const scrollEvent = function () {
        if (ref.current && watch.current) {
            const header = ref.current;
            const anchor = watch.current;

            // console.log(window.scrollY)

            const { width, x } = header.getBoundingClientRect();
            const { y } = anchor.getBoundingClientRect();

            // console.log(y)

            if (y <= -100) {
                if (header.classList.contains(sticky)) return;
                anchor.classList.add(stickyAnchor);
                header.classList.add(sticky);
                header.style.width = width + 'px';
                header.style.left = x + 'px';
                header.style.position = 'fixed'
            } else {
                if (!header.classList.contains(sticky)) return;
                header.classList.remove(styles.sticky);
                anchor.classList.remove(stickyAnchor);
                header.removeAttribute('style');
            }
        }
    }

    const themes = [
        {
            label: MdOutlineLightMode,
            value: 'light'
        } as const,

        {
            label: MdOutlineDarkMode,
            value: 'dark'
        } as const
    ];

    useEffect(() => {
        scrollEvent();

        var id: any;
        window.addEventListener('scroll', scrollEvent, true);
        window.addEventListener('resize', () => {
            if (ref.current?.classList.contains(styles.sticky)) {
                ref.current.classList.remove(styles.sticky);
                ref.current.removeAttribute('style');
            }

            clearTimeout(id);
            id = setTimeout(scrollEvent, 500);
        });

    }, []);

    return (
        <>
            <div
                //@ts-ignore
                ref={watch} className='relative top-0 left-0'></div>
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
                            <div className='flex gap-12 ml-auto items-center'>
                                <div className='flex gap-4 items-center'>
                                    <Select
                                        items={themes}
                                        contentTemplate={(Props) => {
                                            return <IconButton
                                                bgColor='primary'
                                                shape='icon'
                                                size='16px'
                                                variant='contained'
                                                data-section='icon'
                                                className={styles.themeBtn}
                                            ><Props.label /></IconButton>
                                        }}

                                        onSelect={(e) => setTheme(e.value.value)}
                                        unique='value'
                                        quick
                                        trigger='hidden'
                                        value={themes.find(item => item.value == theme)}
                                        content='!w-fit mt-5'
                                        menuGap={15}
                                        marker='dot'
                                        menuItemTemplate={(Props) => {
                                            return <div className='items-center gap-1 flex w-fit'>
                                                <Props.label />
                                                <Title md caps noPad>{Props.value}</Title>
                                            </div>
                                        }}
                                    />
                                </div>

                                <div className='flex gap-6 items-center'>
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
                                                        return <Dropdown.Link key={item.id} onClick={() => asRead(item.id)}>
                                                            {/* @ts-ignore */}
                                                            <Notify data={item.data.text || item.data.content} props={item.data.props} date={item.created_at} title={item.type} />
                                                        </Dropdown.Link>
                                                    })}
                                                    <Dropdown.Link className='!py-1 border-t border-t-theme-border'>
                                                        <div className='flex items-center cursor-pointer'>
                                                            <Title onClick={() => asRead()} normal className='grow' lg bright>Mark all as read </Title>
                                                            <Button className='hover:!text-theme-button-hover' variant='none' size='sm' onClick={() => show()}>See all</Button>
                                                        </div>
                                                    </Dropdown.Link>
                                                </>
                                            ), <Title normal className='justify-between w-full' lg bright>No new notifications <Button className='hover:!text-theme-button-hover' variant='none' size='sm' onClick={() => show()}>See all</Button></Title>)}
                                        </Dropdown.Content>
                                    </Dropdown>
                                    <UserWidget />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
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
                <div className='flex gap-2 cursor-pointer'>
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

                <Dropdown.Link onClick={() => post(route('user.logout'))}>
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
