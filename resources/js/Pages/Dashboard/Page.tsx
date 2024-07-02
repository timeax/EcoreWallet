import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@layouts/AuthenticatedLayout';
import { PageProps, Trades, Transactions, Wallets } from '@typings/index';
import ProfileBalance from '@widgets/ProfileBalance';
import DashboardWallets from '@widgets/DashboardWallets';
import HistorySection from './Partials/HistorySection';
import ExchangeAndOpenOrders from './Partials/ExchangeAndOpenOrders';

export default function Dashboard({ auth, wallets, trades, transactions, gs }: DashboardProps) {
    // console.log(gs);
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

            <div className="grid grid-cols-9 gap-6">
                <div className="col-span-6">
                    <HistorySection transactions={transactions} />
                </div>
                <div className="col-span-3">
                    <ExchangeAndOpenOrders auth={auth} wallets={wallets} />
                </div>
            </div>

        </AuthenticatedLayout>
    );
}


interface DashboardProps extends PageProps {
    wallets: Wallets;
    transactions: Transactions;
    trades: Trades
}
