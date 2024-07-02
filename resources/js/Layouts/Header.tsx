import React, { useEffect, useRef, useState } from 'react';
import layout from '@styles/layout/index.module.scss';
import { BreadCrumb, BreadCrumbProps } from 'primereact/breadcrumb';
import Text from '@components/Text';
import { classNames } from 'primereact/utils';
import { FaHome } from 'react-icons/fa';
import HeaderNav from '@widgets/HeaderNav/HeaderNav';
import { useWrapper } from '@context/AuthenticatedContext';

const Header: React.FC<HeaderProps> = ({ title, header }) => {
    //--- code here ---- //
    const home = { icon: <FaHome />, url: 'https://primereact' };
    const ref = useRef<HTMLDivElement>();

    const [notifications, setNotifications] = useState([])

    const { onChange } = useWrapper();

    onChange('notifications', e => {
        let unread;

    })

    useEffect(() => {
        const header = document.querySelector('header');
        const container = document.querySelector('main');

        const className = 'sticky-nav';
        function setClass(rect: DOMRect, e?: WheelEvent) {
            const div = ref.current;
            if (div) {
                const action = (type: 'a' | 'r' = 'a') => {
                    if (type == 'a') {
                        div.style.width = container?.getBoundingClientRect().width + 'px';
                        div.classList.add(className);
                    } else {
                        div.classList.remove(className);
                        div.style.width = 'null';
                    }
                }


                if (((e?.deltaY || 0) > 0) && rect.y === 0) return action();

                if (rect.y < 0) action();
                else action('r');
            }
        }
        if (header)
            setClass(header?.getBoundingClientRect());

        document.querySelector('main')?.addEventListener('wheel', (e) => header && setClass(header?.getBoundingClientRect(), e));
    }, []);

    return (
        <header className={`flex items-center justify-between relative`}>
            <div
                //@ts-ignore
                ref={ref} className={layout.container + ' !pr-0'}>
                <div className="flex justify-between navbar items-center">
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
