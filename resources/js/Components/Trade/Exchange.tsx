import React from 'react';
import TradeInput, { TradeChangeEvent } from './Input';
import { FaArrowDown } from 'react-icons/fa';
import Tag from '@components/index';
import Text from '../Text';
import { useSpot } from '@context/SpotContext';

const Exchange: React.FC<ExchangeProps> = ({ order, onChange, exchange, title }) => {
    const { currencies, currency, wallet } = useSpot();

    const processChange: TradeChangeEvent = (e, setError) => {

    }

    //--- code here ---- //
    return (
        <div className='flex flex-col relative gap-2'>
            <Text
                size='15px'
                className='!font-medium'
                //@ts-ignore
                color='rgb(var(--color-theme-emphasis))'>{title ? title : 'Amount'}</Text>
            <div className="flex relative flex-col gap-2">
                <TradeInput sx={{ order: order == -1 ? 1 : 0 }} onChange={processChange} currencies={exchange ? currencies : null} wallet={wallet?.curr.code} balance={200} />
                <Tag order={order == -1 ? 0 : 1} className='h-full relative w-full flex'>
                    <Tag sx={{
                        width: '45px',
                        height: '45px',
                        background: 'rgb(var(--color-theme-bgColor))',
                        borderRadius: '50%',
                        border: '1px solid rgba(128, 128, 128, 0.295)',
                        zIndex: 99,
                        top: '-22px',
                        left: '45%'
                    }} className='flex absolute text-theme/55 items-center justify-center'><FaArrowDown /></Tag>
                </Tag>
                <TradeInput sx={{ order: order == -1 ? order : 2 }} useEvent={true} currencies={currencies} onChange={processChange} wallet={currency?.code || 'USD'} balance={200} />
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
