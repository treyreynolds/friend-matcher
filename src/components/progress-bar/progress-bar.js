import React, { Component } from 'react';
import styled from 'styled-components';

type Props = {
  large: ?boolean,
  small: ?boolean,
  value: number
};

class ProgressBar extends Component<Props> {
  render() {
    return (
      <ScoreBar {...this.props}>
        <ScoreFilled value={this.props.value} />
      </ScoreBar>
    );
  }
}
const ScoreBar = styled.div`
  display: flex;
  flex: 1;
  flex-shrink: 0;
  width: 100%;
  flex-grow: 0;
  height: ${props => props.large ? '18px' : props.small ? '8px' : '12px'};
  min-height: ${props => props.large ? '18px' : props.small ? '8px' : '12px'};
  background: ${props => props.theme.lightGrey};
  overflow: hidden;
  position: relative;
`;

const ScoreFilled = styled.div`
  background: ${props=> props.theme.scoreGradient[Math.min(Math.floor(props.value/10), 9)]};
  width: ${props=> props.value}%;
  height: ${props => props.large ? '18px' : props.small ? '8px' : '12px'};
  transition: all .3s;
`;


export default ProgressBar;