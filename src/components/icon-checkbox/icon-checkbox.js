// @flow

import React from 'react';
import styled from 'styled-components';

type Props = {
  label?: any,
  icon: any,
  onChange: any
}

class IconCheckbox extends React.Component<Props> {

  static defaultProps = {
    icon: 'heart'
  };

  render() {
    const id = Math.random();
    return (
      <HeartCheckBox>
        <input onChange={(e) => this.props.onChange(e.target.val)} type="checkbox" id={id} />
        <label htmlFor={id}>{this.props.label}</label>
      </HeartCheckBox>
    );
  }
}

const HeartCheckBox = styled.div`
  color: #D12248;
  width: 10px;
  height: 10px;
`;

export default IconCheckbox;