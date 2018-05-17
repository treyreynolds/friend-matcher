//@flow

import React from 'react';
import _ from 'lodash';
import {findDOMNode} from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd';

const sortableDragSource = {
  beginDrag({id, index}) {
    return {
      id,
      index
    };
  }
};

const sortableDropTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    // $FlowFixMe
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    if (props.onReorder(dragIndex, hoverIndex)) {
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      monitor.getItem().index = hoverIndex;
    }
  }
};

function sortable(Item: Object) {
  const dndType = `sortable-${random()}`;

  type SortableItemProps = {
    connectDragSource: any,
    connectDropTarget: any,
    isDragging: boolean
  }

  class SortableItem extends React.Component<SortableItemProps> {

    propTypeKeys = _.keys(SortableItem.propTypes);

    connectSortable(virtualDom) {
      return this.props.connectDragSource(
        this.props.connectDropTarget(virtualDom)
      );
    }

    render() {
      const props = _.assign(
        {
          connectSortable: (val) => this.connectSortable(val),
          isDragging: this.props.isDragging
        },
        _.omit(this.props, this.propTypeKeys)
      );
      return <Item {...props}/>;
    }
  }
  return DropTarget(dndType, sortableDropTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))(
    DragSource(dndType, sortableDragSource, (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }))(SortableItem));
}

function random() {
  return Math.floor(Math.random() * 1000000000000);
}

export default sortable;