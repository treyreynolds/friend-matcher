//@flow
import * as React from 'react';
import styled, { css } from 'styled-components';
import media from 'utils/media-queries';
import Spacer from '../spacer/spacer';
import Icon from 'components/icon/icon';

const gutterWidth = 0;
const responsivePhoneBreak = '567px';
const responsiveTabletBreak = '767px';
const responsiveDesktopBreak = '1023px';

type ContainerProps = {
  width?: number,
  offset?: number,
  children: any,
  className: string,
  vCentered?: boolean,
  hCentered?: boolean
}

class _Container extends React.Component<ContainerProps> {
  render() {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

export const Container = styled(_Container)`
  display: flex;
  width: 100%;
  min-height: 100%;
  margin-right: auto;
  margin-left: auto;
 
  @media (min-width: 576px) {
    max-width: 540px;
  }

  @media (min-width: 768px) {
    max-width: 720px;
  }
  
  @media (min-width: 992px) {
    max-width: 960px;
  }
  
  @media (min-width: 1200px) {
    max-width: 1170px;
  }
`;

type ColumnProps = {
  width?: number,
  offset?: number,
  children: any,
  className: string,
  vCentered?: boolean,
  hCentered?: boolean,
  style?: Object
}

class _Column extends React.Component<ColumnProps> {
  render() {
    return (
      <div style={this.props.style} className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

export const Column = styled(_Column)`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: column;
  ${props => props.width && css`
    flex: 0 0 ${props.width}%;
    max-width: ${props.width}%;
  `}
  ${props => props.offset && css`
    margin-left: ${props.offset}%;
  `}
  ${props => props.vCentered && css`
    align-items: center;  
  `}
  ${props => props.hCentered && css`
    justify-content: center;
  `}
  
`;

type RowProps = {
  children: any,
  className: string,
  width?: number,
  vCentered?: boolean,
  hCentered?: boolean,
  style?: Object
}

class _Row extends React.Component<RowProps> {
  render() {
    return (
      <div style={this.props.style} className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

export const Row = styled(_Row)`
  display: flex;
  flex: 1;
  width: 100%;
  flex-direction: row;
  ${props => props.width && css`
    flex: 0 0 ${props.width}%;
    max-width: ${props.width}%;
  `}
  ${props => props.offset && css`
    margin-left: ${props.offset}%;
  `}
  ${props => props.vCentered && css`
    align-items: center;  
  `}
  ${props => props.hCentered && css`
    justify-content: center;
  `}
  
`;

type GridProps = {
  gutterWidth?: number,
  responsivePhone?: boolean,
  responsiveTablet?: boolean,
  responsiveDesktop?: boolean,
  children: any,
  className: string
}

class _Grid extends React.Component<GridProps> {
  render() {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}

export const Grid = styled(_Grid)`
  display: flex;
  flex-flow: row wrap;
  width: 100%;
  & + &{
    margin-top: ${props => ((props.gutterWidth || gutterWidth) / 2) * -1}px;
    padding-top: 0;
  }
  padding: ${props => (props.gutterWidth || gutterWidth) / 2}px;
  > ${Column}{
    padding: ${props => (props.gutterWidth || gutterWidth) / 2}px;
  }
  @media (max-width: ${responsivePhoneBreak}){
    ${props => props.responsivePhone && css`
      flex-direction: column;
      > ${Column}{
        margin-bottom: ${((props.gutterWidth || gutterWidth) * 3) / 2}px;
        margin-left: 0;
        max-width: 100%;
        width: 100%;
      }
    `}
  }
  @media (max-width: ${responsiveTabletBreak}){
    ${props => props.responsiveTablet && css`
      flex-direction: column;
      > ${Column}{
        margin-bottom: ${((props.gutterWidth || gutterWidth) * 3) / 2}px;
        margin-left: 0;
        max-width: 100%;
        width: 100%;
      }
    `}
  }
  @media (max-width: ${responsiveDesktopBreak}){
    ${props => props.responsiveDesktop && css`
      flex-direction: column;
      > ${Column}{
        margin-bottom: ${((props.gutterWidth || gutterWidth) * 3) / 2}px;
        margin-left: 0;
        max-width: 100%;
        width: 100%;
      }
    `}
  }
  ${props => props.gutterless && css`
    padding: 0;
    > ${Column}{
      padding: 0;
    }
  `}
`;

type SectionProps = {
  title: string,
  instructions?: string,
  isPrivate?: boolean,
  isReadOnly?: boolean,
  children?: any,
  className?: string
}

class _Section extends React.Component<SectionProps> {


  render() {


    return this.props.isReadOnly
      ? (
        <TwoColumnLayoutRow>
          <LeftGutter>
            <SectionTitle style={{textAlign: 'left'}}>{this.props.title}</SectionTitle>
            {
              this.props.instructions &&
              <Instructions>
                {this.props.instructions}
              </Instructions>
            }
          </LeftGutter>
          <Spacer />
          <Column style={{flex: 5}}>
            {this.props.children}
          </Column>
        </TwoColumnLayoutRow>
      )
      : (
        <OneColumnLayoutGrid desktop>
          <SectionFullWidth>
            {
              this.props.isPrivate &&
                <PrivateIndicator><PrivateIcon fontAwesomePrefix='fal' name="lock" /> <span>PRIVATE</span></PrivateIndicator>
            }
            <SectionTitle>{this.props.title}</SectionTitle>
            {
              this.props.instructions &&
              <Instructions>
                {this.props.instructions}
              </Instructions>
            }
            {this.props.children}
          </SectionFullWidth>
        </OneColumnLayoutGrid>
      );
  }
}

export const Section = styled(_Section)`
  border: 1px solid #EFEFEF;
`;

const PrivateIcon = styled(Icon)`
  color: #ffdcd8;
  margin-right: 5px;
  font-size: 1.2em;
  ${media.phone`
    margin: 0;
    font-size: 1em;
    padding: 0;
  `}
`;

const PrivateIndicator = styled.div`
  color: #f7e2e1;
  background: #f4766e;
  padding: 0 30px 0 20px;
  border-radius: 10px;
  font-size: 1.1em;
  z-index: 99;
  top: 0;
  right: 0;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${media.phone`
    padding: 5px 10px;
    & span {
      display: none;
    }
  `}
`;

const OneColumnLayoutGrid = styled(Grid)`
  padding: 0 35px;
  ${media.phone`
    padding: 0;
  `}
`;

const TwoColumnLayoutRow = styled(Row)`
  padding: 20px 35px;
`;

const SectionFullWidth = styled.div`
  flex: 1;
  margin-bottom: 15px;
  position: relative;
  width: 100%;
`;

const SectionTitle = styled.h2`
  margin-top: 0;
  text-align: left;
`;

const LeftGutter = styled.div`
  flex: 1.2;
  margin-bottom: 15px;
`;

const Instructions = styled.p`
  font-size: 14px;
  color: #999;
`;