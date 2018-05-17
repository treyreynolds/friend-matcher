// @flow
import React from 'react';
import styled, { css } from 'styled-components';
import media from 'utils/media-queries';

import Link from 'components/link/link';
import Icon from 'components/icon/icon';

import { Container } from 'components/layout/layout';
import logo from '../../assets/images/logo.png';

type NavBarProps = {
  history: Object,
}

type NavBarState = {
  navOpen: boolean
}

export default class NavBar extends React.Component<NavBarProps, NavBarState> {

  state = {
    navOpen: false
  };

  handleToggle() {
    this.setState({
      navOpen: !this.state.navOpen
    });
  }

  render() {
    const {history: {location: {pathname}}} = this.props;

    return (
      <Navbar>
        <NavbarContainer>
          <Link to={'/'}>
            <LogoImg src={logo} alt='Invited' />
          </Link>
          <Nav>
            <NavItem isActive={pathname === '/'} to="/">Home</NavItem>
            <NavItem isActive={pathname === '/matcher'} to="/matcher">Matcher</NavItem>
          </Nav>
          <HamburgerMenu>
            <HamburgerButton onClick={() => this.handleToggle()}>
              <HamburgerIcon name="bars" />
            </HamburgerButton>
            <HamburgerDropdown isOpen={this.state.navOpen}>
              <HamburgerLink
                isActive={pathname === '/dashboard'}
                to="/dashboard"
                onClick={() => this.handleToggle()}
              >
                Dashboard
              </HamburgerLink>
            </HamburgerDropdown>
          </HamburgerMenu>
        </NavbarContainer>
      </Navbar>
    );
  }
}

const Navbar = styled.div`
  position:relative;
  background: #FFF;
  z-index: 999;
  height: 70px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  flex-shrink: 0;
`;

const NavbarContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

const LogoImg = styled.img`
  height: 40px;
  width: auto;
  margin: auto 0;
  ${media.tablet`margin-left: 10px;`}
`;

const Nav = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  ${media.tablet` display: none; `}
`;

const NavItem = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 10px;
  margin: 0 10px;
  transition: opacity 100ms ease, background-color 100ms ease, color 100ms ease, border-color 100ms ease;
  font-family: 'Open Sans', sans-serif;
  color: #5d5d5d;
  font-size: 14px;
  letter-spacing: 1px;
  text-decoration: none;
  text-transform: uppercase;
  
  ${props => props.isActive && css`
    height: calc(100% - 5px);
    border-top: 4px solid #68bad0;
    color: #313131;
  `}
  
  &:hover{
    color: #68bad0;
  }
  
  &:last-child{
    padding-right: 0;
    margin-right: 0;
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  ${media.tablet` display: flex; `}
`;

const HamburgerButton = styled.div`
  border: 1px solid #CCC;
  border-radius: 5px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50px;
  margin-right: 15px;
`;

const HamburgerIcon = styled(Icon)`
  text-align: center;
  color: #CCC;
  font-size: 1.5em;
`;

const HamburgerDropdown = styled.div`
  position: absolute;
  top: 70px;
  left: 0;
  width: 100%;
  height: 0;
  display: none;
  padding: 15px;
  background: #FFF;
  border-bottom: 2px solid #eee;
  transition: all 0.5s ease-out;
  flex-direction: column;
  ${props => props.isOpen && css`
    height: auto;
    display: flex;
  `}
`;

const HamburgerLink = styled(Link)`
  color: #111;
  width: 100%;
  padding: 10px 0;
  display: flex;
  margin: 5px;
  border-bottom: 1px solid #EEE;
  ${props => props.isActive && css`
    color: #68bad0;
  `}
`;