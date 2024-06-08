import Cardheader from '@components/Card/Cardheader';
import Exchange from '@components/Trade/Exchange';
import SpotProvider from '@context/SpotContext';
import NoData from '@widgets/NoData';
import { Button } from 'primereact/button';
import Card from '@components/Card';
import React, { useState } from 'react';
import { BsCurrencyExchange } from 'react-icons/bs';
import Text from '@components/Text';
import { User, Wallets } from '@typings/index';

const ExchangeAndOpenOrders: React.FC<ExchangeAndOpenOrdersProps> = ({ auth, wallets }) => {
    const [currency, setCurrency] = useState(wallets[0].curr);
    //--- code here ---- //
    return (
        <section>
            <div className="grid grid-cols-8 gap-x-6 ">
                <div className="col-span-5">
                    <Card className='h-full'>
                        <Cardheader>
                            <>Open Orders</>
                            <><Button>See All</Button></>
                        </Cardheader>
                        <>
                            <Text>Open limit orders that will execute when it reaches a target price</Text>
                            <div>
                                <NoData>
                                    <>No Activties here</>
                                    <>You don't have any open limit orders.</>
                                </NoData>
                            </div>
                        </>
                    </Card>
                </div>
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

                                    <Button className='flex justify-center hover:!bg-primary-800 !text-primary-50 !bg-primary-700 mt-4' >Exchange</Button>
                                </SpotProvider>
                            </div>
                        </>
                    </Card>
                </div>
            </div>
        </section>
    );
}

interface ExchangeAndOpenOrdersProps {
    auth: {
        user: User
    },
    wallets: Wallets
}

export default ExchangeAndOpenOrders
