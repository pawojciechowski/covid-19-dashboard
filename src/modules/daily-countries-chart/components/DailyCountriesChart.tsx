import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { RegionsData, RegionSelectOption, RegionSelectValue, ActiveRegion } from '../entities';
import { mapRegionsData, mapRegionsToOptions } from '../utils';
import CustomTooltip from './CustomTooltip';
import styled from 'styled-components';
import Select from 'modules/common/select/components/Select';
import { StylesConfig } from 'react-select';


interface DailyCountriesChartProps {
  data: RegionsData
}

const ChartWrapper = styled.div`
  height: 500px;
`;

const ChartContainer = styled.div``;

const ChartFilters = styled.div``;

const regionSelectStyles = {
  multiValue: (styles, state) => {
    return {
      ...styles,
      backgroundColor: state.data.color
    }
  }
} as StylesConfig;

export function DailyCountriesChart({ data }: DailyCountriesChartProps) {
  const [regionsOptions, setRegionsOptions] = useState([] as RegionSelectOption[]);
  const [activeRegions, setActiveRegions] = useState([] as ActiveRegion[]);

  useEffect(() => {
    setRegionsOptions(mapRegionsToOptions(Object.keys(data)));
  }, [data]);

  return (
    <ChartContainer>
      <ChartWrapper>
        <ResponsiveLine
            data={mapRegionsData(data, activeRegions)}
            margin={{ top: 30, right: 20, bottom: 85, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', reverse: false }}
            curve="monotoneX"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -60
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Number of cases',
                legendOffset: -50,
                legendPosition: 'middle'
            }}
            colors={(data) => {
              const activeRegion = activeRegions.find((ar) => ar.region === data.id);
              return activeRegion ? activeRegion.color : 'black';
            }}
            pointSize={5}
            pointColor={{ from: 'color', modifiers: [] }}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            tooltip={CustomTooltip}
        />
      </ChartWrapper>
      <ChartFilters>
        <Select
          options={regionsOptions}
          value={activeRegions.map((ar) => ({
            label: ar.region,
            value: ar.region,
            color: ar.color
          }))}
          styles={regionSelectStyles}
          // Casting due to ReactSelect wrong types
          onChange={value => setActiveRegions(
            value ? (value as RegionSelectValue[]).map((v) => ({region: v.value, color: v.color})) : []
          )}
          isMulti />
      </ChartFilters>
    </ChartContainer>
  )
}

export default DailyCountriesChart;
