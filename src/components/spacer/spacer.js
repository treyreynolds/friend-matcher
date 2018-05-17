//@flow

import React from 'react';

type Props = {
  min?: number,
  max?: number,
  width?: number,
  height?: number
};

class Spacer extends React.Component<Props> {

  render() {
    const {min, max, width, height} = this.props;
    const styles = {};
    if (width) {
      styles.width = width + 'px';
    } else if (min && max) {
      styles.minWidth = min + 'px';
      styles.maxWidth = max + 'px';
      styles.flex = 1;
    } else {
      styles.minWidth = 20 + 'px';
      styles.maxWidth = 30 + 'px';
      styles.flex = 1;
    }

    if (height) {
      styles.height = height + 'px';
    } else if (min && max) {
      styles.minHeight = min + 'px';
      styles.maxHeight = max + 'px';
      styles.flex = 1;
    } else {
      styles.minHeight = 20 + 'px';
      styles.maxHeight = 30 + 'px';
      styles.flex = 1;
    }

    return (
      <div style={styles} />
    );
  }
}

export default Spacer;
