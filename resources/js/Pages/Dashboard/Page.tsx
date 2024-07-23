import AuthenticatedLayout from '@layouts/AuthenticatedLayout';
import { Currencies, PageProps, Trades, Transactions, Wallet, Wallets } from '@typings/index';
import ClassicSections from '@layouts/ClassicSections';
import { cutArr } from '@assets/fn';
import Card from '@components/Card';
import Cardheader from '@components/Card/Cardheader';
import { FaChevronRight } from 'react-icons/fa';
import IconButton from '@components/Button/IconButton';
import { routeById } from '@routes/index';
import Button from '@components/Button';
import Dropdown from '@components/Dropdown';
import dashboard from '@styles/pages/dashboard.module.scss';
import { Portifolio, WalletGroup } from './components';
import WalletSummary from './Partials/WalletSummary';
import HistorySection from './Partials/HistorySection';
import BalanceSummary from './Partials/BalanceSummary';
import LiveFeed from '@context/LiveContext';
import Latest from './Partials/Latest';
import { FaArrowDownLong, FaArrowUpLong } from 'react-icons/fa6';
import ProfileBalance from './Partials/ProfileBalance';
import { useState } from 'react';
import { Title } from '@components/Trade';
import { Link } from '@inertiajs/react';

export default function Dashboard({ auth, wallets, transactions, gs, currencies, ...props }: DashboardProps) {
    const [wallet, setWallet] = useState<Wallet>();
    return (
        <AuthenticatedLayout
            user={auth.user}
            title='Dashboard'
            {...props}
            header={<Dropdown className='hidden' onSelect={(value) => {
                window.axios.post(route('api.webhook'))
            }}>
                <Dropdown.Trigger>
                    <Button size='sm' variant='outlined' bgColor='success'>{auth.user.email}</Button>
                </Dropdown.Trigger>
                <Dropdown.Content>
                    <Dropdown.Link value='paid'>Paid</Dropdown.Link>
                    <Dropdown.Link value='process'>Process</Dropdown.Link>
                    <Dropdown.Link value='failed'>Failed</Dropdown.Link>
                </Dropdown.Content>
            </Dropdown>}
            pusher={true}
            desc={`Welcome back! ${auth.user.name.split(' ')[0]}`}
        >

            <LiveFeed rates marketData currencies={currencies} wallets={wallets}>
                <ClassicSections id='app-dashboard'>
                    <div>
                        <section className={dashboard.profile_balance}>
                            <ProfileBalance />
                        </section>
                        <BalanceSummary wallets={wallets} />
                        <section className={dashboard.wallets}>
                            <div className='flex items-center justify-between'>
                                <Title medium md bright noPad>Portifolio</Title>
                                <Title className='items-center gap-2' noPad sm><Link href={route(routeById('wallets').route)}>view all</Link> <FaChevronRight /></Title>
                            </div>
                            <div className={dashboard.scrollx}>
                                <div className='flex gap-4 overflow-visible'>
                                    {wallets.slice(0, 4).map(item => <Portifolio key={item.id} wallet={item} />)}
                                </div>
                            </div>
                        </section>
                        {/*<QuickActions />*/}
                        <Latest currencies={wallets.map(item => item.curr)} />
                    </div>
                    <div className={dashboard.assets}>
                        <section>
                            <Card className='!bg-transparent' container='!px-0 !py-0'>
                                <Cardheader variant='title'>
                                    <>Your Assets</>
                                    <IconButton href={route(routeById('wallets').route)}><FaChevronRight /></IconButton>
                                </Cardheader>
                                <WalletGroup wallet={wallet || wallets[0]} change={setWallet} wallets={wallets.slice(0, 4)} />
                            </Card>
                        </section>
                        <WalletSummary history={transactions} wallet={wallet || wallets[0]} />
                    </div>
                </ClassicSections>
                <HistorySection transactions={cutArr(transactions, 5)} />
            </LiveFeed>
        </AuthenticatedLayout>
    );
}

interface DashboardProps extends PageProps {
    wallets: Wallets;
    transactions: Transactions;
    trades: Trades;
    currencies: Currencies
}


{/* <TabView className='db-classic'>
                            <TabPanel header={<Tab text='Quick Transfer' icon={<GrTransaction />} />}>
                                <div className="mt-12">
                                    <div className='flex gap-6'>

                                        <Card className='w-[50%]'>
                                            <Cardheader variant='mini'>
                                                Transfer history
                                            </Cardheader>
                                        </Card>

                                        <form className='grow'>
                                            <Textfield label='Phone' />
                                            <Textfield label='Amount' />
                                        </form>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel header={<Tab text='Quick Exchange' icon={<RiExchangeFundsLine />} />}>
                                <div className="mt-12">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                    Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </div>
                            </TabPanel>
                        </TabView> */ }
