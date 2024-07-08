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
const TradeInput: React.FC<TradeInputProps> = ({ elementRef, className = '', isFrom, wallet, balance, error = '', min = 0.00000001, max = 100000, currencies, onChange, sx, limit, isLimit }) => {
    //--- code here ---- //
    balance = typeof balance == 'string' ? parseFloat(balance) : balance;
    const [message, setMessage] = useState(error);
    const { processing, setWallet, wallets, setTo, to: account2, setAmount, setToAmount, amount, toAmount, wallet: account, setLastFocused, tempAmount: raw, setTemp: setRaw } = useSpot();

    const [value, setValue] = useState(0);


    const [hide, setHide] = useState(true);

    const ref = elementRef || useRef<HTMLDivElement | undefined>();
    const conversion: React.RefObject<HTMLParagraphElement> = useRef() as any;

    const { convert, rates } = useLive();

    useEffect(() => {
        if (processing) return;
        let changedValue = isFrom ? raw.amount : raw.toAmount, toCard = isFrom ? account2 : account;
        let temp = changedValue;
        //----------
        if (changedValue === -1) changedValue = value || 0;
        const usd = convert(wallet.curr.code, 'USD', changedValue || 0, 2);
        let actualValue = changedValue;
        ///==---
        if (temp > -1) {
            actualValue = convert(toCard.curr.code, wallet.curr.code, changedValue);
            setValue(actualValue);
        };

        isFrom ? setAmount(actualValue) : setToAmount(actualValue);
        //
        if (isFrom && toAmount > 0) {
            if (actualValue < min) setMessage(`Minimum amount is ${min}`)
            if (actualValue > max) setMessage(`Maximum is ${max}`);
            if (actualValue > balance) setMessage('Exceeds balance');
        }
        //-------
        if (conversion.current) conversion.current.innerText = `\$${usd > 0 ? usd : '0.00'}`;
        //----
    }, [rates, raw])

    const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const msg = onChange?.(e, setMessage);

        if (msg?.error) setMessage(msg.error);

        let value = parseFloat(e.target.value);
        //---
        setLastFocused(wallet);
        //@ts-ignore
        setValue(value || '');
        //-------
        if (!isFrom) {
            setRaw({
                amount: value || 0,
                toAmount: -1
            });
        } else {
            setRaw({
                amount: -1,
                toAmount: value || 0
            });
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
                    <input value={value} placeholder='0' onChange={changeEvent} onBlur={() => ref.current?.classList.remove(styles.focused)} onFocus={() => { ref.current?.classList.add(styles.focused) }} type="number" />
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
                                    <>
                                        <TbArrowsExchange />
                                        <Title noPad sm ref={conversion}>$0.00</Title>
                                    </>
                                ), (
                                    <Title noPad sm>
                                        Market Price:
                                        <Title noPad sm ref={conversion}> </Title>
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
                            <div className="flex flex-col">
                                <Title md medium noPad className='gap-1'>
                                    When 1 <b>{account2.curr.code}</b> is worth
                                </Title>
                                <TradeInput
                                    wallet={account}
                                    balance={account.all_balance.available}
                                    isLimit
                                    elementRef={ref}
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

export type TradeChangeEvent = (event: React.ChangeEvent<HTMLInputElement>, setError: (msg: string) => void) => { error?: string } | void | undefined;
