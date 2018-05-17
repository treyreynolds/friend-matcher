// @flow
import React, { Component } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import media from 'utils/media-queries';

import { transformFriendSheetData } from 'utils/utils';
import AiTrainingEngine from '../../components/ai-training/ai-training-engine';
import Activity from './activity';

import { Row } from 'components/layout/layout';

import LoadingIndicator from 'components/loading-indicator/loading-indicator';
import InfoTooltip from 'components/info-tooltip/info-tooltip';

import aiIcon from 'assets/images/ai-icon.png';

import type { TrainingType } from 'utils/shared-types';

type State = {
  training: TrainingType,
  friendCards: Array<?Object>,
}

export default class FriendAi extends Component<{}, State> {


  state = {
    training: {
      friendAi: [],
      friendMatches: []
    },
    friendCards: []
  };

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

  handleUpdateChoices(choices: any) {
    this.setState({
      training: _.assign({}, this.state.training, {
        friendAi: _.assign([], this.state.training.friendAi, choices)
      })
    });
  }

  render() {
    if(_.isEmpty(this.state.friendCards)){
      return (
        <Wrapper>
          <LoadingIndicator/>
        </Wrapper>
      );
    }

    return (
      <Wrapper>
        <IntroRow>
          <Title>
            <h2>Train This Creepy Friend A.I.</h2>
            <InfoTooltip
              placement="bottom"
              dark
              text="Approve or reject at least 15 items in order to train the artificial intelligence engine for culture matching" />
          </Title>
          <AiBrainImage src={aiIcon} alt="Artificial Intelligence" />
        </IntroRow>
        <AiTrainingEngine
          trainingItems={this.state.friendCards}
          itemComponent={Activity}
          choices={this.state.training.friendAi}
          onUpdateChoices={(val) => this.handleUpdateChoices(val)}
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  color: #111;
  display: flex;
  flex: 1;
  width: 100%;
  justify-content: center;
  align-items: center;
  min-height: 250px;
  flex-direction: column;
`;


const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const IntroRow = styled(Row)`
  justify-content: space-between;
  align-items: center;
  ${media.phone`
    margin-bottom: 0;
  `}
`;

const AiBrainImage = styled.img`
  width: 80px;
  height: 80px;
  margin-right: 10px;
  flex-shrink: 0;
  ${media.phone`
    width: 64px;
    height: 64px;
  `}
`;