import React from 'react';
import styled from 'styled-components';

export const footerHeight = '50px';

const FooterContainer = styled.div`
  height: ${footerHeight};
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

export function Footer() {
  return (
    <FooterContainer>
      Made by <a rel="noopener noreferrer nofollow" target="_blank" href="https://www.linkedin.com/in/pawojciechowski/">Piotr Wojciechowski</a> @ <a href="https://lunarwings.dev">Lunar Wings</a>. Data extracted from
      <a rel="noopener noreferrer nofollow" target="_blank" href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/situation-reports">WHO Covid-19 situation reports.</a>
    </FooterContainer>
  )
}

export default Footer;
