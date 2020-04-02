import React from 'react';
import Switch from 'modules/common/switch/components/Switch';
import { useSelector, useDispatch } from 'react-redux';
import { themeNameSelector, setTheme, themeSelector } from '../redux';
import styled from 'styled-components';

const ThemeToggleContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 20px;
  z-index: 1;
`;

export function ThemeToggle() {
  const themeName = useSelector(themeNameSelector);
  const theme = useSelector(themeSelector);
  const dispatch = useDispatch();
  const handleToggle = () => dispatch(setTheme(themeName === 'light' ? 'dark' : 'light'));

  return (
    <ThemeToggleContainer>
      <Switch name={'themeToggle'} value={themeName === 'light'} onChange={handleToggle} activeColor={theme.fg} inactiveColor={theme.fg} />
    </ThemeToggleContainer>
  )
}

export default ThemeToggle;
