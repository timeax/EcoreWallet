import Button from '@components/Button';
import { useWrapper } from '@context/AuthenticatedContext';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@layouts/AuthenticatedLayout';
import { PageProps } from '@typings/index';
import ChatWidget from '@widgets/LiveChat';
import React, { useContext } from 'react';

const Support: React.FC<SupportProps> = ({ auth, tickets }) => {
    // console.log(tickets)
    //--- code here ---- //
    return (
        <AuthenticatedLayout
            user={auth.user}
            title='Support Tickets'
            pusher={true}
            header={[
                {
                    label: 'Overview',
                    template(item, options) {
                        return <Link href={route('user.support')}>{item.label}</Link>
                    },
                }
            ]}
        >
            <Page />
        </AuthenticatedLayout>
    );
}

interface SupportProps extends PageProps { }

const Page = () => {
    const context = useWrapper();

    return (
        <>
            <div>
                <Button onClick={() => context.liveChatConnect()} size='normal'>Start Chat</Button>
                <ChatWidget />
            </div>
        </>
    )
}

export default Support
