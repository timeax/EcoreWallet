import React, { FC } from 'react';
import styles from '@styles/layout/index.module.scss';
import { getMobile, getSidebar, Route, Routes } from '@routes/index';
import { classNames } from 'primereact/utils';
import { Link } from '@inertiajs/react';
import { FaPlus } from 'react-icons/fa';
import Dropdown from '@components/Dropdown';

const BottomBar: React.FC<BottomBarProps> = () => {
    //--- code here ---- //
    // const [a, b] = getMobile();
    const routes = getMobile().flat();

    function renderRoutes(routes: Route[]) {
        return routes.map((route, key) => {
            return <div className={`${styles.b_navlist}`} key={key}>
                <NavItem {...route} key={route.id} />
            </div>
        });
    }

    return (
        <div className={classNames(styles.bottombar_nav, 'shadow-md')}>
            <div className='grow flex'>
                <div className={styles.b_navgroup}>
                    {renderRoutes(routes)}
                </div>
                {/* <div className={styles.quick_actions}>
                    <span className={styles.button}>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <FaPlus />
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link>
                                    Fund
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </span>
                </div> */}
                {/* <div className={styles.b_navgroup}>
                    {renderRoutes(b)}
                </div> */}
            </div>
        </div>
    );
}

const NavItem: FC<NavItemProps> = ({ route: href, label, icon, sidebarOpen, bottomLabel }) => {
    return (
        <Link
            href={route(href)}
            className={classNames(styles.b_navlink, { [styles.active]: route().current() === href })}
        >
            <span className={styles.b_icon}>{icon}</span>
            {/* <div className='relative'>
                <span>
                    <span>{bottomLabel || label}</span>
                </span>
                <span className={classNames({ [styles.dot]: !sidebarOpen })}></span>
            </div> */}
        </Link>
    )
}

interface NavItemProps extends Route {
    sidebarOpen?: boolean
}

interface BottomBarProps {

}

export default BottomBar
