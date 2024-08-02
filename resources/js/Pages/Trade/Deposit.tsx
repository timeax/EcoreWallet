import CryptoIcon from '@components/CryptoIcon';
import AuthenticatedLayout from '@layouts/AuthenticatedLayout';
import { AddressState, Addresses, CryptomusService, PageProps, Wallet, Wallets } from '@typings/index';
import UiButton from '@components/Button';
import { classNames } from 'primereact/utils';
import React, { useEffect, useState } from 'react';
import { FaCopy } from 'react-icons/fa';
import { CiClock2 } from 'react-icons/ci';
import QRCode, { QRCodeProps } from 'react-qr-code';
import { Container, Title } from '@components/Trade';
import Select from '@components/Trade/Select';
import Note from '@components/Trade/Note';
import styles from '@styles/pages/trade.module.scss';
import { showIf } from '@assets/fn';
import { Copy } from '@context/TransactionDetail';
import { useConsole } from '@context/AuthenticatedContext';

const Deposit: React.FC<DepositProps> = ({ auth, addresses, wallets, wallet: code, services, ...props }) => {
    //--- code here ---- //
    const [wallet, setWallet] = useState<Wallet | undefined>();
    const [serviceList, setServiceList] = useState<AddressState[]>([]);
    const [service, setService] = useState<AddressState | undefined>();

    useEffect(() => {
        setWallet(wallets.find(item => item.curr.code === code));
    }, []);

    useEffect(() => {
        if (!wallet) return;
        //@ts-ignore
        const list: AddressState[] = addresses?.filter(item => item.currency_id === wallet.curr.id as unknown as number).map(item => {
            const isAvailable = services.find(service => (wallet.curr.code === service.currency) && service.network === item.network)?.is_available;

            return {
                ...item,
                isAvailable,
            }
        });

        setServiceList(list);

        setService(list[0]);
    }, [wallet]);



    return (
        <AuthenticatedLayout
            user={auth.user}
            {...props}
            desc='Add Crypto to your Ecorewallet account!'
            title='Fund Account'>
            <Page
                {...{
                    serviceList,
                    setWallet,
                    wallet,
                    wallets,
                    service
                }}
            />
        </AuthenticatedLayout>
    );
}



const Page: React.FC<PageProp> = ({ wallet, service, serviceList, setWallet, wallets }) => {
    //--- code here ---- //
    const logger = useConsole();

    function show<T = any>(Element: any, props: T) {
        //@ts-ignore
        return service ? <Element {...props} /> : '';
    }
    return (
        <>
            <div className={styles.deposit}>
                <div className={styles.select}>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-3">
                            <Title medium bright>
                                Select Coin
                            </Title>
                            <Container>
                                <Select
                                    quick
                                    contentTemplate={contentTemplate}
                                    menuItemTemplate={menuTemplate}
                                    items={wallets}
                                    unique='id'
                                    placeholder='Wallet'
                                    value={wallet}
                                    onSelect={(e) => setWallet(e.value)}
                                />
                            </Container>
                        </div>
                        <div className="flex gap-4 pl-4">
                            <Title>Total Balance:</Title>
                            <Title md bold>{wallet?.balance} {wallet?.curr.code}</Title>
                        </div>
                        <div className={classNames("flex flex-col gap-3", styles.coin_address)}>
                            <Title medium bright>
                                {wallet?.curr.code} Address
                            </Title>
                            <Container>
                                <div className='flex justify-between'>
                                    <Title md medium normal>
                                        {service?.address || 'Please Select A Network'}
                                    </Title>
                                    <div>
                                        <UiButton onClick={() => {
                                            if (service) {
                                                navigator.clipboard?.writeText(service.address).then((e) => {
                                                    logger.success('Copied wallet address')
                                                });
                                            }
                                        }} iconLoc='right' iconSize='16px' size='normal' icon={<FaCopy />} rounded>Copy</UiButton>
                                    </div>
                                </div>
                            </Container>
                        </div>
                    </div>
                </div>
                {/* Address Section */}
                <div className={styles.address}>
                    <div className='mb-4'>
                        <Title bright className={styles.address_title} medium>Deposit Network</Title>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div>
                            <Container>
                                <Select
                                    items={serviceList}
                                    unique='id'
                                    value={service}
                                    label='network'
                                    variant='outline'
                                    quick
                                />
                            </Container>

                            <div className='flex pl-3 py-4 gap-2 items-center'>
                                <CiClock2 />
                                {
                                    service?.isAvailable ?
                                        (<>
                                            <Title noPad>Average Arrival Time:</Title>
                                            <Title noPad bold>3 Minutes</Title>
                                        </>
                                        ) : (
                                            <>
                                                <Title noPad>Netork is currently down</Title>
                                            </>
                                        )
                                }
                            </div>
                        </div>
                        <div className="flex flex-col gap-5 items-center">
                            <Title lg bold>{wallet?.curr.code} Address</Title>
                            <div className='flex flex-col gap-4 items-center justify-center'>
                                <div className={styles.coin_address_mobile}>
                                    {showIf(service?.network, <Copy value={service?.address} />)}
                                </div>
                                {show<QRCodeProps>(QRCode, { value: service?.address as string, size: 220 })}
                            </div>
                        </div>

                    </div>

                    <Note
                        title={<>Send Only {wallet?.curr.code} to this Address !</>}
                        children={<>Sending coin or token other than {wallet?.curr.code} to this Address may result in the loss of your deposit</>}
                    />
                </div>
            </div>
        </>
    );
}

interface PageProp {
    wallet?: Wallet,
    service?: AddressState;
    serviceList: AddressState[];
    setWallet: React.Dispatch<Wallet>;
    wallets: Wallets
}



export const menuTemplate = (item: Wallet) => {
    return <div className='flex w-fit items-center gap-5'>
        <div className="flex items-center gap-2 py-1 px-3 rounded-[999px]">
            <CryptoIcon width='2rem' curr={item.curr} name={item?.curr.curr_name} label={item?.curr.symbol} />
            <Title md noPad medium>{item.curr.curr_name}</Title>
        </div>
        {/* <Text variant={'other'} size='12px' className=''>{item.curr.code}</Text> */}
    </div>
}

export const contentTemplate = (wallet: Wallet) => {
    return <div className='flex w-fit items-center gap-5'>
        <div className="flex items-center gap-1 bg-theme-bgContent py-2 px-3 rounded-[999px]">
            <CryptoIcon curr={wallet.curr} width='2.2rem' height='2.2rem' size='12px' name={wallet?.curr.curr_name} label={wallet?.curr.symbol} />
            <Title md noPad medium>{wallet.curr.curr_name}</Title>
        </div>
        <Title xs>{wallet.curr.code}</Title>
    </div>
}

interface DepositProps extends PageProps {
    wallets: Wallets;
    addresses?: Addresses;
    wallet?: string
    services: CryptomusService[];
}

export default Deposit
