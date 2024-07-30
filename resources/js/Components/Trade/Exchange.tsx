import React, { useEffect } from 'react';
import TradeInput from './Input';
import { FaArrowDown } from 'react-icons/fa';
import Tag from '@components/index';
import Text from '../Text';
import { useSpot } from '@context/SpotContext';
import { useNotify } from '@context/AuthenticatedContext';
import { showIf } from '@assets/fn';
import { CgArrowsExchangeV } from 'react-icons/cg';
import { Title } from '.';
import { FaArrowRightLong } from 'react-icons/fa6';

const Exchange: React.FC<ExchangeProps> = ({ order, exchange, title }) => {
    const { list, wallets, type, rates, swap } = useSpot();
    const notify = useNotify();
    //----------------
    useEffect(() => {
        if (wallets.to.id == wallets.from.id) {
            notify({
                closable: true,
                severity: 'error',
                summary: `Cannot exchange ${wallets.from.curr.code} with ${wallets.to.curr.code}`,
            })
        }
    }, [wallets]);

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
                    currencies={list.currencies}
                    id='from'
                    wallet='from'
                    limit={type === 'limit'}
                    currType={2}
                />
                <Tag order={order == -1 ? 0 : 1} className='h-full relative w-full flex'>
                    <Tag sx={{
                        width: '45px',
                        height: '45px',
                        fontSize: '30px',
                        zIndex: 99,
                        margin: 'auto'
                    }} element='div'
                        onClick={swap}
                        className='flex text-theme/55 items-center justify-center'>{showIf(exchange, <CgArrowsExchangeV />, <FaArrowDown />)}</Tag>
                </Tag>
                <TradeInput
                    sx={{ order: order == -1 ? order : 2 }}
                    currencies={list.currencies}
                    id='to'
                    currType={2}
                    wallet='to'
                />
            </div>
            <div className="flex items-center justify-between">
                <Title noPad lg bold bright className='flex gap-1'>{/*<BsInfoCircleFill />*/} Rate</Title>
                <div className='flex items-center justify-between gap-2'>
                    <Title noPad>1 {wallets.from?.curr.code}</Title>
                    <FaArrowRightLong />
                    <Title bold noPad> {rates && rates.from.rate} {wallets.to?.curr.code}</Title>
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
