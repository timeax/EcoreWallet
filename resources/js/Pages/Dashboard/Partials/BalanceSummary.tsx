import { ColorNames } from '@assets/fn/create-color';
import IconButton from '@components/Button/IconButton';
import Card from '@components/Card';
import { Title } from '@components/Trade';
import { useWrapper } from '@context/AuthenticatedContext';
import { Wallets } from '@typings/index';
import React from 'react';
import { GiCoins } from 'react-icons/gi';
import styles from '@styles/pages/dashboard.module.scss';
import { classNames } from 'primereact/utils';
import { useLive } from '@context/LiveContext';

const BalanceSummary: React.FC<BalanceSummaryProps> = ({ wallets }) => {
    //--- code here ---- //
    const { balance } = useLive()
    //------------
    return (
        <section>
            <div className={classNames("flex gap-4", styles.total_container)}>
                <Total
                    change='20%'
                    color='info'
                    icon={<GiCoins />}
                    label='Total'
                    value={balance?.data?.total}
                />

                <Total
                    change='20%'
                    color='success'
                    icon={<GiCoins />}
                    label='Available'
                    value={balance?.data?.available}
                />

                <Total
                    change='20%'
                    color='warning'
                    icon={<GiCoins />}
                    label='Pending'
                    value={balance?.data?.pending}
                />
            </div>
        </section>
    );
}

export const Total: React.FC<TotalProps> = ({ change, icon, label, value, color = 'theme' }) => {
    //--- code here ---- //
    return (
        <Card className={classNames('shadow-sm !rounded-xl shadow-black/5 overflow-hidden text-ellipsis', styles.total)} container='!px-4'>
            <div className='flex gap-2'>
                <div className='flex'>
                    <IconButton
                        className='items-center flex !p-3 mr-auto rounded-xl !text-white'
                        size='20px'
                        // shape='circle'
                        variant='contained'
                        bgColor={color}>{icon}</IconButton>
                </div>
                <div className='flex flex-col grow gap-1'>
                    <div className='flex justify-between'>
                        <Title noPad bold>{label}</Title>
                    </div>
                    <Title className='text-ellipsis' noPad xl>${value}</Title>
                </div>
            </div>
        </Card>
    );
}

interface TotalProps {
    value: string | number;
    label: string;
    icon: React.ReactNode;
    change: string;
    color: ColorNames
}

interface BalanceSummaryProps {
    wallets: Wallets
}

export default BalanceSummary
