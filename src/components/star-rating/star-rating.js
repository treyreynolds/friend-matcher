import React, { Component } from 'react';
import { randomId } from 'utils/utils';

import Rater from 'react-rater';
import 'react-rater/lib/react-rater.css';

type StarRatingProps = {
  value: ?number,
  starCount: number,
  onChange: (number) => void,
  disabled?: boolean,
  className?: string
};

export default class StarRating extends Component<StarRatingProps> {
  _name: String = '';

  constructor(props: StarRatingProps) {
    super(props);
    this._name = randomId();
  }

  handleChange(e){
    if(e.type === 'click'){
      this.props.onChange(e.rating);
    }
  }

  render() {
    return (
      <Rater
        total={this.props.starCount}
        rating={this.props.value}
        onRate={(e) => this.handleChange(e)}
      />
    );
  }
}