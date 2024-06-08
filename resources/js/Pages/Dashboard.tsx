import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@layouts/AuthenticatedLayout';
import { PageProps, Trades, Transactions, Wallets } from '@typings/index';
import ProfileBalance from '@widgets/ProfileBalance';
import DashboardWallets from '@widgets/DashboardWallets';
import Card from '@components/Card';
import Cardheader from '@components/Card/Cardheader';
import Text from '@components/Text';
import { BsCurrencyExchange } from "react-icons/bs";
import Textfield from '@components/Input';
import SpotProvider from '@context/SpotContext';
import { useState } from 'react';
import Exchange from '@components/Trade/Exchange';
import { Button } from 'primereact/button';

export default function Dashboard({ auth, wallets, trades, transactions }: DashboardProps) {
    const [currency, setCurrency] = useState(wallets[0].curr)
    return (
        <AuthenticatedLayout
            user={auth.user}
            title='Overview'
            pusher={true}
            header={[
                {
                    label: 'Overview',
                    template(item, options) {
                        return <Link href={route('user.dashboard')}>{item.label}</Link>
                    },
                }
            ]}
        >
            <section className='flex gap-x-6 w-full'>
                <div>
                    <ProfileBalance user={auth.user} />
                </div>
                <div className='grow flex-col flex'>
                    <DashboardWallets wallets={wallets} />
                </div>
            </section>

            <section>
                <div className="grid grid-cols-8 gap-x-6 ">
                    <div className="col-span-5">
                        <Card className='h-full'>
                            <Cardheader variant='mini'>
                                <>Open Orders</>
                                <><Button>See All Orders</Button></>
                            </Cardheader>
                            <>
                                <Text>Open limit orders that will execute when it reaches a target price</Text>
                            </>
                        </Card>
                    </div>
                    <div className="col-span-3">
                        <Card>
                            <Cardheader variant='mini'>
                                <>Exchange</>
                                <><BsCurrencyExchange /></>
                            </Cardheader>
                            <>
                                <Text className='mb-4'>
                                    Perform quick and seamless crypto exchanges here.
                                </Text>
                                <div className='flex flex-col'>
                                    <SpotProvider
                                        user={auth.user}
                                        wallet={wallets[0]}
                                        wallets={wallets}
                                        currencies={wallets.map(item => item.curr)}
                                        currency={currency}
                                        setCurrency={setCurrency}
                                    >
                                        <Exchange exchange order={1} onChange={(e) => { }} />

                                        <Button className='flex justify-center hover:!bg-primary-800 !text-primary-50 !bg-primary-700 mt-4' >Exchange</Button>
                                    </SpotProvider>
                                </div>
                            </>
                        </Card>
                    </div>
                </div>
            </section>
            <section>
                <div className="flex flex-col gap-4">
                    <div>
                        <Text variant={'subheading'} className='!text-theme-emphasis'>Recent Transactions</Text>
                        <Text className='!text-theme-emphasis'>Your most recent funding, trading, and withdrawal activities</Text>
                    </div>
                    <div>
                        <Card>
                            Transactions
                        </Card>
                    </div>
                </div>
            </section>
        </AuthenticatedLayout>
    );
}


interface DashboardProps extends PageProps {
    wallets: Wallets;
    transactions: Transactions;
    trades: Trades
}
