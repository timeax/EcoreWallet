
import React, { useEffect, useState } from 'react';
import { SelectButton } from 'primereact/selectbutton';
import { Wallet } from '@typings/index';
import { MarketData, useLive } from '@context/LiveContext';
import { getCrptoColor, nFormatter, showIf } from '@assets/fn';
import NoData from '@widgets/NoData';
import Chart from '@components/Chart';
import calc from 'number-precision';
import styles from '@styles/pages/wallets/info.module.scss'
import { classNames } from 'primereact/utils';
import { Title } from '@components/Trade';
import { ApexOptions } from 'apexcharts';
import { Percent } from '@components/index';


const WalletChart: React.FC<ChartProps> = ({ wallet: initV }) => {
    //--- code here ---- //
    const [data, setChartData] = useState<any>();
    const [options, setChartOptions] = useState<ApexOptions>({});

    const [time, setTime] = useState<string>();
    const [wallet, setWallet] = useState(initV);
    const [color, setColor] = useState('');

    const { historicalData, setHistoricalId, setHistoricalRange, range, marketData } = useLive();

    const timeData = [
        { label: '1D', value: 'today' },
        { label: '1W', value: 'past week' },
        { label: '1M', value: 'past month' },
        { label: '1Y', value: 'past year' }
    ];

    useEffect(() => {
        setTime(timeData.find(item => item.label.toLowerCase() == range)?.value || 'today')
    }, []);

    useEffect(() => {
        if (initV && wallet?.id !== initV?.id) setWallet(initV);
    }, [initV]);

    useEffect(() => {
        if (!wallet) return;
        setHistoricalId?.(wallet.curr.id);
        //---
        setColor(getCrptoColor(wallet?.curr.curr_name))
    }, [wallet])

    useEffect(() => {
        if (time) {
            const range = timeData.find(item => item.value == time)?.label as string
            setHistoricalRange?.(range.toLowerCase());
        }
    }, [time]);


    useEffect(() => {
        if (!historicalData) return;

        setChartData([{
            name: `1 ${wallet?.curr.code}`,
            data: historicalData.data,
        }])
        //---
        setChartOptions({
            chart: {
                type: 'area',
                height: 300,
                width: '100%',
                stacked: false,
                zoom: {
                    type: 'x',
                    enabled: true,
                    autoScaleYaxis: true
                },
                toolbar: {
                    autoSelected: 'zoom',
                    show: false
                },

                events: {
                    click: function (event, chartContext, config) {
                        if (event.detail === 2) chartContext.resetSeries();
                    },
                },
                offsetX: 0,
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 0,
            },

            stroke: {
                width: 1,
                colors: [color]
            },

            fill: {
                type: 'gradient',
                colors: [color],
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.5,
                    opacityTo: 0,
                    stops: [0, 90, 100]
                },
            },
            //@ts-ignore
            yaxis: {
                labels: {
                    formatter: function (val: any) {
                        return calc.round(val, 2)
                    },
                },
                // show: false,
            },
            xaxis: {
                type: 'datetime',
            },
            tooltip: {
                shared: false,
                y: {
                    formatter: function (val: any) {
                        return calc.round(val, 8) + ' USD'
                    }
                }
            }
        })

    }, [historicalData]);

    const [mData, setData] = useState<MarketData['data'] | undefined>();

    useEffect(() => {
        // console.log(wallet)
        if (marketData && wallet) setData(marketData?.find(data => data.id == wallet.crypto_id)?.data);


    }, [marketData, wallet]);

    const selectInterval = (value: string, e: any) => setTime(value);

    return (
        <div className={classNames('flex flex-col gap-1', styles.chart)}>
            {/* @ts-ignore */}
            <Btn options={timeData} value={time as any} onSelect={selectInterval} />
            {showIf(data, (
                <div>
                    <Chart
                        width="105%"
                        series={data}
                        {...options}
                    />

                    <div className={styles.stats}>
                        <Title noPad xl bold>Market Stats</Title>
                        <div className='flex flex-col gap-y-4'>
                            <div data-section='stats-1' className="grid">
                                <Info title='24H High'>
                                    {calc.round(mData?.high_24h || 0, 2)}
                                </Info>
                                <Info title='24H Low'>
                                    {calc.round(mData?.low_24h || 0, 2)}
                                </Info>
                                <Info title='Price Change (24H)'>
                                    <Percent
                                        value={calc.round(mData?.price_change_percentage_24h || 0, 2)}
                                        percent
                                        size='inherit'
                                    />
                                </Info>
                            </div>

                            <div data-section='stats-2' className="grid">
                                <Info title='Volume (24H)'>
                                    {nFormatter(mData?.total_volume || 0, 2)}
                                </Info>
                                <Info title='Market Cap'>
                                    {nFormatter(mData?.market_cap || 0, 2)}
                                </Info>
                                <Info title='Circulating Supply'>
                                    {nFormatter(mData?.circulating_supply || 0, 2)}
                                </Info>
                                <Info title='Max Supply'>
                                    {nFormatter(mData?.max_supply || 0, 2)}
                                </Info>
                            </div>
                        </div>
                    </div>
                </div>
            ), (
                <NoData>
                    <>Loading data</>
                    <>Historical data will show here..</>
                </NoData>
            ))}
        </div>
    );
}


export const Info: React.FC<InfoProps> = ({ title, children }) => {
    //--- code here ---- //
    return (
        <div className='flex flex-col gap-y-2'>
            <Title noPad brighter sm light>{title}</Title>
            <Title noPad medium lg>{children}</Title>
        </div>
    );
}

interface InfoProps {
    title: string;
    children: React.ReactNode
}


const Btn: React.FC<BtnProps> = ({ onSelect, className, value, options }) => {
    return <div className='relative flex pt-2'>
        <SelectButton className={classNames('mx-auto', styles['btn-group'])} value={value} onChange={(e) => onSelect(e.value)} options={options} />
    </div>
}

//@ts-ignore
interface BtnProps extends AppElement {
    value?: string;
    options: [
        { label: string, value: string, },
        { label: string, value: string },
        { label: string, value: string },
        { label: string, value: string }
    ];
    onSelect(value?: string, ...props: any): void
}

interface ChartProps {
    wallet?: Wallet;
}

export default WalletChart
