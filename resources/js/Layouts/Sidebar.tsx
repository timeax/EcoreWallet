import React, { FC } from 'react';
import styles from '@styles/layout/sidebar.module.scss';
import { getSidebar, Route } from '@routes/index';
import { Link, router } from '@inertiajs/react';
import logo from '@assets/images/icon.png';
import Tag from '@components/index';
import Button from '@components/Button';
import Dropdown from '@components/Dropdown';
import { useAuth } from '@context/AuthenticatedContext';
import { classNames } from 'primereact/utils';

const Sidebar: React.FC<SidebarProps> = () => {
    //--- code here ---- //
    const user = useAuth();
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <Tag element={'img'} width={'30px'} src={logo} alt="" />
            </div>
            {/* <Button className='!bg-primary-800 w-fit !px-12 !rounded-[999px]'>Quick</Button> */}
            <div className='grow flex gap-y-12 flex-col'>
                {getSidebar().map((routes, key) => {
                    return <div className={`${styles.navlist}`} key={key}>
                        {routes.map(item => <NavItem {...item} key={item.id} />)}
                    </div>
                })}

            </div>
            <div className='my-4'>
                <Dropdown onSelect={(value) => {
                    window.axios.post(route('api.webhook'))
                }}>
                    <Dropdown.Trigger>
                        <Button size='sm' variant='outlined' bgColor='success'>{user.email}</Button>
                    </Dropdown.Trigger>
                    <Dropdown.Content>
                        <Dropdown.Link value='paid'>Paid</Dropdown.Link>
                        <Dropdown.Link value='process'>Process</Dropdown.Link>
                        <Dropdown.Link value='failed'>Failed</Dropdown.Link>
                    </Dropdown.Content>
                </Dropdown>
            </div>
        </div>
    );
}

const NavItem: FC<NavItemProps> = ({ route: href, label, icon, sidebarOpen }) => {
    return (
        <div className={classNames(styles.navitem, { [styles.sidebarOpen]: sidebarOpen })}>
            <Link
                href={route(href)}
                className={classNames(styles.navlink, { [styles.active]: route().current() === href })}
            >
                <span className={styles['nav-item-icon']}>{icon}</span>
                <div className='relative h-[19px]'>
                    <span className={classNames({ [styles.label]: !sidebarOpen })}>
                        <span>{label}</span>
                    </span>
                    <span className={classNames({ [styles.dot]: !sidebarOpen })}></span>
                </div>
            </Link>
        </div>
    )
}

interface NavItemProps extends Route {
    sidebarOpen?: boolean
}

interface SidebarProps {

}

export default Sidebar
