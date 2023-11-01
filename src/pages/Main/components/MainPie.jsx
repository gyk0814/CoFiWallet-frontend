import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const MainPie = ({ data }) => {
  return (
    <ResponsivePie
      data={data}
      colors={{ scheme: 'set3' }}
      // sortByValue={true}
      valueFormat=" >-,"
      margin={{ top: 30, right: 30, bottom: 30, left: 30 }}
      startAngle={-90}
      innerRadius={0.5}
      padAngle={0.7}
      cornerRadius={3}
      activeOuterRadiusOffset={8}
      borderWidth={1}
      borderColor={{
        from: 'color',
        modifiers: [['darker', 0.2]],
      }}
      arcLabel={d => Math.floor(d.value / 10000)}
      arcLinkLabelsSkipAngle={10}
      arcLinkLabelsTextColor="#333333"
      arcLinkLabelsThickness={2}
      arcLinkLabelsTextOffset={3}
      arcLinkLabelsStraightLength={13}
      arcLinkLabelsColor={{ from: 'color' }}
      arcLabelsSkipAngle={10}
      arcLabelsTextColor={{
        from: 'color',
        modifiers: [['darker', 3]],
      }}
    />
  );
};

export default MainPie;
