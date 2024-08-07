import { Notifications, PageProps, User } from '@typings/index';
import { Head, usePage } from '@inertiajs/react';
import React, { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from 'react';
import Echo from 'laravel-echo';
import { Toast, ToastMessage } from 'primereact/toast';
import { useTheme } from './Theme';
import { NotificationProvider } from './Notifications';
import { FaBell } from 'react-icons/fa';
import { Title } from '@components/Trade';

//@ts-ignore
const Context = createContext<AuthenticatedContextProps>();


export function useAuth() {
    return useContext(Context).user;
}

export function useNotify() {
    return useContext(Context).notify
}

export function useReload() {
    useContext(Context);
}

export function useConsole() {
    const context = useContext(Context).notify;
    const options = (severity: ToastMessage['severity'], detail: string, summary: string = '', content?: ToastMessage['content']) => ({
        closable: true,
        severity,
        summary,
        detail,
        content
    } as ToastMessage);
    return {
        warn(message: string, summary: string = '', content?: ToastMessage['content']) {
            context(options('warn', message, summary, content));
        },

        info(message: string, summary: string = '', content?: ToastMessage['content']) {
            context(options('info', message, summary, content));
        },

        error(message: string, summary: string = '', content?: ToastMessage['content']) {
            context(options('error', message, summary, content));
        },

        success(message: string, summary: string = '', content?: ToastMessage['content']) {
            context(options('success', message, summary, content));
        },

        notification() {
            //@ts-ignore
            context(options('success', 'New notification', '', (props) => {
                return <div className='grow'>
                    <div className="flex items-center gap-3">
                        <FaBell />
                        <Title brighter noPad>
                            New notification
                        </Title>
                    </div>
                </div>
            }))
        }
    }
}

type Event<T extends string, O> = {
    event: T,
    data: O
    send?(): void
}

interface Events {
    notifications: Event<'user.notify', Notifications[]>;

    cryptoUpdates: Event<'live.updates.crypto', string[]>

    rates: Event<'live.updates.rate', { from: string, to: string, course: string }[]>

    liveChat: Event<'live.chat', {
        name: string;
        message: {
            from: 'system' | 'admin' | 'user';
            type: 'file' | 'text';
            file?: string;
            content: string;
        }
    }>
}

export function useWrapper() {
    const { echo, user, notifications, refreshable } = useContext(Context);
    const { theme, setTheme } = useTheme();
    return {
        theme,
        setTheme,
        get user() {
            return user;
        },

        get notifications() {
            return notifications
        },

        onChange<T extends keyof Events>(event: T, callback: (e: Events[T]) => void, props?: any) {
            switch (event) {
                case 'notifications': {
                    callback({
                        data: props == 'unread' ? notifications.filter(item => !item.read_at) : notifications,
                        event: 'user.notify'
                    } as any);

                    echo?.private(`user.${user.id}`)
                        .notification((notification: any) => {
                            window.axios.get(route('data.notifications', { userId: user.id, type: props })).then((data => {
                                const notifications = data.data;
                                callback({
                                    data: notifications,
                                    event:
                                        notification.message == 'reload'
                                            ? 'user.notify'
                                            : `user.${user.id}`,
                                } as any)
                            }));
                        })
                        .listen('.DataRefresh', () => {
                            console.log('Refresh the data')
                        })
                    break;
                }

                case 'cryptoUpdates': {

                    break;
                }

                case 'rates': {

                }
            }
        },

        sendMessage() {

        }
    }
}


const AuthenticatedContextProvider: React.FC<AuthenticatedContextProviderProps> = ({ usePusher = true, title, children, ...props }) => {
    //--- code here ---- //
    let echo: Echo | undefined;
    const [config, setConfig] = useState<Store[]>([]);
    if (usePusher) {
        echo = new Echo({
            broadcaster: 'pusher',
            key: import.meta.env.VITE_PUSHER_APP_KEY,
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
            forceTLS: true
        });
    }

    const { auth: { notifications }, flash: { message } } = usePage<PageProps>().props;
    //------------
    const toast = useRef<{ show(props: any): void }>(null);
    //-----------

    const notify = (props: ToastMessage | ToastMessage[]) => {
        toast.current?.show(props);
    }

    useEffect(() => {
        if (message) {
            notify({ closable: true, severity: message.color as any, summary: message.text })
        }
    }, [message]);

    return (
        <Context.Provider value={{ ...props, echo, config, notify, notifications }}>
            <Head title={title}>
                {usePusher ? <script src="https://js.pusher.com/8.2.0/pusher.min.js"></script> : ''}
            </Head>
            <Toast
                //@ts-ignore
                ref={toast} />
            <NotificationProvider>
                {children}
            </NotificationProvider>
        </Context.Provider >
    );
}



export function useEcho() {
    return useContext(Context)?.echo;
}

interface AuthenticatedContextProviderProps extends PropsWithChildren, Record<string, any> {
    user: User;
    title?: string;
    usePusher?: boolean;
}

interface AuthenticatedContextProps {
    user: User;
    echo?: Echo;
    config: Array<Store>;
    notify(props: ToastMessage): void
    notifications: Notifications[];
    refreshable?: string[];
}

interface Store {
    name: string;
    value: any
}



export default AuthenticatedContextProvider
