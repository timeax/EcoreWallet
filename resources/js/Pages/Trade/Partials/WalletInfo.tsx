import React from 'react';
import styles from '@styles/pages/wallets/info.module.scss';
import { Wallet } from '@typings/index';
import Button from '@components/Button';
import Tag from '@components/index';
import Text from '@components/Text';
import Dropdown from '@components/Dropdown';
import Card from '@components/Card';
import { SlOptions } from 'react-icons/sl';
import CryptoIcon from '@components/CryptoIcon';
import routes, { routeById } from '@routes/index';
const WalletInfo: React.FC<WalletInfoProps> = ({ wallet, bgColor = 'grey' }) => {
    //--- code here ---- //
    const buttonStyles = { padding: '0 .8rem !important', lineHeight: '2.5rem !important', fontSize: '14px' };
    return (
        <Card>
            {
                wallet ?
                    (
                        <div className='flex gap-4 relative'>
                            <div className='flex flex-col gap-4'>
                                <div className={styles.header}>
                                    <CryptoIcon name={wallet.curr.curr_name} label={wallet.curr.symbol} size='13px' />
                                    <Text variant='header' className={styles.name}>{wallet?.curr.curr_name}</Text>
                                </div>

                                <Balance balance={0.213435345} rate={parseFloat(wallet.curr.rate)} title='Total Balance' />

                                <div className="flex gap-2">
                                    <Dropdown>
                                        <Dropdown.Trigger>
                                            <Button icon={<SlOptions />} sx={buttonStyles} shape='smooth'>Options</Button>
                                        </Dropdown.Trigger>
                                        <Dropdown.Content align='left'>
                                            <Dropdown.Link href={route(routeById('buy').route, { wallet: wallet.curr.code, type: 'buy' })}>Buy</Dropdown.Link>
                                            <Dropdown.Link href={route(routeById('sell').route, { wallet: wallet.curr.code, type: 'sell' })}>Sell</Dropdown.Link>
                                            <Dropdown.Link href={route(routeById('withdraw').route, { wallet: wallet.curr.code })}>Withraw</Dropdown.Link>
                                            <Dropdown.Link href={route(routeById('fund').route, { wallet: wallet.curr.code })}>Deposit</Dropdown.Link>
                                        </Dropdown.Content>
                                    </Dropdown>
                                </div>
                            </div>
                            <div className='px-8'>
                                <div className="absolute h-full pl-[0.1px] bg-dark-0/10"></div>
                            </div>

                            <div className='flex grow flex-col justify-between'>
                                <Balance balance={0.213435345} rate={parseFloat(wallet.curr.rate)} title='Available Balance' />
                                <Balance balance={0.213435345} rate={parseFloat(wallet.curr.rate)} title='Pending Balance' />
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
            <Text variant="text" className='!font-medium !text-primary-900'>{balance * rate} <span>USD</span></Text>
        </div>
    );
}

interface BalanceProps {
    title: string;
    balance: number;
    rate: number;
}


interface WalletInfoProps {
    wallet?: Wallet;
    bgColor?: string
}

export default WalletInfo
