import Card from '@components/Card';
import CryptoIcon from '@components/CryptoIcon';
import AuthenticatedLayout from '@layouts/AuthenticatedLayout';
import { Currencies, PageProps, Transactions, Wallet, Wallets as WalletList } from '@typings/index';
import React, { useEffect, useState } from 'react';
import styles from '@styles/pages/wallets/wallets.module.scss';
import WalletInfo from './Partials/WalletInfo';
import { classNames } from 'primereact/utils';
import ExtraInfo from './Partials/ExtraInfo';
import { Title } from '@components/Trade';
import Textfield from '@components/Input';
import { Checkbox } from 'primereact/checkbox';
import LiveFeed, { MarketData, Rate, useLive } from '@context/LiveContext';
import CurrencyFormat from 'react-currency-format';
import calc from 'number-precision';
import { Percent } from '@components/index';
import { TransactionProvider } from '@context/TransactionDetail';
import Select from '@components/Trade/Select';
import { FaChevronDown } from 'react-icons/fa';
import IconButton from '@components/Button/IconButton';
import { getCrptoColor } from '@assets/fn';
import Color from 'color';
import Button from '@components/Button';
import { CurrencyProvider, useWallets } from './Currency';

const Wallets: React.FC<WalletsProps> = ({ auth, wallets, currencies, deposits, withdrawals, exchanges, transfers, ...props }) => {
    //--- code here ---- //
    return (
        <AuthenticatedLayout user={auth.user}
            {...props}
            desc={'All available assets ranked in order of popularity (24H view)s'} title='Assets'>
            <CurrencyProvider>
                {/* @ts-ignore */}
                <TransactionProvider {...{ deposits, withdrawals, exchanges, currencies, transfers }}>
                    <LiveFeed currencies={currencies} wallets={wallets} rates historicalData marketData>
                        <Page wallets={wallets} />
                    </LiveFeed>
                </TransactionProvider>
            </CurrencyProvider>
        </AuthenticatedLayout>
    );
}



const Page: React.FC<MainPageProps> = ({ wallets }) => {
    //--- code here ---- //
    const [wallet, setWallet] = useState(wallets[0]);
    const [checked, setChecked] = useState<boolean | undefined>(false);

    return (
        <div className={styles.page}>
            <div className={classNames('flex gap-4', styles.toolbar)}>
                <Textfield placeholder='Search All Wallets' />
                <div className="flex items-center gap-2">
                    <Checkbox checked={checked as boolean} onChange={(e) => setChecked(e.checked)} />
                    <Title noPad lg>Hide all zero values</Title>
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.walletCard}>
                    <WalletMobile {...(wallet || {})} setWallet={setWallet} />
                </div>
                <div className={styles.table}>
                    <div className={'flex gap-y-2 flex-col'}>
                        {wallets.map(item => <WalletDesktop current={wallet.id} key={item.id} wallet={item} change={setWallet} />)}
                    </div>
                </div>
                <div className={styles.summary}>
                    <div className='flex flex-col gap-4'>
                        <WalletInfo wallet={wallet} />
                        <ExtraInfo wallet={wallet} />
                    </div>
                </div>
                <div className={styles.tradeButtons}>
                    <Button centered size='normal' shape='pill'>Swap</Button>
                    <Button centered size='normal' shape='pill'>Deposit</Button>
                    <Button centered size='normal' shape='pill'>Send</Button>
                </div>
            </div>
        </div>

    );
}


