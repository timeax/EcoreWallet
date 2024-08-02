import { FaChartPie } from "react-icons/fa";
import { MdCurrencyExchange, MdEventRepeat, MdWallet } from "react-icons/md";
import { GiTrade } from "react-icons/gi";
import { GrConfigure, GrHistory } from "react-icons/gr";
import { IoIosHelpCircle } from "react-icons/io";
import { MdAddShoppingCart } from "react-icons/md";
import { CgArrowsExchange } from "react-icons/cg";
import { TbExchange } from "react-icons/tb";
import { RiFundsFill } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { VscHistory } from "react-icons/vsc";
import dashboard from '@styles/pages/dashboard.module.scss';



export interface Route {
    id: string;
    label: string;
    route: string;
    icon: React.ReactNode;
    showOnSidebar?: boolean;
    bottombar?: boolean;
    parent?: BreadCrumbs | BreadCrumbs[];
    className?: string;
    bottomLabel?: string
    inMobile?: boolean
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


const routes = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: <FaChartPie />,
        route: 'user.dashboard',
        showOnSidebar: true,
        inMobile: true,
        bottomLabel: 'Home',
        className: dashboard.overlay
    } as const,

    {
        id: 'wallets',
        label: 'Wallets',
        icon: <MdWallet />,
        route: 'user.wallets',
        showOnSidebar: true,
        inMobile: true
    } as const,

    {
        id: 'trades',
        label: 'Trades',
        icon: <GiTrade />,
        route: 'user.crypto.trades',
        showOnSidebar: false
    } as const,

    {
        id: 'swap',
        label: 'Swap',
        icon: <MdCurrencyExchange />,
        route: 'user.crypto.swap',
        showOnSidebar: true
    } as const,

    {
        id: 'fund',
        label: 'Fund',
        icon: <RiFundsFill />,
        route: 'user.crypto.deposit',
        showOnSidebar: true
    } as const,

    {
        id: 'withdraw',
        label: 'Withdraw',
        icon: <BiMoneyWithdraw />,
        route: 'user.crypto.withdraw',
        showOnSidebar: true
    } as const,

    {
        id: 'history',
        label: 'History',
        icon: <VscHistory />,
        route: 'user.crypto.history',
        showOnSidebar: true,
        inMobile: true
    } as const,

    {
        id: 'settings',
        label: 'Settings',
        icon: <GrConfigure />,
        route: 'user.settings.all',
        showOnSidebar: true,
        inMobile: true,
        bottombar: true,
    } as const,

    // {
    //     id: 'support',
    //     label: 'Support',
    //     icon: <IoIosHelpCircle />,
    //     route: 'user.support',
    //     bottombar: true,
    //     showOnSidebar: true,
    // } as const,

    {
        id: 'buy',
        label: 'Buy',
        icon: <MdAddShoppingCart />,
        route: 'user.crypto.trades.spot',
    } as const,
    {
        id: 'sell',
        label: 'Sell',
        icon: <CgArrowsExchange />,
        route: 'user.crypto.trades.spot',
    } as const,
    {
        id: 'exchange',
        label: 'Exchange',
        icon: <TbExchange />,
        route: 'user.crypto.trades.exchange',
    } as const,
    {
        id: 'recurring',
        label: 'Recurring Buys',
        icon: <MdEventRepeat />,
        route: 'user.crypto.trades.recurring',
    } as const,

] as const;

type Keys = ElementType<typeof routes>['id']

//@ts-ignore
routes.byId = function (id: Keys) {
    return this.find(item => item.id === id) || fake;
}

export function routeById(id: Keys) {
    return routes.find(item => item.id === id) || fake;
}

export function routeByHref(href: string) {
    return routes.find(item => item.route === href);
}

export function getSidebar() {
    const all = (routes as unknown as Routes).filter(item => item.showOnSidebar);
    return [
        all.filter(item => !item.bottombar),
        all.filter(item => item.bottombar),
    ]
}


export function getMobile() {
    const list = (routes as unknown as Routes).filter(item => item.inMobile);
    return [list.slice(0, 2), list.slice(2, 4)];
}

export default routes as unknown as Routes;
