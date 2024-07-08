import { showIf, cutArr, getDate } from "@assets/fn";
import Cardheader from "@components/Card/Cardheader";
import Card from "@components/Card";
import CryptoIcon from "@components/CryptoIcon";
import { Title } from "@components/Trade";
import { Transactions } from "@typings/index";
import NoData from "@widgets/NoData";
import { classNames } from "primereact/utils";
import React from 'react';
import { FaChevronRight } from "react-icons/fa";
import Button from "@components/Button";
import dashboard from '@styles/pages/dashboard.module.scss';

const HistorySection: React.FC<HistorySectionProps> = ({ transactions }) => {
    //--- code here ---- //
    return (
        <section>
            <Card className={classNames(dashboard.history, '!rounded-lg')}>
                <Cardheader variant='title'>
                    <>Recent Transactions</>
                    <div className='flex gap-4'>
                        <div>
                            <Button
                                className='shadow-inner'
                                icon={<FaChevronRight />}
                                iconLoc='right'
                                size='normal'
                                variant='none'
                            // bgColor='theme'
                            // color='black'
                            >See All</Button>
                        </div>
                    </div>
                </Cardheader>
                {showIf(transactions.length > 1, <History transactions={transactions} />, (
                    <NoData>
                        <>No Transaction Data Found</>
                        <>Your latest transactions or activities will be displayed here</>
                        <Button size='normal'>Make a deposit</Button>
                    </NoData>
                ))}
            </Card>
        </section>
    );
}

interface HistorySectionProps {
    transactions: Transactions
}

export default HistorySection

export const History: React.FC<HistoryProps> = ({ transactions }) => {
    //--- code here ---- //
    function formatDate(date: string, rd: boolean = false) {
        const d = getDate(date)
        return (
            <>
                <Title bright noPad>{rd ? (() => {
                    let date = d.date;
                    return date.split(' ').slice(1, -1).join(' ')
                })() : d.date}</Title>
                <Title bright noPad sm>{d.time}</Title>
            </>
        )
    }
    return (
        <div>
            <table>
                <tbody>
                    {transactions.map(item => {
                        return <tr key={item.id}>
                            <td>
                                <div className="flex gap-2">
                                    <CryptoIcon size="13px" height='30px' width='30px' label={item.currency.symbol} name={item.currency.curr_name} />
                                    <Title bold brighter noPad>{item.currency.code}</Title>
                                </div>
                            </td>

                            <td>
                                <div>{formatDate(item.created_at)}</div>
                            </td>
                            <td>
                                <Title>{item.details}</Title>
                            </td>
                            <td>
                                <Title>{item.amount}</Title>
                            </td>
                            <td>
                                <Title className={classNames({
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
                    return <div key={item.id} className="flex py-2 justify-between">
                        <div className="flex gap-2 items-center">
                            <CryptoIcon
                                name={item.currency.curr_name}
                                height="30px"
                                width="30px"
                                label={item.currency.symbol}
                                size="13px"
                            />
                            <div>
                                <Title noPad>
                                    {item.details}
                                </Title>
                                <div className="flex gap-1">
                                    {formatDate(item.updated_at || item.created_at, true)}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            {item.type}
                            <Title noPad>
                                {item.amount}
                            </Title>
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
}

interface HistoryProps {
    transactions: Transactions
}
