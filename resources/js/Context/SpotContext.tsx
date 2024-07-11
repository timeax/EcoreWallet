import { Currencies, Trades, Transactions, User, Wallet, Wallets } from "@typings/index";
import React, { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { useLive } from "./LiveContext";

//@ts-ignore
const SpotContext = createContext<ExchangeContextProps>();

export function useSpot() {
    //@ts-ignore
    return useContext(SpotContext)
}



const SpotProvider: React.FC<SpotProviderProps> = ({ children, ...values }) => {
    //--- code here ---- //
    const [amount, set1] = useState(0);
    const [processing, setProcessing] = useState(false);
    const [toAmount, set2] = useState(0);
    const [rate, setRate] = useState<ExchangeContextProps['rate']>();

    const [raw, setRaw] = useState({
        toAmount: 0,
        amount: 0,
    });

    const [data, setData] = useState({});

    const addData = (key: any, value?: any) => {
        if (typeof key == 'string') return setData((data) => ({ ...data, [key]: value }));
        if (typeof key == 'function') return setData((data) => key(data));
        setData(key);
    }

    const setAmount = (amount: number) => {
        if (Number.isNaN(amount)) return;
        set1(amount);
        addData('amount', amount);
    }

    const setToAmount = (toAmount: number) => {
        if (Number.isNaN(toAmount)) return;

        set2(toAmount);
        addData('toAmount', toAmount);
    }


    const [last, setLast] = useState(values.wallet);
    return (
        <SpotContext.Provider value={{
            rate, data,
            //@ts-ignore
            setData: addData,
            processing, setProcessing, setTemp: setRaw, tempAmount: raw, setAmount, amount, toAmount, setToAmount, lastFocused: last, setLastFocused: setLast, ...values
        }}>
            <RateController setRate={setRate} />
            {children}
        </SpotContext.Provider>
    );
}

const RateController: FC<{ setRate(v: ExchangeContextProps['rate']): void }> = ({ setRate }) => {
    const { wallet, to, processing } = useSpot();
    const { getRate } = useLive();

    useEffect(() => {
        if (processing) {
            setRate({
                from: getRate(wallet.curr.code, to.curr.code),
                to: getRate(to.curr.code, wallet.curr.code)
            })
        } else {
            setRate({
                from: getRate(wallet.curr.code, to.curr.code),
                to: getRate(to.curr.code, wallet.curr.code)
            })
        }
    }, [processing]);
    return <></>;
}


interface SpotProviderProps extends PropsWithChildren, Props {
    [x: string]: any
}

export default SpotProvider


interface Props {
    wallets: Wallets;
    user: User;
    wallet: Wallet;
    currencies: Currencies;
    to: Wallet
    setTo(value: Wallet): void
    type: 'limit' | 'instant'
    setWallet(value: Wallet): void;
}

interface ExchangeContextProps extends Props {
    to: Wallet;
    amount: number;
    setAmount(n: number): void;
    toAmount: number;
    setToAmount(n: number): void;
    lastFocused: Wallet;
    setLastFocused(wallet: Wallet): void;
    tempAmount: {
        toAmount: number,
        amount: number,
        limit?: number
    }

    setTemp(v: {
        toAmount: number,
        amount: number,
        limit?: number,
    }): void;

    processing?: boolean;
    setProcessing(v: boolean): void
    expire?: string;
    setExpire?(n: string): void
    rate?: {
        from: number;
        to: number
    }

    data: { [x: string]: any };
    setData(data: { [x: string]: any } | string | ((data: any) => any), value?: any): void;
}
