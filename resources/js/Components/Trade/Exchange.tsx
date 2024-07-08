import React, { useEffect } from 'react';
import TradeInput, { TradeChangeEvent } from './Input';
import { FaArrowDown } from 'react-icons/fa';
import Tag from '@components/index';
import Text from '../Text';
import { useSpot } from '@context/SpotContext';
import { Wallet } from '@typings/index';
import { useNotify } from '@context/AuthenticatedContext';
import { showIf } from '@assets/fn';
import { CgArrowsExchangeV } from 'react-icons/cg';
import { Title } from '.';
import { FaArrowRightLong } from 'react-icons/fa6';
import { useLive } from '@context/LiveContext';
import { BsInfoCircleFill } from 'react-icons/bs';

const Exchange: React.FC<ExchangeProps> = ({ order, onChange, exchange, title }) => {
    const { currencies, wallet, wallets, to, type } = useSpot();
    const notify = useNotify();
    //----------------
    useEffect(() => {
        if (to.id == wallet.id) {
            console.log('yes')
            notify({
                closable: true,
                severity: 'error',
                summary: `Cannot exchange ${wallet.curr.code} with ${to.curr.code}`,
            })
        }
    }, [to, wallet]);

    const { rates, convert } = useLive();

    //--- code here ----
    return (
        <div className='flex flex-col relative gap-2'>
            <Text
                size='15px'
                className='!font-medium'
                //@ts-ignore
                color='rgb(var(--color-theme-emphasis))'>{title ? title : 'Amount'}</Text>
            <div className="flex relative flex-col gap-2">
                <TradeInput
                    sx={{ order: order == -1 ? 1 : 0 }}
                    isFrom={exchange}
                    currencies={exchange ? currencies : undefined}
                    wallet={wallet}
                    limit={type == 'limit'}
                    balance={wallet.all_balance.available}
                />
                <Tag order={order == -1 ? 0 : 1} className='h-full relative w-full flex'>
                    <Tag sx={{
                        width: '45px',
                        height: '45px',
                        // background: 'rgb(var(--color-theme-bgColor))',
                        // borderRadius: '50%',
                        fontSize: '30px',
                        // border: '1px solid rgba(128, 128, 128, 0.295)',
                        zIndex: 99,
                        margin: 'auto'
                    }} className='flex text-theme/55 items-center justify-center'>{showIf(exchange, <CgArrowsExchangeV />, <FaArrowDown />)}</Tag>
                </Tag>
                <TradeInput
                    sx={{ order: order == -1 ? order : 2 }}
                    currencies={currencies}
                    wallet={to}
                    balance={to.all_balance.available}
                />
            </div>
            <div className="flex items-center justify-between">
                <Title noPad lg bold bright className='flex gap-1'>{/*<BsInfoCircleFill />*/} Rate</Title>
                <div className='flex items-center justify-between gap-2'>
                    <Title noPad>1 {wallet?.curr.code}</Title>
                    <FaArrowRightLong />
                    <Title bold noPad> {rates && convert(wallet.curr.code, to.curr.code, 1)} {to?.curr.code}</Title>
                </div>
            </div>
        </div>
    );
}

interface ExchangeProps {
    order: number;
    exchange?: boolean;
    title?: React.ReactNode;
    onChange(e: any): void
}

export default Exchange;
