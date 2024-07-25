// import { PusherChannel } from "./../../../node_modules/laravel-echo/src/channel/pusher-channel";
import { AxiosInstance } from "axios";
import Base from "pusher-js/types/src/core/pusher";
import { route as ziggyRoute } from "ziggy-js";
import type CSSProps from "@assets/fn/cssprops";

declare global {
    interface Window {
        axios: AxiosInstance;
        Pusher: typeof Base;
    }
    var route: typeof ziggyRoute;

    var domainName: string;


    interface Empty { }

    type AppElement<T = Empty> = BaseElement & T;

    interface BaseElement extends React.DOMAttributes<any> {
        className?: string;
        children?: React.ReactNode;
        id?: string;
        tabIndex?: number;
        'data-section'?: string | number;
    }

    type Nothing = null | undefined;

    type HTMLTags = [
        "a",
        "abbr",
        "address",
        "area",
        "article",
        "aside",
        "audio",
        "b",
        "base",
        "bdi",
        "bdo",
        "big",
        "blockquote",
        "body",
        "br",
        "button",
        "canvas",
        "caption",
        "cite",
        "code",
        "col",
        "colgroup",
        "data",
        "datalist",
        "dd",
        "del",
        "details",
        "dfn",
        "dialog",
        "div",
        "dl",
        "dt",
        "em",
        "embed",
        "fieldset",
        "figcaption",
        "figure",
        "footer",
        "form",
        "h1",
        "h2",
        "h3",
        "h4",
        "h5",
        "h6",
        "head",
        "header",
        "hgroup",
        "hr",
        "html",
        "i",
        "iframe",
        "img",
        "input",
        "ins",
        "kbd",
        "keygen",
        "label",
        "legend",
        "li",
        "link",
        "main",
        "map",
        "mark",
        "menu",
        "menuitem",
        "meta",
        "meter",
        "nav",
        "noscript",
        "object",
        "ol",
        "optgroup",
        "option",
        "output",
        "p",
        "param",
        "picture",
        "pre",
        "progress",
        "q",
        "rp",
        "rt",
        "ruby",
        "s",
        "samp",
        "script",
        "section",
        "select",
        "small",
        "source",
        "span",
        "strong",
        "style",
        "sub",
        "summary",
        "sup",
        "table",
        "template",
        "tbody",
        "td",
        "textarea",
        "tfoot",
        "th",
        "thead",
        "time",
        "title",
        "tr",
        "track",
        "u",
        "ul",
        "var",
        "video",
        "wbr",
        "webview"
    ];

    type ElementType<T extends ReadonlyArray<unknown>> =
        T extends ReadonlyArray<infer ElementType> ? ElementType : never;

    type StyledProps = {
        //@ts-ignore
        [P in ElementType<typeof CSSProps>]?: CSSProperties[P];
    } & {
        px?: string;
        py?: string;
        mx?: string;
        my?: string;
    };

    type Null = undefined | null;

    interface CryptoColors {
        zero__x: string;
        aave: string;
        algorand: string;
        ankr: string;
        augur: string;
        balancer: string;
        bancor__network: string;
        band__protocol: string;
        basic__attention: string;
        binance: string;
        bitcoin: string;
        bitcoin__cash: string;
        cardano: string;
        celo: string;
        chainlink: string;
        civic: string;
        compound: string;
        cosmos: string;
        curve__dao: string;
        dai: string;
        dash: string;
        decentraland: string;
        district0x: string;
        eos: string;
        ethereum: string;
        ethereum__classic: string;
        filecoin: string;
        kyber__network: string;
        litecoin: string;
        loopring: string;
        maker: string;
        nucypher: string;
        numeraire: string;
        omg__network: string;
        orchid: string;
        polygon: string;
        ren: string;
        skale: string;
        stellar: string;
        storj: string;
        sushiswap: string;
        synthetix: string;
        tezos: string;
        the__graph: string;
        uma: string;
        uniswap: string;
        usdcoin: string;
        wrapped__bitcoin: string;
        yearn__finance: string;
        zcash: string;
    }
}


type MBxParams = {
    header: string;
    body: any[];
    isPhone: boolean;
};
type ChatBoxParams = {
    isAgent?: boolean;
    message: any;
    time?: string;
};

type TkVData = {
    id: string;
    cs: {
        name: string;
        role: string;
    };
    divison: any;
    date: string;
    subject: string;
    category: string;
    status: string;
};

type STData = {
    id: string;
    date: Date;
    subject: string;
    status: string;
};

type UtrackType = {
    zimg: number;
    ztxtStyl: boolean;
    zB: number;
    killStyle: boolean;
    newbie: Node[];
    lastRange?: Range;
    zCtrl: boolean;
    killUpload: boolean;
};

type KYCAtom = {
    label: string
    optional?: boolean
    value?: any
}

type KYCPersonalkeys = 'fname' | "lname" | 'email' | 'phone' | "dob" | "tgram"
type KYCAddresskeys = 'home1' | "home2" | 'city' | 'state' | "country" | "zip"

type KYCPersonal = {
    [key in KYCPersonalkeys]: KYCAtom
}
type KYCAddress = {
    [key in KYCAddresskeys]: KYCAtom
}


type KYCCategory = {
    personal: {
        title: string;
        info: string;
        fields: KYCPersonal;

    };
    address: {
        title: string;
        info: string;
        fields: KYCAddress
    };
    document: {
        title: string;
        info: any;
        fields?: string[];
    };
};


type KYCTFormParams = {
    header: string;
    info: string;
    fields: KYCCategory;
};

type CatKey = "personal" | "address" | "document";

type FormDataType = KYCAddress & KYCPersonal & {
    front: any, back: any
}



// type FormDataTyp = {
//     name: string;
//     value: any;
//     required: boolean;
// }[];
