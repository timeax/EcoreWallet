import { getDate, showIf } from "@assets/fn";
import Button from "@components/Button";
import { Title } from "@components/Trade";
import { Currencies, Deposits, Exchanges, Transactions, type Transfer, Withdrawals } from "@typings/index";
import { Sidebar } from "primereact/sidebar";
import { classNames } from "primereact/utils";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { FaCopy, FaLink, FaLongArrowAltRight } from "react-icons/fa";
import Truncate from 'react-truncate';
import { useNotify } from "./AuthenticatedContext";
//@ts-ignore
const TransactionContext = createContext<TransactionContextProps>({});

interface TransactionContextProps {
    setData(value: TransactionData | Nothing): void;
}

interface TransactionData {
    data?: Transaction;
    view?(props: Transaction): React.FC<Transaction>;
}


type Transaction = Transactions[number] & {
    deposit?: Deposits[number]
    withdrawals?: Withdrawals[number]
    exchanges?: Exchanges[number]
    currency?: Currencies[number];
    transfers?: Transfer
};

export default function useTransaction() {
    return useContext(TransactionContext).setData;
}

function getType(data?: Transaction) {
    if (data) {
        const value = data?.details?.toLowerCase() || '';
        if (value) {
            if (value.includes('deposit')) return 'Deposit'
            if (value.includes('exchange')) return 'Exchange'
            if (value.includes('withdraw')) return 'Withdraw'
            if (value.includes('transfer')) return 'Transfer'
        }
    }
    return 'Transaction'
}

export const TransactionProvider: React.FC<TransactionProviderProps> = ({ children, ...props }) => {
    //--- code here ---- //
    const [data, setData] = useState<TransactionData | Nothing>();

    const header = (
        <Title noPad xl medium>
            {getType(data?.data)} details
        </Title>
    );


    const view = (data: TransactionData) => {
        if (data) {
            const value = data?.data?.details?.toLowerCase() || '';
            //---
            if (value.includes('deposit')) return Deposit(data);
            if (value.includes('exchange')) return Exchange(data);
            if (value.includes('withdraw')) return Withdraw(data);
            if (value.includes('transfer')) return Transfers(data);
        }
    }

    return (
        <TransactionContext.Provider value={{
            ...props,
            setData: (value = null) => {
                if (value && value.data) {
                    const transaction = value.data;
                    const id = transaction.currency_id;
                    //------
                    transaction.currency = props.currencies.find(item => item.id == value.data?.currency_id) as Currencies[number];
                    //---------------
                    switch (getType(value.data)) {
                        case 'Deposit':
                            transaction.deposit = props.deposits.find(item => item.cryptomus_uuid === transaction?.ref)
                            break;
                        case "Exchange":
                            transaction.exchanges = props.exchanges.find(item => {
                                const match = item.transaction_id === transaction.trnx;
                                return match && ((transaction.type === '+' && item.to == id)
                                    || (transaction.type == '-' && item.from == id));
                            });
                            break;
                        case "Withdraw":
                            transaction.withdrawals = props.withdrawals.find(item => item.trx == transaction.ref);
                        case "Transfer":
                            transaction.transfers = props.transfers.find(item => item.transaction_ref == transaction.ref);
                        case "Transaction": {
                            break;
                        }
                    }
                }

                //--------
                setData(value)
            }
        }}>
            <Sidebar position="right" header={header} visible={!!data} onHide={() => setData(null)}>
                {view(data as any)}
            </Sidebar>
            {children}
        </TransactionContext.Provider >
    );
}

function display(keys: any[], data: TransactionData) {
    return <div className="mt-4 px-1">
        {keys.map(item => {
            return (
                <div key={item.name} className="flex items-center py-1.5">
                    <Title md noPad light bright>{item.name}</Title>
                    <div className="flex justify-end grow">
                        {/* @ts-ignore */}
                        {showIf(item.render, item.render?.(data.data?.[item.key]), <Title>{data.data?.[item.key]}</Title>)}
                    </div>
                </div>
            )
        })}
    </div>
}

