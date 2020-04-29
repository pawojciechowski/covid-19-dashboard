import React, { useState, useEffect, useContext, useMemo } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { ActiveRegion, Scale } from '../types';
import { RegionsData, DataType } from 'modules/api/regions/types';
import { SelectOption, SelectValue } from 'common/select/types';
import { mapRegionsData, mapRegionsToOptions, prepareActiveRegions, getRegionSelectStyles } from '../utils';
import CustomTooltip from './CustomTooltip';
import styled, { ThemeContext } from 'styled-components';
import Select from 'common/select/components/Select';
import { Theme } from 'modules/themes/types';
import { getRegionSummedData } from 'modules/api/regions/utils';
import Button from 'common/button/components/Button';
import { dataTypeOptions, scaleOptions, scaleConfig, logAxisConfig, linearAxisConfig, logGridValues } from '../const';
import RadioSelect, { RadioSelectOptionWrapper, RadioSelectWrapper } from 'common/radio-select/components/RadioSelect';

const ChartWrapper = styled.div`
  height: 350px;

  @media screen and (min-width: 500px) {
    height: 500px;
  }
`;

const ChartContainer = styled.div``;

const ChartFilters = styled.div``;

const ButtonsContainer = styled.div`
  margin: 10px 0;
  display: flex;
  justify-content: space-between;
`;

const ChartControlsContainer = styled.div`
  display: flex;
  justify-content: space-between;

  ${RadioSelectWrapper} {
    flex-direction: column;
  }

  ${RadioSelectOptionWrapper} {
    margin-bottom: 10px;
  }

  @media screen and (min-width: 500px) {
    ${RadioSelectWrapper} {
      flex-direction: row;
    }

    ${RadioSelectOptionWrapper} {
      margin-bottom: 0;
    }
  }
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
        regionsToAdd.push(v.value);
      }
    });

    const startColorIndex = filteredRegions.length > 0 ? theme.chart.colors.findIndex((c) => c === filteredRegions.slice(-1)[0].color) : 0;

    newActiveRegions = [...filteredRegions, ...prepareActiveRegions(regionsToAdd, theme, startColorIndex)];
  }

  setActiveRegions(newActiveRegions);
};

interface DailyCountriesChartProps {
  data: RegionsData
}

export function DailyCountriesChart({ data }: DailyCountriesChartProps) {
  const theme = useContext<Theme>(ThemeContext);
  const [dataType, setDataType] = useState('total' as DataType);
  const [scale, setScale] = useState('linear' as Scale);
  const [activeRegions, setActiveRegions] = useState([] as ActiveRegion[]);
  const [regionsOptions, setRegionsOptions] = useState([] as SelectOption[]);

  const axisLeftConfig = useMemo(() => {
    const legend = `Number of ${dataType === 'deaths' ? 'deaths' : 'cases'}`;
    return scale === 'log' ? {...logAxisConfig, legend} : {...linearAxisConfig, legend};
  }, [scale, dataType]);

  const chartData = useMemo(() => {
    return mapRegionsData(data, activeRegions, dataType, scale);
  }, [data, activeRegions, dataType, scale]);

  useEffect(() => {
    setRegionsOptions(mapRegionsToOptions(Object.keys(data)));
  }, [data]);

  useEffect(() => {
    const x = Object.keys(data).sort(
      (r1, r2) => {
        return getRegionSummedData(data, r1)[dataType] > getRegionSummedData(data, r2)[dataType] ? -1 : 1;
      }
    ).slice(0, 3);
    setActiveRegions(prepareActiveRegions(x, theme));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ChartContainer>
      <ChartControlsContainer>
        <RadioSelect name="dataType" options={dataTypeOptions} value={dataType} onChange={(value) => setDataType(value)} />
        <RadioSelect name="scale" options={scaleOptions} value={scale} onChange={(value) => setScale(value)} />
      </ChartControlsContainer>
      <ChartWrapper>
        <ResponsiveLine
            data={chartData}
            margin={{ top: 30, right: 40, bottom: 85, left: 70 }}
            xScale={{ type: 'time', format: '%Y-%m-%d', precision: 'day' }}
            yScale={scaleConfig[scale]}
            xFormat="time:%Y-%m-%d"
            yFormat={(v) => v.toLocaleString()}
            gridYValues={scale === 'log' ? logGridValues : undefined}
            curve="monotoneX"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                format: '%b %d',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: -45
            }}
            axisLeft={axisLeftConfig}
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
  );
}

export default DailyCountriesChart;
