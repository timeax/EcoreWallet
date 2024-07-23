import { Currencies, Trades, Transactions, User, Wallet, Wallets } from "@typings/index";
import React, { FC, PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { useLive } from "./LiveContext";

//@ts-ignore
const SpotContext = createContext<ExchangeContextProps>();

export function useSpot() {
    //@ts-ignore
    return useContext(SpotContext)
}



const SpotProvider: React.FC<SpotProviderProps> = ({ children, wallets: items, ...values }) => {
    //--- code here ---- //
    const [fields, setFields] = useState<ExchangeContextProps['fields']>({
        from: {
            converted: 0,
            input: ''
        },

        limit: {
            converted: 0,
            input: ''
        },

        to: {
            converted: 0,
            input: ''
        },
        time: {
            converted: 0,
            input: ''
        }
    });
    const [rates, setRates] = useState<ExchangeContextProps['rates']>({ from: { fiat: { symbol: '$', rate: 0 }, rate: 0 }, to: { fiat: { symbol: '$', rate: 0 }, rate: 0 } });
    const [wallets, setWallets] = useState<ExchangeContextProps['wallets']>({
        from: items.from,
        to: items.to
    });

    const { getRate, rates: liveData } = useLive();

    useEffect(() => {
        if (rates) {
            setRates(fns.getRate('from', 'to'))
        }
    }, [liveData, wallets]);

    const fns: ContextFn = {
        getKey(key) {
            return key == 'from' ? 'to' : 'from';
        },
        getField(key) {
            return fields[key];
        },

        setField(key, value) {
            setFields((data) => {
                if (key == 'from' || key == 'to')
                    for (const key in data) {
                        if (Object.prototype.hasOwnProperty.call(data, key)) {
                            //@ts-ignore
                            const element = data[key];
                            element.current = false;
                        }
                    }

                return {
                    ...data,
                    [key]: {
                        ...data[key],
                        [key == 'time' ? 'timer' : 'input']: value,
                        current: true
                    }
                }
            })
        },

        setWallet(key, wallet) {
            setWallets((items) => {
                return {
                    ...items,
                    [key]: wallet
                }
            })
        },

        convert(key, value) {
            setFields((data) => {
                return {
                    ...data,
                    [key]: {
                        ...data[key],
                        converted: value
                    }
                }
            })
        },

        getRate(...keys) {
            let value: ExchangeContextProps['rates'] = {} as any;
            //@ts-ignore
            let def = values.list.currencies.find(item => item.default == 1) as unknown as Currencies[number];
            keys.forEach((key: WalletId) => {
                //@ts-ignore
                let opp: typeof key = key == 'from' ? 'to' : 'from';
                value = {
                    ...value,
                    [key]: {
                        fiat: {
                            symbol: def.symbol,
                            rate: getRate(wallets[key].curr.code, def.code)
                        },
                        rate: getRate(wallets[key].curr.code, wallets[opp].curr.code)
                    }
                }
            });

            return value;
        },

        getCurrent() {
            if (fields.from.current) return { ...fields.from, id: 'from' };
            if (fields.limit.current) return { ...fields.from, id: 'from' };
            if (fields.to.current) return { ...fields.to, id: 'to' };
            return { ...fields.from, id: 'from' };
        },

        snap() {
            return {
                amount: fields.from.converted,
                toAmount: fields.to.converted,
                limit: fields.limit.converted || parseFloat(fields.limit.input || '0'),
                rates: fns.getRate('from', 'to'),
                expire: fields.time.timer
            }
        },
    }

    return (
        <SpotContext.Provider value={{ ...values, ...fns, wallets, rates, fields }}>
            {children}
        </SpotContext.Provider>
    );
}

interface SpotProviderProps extends PropsWithChildren, Props {
    [x: string]: any
}

export default SpotProvider


interface Props {
    list: {
        wallets: Wallets,
        currencies: Currencies
    };
    type: 'instant' | 'limit';
    user: User;
    wallets: {
        from: Wallet,
        to: Wallet
    },
}

export type WalletType = 'to' | 'from' | 'limit' | 'time';
export type WalletId = 'to' | 'from';

type Timer = { label: string, value: string }

interface ExchangeContextProps extends Props, ContextFn {
    fields: {
        [P in WalletType]: Field
    }
    readonly rates: {
        from: Rate;
        to: Rate
    }
}

interface Rate {
    fiat: {
        symbol: string;
        rate: number
    },

    rate: number
}

type Field = {
    input?: string;
    converted: number;
    timer?: Timer;
    current?: boolean
}

interface ContextFn {
    setField(key: WalletType, value: any): void;
    ///
    convert(key: WalletType, value: any): void;
    //
    getField(key: WalletType): {
        input?: string;
        converted: number;
    };
    setWallet(key: keyof Props['wallets'], wallet: Wallet): void
    getRate<T extends keyof Props['wallets']>(...keys: Array<T>): Record<T, Rate>;
    snap(): SnapData;
    getKey(key: WalletId): WalletId;
    getCurrent(): Field & { id: WalletType };
}

export interface SnapData { amount: number, toAmount: number, limit: number, expire?: Timer, rates: ExchangeContextProps['rates'] }
