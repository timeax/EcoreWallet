import Card from '@components/Card';
import CryptoIcon from '@components/CryptoIcon';
import Text from '@components/Text';
import { Wallet, Wallets } from '@typings/index';
import React from 'react';
import { FaLongArrowAltRight } from 'react-icons/fa';
import styles from '@styles/widgets/dashboard.wallets.module.scss';
import { Button } from 'primereact/button';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const DashboardWallets: React.FC<DashboardWalletsProps> = ({ wallets }) => {
    //--- code here ---- //
    return (
        <>
            <div className={styles.header}>
                <Text variant={'titlebar'}>My Assets</Text>
                <div className='flex gap-x-1'>
                    <Button rounded className='!bg-primary-700' icon={<IoIosArrowBack color='white' />}></Button>
                    <Button rounded className='!bg-primary-700' icon={<IoIosArrowForward color='white' />}></Button>
                </div>
            </div>
            <div className='flex gap-4'>
                {wallets.map(item => <WalletTemplate key={item.id} wallet={item} />)}
            </div>
        </>
    );
}

const WalletTemplate: React.FC<{ wallet: Wallet }> = ({ wallet }) => {
    return (
        <div>
            <Card className="w-[300px] h-[160px] overflow-hidden" container='flex flex-col'>
                <div className="mb-3 flex items-center gap-x-2 flex-nowrap">
                    <CryptoIcon name={wallet.curr.curr_name} label={wallet.curr.symbol} />
                    <div className='flex justify-center grow flex-col overflow-hidden'>
                        <div className='flex items-center justify-between w-full'>
                            <Text size='12px' className="whitespace-nowrap text-ellipsis">
                                {wallet.curr.curr_name}
                            </Text>
                            <h6 className="mt-0 font-semibold">{wallet.balance}</h6>
                        </div>
                        <Text variant={'small'} className='text-theme-emphasis items-center font-semibold flex justify-between w-full' size='13px'>
                            <span>1 {wallet.curr.code}</span>
                            <FaLongArrowAltRight />
                            <span>${wallet.curr.rate}</span>
                        </Text>
                    </div>
                </div>
                <div className="mt-auto flex flex-col flex-wrap gap-1 justify-content-center">
                    <Text variant={'small'} className='text-theme-emphasis'>In Orders - {wallet.all_balance.escrow}</Text>
                    <Text variant={'small'} className='text-theme-emphasis'>Available - {wallet.all_balance.available}</Text>
                </div>
            </Card>
        </div>
    );
};

interface DashboardWalletsProps {
    wallets: Wallets
}

export default DashboardWallets
