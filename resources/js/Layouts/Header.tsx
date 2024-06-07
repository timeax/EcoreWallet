import React from 'react';
import layout from '@styles/layout/index.module.scss';
import { BreadCrumb, BreadCrumbProps } from 'primereact/breadcrumb';
import { Link } from '@inertiajs/react';
import Text from '@components/Text';
import { classNames } from 'primereact/utils';
import { FaHome, FaPlus } from 'react-icons/fa';
import HeaderNav from '@widgets/HeaderNav/HeaderNav';
import Tag from '@components/index';

const Header: React.FC<HeaderProps> = ({ title, header }) => {
    //--- code here ---- //
    const home = { icon: <FaHome />, url: 'https://primereact.org' };

    return (
        <header className={`flex items-center justify-between`}>
            <div className={layout.container}>
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <BreadCrumb pt={{
                            menu() {
                                return {
                                    className: classNames('flex m-0 p-0 items-center flex-nowrap text-theme-emphasis gap-x-[4px] text-sm')
                                }
                            },

                            separatorIcon: (options) => (({
                                className: classNames(layout.breadcrumbIcon)
                            }))
                        }} model={header} home={home} />
                        <Text weight={'600'} variant={'subheading'} color={'rgb(var(--color-theme-emphasis))'}> {title}</Text>
                    </div>
                    <div className='flex gap-5'>
                        <HeaderNav />
                    </div>
                </div>
            </div>
        </header>
    );
}

interface HeaderProps {
    title: string;
    header: BreadCrumbProps['model']
}

export default Header
