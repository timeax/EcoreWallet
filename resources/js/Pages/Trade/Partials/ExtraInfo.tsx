import React, { useState } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import styles from '@styles/pages/wallets/info.module.scss';
import WalletChart from './Chart';
import { FaPlus } from 'react-icons/fa';
import { PiEmpty } from "react-icons/pi";
import NoData from '@widgets/NoData';
import Card from '@components/Card';
import Button from '@components/Button';
import { Wallet } from '@typings/index';

const ExtraInfo: React.FC<ExtraInfoProps> = ({ wallet }) => {
    //--- code here ---- //
    return (
        <Card>
            <TabView>
                <TabPanel headerClassName={styles.tab} contentClassName={styles.content} header="Overview">
                    <WalletChart wallet={wallet} />
                </TabPanel>
                <TabPanel contentClassName={styles.content} headerClassName={styles.tab} header="Recurring Buys">
                    <NoData>
                        <>You haven't created any recurring buys yet</>
                        <>Recurring buys can be used to buy
                            cryptocurrency on a regular schedule</>
                        <Button icon={<FaPlus />} variant='none'>Create a recurring buy</Button>
                    </NoData>
                </TabPanel>
                <TabPanel contentClassName={styles.content} headerClassName={styles.tab} header="Transactions">
                    <NoData icon={<PiEmpty />}>
                        <>No Transaction activities yet</>
                        <>When you make a transaction, your
                            activities would appear here.</>
                    </NoData>
                </TabPanel>
            </TabView>
        </Card>
    );
}

interface ExtraInfoProps {
    wallet?: Wallet;
}

export default ExtraInfo
