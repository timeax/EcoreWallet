import React, { } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import styles from '@styles/pages/wallets/info.module.scss';
import WalletChart from './Chart';
import { PiEmpty } from "react-icons/pi";
import NoData from '@widgets/NoData';
import Card from '@components/Card';
import { Transactions, Wallet } from '@typings/index';
import { getDate, showIf } from '@assets/fn';
import { classNames } from 'primereact/utils';
import { Title } from '@components/Trade';
import useTransaction from '@context/TransactionDetail';
const ExtraInfo: React.FC<ExtraInfoProps> = ({ wallet }) => {
    //--- code here ---- //
    const history = wallet?.transactions?.filter(item => item.currency_id === wallet?.crypto_id) || [];

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
    const setData = useTransaction()
    return (
        <div>
            <table className={classNames("border-separate border-spacing-y-2 border-spacing-x-2", styles.table)}>
                <tbody className="lg:border-gray-300">
                    {history.map(item => {
                        return (
                            <tr key={item.id} className="" onClick={(e) => setData({ data: item })}>
                                <td className="whitespace-no-wrap py-1 text-sm font-semibold text-theme-emphasis">
                                    <Title noPad>
                                        {item.remark}
                                    </Title>
                                </td>

                                <td className="whitespace-no-wrap hidden py-1 text-sm font-normal text-gray-500 lg:table-cell">
                                    {getDate(item.updated_at).date}
                                </td>

                                <td className="whitespace-no-wrap py-1 px-6 text-right text-sm text-gray-600 lg:text-left">
                                    {item.amount}
                                    <Pill
                                        value={item.status || 'success'}
                                        className='flex mt-1 ml-auto w-fit items-center rounded-full py-1 px-3 text-left text-xs lg:hidden'
                                    />
                                </td>

                                <td className="whitespace-no-wrap hidden py-1 text-sm font-normal text-gray-500 lg:table-cell">
                                    <Pill
                                        value={item.status || 'success'}
                                        className='inline-flex items-center rounded-full py-1 px-3 text-xs'
                                    />
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
}


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
