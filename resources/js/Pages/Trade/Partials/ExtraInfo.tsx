import React, { } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import styles from '@styles/pages/wallets/info.module.scss';
import WalletChart from './Chart';
import { PiEmpty } from "react-icons/pi";
import NoData from '@widgets/NoData';
import Card from '@components/Card';
import { Transaction, Transactions, Wallet } from '@typings/index';
import { getDate, showIf } from '@assets/fn';
import { classNames } from 'primereact/utils';
import { Title } from '@components/Trade';
import useTransaction, { Status } from '@context/TransactionDetail';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import css from '@styles/pages/transactions.module.scss'
import CurrencyFormat from 'react-currency-format';
import calc from 'number-precision';
import { styles as tableStyles } from '@assets/theme/transaction';
import { TransactionIcon } from '@pages/Dashboard/Partials/HistorySection';
const ExtraInfo: React.FC<ExtraInfoProps> = ({ wallet }) => {
    //--- code here ---- //
    const history = (wallet?.transactions?.filter(item => {
        item.updated_at = new Date(item.updated_at || item.created_at);
        return item.currency_id === wallet?.crypto_id
    }) || []).reverse();

    return (
        <Card className={styles.main}>
            <TabView className={styles.view}>
                <TabPanel headerClassName={styles.tab} contentClassName={styles.content} header="Overview">
                    <WalletChart wallet={wallet} />
                </TabPanel>

                <TabPanel contentClassName={styles.content} headerClassName={styles.tab} header="Transactions">
                    {showIf(history.length > 0, (<History history={history} />), (
                        <NoData icon={<PiEmpty />}>
                            <>No Transaction activities yet</>
                            <>When you make a transaction, your
                                activities would appear here.</>
                        </NoData>
                    ))}
                </TabPanel>
            </TabView>
        </Card>
    );
}



const History: React.FC<HistoryProps> = ({ history }) => {
    //--- code here ---- //
    const setData = useTransaction();
    return (
        <>
            {showIf(history.length > 0, <DataTable value={history} pt={tableStyles} paginator rows={5}
                //@ts-ignore
                onRowClick={e => { setData({ data: e.data }) }}
                showHeaders={false}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                rowsPerPageOptions={[10, 25, 50]} dataKey="id"
                emptyMessage="No Transactions Found." currentPageReportTemplate="{last} of {totalRecords} entries">
                <Column field="remark" header="Type" className='capitalize' body={typeBodyTemplate} />
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


function date(value: any) {
    return getDate(value).date
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





const Pill: React.FC<PillPropsProps> = ({ value, className }) => {
    //--- code here ---- //
    value = value.toLowerCase();
    return (
        <>
            <div className={classNames(className, {
                'bg-primary-400 text-white capitalize': value.includes('success')
            })}>{value}</div>
        </>
    );
}

interface PillPropsProps {
    value: string;
    className?: string;
}


interface HistoryProps {
    history: Transactions
}


interface ExtraInfoProps {
    wallet?: Wallet;
}

export default ExtraInfo
