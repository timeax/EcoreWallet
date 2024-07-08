import Card from '@components/Card';
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

const Latest: React.FC<LatestProps> = ({ currencies }) => {
    //--- code here ---- //
    const { marketData, rates } = useLive()
    const [prices, setPrices] = useState<typeof marketData>()
    const [pause, setPause] = useState(false);
    // console.log(rates)

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
        <section>
            <Card container={dashboard.prices} className={classNames('!rounded-lg max-h-[320px]')}>
                <Cardheader variant='mini'>
                    <>Latest Prices</>
                </Cardheader>
                <div>
                    {showIf(prices, (
                        <>
                            {
                                prices?.map(price => <LatestItem currencies={currencies} key={price.id} {...price} />)
                            }
                        </>
                    ), <Title>Nothing to show here</Title>)}
                </div>
            </Card>
        </section>
    );
}


const LatestItem: React.FC<LatestItemProps> = ({ currencies, id, data: { current_price, high_24h, image, low_24h, price_change_percentage_24h, sparkline_in_7d } }) => {
    //--- code here ---- //
    const curr = currencies.find(item => item.id == id);
    //------------
    return (
        <div className={dashboard.price_element}>
            <div className='flex items-center gap-1'>
                <Tag element={'img'} src={image} alt="" />
                <Title noPad>
                    {curr?.code}
                </Title>
            </div>
            <div className={dashboard.graph}>
                <SparkLineChart colors={[getCrptoColor(curr?.curr_name || '')]} data={sparkline_in_7d.price} />
            </div>

            <div className={dashboard.price_area}>
                <Title className={dashboard.price_change} noPad>{round(price_change_percentage_24h, 2)}%</Title>
                <Title bold noPad>${round(current_price, 4)}</Title>
            </div>
        </div>
    );
}

type LatestItemProps = MarketData & {
    currencies: Currencies;
};


interface LatestProps {
    currencies: Currencies;
}

export default Latest
