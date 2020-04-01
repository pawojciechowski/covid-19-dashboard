import React from 'react';
import ReactSelect, { Props, StylesConfig } from 'react-select';

const selectStyles = {
  control: styles => ({
    ...styles,
    border: 'none',
    borderBottom: `1px solid ${styles.borderColor}`,
    borderRadius: 'unset',
    boxShadow: 'none'
  }),
  menu: styles => {
    return {
      ...styles,
      borderRadius: 'unset',
      marginTop: 0
    };
  }
} as StylesConfig;

const IndicatorsContainer = () => <></>;

const Select = function({ styles, ...rest }: Props) {
  return (
    <ReactSelect
      styles={{...selectStyles, ...styles}}
      components={{IndicatorsContainer}}
      {...rest} />
  );
};

export default Select;
