import { Currencies, Trades, Transactions, User, Wallet, Wallets } from "@/types";
import { PropsWithChildren, createContext, useContext } from "react";

const SpotContext = createContext<Props>({} as any);

export function useSpot() {
    return useContext(SpotContext)
}



const SpotProvider: React.FC<SpotProviderProps> = ({ children, ...values }) => {
    //--- code here ---- //
    return (
        <SpotContext.Provider value={values}>
            {children}
        </SpotContext.Provider>
    );
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
    currency?: Currencies[number]
    setCurrency(value: Currencies[number]): void
}
