// @flow

import React from 'react';
import Icon from 'components/icon/icon';
import styled from 'styled-components';

type EditControlsProps = {
  EditableComponent: any,
  ReadOnlyComponent: any,
  data: any,
  onSave: () => void,
  onChange: (any) => void
}

type EditControlsState = {
  isEditMode: boolean,
  data: ?Object
}

export default class EditControls extends React.Component<EditControlsProps, EditControlsState> {

  state = {
    isEditMode: false,
    data: null
  };

  handleToggleEdit() {
    if (this.state.isEditMode) {
      this.setState({isEditMode: false, data: null});
    } else {
      this.setState({isEditMode: true});
    }
  }

  handleSave() {
    this.handleToggleEdit();
    this.props.onSave();
  }

  handleChange(data: any) {
    this.props.onChange({ ...data });
  }

  renderEditingControls() {
    return (
      <EditControlsDiv>
        <SaveIcon
          name="check"
          theme="dark"
          onClick={() => this.handleSave()}
          disabled={!this.state.data}
        />
        <CancelIcon
          name="times"
          theme="dark"
          onClick={() => this.handleToggleEdit()}
        />
      </EditControlsDiv>
    );
  }

  renderEditButton() {
    return (
      <EditControlsDiv>
        <EditIcon
          name="edit"
          theme="dark"
          onClick={() => this.handleToggleEdit()}
        />
      </EditControlsDiv>
    );
  }

  render() {
    const {EditableComponent, ReadOnlyComponent} = this.props;
    return (
      <EditControlBox isEditMode={this.state.isEditMode}>
        {
          this.state.isEditMode
            ? (
              <EditableComponent
                onChange={(data) => this.handleChange(data)}
                profile={this.props.data}
              />
            )
            : (
              <ReadOnlyComponent
                profile={this.props.data}
              />
            )
        }
        {
          this.state.isEditMode
            ? this.renderEditingControls()
            : this.renderEditButton()
        }
      </EditControlBox>
    );
  }
}

const EditControlsDiv = styled.div`
  position: absolute;
  left: -20px;
  top: 20px;
`;

const IconBase = styled(Icon)`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  font-size: 18px;
  margin-bottom: 10px;
  transition: opacity .2s, background-color .2s;
`;

const SaveIcon = styled(IconBase)`
  background-color: #4eb783;
  &:hover:not(.disabled) {
    background-color: darken(#4eb783, 10%);
  }
`;

const CancelIcon = styled(IconBase)`
  background-color: #EC653C;
  &:hover {
    background-color: darken(#EC653C, 10%);
  }
`;

const EditIcon = styled(IconBase)`
  transform: scaleX(-1);
  opacity: 0;
  background-color: #3B769D;
  &:hover {
    background-color: darken(#3B769D, 10%);
  }
`;

const EditControlBox = styled.div`
  border-top: 1px transparent solid;
  border-bottom: 1px transparent solid;
  position: relative;
  &:hover {
    ${EditIcon} {
      opacity: 1;
    }
  }
`;