// @flow
import * as React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';


type Props = {
  to?: string,
  className?: string,
  onClick?: () => void,
  children?: any,
  isDisabled?: boolean
};

class _Link extends React.Component<Props> {
  handleClick(e: Object) {
    if(this.props.isDisabled){
      e.preventDefault();
    }
    if(this.props.onClick){
      this.props.onClick();
    }
  }
  render() {
    return (
      this.props.to
        ? (
          <LinkOverride
            to={this.props.to}
            className={this.props.className}
            onClick={this.handleClick.bind(this)}
          >
            {this.props.children}
          </LinkOverride>
        )
        : (
          <DumbLink
            className={this.props.className}
            onClick={this.handleClick.bind(this)}
          >
            {this.props.children}
          </DumbLink>
        )
    );
  }
}


export default _Link;

const LinkOverride = styled(Link)`
  cursor: pointer;
  text-decoration: none;
`;

const DumbLink = styled.a`
  cursor: pointer;
  text-decoration: none;
`;
