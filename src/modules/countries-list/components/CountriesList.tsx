import React, { useMemo } from 'react';
import { RegionsData } from 'modules/api/regions/types';
import styled from 'styled-components';
import { Column, Table, AutoSizer } from 'react-virtualized';
import { getRegionSummedData } from 'modules/api/regions/utils';
import { Theme } from 'modules/themes/types';

interface CountriesListProps {
  data: RegionsData
};

const CountriesListContainer = styled.div`
  height: 100%;

  & > div > div {
    scrollbar-width: thin;
  }

  .ReactVirtualized__Table__row {
    display: flex;
    align-items: center;

    &:nth-child(even) {
      background: ${({ theme }: { theme: Theme}) => theme.evenListElementBackground};
    }
  }
`;

export function CountriesList({ data }: CountriesListProps) {
  const regionsList = useMemo(() => Object.keys(data).map((region) => {
    const stats = getRegionSummedData(data, region);

    return {
      ...stats,
      region
    };
  }).sort((r1, r2) => r2.total - r1.total), [data]);

  return (
    <CountriesListContainer>
      <AutoSizer>
        {({width, height}) => (
          <Table
            disableHeader={true}
            headerHeight={40}
            width={width}
            height={height}
            rowHeight={60}
            rowGetter={({index}) => regionsList[index]}
            rowCount={regionsList.length}>
              <Column
                dataKey="total"
                width={80}
                style={{color: '#f22', fontWeight: 'bold'}}
              />
              <Column
                dataKey="deaths"
                width={60}
                style={{color: '#d83', fontWeight: 'bold'}}
              />
              <Column
                dataKey="region"
                width={0}
                flexGrow={1}
              />
          </Table>
        )}
      </AutoSizer>
    </CountriesListContainer>
  )
}

export default CountriesList;
