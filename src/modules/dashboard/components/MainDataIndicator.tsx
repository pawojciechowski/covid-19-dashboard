import React from 'react';
import styled from 'styled-components';
import { Theme } from 'modules/themes/types';

interface MainDataIndicatorProps {
  total: number,
  deaths: number
}

const MainDataIndicatorContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 30px;

  @media screen and (min-width: 450px) {
    flex-wrap: nowrap;
  }
`;

const DataIndicator = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
  align-items: center;
  justify-content: center;
  padding: 20px 30px;
  background: ${({ theme }: { theme: Theme}) => theme.evenListElementBackground};
  border-radius: 5px;

  p {
    margin: 0;
  }

  @media screen and (min-width: 450px) {
    width: auto;
    margin-bottom: 0;
    padding: 30px 50px;
  }
`;

const NumberIndicator = styled.p`
  font-weight: bold;
  font-size: 3rem;

  @media screen and (min-width: 450px) {
    width: auto;
    margin-bottom: 0;
    font-size: 2.5rem;
  }
`;

const DangerNumberIndicator = styled(NumberIndicator)`
  color: ${({ theme }: { theme: Theme}) => theme.danger};
`;

const WarningNumberIndicator = styled(NumberIndicator)`
  color: ${({ theme }: { theme: Theme}) => theme.warn};
`;

export function MainDataIndicator({ total, deaths }: MainDataIndicatorProps) {
  return (
    <MainDataIndicatorContainer>
      <DataIndicator>
        <p>Total cases</p>
        <DangerNumberIndicator>{total}</DangerNumberIndicator>
      </DataIndicator>
      <DataIndicator>
        <p>Deaths</p>
        <WarningNumberIndicator>{deaths}</WarningNumberIndicator>
      </DataIndicator>
    </MainDataIndicatorContainer>
  )
}

export default MainDataIndicator;
