import { ColorNames } from '@assets/fn/create-color';
import IconButton from '@components/Button/IconButton';
import Card from '@components/Card';
import Cardheader from '@components/Card/Cardheader';
import { Title } from '@components/Trade';
import { Link } from '@inertiajs/react';
import { routeById } from '@routes/index';
import React from 'react';
import { BsCurrencyExchange } from 'react-icons/bs';
import { FaShare } from 'react-icons/fa';
import { MdOutlineCallMade } from 'react-icons/md';
import dashboard from '@styles/pages/dashboard.module.scss';

const QuickActions: React.FC<QuickActionsProps> = () => {
    //--- code here ---- //
    return (
        <section className={dashboard.quickLinks}>
            <Card className='!bg-transparent' container='!p-0'>
                <Cardheader variant='mini'>
                    Quick Actions
                </Cardheader>
                <div className="flex gap-8 flex-wrap">
                    <Action icon={<FaShare />} href={route(routeById('withdraw').route, { type: 'transfer' })}>Transfer</Action>
                    <Action icon={<BsCurrencyExchange />} href={route(routeById('swap').route)}>Swap</Action>
                    <Action icon={<MdOutlineCallMade />} href={route(routeById('swap').route)}>Withdraw</Action>
                </div>
            </Card>
        </section>
    );
}


const Action: React.FC<ActionsProps> = ({ icon, children, href, color = 'primary' }) => {
    //--- code here ---- //
    return (
        <div>
            <div>
                <Link href={href}>
                    <IconButton bgColor={color}>{icon}</IconButton>
                </Link>
            </div>
            <div>
                {(typeof children == 'string' || typeof children == 'number') ? <Title noPad>{children}</Title> : children}
            </div>
        </div>
    );
}

interface ActionsProps {
    icon: React.ReactNode
    href: string;
    children: string
    color?: ColorNames
}


interface QuickActionsProps {

}

export default QuickActions
