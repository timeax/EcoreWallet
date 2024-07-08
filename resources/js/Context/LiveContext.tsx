import { Currencies, Wallets } from "@typings/index";
import { createContext, useContext, useEffect, useState } from "react";
import Calc from 'number-precision';

Calc.enableBoundaryChecking(false);
//@ts-ignore
const Context = createContext<LiveData>();

type Curr<T> = {
    id: string;
    data: T
    //------
};

export type Rate = Curr<{
    from: string;
    to: string;
    /**
     * This is the exchange rate to be converted to double
     */
    course: string
}[]>

export type MarketData = Curr<{
    current_price: number;
    high_24h: number;
    low_24h: number;
    price_change_percentage_24h: number;
    image: string;
    sparkline_in_7d: { price: number[] }
}>

export type HistoricalData = Curr<[date: number, price: number][]>
//-----------
interface LiveData {
    rates?: Rate[];
    marketData?: MarketData[],
    historicalData?: HistoricalData;
    setHistoricalId?: (id: string | number) => void;
    setHistoricalRange?: (id: string) => void;
    currencies?: Currencies;
    balance: Balance;
    convert(from: string | number, to: string, amount: number | string, round?: number): number;
    getRate(from: string, to: string): number
}

interface Balance {
    readonly data: {
        readonly total: number;
        readonly available: number;
        readonly pending: number;
    }

    wallets: {
        id: string;
        total: number;
        available: number;
        pending: number;
    }[]
}

export function useLive() {
    return useContext(Context);
}

import React from 'react';

const LiveFeed: React.FC<LiveContextProviderProps> = ({ range = '1d', historicalData: h, marketData: m, rates: r, children, historicalId, currencies, wallets }) => {
    //--- code here ---- //
    const [historicalData, setHistoricalData] = useState<HistoricalData | undefined>();
    const [marketData, setMarketData] = useState<MarketData[]>([]);
    const [rates, setRates] = useState<Rate[]>([]);

    const [id, setId] = useState(historicalId);
    const [historicalRange, setRange] = useState(range);

    const [timer, setTimer] = useState<any>();
    const [timer2, setTimer2] = useState<any>();

    const [balance, setBalance] = useState<Balance>();
    const last = null;

    useEffect(() => {
        if (h) {
            if (id)
                window.axios.get(route('data.historical', { id: historicalId, range })).then((value) => {
                    if (value.status == 200) {
                        if (!Array.isArray(value.data)) return;
                        const id = value.data[0]?.currency_id;

                        if (!id) return;

                        const data = value.data.map(item => JSON.parse(item.data).prices);
                        //---------
                        const history: HistoricalData = {
                            id,
                            data: data.flat()
                        }

                        setHistoricalData(history);
                    }
                });
        }
    }, [id, historicalRange]);


    useEffect(() => {
        function run(ignore?: boolean) {
            window.axios.get(route('data.market')).then((value) => {
                if (value.status === 200) {
                    let time = null;
                    if (Array.isArray(value.data)) {
                        const data = value.data.map((item, i) => {
                            if (!ignore && !timer2 && i == 0) time = new Date(item.updated_at).getTime();
                            return ({
                                id: item.currency_id,
                                data: (JSON.parse(item.data)),
                            })
                        });

                        setMarketData(data);

                        if (time) {
                            const now = Date.now();
                            //---------
                            let elapsed = now - time;
                            let inMins = elapsed / 600;
                            let remaining = 15 - inMins;
                            ///
                            let secs = 15 * 60000;
                            //--------
                            if (remaining > 0) {
                                setTimeout(() => {
                                    setTimer2(setInterval(() => {
                                        run();
                                    }, secs + 4000));
                                }, remaining * 60000);
                            } else {
                                run(true);
                                remaining *= -1;
                                //-----------
                                setTimeout(() => {
                                    setTimer2(setInterval(() => {
                                        run();
                                    }, secs + 4000));
                                }, secs - (remaining + 60000));
                            }
                        }
                    }
                }
            })
        }

        if (timer2) clearInterval(timer2);
        if (m) run();

        if (timer) clearInterval(timer);

        function rateUpdater() {
            window.axios.get(route('data.rates')).then((value) => {
                if (value.status == 200) {
                    if (!Array.isArray(value.data)) return;

                    const rates = value.data.map(item => {
                        let rates = JSON.parse(item.rates)
                        let id = item.currency_id

                        return {
                            id,
                            data: rates
                        }
                    }) as Rate[];

                    //@ts-ignore
                    const bData: Balance = {
                        get data() {
                            return this.wallets.reduce((p, c) => {
                                return {
                                    available: Calc.round(Calc.plus(c.available, p.available), 3),
                                    id: c.id,
                                    pending: Calc.round(Calc.plus(c.pending, p.pending), 3),
                                    total: Calc.round(Calc.plus(c.total, p.total), 3)
                                };
                            });
                        },

                        wallets: []
                    };

                    wallets.forEach(item => {
                        let { id: currID, code: name } = item.curr;
                        //-----------
                        let rate = rates.find(item => item.id == currID)
                            ?.data.find(item => item.to === 'USD');
                        //=============
                        if (rate) {
                            const { total, available, escrow } = item.all_balance;
                            const bDatatotal = Calc.round(Calc.times(total, rate.course), 8);
                            const bDataavailable = Calc.round(Calc.times(available, rate.course), 8);
                            const bDatapending = Calc.round(Calc.times(escrow, rate.course), 8);

                            bData.wallets.push({
                                available: bDataavailable,
                                total: bDatatotal,
                                pending: bDatapending,
                                id: item.id,
                            });
                        }
                    });


                    if (bData.wallets) setBalance(bData);
                    //---------
                    setRates(rates);
                }
            }).catch(err => { });
        }

        if (r || wallets) rateUpdater();
        setTimer(setInterval(() => {
            if (r || wallets) rateUpdater();
        }, 5000));


    }, []);


    return (
        <Context.Provider value={{
            rates,
            marketData,
            historicalData,
            setHistoricalId: (id) => setId(id as any),
            setHistoricalRange: (range) => setRange(range as any),
            currencies,
            //@ts-ignore
            balance,
            convert(from, to, amount, round = 8) {
                let curr = currencies?.find(item => {
                    if (typeof from == 'number') return item.id === (from + '');
                    return item.code == from;
                });

                if (curr) {
                    if (rates) {
                        const rate = rates.find(item => item.id == curr.id)?.data.find(item => item.to == to);
                        if (rate) {
                            return Calc.round(Calc.times(rate.course, amount), round)
                        }
                    }
                } else throw Error('Conversion Failed')

                return Calc.round(amount, round)
            },
            getRate(from, to) {
                let curr = currencies?.find(item => {
                    if (typeof from == 'number') return item.id === (from + '');
                    return item.code == from;
                });

                if (curr) {
                    if (rates) {
                        const rate = rates.find(item => item.id == curr.id)?.data.find(item => item.to == to);
                        if (rate) return Calc.round(rate.course, 8);
                    }
                } else throw Error('Conversion Failed')

                return 0;
            },
        }}>
            {children}
        </Context.Provider>
    );
}


interface LiveContextProviderProps extends React.PropsWithChildren {
    rates?: boolean;
    marketData?: boolean;
    historicalData?: boolean;
    historicalId?: string;
    range?: '1d' | '1w' | '2w' | '1m' | '1y';
    currencies?: Currencies;
    wallets: Wallets;
}

export default LiveFeed
