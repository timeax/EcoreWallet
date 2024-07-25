import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@typings/index';
import { Message } from 'primereact/message';
import { PropsWithChildren } from 'react';

export default function Guest({ children }: PropsWithChildren) {
    // console.log(usePage())
    const flash = usePage<PageProps>().props.flash;
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            {flash?.message ? (
                //@ts-ignore
                <Message text={flash?.message.text} severity={flash.message.color} />
            ) : ''}
            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
