import { showIf } from '@assets/fn';
import Button from '@components/Button';
import CryptoIcon from '@components/CryptoIcon';
import { Title } from '@components/Trade';
import Exchange from '@components/Trade/Exchange';
import Select from '@components/Trade/Select';
import LiveFeed from '@context/LiveContext';
import SpotProvider, { SnapData, useSpot } from '@context/SpotContext';
import { router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@layouts/AuthenticatedLayout';
import { Currencies, PageProps, Wallet, Wallets } from '@typings/index';
import { Dialog } from 'primereact/dialog';
import { Message } from 'primereact/message';
import { TabPanel, TabView } from 'primereact/tabview';
import { classNames } from 'primereact/utils';
import React, { PropsWithChildren, useEffect, useState } from 'react';
import { FaClock } from 'react-icons/fa';
import { FaArrowDownLong, FaArrowRightLong } from 'react-icons/fa6';
import calc from 'number-precision';
import styles from '@styles/pages/trade.module.scss';

const Page: React.FC<ExchangeProps> = ({ auth, wallet, wallets, currencies }) => {
    //-----------
    return <AuthenticatedLayout
        user={auth.user}
        title='Swap'
        pusher={true}
        desc='Perform Fase and Seamless exchange'
    >

        <LiveFeed wallets={wallets} currencies={currencies} rates>
            <div className={classNames('mt-8', styles.mainSwap)}>
                <div className={styles.swap}>
                    <TabView>
                        <TabPanel header='Market'>
                            <div className="mt-4"></div>
                            {/* @ts-ignore */}
                            <Market {...{ auth, wallet, wallets, currencies }} />
                        </TabPanel>
                        <TabPanel header='Limit'>
                            <div className="mt-4"></div>
                            {/* @ts-ignore */}
                            <Limit {...{ auth, wallet, wallets, currencies }} />
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </LiveFeed>
    </AuthenticatedLayout>
}


const Market: React.FC<MarketProps> = ({ wallet: walletProp, wallets, auth, currencies }) => {
    //--- code here ---- //
    const [wallet, setWallet] = useState(walletProp);
    const [swap, setSwap] = useState<Wallet>(wallets.find(item => item.id !== wallet.id) as Wallet);

    //--- code here ---- //
    return (
        <SpotProvider
            user={auth.user}
            type='instant'
            wallets={{
                from: wallet,
                to: swap
            }}
            list={{
                currencies,
                wallets
            }}
        >
            <div>
                <div className="flex flex-col gap-8">
                    <Exchange
                        exchange
                        onChange={(e) => console.log(e)}
                        order={0}
                    />
                    <Submit type='instant' />
                </div>
            </div>
        </SpotProvider>
    );
}

const Submit: React.FC<{ type: 'limit' | 'instant' }> = ({ type }) => {
    const { fields, wallets, snap } = useSpot();
    const [disabled, setDisabled] = useState(true);
    const [total, setTotal] = useState(0);
    const [charges, setCharges] = useState(0);
    const [processing, setProcessing] = useState(false);
    const [data, getData] = useState<SnapData>()

    const [hide, setHide] = useState(true);

    const [time, setTime] = useState(6);

    const { setData, processing: formSending, post, errors } = useForm<{
        from?: any
        to?: any
        amount?: any
        rate?: any
        expire?: any
        limitRate?: any
        type?: any
    }>({});

    function snapData(data: any) {
        setData({
            from: wallets.from.curr.id,
            to: wallets.to.curr.id,
            amount: data?.amount,
            expire: data?.expire?.label,
            limitRate: data?.limit,
            rate: data?.rates.from.rate,
            type
        });

        getData(data);
    }

    useEffect(() => {
        setDisabled(fields.from.converted <= 0 || fields.to.converted <= 0);
    }, [fields.from.converted, fields.to.converted]);

    const [timer, setTimer] = useState<any>();

    const clear = () => {
        clearInterval(timer);
        setTime(6)
    }

    useEffect(() => {
        clear();
        setProcessing(!hide);
    }, [hide]);

    useEffect(() => {
        if (processing) {
            if (timer) clear();
            const wallet = wallets.from;
            ///
            if (!hide) {
                //-------
                let fee = parseFloat(wallet.curr.charges.exchange_charge);
                if (Number.isNaN(fee)) fee = 0;
                //----------
                const type = wallet.curr.charges.exchange_charge_type;

                if (type == '%') fee = calc.times(data?.amount || 0, calc.divide(fee, 100));
                setCharges(fee);
                setTotal(calc.plus(data?.amount || 0, fee));
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
            snapData(snap());
            setProcessing(true);
        }
    }, [time]);

    useEffect(() => {
        console.log(errors)
    }, [formSending])

    return <>
        <Button type='button' onClick={() => {
            if (disabled) return;
            setHide(false)
            snapData(snap());
        }} className={classNames({ 'bg-primary-300 focus:!bg-primary-400 hover:bg-primary-400 cursor-not-allowed !text-white': disabled })} disabled={disabled} centered>{fields.from.converted > 0 || fields.to.converted > 0 ? 'Preview Conversion' : 'Enter an amount'}</Button>

        <Dialog header='Confirm' visible={!hide} style={{ height: 'fit-content' }} onHide={() => { if (hide) return; setHide(true); }}>
            <div className="m-0 flex flex-col gap-7">
                <div className="flex gap-3 flex-col">
                    <div className="flex justify-between items-center">
                        <div className='flex gap-2 items-center'>
                            <CryptoIcon height='25px' width='25px' size='12px' curr={wallets.from.curr} />
                            <Title bold noPad lg>{data?.amount}</Title>
                        </div>

                        <Title noPad lg>{wallets.from.curr.code}</Title>
                    </div>
                    <FaArrowDownLong />
                    <div className="flex justify-between items-center">
                        <div className='flex gap-2 items-center'>
                            <CryptoIcon height='25px' width='25px' size='10px' curr={wallets.to.curr} />
                            <Title bold noPad lg>{data?.toAmount}</Title>
                        </div>

                        <Title noPad lg>{wallets.to.curr.code}</Title>
                    </div>
                </div>

                <div>
                    {showIf(type == 'limit', <>
                        <DataList label='Expires in' value={<Text><Text>{data?.expire?.label}</Text></Text>} />
                        <DataList label='Limit Rate' value={<div className='flex gap-1'>
                            <Text>1 {wallets.to.curr.code}</Text>
                            =
                            <Text>{data?.limit} {wallets.from.curr.code}</Text>
                        </div>} />
                    </>, <>
                        <DataList label='Rate' value={<div className='flex gap-1'>
                            <Text>1 {wallets.to.curr.code}</Text>
                            =
                            <Text>{data?.rates?.to.rate} {wallets.from.curr.code}</Text>
                        </div>} />
                        <DataList label='inverse Rate' value={<div className='flex gap-1'>
                            <Text>1 {wallets.from.curr.code}</Text>
                            =
                            <Text>{data?.rates.from.rate} {wallets.to.curr.code}</Text>
                        </div>} />
                    </>)}

                    <DataList label={`Transaction Fees (${wallets.from.curr.charges.exchange_charge_type || '%'})`} value={<Text>{showIf(charges > 0, <span className='flex gap-2 items-center'><b>{wallets.from.curr.charges.exchange_charge}</b> <FaArrowRightLong /> <span>{charges}</span></span>, 'No Fees')}</Text>} />

                    {showIf(type == 'instant', (
                        <DataList label='Total' value={<Text>{total}</Text>} />
                    ))}

                </div>

                {showIf(type == 'instant', <div className='flex flex-col gap-2'>
                    {showIf(parseFloat(wallets.from.all_balance.available) >= total, <Button disabled={!processing} centered size='normal' className={classNames({
                        'opacity-60': !processing
                    })} onClick={(e) => {
                        e.preventDefault()
                        post(route('user.crypto.process.swap'), {
                            onSuccess() {
                                router.reload({ only: ['wallets', 'wallet'] })
                            }
                        });
                    }} bgColor='primary'>{showIf(processing, <>Convert {time}s</>, 'Refreshing...')}</Button>, (
                        <div className='flex flex-col gap-2 !justify-start'>
                            <Message className='text-[.813em]' text='Insufficient balance. Please fund your account.' severity='error' />
                            <Button onClick={() => getData(snap())} centered size='normal' bgColor='secondary'>Refresh Quote</Button>
                        </div>
                    ))}

                </div>)}

                {showIf(type == 'limit', <div className='flex flex-col gap-2'>
                    {showIf(parseFloat(wallets.from.all_balance.available) >= total, <Button centered size='normal' onClick={(e) => {
                        e.preventDefault()
                        post(route('user.crypto.process.swap'));
                    }} bgColor='primary'>Ok</Button>, (
                        <div className='flex flex-col gap-2 !justify-start'>
                            <Message className='text-[.813em]' text='Insufficient balance. Please fund your account.' severity='error' />
                        </div>
                    ))}

                </div>)}
            </div>
        </Dialog>
    </>
}


const DataList: React.FC<DataListProps> = ({ value, label }) => {
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


const Limit: React.FC<MarketProps> = ({ wallet: walletProp, wallets, auth, currencies }) => {
    //--- code here ---- //
    const [wallet, setWallet] = useState(walletProp);
    const [swap, setSwap] = useState<Wallet>(wallets.find(item => item.id !== wallet.id) as Wallet);
    //--- code here ---- //
    return (
        <SpotProvider
            user={auth.user}
            type='limit'
            wallets={{
                from: wallet,
                to: swap
            }}
            list={{
                currencies,
                wallets
            }}
        >
            <form className='flex flex-col'>
                <Timer />
                <div className="flex flex-col gap-8">
                    <Exchange
                        exchange
                        onChange={(e) => console.log(e)}
                        order={0}
                    />
                    <Submit type='limit' />
                </div>
            </form>
        </SpotProvider>
    );
}

const Timer = () => {
    const { setField } = useSpot();
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
        setField('time', def);
    }, []);

    return <Select className='!bg-transparent !w-[130px] mb-2 ml-auto' trigger='!h-[30px] !w-[30px] items-center flex !p-0 ml-2 hide-label' items={data}
        unique='label'
        value={{ value: '30d', label: '30 Days' }}
        placeholder={<div className='flex gap-1 items-center'><FaClock /> <Title noPad>Expires in</Title></div>}
        contentTemplate={(props) => <Title noPad>{props.label}</Title>}
        menuItemTemplate={(props) => <Title noPad>{props.label}</Title>}
        quick
        onSelect={(e) => {
            const value = e.value;
            setField('time', value);
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
