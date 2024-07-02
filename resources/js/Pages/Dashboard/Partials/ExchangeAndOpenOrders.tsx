import Cardheader from '@components/Card/Cardheader';
import Exchange from '@components/Trade/Exchange';
import SpotProvider from '@context/SpotContext';
import Card from '@components/Card';
import React, { useState } from 'react';
import { BsCurrencyExchange } from 'react-icons/bs';
import Text from '@components/Text';
import { User, Wallets } from '@typings/index';
import UiButton from '@components/Button';
import { Button } from 'primereact/button';

const ExchangeAndOpenOrders: React.FC<ExchangeAndOpenOrdersProps> = ({ auth, wallets }) => {
    const [currency, setCurrency] = useState(wallets[0].curr);
    //--- code here ---- //
    return (
        <div className="col-span-3">
            <Card>
                <Cardheader variant='mini'>
                    <>Exchange</>
                    <Button icon={<BsCurrencyExchange />} className='!text-primary !text-lg'></Button>
                </Cardheader>
                <>
                    <Text className='mb-4 !text-theme-emphasis'>
                        Perform quick and seamless crypto exchanges here.
                    </Text>
                    <div className='flex flex-col'>
                        <SpotProvider
                            user={auth.user}
                            wallet={wallets[0]}
                            wallets={wallets}
                            currencies={wallets.map(item => item.curr)}
                            currency={currency}
                            setCurrency={setCurrency}
                        >
                            <Exchange exchange order={1} onChange={(e) => { }} />

                            <UiButton className='items-center justify-center mt-4'>Exchange</UiButton>
                        </SpotProvider>
                    </div>
                </>
            </Card>
        </div>
    );
}

interface ExchangeAndOpenOrdersProps {
    auth: {
        user: User
    },
    wallets: Wallets
}

export default ExchangeAndOpenOrders
