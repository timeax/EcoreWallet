
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@layouts/AuthenticatedLayout';
import { PageProps, Transaction, Transactions } from '@typings/index';
import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
import { Dropdown } from 'primereact/dropdown';
import { InputNumber } from 'primereact/inputnumber';
import { ProgressBar } from 'primereact/progressbar';
import { Calendar } from 'primereact/calendar';
import { MultiSelect } from 'primereact/multiselect';
import { Slider } from 'primereact/slider';
import { Tag } from 'primereact/tag';
import { CustomerService } from '../../Service/CustomerService';
import Card from '@components/Card';
import { Toolbar } from 'primereact/toolbar';
import { styles } from '@assets/theme/transaction';
import CryptoIcon from '@components/CryptoIcon';
import Text from '@components/Text';
import { Container, Title } from '@components/Trade';
import Button from '@components/Button';
import { FaFilter } from 'react-icons/fa';
import { Total } from '@pages/Dashboard/Partials/BalanceSummary';
import { TbTransactionDollar } from 'react-icons/tb';
import { TiStarFullOutline } from 'react-icons/ti';
import { MdError } from 'react-icons/md';
import Select from '@components/Trade/Select';
const History: React.FC<HistoryProps> = ({ auth, transactions }) => {
    //--- code here ---- //

    const [history, setHistory] = useState<Transactions>([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
        name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        representative: { value: null, matchMode: FilterMatchMode.IN },
        date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
        balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        activity: { value: null, matchMode: FilterMatchMode.BETWEEN }
    });
    const [globalFilterValue, setGlobalFilterValue] = useState('');

    const [statuses] = useState(['unqualified', 'qualified', 'new', 'negotiation', 'renewal']);

    const getSeverity = (status: string) => {
        switch (status) {
            case 'pending':
                return 'warning';

            case 'success':
                return 'success';
        }
    };

    useEffect(() => {
        setHistory(getTransactions(transactions));
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const getTransactions = (data: Transactions): Transactions => {
        return [...(data || [])].map((d) => {
            d.updated_at = new Date(d.updated_at || d.created_at);
            return d;
        });
    };

    const formatDate = (value: Date) => {
        return <Title lg brighter>{value.toLocaleDateString(undefined, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })}</Title>;
    };

    const formatCurrency = (value: any) => {
        value += '';
        return parseFloat(value).toFixed(8)
    };

    const onGlobalFilterChange = (e: any) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };


    const countryBodyTemplate = (rowData: Transaction) => {
        return (
            <div className="flex align-items-center gap-2">
                <Title brighter lg medium>{rowData.type == '+' ? 'Money In' : 'Money Out'}</Title>
            </div>
        );
    };

    const dateBodyTemplate = (rowData: Transaction) => {
        return formatDate(rowData.updated_at);
    };

    const walletTemplate = (options: Transaction) => {
        const size = '2rem';
        return (
            <div className='flex items-center gap-2'>
                <CryptoIcon width={size} height={size} name={options.currency.curr_name} size='13px' label={options.currency.symbol} />
                <div className='flex flex-col'>
                    <Title noPad bold lg>{options.currency.code}</Title>
                    <Title noPad sm>{options.currency.curr_name}</Title>
                </div>
            </div>
        )
    };

    const balanceBodyTemplate = (rowData: Transaction) => {
        return <Title lg brighter>{formatCurrency(parseFloat(rowData.amount) + parseFloat(rowData.charge))}</Title>;
    };

    const statusBodyTemplate = (rowData: Transaction) => {
        return <Tag value={rowData.status || 'Successful'} severity={getSeverity(rowData.status || 'success')} />;
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

    const filterCategory: Array<{ label: string, value: string }> = [
        {
            label: 'All Categories',
            value: 'all'
        },
        {
            label: 'Deposit',
            value: 'success'
        }, {
            label: 'Withdraw',
            value: 'withdraw'
        }, {
            label: 'Transfer',
            value: 'transfer'
        }
    ]

    return (
        <AuthenticatedLayout
            user={auth.user}
            title='transaction history'
            pusher={true}
            desc='Take a look at all you transactions'
        >
            <section className='mt-8 flex flex-col gap-6'>
                <div className='flex mb-4 gap-6'>
                    <Total value={transactions.length} color='info' label='Total' change='' icon={<TbTransactionDollar />} />
                    <Total value={transactions.filter(item => item.status == 'success').length} color='success' label='Successful' change='' icon={<TiStarFullOutline />} />
                    <Total value={transactions.filter(item => item.status == 'pending').length} color='info' label='Pending' change='' icon={<TbTransactionDollar />} />
                    <Total value={transactions.filter(item => item.status == 'failed').length} color='warning' label='Failed' change='' icon={<MdError />} />
                </div>
                <div className='flex gap-4 items-center'>
                    <Select
                        unique='value'
                        contentTemplate={(e) => <Title className='mr-4'>{e.label}</Title>}
                        value={filterStatus[0]}
                        menuItemTemplate={(e) => <Title>{e.label}</Title>}
                        items={filterStatus}
                        quick
                     />
                    <Select
                        unique='value'
                        contentTemplate={(e) => <Title className='mr-4'>{e.label}</Title>}
                        value={filterCategory[0]}
                        menuItemTemplate={(e) => <Title>{e.label}</Title>}
                        items={filterCategory}
                        quick
                    />
                    <div>
                        <Title>Sort by Date</Title>
                    </div>
                    <Button className='ml-auto'>Export</Button>
                </div>
                <DataTable value={history} pt={styles} paginator rows={10}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    rowsPerPageOptions={[10, 25, 50]} dataKey="id"
                    filters={filters} filterDisplay="menu" globalFilterFields={['name', 'country.name', 'representative.name', 'balance', 'status']}
                    emptyMessage="No Transactions Found." currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries">
                    <Column field="currency.code" header="Wallet" body={walletTemplate} />
                    <Column field="remark" header="Type" className='capitalize' />
                    <Column field="country.name" header="Flow" body={countryBodyTemplate} />
                    <Column field="date" header="Date" dataType="date" body={dateBodyTemplate} />
                    <Column field="balance" header="Amount" dataType="numeric" body={balanceBodyTemplate} />
                    <Column field="status" header="Status" filterMenuStyle={{ width: '14rem' }} body={statusBodyTemplate} />
                </DataTable>
            </section>

        </AuthenticatedLayout>
    );
}

interface HistoryProps extends PageProps {
    transactions: Transactions
}

export default History
