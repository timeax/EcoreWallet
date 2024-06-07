import { User } from '@tyings/index';
import { Head } from '@inertiajs/react';
import React, { PropsWithChildren, createContext, useContext, useState } from 'react';
import Echo from 'laravel-echo';

//@ts-ignore
const Context = createContext<AuthenticatedContextProps>();


export function useAuth() {
    return useContext(Context).user;
}

type Event<T extends string, O> = {
    event: T,
    data: O
    send?(): void
}

interface Events {
    notifications: Event<'user.notify', {
        label: string;
        desc: string;
        category: string;
        href: string
    }>;

    cryptoUpdates: Event<'live.updates.crypto', string[]>

}

export function useWrapper() {
    const { echo, user } = useContext(Context);

    return {
        get user() {
            return user;
        },

        onChange<T extends keyof Events>(event: T, callback: (e: Events[T]) => void) {
            switch (event) {
                case 'notifications': {
                    break;
                }

                case 'cryptoUpdates': {
                    echo?.channel(`crypto.updates.${user.id}`).listen('live.updates.crypto', (e: Events['cryptoUpdates']['data']) => {
                        if (callback) {
                            //@ts-ignore
                            callback({
                                event: 'live.updates.crypto',
                                data: e
                            });
                        }
                    });

                    break;
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
    return (
        <Context.Provider value={{ ...props, echo, config }}>
            <Head title={title}>
                {usePusher ? <script src="https://js.pusher.com/8.2.0/pusher.min.js"></script> : ''}
            </Head>
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
}

interface Store {
    name: string;
    value: any
}


export default AuthenticatedContextProvider
