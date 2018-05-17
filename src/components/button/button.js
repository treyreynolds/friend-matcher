// @flow
import * as React from 'react';
import styled, {css} from 'styled-components';
import media from 'utils/media-queries';

type ButtonTypes = 'primary' | 'success' | 'danger' | 'info' | 'default';

type ButtonProps = {
  large?: boolean,
  small?: boolean,
  outline?: boolean,
  type?: ButtonTypes,
  onClick?: (any) => mixed,
  isDisabled?: boolean,
  children: any
};

class Button extends React.Component<ButtonProps> {
  render() {
    const {onClick, isDisabled, ...restProps} = this.props;
    const clickFunction = !isDisabled && onClick
      ? onClick
      : () => null;

    return (
      <StyledButton onClick={clickFunction} isDisabled={isDisabled} {...restProps}>
        {this.props.children}
      </StyledButton>
    );
  }
}

const StyledButton = styled.button`
  display: inline-block;
  padding: 15px 40px;
  font-family: 'Open Sans', sans-serif;
  line-height: 1em;
  font-weight: 400;
  letter-spacing: 1px;
  text-transform: uppercase;  
  text-decoration: none;
  cursor: pointer;
  border-radius: 0;
  font-size: ${props => props.large ? '18px' : props.small ? '12px' : '15px'};
  transition: opacity 200ms ease, background-color 200ms ease, color 200ms ease;
  
  border: 1px solid ${props => props.type ? props.theme.buttonColors[props.type] : props.theme.buttonColors['default']};
  background: ${props => props.type ? props.theme.buttonColors[props.type] : props.theme.buttonColors['default']};
  color: ${props => props.type ? props.theme.buttonText[props.type] : props.theme.buttonText['default']};
  
  ${props => props.outline && css`
    background: transparent;
    border: 1px solid ${props => props.type ? props.theme.buttonColors[props.type] : props.theme.buttonColors['default']};
    color: ${props => props.type ? props.theme.buttonColors[props.type] : props.theme.buttonColors['default']};
  `}
  
  &:hover {
    cursor: pointer;
    color: #FFF;
    background: ${props => props.type ? props.theme.buttonHover[props.type] : props.theme.buttonHover['default']};
    ${props => props.isDisabled && css`
      color: #FFF;
      background: #d5d5de;
    `}
    >* {
      color: #53c859;
    }
  }
  ${props => props.isDisabled && css`
    color: #ffffff;
    background: #d5d5de;
    border: 1px solid #d5d5de;
    cursor: not-allowed !important;
  `}
  
  
  ${media.giant`font-size: ${props => props.large ? '1.4em' : '1.2em'};`}
  ${media.desktop`font-size: ${props => props.large ? '1.1em' : '1.0em'};`}
  ${media.tablet`font-size: ${props => props.large ? '1.0em' : '.9em'};`}
  ${media.phone`font-size: ${props => props.large ? '.9em' : '.8em'}; padding: 15px 20px;`}

  ${props => props.small && css`
    padding: 10px 20px;
    ${media.giant`font-size: 1em;`}
    ${media.desktop`font-size: .9em;`}
    ${media.tablet`font-size: .8em; padding: 10px 20px;`}
    ${media.phone`font-size: .7em; padding: 10px 20px;`}
  `}
  
  
`;

export default Button;