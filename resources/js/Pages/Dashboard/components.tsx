import { Wallet as WalletAPI, Wallets } from '@typings/index';
import React, { useEffect, useState } from 'react';
import _dashboard from '@styles/pages/dashboard.module.scss';
import { Title } from '@components/Trade';
import styles from '@styles/components/wallet.module.scss'
import { getCrptoColor, showIf } from '@assets/fn';
import { classNames } from 'primereact/utils';
import { MarketData, useLive } from '@context/LiveContext';
import Color from 'color';
import calc from 'number-precision';
import { FaArrowRightLong } from 'react-icons/fa6';
import dashboard from '@styles/pages/dashboard.module.scss';
import { SparkLineChart } from '@mui/x-charts';
import Tag from '@components/index';
import { Tooltip } from 'primereact/tooltip';
import Card from '@components/Card';
import CurrencyFormat from 'react-currency-format';

export const WalletGroup: React.FC<WalletGroupProps> = ({ wallets: list, change, wallet }) => {
    //--- code here ---- //
    const [wallets, setWallets] = useState(list);

    useEffect(() => {
        const walletList = [...list];
        if (wallet) {
            const index = walletList.findIndex(e => e === wallet);
            if (index > -1) {
                walletList.splice(index, 1);
                walletList.unshift(wallet);
                //----------
                setWallets(walletList);
            }
        }
    }, [wallet])

    const len = wallets.length;
    return (
        <div className={styles.stacked}>
            {wallets.map((wallet, i) => {
                const index = len - i;
                return <Wallet change={change} wallet={wallet} index={index} key={wallet.id} />
            })}

            <div className={styles.controls}>
                {wallets.map((wallet, i) => {
                    const color = getCrptoColor(wallet.curr.curr_name);
                    const className = `controls-${i}`;
                    return <React.Fragment key={i}>
                        <Tooltip target={className} />
                        <span data-pr-tooltip={wallet.curr.curr_name} onClick={e => change(wallet)} style={{ background: color }} className={classNames(styles.control, className)} key={wallet.id} />
                    </React.Fragment>
                })}
            </div>
        </div>
    );
}


export const Portifolio: React.FC<PortifolioProps> = ({ wallet }) => {
    //--- code here ---- //
    const { rates, marketData, convert, currency } = useLive();
    const [active, setActive] = useState<MarketData>();

    useEffect(() => {
        if (rates && active) {
            const rate = rates.find(item => item.id == wallet.curr.id)?.data.find(item => item.to === 'USD');
            if (rate) {
                setActive({
                    id: active.id,
                    data: {
                        ...active.data,
                        current_price: calc.round(rate.course, 4)
                    }
                })
            }
        }
    }, [rates]);

    useEffect(() => {
        if (marketData) {
            const data = marketData.find(item => item.id == wallet.curr.id);
            if (data) setActive(data);
        }
    }, [marketData])
    return (
        <Card className={styles.mobileWallet} container='!px-4 !py-3 w-full'>
            <div className=''>
                <img src={active?.data.image} width={'33px'} />
            </div>
            <div className="flex flex-col gap-1 mt-3">
                <div className='flex gap-2 items-center'>
                    <Title noPad>{wallet.curr.curr_name}</Title>
                    <span style={{ background: `rgb(var(--color-${(active?.data.price_change_percentage_24h || 0) > 0 ? 'success' : 'danger'}-300))` }} className={styles.percent}>{calc.round(active?.data.price_change_percentage_24h || 0.00, 2)}%</span>
                </div>
                <div>
                    <Title noPad xl bold >
                        {currency?.symbol}
                        <CurrencyFormat
                            value={convert(wallet.curr.code, currency?.code || 'USD', wallet.all_balance.available, 2)}
                            thousandSeparator
                            displayType='text'
                        />
                    </Title>
                </div>
                <div className='flex items-center'>
                    <Title noPad xs brighter>
                        {wallet.curr.code}
                    </Title>
                    {/* <div className={styles.graph}>
                        <SparkLineChart colors={[getCrptoColor(wallet.curr?.curr_name || '')]} data={active?.data?.sparkline_in_7d.price || [0]} />
                    </div> */}
                </div>
            </div>
        </Card>
    );
}

interface PortifolioProps {
    wallet: WalletAPI
}


const Wallet: React.FC<WalletProps> = ({ wallet, index, change }) => {
    //--- code here ---- //
    const [active, setActive] = useState<MarketData>();
    //-------
    const { rates, marketData, convert, currency } = useLive();

    useEffect(() => {
        if (rates && active) {
            const rate = rates.find(item => item.id == wallet.curr.id)?.data.find(item => item.to === 'USD');
            if (rate && active) {
                setActive({
                    id: active.id,
                    data: {
                        ...active.data,
                        current_price: calc.round(rate.course, 4)
                    }
                })
            }
        }
    }, [rates]);

    useEffect(() => {
        if (marketData) {
            const data = marketData.find(item => item.id == wallet.curr.id);
            if (data) setActive(data);
        }
    }, [marketData])
    const color = getCrptoColor(wallet.curr.curr_name);
    return (
        <>
            <div key={wallet.id} onClick={e => change(wallet)} className={classNames(styles.main, styles.wallet)} style={{ background: Color(color).lighten(0.3).string(), zIndex: index }}>
                <div className='flex gap-1'>
                    <img src={active?.data.image} width={'25px'} alt="" />
                    <Title noPad xl bold white>{wallet.curr.curr_name}</Title>
                </div>
                <div className="py-1">
                    <Title noPad medium sm white className='flex gap-2 items-center'>
                        <span>1 {wallet.curr.code}</span>
                        <FaArrowRightLong />
                        <span>${active?.data.current_price}</span>
                    </Title>
                </div>
                <div>
                </div>

                <div className='mt-auto grow z-[999]'>
                    {showIf(active?.data.sparkline_in_7d, <div className={classNames(dashboard.graph, 'h-full grow top-[-10px] relative')}>
                        {/**@ts-ignore */}
                        <SparkLineChart height={70} colors={[getCrptoColor(wallet.curr.curr_name)]} data={active?.data.sparkline_in_7d.price} />
                    </div>)}
                </div>
                <div className="gap-1 absolute top-[80%] flex">
                    <Title white bold lg noPad>{convert(wallet.curr.code, currency?.code || 'USD', wallet.balance, 6)} {currency?.code}</Title>
                </div>

                <Tag sx={{
                    height: '90px',
                    width: '90px',
                    borderRadius: '50%',
                    background: Color(color).fade(0.7).string(),
                    right: -50,
                    position: 'absolute',
                    top: '25%'
                }} />
            </div>
        </>
    );
}

interface WalletProps {
    wallet: WalletAPI;
    index: number;
    change(wallet?: WalletAPI): void;
}


interface WalletGroupProps {
    wallets: Wallets
    change(wallet?: WalletAPI): void
    wallet?: WalletAPI
}



