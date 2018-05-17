// @flow
import * as React from 'react';
import _ from 'lodash';
import styled from 'styled-components';

import ProgressBar from 'components/progress-bar/progress-bar';


type AiTrainingEngineProps = {
  trainingItems: Array<?Object>,
  itemComponent: any,
  choices: Array<?Object>,
  onUpdateChoices: any
};

type AiTrainingEngineState = {
  trainingItems: Array<?Object>,
  activeIndex: number,
  neuralNetResultsData: ?{
    iterations: number,
    error: number
  },
  trainingPaused: boolean
}

export default class AiTrainingEngine extends React.Component<AiTrainingEngineProps, AiTrainingEngineState> {

  state = {
    trainingItems: this.props.trainingItems,
    activeIndex: 0,
    neuralNetResultsData: null,
    trainingPaused: false
  };

  handleChoice(item: Object, choice: boolean | number, index: number){
    // Note the "input", "output", and "match" format are from the Brain.JS API requirements
    const currentChoices = this.props.choices || [];
    // Job function training is boolean, cultures are 1-5 numbers
    const match = choice === true ? 1 : choice === false ? 0 : _.isNumber(choice) ? choice : 0;
    const choices = [...currentChoices, {id: item.id, input: item.stats, output: { match }}];

    this.props.onUpdateChoices(choices);

    this.setState({
      activeIndex: choices.length
    });

  }

  handleSkip(id: string){
    this.setState({
      trainingItems: _.filter(this.state.trainingItems, t => t.id !== id)
    });
  }

  render() {
    const ItemComponent = this.props.itemComponent;

    return (
      <TrainingWrapper>
        {
          _.map(this.state.trainingItems, (item, index) => {
            return (
              <ItemWrapper
                key={index}
                active={this.state.activeIndex === index}
              >
                <ItemComponent
                  data={item}
                  onChoice={(choice) => this.handleChoice(item, choice, index)}
                  onSkip={() => this.handleSkip(item.id)}
                />
              </ItemWrapper>
            );
          })
        }
        <ProgressBar value={this.props.choices ? this.props.choices.length * 6.667 : 0} />
        <ProgressText>
          {this.props.choices ? this.props.choices.length : 0} of 15 -- <strong>Note: more training is better!</strong>
        </ProgressText>
      </TrainingWrapper>
    );
  }
}

const TrainingWrapper = styled.div`
  width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const ItemWrapper = styled.div`
  display: ${props => props.active ? 'flex' : 'none'};
  transition: all 0.3s ease;
`;

const ProgressText = styled.div`
  margin-top: 5px;
  margin-bottom: 20px;
  font-size: .8em;
  color: #666;
  text-align: left;
  align-self: flex-start;
`;
