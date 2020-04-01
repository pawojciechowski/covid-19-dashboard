import React from 'react';
import { BasicTooltip } from '@nivo/tooltip';
import { PointTooltipProps } from '@nivo/line';

function CustomTooltip({ point }: PointTooltipProps) {
  return (
    <BasicTooltip
      id={
        <div>
          <strong>{point.serieId}</strong><br/>
          date: {point.data.xFormatted}<br />
          cases: {point.data.yFormatted}
        </div>
      }
      color={point.serieColor} />
  );
}

export default CustomTooltip;
