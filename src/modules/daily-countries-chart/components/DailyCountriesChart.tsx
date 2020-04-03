import React, { useState, useEffect, useContext } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ActiveRegion } from '../types';
import { RegionsData, DataType } from "modules/api/regions/types";
import { SelectOption, SelectValue } from "common/select/types";
import { mapRegionsData, mapRegionsToOptions, prepareActiveRegions, getRegionSelectStyles } from '../utils';
import CustomTooltip from './CustomTooltip';
import styled, { ThemeContext } from 'styled-components';
import Select from 'common/select/components/Select';
import { Theme } from 'modules/themes/types';
import { getRegionSummedData } from 'modules/api/regions/utils';
import Button from 'common/button/components/Button';
import { radioSelectOptions } from '../const';
import RadioSelect from 'common/radio-select/components/RadioSelect';

const ChartWrapper = styled.div`
  height: 500px;
`;

const ChartContainer = styled.div``;

const ChartFilters = styled.div``;

const ButtonsContainer = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
`;

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
        return getRegionSummedData(data, r1)[dataType] > getRegionSummedData(data, r2)[dataType] ? -1 : 1
      }
    ).slice(0, 3);
    setActiveRegions(prepareActiveRegions(x, theme))
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ChartContainer>
      <RadioSelect name="dataType" options={radioSelectOptions} value={dataType} onChange={(value) => setDataType(value)} />
      <ChartWrapper>
        <ResponsiveLine
            data={mapRegionsData(data, activeRegions, dataType)}
            margin={{ top: 30, right: 40, bottom: 85, left: 65 }}
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
        <ButtonsContainer>
          <Button onClick={() => handleSelectRegion(regionsOptions as SelectValue[], activeRegions, setActiveRegions, theme)}>Select all</Button>
          <Button onClick={() => setActiveRegions([])}>Clear all</Button>
        </ButtonsContainer>
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
      </ChartFilters>
    </ChartContainer>
  )
}

export default DailyCountriesChart;
