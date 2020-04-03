import React, { useState, useEffect } from 'react';
import { RadioSelectOption, RadioSelectValue } from '../types';
import styled from 'styled-components';

interface LabelProps {
  value: RadioSelectValue,
  size: number
};

const RadioSelectWrapper = styled.div`
  display: flex;
`;
const RadioSelectOptionWrapper = styled.div`
  cursor: pointer;
  user-select: none;
  margin-right: 10px;
`;
const Input = styled.input`
  cursor: inherit;
`;
const Label = styled.label`
  cursor: inherit;
  ${(props: LabelProps) => ''}
`;

interface RadioSelectProps<T extends RadioSelectValue> {
  name: string
  options: RadioSelectOption<T>[],
  value: T,
  onChange?: (value: T) => void,
  size?: number
}

export function RadioSelect<T extends RadioSelectValue>({ name, options, value, onChange, size = 12 }: RadioSelectProps<T>) {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleRadioSelectChange = (e: any) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    onChange && onChange(newValue)
  }

  return (
    <RadioSelectWrapper>
      {options.map((option, i) => {
        const optionId = `id_for_${option.value}`;
        return (
          <RadioSelectOptionWrapper key={option.value}>
            <Input type="radio" name={name} id={optionId} value={option.value} checked={option.value === internalValue} onChange={handleRadioSelectChange} />
            <Label size={size} value={internalValue} htmlFor={optionId}>{option.label}</Label>
          </RadioSelectOptionWrapper>
        );
      })}
    </RadioSelectWrapper>
  )
}

export default RadioSelect;
