import styled from 'styled-components';
import { Theme } from 'modules/themes/types';

const Button = styled.button`
  font-size: 0.85rem;
  display: inline-block;
  padding: .3rem 1.6rem;
  background: ${({ theme }: { theme: Theme}) => theme.buttonBackground};
  color: ${({ theme }: { theme: Theme}) => theme.buttonTextColor};
  border-radius: 3.8rem 0 3.8rem;
  font-weight: bold;
  white-space: nowrap;
  border: none;
  cursor: pointer;
  outline: none;
  line-height: inherit;
  transition: box-shadow 0.12s ease-in-out;

  &:hover {
    box-shadow: 3px 0 15px rgba(${({ theme }: { theme: Theme}) => theme.buttonBackground}, 0.4);
  }
`;

export default Button;
