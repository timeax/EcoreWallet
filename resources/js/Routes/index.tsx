import { FaChartPie } from "react-icons/fa";
import { MdEventRepeat, MdWallet } from "react-icons/md";
import { GiTrade } from "react-icons/gi";
import { GrHistory } from "react-icons/gr";
import { IoIosHelpCircle } from "react-icons/io";
import { PiHandDepositFill, PiHandWithdrawFill } from "react-icons/pi";
import { MdAddShoppingCart } from "react-icons/md";
import { CgArrowsExchange } from "react-icons/cg";
import { TbExchange } from "react-icons/tb";
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

export type Routes = Route[];

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
        showOnSidebar: true
    },

    {
        id: 'history',
        label: 'Transactions',
        icon: <MdWallet />,
        route: 'user.wallets',
        showOnSidebar: true
    },

    {
        id: 'settings',
        label: 'Settings',
        icon: <GrHistory />,
        route: 'user.settings.all',
        showOnSidebar: true,
        bottombar: true
    },

    {
        id: 'support',
        label: 'Support',
        icon: <IoIosHelpCircle />,
        route: 'user.admin.support',
        showOnSidebar: true,
        bottombar: true
    },

    {
        id: 'deposit',
        label: 'Deposit',
        icon: <PiHandDepositFill />,
        route: 'user.crypto.deposit',
    },
    {
        id: 'withdraw',
        label: 'Withdraw',
        icon: <PiHandWithdrawFill />,
        route: 'user.crypto.withdraw',
    },

    {
        id: 'buy',
        label: 'Buy',
        icon: <MdAddShoppingCart />,
        route: 'user.crypto.trades.buy',
    },
    {
        id: 'sell',
        label: 'Sell',
        icon: <CgArrowsExchange />,
        route: 'user.crypto.trades.sell',
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

export function getSidebar() {
    const all = routes.filter(item => item.showOnSidebar);
    return [
        all.filter(item => !item.bottombar),
        all.filter(item => item.bottombar),
    ]
}


export default routes;
