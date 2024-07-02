import Text from '@components/Text';
import { Transactions } from '@typings/index';
import NoData from '@widgets/NoData';
import React from 'react';
import Card from '@components/Card';
import Button from '@components/Button';

const HistorySection: React.FC<HistorySectionProps> = ({ transactions }) => {
    //--- code here ---- //
    return (
        <div className="flex flex-col h-full gap-4">
            <div>
                <Text variant={'header'} className='!text-theme-emphasis !text-[24px]'>Recent Transactions</Text>
                <Text className='!text-theme-emphasis'>Your most recent funding, trading, and withdrawal activities</Text>
            </div>
            <div className='flex-grow'>
                <Card className='h-full'>
                    <NoData>
                        <>No Activties here</>
                        <>When you make a transaction, your activities would appear here.</>
                        <>
                            <Button variant='outlined' shape='pill'>Make a Deposit</Button>
                        </>
                    </NoData>
                </Card>
            </div>
        </div>
    );
}

interface HistorySectionProps {
    transactions: Transactions
}

export default HistorySection
