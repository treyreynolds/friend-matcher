// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import StarRating from 'components/star-rating/star-rating';

import type { FriendAiStatsType } from 'utils/shared-types';

type CareerCardProps = {
  data: {
    id: string,
    description: string,
    level: string,
    stats: FriendAiStatsType
  },
  onChoice: (number) => void,
  onSkip: () => void
};

type State = {
  rating: number
}

export default class Activity extends Component<CareerCardProps, State> {

  state = {
    rating: 0
  };

  handleChoice(rating: number) {
    this.props.onChoice(rating);
    this.setState({ rating });
  }

  render() {
    return (
      <Wrapper>
        <Description>
          {this.props.data.description}
        </Description>
        <ControlsArea>
          <StarRating
            rating={this.state.rating}
            starCount={5}
            onChange={(rating) => this.props.onChoice(rating)}
          />
        </ControlsArea>
        <SkipLink onClick={this.props.onSkip}>Skip this friend thing (will not affect training)</SkipLink>
      </Wrapper>
    );
  }

}


const Wrapper = styled.div`
  margin-bottom: 20px;
  border-bottom: 1px #ddd solid;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const Description = styled.div`
  font-size: 20px;
  line-height: 24px;
  color: #36373e;
  text-align: center;
  height: 150px;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ControlsArea = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: center;
  margin: 0 0 25px;
`;

const SkipLink = styled.a`
  font-size: 1em;
  color: ${props => props.theme.primary};
  margin: 15px auto 25px;
  cursor: pointer;
  &:hover {
    color: #004b91;
  }
  align-self: center;
`;
