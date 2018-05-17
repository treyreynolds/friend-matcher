//@flow

import * as React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';

import { getMergedProps } from 'utils/utils';
import styled, {css} from 'styled-components';
import Button from 'components/button/button';

import sortable from 'components/sortable/sortable';
import {addIds, listsShallowEqual, move, removeIds, randomId} from './sortable-collection-utils';

type SortableCollectionProps = {
  ItemComponent: any,
  items: any,
  onChange: any,
  sortOverride?: (any) => mixed,
  newItem: any,
  itemProps?: any,
  buttonText?: string
};

type SortableCollectionState = {
  items: any,
  undecoratedItems: any
};

class SortableCollection extends React.Component<SortableCollectionProps, SortableCollectionState> {

  SortableItemComponent = sortable(SortableItem);
  didJustAddItem = false;

  state = {
    items: addIds(this.props.items),
    undecoratedItems: this.props.items
  };

  static getDerivedStateFromProps(nextProps: SortableCollectionProps, prevState: SortableCollectionState) {
    if (nextProps.items !== prevState.undecoratedItems) {
      return {
        items: addIds(nextProps.items)
      };
    }
    return null;
  }

  handleReorder(dragIndex: number, hoverIndex: number) {
    const items = move(this.state.items, dragIndex, hoverIndex);
    const sortedItems = this.sortItems(items);
    if (listsShallowEqual(sortedItems, items)) {
      this.updateItems(items);
      return true; // Did reorder
    }
    return false; // Did not reorder
  }

  handleItemChange(id: any, data: any) {
    this.updateItems(this.sortItems(this.state.items.map((item) =>
      item.id === id ? {id, data} : item
    )));
  }

  sortItems(items: any) {
    if (typeof this.props.sortOverride === 'function') {
      // $FlowFixMe
      return _.sortBy(items, ({data}) => this.props.sortOverride(data));
    }
    return items;
  }

  updateItems(items: any) {
    const undecoratedItems = removeIds(items);

    this.setState({
      items,
      undecoratedItems
    });

    this.props.onChange(undecoratedItems);
  }

  handleItemDelete(id: any) {
    this.updateItems(_.reject(this.state.items, {id}));
  }

  handleAddItem() {
    const currentItems = !_.isEmpty(this.state.items)
      ? this.state.items
      : [];

    this.updateItems(this.sortItems([...currentItems, {
      id: randomId(),
      data: this.props.newItem
    }]));
    this.didJustAddItem = true;
  }

  componentDidUpdate() {
    if (this.didJustAddItem) {
      this.focusNewItem();
      this.didJustAddItem = false;
    }
  }

  focusNewItem() {
    const itemElem = ReactDOM.findDOMNode(this.refs.lastItem);
    const inputElem = findByTagName(itemElem, ['input', 'select']);
    if (inputElem) {
      inputElem.focus();
    }
  }

  render() {
    return (
      <div>
        {
          this.state.items
            ? this.state.items.map(({id, data}, index) => (
              // $FlowFixMe
              <this.SortableItemComponent
                key={id}
                index={index}
                data={data}
                onReorder={(dragIndex, hoverIndex) => this.handleReorder(dragIndex, hoverIndex)}
                onChange={(data) => this.handleItemChange(id, data)}
                onDelete={() => this.handleItemDelete(id)}
                ItemComponent={this.props.ItemComponent}
                ref={index === this.state.items.length - 1 ? 'lastItem' : null}
                {...this.props.itemProps}
              />
            ))
            : null
        }
        {
          this.props.newItem
            ? (
              <AddItemButton outline type="success" small onClick={() => this.handleAddItem()}>
                {this.props.buttonText || 'Add Item'}
              </AddItemButton>
            )
            : null
        }
      </div>
    );
  }
}

const AddItemButton = styled(Button)`
  margin-top: 10px;
`;

type SortableItemProps = {
  ItemComponent: any,
  data: any,
  onChange: any,
  onDelete: any,
  connectSortable: any,
  isDragging: any
}

class SortableItem extends React.Component<SortableItemProps> {

  render() {
    const {data, ItemComponent, onChange, onDelete} = this.props;
    return this.props.connectSortable(
      <div>
        <EditableItem isDragging={this.props.isDragging}>
          <ItemComponent
            data={data}
            onChange={onChange}
            onDelete={onDelete}
            {...getMergedProps(this)}
          />
        </EditableItem>
      </div>
    );
  }
}

const EditableItem = styled.div`
  display: flex;
  visibility: visible;
  ${props => props.isDragging && css`
    visibility: hidden;
  `}
`;

// $FlowFixMe
function findByTagName(parent: Element | Text | null, tagNames) {
  if(parent && parent.children && parent.children.length){
    // $FlowFixMe
    for (let i = 0; i < parent.children.length; i++) {
      // $FlowFixMe
      const elem = parent.children[i];
      if (tagNames.indexOf(elem.tagName.toLowerCase()) !== -1) {
        return elem;
      }
      const ret = findByTagName(elem, tagNames);
      if (ret) {
        return ret;
      }
    }
  } else {
    return null;
  }
}

export default SortableCollection;
