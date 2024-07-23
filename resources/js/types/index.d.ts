

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
            exchange_charge: string
            deposit_charge: string
            withdraw_charge_type: 'fixed' | '%'
            exchange_charge_type: 'fixed' | '%'
            deposit_charge_type: 'fixed' | '%'
        }
    };
    transactions?: Transactions;
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
    status: 'pending' | 'success' | 'failed' | '';
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


type Deposits = {
    id: any;
    user_id: any;
    currency_id: any;
    wallet_address: string;
    cryptomus_uuid: string;
    status: string;
}[];

type Withdrawals = {
    trx: string;
    user_id: any;
    amount: number;
    charge: number;
    total_amount: number;
    wallet_address: string;
    currency_id: string;
    ref: string;
    status: string;
    reject_reason: string;
}[];

type Exchanges = {
    transaction_id: any;
    user_id: any;
    type: string;
    amount: number;
    charges: number;
    total: number;
    to: string;
    from: string;
    rate: number
    limit_rate?: number
    status: string;
    expire_in: string;
    updated_at: string;
    created_at: string;
}[];

type Transfer = {
    user_id: any;
    to_user: any;
    account_no: number;
    currency_id: any;
    transaction_ref: string;
    created_at: string;
    updated_at: string;
    status: 'pending' | 'failed' | 'success'
    amount: number;
}
