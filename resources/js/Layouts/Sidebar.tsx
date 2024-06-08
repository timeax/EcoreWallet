import React, { FC } from 'react';
import styles from '@styles/layout/sidebar.module.scss';
import { getSidebar, Route } from '@routes/index';
import { Link } from '@inertiajs/react';
import logo from '@assets/images/logo1.png';
import Tag from '@components/index';

const Sidebar: React.FC<SidebarProps> = () => {
    //--- code here ---- //
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
        </div>
    );
}

const NavItem: FC<NavItemProps> = ({ route, label, icon }) => {
    return <div className={styles.navitem}>
        <Link href={route} className={styles.navlink}>
            <span className={styles['nav-item-icon']}>{icon}</span>
            {label}
        </Link>
    </div>
}

interface NavItemProps extends Route { }

interface SidebarProps {

}

export default Sidebar
