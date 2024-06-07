import Card from '@components/Card';
import Cardheader from '@components/Card/Cardheader';
import Text from '@components/Text';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@layouts/AuthenticatedLayout';
import { PageProps, Trades, Transactions, Wallet, Wallets } from '@tyings/index';
import { Button } from 'primereact/button';
import { Carousel } from 'primereact/carousel';
import CryptoIcon from '@components/CryptoIcon';
import TotalWidget from '@widgets/DashboardTotal';
import ProfileBalance from '@widgets/ProfileBalance';

export default function Dashboard({ auth, wallets, trades, transactions }: DashboardProps) {
    const responsiveOptions = [
        {
            breakpoint: '1400px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '1199px',
            numVisible: 3,
            numScroll: 1
        },
        {
            breakpoint: '767px',
            numVisible: 2,
            numScroll: 1
        },
        {
            breakpoint: '575px',
            numVisible: 1,
            numScroll: 1
        }
    ];
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
            <div className='flex gap-x-8'>
                <div className="w-fit">
                    <ProfileBalance user={auth.user} />
                </div>
                <div className='grow'>
                    <Text>Assets</Text>
                    <Carousel showIndicators={true} showNavigators={false} value={wallets} numVisible={3} numScroll={3} responsiveOptions={responsiveOptions} itemTemplate={WalletTemplate} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}


const WalletTemplate = (wallet: Wallet) => {
    return (
        <Card className="w-[93%] h-full overflow-hidden">
            <div className="mb-3 flex items-center gap-x-2 flex-nowrap">
                <CryptoIcon name={wallet.curr.curr_name} label={wallet.curr.symbol} />
                <div className='flex flex-col overflow-hidden'>
                    <Text size='12px' className="whitespace-nowrap text-ellipsis">{wallet.curr.curr_name}</Text>
                    <Text size='14px' className="text-ellipsis text-theme-emphasis !font-semibold">{wallet.curr.rate}</Text>
                </div>
            </div>
            <div>
                <h6 className="mt-0 mb-3">${wallet.balance}</h6>
                <div className="mt-5 flex flex-wrap gap-2 justify-content-center">

                </div>
            </div>
        </Card>
    );
};

interface DashboardProps extends PageProps {
    wallets: Wallets;
    transactions: Transactions;
    trades: Trades
}
