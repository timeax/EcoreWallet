import React, { useRef, useState } from 'react';
import Text from '../Text';
import { Currencies } from '@typings/index';
import styles from '@styles/components/trade-input.module.scss';
import Tag, { SxProps } from '..';
import { FaChevronDown } from 'react-icons/fa';
import { ImCheckmark } from "react-icons/im";
import { useSpot } from '@context/SpotContext';

const TradeInput: React.FC<TradeInputProps> = ({ useEvent = false, wallet: value, balance, error = '', min = 10, max = 100000, currencies, onChange, sx }) => {
    //--- code here ---- //
    const [message, setMessage] = useState(error);
    const { setCurrency } = useSpot();


    const [wallet, setWallet] = useState(value);
    const [hide, setHide] = useState(true);
    const ref = useRef<HTMLDivElement | undefined>();

    const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const msg = onChange(e, setMessage);
        const value = parseInt(e.target.value);
        //---
        if (useEvent) {
            if (!msg?.error && value) {
                if (value < min) return setMessage(`Minimum amount is ${min}`)
                if (value > max) return setMessage(`Maximum is ${max}`);
                if (value > balance) return setMessage('Exceeds balance');
            }
        }

        if (!msg?.error) setMessage('');
    }

    function changeWallet(value: Currency): void {
        setWallet(value.code);
        setHide(true);
        //---
        setCurrency(value);
    }

    return (
        <Tag sx={sx} className='relative'>
            <div
                //@ts-ignore
                ref={ref} className={styles.main + ' ' + (message ? '!border-danger-300' : '')}>
                <input placeholder='0' onChange={changeEvent} onBlur={() => ref.current?.classList.remove(styles.focused)} onFocus={() => { ref.current?.classList.add(styles.focused) }} type="number" />
                <div className='flex flex-col items-end'>
                    <Text onClick={() => setHide(false)} size='16px' className={'!font-medium !flex items-center gap-1 ' + (currencies ? 'cursor-pointer' : '')}>{wallet || value} {currencies ? <FaChevronDown /> : ''}</Text>
                    {currencies ? <CurrencyList value={wallet || value} hide={hide} list={currencies} onChange={changeWallet} /> : ''}
                    <Text size='14px'><span>Balance:</span> {balance} <Text variant={'small'}>{wallet}</Text></Text>
                </div>
            </div>
            <Text className='text-danger-700 !font-medium' variant={'small'}>{message}</Text>
        </Tag>
    );
}


const CurrencyList: React.FC<CurrencyListProps> = ({ list, onChange, hide, value }) => {
    //--- code here ---- //
    const [selected, setSelected] = useState(value);

    let change = (value: Currency) => {
        onChange(value);
        ///-----
        setSelected(value.code);
    }

    return (
        <div className={'absolute w-full overflow-auto ' + (hide ? 'hidden ' : '') + styles.menu}>
            {list.map(item => {
                return (
                    <div key={item.id} onClick={() => change(item)} className={styles.menuitem}>
                        <div className='flex gap-4'>
                            <div className={styles.symbol}>
                                {item.symbol}
                            </div>
                            <div className="flex flex-col">
                                <Text size='15px'>{item.curr_name}</Text>
                                <Text variant="small">Balance: {0.00} {item.code}</Text>
                            </div>
                        </div>

                        <Tag element={'span'} className='text-success text-2xl'>
                            {selected === item.code ? <ImCheckmark /> : ''}
                        </Tag>
                    </div>
                )
            })}
        </div>
    );
}

interface CurrencyListProps {
    onChange(value: Currency): void
    list: Currencies;
    hide: boolean;
    value: string
}

type Currency = Currencies[number];

interface TradeInputProps {
    wallet: string;
    onChange: TradeChangeEvent;
    balance: number;
    currencies?: Currencies;
    error?: string;
    min?: number;
    max?: number;
    useEvent?: boolean;
    sx?: SxProps
}

export default TradeInput

export type TradeChangeEvent = (event: React.ChangeEvent<HTMLInputElement>, setError: (msg: string) => void) => { error?: string } | void | undefined;
