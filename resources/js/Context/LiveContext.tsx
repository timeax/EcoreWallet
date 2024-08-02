import { Currencies, Wallets } from "@typings/index";
import { createContext, useContext, useEffect, useState } from "react";
import Calc from 'number-precision';
import React from 'react';
import { getDate } from "@assets/fn";

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
    sparkline_in_7d: { price: number[] };
    total_volume: number;
    circulating_supply: number;
    market_cap: number;
    max_supply: number
}>

export type HistoricalData = Curr<{ x: string, y: number }[]>
//-----------
interface LiveData {
    rates?: Rate[];
    marketData?: MarketData[],
    historicalData?: HistoricalData;
    setHistoricalId?: (id: string | number) => void;
    setHistoricalRange?: (id: string) => void;
    range: string;
    currencies: Currencies;
    balance: Balance;
    convert(from: string, to: string, amount: number | string, round?: number, fee?: number): number;
    getRate(from: string, to: string, fee?: number): number
    change(amount: number, rate: number, round?: number): number;
    setCurr(value: string | Currencies[number]): void
    currRate(from: string, to?: string): Rate['data'][number] | undefined;
    currency?: Currencies[number];
    wallets: Wallets
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
function getNext(range: Range, prev: string) {

}

function historicalToChart(range: Range, data: Array<[date: string, prices: number]>): HistoricalData['data'] {
    data.forEach(item => {

    })

    if (range == "1d") return data.map(item => ({ x: item[0], y: item[1] }));
    return data.map(item => ({ x: item[0], y: item[1] }));
}

const LiveFeed: React.FC<LiveContextProviderProps> = ({ range = '1d', historicalData: h, marketData: m, rates: r, children, historicalId, currencies, wallets }) => {
    //--- code here ---- //
    const [historicalData, setHistoricalData] = useState<HistoricalData | undefined>();
    const [marketData, setMarketData] = useState<MarketData[]>([]);
    const [rates, setRates] = useState<Rate[]>([]);

    const [to, setTo] = useState<string>();
    //@ts-ignore
    const [currency, setDefault] = useState<Currencies[number]>();

    const [id, setId] = useState(historicalId);
    const [historicalRange, setRange] = useState(range);

    const [balance, setBalance] = useState<Balance>();

    const key = 'defaultCurrency';
    useEffect(() => {
        if (!historicalRange) setRange(range || '1d');
        //---------
        const saved = window.localStorage.getItem(key) || '';
        setCurr(saved);
    }, []);


    useEffect(() => {
        if (h && historicalRange) {
            if (id)
                window.axios.get(route('data.historical', { id, range: historicalRange })).then((value) => {
                    if (value.status == 200) {
                        if (!Array.isArray(value.data)) return;
                        const id = value.data[0]?.currency_id;

                        if (!id) return;

                        const data = value.data.map(item => {
                            let data = JSON.parse(item.data);
                            return data.live || data.prices
                        });
                        //---------
                        const history: HistoricalData = {
                            id,
                            data: historicalToChart(historicalRange, data.flat())
                        }
                        setHistoricalData(history);
                    }
                });
        }
    }, [id, historicalRange]);

    function updateBalance(rates: Rate[]) {
        //@ts-ignore
        const bData: Balance = {
            get data() {
                if (this.wallets.length === 0) return null as unknown as Balance['data'];
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
            let all = rates.find(item => item.id == currID);
            let rate: Rate['data'][number] | undefined;
            if (all) {
                let temp = all.data.find(item => item.to === currency?.code);
                rate = temp || all.data.find(item => item.to === (currency?.code || 'USD'));
            }
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
    }

    function run(ignore?: boolean) {
        window.axios.get(route('data.market')).then((value) => {
            if (value.status === 200) {
                let time = null;
                if (Array.isArray(value.data)) {
                    const data = value.data.map((item, i) => {
                        if (!ignore) i == 0 && (time = new Date(item.updated_at).getTime());
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
                        if (remaining > 0) setTimeout(() => run(), remaining * 60000);
                        else {
                            run(true);
                            remaining *= -1;
                            //-----------
                            setTimeout(() => run(), secs - (remaining + 60000));
                        }
                    }
                }
            }
        })
    }

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
                //---------
                setRates(rates);
            }
        }).catch(err => { });
    }

    useEffect(() => {
        if (r || wallets) {
            if (rates) updateBalance(rates)
            //------------
            const interval = setInterval(() => rateUpdater(), 5000);
            return () => clearInterval(interval);
        }
    }, [rates])

    const time = 5000 * 60;
    useEffect(() => {
        if (m && currencies) {
            if (marketData.length === 0) run();
            const interval = setInterval(() => run(marketData.length > 0), time);
            return () => clearInterval(interval);
        }
    }, [marketData]);

    useEffect(() => {
        if (currency) {
            setTo(currency?.code)
            if (rates) updateBalance(rates);
        }
    }, [currency]);


    const currRate: LiveData['currRate'] = (from, to = currencies.find(item => (item.default as unknown as number) == 1)?.code || currency?.code || 'USD') => {
        let curr = currencies?.find(item => {
            if (typeof from == 'number') return item.id === (from + '');
            return item.code == from;
        });

        if (curr) {
            if (rates) {
                const rate = rates.find(item => item.id == curr.id)?.data.find(item => item.to == to);
                return rate;
            }
        } else throw Error('Conversion Failed');
    }

    const getRate: LiveData['getRate'] = (from, to, fee = 0) => {
        let curr = currencies?.find(item => {
            if (typeof from == 'number') return item.id === (from + '');
            return item.code == from;
        });

        if (curr) {
            if (rates) {
                const rate = rates.find(item => item.id == curr.id)?.data.find(item => item.to == to);
                if (rate) {
                    const value = Calc.round(rate.course, 8);
                    if (fee == 0) return value;
                    //------
                    let charges = Calc.times(Calc.divide(fee, 100), value);
                    //--------
                    return Calc.round(Calc.minus(value, charges), 8);
                }
            }
        } else throw Error('Conversion Failed')

        return 0;
    }

    const convert: LiveData['convert'] = (from, to, amount, round = 8, fee = 0) => {
        const rate = getRate(from, to, fee)

        if (rate) {
            return Calc.round(Calc.times(rate, amount), round)
        }

        return Calc.round(amount, round)
    }

    const change: LiveData['change'] = (amount, rate, round = 8) => {
        return Calc.round(Calc.times(rate, amount), round)
    }

    const setCurr: LiveData['setCurr'] = (value) => {
        var curr: Currencies[number] | undefined;
        //@ts-ignore
        if (typeof value === 'object') curr = value;
        else if (Number.isNaN(parseInt(value))) curr = currencies?.find(item => item.code == value);
        else if (value) curr = currencies?.find(item => item.id == value);
        //@ts-ignore
        if (!curr) curr = currencies.find(item => item.default == 1);
        //---------------
        if (curr) setDefault(curr);

        window.localStorage.setItem(key, curr?.code || 'USD');
    }

    return (
        <Context.Provider value={{
            rates,
            marketData,
            historicalData,
            setHistoricalId: (id) => setId(id as any),
            setHistoricalRange: (range) => setRange(range as any),
            change,
            currencies,
            range: historicalRange,
            currency,
            //@ts-ignore
            balance,
            convert,
            getRate,
            setCurr,
            wallets,
            currRate
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
    range?: Range
    currencies: Currencies;
    wallets: Wallets;
}

export default LiveFeed

type Range = '1d' | '1w' | '2w' | '1m' | '1y';
