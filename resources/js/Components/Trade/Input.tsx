import React, { useEffect, useRef, useState } from 'react';
import Text from '../Text';
import { Currencies, Wallet } from '@typings/index';
import styles from '@styles/components/trade-input.module.scss';
import Tag, { SxProps } from '..';
import { FaChevronDown, FaStar } from 'react-icons/fa';
import { useSpot, WalletId, WalletType } from '@context/SpotContext';
import { classNames } from 'primereact/utils';
import { Title } from '.';
import { Dialog } from 'primereact/dialog';
import calc from 'number-precision';
import { TbArrowsExchange } from 'react-icons/tb';
import Textfield from '@components/Input';
import CryptoIcon from '@components/CryptoIcon';
import IconButton from '@components/Button/IconButton';
import { showIf } from '@assets/fn';
const TradeInput: React.FC<TradeInputProps> = ({
    value: initValue = 0.00,
    elementRef,
    className = '',
    error = '',
    min = 0.00000001,
    max = 100000,
    currencies,
    sx, id: key, wallet: accountId, limit
}) => {
    //--- code here ---- //
    const { list, setWallet, wallets, getKey, setField, fields, rates, convert: setConvert, getCurrent, type, getField } = useSpot();
    const [message, setMessage] = useState(error);
    const [value, setValue] = useState(initValue);

    const [hide, setHide] = useState(true);

    const ref = elementRef || useRef<HTMLDivElement | undefined>();
    const conversion: React.RefObject<HTMLParagraphElement> = useRef() as any;

    const isLimit = key === 'limit';
    const other = getKey(accountId);

    const [wallet, setAcct] = useState<Wallet>(wallets[accountId]);

    useEffect(() => {
        setAcct(wallet);
    }, [wallets]);

    function convert(value: any, deep: boolean = false) {
        const { rate } = rates[other];
        const { fiat } = rates[accountId];

        if (conversion.current) {
            conversion.current.innerText = fiat.symbol + calc.round(calc.times(fiat.rate, value), 2);
        }

        if (deep) {
            if (type === 'limit') {
                if (!isLimit) {
                    if (!limit) {
                        return calc.round(calc.divide(calc.times(1, fields[other].converted), fields.limit.input || fields.limit.converted), 8);
                    }
                    return calc.round(calc.times(fields.limit.input || 0, value), 8);
                }
                return;
            }
            return calc.round(calc.times(rate, value), 8);
        }
    }

    function changeLimit() {
        const value = calc.minus(rates[other].rate, .0000009);
        setValue(value);
        //--------
        setField(key, value || 0);
    }

    useEffect(() => {
        if (key !== 'limit') return;
        changeLimit();
    }, [])

    useEffect(() => {
        const field = getCurrent();
        if (key !== 'limit') convert(value);
        //--------
        if (field.id === key) return;
        if (key == 'limit') {
            const limit = fields.limit;
            //---
            if (limit.converted) return;
            return changeLimit();
        }
        //--------
        const handler = fields[other];
        const changed = convert(handler.converted, true);
        //-----------
        if (typeof changed !== 'number') return;

        setConvert(key, changed);
        setValue(changed);
    }, [rates]);

    useEffect(() => {
        if (isLimit) {
            if (value > rates.to.rate) setMessage('The price you set to buy is higher than the current market price, which results in a loss.');
            else setMessage('')
        }
    }, [fields.limit]);

    useEffect(() => {
        const field = getCurrent();
        //---
        if (key == 'limit') {
            if (field.id == key) setField('from', getField('from').converted)
        } else if (!(key === field.id)) {
            let value = fields[other].input
            //----------
            let changed = convert(value, true);
            if (typeof changed !== 'number') return;

            setConvert(key, changed);
            setValue(changed);
        }
        //---
        //---------
    }, [fields[other].input]);

    useEffect(() => {
        if (key == 'from') {
            const balance = (wallets.from.all_balance.available as unknown as number);
            const actualValue = getField('from').converted;
            const err = actualValue < min ||
                actualValue > max ||
                actualValue > balance
            //=============
            if (!err && message) setMessage('');
            else if (fields.from.input || fields.to.input) {
                if (actualValue < min) setMessage(`Amount is less than the minimum amount (${min})`)
                if (actualValue > max) setMessage(`Amount is more than the maximum amount (${max})`);
                if (actualValue > balance) setMessage('Amount is more than current funds');
            } else setMessage('');
        }
    }, [fields.from.converted])

    const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.trim();
        if (value == '.') value = '0.';
        //------------
        else if (value.startsWith('0')) {
            if (value.length > 1) {
                if (value.charAt(1) === '0') value = '0';
                else if (value.charAt(1) !== '.') value = value.substring(1);
            }
        } else if (value.startsWith('-')) value = '0';
        else if (value.startsWith('.')) value = '0' + value;
        //@ts-ignore
        setValue(value || '');
        //---
        convert(value);
        //-------
        setField(key, value || 0);
        setConvert(key, value);

    }

    function changeWallet(value: Currency): void {
        const acct = list.wallets.find(item => item.curr.id == value.id) as Wallet;
        setAcct(acct);
        //------------
        setWallet(accountId, acct);
    }


    return (
        <Tag sx={sx} className={classNames('relative', className)}>
            <div
                //@ts-ignore
                ref={ref} className={classNames(styles.main, {
                    '!border-danger-300': message,
                    '!p-0 !border-none': isLimit
                })}>

                <>
                    <input step={'any'} value={Number.isNaN(value) ? 0 : value} placeholder='0' onChange={changeEvent} onBlur={() => ref.current?.classList.remove(styles.focused)} onFocus={() => { ref.current?.classList.add(styles.focused) }} type="number" />
                    <div className='flex flex-col items-end'>
                        <Text
                            onClick={() => setHide(false)}
                            size='16px'
                            className={'!font-medium !flex items-center gap-1 ' + (currencies ? 'cursor-pointer' : '')}>
                            <span>{wallets[accountId].curr.code}</span> {currencies ? <FaChevronDown /> : ''}
                        </Text>

                        <div className='flex justify-between items-center w-full py-2'>
                            <div className='flex items-center gap-1'>
                                {showIf(!isLimit, (
                                    <Title noPad bright className='gap-1'>
                                        <TbArrowsExchange fontSize={'11px'} />
                                        <Title noPad bright sm ref={conversion}>$0.00</Title>
                                    </Title>
                                ), (
                                    <Title noPad sm className='gap-1'>
                                        Market Price:
                                        <Title noPad sm>{rates[other].rate} {wallets[accountId].curr.code}</Title>
                                    </Title>
                                ))}
                            </div>
                            {showIf(!isLimit, <div className='flex gap-1 items-center'>
                                <Title noPad>Balance:</Title>
                                <Title noPad medium>
                                    {calc.round(wallet.all_balance.available || 0, 8)}
                                </Title>
                                <Title noPad medium sm>{wallet.curr.code}</Title>
                            </div>)}
                        </div>
                        {currencies ? <CurrencyList set={setHide} value={wallet} hide={hide} list={currencies} onChange={changeWallet} /> : ''}
                    </div>
                    {showIf(limit, (
                        <div className='flex flex-col mt-3 gap-3'>
                            <hr />
                            <div className="flex flex-col gap-2">
                                <Title md medium noPad className='gap-1'>
                                    When 1 <b>{wallets[getKey(accountId)].curr.code}</b> is worth
                                </Title>
                                <TradeInput
                                    value={0}
                                    elementRef={ref}
                                    id='limit'
                                    wallet={accountId}
                                />
                            </div>
                        </div>
                    ))}
                </>
            </div>
            <Text className='text-danger-700 !font-medium' variant={'small'}>{message}</Text>
        </Tag>
    );
}


