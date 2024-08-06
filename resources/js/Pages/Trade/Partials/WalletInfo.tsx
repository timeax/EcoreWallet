import React, { useEffect, useState } from 'react';
import styles from '@styles/pages/wallets/info.module.scss';
import { Wallet } from '@typings/index';
import Button from '@components/Button';
import Text from '@components/Text';
import Dropdown from '@components/Dropdown';
import Card from '@components/Card';
import { SlOptions } from 'react-icons/sl';
import CryptoIcon from '@components/CryptoIcon';
import { routeById } from '@routes/index';
import { MarketData, Rate, useLive } from '@context/LiveContext';
import calc from 'number-precision';
import CurrencyFormat from 'react-currency-format';


const WalletInfo: React.FC<WalletInfoProps> = ({ wallet }) => {
    //--- code here ---- //
    const buttonStyles = { padding: '0 .8rem !important', lineHeight: '2.5rem !important', fontSize: '14px' };
    const { rates, currRate } = useLive();

    const [rate, setRate] = useState<Rate['data'][number] | undefined>();

    useEffect(() => {
        if (wallet && rates)
            setRate(currRate(wallet.curr.code));
    }, [rates, wallet]);

    return (
        <Card className={styles.summary}>
            {
                wallet ?
                    (
                        <div className='flex gap-4 relative'>
                            <div className='flex flex-col gap-4'>
                                <div className={styles.header}>
                                    <CryptoIcon curr={wallet.curr} size='13px' />
                                    <Text variant='header' className={styles.name}>{wallet?.curr.curr_name}</Text>
                                </div>

                                <Balance balance={wallet.all_balance.total} rate={rate?.course || 0} title='Total Balance' />

                                <div className="flex gap-2">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <Button icon={<SlOptions />} sx={buttonStyles} shape='smooth'>Options</Button>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content align='left'>

                                            <Dropdown.Link href={route(routeById('swap').route, { wallet: wallet.curr.code })}>Swap</Dropdown.Link>
                                            <Dropdown.Link href={route(routeById('withdraw').route, { wallet: wallet.curr.code })} >Withdraw</Dropdown.Link>
                                            <Dropdown.Link href={route(routeById('fund').route, { wallet: wallet.curr.code })}>Deposit</Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className={styles.spacing}>
                                <div className="absolute h-full pl-[0.1px] bg-dark-0/10"></div>
                            </div>

                            <div className='flex grow flex-col justify-between'>
                                <Balance balance={wallet.all_balance.available} rate={rate?.course || 0} title='Available Balance' />
                                <Balance balance={wallet.all_balance.escrow} rate={rate?.course || 0} title='Pending Balance' />
                            </div>
                        </div>
                    ) : 'No Wallet Selected'
            }

        </Card>
    );
}


export const Balance: React.FC<BalanceProps> = ({ balance, rate, title }) => {
    //--- code here ---- //
    return (
        <div>
            <Text variant={'small'}>{title}</Text>
            <Text variant={'header'} className='boldColor'>{balance}</Text>
            <CurrencyFormat
                value={calc.round(calc.times(balance, rate), 8)}
                thousandSeparator
                displayType='text'
                renderText={value => <Text variant="text" className='!font-medium !text-primary-900'>{value} <span>USD</span></Text>}
            />
        </div>
    );
}

interface BalanceProps {
    title: string;
    balance: number | string;
    rate: number | string;
}


interface WalletInfoProps {
    wallet?: Wallet;
    bgColor?: string
}

export default WalletInfo
