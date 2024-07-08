import Card from '@components/Card';
import Cardheader from '@components/Card/Cardheader';
import React from 'react';
import { useWrapper } from '@context/AuthenticatedContext';
import { Title } from '@components/Trade';
import Button from '@components/Button';
import styles from '@styles/widgets/dashboard/balance.module.scss'
import { classNames } from 'primereact/utils';
import { Link } from '@inertiajs/react';
import { routeById } from '@routes/index';
import { Wallets } from '@typings/index';
import { useLive } from '@context/LiveContext';

const ProfileBalance: React.FC<ProfileBalanceProps> = ({ }) => {
    //--- code here ---- //
    const context = useWrapper();
    const user = context.user;
    //-------
    const { balance } = useLive();

    return (
        <Card className={classNames('h-full !rounded-xl', styles.main)}>
            <Cardheader variant='mini'>
                <>Estimated Balance</>
                <Title noPad bright className={classNames('flex gap-3', styles.acct)}>
                    <span>Acct No</span> <b className='tracking-wider'>123456789</b>
                </Title>
            </Cardheader>
            <div className="flex justify-between">
                <div>
                    <Title noPad xl3 className={styles.balance}>
                        ${balance?.data?.total}
                    </Title>

                </div>
                <div className={styles.actions}>
                    <Button size='normal' href={route(routeById('fund').route)}>Fund</Button>
                </div>
            </div>
        </Card>
    );
}

interface ProfileBalanceProps {
}

export default ProfileBalance
