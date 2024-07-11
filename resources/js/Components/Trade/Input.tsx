import React, { useEffect, useRef, useState } from 'react';
import Text from '../Text';
import { Currencies, Wallet } from '@typings/index';
import styles from '@styles/components/trade-input.module.scss';
import Tag, { SxProps } from '..';
import { FaChevronDown, FaStar } from 'react-icons/fa';
import { useSpot } from '@context/SpotContext';
import { classNames } from 'primereact/utils';
import { Title } from '.';
import { Dialog } from 'primereact/dialog';
import { useLive } from '@context/LiveContext';
import calc from 'number-precision';
import { TbArrowsExchange } from 'react-icons/tb';
import Textfield from '@components/Input';
import CryptoIcon from '@components/CryptoIcon';
import IconButton from '@components/Button/IconButton';
import { showIf } from '@assets/fn';
const TradeInput: React.FC<TradeInputProps> = ({ value: initValue = 0.00, elementRef, className = '', isFrom, wallet, balance, error = '', min = 0.00000001, max = 100000, currencies, onChange, sx, limit, isLimit }) => {
    //--- code here ---- //
    balance = typeof balance == 'string' ? parseFloat(balance) : balance;
    const [message, setMessage] = useState(error);
    const { processing, data, setWallet, wallets, setTo, to: account2, setAmount, setToAmount, toAmount, wallet: account, setLastFocused, tempAmount: raw, setTemp: setRaw, setData, type } = useSpot();

    let [initLimit] = useState(data.limit);

    const [value, setValue] = useState(initValue);


    const [hide, setHide] = useState(true);

    const ref = elementRef || useRef<HTMLDivElement | undefined>();
    const conversion: React.RefObject<HTMLParagraphElement> = useRef() as any;

    const { convert, rates, getRate, change } = useLive();

    const changeFunc = (changeValue: number) => {
        const limit = data.limit || 0;
        if (!isFrom) {
            return calc.round(calc.divide(changeValue, limit), 8);
        } else return change(changeValue, limit);
    }

    useEffect(() => {
        if (isLimit) return;
        if (processing) return;
        //---------
        let changedValue = isFrom ? raw.amount : raw.toAmount, toCard = isFrom ? account2 : account;
        let temp = changedValue;
        //----------
        if (changedValue === -1) changedValue = value || 0;
        const usd = convert(wallet.curr.code, 'USD', changedValue || 0, 2);
        let actualValue = changedValue;
        ///==---
        if (temp > -1) {
            actualValue = type == 'instant'
                ? convert(toCard.curr.code, wallet.curr.code, changedValue)
                : changeFunc(changedValue);
            setValue(actualValue);
        };
        //----------
        const err = (actualValue < min) || (actualValue > max) || (actualValue > balance);
        temp = actualValue;
        ///--------------
        isFrom ? ((err && (temp = -1)), setAmount(temp)) : setToAmount(actualValue);
        //
        if (isFrom && actualValue) {
            if (!err && message) setMessage('');
            if (actualValue < min) setMessage(`Amount is less than the minimum amount (${min})`)
            if (actualValue > max) setMessage(`Amount is more than the maximum amount (${max})`);
            if (actualValue > balance) setMessage('Amount is more than current funds');
        }
        //-------
        if (conversion.current) conversion.current.innerText = `\$${usd > 0 ? usd : '0.00'}`;
        //----
    }, [rates, raw, processing]);


    useEffect(() => {
        if (isLimit) {
            setValue(calc.round(calc.minus(getRate(account2.curr.code, account.curr.code), 0.0000009), 8));
        }
    }, [account2])


    useEffect(() => {
        if (isLimit) {
            setData('limit', value);
        }
    }, [value]);

    const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseFloat(e.target.value);
        //@ts-ignore
        setValue(e.target.value || '');

        const msg = onChange?.({ ...e, value }, setMessage);
        if (msg?.break) return;
        ///----
        if (msg?.error) setMessage(msg.error);
        //---
        setLastFocused(wallet);
        //-------
        if (!isFrom) {
            setRaw({
                amount: value || 0,
                toAmount: -1
            });
        } else if (!isLimit) {
            setRaw({
                amount: -1,
                toAmount: value || 0
            });
        } else {
            setRaw({
                amount: -1,
                toAmount: -1,
                limit: value
            })
        }

        if (!msg?.error) setMessage('');
    }

    function changeWallet(value: Currency): void {
        setWallet(wallets.find(item => item.curr.code == value.code) as Wallet);
    }

    function changeSwap(value: Currency) {
        setTo(wallets.find(item => item.curr.code == value.code) as Wallet);
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
                            <span>{wallet.curr.code}</span> {currencies ? <FaChevronDown /> : ''}
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
                                        <Title noPad sm>{rates && getRate(account2.curr.code, account.curr.code)} {account.curr.code}</Title>
                                    </Title>
                                ))}
                            </div>
                            {showIf(!isLimit, <div className='flex gap-1 items-center'>
                                <Title noPad>Balance:</Title>
                                <Title noPad medium>
                                    {calc.round(wallet.all_balance.available || balance, 8)}
                                </Title>
                                <Title noPad medium sm>{wallet.curr.code}</Title>
                            </div>)}
                        </div>
                        {currencies ? <CurrencyList set={setHide} value={wallet} hide={hide} list={currencies} onChange={!isFrom ? changeSwap : changeWallet} /> : ''}
                    </div>
                    {showIf(limit, (
                        <div className='flex flex-col mt-3 gap-3'>
                            <hr />
                            <div className="flex flex-col gap-2">
                                <Title md medium noPad className='gap-1'>
                                    When 1 <b>{account2.curr.code}</b> is worth
                                </Title>
                                <TradeInput
                                    wallet={account}
                                    balance={account.all_balance.available}
                                    isLimit
                                    value={initLimit}
                                    elementRef={ref}
                                    onChange={(e, setErr) => {
                                        const value = e.value;
                                        if (value > getRate(account2.curr.code, account.curr.code)) {
                                            setErr('The price you set to buy is higher than the current market price, which results in a loss');
                                        } else {
                                            //@ts-ignore
                                            setErr((err) => {
                                                if (err) return '';
                                            });
                                        }
                                        //--------
                                        return { break: true }
                                    }}
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


const CurrencyList: React.FC<CurrencyListProps> = ({ list, onChange, hide, value, set }) => {
    //--- code here ---- //

    /**
     *
      <div className={classNames(styles.menu, 'absolute w-full overflow-auto ', { 'hidden': hide })}>
                {list.map(item => {
                    return (
                        <div key={item.id} onClick={() => change(item)} className={classNames(styles.menuitem)
                        }>
                            <div className='flex gap-2 items-center'>
                                <CryptoIcon name={item.curr_name} label={item.symbol} size='13px' width='2.1rem' height='2rem' />
                                <div className="flex flex-col">
                                    <Title bold lg brighter noPad>{item.curr_name}</Title>
                                    <Text variant="small">Balance: {get(item).all_balance.available} {item.code}</Text>
                                </div>
                            </div>

                            <Tag element={'span'} className='text-success text-2xl'>
                                {selected.curr.code === item.code ? <ImCheckmark /> : ''}
                            </Tag>
                        </div>
                    )
                })}
            </div >
     */
    return (
        <Dialog header='Select Currency' visible={!hide} style={{ width: '30vw', height: '60vh' }} onHide={() => { if (hide) return; set(true); }}>
            <div className="m-0">
                <Textfield placeholder='Search' />
                <div className="mt-4 flex flex-col">
                    {list.map(item => {
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
    wallet: Wallet;
    onChange?: TradeChangeEvent;
    balance: number | string;
    currencies?: Currencies;
    value?: number;
    isFrom?: boolean;
    error?: string;
    min?: number;
    max?: number;
    className?: string;
    limit?: boolean
    sx?: SxProps;
    isLimit?: boolean;
    elementRef?: any
}

export default TradeInput

export type TradeChangeEvent = (event: React.ChangeEvent<HTMLInputElement> & { value: number }, setError: (msg: string) => void) => { error?: string, break?: boolean } | void | undefined;
