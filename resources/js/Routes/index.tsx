import { FaChartPie } from "react-icons/fa";
import { MdCurrencyExchange, MdEventRepeat, MdWallet } from "react-icons/md";
import { GiTrade } from "react-icons/gi";
import { GrConfigure, GrHistory } from "react-icons/gr";
import { IoIosHelpCircle } from "react-icons/io";
import { PiHandDepositFill, PiHandWithdrawFill } from "react-icons/pi";
import { MdAddShoppingCart } from "react-icons/md";
import { CgArrowsExchange } from "react-icons/cg";
import { TbExchange } from "react-icons/tb";
import { RiFundsFill } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { VscHistory } from "react-icons/vsc";
export interface Route {
    id: string;
    label: string;
    route: string;
    icon: React.ReactNode;
    showOnSidebar?: boolean;
    bottombar?: boolean;
    parent?: BreadCrumbs | BreadCrumbs[]
}

interface BreadCrumbs {
    label: string;
    route: string
};

const fake: Route = {
    id: 'fake',
    icon: '',
    label: '',
    route: '',
}

export type Routes = Route[] & { byId(id: string): Route };
//@ts-ignore
const routes: Routes = [
    {
        id: 'dashboard',
        label: 'Overview',
        icon: <FaChartPie />,
        route: 'user.dashboard',
        showOnSidebar: true
    },

    {
        id: 'wallets',
        label: 'Wallets',
        icon: <MdWallet />,
        route: 'user.wallets',
        showOnSidebar: true
    },

    {
        id: 'trades',
        label: 'Trades',
        icon: <GiTrade />,
        route: 'user.crypto.trades',
        showOnSidebar: false
    },

    {
        id: 'swap',
        label: 'Swap',
        icon: <MdCurrencyExchange />,
        route: 'user.crypto.swap',
        showOnSidebar: true
    },

    {
        id: 'fund',
        label: 'Fund',
        icon: <RiFundsFill />,
        route: 'user.crypto.deposit',
        showOnSidebar: true
    },

    {
        id: 'withdraw',
        label: 'Withdraw',
        icon: <BiMoneyWithdraw />,
        route: 'user.crypto.withdraw',
        showOnSidebar: true
    },

    {
        id: 'history',
        label: 'History',
        icon: <VscHistory />,
        route: 'user.crypto.history',
        showOnSidebar: true
    },

    {
        id: 'settings',
        label: 'Settings',
        icon: <GrConfigure />,
        route: 'user.settings.all',
        showOnSidebar: true,
        bottombar: true
    },

    {
        id: 'support',
        label: 'Support',
        icon: <IoIosHelpCircle />,
        route: 'user.support',
        showOnSidebar: true,
        bottombar: true
    },

    {
        id: 'buy',
        label: 'Buy',
        icon: <MdAddShoppingCart />,
        route: 'user.crypto.trades.spot',
    },
    {
        id: 'sell',
        label: 'Sell',
        icon: <CgArrowsExchange />,
        route: 'user.crypto.trades.spot',
    },
    {
        id: 'exchange',
        label: 'Exchange',
        icon: <TbExchange />,
        route: 'user.crypto.trades.exchange',
    },
    {
        id: 'recurring',
        label: 'Recurring Buys',
        icon: <MdEventRepeat />,
        route: 'user.crypto.trades.recurring',
    },

]

routes.byId = function (id) {
    return this.find(item => item.id === id) || fake;
}

export function routeById(id: string) {
    return routes.find(item => item.id === id) || fake;
}

export function getSidebar() {
    const all = routes.filter(item => item.showOnSidebar);
    return [
        all.filter(item => !item.bottombar),
        all.filter(item => item.bottombar),
    ]
}


export default routes;
