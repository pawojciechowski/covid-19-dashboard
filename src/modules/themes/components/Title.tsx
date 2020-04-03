import styled from 'styled-components';
import { Theme } from '../types';

const Title = styled.h1`
  font-size: 1rem;
  margin: 0;
  line-height: 1.2;
  color: ${({ theme }: { theme: Theme}) => theme.titleColor};
  -webkit-text-fill-color: transparent;
  background: ${({ theme }: { theme: Theme}) => theme.titleGradient};
  -webkit-background-clip: text;
  display: inline-block;

  @media screen and (min-width: 500px) {
    font-size: 1.2rem;
  }

  @media screen and (min-width: 600px) {
    font-size: 1.7rem;
  }

  @media screen and (min-width: 768px) {
    font-size: 2.2rem;
  }
`;

export default Title;
