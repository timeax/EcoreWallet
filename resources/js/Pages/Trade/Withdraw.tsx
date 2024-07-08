import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@layouts/AuthenticatedLayout';
import { routeById } from '@routes/index';
import { AddressState, Addresses, CryptomusService, PageProps, Wallet, Wallets } from '@typings/index';
import React, { useEffect, useState } from 'react';
import { Title } from '@components/Trade';
import Card from '@components/Card';
import Text from '@components/Text';
import { PiSealWarningFill } from 'react-icons/pi';
import Select from '@components/Trade/Select';
import { contentTemplate, menuTemplate } from './Deposit';
import withdrawalForms from './Partials/WithdrawForms';
import WithdrawForms from './Partials/WithdrawForms';
import Note from '@components/Trade/Note';

const Withdraw: React.FC<WithdrawProps> = ({ auth, wallets, wallet: code, services }) => {
    //--- code here ---- //
    const [wallet, setWallet] = useState<Wallet | undefined>();

    useEffect(() => {
        setWallet(wallets.find(item => item.curr.code === code));
    }, []);

    const channels = [
        {
            name: 'Wallet Address',
            id: 'wallet',
            desc: 'Secure payout to an external address'
        },

        {
            name: 'Ecore Account',
            desc: 'Secure and instant payout to another Ecore User',
            id: '@ecore'
        }
    ];

    const [channel, setChannel] = useState(channels[0])

    return (
        <AuthenticatedLayout
            user={auth.user}
            desc='Withdraw or send cryptocurrency to personal account'
            title='Withdrawal'>
            <div>
                <div className="mt-8 grid gap-20 grid-cols-9">
                    <div className="col-span-5">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-3">
                                    <Title medium bright>
                                        Select Coin
                                    </Title>
                                    <Select
                                        quick
                                        contentTemplate={contentTemplate}
                                        menuItemTemplate={menuTemplate}
                                        items={wallets}
                                        unique='id'
                                        value={wallet}
                                        onSelect={(e) => setWallet(e.value)}
                                    />
                                </div>
                                <div className="flex gap-4 pl-4">
                                    <Title>Available Balance:</Title>
                                    <Title md bold>{wallet?.all_balance.available} {wallet?.curr.code}</Title>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Title>Select Withdrawal method</Title>
                                <Select
                                    contentTemplate={(item) => <div className='flex justify-between'>
                                        <div>
                                            <Title lg>{item.name}</Title>
                                            <Title bright sm light>{item.desc}</Title>
                                        </div>
                                    </div>}
                                    menuItemTemplate={(item) => {
                                        return <div>
                                            <Title lg>{item.name}</Title>
                                            <Title bright sm light>{item.desc}</Title>
                                        </div>
                                    }}
                                    quick
                                    value={channel}
                                    items={channels}
                                    unique='id'
                                    onSelect={(e) => setChannel(e.value)}
                                />
                            </div>


                            <Note title='Take Note!' lg variant='warning'>
                                <Title noPad lg bright normal>Ecorewallet will never request you to withdraw funds to a third party account. If you are doing this because you have received a suspicious email or SMS, please contact our support team.</Title>
                            </Note>
                        </div>
                    </div>
                    <div className="col-span-4">
                        <Card rounded={false}>
                            {channel ? (
                                <div className="flex flex-col">
                                    {/**@ts-ignore */}
                                    <WithdrawForms channel={channel.id} services={services} wallet={wallet} />
                                </div>
                            ) : 'You have not selected any withdrawal method'}
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

interface WithdrawProps extends PageProps {
    wallets: Wallets;
    addresses?: Addresses;
    wallet?: string
    services: CryptomusService[];
}

export default Withdraw
