import { useState, PropsWithChildren, ReactNode } from 'react';
import { User } from '@typings/index';
import AuthenticatedProvider from '@context/AuthenticatedContext';
import styles from '@styles/layout/index.module.scss';
import Sidebar from './Sidebar';
import Header from './Header';
import { showIf } from '@assets/fn';
import { Title } from '@components/Trade';
import BottomBar from './BottomBar';

export default function AuthenticatedLayout({ pusher = true, user, header, children, title, onSearch, desc = '', ...props }: PropsWithChildren<Props>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <AuthenticatedProvider usePusher={pusher} user={user} {...props}>
            <div className="min-h-screen max-h-screen overflow-hidden">
                <div className={styles.bottombar}>
                    <BottomBar />
                </div>
                <aside className={styles.sidebar + ` scontainer`}>
                    <Sidebar />
                </aside>
                <div className={styles.main}>
                    {/*<ClassicSections id='app-overlay' />*/}
                    <div className='overflow-x-hidden overflow-y-auto bg-transparent z-50'>
                        <Header desc={desc} title={title} header={header} />
                        <main>
                            <div className={styles.container}>
                                {showIf(desc, <Title className={styles.mobileDesc} normal noPad>{desc}</Title>)}
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

interface Props {
    user: User,
    desc?: React.ReactNode
    header?: ReactNode,
    onSearch?(callback: (e: KeyboardEvent) => void): void
    title: string, pusher?: boolean
}
