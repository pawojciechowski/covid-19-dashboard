import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Theme } from 'modules/themes/types';

interface LabelProps {
  value?: boolean,
  activeColor?: string,
  inactiveColor?: string,
  size: number,
  theme: Theme
}

const Label = styled.label`
  display: block;
  position: relative;
  cursor: pointer;

  &:before {
    content: "";
    display: block;
    width: ${(props: LabelProps) => 2 * props.size + 2 + 'px'};
    height: ${(props: LabelProps) => props.size + 2 + 'px'};
    border: ${(props: LabelProps) => props.value ? props.activeColor || props.theme.fg : props.inactiveColor || '#adb5bd'} solid 1px;
    pointer-events: all;
    border-radius: ${(props: LabelProps) => props.size + 'px'};
    transition: background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  }

  &:after {
    content: "";
    display: block;
    position: absolute;
    top: 2px;
    left: 2px;
    width: ${(props: LabelProps) => props.size + 'px'};
    height: ${(props: LabelProps) => props.size + 'px'};
    background-color: ${(props: LabelProps) => props.value ? props.activeColor || props.theme.fg : props.inactiveColor || '#adb5bd'};
    border-radius: ${(props: LabelProps) => props.size / 2 + 'px'};
    transition: transform .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out,-webkit-transform .15s ease-in-out;
    transform: ${(props: LabelProps) => props.value ? `translateX(${props.size}px);` : undefined}
  }
`;

const Input = styled.input`
  position: absolute;
  left: 0;
  z-index: -1;
  opacity: 0;
`;

const SwitchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  min-height: 1.5rem;
  user-select: none;
`;

interface SwitchProps {
  name: string,
  value?: boolean,
  onChange?: (newValue: boolean) => void,
  activeColor?: string,
  inactiveColor?: string,
  size?: number
}

export function Switch({ name, value, onChange, activeColor, inactiveColor, size = 12 }: SwitchProps) {
  const [internalValue, setInternalValue] = useState(value || false);
  const idProp = `id_switch_${name}`;

  useEffect(() => {
    setInternalValue(value || false);
  }, [value]);

  const handleSwitchChange = (e: any) => {
    const newValue = e.target.checked;
    setInternalValue(newValue);
    onChange && onChange(newValue)
  }

  return (
    <SwitchWrapper>
      <Input type="checkbox" name={name} id={idProp} checked={internalValue} onChange={handleSwitchChange} />
      <Label size={size} activeColor={activeColor} inactiveColor={inactiveColor} value={internalValue} htmlFor={idProp} />
    </SwitchWrapper>
  )
}



export default Switch;
