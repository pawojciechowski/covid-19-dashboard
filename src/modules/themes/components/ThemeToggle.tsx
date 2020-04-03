import React from 'react';
import Switch from 'common/switch/components/Switch';
import { useSelector, useDispatch } from 'react-redux';
import { themeNameSelector, setTheme, themeSelector } from '../redux';
import styled from 'styled-components';

const ThemeToggleContainer = styled.div`
  margin-left: 30px;

  @media screen and (min-width: 500px) {
    padding-right: 50px;
  }
`;

export function ThemeToggle() {
  const themeName = useSelector(themeNameSelector);
  const theme = useSelector(themeSelector);
  const dispatch = useDispatch();
  const handleToggle = () => dispatch(setTheme(themeName === 'light' ? 'dark' : 'light'));

  return (
    <ThemeToggleContainer>
      <Switch name={'themeToggle'} value={themeName === 'light'} onChange={handleToggle} activeColor={theme.fg} inactiveColor={theme.fg} size={15} />
    </ThemeToggleContainer>
  )
}

export default ThemeToggle;
