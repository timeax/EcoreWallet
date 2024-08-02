
import AuthenticatedLayout from '@layouts/AuthenticatedLayout';
import { Currencies, Deposits, Exchanges, PageProps, Transaction, Transactions, Transfer, Withdrawals } from '@typings/index';
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { styles } from '@assets/theme/transaction';
import CryptoIcon from '@components/CryptoIcon';
import { Title } from '@components/Trade';
import { Total } from '@pages/Dashboard/Partials/BalanceSummary';
import { TbTransactionDollar } from 'react-icons/tb';
import { TiStarFullOutline } from 'react-icons/ti';
import { MdError } from 'react-icons/md';
import Select from '@components/Trade/Select';
import { TransactionIcon } from '@pages/Dashboard/Partials/HistorySection';
import useTransaction, { Status, TransactionProvider } from '@context/TransactionDetail';
import css from '@styles/pages/transactions.module.scss'
import CurrencyFormat from 'react-currency-format';
import calc from 'number-precision';
import { classNames } from 'primereact/utils';
import { getDate, lower, showIf } from '@assets/fn';
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { OverlayPanel } from 'primereact/overlaypanel';
import { Calendar, DayRange, utils } from '@hassanmojab/react-modern-calendar-datepicker';
import NoData from '@widgets/NoData';

