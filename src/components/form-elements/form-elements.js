// @flow

import React, {Component} from 'react';
import {Grid, Row, Column} from 'components/layout/layout';
import { getMergedProps } from 'utils/utils';
import styled from 'styled-components';
import media from "utils/media-queries";
import Icon from 'components/icon/icon';
import _ from 'lodash';

type DraggableItemProps = {
  children: any,
  rightGutter?: any
};

class DraggableItem extends React.Component<DraggableItemProps> {

  render() {
    return (
      <EditableItem>
        <DragHandle />
        <Column vCentered hCentered>
          {this.props.children}
        </Column>
        {
          this.props.rightGutter &&
          <Column vCentered width={5}>
            {this.props.rightGutter}
          </Column>
        }
      </EditableItem>
    );
  }
}

const EditableItem = styled(Row)`
  padding: 10px;
  margin-bottom: 10px;
  border: 2px #eee solid;
  border-radius: 0;
  flex: 1;
  position: relative;
`;

type EditableFieldProps = {
  label?: string,
  className?: string,
  children?: any
};

class EditableField extends React.Component<EditableFieldProps> {

  render() {
    return (
      <Grid className={this.props.className} {...getMergedProps(this)}>
        {
          this.props.label &&
          <InputLabel>
            {this.props.label}
          </InputLabel>
        }
        {this.props.children}
      </Grid>
    );
  }
}


const InputLabel = styled.div`
  font-size: 10pt;
  color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 10px;
`;

class DragHandle extends React.Component<{}> {
  render() {
    return (
      <DragHandleColumn>
        <DragHandleCircle />
        <DragHandleCircle />
        <DragHandleCircle />
      </DragHandleColumn>
    );
  }
}


const DragHandleColumn = styled.div`
  display: flex;
  margin-right: 10px;
  justify-content: center;
  cursor: move;
  width: 40px;
  flex: 0;
  flex-direction: column;
  ${media.phone`
    display: none;
  `}
`;

const DragHandleCircle = styled.div`
  width: 6px;
  height: 6px;
  border-radius: 6px;
  border: 1px #aaa solid;
  margin-bottom: 2px;
`;

type SelectProps = {
  options: Array<?string>,
  placeholder?: string,
  className?: string,
  onChange: (string) => void
}

type SelectState = {
  open: boolean
}

class Select extends Component<SelectProps, SelectState> {

  state = {
    open: false
  };

  handleChange(value: any){
    this.setState({open: false});
    this.props.onChange(value);
  }

  render() {
    return (
      <StyledSelect className={this.props.className}>
        <DropdownToggle>
          <ToggleIcon name="chevron-down" />
          <Placeholder>Select from the following</Placeholder>
        </DropdownToggle>
        { // TODO: fix the selected state
          _.map(this.props.options, (option, index) => (
            <option key={index} value={option.value}>{option.text}</option>
          ))
        }
        <Dropdown open={this.state.open}>
          { // TODO: fix the selected state
            _.map(this.props.options, (option, index) => (
              <DropdownLink
                key={index}
                onClick={() => this.handleChange(option.value)}
              >
                {option.text}
              </DropdownLink>
            ))
          }
        </Dropdown>
      </StyledSelect>
    );
  }
}

const StyledSelect = styled.div`
  width: 100%;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  display: inline-block;
  position: relative;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  z-index: 900;
  color: #36373e;
  font-size: 15px;
  line-height: 22px;
  ${media.desktop`font-size: 1.3em;`}
  ${media.tablet`font-size: 1.1em;`}
  ${media.phone`font-size: 1em;`}
`;

const DropdownToggle = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  margin-right: 20px;
  width: 1em;
  height: 1em;
`;

const ToggleIcon = styled(Icon)`
  font-size: 24px;
  color: #222;
`;

const Placeholder = styled.div`
  color: #a4a5ad;
  font-size: 16px;
  font-weight: 400;
`;

const Dropdown = styled.nav`
  border: 1px solid #a4a5ad;
  background-color: #fff;
  display: ${props => props.open ? 'block' : 'none'};
  position: absolute;
  min-width: 100%;
`;

const DropdownLink = styled.a`
  padding: 10px 20px;
  display: block;
  color: #36373e;
  position: relative;
  vertical-align: top;
  text-decoration: none;
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  white-space: nowrap;
`

export {
  DraggableItem,
  EditableField,
  Select
};