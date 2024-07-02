import Card from '@components/Card';
import CryptoIcon from '@components/CryptoIcon';
import Text from '@components/Text';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@layouts/AuthenticatedLayout';
import { PageProps, Wallet, Wallets as WalletList } from '@typings/index';
import React, { useState } from 'react';
import styles from '@styles/pages/wallets/wallets.module.scss';
import WalletInfo from './Partials/WalletInfo';
import { classNames } from 'primereact/utils';
import ExtraInfo from './Partials/ExtraInfo';

const Wallets: React.FC<WalletsProps> = ({ auth, wallets }) => {
    //--- code here ---- //
    const [wallet, setWallet] = useState(wallets[0]);
    return (
        <AuthenticatedLayout user={auth.user}
            header={[
                {
                    label: 'Wallets',
                    template(item, options) {
                        return <Link href={route('user.wallets')}>{item.label}</Link>
                    },
                }]
            } title='Assets'>
            <div>
                <Text variant={'header'} className='!text-theme-emphasis !text-[24px]'>All Available Assets</Text>
                <Text className='!text-theme-emphasis'>Ranked in order of popularity (24H view)s</Text>
            </div>
            <div className="grid grid-cols-9 mt-4 gap-x-6">
                <div className='col-span-4'>
                    <div className='flex gap-y-2 flex-col mt-4'>
                        <Card rounded={false} container='!py-1'>
                            <div className="flex w-full items-center">
                                {['Name', 'Price', '24h Change'].map((item, i) => (
                                    <div key={item} className={styles[`col-${i + 1}`]}>
                                        <Text variant={'other'} className='text-[11px] uppercase font-semibold'>{item}</Text>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        {wallets.map(item => {
                            return (
                                <Card key={item.id} rounded={false} onClick={() => setWallet(item)} className={classNames(styles.wallet, { [styles.selected]: item.id === wallet.id })} container='!py-4'>
                                    <div className='flex items-center'>
                                        <div className={styles['col-1']}>
                                            <NameTemplate key={item.id} {...item} />
                                        </div>
                                        <div className={styles['col-2']}>
                                            <Text variant={'other'} className='text-[14px]'>$9000000000</Text>
                                        </div>
                                        <div className={styles['col-3']}>
                                            <Text variant={'other'} className='text-[14px]'>+20%</Text>
                                        </div>
                                    </div>
                                </Card>
                            )
                        })}
                    </div>
                </div>
                <div className='col-span-5'>
                    <div className='flex flex-col gap-4'>
                        <WalletInfo wallet={wallet} />
                        <ExtraInfo wallet={wallet} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

const NameTemplate = (wallet: Wallet) => {
    const size = '3rem';
    return (
        <div className='flex items-center gap-2'>
            <CryptoIcon width={size} height={size} name={wallet.curr.curr_name} size='14px' label={wallet.curr.symbol} />
            <div className='flex flex-col'>
                <Text variant={'other'} className='font-bold text-[10px]'>{wallet.curr.code}</Text>
                <Text variant={'other'} className='text-[14px]'>{wallet.curr.curr_name}</Text>
            </div>
        </div>
    )
}

const PriceTemplate = (wallet: Wallet) => {
    return (
        <div>
            <Text>{9000000}</Text>
        </div>
    )
}

const ChangeTemplate = (wallet: Wallet) => {
    return (
        <div>
            <Text>+20%</Text>
        </div>
    )
}



interface WalletsProps extends PageProps {
    wallets: WalletList
}

export default Wallets
