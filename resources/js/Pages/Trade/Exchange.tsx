import { showIf } from '@assets/fn';
import Button from '@components/Button';
import CryptoIcon from '@components/CryptoIcon';
import { Title } from '@components/Trade';
import Exchange from '@components/Trade/Exchange';
import LiveFeed from '@context/LiveContext';
import SpotProvider, { useSpot } from '@context/SpotContext';
import AuthenticatedLayout from '@layouts/AuthenticatedLayout';
import { Currencies, PageProps, Wallet, Wallets } from '@typings/index';
import { Dialog } from 'primereact/dialog';
import { TabPanel, TabView } from 'primereact/tabview';
import { classNames } from 'primereact/utils';
import React, { useEffect, useState } from 'react';
import { FaArrowDownLong } from 'react-icons/fa6';

const Page: React.FC<ExchangeProps> = ({ auth, wallet, wallets, currencies }) => {
    //-----------
    return <AuthenticatedLayout
        user={auth.user}
        title='Swap'
        pusher={true}
        desc='Perform Fase and Seamless exchange'
    >

        <LiveFeed wallets={wallets} currencies={currencies} rates>
            <div className='mt-8'>
                <div className="w-[40%] mx-auto">
                    <TabView>
                        <TabPanel header='Market'>
                            <div className="mt-4"></div>
                            <Market {...{ auth, wallet, wallets, currencies }} />
                        </TabPanel>
                        <TabPanel header='Limit'>
                            <div className="mt-4"></div>
                            <Limit {...{ auth, wallet, wallets, currencies }} />
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </LiveFeed>
    </AuthenticatedLayout>
}


const Market: React.FC<MarketProps> = ({ wallet: walletProp, wallets, auth }) => {
    //--- code here ---- //
    const currencies = wallets.map(item => item.curr);
    const [wallet, setWallet] = useState(walletProp);
    const [swap, setSwap] = useState<Wallet>(wallets.find(item => item.id !== wallet.id) as Wallet);

    //--- code here ---- //
    return (
        <SpotProvider
            user={auth.user}
            wallet={wallet}
            setWallet={setWallet}
            setTo={setSwap}
            to={swap}
            type='instant'
            currencies={currencies}
            wallets={wallets}
        >
            <form>
                <div className="flex flex-col gap-8">
                    <Exchange
                        exchange
                        onChange={(e) => console.log(e)}
                        order={0}
                    />
                    <Submit />
                </div>
            </form>
        </SpotProvider>
    );
}

const Submit = () => {
    const { amount, toAmount, wallet, to, type, expire, setProcessing, rate } = useSpot();
    const [disabled, setDisabled] = useState(true);

    const [hide, setHide] = useState(true);

    useEffect(() => {
        setDisabled(!(amount > 0 || toAmount > 0));
    }, [amount, toAmount]);

    useEffect(() => {
        setProcessing(!hide)
    }, [hide]);

    return <>
        <Button type='button' onClick={() => setHide(false)} className={classNames({ 'opacity-50 cursor-not-allowed': disabled })} disabled={disabled} centered>{amount > 0 || toAmount > 0 ? 'Preview Conversion' : 'Enter an amount'}</Button>

        <Dialog header='Confirm' visible={!hide} style={{ width: '30vw', height: '60vh' }} onHide={() => { if (hide) return; setHide(true); }}>
            <div className="m-0">
                <div className="flex gap-3 flex-col">
                    <div className="flex justify-between items-center">
                        <div className='flex gap-2 items-center'>
                            <CryptoIcon height='25px' width='25px' size='12px' name={wallet.curr.curr_name} label={wallet.curr.symbol} />
                            <Title bold noPad lg>{amount}</Title>
                        </div>

                        <Title noPad lg>{wallet.curr.code}</Title>
                    </div>
                    <FaArrowDownLong />
                    <div className="flex justify-between items-center">
                        <div className='flex gap-2 items-center'>
                            <CryptoIcon height='25px' width='25px' size='10px' name={to.curr.curr_name} label={to.curr.symbol} />
                            <Title bold noPad lg>{toAmount}</Title>
                        </div>

                        <Title noPad lg>{to.curr.code}</Title>
                    </div>
                </div>

                {showIf(type == 'limit', <>

                </>, <>
                    <DataList label='Rate' value={<div className='flex gap-1'>
                        <Title noPad>1 {to.curr.code}</Title>
                        =
                        <Title noPad>{rate?.to} {wallet.curr.code}</Title>
                    </div>} />
                    <DataList label='inverse Rate' value={<div className='flex gap-1'>
                        <Title noPad>1 {wallet.curr.code}</Title>
                        =
                        <Title noPad>{rate?.from} {to.curr.code}</Title>
                    </div>} />
                </>)}

                <DataList label='Transaction Fees' value={<Title noPad>No Fees</Title>} />
            </div>
        </Dialog>
    </>
}


const DataList: React.FC<DataListProps> = ({ data, value, label }) => {
    //--- code here ---- //
    return (
        <div className='flex justify-between'>
            <Title noPad>{label}</Title>
            <div className="flex justify-end">{value}</div>
        </div>
    );
}

interface DataListProps {
    label: string;
    value: React.ReactNode;
    data?: {
        name: string;
        value: string;
    }
}


interface SubmitProps {
    type: 'limit' | 'instant';
}

const Limit: React.FC<MarketProps> = ({ wallet: walletProp, wallets, auth }) => {
    //--- code here ---- //
    const currencies = wallets.map(item => item.curr);
    const [wallet, setWallet] = useState(walletProp);
    const [swap, setSwap] = useState<Wallet>(wallets.find(item => item.id !== wallet.id) as Wallet);
    //--- code here ---- //
    return (
        <SpotProvider
            user={auth.user}
            wallet={wallet}
            setWallet={setWallet}
            setTo={setSwap}
            type='limit'
            to={swap}
            currencies={currencies}
            wallets={wallets}
        >
            <form>
                <div className="flex flex-col gap-8">
                    <Exchange
                        exchange
                        onChange={(e) => console.log(e)}
                        order={0}
                    />
                    <Submit />

                </div>
            </form>
        </SpotProvider>
    );
}


interface MarketProps extends ExchangeProps { }


interface ExchangeProps extends PageProps {
    wallet: Wallet;
    wallets: Wallets;
    currencies: Currencies
}

export default Page
