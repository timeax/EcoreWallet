
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
import { Button } from 'primereact/button';
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
        return value.toLocaleDateString(undefined, {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
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

    const renderHeader = () => {
        return (
            <div className="flex flex-wrap gap-2 justify-content-between align-items-center">
                <h4 className="m-0">Customers</h4>
                <IconField iconPosition="left">
                    <InputIcon className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </IconField>
            </div>
        );
    };

    const countryBodyTemplate = (rowData: Transaction) => {
        return (
            <div className="flex align-items-center gap-2">
                <span>{rowData.type == '+' ? 'Money In' : 'Money Out'}</span>
            </div>
        );
    };

    const dateBodyTemplate = (rowData: Transaction) => {
        return formatDate(rowData.updated_at);
    };

    const walletTemplate = (options: Transaction) => {
        const size = '3rem';
        return (
            <div className='flex items-center gap-2'>
                <CryptoIcon width={size} height={size} name={options.currency.curr_name} size='14px' label={options.currency.symbol} />
                <div className='flex flex-col'>
                    <Text variant={'other'} className='font-bold text-[10px]'>{options.currency.code}</Text>
                    <Text variant={'other'} className='text-[14px]'>{options.currency.curr_name}</Text>
                </div>
            </div>
        )
    };

    const balanceBodyTemplate = (rowData: Transaction) => {
        return formatCurrency(parseFloat(rowData.amount) + parseFloat(rowData.charge));
    };

    const statusBodyTemplate = (rowData: Transaction) => {
        return <Tag value={rowData.status || 'Successful'} severity={getSeverity(rowData.status || 'success')} />;
    };

    const filterTemplate = () => {
        return <div>

        </div>
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            title='transaction history'
            pusher={true}
            header={[
                {
                    label: 'Transactions',
                    template(item, options) {
                        return <Link href={route('user.dashboard')}>{item.label}</Link>
                    },
                }
            ]}
        >
            <section>
                <Toolbar start={<>
                    <Button>Export</Button>
                </>}>
                </Toolbar>
                <Card className='!rounded-none' container='!py-2'>
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
                </Card>
            </section>

        </AuthenticatedLayout>
    );
}

interface HistoryProps extends PageProps {
    transactions: Transactions
}

export default History