const History: React.FC<HistoryProps> = ({ auth, transactions, ...props }) => {
    //--- code here ---- //

    const [history, setHistory] = useState<Transactions>([]);

    const [selectedRange, setSelectedRange] = useState<DayRange>({ from: null, to: null });

    useEffect(() => {
        setHistory(getTransactions(transactions));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getTransactions = (data: Transactions): Transactions => {
        return [...(data || [])].map((d) => {
            d.updated_at = new Date(d.updated_at || d.created_at);
            return d;
        });
    };

    const filterStatus: Array<{ label: string, value: string }> = [
        {
            label: 'All Status',
            value: 'all'
        },
        {
            label: 'Successful',
            value: 'success'
        }, {
            label: 'Pending',
            value: 'pending'
        }, {
            label: 'Failed',
            value: 'failed'
        }, {
            label: 'Cancelled',
            value: 'canceled'
        }, {
            label: 'Refunded',
            value: 'refunded'
        },
    ]

    const [filters, setFilter] = useState<{
        status: string,
        category: string,
        date: 'all' | { from: number, to: number }
    }>({
        status: 'all',
        category: 'all',
        date: 'all'
    });

    const filterCategory: Array<{ label: string, value: string }> = [
        {
            label: 'All Category',
            value: 'all'
        },
        {
            label: 'Deposit',
            value: 'deposit'
        }, {
            label: 'Withdraw',
            value: 'withdraw'
        }, {
            label: 'Transfer',
            value: 'transfer'
        },

        {
            label: 'Exchange',
            value: 'exchange'
        }
    ];

    useEffect(() => {
        setData(history);
    }, [history]);

    useEffect(() => {
        setData(history.filter(item => {
            const { status, category, date } = filters;
            ///---
            const hasStatus = status == 'all' || lower(item.status).includes(filters.status);
            const hasCat = category == 'all' || lower(item.remark).includes(filters.category);
            const isDate = date == 'all' || (() => {
                const time = item.updated_at.getTime();
                return time <= date.to && time >= date.from
            })();
            //----
            return hasCat && hasStatus && isDate;
        }))
    }, [filters]);

    const calender = useRef<OverlayPanel>();
    const [data, setData] = useState<Transactions>([]);

    function getDateInstance(value: DayRange['from']) {
        return getDate(`${value?.year}-${value?.month}-${value?.day}`);
    }

    function formatDate(date: DayRange['from']) {
        const value = getDateInstance(date)
        if (value) return value.date;
        return `${date?.day}/${date?.month}/${date?.year}`
    }

    useEffect(() => {
        const date: 'all' | { from: number, to: number } = (() => {
            if (selectedRange.from && selectedRange.to) {
                return {
                    from: getDateInstance(selectedRange.from).miliseconds,
                    to: getDateInstance(selectedRange.to).miliseconds,
                }
            }

            return 'all';
        })();
        setFilter((filter) => ({ ...filter, date }))
    }, [selectedRange]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            title='Transactions'
            pusher={true}
            {...props}
            desc='Take a look at all you transactions'
        >
            <section className={classNames('mt-8 flex flex-col gap-4', css.history)}>
                <div className={classNames('flex mb-4 gap-6', css.totals)}>
                    <Total value={transactions.length} color='info' label='Total' change='' icon={<TbTransactionDollar />} />
                    <Total value={transactions.filter(item => item.status == 'success').length} color='success' label='Successful' change='' icon={<TiStarFullOutline />} />
                    <Total value={transactions.filter(item => item.status == 'pending').length} color='info' label='Pending' change='' icon={<TbTransactionDollar />} />
                    <Total value={transactions.filter(item => item.status == 'failed').length} color='warning' label='Failed' change='' icon={<MdError />} />
                </div>
                <div className='flex flex-col gap-3'>
                    <div className={classNames('flex pl-8 gap-4 justify-between items-center flex-wrap', css.filters)}>
                        <div className={css.filterContainer}>
                            <Select
                                unique='value'
                                contentTemplate={(e) => <Title noPad className='mr-4'>{e.label}</Title>}
                                value={filterStatus[0]}
                                menuItemTemplate={(e) => <Title>{e.label}</Title>}
                                items={filterStatus}
                                onSelect={(e) => setFilter((filter) => ({ ...filter, status: e.value.value }))}
                                quick
                                menuGap={16}
                                content='!w-fit'
                            />
                            <Select
                                unique='value'
                                contentTemplate={(e) => <Title className='mr-4'>{e.label}</Title>}
                                value={filterCategory[0]}
                                menuItemTemplate={(e) => <Title>{e.label}</Title>}
                                items={filterCategory}
                                quick
                                menuGap={16}
                                content='!w-fit'
                                onSelect={(e) => setFilter((filter) => ({ ...filter, category: e.value.value }))}
                            />
                        </div>
                        <div className={css.dateRangeLaptop}>
                            <Title noPad className='cursor-pointer gap-2' onClick={e => calender.current?.toggle(e)}>Sort by Date - {showIf(selectedRange.from && selectedRange.to, (
                                <div className='flex gap-2'>
                                    <span><b>From</b>: {formatDate(selectedRange.from)}</span>
                                    <span><b>To</b>: {formatDate(selectedRange.to)}</span>
                                </div>
                            ), 'All time')}</Title>
                            {/* @ts-ignore */}
                            <OverlayPanel ref={calender}>
                                <Calendar
                                    value={selectedRange}
                                    onChange={setSelectedRange}
                                    maximumDate={utils().getToday()}
                                    shouldHighlightWeekends
                                />
                            </OverlayPanel>
                        </div>
                    </div>

                </div>
                <TransactionProvider {...props}>
                    <Page history={data} />
                </TransactionProvider>
            </section>

        </AuthenticatedLayout>
    );
}

function date(value: any) {
    return value.toLocaleDateString(undefined, {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}
const formatDate = (value: Date) => {
    const time = value.toLocaleTimeString();

    return <Title noPad sm medium bright>{date(value)} {time}</Title>;
};

const formatCurrency = (value: any) => {
    return <CurrencyFormat
        displayType='text'
        thousandSeparator
        value={value}
        renderText={(e) => <Title noPad lg bright>{value} <span></span></Title>}
    />
};

const typeBodyTemplate = (rowData: Transaction) => {
    const date = getDate(rowData.updated_at);
    return (
        <div className="flex align-items-center gap-2">
            {/* @ts-ignore */}
            <TransactionIcon className={css.icon} type={rowData.remark} curr={rowData.currency} />
            <div>
                <Title noPad brighter lg medium>{rowData.remark}</Title>

                <Title className={css.showMd} noPad brighter xs>{date.date} {date.time}</Title>
            </div>
        </div>
    );
};

const dateBodyTemplate = (rowData: Transaction) => {
    return formatDate(rowData.updated_at);
};

const walletTemplate = (options: Transaction) => {
    const size = '1.5rem';
    return (
        <div className='flex items-center gap-2'>
            <CryptoIcon width={size} height={size} curr={options.currency} size='13px' label={options.currency.symbol} />
            <div className='flex flex-col'>
                <Title noPad bold>{options.currency.code}</Title>
                {/* <Title noPad sm>{options.currency.curr_name}</Title> */}
            </div>
        </div>
    )
};

const balanceBodyTemplate = (rowData: Transaction) => {
    return <div className={css.balance}>
        <Title noPad md brighter className='gap-1'>
            {rowData.type}{formatCurrency(calc.round(calc.plus(rowData.amount, rowData.charge), 4))}
            <span className={classNames(css.curr_code, css.showMd)}>
                {rowData.currency.code}
            </span>
        </Title>
        <span className={css.showSm}>
            <Status stats={rowData.status} value={rowData.status} textProps={{ xs: true }} />
        </span>
    </div>
};

const statusBodyTemplate = (rowData: Transaction) => {
    return <Title noPad>
        <Status stats={rowData.status} value={rowData.status} />
    </Title>
};


const Page: React.FC<PageProp> = ({ history }) => {
    //--- code here ---- //
    const setData = useTransaction();
    return (
        <>
            {showIf(history.length > 0, <DataTable value={history} pt={styles} paginator rows={10}
                //@ts-ignore
                onRowClick={e => { setData({ data: e.data }) }}
                showHeaders={false}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[10, 25, 50]} dataKey="id"
                emptyMessage="No Transactions Found." currentPageReportTemplate="{last} of {totalRecords} entries">
                <Column field="remark" header="Type" className='capitalize' body={typeBodyTemplate} />
                <Column className={css.hideMd} headerClassName={css.hideMd} field="currency.code" header="Wallet" body={walletTemplate} />
                <Column field="date" headerClassName={css.hideMd} className={css.hideMd} header="Date" dataType="date" body={dateBodyTemplate} />
                <Column field="balance" header="Amount" dataType="numeric" body={balanceBodyTemplate} />
                <Column headerClassName={css.hideSm} className={css.hideSm} field="status" header="Status" filterMenuStyle={{ width: '14rem' }} body={statusBodyTemplate} />
            </DataTable>, <NoData>
                <>Could not find any transactions</>
                <>All transactions will be displayed here...</>
            </NoData>)}
        </>
    );
}

interface PageProp {
    history: Transactions;
}


interface HistoryProps extends PageProps {
    transactions: Transactions;
    deposits: Deposits;
    withdrawals: Withdrawals;
    exchanges: Exchanges;
    currencies: Currencies;
    transfers: Transfer[]
}

export default History
