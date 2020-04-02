import React, { PropsWithChildren } from 'react';
import { ThemeProvider as StyledComponentsThemeProvider, createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import { themeSelector } from '../redux';
import { Theme } from '../types';


const GlobalStyle = createGlobalStyle`
  body {
    background: ${({ theme }: { theme: Theme}) => theme.bg}
  }
`;

export function ThemeProvider({ children }: PropsWithChildren<{}>) {
  const theme = useSelector(themeSelector);

  return (
    <StyledComponentsThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
      {children}
    </StyledComponentsThemeProvider>
  )
}

export default ThemeProvider;
