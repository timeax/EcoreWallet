import React, { FC } from 'react';
import styles from '@styles/layout/sidebar.module.scss';
import { getSidebar, Route } from '@routes/index';
import { Link } from '@inertiajs/react';
import logo from '@assets/images/icon.png';
import dark from '@assets/images/logo1.png';
import light from '@assets/images/logo1.png';
import Tag from '@components/index';
import { classNames } from 'primereact/utils';

const Sidebar: React.FC<SidebarProps> = ({ open }) => {
    //--- code here ---- //
    return (
        <div className={classNames(styles.main, { [styles.sidebarOpen]: open })}>
            <div className={styles.header}>
                <Tag element={'img'} data-section={'img-open'} width={'170px'} src={dark} alt="" />,
                <Tag element={'img'} width={'30px'} data-section={'img-close'} src={logo} alt="" />
            </div>
            {/* <Button className='!bg-primary-800 w-fit !px-12 !rounded-[999px]'>Quick</Button> */}
            <div className='grow flex gap-y-12 flex-col'>
                {getSidebar().map((routes, key) => {
                    return <div className={`${styles.navlist}`} key={key}>
                        {routes.map(item => <NavItem sidebarOpen={open} {...item} key={item.id} />)}
                    </div>
                })}

            </div>
        </div>
    );
}

const NavItem: FC<NavItemProps> = ({ route: href, label, icon, sidebarOpen }) => {
    return (
        <div className={classNames(styles.navitem)}>
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
    open?: boolean
}

export default Sidebar
