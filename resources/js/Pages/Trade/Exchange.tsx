import { showIf } from '@assets/fn';
import Button from '@components/Button';
import CryptoIcon from '@components/CryptoIcon';
import { Title } from '@components/Trade';
import Exchange from '@components/Trade/Exchange';
import Select from '@components/Trade/Select';
import LiveFeed from '@context/LiveContext';
import SpotProvider, { useSpot } from '@context/SpotContext';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@layouts/AuthenticatedLayout';
import { ButtonGroup } from '@mui/material';
import { Currencies, PageProps, Wallet, Wallets } from '@typings/index';
import { Dialog } from 'primereact/dialog';
import { Message } from 'primereact/message';
import { TabPanel, TabView } from 'primereact/tabview';
import { classNames } from 'primereact/utils';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { FaClock } from 'react-icons/fa';
import { FaArrowDownLong, FaArrowRightLong } from 'react-icons/fa6';
import calc from 'number-precision';
import { ProgressSpinner } from 'primereact/progressspinner';
import { routeById } from '@routes/index';

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
    const { amount, toAmount, wallet, to, type, setProcessing, processing, rate, data } = useSpot();
    const [disabled, setDisabled] = useState(true);
    const [total, setTotal] = useState(0);
    const [charges, setCharges] = useState(0);

    const [hide, setHide] = useState(true);

    const [time, setTime] = useState(6);

    const { data: formData, setData, post, processing: formSending, errors, reset } = useForm({
        from: wallet.curr.id,
        to: to.curr.id,
        amount: data.amount,
        rate: rate?.from,
        expire: data.expire,
        limitRate: data.limit,
        type
    });

    useEffect(() => {
        setDisabled(amount <= 0 || toAmount <= 0);
    }, [amount, toAmount]);

    const [timer, setTimer] = useState<any>();

    const clear = () => {
        clearInterval(timer);
        setTime(6)
    }

    useEffect(() => {
        clear();
        setProcessing(!hide);
    }, [hide]);

    if (formSending) {
        clear();
    }

    useEffect(() => {
        if (processing) {
            if (timer) clear();

            if (!hide) {
                //-------
                let fee = parseFloat(wallet.curr.charges.exchange_charge);
                const type = wallet.curr.charges.exchange_charge_type;

                if (type == '%') fee = calc.times(amount, calc.divide(fee, 100));
                setCharges(fee);
                setTotal(calc.plus(amount, fee));
                //-----------
                setTimer(setInterval(() => {
                    setTime((time) => {
                        if (time == 1) setProcessing(false)
                        return time - 1
                    });
                }, 1000))
            }
        }
    }, [processing])

    useEffect(() => {
        if (time === -2) {
            clear();
            setProcessing(true);
        }
    }, [time]);

    return <>
        <Button type='button' onClick={() => setHide(false)} className={classNames({ 'opacity-50 cursor-not-allowed': disabled })} disabled={disabled} centered>{amount > 0 || toAmount > 0 ? 'Preview Conversion' : 'Enter an amount'}</Button>

        <Dialog header='Confirm' visible={!hide} style={{ width: '30vw', height: 'fit-content' }} onHide={() => { if (hide) return; setHide(true); }}>
            <div className="m-0 flex flex-col gap-7">
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

                <div>
                    {showIf(type == 'limit', <>
                        <DataList label='Expires in' value={<Text><Text>{data.expires?.label}</Text></Text>} />
                        <DataList label='Limit Rate' value={<div className='flex gap-1'>
                            <Text>1 {to.curr.code}</Text>
                            =
                            <Text>{data.limit} {wallet.curr.code}</Text>
                        </div>} />
                    </>, <>
                        <DataList label='Rate' value={<div className='flex gap-1'>
                            <Text>1 {to.curr.code}</Text>
                            =
                            <Text>{rate?.to} {wallet.curr.code}</Text>
                        </div>} />
                        <DataList label='inverse Rate' value={<div className='flex gap-1'>
                            <Text>1 {wallet.curr.code}</Text>
                            =
                            <Text>{rate?.from} {to.curr.code}</Text>
                        </div>} />
                    </>)}

                    <DataList label={`Transaction Fees (${wallet.curr.charges.exchange_charge_type || '%'})`} value={<Text>{<span className='flex gap-2 items-center'><b>{wallet.curr.charges.exchange_charge}</b> <FaArrowRightLong /> <span>{charges}</span></span> || 'No Fees'}</Text>} />

                    {showIf(type == 'instant', (
                        <DataList label='Total' value={<Text>{total}</Text>} />
                    ))}

                </div>

                {showIf(type == 'instant', <div className='flex flex-col gap-2'>
                    {showIf(parseFloat(wallet.all_balance.available) >= total, <Button disabled={!processing} centered size='normal' className={classNames({
                        'opacity-60': !processing
                    })} onClick={() => post(route('user.crypto.process.swap'))} bgColor='primary'>{showIf(processing, <>Convert {time}s</>, 'Refreshing...')}</Button>, (
                        <div className='flex flex-col gap-2 !justify-start'>
                            <Message className='text-[13px]' text='Insufficient balance. Please fund your account.' severity='error' />
                            <Button centered size='normal' bgColor='secondary'>Refresh Quote</Button>
                        </div>
                    ))}

                </div>)}
                {showIf(type == 'limit', <><Button centered size='normal' bgColor='primary'>Ok</Button></>)}
            </div>
        </Dialog>
    </>
}


const DataList: React.FC<DataListProps> = ({ data, value, label }) => {
    //--- code here ---- //
    return (
        <div className='flex justify-between py-1'>
            <Title md bright noPad>{label}</Title>
            <div className="flex justify-end">{value}</div>
        </div>
    );
}

const Text: React.FC<PropsWithChildren> = ({ children }) => {
    return <Title bold noPad>{children}</Title>
}

interface DataListProps {
    label: string;
    value: React.ReactNode;
    data?: {
        name: string;
        value: string;
    }
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
            <form className='flex flex-col'>
                <Timer />
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

const Timer = () => {
    const { setData } = useSpot();
    const def = {
        value: '30d',
        label: '30 Days'
    };

    const data = [{
        value: '1h',
        label: '1 Hour'
    }, {
        value: '1d',
        label: '1 Day'
    }, {
        value: '3d',
        label: '3 Days'
    }, {
        value: '7d',
        label: '1 Days'
    }, def]

    useEffect(() => {
        setData('expires', def);
    }, []);

    return <Select className='!bg-transparent !w-[130px] mb-2 ml-auto' trigger='!h-[30px] !w-[30px] items-center flex !p-0 ml-2 hide-label' container='!p-0 gap-2' items={data}
        unique='label'
        value={{ value: '30d', label: '30 Days' }}
        placeholder={<div className='flex gap-1 items-center'><FaClock /> <Title noPad>Expires in</Title></div>}
        contentTemplate={(props) => <Title noPad>{props.label}</Title>}
        menuItemTemplate={(props) => <Title noPad>{props.label}</Title>}
        quick
        onSelect={(e) => {
            const value = e.value;
            setData('expires', value);
        }}
    />
}

interface MarketProps extends ExchangeProps { }


interface ExchangeProps extends PageProps {
    wallet: Wallet;
    wallets: Wallets;
    currencies: Currencies
}

export default Page
