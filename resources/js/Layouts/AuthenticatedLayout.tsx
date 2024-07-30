import { useState, PropsWithChildren, ReactNode, useEffect } from 'react';
import { User } from '@typings/index';
import AuthenticatedProvider from '@context/AuthenticatedContext';
import styles from '@styles/layout/index.module.scss';
import Sidebar from './Sidebar';
import Header from './Header';
import BottomBar from './BottomBar';
import { classNames } from 'primereact/utils';
import { showIf } from '@assets/fn';

export default function AuthenticatedLayout({ pusher = true, user, header, children, title, onSearch, desc = '', ...props }: PropsWithChildren<Props>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    useEffect(() => {
        const time = setInterval(() => {
            const el = document.getElementById('smartsupp-widget-container');
            if (el) {
                clearInterval(time);
                //-------
                const chat = el.firstElementChild as HTMLElement;

                if(!chat) return;

                // chat.setAttribute('draggable', 'true');
                // chat.setAttribute('inert', 'false');
                // //-----
                // chat.addEventListener('drag', () => {});
                // chat.addEventListener('dragstart', () => {
                //     console.log('dragging')
                // });

                // chat.addEventListener('dragend', () => {
                //     console.log('stoped')
                // });

                // chat.addEventListener('click', e => {
                //     console.log('clicked')
                // })

                chat.style.top = '85%'
                // chat.style.left = '90%'
                // console.log(chat)
            }
        }, 2000);

        return () => clearInterval(time);
    }, []);

    return (
        <AuthenticatedProvider title={title} usePusher={pusher} user={user} {...props}>
            <div className="min-h-screen max-h-screen overflow-hidden">
                <div className={styles.bottombar}>
                    <BottomBar />
                </div>
                {showIf(showingNavigationDropdown, <div className={styles.mask} onClick={() => setShowingNavigationDropdown(!showIf)}></div>)}
                <aside className={classNames(styles.sidebar, `scontainer`, {
                    [styles.open]: showingNavigationDropdown
                })}>
                    <Sidebar open={showingNavigationDropdown} />
                </aside>
                <div className={styles.main}>
                    {/*<ClassicSections id='app-overlay' />*/}
                    <div className='overflow-x-hidden overflow-y-auto bg-transparent z-50'>
                        <Header desc={desc} title={title} header={header} toggleSidebar={() => setShowingNavigationDropdown(!showingNavigationDropdown)} />
                        <main>
                            <div className={styles.container}>
                                {/* {showIf(desc, <Title className={styles.mobileDesc} normal noPad>{desc}</Title>)} */}
                                {children}
                                {/* <footer className='p-1'>footer</footer> */}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </AuthenticatedProvider>
    );
}

interface Props extends Record<string, any> {
    user: User,
    desc?: React.ReactNode
    header?: ReactNode,
    onSearch?(callback: (e: KeyboardEvent) => void): void
    title: string, pusher?: boolean
}
