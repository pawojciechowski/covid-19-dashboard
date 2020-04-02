import React, { useContext, useMemo } from 'react';
import ReactSelect, { Props, StylesConfig } from 'react-select';
import { ThemeContext } from 'styled-components';
import { Theme } from 'modules/themes/types';
import { lighten } from 'polished';


const IndicatorsContainer = () => <></>;

const Select = function({ styles, ...rest }: Props) {
  const theme: Theme = useContext(ThemeContext);

  const selectStyles = useMemo(() => ({
    control: styles => ({
      ...styles,
      border: 'none',
      background: theme.inputBackground,
      boxShadow: 'unset'
    }),
    input: styles => ({
      ...styles,
      color: theme.fg
    }),
    menu: styles => {
      return {
        ...styles,
        borderRadius: 'unset',
        marginTop: 0,
        background: theme.inputBackground,
        color: theme.fg
      };
    },
    option: styles => {
      return {
        ...styles,
        background: 'none',
        ':hover': {
          background: theme.inputBackground !== 'none' ? lighten(0.1, theme.inputBackground) : theme.inputBackground
        }
      }
    }
  } as StylesConfig), [theme])

  return (
    <ReactSelect
      styles={{...selectStyles, ...styles}}
      components={{IndicatorsContainer}}
      {...rest} />
  );
};

export default Select;
