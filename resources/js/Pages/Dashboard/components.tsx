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
import CryptoIcon from '@components/CryptoIcon';
import Tag from '@components/index';

export const WalletGroup: React.FC<WalletGroupProps> = ({ wallets }) => {
    //--- code here ---- //
    const len = wallets.length;
    return (
        <div className={styles.stacked}>
            {wallets.map((wallet, i) => {
                const index = len - i;
                return <Wallet wallet={wallet} index={index} key={wallet.id} />
            })}
        </div>
    );
}


const Wallet: React.FC<WalletProps> = ({ wallet, index }) => {
    //--- code here ---- //
    const [active, setActive] = useState<MarketData>();
    //-------
    const { rates, marketData, convert } = useLive();

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
            <div key={wallet.id} className={classNames(styles.main, styles.wallet)} style={{ background: Color(color).lighten(0.3).string(), zIndex: index }}>
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
                        <SparkLineChart colors={[getCrptoColor(wallet.curr.curr_name)]} data={active?.data.sparkline_in_7d.price} />
                    </div>)}
                </div>
                <div className="gap-1 absolute top-[80%] flex">
                    <Title white bold lg noPad>{convert(wallet.curr.code, 'USD', wallet.balance, 6)} USD</Title>
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
    index: number
}


interface WalletGroupProps {
    wallets: Wallets
}



