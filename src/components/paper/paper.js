// @flow

import React from 'react';
import styled from 'styled-components';

type PaperProps = {
  style?: ?Object,
  className?: String,
  children?: any
}

export default class Paper extends React.Component<PaperProps> {

  render() {
    return (
      <PaperWrapper className={this.props.className}>
        {this.props.children}
      </PaperWrapper>
    );
  }
}

const PaperWrapper = styled.div`
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.03);
  margin-bottom: 20px;
  background-color: white;
  margin-top: 50px;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 40px;
  border: 1px #eee solid;
`;
