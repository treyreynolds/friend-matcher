// @flow
import React, { Component } from 'react';
import _ from 'lodash';

import { transformFriendSheetData } from 'utils/utils';
import AiTrainingResults from 'components/ai-training/ai-training-results';
import LoadingIndicator from 'components/loading-indicator/loading-indicator';

import type { TrainingType, FeedbackType } from 'utils/shared-types';
import styled from 'styled-components';

type FriendAiResultsState = {
  debugging: boolean,
  training: TrainingType,
  feedback: FeedbackType,
  friendCards: Array<?Object>
}

export default class FriendAiResults extends Component<{}, FriendAiResultsState> {

  state = {
    training: {
      friendAi: [],
      friendMatches: []
    },
    feedback: {
      friendTrainingRating: null
    },
    debugging: false,
    friendCards: []
  };

  handleToggleDebug() {
    this.setState({debugging: !this.state.debugging});
  }

  handleUpdateMatches(friendMatches: any) {
    this.setState({
      training: _.assign({}, this.state.training, { friendMatches })
    });
  }

  handleUpdateRating(friendTrainingRating: number) {
    this.setState({
      feedback: _.assign({}, this.state.feedback, { friendTrainingRating })
    });
  }

  handleStartOver() {
    this.setState({
      training: _.assign({}, this.state.training, { friendMatches: [], cultureAi: [] }),
      feedback: _.assign({}, this.state.feedback, { friendTrainingRating: null })
    });
  }

  componentDidMount() {
    const friendCardsJSON = localStorage.getItem('friendCards');
    const friendCards = JSON.parse(friendCardsJSON || '[]');

    if(friendCards && friendCards.length > 0){
      this.setState({ friendCards });
    } else {
      fetch('https://sheetsu.com/apis/v1.0su/ed69e83ecc85')
        .then( (response) => {
          return response.json();
        }).then( (json) => {
          const friendCards = _.shuffle(transformFriendSheetData(json));
          this.setState({friendCards});
          localStorage.setItem('friendCards', JSON.stringify(friendCards));
        });
    }
  }

  render() {

    return (
      <div>
        {
          !this.state.friendCards || this.state.friendCards.length === 0
            ? (
              <Wrapper>
                <LoadingIndicator />
                Processing Match Data
              </Wrapper>
            )
            : (
              <AiTrainingResults
                trainingItems={this.state.friendCards}
                choices={this.state.training.friendAi}
                matches={this.state.training.friendMatches}
                rating={this.state.feedback.friendTrainingRating}
                horoscopeSentence={'culture'}
                onChangeMatches={(matches) => this.handleUpdateMatches(matches)}
                onChangeRating={(rating) => this.handleUpdateRating(rating)}
                onStartOver={() => this.handleStartOver()}
              />
            )
        }

      </div>
    );
  }
}

const Wrapper = styled.div`
  color: #999;
  font-weight: 300;
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  min-height: 350px;
  flex-direction: column;
`;