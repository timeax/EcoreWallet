import Textfield from "@components/Input"
import { Title } from "@components/Trade"
import Select, { SelectProps } from "@components/Trade/Select"
import Tag from "@components/index"
import { CryptomusService, Wallet } from "@typings/index"
import { FC, PropsWithChildren, useEffect, useState } from "react"
import { FaArrowRightLong } from "react-icons/fa6"
import styles from '@styles/pages/trade.module.scss';

import React from 'react';
import UiButton from "@components/Button"
import { useForm } from "@inertiajs/react"
import { Button } from "primereact/button"
import { Dialog } from "primereact/dialog"
import { showIf } from "@assets/fn"
import { RxDividerHorizontal } from "react-icons/rx"
import { FaChevronRight, FaLongArrowAltRight } from "react-icons/fa"
import { Message } from "primereact/message"

const WithdrawForms: React.FC<WithdrawFormsProps> = ({ channel, services = [], wallet }) => {
    //--- code here ---- //
    const [service, setService] = useState<CryptomusService>();
    const [amountErr, setErr] = useState('');
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [total, setTotal] = useState(0);

    const [err, setError] = useState<string>();

    const { data, setData, post, processing, errors, reset } = useForm({
        amount: null as unknown as number,
        currency_id: wallet?.curr.id,
        wallet_id: wallet?.id,
        wallet_address: '',
        type: 'wallet',
        charge: 0,
        network: '',
        ecoreuser: null as unknown as string,
    });

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
        post(route('user.crypto.process.withdraw'));
        if (visible) setVisible(false);
        else if (visible2) setVisible2(false);
    }

    const Amount = <div>
        <Textfield
            label='Amount'
            placeholder="Enter Amount"
            type="number"
            desc={showIf(service && wallet, (
                <span className="flex items-center gap-2">
                    <span>Total Fee</span>
                    <RxDividerHorizontal />
                    <span>{total}</span>
                </span>
            ))}
            errorText={amountErr || errors.amount}
            onChange={(e: any) => {
                const value = parseFloat(e.target.value || '0.0') || 0.0;
                if (!service || !wallet) return;
                const balance = parseFloat(wallet.all_balance.available);
                //------
                const charges = wallet?.curr.charges;
                let charge = parseFloat((channel !== '@ecore' && charges?.withdraw_charge) || '0.0');
                if (charge && charge > 0) {
                    charge = (value * (charge / 100)) + (parseFloat(service?.commission.fee_amount || '0.0') || 0.0)
                }
                //---
                if ((value < parseFloat(service?.limit.min_amount || '0.0')) || value > parseFloat(service?.limit.max_amount || '100'
                )) {
                    setErr(`Min amount is ${service?.limit.min_amount}, Max is ${service?.limit.max_amount}`);
                } else if (wallet && (charge + value) > balance) setErr('Insufficient Funds')
                else if (amountErr) setErr('');

                setTotal(value > 0 ? charge : 0);

                setData('amount', value);
            }}
        />
    </div>;
    switch (channel) {
        case 'wallet': return (
            <form onSubmit={onWalletSubmit} className="flex flex-col gap-3">
                <div>
                    {showIf(err, <Message className="w-full !justify-start" severity="warn" text={err} />)}
                </div>
                <div>
                    <Textfield desc={showIf(service, <>Min: {service?.limit.min_amount}, Max: {service?.limit.max_amount}</>)} errorText={errors.network} label='Network' inputElement={() => {
                        return <Tag element={Select as React.FC<SelectProps<CryptomusService>>} items={services.filter(item => item.currency === wallet?.curr.code)} contentTemplate={(item) => {
                            return <div><span>{wallet?.curr.code}</span>-<span>{item.network}</span></div>
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
                            trigger="!bg-transparent"
                            value={service}
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

                        onChange={(e: any) => setData('wallet_address', e.target.value)}
                    />
                </div>

                {Amount}

                <Button type="button" disabled={processing} onClick={() => {
                    if (data.amount && data.network && data.wallet_address)
                        setVisible(true);
                    else !err && setError('Fill in all fields');
                }} className="justify-center">Continue</Button>

                <Dialog
                    className="max-w-[350px]"
                    footer={(props) => <UiButton onClick={onWalletSubmit} size="normal" bgColor="primary">Confirm</UiButton>} header="Summary" visible={visible}
                    style={{ width: '50vw' }}
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

        case '@ecore': return (
            <form onSubmit={onWalletSubmit} className="flex flex-col gap-3">
                <div>
                    <Textfield errorText={errors.ecoreuser} onChange={(e: any) => {
                        const value = e.target.value;
                        setData('ecoreuser', value);
                        //-----------

                    }} label='Ecore Id' placeholder="6 digit ID" />
                </div>
                {Amount}

                <Button type="button" onClick={() => {
                    if (data.amount && data.ecoreuser) setVisible2(true);
                    else !err && setError('Fill in all fields');
                }} disabled={processing} className="justify-center">Continue</Button>

                <Dialog
                    className="max-w-[350px]"
                    footer={(props) => <UiButton onClick={onWalletSubmit} size="normal" bgColor="primary">Confirm</UiButton>} header="Summary" visible={visible2}
                    style={{ width: '50vw' }}
                    onHide={() => { if (!visible2) return; setVisible2(false); }}
                >
                    {showIf(visible2, (
                        <div className="flex flex-col gap-3">
                            <Summary>
                                <div>
                                    <Title>Send To</Title>
                                    <Title bold>{data.ecoreuser}</Title>
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
            <div>
                {children}
            </div>
        </div>
    )
}

interface WithdrawFormsProps {
    channel: 'wallet' | '@ecore';
    services: CryptomusService[];
    wallet?: Wallet
}

export default WithdrawForms;
