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
import NoData from '@widgets/NoData';
import HistorySection from './Partials/HistorySection';
import ExchangeAndOpenOrders from './Partials/ExchangeAndOpenOrders';

export default function Dashboard({ auth, wallets, trades, transactions }: DashboardProps) {
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
                <div className='grow flex-col flex overflow-x-auto container-snap'>
                    <DashboardWallets wallets={wallets} />
                </div>
            </section>

            {/* <ExchangeAndOpenOrders auth={auth} wallets={wallets} /> */}

            <HistorySection transactions={transactions} />

        </AuthenticatedLayout>
    );
}


interface DashboardProps extends PageProps {
    wallets: Wallets;
    transactions: Transactions;
    trades: Trades
}
