// @flow
import React, { Component } from 'react';
import styled, {keyframes} from 'styled-components';

type Props = {
  className?: string
};

class LoadingIndicator extends Component<Props> {

  render() {

    return (
      <CubeGrid className={this.props.className}>
        <Cube animationDelay={'0.2s'} />
        <Cube animationDelay={'0.3s'} />
        <Cube animationDelay={'0.4s'} />
        <Cube animationDelay={'0.1s'} />
        <Cube animationDelay={'0.2s'} />
        <Cube animationDelay={'0.3s'} />
        <Cube animationDelay={'0.0s'} />
        <Cube animationDelay={'0.1s'} />
        <Cube animationDelay={'0.2s'} />
      </CubeGrid>
    );
  }
}

const CubeGrid = styled.div`
  width: 100px;
  height: 100px;
`;

const cubeGridScale = keyframes`
  0%, 70%, 100% {
    transform: scale3D(1, 1, 1);
  } 35% {
    transform: scale3D(0, 0, 1);
  }
`;

const Cube = styled.div`
  width: 33%;
  height: 33%;
  background-color: ${props => props.theme.primary};
  float: left;
  animation: ${cubeGridScale} 1.3s infinite ease-in-out;
  animation-delay: ${props => props.animationDelay};
`;

export default LoadingIndicator;