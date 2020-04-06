import React, { useContext } from 'react';
import ThemeToggle from 'modules/themes/components/ThemeToggle';
import styled, { ThemeContext } from 'styled-components';
import Title from 'modules/themes/components/Title';
import Container from 'modules/themes/components/Container';

export const headerHeight = '120px';

const HeaderContainer = styled(Container)`
  height: ${headerHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const LogoLink = styled.a`
  display: block;
  width: 90px;
  margin-right: 30px;

  &:hover {
    opacity: 1;
  }

  @media screen and (min-width: 500px) {
    width: 130px;
    margin-right: 20px;
  }
`;

export function Header() {
  const theme = useContext(ThemeContext);

  return (
    <HeaderContainer>
      <LogoLink href="https://lunarwings.dev">
        <img src={theme.logoUrl} alt="Logo Lunar Wings" />
      </LogoLink>
      <Title>COVID-19 Dashboard</Title>
      <ThemeToggle />
    </HeaderContainer>
  );
}

export default Header;
