import React, { PropsWithChildren } from 'react';
import { ThemeProvider as StyledComponentsThemeProvider, createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';
import { themeSelector } from '../redux';
import { Theme } from '../types';


const GlobalStyle = createGlobalStyle`
  html,
  body {
    background: ${({ theme }: { theme: Theme}) => theme.bg};
    height: 100%;
  }

  body {
    color: ${({ theme }: { theme: Theme}) => theme.fg};
    font-family: 'Ubuntu', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    line-height: 1.5;
    margin: 0;
    padding: 0;
  }

  a {
    color: ${({ theme }: { theme: Theme}) => theme.fg};
    display: inline-block;
    transition: opacity 0.05s ease-out;
    padding: 0 0.2rem;

    &:hover {
      opacity: .75;
    }
  }

  #root {
    height: 100%;
  }

  img {
    max-width: 100%;
    display: block;
  }

  /* Scrollbar config */
  ::-webkit-scrollbar {
    width: 11px;
  }
  html {
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }: { theme: Theme}) => theme.fg} ${({ theme }: { theme: Theme}) => theme.inputBackground};
  }
  ::-webkit-scrollbar-track {
    background: ${({ theme }: { theme: Theme}) => theme.inputBackground};
    border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }: { theme: Theme}) => theme.fg} ;
    border-radius: 6px;
    border: 3px solid ${({ theme }: { theme: Theme}) => theme.inputBackground};
  }

  /* media config */
  @media screen and (max-width: 768px) {
    html {
      font-size: 16px;
    }
  }
`;

export function ThemeProvider({ children }: PropsWithChildren<{}>) {
  const theme = useSelector(themeSelector);

  return (
    <StyledComponentsThemeProvider theme={theme}>
      <GlobalStyle />
      {children}
    </StyledComponentsThemeProvider>
  );
}

export default ThemeProvider;
