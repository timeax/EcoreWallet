import Card from '@components/Card';
import Cardheader from '@components/Card/Cardheader';
import { Button } from 'primereact/button';
import React from 'react';
import TotalWidget from './DashboardTotal';
import Text from '@components/Text';
import styles from '@styles/widgets/balance.module.scss';
import { User } from '@tyings/index';
import { useWrapper } from '@context/AuthenticatedContext';

const ProfileBalance: React.FC<ProfileBalanceProps> = ({ user }) => {
    //--- code here ---- //
    useWrapper().onChange('cryptoUpdates', (e) => {
        console.log(e)
    })
    return (
        <Card>
            <Cardheader variant='mini'>
                <>Balance</>
                <Button theme>Deposit</Button>
            </Cardheader>
            <Text variant={'titlebar'}>
                ${user.balance}
            </Text>
            <div className='mt-4 flex items-center'>
                <TotalWidget type='in' value='40,000' />
                <div className={styles.divider}></div>
                <TotalWidget type='out' value='40,000' />
            </div>
        </Card>
    );
}

interface ProfileBalanceProps {
    user: User;
}

export default ProfileBalance
