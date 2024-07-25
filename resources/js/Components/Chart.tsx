import Apexcharts, { ApexOptions } from 'apexcharts';
import React, { useEffect, useRef, useState } from 'react';
import Tag from '.';

const Chart: React.FC<ChartProps> = ({ height, width, ...props }) => {
    //--- code here ---- //
    const ref = useRef<HTMLDivElement>();

    const [state, setState] = useState<typeof props>(props);
    // const [init] = useState<typeof props>(props);
    //-------------
    useEffect(() => {
        if (props?.series)
            if (props.series !== state?.series) {
                setState(props);
            }
    }, [props]);
    //---
    useEffect(() => {
        try {
            var chart = new Apexcharts(ref.current, state);
            chart.render();
        } catch (e) {
            console.log(state)
        }

        return () => {
            chart.destroy();
            if (ref.current) ref.current.innerHTML = '';
        }
    }, [state]);


    return (
        <Tag data-section='chart-container' element='div' height={height} width={width} tagRef={ref}></Tag>
    );
}

interface ChartProps extends ApexOptions {
    height?: string | number;
    width?: string | number;
}

export default Chart
