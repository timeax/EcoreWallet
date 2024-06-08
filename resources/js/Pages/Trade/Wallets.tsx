import Card from '@components/Card';
import CryptoIcon from '@components/CryptoIcon';
import Text from '@components/Text';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@layouts/AuthenticatedLayout';
import { PageProps, Wallet, Wallets as WalletList } from '@typings/index';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React from 'react';

const Wallets: React.FC<WalletsProps> = ({ auth, wallets }) => {
    //--- code here ---- //
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
            <div className="grid grid-cols-9 mt-4 gap-x-6">
                <div className='col-span-4'>
                    <div>
                        <Text variant={'header'} className='!text-theme-emphasis !text-[24px]'>All Available Assets</Text>
                        <Text className='!text-theme-emphasis'>Ranked in order of popularity (24H view)s</Text>
                    </div>
                    <Card>
                        <DataTable value={wallets}>
                            <Column field="name" body={NameTemplate} header="Name"></Column>
                            <Column field="price" header="Price" body={PriceTemplate}></Column>
                            <Column field="change" body={ChangeTemplate} header="24hr Change"></Column>
                        </DataTable>
                    </Card>
                </div>
                <div className='col-span-5'>
                    this is the rea
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

const NameTemplate = (wallet: Wallet) => {
    const size = '3.5rem';
    return (
        <div className='flex items-center gap-6'>
            <CryptoIcon width={size} height={size} name={wallet.curr.curr_name} size='20px' label={wallet.curr.symbol} />
            <div>
                <Text variant={'small'} className='font-bold'>{wallet.curr.code}</Text>
                <Text>{wallet.curr.curr_name}</Text>
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
