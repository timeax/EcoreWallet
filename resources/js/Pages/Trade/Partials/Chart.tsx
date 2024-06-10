
import React, { useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import { ChartOptions } from 'chart.js';
import { SelectButton } from 'primereact/selectbutton';
import Text from '@components/Text';
import { Wallet } from '@typings/index';

const WalletChart: React.FC<ChartProps> = ({ wallet }) => {
    //--- code here ---- //
    const [data, setChartData] = useState({});
    const [options, setChartOptions] = useState({});

    const [time, setTime] = useState('1 day')

    useEffect(() => {
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [65, 59, 80, 81, 56, 55, 40],
                    fill: false,
                    borderColor: '#0c2bff',
                    tension: 0.4
                },
            ]
        };

        const options: ChartOptions = {
            maintainAspectRatio: false,
            aspectRatio: 0.6,
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
        };


        setChartData(data);
        setChartOptions(options);
    }, []);

    const selectInterval = (value: string, e: any) => {
        setTime(value)
    }

    return (
        <div className='flex flex-col gap-6'>
            <div>
                {wallet?.curr.code} Price
                <Text className='boldColor' variant={'header'}>
                    $800,000.00
                </Text>
                <Text variant={'small'} size='14px'>$300,000 <span className='capitalize'>{time}</span></Text>
            </div>
            <Chart
                type="line"
                width="100%"
                height="300px"
                data={data}
                options={options}
            />
            <div className='flex gap-2'>
                <Btn value='1D' onSelect={selectInterval} />
            </div>
        </div>
    );
}

const Btn: React.FC<BtnProps> = ({ onSelect, className, value = '1H' }) => {
    const options = [
        { label: '1H', value: 'past hour' },
        { label: '1D', value: 'today' },
        { label: '1W', value: 'past week' },
        { label: '1M', value: 'past month' }
    ];

    const labels = options.map(item => item.label);

    return <SelectButton value={value} onChange={(e) => onSelect(e.value)} options={options} />
}

//@ts-ignore
interface BtnProps extends AppElement {
    value: string;
    onSelect(value?: string, ...props: any): void
}

interface ChartProps {
    wallet?: Wallet;
}

export default WalletChart
