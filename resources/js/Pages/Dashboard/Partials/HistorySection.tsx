import Text from '@components/Text';
import { Transactions } from '@typings/index';
import NoData from '@widgets/NoData';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import React from 'react';

const HistorySection: React.FC<HistorySectionProps> = ({ transactions }) => {
    //--- code here ---- //
    return (
        <section>
            <div className="flex flex-col gap-4">
                <div>
                    <Text variant={'header'} className='!text-theme-emphasis !text-[24px]'>Recent Transactions</Text>
                    <Text className='!text-theme-emphasis'>Your most recent funding, trading, and withdrawal activities</Text>
                </div>
                <div>
                    <Card className='!bg-theme-bgColor rounded'>
                        <NoData>
                            <>No Activties here</>
                            <>When you make a transaction, your activities would appear here.</>
                            <>
                                <Button>Make a Deposit</Button>
                            </>
                        </NoData>
                    </Card>
                </div>
            </div>
        </section>
    );
}

interface HistorySectionProps {
    transactions: Transactions
}

export default HistorySection
