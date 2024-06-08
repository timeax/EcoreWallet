import { useState, PropsWithChildren } from 'react';
import { User } from '@typings/index';
import AuthenticatedProvider from '@context/AuthenticatedContext';
import styles from '@styles/layout/index.module.scss';
import Sidebar from './Sidebar';
import Header from './Header';
import { BreadCrumbProps } from 'primereact/breadcrumb';

export default function AuthenticatedLayout({ pusher = true, user, header, children, title }: PropsWithChildren<{
    user: User, header: BreadCrumbProps['model']
    , title: string, pusher?: boolean
}>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <AuthenticatedProvider usePusher={pusher} user={user}>
            <div className="min-h-screen max-h-screen overflow-hidden">
                <aside className={styles.sidebar + ` scontainer`}>
                    <Sidebar />
                </aside>
                <div className={styles.main}>
                    <Header title={title} header={header} />
                    <main>
                        <div className={styles.container}>
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </AuthenticatedProvider>
    );
}
