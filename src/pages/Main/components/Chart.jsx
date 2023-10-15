import React from 'react';
import { ResponsiveBar } from '@nivo/bar';
import './Chart.scss';

const Chart = ({ monthData }) => {
  return (
    <div className="barChartContainer">
      <ResponsiveBar
        data={monthData}
        keys={['value']}
        indexBy="month"
        margin={{ bottom: 30 }}
        padding={0.4}
        colors="#5f83f0cf"
        enableGridX={false}
        enableGridY={false}
        axisLeft={null}
        enableLabel={true}
        layers={['grid', 'axes', 'bars', 'markers', 'legends', 'annotations']}
        labelSkipHeight={12}
        labelTextColor={{ from: 'value', modifiers: [['darker', 1.6]] }}
      />
    </div>
  );
};

export default Chart;
