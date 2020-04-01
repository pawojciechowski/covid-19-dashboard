import React from 'react'
import DailyCountriesChart from 'modules/daily-countries-chart/components/DailyCountriesChart';

import data from 'data/series.json';

export function Dashboard() {
  return (
    <>
      <DailyCountriesChart data={data} />
    </>
  )
}

export default Dashboard;
