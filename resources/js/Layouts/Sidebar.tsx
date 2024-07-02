import React, { FC } from 'react';
import styles from '@styles/layout/sidebar.module.scss';
import { getSidebar, Route } from '@routes/index';
import { Link, router } from '@inertiajs/react';
import logo from '@assets/images/logo1.png';
import Tag from '@components/index';
import Button from '@components/Button';
import Dropdown from '@components/Dropdown';
import { useAuth } from '@context/AuthenticatedContext';

const Sidebar: React.FC<SidebarProps> = () => {
    //--- code here ---- //
    const user = useAuth();
    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <Tag element={'img'} width={'160px'} src={logo} alt="" />
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

const NavItem: FC<NavItemProps> = ({ route: href, label, icon }) => {
    return <div className={styles.navitem}>
        <Link href={route(href)} className={styles.navlink + ' ' + (route().current() === href ? styles.active : '')}>
            <span className={styles['nav-item-icon']}>{icon}</span>
            {label}
        </Link>
    </div>
}

interface NavItemProps extends Route { }

interface SidebarProps {

}

export default Sidebar
