import Card from '@components/Card';
import CryptoIcon from '@components/CryptoIcon';
import Text from '@components/Text';
import { Link } from '@inertiajs/react';
import AuthenticatedLayout from '@layouts/AuthenticatedLayout';
import { routeById } from '@routes/index';
import { AddressState, Addresses, CryptomusService, PageProps, Wallet, Wallets } from '@typings/index';
import { Button } from 'primereact/button';
import UiButton from '@components/Button';
import { classNames } from 'primereact/utils';
import React, { FC, useEffect, useState } from 'react';
import { FaChevronDown, FaCopy } from 'react-icons/fa';
import { SelectButton } from 'primereact/selectbutton';
import { CiClock2 } from 'react-icons/ci';
import QRCode, { QRCodeProps } from 'react-qr-code';
import { RiErrorWarningFill, RiErrorWarningLine } from 'react-icons/ri';
import copy from 'copy-to-clipboard';
import { Container, Title } from '@components/Trade';
import Dropdown from '@components/Dropdown';
import Select from '@components/Trade/Select';
import Note from '@components/Trade/Note';

const Deposit: React.FC<DepositProps> = ({ auth, addresses, wallets, wallet: code, services }) => {
    //--- code here ---- //
    const [wallet, setWallet] = useState<Wallet | undefined>();
    const [serviceList, setServiceList] = useState<AddressState[] | undefined>();
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

    function show<T = any>(Element: any, props: T) {
        //@ts-ignore
        return service ? <Element {...props} /> : '';
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={[
                {
                    label: 'Crypto Deposits',
                    template(item, options) {
                        return <Link href={routeById('fund').route}>{item.label}</Link>
                    },
                }
            ]}
            title='Fund Account'>
            <div className="grid grid-cols-9 gap-12">
                <div className="col-span-6">
                    <Title noPad xl medium>Deposit</Title>
                    <Text className='!font-medium mb-6'>Add Crypto to your Ecorewallet account!</Text>

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <Title medium bright>
                                Select Coin
                            </Title>
                            <Select
                                quick
                                contentTemplate={contentTemplate}
                                menuItemTemplate={menuTemplate}
                                items={wallets}
                                unique='id'
                                value={wallet}
                                onSelect={(e) => setWallet(e.value)}
                            />
                        </div>
                        <div className="flex gap-4 pl-4">
                            <Title>Total Balance:</Title>
                            <Title md bold>{wallet?.balance} {wallet?.curr.code}</Title>
                        </div>
                        <div className="flex flex-col gap-3">
                            <Title medium bright>
                                {wallet?.curr.code} Address
                            </Title>
                            <Container>
                                <div className='flex justify-between'>
                                    <Title lg medium normal>
                                        {service?.address || 'Please Select A Network'}
                                    </Title>
                                    <div>
                                        <UiButton onClick={() => {
                                            if (service) {
                                                navigator.clipboard?.writeText(service.address).then((e) => {
                                                    alert('it is done')
                                                });
                                            }
                                        }} sx={{ fontSize: '15px !important' }} iconLoc='right' iconSize='16px' size='sm' icon={<FaCopy />} rounded>Copy</UiButton>
                                    </div>
                                </div>
                            </Container>
                        </div>
                    </div>
                </div>
                {/* Address Section */}
                <div className='col-span-3'>
                    <div className='mb-4'>
                        <Title xl medium>Deposit Network</Title>
                    </div>
                    <div className='flex flex-col gap-4'>
                        <div>
                            <SelectButton pt={{
                                //@ts-ignore
                                root: '!p-2 rounded border border-theme-icons/15',
                                button(options) {
                                    return {
                                        className: classNames('h-full !bg-transparent !text-theme-emphasis !px-5 !py-2', {
                                            '!bg-theme-bgColor': options?.context.selected
                                        })
                                    }
                                }
                            }} className='mr-4' value={service?.uuid} optionLabel='network' optionValue='uuid' onChange={(e) => setService(() => {
                                return serviceList?.find(item => item.uuid == e.value)
                            })} options={serviceList} />

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
                            <div className='flex items-center justify-center'>
                                {show<QRCodeProps>(QRCode, { value: service?.address as string, size: 230 })}
                            </div>
                        </div>

                    </div>

                    <Note
                        title={<>Send Only {wallet?.curr.code} to this Address !</>}
                        children={<>Sending coin or token other than {wallet?.curr.code} to this Address may result in the loss of your deposit</>}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

export const menuTemplate = (item: Wallet) => {
    return <div className='flex w-fit items-center gap-5'>
        <div className="flex items-center gap-2 py-1 px-3 rounded-[999px]">
            <CryptoIcon width='2.5rem' height='2.5rem' name={item?.curr.curr_name} label={item?.curr.symbol} />
            <Text className='!text-theme-emphasis font-medium'>{item.curr.curr_name}</Text>
        </div>
        {/* <Text variant={'other'} size='12px' className=''>{item.curr.code}</Text> */}
    </div>
}

export const contentTemplate = (wallet: Wallet) => {
    return <div className='flex w-fit items-center gap-5'>
        <div className="flex items-center gap-1 bg-theme-bgContent py-2 px-3 rounded-[999px]">
            <CryptoIcon width='2.2rem' height='2.2rem' size='12px' name={wallet?.curr.curr_name} label={wallet?.curr.symbol} />
            <Text className='!text-theme-emphasis font-medium'>{wallet.curr.curr_name}</Text>
        </div>
        <Text variant={'other'} size='12px' className=''>{wallet.curr.code}</Text>
    </div>
}

interface DepositProps extends PageProps {
    wallets: Wallets;
    addresses?: Addresses;
    wallet?: string
    services: CryptomusService[];
}

export default Deposit
