import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@typings/index';
import { Message } from 'primereact/message';
import { PropsWithChildren } from 'react';
import icon from '@assets/images/icon.png';
import { Title } from '@components/Trade';

export default function Guest({ children, title, desc = '' }: PropsWithChildren<{ title: string, desc?: string }>) {
    // console.log(usePage())
    const flash = usePage<PageProps>().props.flash;
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            {flash?.message ? (
                //@ts-ignore
                <Message text={flash?.message.text} severity={flash.message.color} />
            ) : ''}


            <div className="w-full m-auto sm:max-w-md max-sm:w-[90%] px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <div className='flex items-center justify-center gap-1 py-4 flex-col'>
                    <Link href='/'><img src={icon} width={50} /></Link>
                    <div className='flex flex-col items-center justify-center'>
                        <Title noPad normal bold xl2>{title}</Title>
                        <Title noPad normal bright className='text-center' lg>{desc}</Title>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}
