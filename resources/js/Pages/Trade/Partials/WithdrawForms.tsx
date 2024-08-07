import Textfield from "@components/Input"
import { Title } from "@components/Trade"
import Select, { SelectProps } from "@components/Trade/Select"
import Tag from "@components/index"
import { CryptomusService, Wallet } from "@typings/index"
import { FC, PropsWithChildren, useEffect, useState } from "react"
import { FaArrowRightLong } from "react-icons/fa6"
import styles from '@styles/pages/trade.module.scss';

import React from 'react';
import Button from "@components/Button"
import { router, useForm, usePage } from "@inertiajs/react"
import { Dialog } from "primereact/dialog"
import { assets, showIf } from "@assets/fn"
import { RxDividerHorizontal } from "react-icons/rx"
import { FaChevronRight, FaLongArrowAltRight } from "react-icons/fa"
import { useConsole } from "@context/AuthenticatedContext"
import { classNames } from "primereact/utils"
import { Avatar } from "primereact/avatar";
import calc from 'number-precision';

const WithdrawForms: React.FC<WithdrawFormsProps> = ({ channel, services = [], wallet }) => {
    //--- code here ---- //
    const [service, setService] = useState<CryptomusService>();
    const [amountErr, setErr] = useState('');
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [total, setTotal] = useState(0);
    const logger = useConsole();


    const { data, setData, post, processing, errors, reset } = useForm({
        amount: 0,
        currency_id: wallet?.curr.id,
        wallet_id: wallet?.id,
        wallet_address: '',
        type: 'wallet',
        charge: 0,
        network: '',
        ecoreuser: null as unknown as string,
    });

    const [toUser, setUser] = useState({
        username: '',
        verified: false,
        photo: '',
        status: 500,
        name: '',
        temp: ''
    });

    useEffect(() => {
        if (data.amount > 0 && channel == 'wallet' && service) {
            setCharge(data.amount, calc.times(wallet?.all_balance.available || 0, 1));
        }
    }, [service, wallet]);

    useEffect(() => {
        if (wallet) {
            if (channel == '@ecore') {
                setService({
                    commission: {
                        fee_amount: '0',
                        percent: '0'
                    },
                    currency: wallet.curr.code,
                    is_available: true,
                    limit: {
                        max_amount: wallet.curr.charges.withdraw_limit_max,
                        min_amount: wallet.curr.charges.withdraw_limit_min
                    },
                    network: ''
                });
                setErr('');
                setData({
                    ...data,
                    currency_id: wallet.curr.id,
                    wallet_id: wallet.id,
                    type: '@ecore'
                })
            }
            else setService(undefined);
        }
    }, [channel, wallet]);

    const onWalletSubmit = (e: any) => {
        e.preventDefault?.();
        post(route('user.crypto.process.withdraw'), {
            onSuccess(page) {
                // router.reload({
                //     only: ['wallets'],
                //     except: ['code']
                // });
            }
        });
        if (visible) setVisible(false);
        else if (visible2) setVisible2(false);
    }

    function setCharge(value: any, balance: any) {
        const charges = wallet?.curr.charges;
        let charge = calc.times((channel !== '@ecore' && charges?.withdraw_charge) || '0.0', 1);
        if (charge && charge > 0) {
            charge = calc.plus(calc.times(value, calc.divide(charge, 100)), ((service?.commission.fee_amount || '0.0') || 0.0))
        }
        //---
        if ((value < calc.times(service?.limit.min_amount || '0.0', 1)) || value > calc.times(service?.limit.max_amount || '100'
            , 1)) {
            setErr(`Min amount is ${service?.limit.min_amount}, Max is ${service?.limit.max_amount}`);
        } else if (wallet && (charge + value) > balance) setErr('Insufficient Funds')
        else if (amountErr) setErr('');

        setTotal(value > 0 ? charge : 0);
    }

    const Amount = <div>
        <Textfield
            label='Amount'
            placeholder="Enter Amount"
            type="number"
            value={data.amount}
            desc={showIf(service && wallet, (
                <span className="flex items-center gap-2">
                    <span>Total Fee</span>
                    <RxDividerHorizontal />
                    <span>{total}</span>
                </span>
            ))}
            errorText={amountErr || errors.amount}
            onChange={(e: any) => {
                let temp = 0;
                let value = e.target.value.trim();
                if (value == '.') value = '0.';
                //------------
                else if (value.startsWith('0')) {
                    if (value.length > 1) {
                        if (value.charAt(1) === '0') value = '0';
                        else if (value.charAt(1) !== '.') value = value.substring(1);
                    }
                } else if (value.startsWith('-')) value = '0';
                else if (value.startsWith('.')) value = '0' + value;
                //----
                temp = value ? calc.times(value, 1) : 0;
                //------------
                if (!service || !wallet) return setData('amount', value);
                const balance = calc.times(wallet.all_balance.available, 1);
                //------
                setCharge(temp, balance);

                setData('amount', value);
            }}
        />
    </div>;

    useEffect(() => {
        setData('network', service?.network || '');
    }, [channel])
    switch (channel) {
        case 'wallet': {
            return (
                <form onSubmit={onWalletSubmit} className="flex flex-col gap-3">
                    <div>
                        <Textfield onChange={() => { }} desc={showIf(service, <>Min: {service?.limit.min_amount}, Max: {service?.limit.max_amount}</>)} errorText={errors.network} label='Network' inputElement={() => {
                            return <Tag element={Select as React.FC<SelectProps<CryptomusService>>} items={services.filter(item => item.currency === wallet?.curr.code)} contentTemplate={(item) => {
                                return <Title bright noPad md><span>{wallet?.curr.code}</span>-<span>{item.network}</span></Title>
                            }} menuItemTemplate={(item) => {
                                return (
                                    <div>
                                        <Title light bright className="gap-2" noPad sm><span>fee</span> <FaArrowRightLong /> {item.commission.fee_amount}</Title>
                                        <Title noPad lg><span>{wallet?.curr.code}</span>-<span>{item.network}</span></Title>
                                    </div>
                                )
                            }}
                                unique="network"
                                outlined
                                className={styles.mobileNetwork}
                                quick
                                placeholder={'Choose a network'}
                                trigger="!bg-transparent"
                                value={services.find(item => item.currency == service?.currency && service.network == item.network)}
                                onSelect={(e: any) => {
                                    // setData('charge', e.value.commission.fee_amount);
                                    setData({
                                        ...data,
                                        network: e.value.network,
                                        charge: e.value.commission.fee_amount,
                                        currency_id: wallet?.curr.id,
                                        wallet_id: wallet?.id
                                    });

                                    setService(e.value);
                                }}
                                container="!px-[8px] !py-[1px]"
                            />
                        }} />
                    </div>
                    <div>
                        <Textfield
                            label='Wallet address'
                            placeholder="Enter wallet address" type="text"
                            errorText={errors.wallet_address}
                            value={data.wallet_address}
                            onChange={(e: any) => setData('wallet_address', e.target.value)}
                        />
                    </div>

                    {Amount}

                    <Button shape="pill" type="button" disabled={processing} onClick={() => {
                        if (data.amount && data.network && data.wallet_address)
                            setVisible(true);
                        else logger.error('Fill in all fields');
                    }} className="justify-center">Continue</Button>

                    <Dialog
                        className="max-w-[350px] w-auto"
                        footer={(props) => <Button onClick={onWalletSubmit} size="normal" bgColor="primary">Confirm</Button>} header="Summary" visible={visible}
                        onHide={() => { if (!visible) return; setVisible(false); }}
                    >
                        {showIf(visible, (
                            <div className="flex flex-col gap-3">
                                <Summary>
                                    <div>
                                        <Title>Network</Title>
                                        <Title bold>{data.network}</Title>
                                    </div>
                                </Summary>

                                <Summary>
                                    <div>
                                        <Title>Amount</Title>
                                        <div className="flex gap-3">
                                            <Title bold>{data.amount}</Title>
                                            <div className="flex items-center gap-1">
                                                <Title>Fee</Title>
                                                <FaLongArrowAltRight />
                                                <Title noPad>{total}</Title>
                                            </div>
                                        </div>
                                    </div>
                                </Summary>

                                <Summary>
                                    <div>
                                        <Title>Wallet Address</Title>
                                        <Title bold>{data.wallet_address}</Title>
                                    </div>
                                </Summary>
                            </div>
                        ))}
                    </Dialog>
                </form>
            )
        }

        case '@ecore': return (
            <form onSubmit={onWalletSubmit} className="flex flex-col gap-3">
                <div>
                    <Textfield desc={<Title normal noPad className={classNames({
                        '!text-danger-400': toUser.status == 500,
                        '!text-warning-400': toUser.status == 400,
                    })}>{toUser.username}</Title>} errorText={errors.ecoreuser} onChange={(e: any) => {
                        const value = e.target.value;
                        setData('ecoreuser', value);
                        //-----------
                        window.axios.get(route('user.transfer.details', { account_no: value }))
                            .then((data) => {
                                // console.log(data);
                                if (data.status === 200) {
                                    if (data.data.verified == 0)
                                        return setUser(data.data);
                                    setUser({
                                        status: 400,
                                        username: 'This user is not verified - username is ' + data.data.username,
                                        verified: data.data.verified == 1,
                                        photo: data.data.photo,
                                        name: data.data.name,
                                        temp: data.data.username
                                    })
                                }
                            }).catch(() => {
                                setUser({
                                    username: 'User not found',
                                    verified: false,
                                    temp: '',
                                    status: 500,
                                    photo: '',
                                    name: ''
                                })
                            })
                    }} label='Ecore Id' placeholder="6 digit ID" />
                </div>
                {Amount}

                <Button type="button" shape="pill" onClick={() => {
                    if (data.amount && data.ecoreuser && toUser.status !== 500) setVisible2(true);
                    else logger.error('Fill in all fields');
                }} disabled={processing} className="justify-center">Continue</Button>

                <Dialog
                    className="max-w-[350px]"
                    footer={(props) => <Button shape="pill" onClick={onWalletSubmit} size="normal" bgColor="primary">Confirm</Button>} header="Summary" visible={visible2}
                    onHide={() => { if (!visible2) return; setVisible2(false); }}
                >
                    {showIf(visible2, (
                        <div className="flex flex-col gap-3">
                            <Summary>
                                <div>
                                    <Title>Account number</Title>
                                    <Title bold>{data.ecoreuser}</Title>
                                </div>
                            </Summary>

                            <Summary>
                                <div className="w-full">
                                    <Title className="items-center">Username <small className={classNames("ml-4", {
                                        //@ts-ignore
                                        '!text-danger-400': toUser.verified == 0,
                                        //@ts-ignore
                                        '!text-warning-400': toUser.verified == 2,
                                        //@ts-ignore
                                        '!text-success-400': toUser.verified == 1,
                                    })}>{toUser.status == 1 ? 'Verified' : 'unverified'}</small></Title>
                                    <div className="flex items-center gap">
                                        <Title bold>{toUser.temp || toUser.username}</Title>
                                        <Avatar className="!rounded-full ml-auto" icon={showIf(toUser.photo, (
                                            <img src={assets(toUser.photo)} />
                                        ), <>{toUser.name.toUpperCase()}</>)} style={{ backgroundColor: 'rgb(var(--color-primary-800))', color: '#ffffff' }} />
                                    </div>
                                </div>
                            </Summary>

                            <Summary>
                                <div>
                                    <Title>Amount</Title>
                                    <div className="flex gap-3">
                                        <Title bold>{data.amount}</Title>
                                        <div className="flex items-center gap-1">
                                            <Title>Fee</Title>
                                            <FaLongArrowAltRight />
                                            <Title noPad>{total}</Title>
                                        </div>
                                    </div>
                                </div>
                            </Summary>

                            <Summary>
                                <div>
                                    <Title>Wallet Address</Title>
                                    <Title bold>{data.wallet_address}</Title>
                                </div>
                            </Summary>
                        </div>
                    ))}
                </Dialog>
            </form>
        )
    }
}

const Summary: FC<PropsWithChildren<{}>> = ({ children }) => {
    return (
        <div className="flex items-center">
            <div><FaChevronRight /></div>
            {children}
        </div>
    )
}

interface WithdrawFormsProps {
    channel: 'wallet' | '@ecore';
    services: CryptomusService[];
    wallet?: Wallet
}

export default WithdrawForms;
