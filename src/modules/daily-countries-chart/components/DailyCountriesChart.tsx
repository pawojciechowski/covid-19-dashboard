import React, { useState, useEffect, useContext } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { RegionsData, ActiveRegion, DataType } from '../types';
import { SelectOption, SelectValue } from "modules/common/select/types";
import { mapRegionsData, mapRegionsToOptions } from '../utils';
import CustomTooltip from './CustomTooltip';
import styled, { ThemeContext } from 'styled-components';
import Select from 'modules/common/select/components/Select';
import { StylesConfig } from 'react-select';
import { Theme } from 'modules/themes/types';

const ChartWrapper = styled.div`
  height: 500px;
`;

const ChartContainer = styled.div``;

const ChartFilters = styled.div``;

const getRegionSelectStyles = (activeRegions: ActiveRegion[]) => ({
  multiValue: (styles, state) => {
    const activeRegion = activeRegions.find((ar) => ar.region === state.data.value);
    return {
      ...styles,
      backgroundColor: activeRegion ? activeRegion.color : 'black'
    };
  }
} as StylesConfig);


const prepareActiveRegions = (regions: string[], theme: Theme, startColorIndex: number = 0) => {
  return regions.map((r, i) => ({
    region: r,
    color: theme.chart.colors[(startColorIndex + i + 1) % theme.chart.colors.length]
  }))
}

const handleSelectRegion = (
  value: SelectValue[],
  activeRegions: ActiveRegion[],
  setActiveRegions: React.Dispatch<React.SetStateAction<ActiveRegion[]>>,
  theme: Theme
) => {
  let newActiveRegions: ActiveRegion[] = [];

  if (value) {
    const filteredRegions = [] as ActiveRegion[];
    const regionsToAdd = [] as string[];

    value.forEach((v) => {
      const activeRegion = activeRegions.find((ar) => ar.region === v.value);

      if (activeRegion) {
        filteredRegions.push(activeRegion);
      } else {
        regionsToAdd.push(v.value)
      }
    });

    const startColorIndex = filteredRegions.length > 0 ? theme.chart.colors.findIndex((c) => c === filteredRegions.slice(-1)[0].color) : 0;

    newActiveRegions = [...filteredRegions, ...prepareActiveRegions(regionsToAdd, theme, startColorIndex)];
  }

  setActiveRegions(newActiveRegions);
}

interface DailyCountriesChartProps {
  data: RegionsData
}

export function DailyCountriesChart({ data }: DailyCountriesChartProps) {
  const theme = useContext<Theme>(ThemeContext);
  const [dataType, setDataType] = useState('total' as DataType)
  const [activeRegions, setActiveRegions] = useState([] as ActiveRegion[]);
  const [regionsOptions, setRegionsOptions] = useState([] as SelectOption[]);

  useEffect(() => {
    setRegionsOptions(mapRegionsToOptions(Object.keys(data)));
  }, [data]);

  useEffect(() => {
    const x = Object.keys(data).sort(
      (r1, r2) => {
        return [...data[r1]].sort((d1, d2) => new Date(d1.date) > new Date(d2.date) ? -1 : 1)[0][dataType] > [...data[r2]].sort((d1, d2) => new Date(d1.date) > new Date(d2.date) ? -1 : 1)[0][dataType] ? -1 : 1
      }
    ).slice(0, 3);
    setActiveRegions(prepareActiveRegions(x, theme))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ChartContainer>
      <ChartWrapper>
        <button onClick={() => setDataType(dataType === 'deaths' ? 'total' : 'deaths')}>Toggle data type</button>
        <ResponsiveLine
            data={mapRegionsData(data, activeRegions, dataType)}
            margin={{ top: 30, right: 20, bottom: 85, left: 65 }}
            xScale={{ type: 'point' }}
            yScale={{ type: 'linear', min: 0, max: 'auto', reverse: false }}
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
                legend: `Number of ${dataType === 'deaths' ? 'deaths' : 'cases'}`,
                legendOffset: -55,
                legendPosition: 'middle'
            }}
            colors={(data) => {
              const activeRegion = activeRegions.find((ar) => ar.region === data.id);
              return activeRegion ? activeRegion.color : theme.fg;
            }}
            pointSize={5}
            pointColor={{ from: 'color', modifiers: [] }}
            pointBorderColor={{ from: 'serieColor' }}
            pointLabel="y"
            pointLabelYOffset={-12}
            useMesh={true}
            theme={theme.chart}
            animate={activeRegions.length < 30}
            tooltip={CustomTooltip}
        />
      </ChartWrapper>
      <ChartFilters>
        <Select
          options={regionsOptions}
          value={activeRegions.map((ar) => ({
            label: ar.region,
            value: ar.region
          }))}
          styles={getRegionSelectStyles(activeRegions)}
          // Casting due to ReactSelect wrong types
          onChange={(value) => handleSelectRegion(value as SelectValue[], activeRegions, setActiveRegions, theme)}
          isMulti />
        <button onClick={() => handleSelectRegion(regionsOptions as SelectValue[], activeRegions, setActiveRegions, theme)}>Select all</button>
        <button onClick={() => setActiveRegions([])}>Clear all</button>
      </ChartFilters>
    </ChartContainer>
  )
}

export default DailyCountriesChart;
