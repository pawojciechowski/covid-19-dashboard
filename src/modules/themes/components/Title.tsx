import styled from 'styled-components';
import { Theme } from '../types';

const Title = styled.h1`
  font-size: 2.2rem;
  margin: 0;
  line-height: 1.2;
  color: ${({ theme }: { theme: Theme}) => theme.titleColor};
  -webkit-text-fill-color: transparent;
  background: ${({ theme }: { theme: Theme}) => theme.titleGradient};
  -webkit-background-clip: text;
  display: inline-block;
`;

export default Title;
