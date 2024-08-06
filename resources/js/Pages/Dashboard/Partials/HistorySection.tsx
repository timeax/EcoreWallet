import { showIf, getDate } from "@assets/fn";
import Cardheader from "@components/Card/Cardheader";
import Card, { UICard, UICHeader } from "@components/Card";
import CryptoIcon from "@components/CryptoIcon";
import { Title } from "@components/Trade";
import { Currencies, Transactions } from "@typings/index";
import NoData from "@widgets/NoData";
import { classNames } from "primereact/utils";
import React from 'react';
import Button from "@components/Button";
import dashboard from '@styles/pages/dashboard.module.scss';
import { Link } from "@inertiajs/react";
import { routeById } from "@routes/index";
import CurrencyFormat from 'react-currency-format';
import calc from 'number-precision';
import { TbArrowCurveRight } from "react-icons/tb";
import { color, ColorNames } from "@assets/fn/create-color";
import { BsCurrencyExchange } from "react-icons/bs";
import { BiTransfer } from "react-icons/bi";
import { LiaLongArrowAltDownSolid } from "react-icons/lia";
import useTransaction, { Status } from "@context/TransactionDetail";

const HistorySection: React.FC<HistorySectionProps> = ({ transactions }) => {
    //--- code here ---- //
    return (
        <section>
            <UICard header={
                <UICHeader lg title={'Recent Transactions'}>
                    <Title noPad normal md bright>
                        <Link href={route(routeById('history').route)}>See all</Link>
                    </Title>
                </UICHeader>
            } className={dashboard.history}>
                {showIf(transactions.length > 0, <History transactions={transactions} />, (
                    <NoData>
                        <>No Transaction Data Found</>
                        <>Your latest transactions or activities will be displayed here</>
                        <Button href={route(routeById('fund').route)} shape="pill" size='normal'>Make a deposit</Button>
                    </NoData>
                ))}
            </UICard>
        </section>
    );
}

interface HistorySectionProps {
    transactions: Transactions
}

export default HistorySection

export const History: React.FC<HistoryProps> = ({ transactions }) => {
    //--- code here ---- //
    const show = useTransaction();
    function formatDate(date: string, rd: boolean = false) {
        const d = getDate(date)
        return (
            <>
                <Title bright noPad xs>{d.time}</Title>
                <Title bright noPad>{rd ? (() => {
                    let date = d.date;
                    return date.split(' ').slice(1, -1).join(' ')
                })() : d.date}</Title>
            </>
        )
    }
    return (
        <div>
            <table>
                <tbody>
                    {transactions.map(item => {
                        return <tr key={item.id} onClick={() => show({ data: item })}>
                            <td>
                                <div className="flex gap-2">
                                    <CryptoIcon size="13px" height='30px' width='30px' curr={item.currency} />
                                    <Title bold brighter noPad>{item.currency.code}</Title>
                                </div>
                            </td>

                            <td>
                                <div>{formatDate(item.created_at)}</div>
                            </td>
                            <td>
                                <Title noPad>{item.details}</Title>
                            </td>
                            <td>
                                <Title noPad>
                                    <CurrencyFormat
                                        value={item.amount}
                                        displayType="text"
                                        thousandSeparator
                                        renderText={value => <span>{value}</span>}
                                    />
                                </Title>
                            </td>
                            <td>
                                <Title noPad className={classNames({
                                    '!text-success': (item.status == 'success') || item.status == '',
                                    '!text-warning': item.status == 'pending',
                                    '!text-danger': item.status == 'failed',
                                })}>{item.status || 'success'}</Title>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>

            <div className={dashboard.history_mobile}>
                {transactions.map(item => {
                    return <div key={item.id} className={classNames("flex py-2 justify-between", dashboard.history_item)} onClick={() => show({ data: item })}>
                        <div className="flex gap-2 items-center">
                            {/* <CryptoIcon
                                name={item.currency.curr_name}
                                height="30px"
                                width="30px"
                                label={item.currency.symbol}
                                size="13px"
                            /> */}
                            {/* @ts-ignore */}
                            <TransactionIcon type={item.remark.toLowerCase()} />
                            <div>
                                <Title noPad>
                                    {item.remark}
                                </Title>
                                <div className="flex gap-1">
                                    {formatDate(item.updated_at || item.created_at, true)}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-end">
                            <div className="flex items-center">
                                {item.type}
                                <Title noPad className="flex gap-1">
                                    <CurrencyFormat
                                        value={calc.round(item.amount, 8)}
                                        displayType="text"
                                        thousandSeparator
                                        renderText={value => <span>{value}</span>}
                                    />
                                    {item.currency.code}
                                </Title>
                            </div>
                            <Status textProps={{
                                className: 'items-center !font-light !text-[.6em]'
                            }} stats={item.status} value={item.status} />
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
}


export const TransactionIcon: React.FC<TransactionIconProps> = ({ type, curr, className }) => {
    //--- code here ---- //
    const icon = type === 'deposit'
        ? <LiaLongArrowAltDownSolid />
        : type === 'exchange'
            ? <BsCurrencyExchange />
            : type == 'withdraw'
                ? <TbArrowCurveRight />
                : <BiTransfer />;
    const background: ColorNames = type === 'deposit'
        ? 'success'
        : type === 'exchange'
            ? 'primary'
            : type == 'withdraw'
                ? 'warning'
                : 'info';

    const cl = color('background')(background, { normal: 300 });
    return (
        <div style={{ color: cl.color }} className={classNames(dashboard.transaction_icon, className)}>
            {icon}

            {showIf(curr, (
                <div data-section='crypto-icon'>
                    <CryptoIcon curr={curr} width="12px" fit />
                </div>
            ))}
        </div>
    );
}

interface TransactionIconProps {
    type: 'deposit' | 'withdraw' | 'exchange' | 'transfer';
    curr?: Currencies[number];
    className?: string
}


interface HistoryProps {
    transactions: Transactions
}