const withdrawals: Array<{
    key: keyof Transaction;
    name: string,
    render?(value?: any): React.ReactNode
}> = [
        {
            name: 'Status',
            key: 'status',
            render(value) {
                return <Status stats={value} value={value} />
            },
        },

        {
            name: 'Date',
            key: 'updated_at',
            render(value) {
                const date = getDate(value);

                return <Title className="flex items-center gap-2"><span>{date.localTime}</span> {date.time}</Title>
            },
        },

        {
            name: 'Coin',
            key: 'currency',
            render(value: Currencies[number]) {
                return <Title noPad light>{value.code}</Title>
            },
        },

        {
            name: 'Withdraw amount',
            key: 'amount'
        },

        {
            name: 'Network',
            key: 'withdrawals',
            render(value) {
                return <Title>{value?.network}</Title>
            },
        },

        {
            name: 'Fees',
            key: 'charge',
            render(value) {
                if (value <= 0) return <Title noPad>No Fees</Title>
                return <Title noPad>{value}</Title>
            },
        },

        {
            name: 'Ref',
            key: 'ref',
            render(value) {
                return <Copy value={value} />
            },
        },

        {
            name: 'TxID',
            key: 'trnx',
            render(value) {
                return <Copy value={value} />
            },
        }
    ];
const Withdraw = (data: TransactionData) => {
    return (
        <>
            {/* <div>
                Tree
            </div> */}
            {display(withdrawals, data)}
        </>
    )
}

const transfers: Array<{
    key: keyof Transaction;
    name: string,
    render?(value?: any): React.ReactNode
}> = [
        {
            key: 'status',
            name: 'Status',
            render(value) {
                return <Status stats={value} value={value} />
            },
        },

        {
            name: 'Date',
            key: 'updated_at',
            render(value) {
                const date = getDate(value);
                return <Title className="flex items-center gap-2"><span>{date.localTime}</span> {date.time}</Title>
            },
        },

        {
            key: 'amount',
            name: 'Amount'
        },

        {
            key: 'currency',
            name: 'Coin',
            render(value) {
                return <Title noPad>{value.code}</Title>
            },
        },

        {
            name: 'Transaction Fees',
            key: 'charge',
            render(value) {
                if (value <= 0) return <Title noPad>No Fees</Title>
                return <Title noPad>{value}</Title>
            },
        },

        {
            name: 'Transaction ID',
            key: 'trnx',
            render(value) {
                return <Copy value={value} />
            },
        },

        {
            name: 'Ref',
            key: 'ref',
            render(value) {
                return <Copy value={value.transaction_id} />
            },
        }
    ];


const Transfers = (data: TransactionData) => {
    return display(transfers, data);
}

const exchangeKeys: Array<{
    key: keyof Transaction;
    name: string,
    render?(value?: any): React.ReactNode
}> = [
        {
            key: 'status',
            name: 'Status',
            render(value) {
                return <Status stats={value} value={value} />
            },
        },

        {
            key: 'exchanges',
            name: 'Exchange Type',
            render(value) {
                return <Title noPad>{value.type}</Title>
            },
        },

        {
            name: 'Date',
            key: 'updated_at',
            render(value) {
                const date = getDate(value);
                return <Title className="flex items-center gap-2"><span>{date.localTime}</span> {date.time}</Title>
            },
        },

        {
            key: 'amount',
            name: 'Exchange Amount'
        },

        {
            key: 'currency',
            name: 'Coin',
            render(value) {
                return <Title noPad>{value.code}</Title>
            },
        },

        {
            name: 'Trade Category',
            key: 'type',
            render(value) {
                if (value === '+') return <Title noPad>Buy</Title>
                return <Title noPad>Sell</Title>
            },
        },

        {
            name: 'Transaction Fees',
            key: 'charge',
            render(value) {
                if (value <= 0) return <Title noPad>No Fees</Title>
                return <Title noPad>{value}</Title>
            },
        },
        {
            name: 'Rate',
            key: 'exchanges',
            render(value) {
                console.log(value)
                return <Title>
                    <CurrencyFormat
                        thousandSeparator
                        displayType="text"
                        value={value?.rate}
                    />
                </Title>
            },
        },

        {
            name: 'Limit Rate',
            key: 'exchanges',
            render(value) {
                if (value.limit_rate) {
                    return (
                        <div>
                            <Title noPad>
                                <CurrencyFormat
                                    thousandSeparator
                                    displayType="text"
                                    value={value.limit_rate}
                                />
                            </Title>
                        </div>
                    )
                }

                return <Title noPad>Unset</Title>
            },
        },
        {
            name: 'Expiry Date',
            key: 'exchanges',
            render(value) {
                if (value.expire_in) {
                    const date = getDate(value.updated_at);
                    return <Title className="flex gap-2" noPad><span>{date.date}</span> {date.time}</Title>
                }
                return <Title noPad>Unset</Title>
            },
        },

        {
            name: 'Transaction Ref',
            key: 'ref',
            render(value) {
                return <Copy value={value} />
            },
        },

        {
            name: 'Exchange Ref',
            key: 'exchanges',
            render(value) {
                return <Copy value={value.transaction_id} />
            },
        }
    ];


