import React from 'react';
import styles from '@styles/widgets/headernav.module.scss';
import Tag from '@components/index';
import { GoSearch } from 'react-icons/go';
import { CiChat1, CiLight } from 'react-icons/ci';
import { BsBell, BsChatSquare } from 'react-icons/bs';
import { useAuth } from '@context/AuthenticatedContext';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { FaUser } from 'react-icons/fa';
import { MdOutlineLightMode } from 'react-icons/md';

const HeaderNav: React.FC<HeaderNavProps> = () => {
    const user = useAuth();
    let name = user.name.split(' ');
    name.length > 2 && name.pop();
    name = name.map(item => item.charAt(0));

    return (
        <div className={styles.main}>
            <div className="flex items-center  gap-x-1">
                <div className='relative h-full'>
                    <Tag className='text-theme-emphasis absolute h-full top-0 left-0 w-[2.8rem] flex items-center'>
                        <GoSearch className='grow text-theme-emphasis' />
                    </Tag>
                    <input type="search" placeholder='Search...' className='bg-theme-bgContent py-[.6rem] text-[.875em] border-transparent focus:border-transparent focus:outline-0 focus:shadow-none rounded-[999px] pl-[2.5rem] w-[13rem]' name="" id="" />
                </div>
                <Button size='small' className='!text-base !text-theme-icons' badgeType='dot' badge='1' rounded text icon={<BsBell />}></Button>
                <Button size='small' className='!text-base !text-theme-icons' rounded text icon={<CiChat1 />}></Button>
                <Button size='small' className='!text-base !text-theme-icons' rounded text icon={<MdOutlineLightMode />}></Button>

                <Button className='!bg-primary-900' rounded icon={<FaUser className='!text-white'/>}></Button>
            </div>
        </div>
    );
}

interface HeaderNavProps {

}

export default HeaderNav
