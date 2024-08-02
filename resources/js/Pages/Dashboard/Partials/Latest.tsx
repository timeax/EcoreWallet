import Card, { UICard, UICHeader } from '@components/Card';
import Cardheader from '@components/Card/Cardheader';
import { classNames } from 'primereact/utils';
import dashboard from '@styles/pages/dashboard.module.scss';
import React, { useEffect, useState } from 'react';
import { Currencies } from '@typings/index';
import { MarketData, useLive } from '@context/LiveContext';
import { getCrptoColor, showIf } from '@assets/fn';
import { Title } from '@components/Trade';
import Tag from '@components/index';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { round } from 'number-precision';
import CurrencyFormat from 'react-currency-format';
import { Link } from '@inertiajs/react';
import { Sidebar } from 'primereact/sidebar';

const Latest: React.FC<LatestProps> = ({ currencies }) => {
    //--- code here ---- //
    const { marketData, rates } = useLive()
    const [prices, setPrices] = useState<typeof marketData>()
    const [pause, setPause] = useState(false);
    const [open, setOpen] = useState(false);

    const header = (
        <div>
            <Title noPad xl medium className="items-center">
                Market Trend
            </Title>
        </div>
    );

    useEffect(() => {

        if (pause) return setPause(false);
        //---------
        if (marketData && rates && prices) {
            setPrices(prices.map(price => {
                let cur = currencies.find(item => item.id == price.id);
                let curr = rates.find(item => item.id == cur?.id)?.data.find(item => item.from == cur?.code && item.to == 'USD');

                if (curr) {
                    return {
                        id: price.id,
                        data: {
                            ...price.data,
                            current_price: parseFloat(curr.course)
                        }
                    }
                }
                return price
            }))
        }
    }, [rates])

    useEffect(() => {
        if (marketData) {
            setPause(true);
            setPrices([...marketData]);
        }
    }, [marketData])

    return (
        <section className='!mb-0'>
            <UICard className={classNames('max-h-[400px]', dashboard.prices)} header={<UICHeader title='Market trends'><Title noPad
                className='cursor-pointer'
                onClick={() => setOpen(true)}>See all</Title></UICHeader>}>
                {showIf((prices?.length || 0) > 0, (
                    <>
                        {
                            prices?.slice(0, 4).map(price => <LatestItem currencies={currencies} key={price.id} {...price} />)
                        }
                    </>
                ), <Title noPad className='pb-4'>Nothing to show here</Title>)}
            </UICard>
            <Sidebar className={classNames("!bg-theme-bgColor", dashboard.allPrices)} position="right" header={header} visible={open} onHide={() => setOpen(false)}>
                {showIf((prices?.length || 0) > 0, (
                    <>
                        {
                            prices?.map(price => <LatestItem currencies={currencies} key={price.id} {...price} />)
                        }
                    </>
                ), <Title noPad className='pb-4'>Nothing to show here</Title>)}
            </Sidebar>
        </section>
    );
}


const LatestItem: React.FC<LatestItemProps> = ({ currencies, id, data: { current_price, high_24h, image, low_24h, price_change_percentage_24h, sparkline_in_7d } }) => {
    //--- code here ---- //
    const curr = currencies.find(item => item.id == id);
    //------------
    return (
        curr ?
            <div className={dashboard.price_element}>
                <div className='flex items-center gap-2'>
                    <Tag element={'img'} src={image} alt="" />
                    <div>
                        <Title noPad bold className={dashboard.price_name}>
                            {curr?.curr_name}
                        </Title>
                        <Title noPad>
                            {curr?.code}
                        </Title>
                    </div>
                </div>
                <div className={dashboard.graph}>
                    <SparkLineChart colors={[getCrptoColor(curr)]} height={35} data={sparkline_in_7d.price} />
                </div>

                <div className={dashboard.price_area}>
                    <Title className={dashboard.price_change} noPad>{round(price_change_percentage_24h, 2)}%</Title>
                    <Title bold noPad>$
                        <CurrencyFormat
                            value={round(current_price, 4)}
                            displayType="text"
                            thousandSeparator
                            renderText={value => <span>{value}</span>}
                        />
                    </Title>
                </div>
            </div>
            : ''
    );
}

type LatestItemProps = MarketData & {
    currencies: Currencies;
};


interface LatestProps {
    currencies: Currencies;
}

export default Latest
