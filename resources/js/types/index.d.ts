

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};



import JJ from "../../../db/db.json";

export type Wallet = (typeof JJ)["wallets"][number] & {
    curr: Currencies[number];
};

export type Wallets = Wallet[];
export type Trades = (typeof JJ)["trades"];
export type Transactions = (typeof JJ)["transactions"];
export type Currencies = (typeof JJ)["currencies"];
export type User = typeof JJ['users'][number]
