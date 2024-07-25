import { Notifications, PageProps, User } from '@typings/index';
import { Head, usePage } from '@inertiajs/react';
import React, { PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from 'react';
import Echo from 'laravel-echo';
import icon from '@assets/images/ecore-favi.ico'
import { Toast, ToastMessageOptions } from 'primereact/toast';
import { ColorNames } from '@assets/fn/create-color';

//@ts-ignore
const Context = createContext<AuthenticatedContextProps>();


export function useAuth() {
    return useContext(Context).user;
}

export function useNotify() {
    return useContext(Context).notify
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
    const { echo, user, notifications } = useContext(Context);

    return {
        get user() {
            return user;
        },

        get notifications() {
            return notifications
        },

        onChange<T extends keyof Events>(event: T, callback: (e: Events[T]) => void) {
            switch (event) {
                case 'notifications': {
                    callback({
                        data: notifications,
                        event: 'user.notify'
                    } as any)
                    echo?.private(`user.${user.id}`).notification((notification: any) => {
                        window.axios.get(route('data.notifications', { userId: user.id })).then((data => {
                            const notifications = data.data;
                            callback({
                                data: notifications,
                                event: `user.${user.id}`,
                            } as any)
                        }));
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
            broadcaster: 'reverb',
            key: import.meta.env.VITE_REVERB_APP_KEY,
            wsHost: import.meta.env.VITE_REVERB_HOST,
            wsPort: import.meta.env.VITE_REVERB_PORT,
            wssPort: import.meta.env.VITE_REVERB_PORT,
            forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
            enabledTransports: ['ws', 'wss'],
        });
        //--
        // console.log(echo)
    }

    useEffect(() => {
        if (!localStorage.getItem('theme')) {
            localStorage.setItem('theme', 'light');
        }
    }, []);


    const { auth: { notifications }, flash: { message } } = usePage<PageProps>().props;
    //------------
    const toast = useRef<{ show(props: any): void }>(null);
    //-----------

    const notify = (props: ToastMessageOptions | ToastMessageOptions[]) => {
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
                <link rel="shortcut icon" type={icon} href="favicon.ico" />
                {usePusher ? <script src="https://js.pusher.com/8.2.0/pusher.min.js"></script> : ''}
            </Head>
            <Toast
                //@ts-ignore
                ref={toast} />
            {children}
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
    notify(props: ToastMessageOptions): void
    notifications: Notifications[]
}

interface Store {
    name: string;
    value: any
}



export default AuthenticatedContextProvider
