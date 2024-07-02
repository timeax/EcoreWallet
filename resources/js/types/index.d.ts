

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};



import JJ from "../../../db/db.json";

export type Wallet = (typeof JJ)["wallets"][number] & {
    curr: Currencies[number] & {
        charges: {
            withdraw_limit_min: string;
            withdraw_limit_max: string;
            withdraw_charge: string
        }
    };
    all_balance: {
        total: string;
        available: string;
        escrow: string
    }
};

export interface Address {
    id: number;
    user_id: number;
    currency_id: number;
    wallet_id: number;
    address: string;
    network: string;
    uuid: string;
}

export interface AddressState extends Address {
    isAvailable: boolean;
}

export type Wallets = Wallet[];
export type Trades = (typeof JJ)["trades"];
export type Transactions = Array<{
    id: string,
    trnx: string,
    user_id: string;
    amount: string;
    charge: string;
    currency_id: string;
    remark: string;
    ref: string;
    details: string | null;
    status: 'pending' | 'success';
    type: '+' | '-';
    created_at: string;
    updated_at: any;
    currency: Currencies[number];
}>

export type Transaction = Transactions[number];

export type Currencies = (typeof JJ)["currencies"];
export type User = typeof JJ['users'][number]
export type Addresses = Array<Address>


export type CryptomusService = {
    network: string;
    currency: string;
    is_available: boolean;
    limit: {
        min_amount: string;
        max_amount: string;
    },

    commission: {
        fee_amount: string;
        percent: string;
    }
}
