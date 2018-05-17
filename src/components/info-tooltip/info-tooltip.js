// @flow
import * as React from 'react';
import styled, { css } from 'styled-components';
import media from 'utils/media-queries';
import Icon from 'components/icon/icon';
import { darken } from 'polished';

type InfoTooltipProps = {
  text: string,
  dark?: boolean,
  placement?: string
};

type InfoTooltipState = {
  isOpen: boolean
};

export default class InfoTooltip extends React.Component<InfoTooltipProps, InfoTooltipState> {

  state = {
    isOpen: false
  };

  handleToggle(){
    this.setState({isOpen: !this.state.isOpen});
  }

  onBlur(e: any) {
    const currentTarget = e.currentTarget;

    setTimeout(function() {
      if (!currentTarget.contains(document.activeElement)) {
        this.setState({isOpen: false});
      }
    }, 250);
  }

  render() {
    return (
      <InfoWrapper onBlur={(e) => this.onBlur(e)} onClick={() => this.handleToggle()}>
        <InfoIcon
          dark={this.props.dark}
          name="info-circle"
        />
        <Information placement={this.props.placement} isOpen={this.state.isOpen}>
          {this.props.text}
          <CloseIcon name="times" onClick={() => this.handleToggle()} />
        </Information>
      </InfoWrapper>
    );
  }
}

const InfoWrapper = styled.div`
  width: 35px;
  height: 30px;
  position: relative;
  display: flex;
  justify-content: center;
  /* TODO: place the info tooltip correctly on mobile instead of just hiding */
  ${media.phone`
    display: none;
  `}
`;

const InfoIcon = styled(Icon)`
  margin: 0;
  padding: 0;
  font-size: 24px;
  color: ${props => props.dark ? props.theme.primaryDark : props.theme.primaryLight};
  &:hover {
    color: ${props => props.dark ? darken(0.1,props.theme.primaryDark) : darken(0.1,props.theme.primaryLight)};
  }
`;

const Information = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none'};
  
  position: absolute;
  bottom: 44px;
  padding: 20px;
  background: #FFF;
  border: 1px solid #EEE;
  border-radius: 10px;
  width: 300px;
  font-size: 15px;
  line-height: 20px;
  font-weight: 400;
  color: #2e2e2e;
  &::after {
    content: " ";
    position: absolute;
    top: 100%; /* At the bottom of the tooltip */
    left: 50%;
    margin-left: -15px;
    border-width: 15px;
    border-style: solid;
    border-color: #EEE transparent transparent transparent;
  }
  
  ${props => props.placement === 'bottom' && css`
    bottom: auto;
    top: 44px;
    &::after {
      top: -30px;
      border-color: transparent transparent #EEE transparent;
    }
  `}
`;

const CloseIcon = styled(Icon)`
  position: absolute;
  top: 0;
  right: 5px;
  font-size: 16px;
  color: #CCC;
  &:hover {
    color: #999;
  }
`;