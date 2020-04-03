import React from 'react'
import DailyCountriesChart from 'modules/daily-countries-chart/components/DailyCountriesChart';

import data from 'data/series.json';
import CountriesList from 'modules/countries-list/components/CountriesList';
import styled from 'styled-components';
import Container from 'modules/themes/components/Container';
import { headerHeight } from 'modules/base/components/Header';
import { footerHeight } from 'modules/base/components/Footer';

const DashboardContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  height: calc(100% - ${headerHeight} - ${footerHeight});


  @media screen and (min-width: 1100px) {
    flex-direction: row;
  }
`;

const Column = styled.div`
`;

const LeftColumn = styled(Column)`
  min-width: 400px;
  order: 1;

  @media screen and (min-width: 1100px) {
    margin-right: 25px;
  }
`;

const RightColumn = styled(Column)`
  flex-grow: 1;
  order: 2;
`;

export function Dashboard() {
  return (
    <DashboardContainer>
      <RightColumn>
        <DailyCountriesChart data={data} />
      </RightColumn>
      <LeftColumn>
        <CountriesList data={data} />
      </LeftColumn>
    </DashboardContainer>
  )
}

export default Dashboard;
