import AuthenticatedLayout from '@layouts/AuthenticatedLayout';
import { Addresses, CryptomusService, PageProps, Wallet, Wallets } from '@typings/index';
import React, { useEffect, useState } from 'react';
import { Container, Title } from '@components/Trade';
import Card from '@components/Card';
import Select from '@components/Trade/Select';
import { contentTemplate, menuTemplate } from './Deposit';
import WithdrawForms from './Partials/WithdrawForms';
import Note from '@components/Trade/Note';
import styles from '@styles/pages/trade.module.scss';
import { classNames } from 'primereact/utils';
import { showIf } from '@assets/fn';
import { Link, usePage } from '@inertiajs/react';

const Withdraw: React.FC<WithdrawProps> = () => {
    //--- code here ---- //
    const { auth, wallets, wallet: code, services, ...props } = usePage<WithdrawProps>().props;

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
            {...props}
            user={auth.user}
            desc='Withdraw or send cryptocurrency to personal account'
            title='Withdrawal'>
            <div>
                {showIf(auth.user.kyc_status == 0 as any, (
                    <Note className='!flex-row items-center !mt-0 !pl-0' title=''>
                        <Title noPad xl normal className='!block text-warning'>
                            Complete <Link className='text-primary-300' href={route('user.onboarding')}>KYC Verification</Link> to continue with this transaction
                        </Title>
                    </Note>
                ), showIf(auth.user.kyc_status == 2 as any, (
                    <Note className='!flex-row items-center !mt-0 !pl-0' title=''>
                        <Title noPad xl normal className='!block'>
                            Your KYC verification is still ongoing, hold on!!
                        </Title>
                    </Note>
                )))}
                <div className={classNames("mt-8 flex gap-10", styles.withdrawals)}>
                    <div className={styles.withdraw}>
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-3">
                                    <Title medium bright>
                                        Select Coin
                                    </Title>
                                    <Container>
                                        <Select
                                            quick
                                            contentTemplate={contentTemplate}
                                            menuItemTemplate={menuTemplate}
                                            items={wallets}
                                            unique='id'
                                            value={wallet}
                                            placeholder='Wallet'
                                            onSelect={(e) => setWallet(e.value)}
                                            content='max-h-[320px] overflow-auto'
                                        />
                                    </Container>
                                </div>
                                <div className={classNames("flex gap-4 pl-4",)}>
                                    <Title>Available Balance:</Title>
                                    <Title noPad md bold>{wallet?.all_balance.available} {wallet?.curr.code}</Title>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Title>Select Withdrawal method</Title>
                                <Container>
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
                                </Container>
                            </div>

                            <div className={styles.withdrawForm_mobile}>
                                <Card>
                                    {channel ? (
                                        <div className="flex flex-col">
                                            {/**@ts-ignore */}
                                            <WithdrawForms channel={channel.id} services={services} wallet={wallet} />
                                        </div>
                                    ) : 'You have not selected any withdrawal method'}
                                </Card>
                            </div>

                            <Note title='Take Note!' lg variant='warning'>
                                <Title noPad lg bright normal>Ecorewallet will never request you to withdraw funds to a third party account. If you are doing this because you have received a suspicious email or SMS, please contact our support team.</Title>
                            </Note>
                        </div>
                    </div>
                    <div className={classNames("col-span-4", styles.withdrawForm)}>
                        <Card>
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
