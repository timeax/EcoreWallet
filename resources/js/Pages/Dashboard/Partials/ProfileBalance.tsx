import Card from '@components/Card';
import React from 'react';
import { Title } from '@components/Trade';
import Button from '@components/Button';
import styles from '@styles/widgets/dashboard/balance.module.scss'
import { classNames } from 'primereact/utils';
import { routeById } from '@routes/index';
import { useLive } from '@context/LiveContext';
import Select from '@components/Trade/Select';
import CurrencyFormat from 'react-currency-format';
import Dropdown from '@components/Dropdown';
import { PiDotsThreeOutlineFill } from 'react-icons/pi';

const ProfileBalance: React.FC<ProfileBalanceProps> = ({ }) => {
    //--- code here ---- //
    const { balance, currencies, currency, wallets, setCurr } = useLive();
    return (
        <Card className={classNames('h-full', styles.main)} container={styles.content}>
            <div className="flex justify-between">
                <Title noPad light md className={styles.title}>Calculated balance</Title>
                <Select
                    unique='id'
                    contained
                    transaparent
                    gap={8}
                    className={styles.select}
                    // icon={''}
                    //@ts-ignore
                    items={currencies.filter(item => wallets.find(item => item.crypto_id == item.id) || item.type == 1)}
                    value={currency}
                    placeholder='coin'
                    label='code'
                    onSelect={(e) => setCurr(e.value)}
                />
            </div>
            <div className='flex flex-col gap-4'>
                <div className="flex justify-between items-center">
                    <Title noPad xl3 className={styles.balance}>
                        {currency?.symbol}
                        <CurrencyFormat
                            value={balance?.data?.total}
                            displayType="text"
                            thousandSeparator
                            renderText={value => <span>{value}</span>}
                        />
                    </Title>
                    <div className={styles.actions}>
                        <Button size='normal' >Fund</Button>
                        <Button size='normal' href={route(routeById('withdraw').route)}>Send</Button>
                    </div>
                </div>

                <div className={styles.available}>
                    <Title brighter xs noPad>Available balance</Title>
                    <div className='flex justify-between items-center'>
                        <Title medium md noPad>
                            <span>{currency?.symbol}</span>
                            <CurrencyFormat
                                value={balance?.data?.available}
                                displayType='text'
                                thousandSeparator
                                renderText={(value) => <>{value}</>}
                            />
                        </Title>
                        <Dropdown>
                            <Dropdown.Trigger>
                                <span className={styles.more}>
                                    <PiDotsThreeOutlineFill />
                                </span>
                            </Dropdown.Trigger>
                            <Dropdown.Content>
                                <Dropdown.Link href={route(routeById('fund').route)}>
                                    Fund
                                </Dropdown.Link>
                                <Dropdown.Link href={route(routeById('withdraw').route)}>
                                    Withdraw / Transfer
                                </Dropdown.Link>
                                <Dropdown.Link href={route(routeById('swap').route)}>
                                    Swap
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>
                </div>
            </div>
        </Card>
    );
}

interface ProfileBalanceProps {
}

export default ProfileBalance