const Exchange = (props: TransactionData) => {
    return (
        <>
            {display(exchangeKeys, props)}
            {showIf(props.data?.exchanges?.status == 'pending', (
                <>
                    <div className="flex mt-4">
                        <Button variant="contained" className="grow" centered bgColor="warning" size="normal">Cancel</Button>
                    </div>
                </>
            ))}
        </>
    )
}

const keys: Array<{
    key: keyof Transaction;
    name: string,
    render?(value?: any): React.ReactNode
}> = [
        {
            name: 'Status',
            key: 'status',
            render(value) {
                return <Status stats={value} value={value} />
            },
        },

        {
            name: 'Date',
            key: 'updated_at',
            render(value) {
                const date = getDate(value);

                return <Title className="flex items-center gap-2"><span>{date.localTime}</span> {date.time}</Title>
            },
        },

        {
            name: 'Coin',
            key: 'currency',
            render(value: Currencies[number]) {
                return <Title noPad light>{value.code}</Title>
            },
        },

        {
            name: 'Deposit amount',
            key: 'amount'
        },

        {
            name: 'Network',
            key: 'deposit',
            render(value) {
                return <Title>{value.network}</Title>
            },
        },

        {
            name: 'Address',
            key: 'deposit',
            render(value) {
                return <Copy value={value.wallet_address} />
            },
        },

        {
            name: 'Ref',
            key: 'ref',
            render(value) {
                return <Copy value={value} />
            },
        },

        {
            name: 'TxID',
            key: 'trnx',
            render(value) {
                return <Copy value={value} />
            },
        }
    ];
const Deposit = (data: TransactionData) => {
    return display(keys, data);
}



export const Copy: React.FC<CopyProps> = ({ value }) => {
    //--- code here ---- //
    const notify = useNotify();
    return (
        <div className="flex gap-3 items-center">
            <Title noPad>
                <Truncate width={150} ellipsis={<span>...</span>}>
                    {value}
                </Truncate>
            </Title>
            <div className="flex gap-2">
                <Title noPad brighter><FaLink /></Title>
                <Title noPad brighter onClick={() => {
                    window.navigator.clipboard.writeText(value).then((e) => notify({ closable: true, severity: 'success', summary: 'Copied successfully' }))
                }}><FaCopy /></Title>
            </div>
        </div>
    );
}


interface CopyProps {
    value: any
}


export const Status: React.FC<StatusProps> = ({ value, stats, textProps = {} }) => {
    //--- code here ---- //
    stats = stats.toLowerCase();

    return (
        <div className="flex items-center gap-2">
            <span className={classNames('border-4 rounded-full', {
                'border-success-400': stats.includes('success'),
                'bg-danger': stats.includes('fail'),
                'bg-warning': stats.includes('pend') || stats.includes('cancel')
            })}></span>
            <Title noPad sm medium {...textProps}>
                {value}
            </Title>
        </div>
    );
}

interface StatusProps {
    value: any;
    stats: string
    textProps?: any
}



interface TransactionProviderProps extends PropsWithChildren {
    currencies: Currencies
    deposits: Deposits
    withdrawals: Withdrawals
    exchanges: Exchanges;
    transfers: Transfer[]
}
