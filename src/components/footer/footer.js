// @flow
import React, { Component } from 'react';
import { Container } from 'components/layout/layout';
import styled from 'styled-components';
import media from 'utils/media-queries';

type Props = {};

class Footer extends Component<Props> {

  render() {

    return (
      <StyledFooter>
        <Container>
          <div>
            Invited Version 0.9.0 (Beta) © Abilitie 2018
          </div>
        </Container>
      </StyledFooter>
    );
  }
}

const StyledFooter = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: #f5f5f5;
  z-index: 9999;
  ${media.phone`
    display: none;
  `}
`;

export default Footer;