const WalletMobile: React.FC<WalletMobileProps> = ({ all_balance: balance, curr, crypto_id, setWallet }) => {
    const { rates, currency, marketData, convert, currencies, setCurr, wallets } = useLive();
    const [data, setData] = useState<MarketData['data'] | undefined>();

    useEffect(() => {
        if (marketData) setData(marketData?.find(data => data.id == crypto_id)?.data)
    }, [marketData, crypto_id]);

    const color = getCrptoColor(curr.curr_name);
    const { selected, show } = useWallets();

    useEffect(() => {
        if (selected) {
            setWallet(wallets.find(item => item.crypto_id == selected.id) as any);
        }
    }, [selected])

    return (
        <Card data-section={'wallet-mobile'}>
            <div className="flex">
                <div className='flex gap-2 items-center'>
                    <CryptoIcon data-section={'icon'} width='40px' curr={curr} />
                    <Title data-section={'title'} noPad lg brighter>{curr?.curr_name}</Title>
                </div>
                <Select
                    unique='id'
                    contained
                    transaparent
                    className={styles.select}
                    items={currencies.filter(item => wallets.find(item => item.crypto_id == item.id) || (item.type as any) == 1)}
                    value={currency}
                    label='code'
                    gap={9}
                    menuGap={9}
                    textColor={color}
                    onSelect={(e) => setCurr(e.value)}
                />
            </div>
            <div className='flex pb-2 justify-between items-end mt-2'>
                <div>
                    <Title data-section={'balance'} noPad xl3 bold>{balance?.available}</Title>
                    <Title data-section={'balance-to-fiat'} noPad md brighter medium>
                        {currency?.symbol}
                        <CurrencyFormat
                            value={rates && convert(curr.code, currency?.code || 'USD', balance?.total, 4)}
                            displayType='text'
                            thousandSeparator
                        />
                        <span className='pl-1'>{currency?.code}</span></Title>
                </div>
                <div>
                    <Percent data-section={'hr-percent'} value={data?.price_change_percentage_24h || 0} percent shape='999px' round={2} variant='contained' />
                </div>
            </div>

            <div className='absolute py-2 w-full flex items-center justify-center bottom-0 left-0'>
                <IconButton size='small' sx={{
                    background: `${Color(color).fade(.8)} !important`,
                    color: `${color} !important`,
                    padding: '.4rem !important',
                }} onClick={() => {
                    show(wallets.map(item => item.curr), 'Select Wallet');
                }} variant='contained' shape='circle'><FaChevronDown /></IconButton>
            </div>
        </Card>
    );
}

interface WalletMobileProps extends Wallet {
    setWallet: (wallet: Wallet) => void
}


const WalletDesktop: React.FC<WalletDesktopProps> = ({ change: setWallet, wallet: item, current }) => {
    //--- code here ---- //
    const { rates, marketData, currency, currRate } = useLive();

    const [rate, setRate] = useState<Rate['data'][number] | undefined>();
    const [data, setData] = useState<MarketData['data'] | undefined>();

    useEffect(() => {
        setRate(currRate(item.curr.code));
    }, [rates]);

    useEffect(() => {
        if (marketData) setData(marketData?.find(data => data.id == item.crypto_id)?.data)
    }, [marketData, item]);

    return (
        <Card key={item.id} onClick={() => setWallet(item)} className={classNames(styles.wallet, { [styles.selected]: item.id === current })} container='!py-4'>
            <div className="flex justify-between">
                <div className='flex gap-2 items-center'>
                    <CryptoIcon curr={item.curr} />
                    <div className='flex flex-col justify-between'>
                        <Title noPad md bold>
                            {item.curr.curr_name}
                        </Title>
                        <Title sm bright medium noPad>
                            {item.curr.code}
                        </Title>
                    </div>
                </div>
                <div>

                </div>
                <div className='flex flex-col justify-between items-end'>
                    <CurrencyFormat
                        value={rates && calc.round(rate?.course || 0, 3)}
                        thousandSeparator
                        displayType='text'
                        renderText={value => <Title md medium noPad>{currency?.symbol}{value}</Title>}
                    />

                    <Percent weight={600} value={calc.round(data?.price_change_percentage_24h || 0, 2) || 0} percent variant='text' />
                </div>
            </div>
        </Card>
    );
}

interface WalletDesktopProps {
    change: Function;
    wallet: Wallet
    current: number | string
}


interface MainPageProps {
    wallets: WalletList;
}





interface WalletsProps extends PageProps {
    wallets: WalletList;
    currencies: Currencies;
}

export default Wallets