const CurrencyList: React.FC<CurrencyListProps> = ({ list, onChange, hide, set }) => {
    //--- code here ---- //
    const [currencies, setCurrs] = useState<Currencies>(list);

    return (
        <Dialog header='Select Currency' className={styles.currencyList} visible={!hide} style={{ height: '60vh' }} onHide={() => { if (hide) return; set(true); }}>
            <div className="m-0">
                <Textfield placeholder='Search' onChange={(e) => {
                    //@ts-ignore
                    const value: string = (e.target.value || '').toLowerCase();
                    if (value.trim() == '') return setCurrs(list);
                    setCurrs(list.filter(item => item.code.toLowerCase().includes(value) || item.curr_name.toLowerCase().includes(value)));
                }} />
                <div className="mt-4 flex flex-col">
                    {currencies.map(item => {
                        return (
                            <div key={item.id} className='flex px-3 py-2 rounded-md hover:bg-theme-button cursor-pointer items-center' onClick={() => {
                                set(true);
                                onChange(item);
                            }}>
                                <div className="flex gap-2 items-center mr-auto">
                                    <CryptoIcon height='30px' width='30px' size='11px' name={item.curr_name} label={item.symbol} />
                                    <div className='flex flex-col'>
                                        <Title bold noPad>{item.code}</Title>
                                        <Title noPad>{item.curr_name}</Title>
                                    </div>
                                </div>

                                <IconButton variant='none'><FaStar /></IconButton>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Dialog>
    );
}

interface CurrencyListProps {
    onChange(value: Currency): void
    list: Currencies;
    hide: boolean;
    value: Wallet,
    set(v: boolean): void
}

type Currency = Currencies[number];

interface TradeInputProps {
    currencies?: Currencies;
    value?: number;
    wallet: WalletId
    error?: string;
    min?: number;
    max?: number;
    className?: string;
    sx?: SxProps;
    elementRef?: any;
    id: WalletType;
    limit?: boolean
}

export default TradeInput

export type TradeChangeEvent = (event: React.ChangeEvent<HTMLInputElement> & { value: number }, setError: (msg: string) => void) => { error?: string, break?: boolean } | void | undefined;


