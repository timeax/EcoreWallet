import { ColorNames, create } from '@assets/fn/create-color';
import IconButton from '@components/Button/IconButton';
import Card from '@components/Card';
import Cardheader from '@components/Card/Cardheader';
import { routeById } from '@routes/index';
import { Transactions, Wallet } from '@typings/index';
import React, { useEffect, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import dashboard from '@styles/pages/dashboard.module.scss';
import { GoArrowDownLeft, GoArrowUpRight } from 'react-icons/go';
import Tag from '@components/index';
import { Container, Title } from '@components/Trade';
import { GiCoins } from 'react-icons/gi';
import { MdPendingActions } from 'react-icons/md';
import { PiHandCoinsBold } from 'react-icons/pi';
import Button from '@components/Button';
import calc from 'number-precision';
import { MarketData, useLive } from '@context/LiveContext';
import CurrencyFormat from 'react-currency-format';

const WalletSummary: React.FC<WalletSummaryProps> = ({ history, wallet }) => {
    //--- code here ---- //
    let transactions = history.filter(item => item.currency_id == wallet.curr.id);
    const { convert, marketData, currency } = useLive();
    const [data, setData] = useState<MarketData>();
    //@ts-ignore
    let totalIn = transactions.length > 0 ? transactions.reduce((p, c) => {
        if (c.type === '+') {
            return {
                amount: calc.plus(p.amount, c.amount, c.charge),
            }
        } else return p;
    }) : { amount: 0 };
    //@ts-ignore
    let totalOut = transactions.length > 0 ? transactions.reduce((p, c) => {
        if (c.type === '-') {
            return {
                amount: calc.plus(p.amount, c.amount, c.charge),
            }
        } else return p;
    }) : { amount: 0 };

    useEffect(() => {
        if (marketData) {
            let value = marketData.find(item => item.id == wallet.curr.id)
            if (value) {
                setData(value)
            }
        }
    }, [marketData])

    const total = calc.plus(totalIn.amount, totalOut.amount)

    return (
        <section>
            <Card className='!bg-transparent' container='!px-0 !py-0'>
                <Cardheader variant='title'>
                    <>Wallet Summary</>
                    <IconButton href={route(routeById('wallets').route)}><FaChevronRight /></IconButton>
                </Cardheader>
                <div className="flex gap-6">
                    <Flow type='out' curr={wallet.curr.code} total={total} text='Outcome' value={totalOut.amount} />
                    <Flow type='in' curr={wallet.curr.code} total={total} text='Income' color={create('primary')} value={totalIn.amount} />
                </div>

                <div className='flex gap-2 mt-8'>
                    <Total
                        symbol={currency?.symbol}
                        data={data}
                        icon={<GiCoins />}
                        change='+20%'
                        color='primary'
                        label='Total'
                        value={convert(wallet.curr.code, currency?.code || 'USD', wallet.all_balance.total, 2)}
                    />

                    <Total
                        symbol={currency?.symbol}
                        data={data}
                        icon={<PiHandCoinsBold />}
                        change='+20%'
                        color='success'
                        label='Available'
                        value={convert(wallet.curr.code, currency?.code || 'USD', wallet.all_balance.available, 2)}
                    />

                    <Total
                        symbol={currency?.symbol}
                        data={data}
                        icon={<MdPendingActions />}
                        change='+20%'
                        color='warning'
                        label='Pending'
                        value={convert(wallet.curr.code, currency?.code || 'USD', wallet.all_balance.escrow, 2)}
                    />
                </div>

                <div className="flex mt-6">
                    <Button>Deposit {wallet.curr.code}</Button>
                    <Button variant='none'>Withdraw {wallet.curr.code}</Button>
                </div>
            </Card>
        </section>
    );
}



export const Total: React.FC<TotalProps> = ({ icon, label, value, color = 'theme', data, symbol = '$' }) => {
    //--- code here ---- //
    return (
        <Card className='w-[33%] shadow-2xl !rounded-xl shadow-black/5 overflow-hidden text-ellipsis' container='!px-4'>
            <div className='flex flex-col gap-4'>
                <div className='flex'>
                    <IconButton
                        className='!p-3 mr-auto rounded-xl !text-white'
                        size='20px'
                        // shape='circle'
                        variant='contained'
                        bgColor={color}>{icon}</IconButton>
                </div>
                <div className='flex flex-col gap-1'>
                    <Title noPad bold>{label}</Title>
                    <Title className='text-ellipsis overflow-clip relative' noPad xl>{symbol} <CurrencyFormat
                        value={value}
                        displayType="text"
                        thousandSeparator
                        renderText={value => <span>{value}</span>}
                    /></Title>
                    <Title noPad sm>{calc.round(data?.data.price_change_percentage_24h || '0', 2)}%</Title>
                </div>
            </div>
        </Card>
    );
}

interface TotalProps {
    value: string | number;
    label: string;
    icon: React.ReactNode;
    change: string;
    color: ColorNames;
    data?: MarketData;
    symbol?: string
}


const Flow = ({ text, total, curr, value, type, color = create('warning') }: any) => {
    return (
        <Container className='grow !rounded-lg shadow-2xl shadow-theme-text/10   py-2 px-1'>
            <div className='flex items-center'>
                <Tag sx={{
                    // border: '1px solid #000'
                    '--w': '55px',
                    '--c': color,
                    '--b': '5px',
                    overflow: 'hidden',
                    '--p': calc.times(calc.divide(value, total), 100),
                    borderRadius: '50%',
                    boxShadow: '0px 1rem 1rem 2px rgb(200 163 97 / 14%)'
                }} className={dashboard.pie}>
                    {/* <div className="absolute h-full w-full z-10 bg-white"></div> */}
                    <div className='flex m-auto size-[90%] rounded-full items-center justify-center bg-warning-50/10'>
                        {type == 'in' ? <GoArrowDownLeft /> : <GoArrowUpRight />}
                    </div>
                </Tag>
                <div>
                    <Title medium md className='!text-theme-button-hover'>{text}</Title>
                    <Title medium md className=''>{calc.round(value, 2)} {curr}</Title>
                </div>
            </div>
        </Container>
    )
}


interface WalletSummaryProps {
    wallet: Wallet
    history: Transactions
}

export default WalletSummary
