// @flow
import React, { Component } from 'react';
import _ from 'lodash';

import styled, { css } from 'styled-components';
import media from 'utils/media-queries';

import Button from 'components/button/button';
import Icon from 'components/icon/icon';
import ScoreSlider from 'components/score-slider/score-slider';
import { Instructions } from 'components/common/common';
import { buildCareerAiSentence, buildCultureAiSentence, averageMatchStats } from 'utils/utils';
import InfoTooltip from 'components/info-tooltip/info-tooltip';
import brain from 'brain.js';

import aiIcon from 'assets/images/ai-icon-v2.png';


type AiResultsProps = {
  trainingItems: Array<?Object>,
  choices: Array<?Object>,
  matches: Array<?Object>,
  rating: ?number,
  horoscopeSentence?: string,
  onChangeMatches: (any) => void,
  onChangeRating: (number) => void,
  onStartOver: () => void
}

type AiResultsState = {
  debugging: boolean,
  neuralNetResultsData: ?{
    iterations: number,
    error: number
  }
}

export default class CareerAiResults extends Component<AiResultsProps, AiResultsState> {
  state = {
    debugging: false,
    neuralNetResultsData: null
  };

  _neuralNet :{
    train: (Array<?Object>) => ({iterations: number, error: number}),
    run: (Object) => ({match: number})
  };

  constructor(props: AiResultsProps) {
    super(props);
    this._neuralNet = new brain.NeuralNetwork({
      activation: 'sigmoid'
    });
  }

  componentDidMount(){
    if(!_.isEmpty(this.props.choices) && _.isEmpty(this.props.matches)){
      this.handleTraining();
    }
  }

  handleTraining(){
    const sanitizedChoices = JSON.parse(JSON.stringify(this.props.choices), (key, value) =>
      key === '__typename'
        ? undefined
        : value
    );
    const neuralNetResultsData = this._neuralNet.train(sanitizedChoices);

    // TODO: remove the already rated matches
    const matches = _(this.props.trainingItems)
      .map(t => {
        const matchRun = this._neuralNet.run(t.stats);
        return {
          id: t.id,
          score: matchRun.match,
          description: t.description,
          stats: t.stats,
          approved: false
        };
      })
      .sortBy('score')
      .slice(-3)
      .reverse()
      .value();

    this.setState({neuralNetResultsData});
    this.props.onChangeMatches(matches);
  }

  handleReject(rejectedMatch: any) {
    const trainingData = [...this.props.choices,
      {id: rejectedMatch.id, input: rejectedMatch.stats, output: { match: 0 }}];
    const neuralNetResultsData = this._neuralNet.train(trainingData);

    const {trainingItems} = this.props;
    const unmatched = _.filter(trainingItems, t => !_.find(this.props.matches, {'id': t.id}));

    const newMatch = _(unmatched)
      .map(t => {
        const matchRun = this._neuralNet.run(t.stats);
        return {
          id: t.id,
          score: matchRun.match,
          description: t.description,
          stats: t.stats,
          approved: false
        };
      })
      .sortBy('score')
      .reverse()
      .head();

    const matches = [
      ..._.filter(this.props.matches, j => j.id !== rejectedMatch.id),
      newMatch
    ];

    this.setState({neuralNetResultsData});
    this.props.onChangeMatches(matches);
  }

  handleApprove(match: any) {
    const matchIndex = _.findIndex(this.props.matches, ['id', match.id]);
    const matches = [
      ...this.props.matches.slice(0,matchIndex),
      {
        ...this.props.matches[matchIndex],
        approved: true
      },
      ...this.props.matches.slice(matchIndex + 1)
    ];

    this.props.onChangeMatches(matches);
  }

  handleToggleDebug() {
    this.setState({debugging: !this.state.debugging});
  }

  render() {

    const { matches } = this.props;
    const { neuralNetResultsData } = this.state;
    const allMatchesRated = matches && matches.length > 0 && _.reduce(matches, (acc, {approved}) => acc && approved, true);

    return (
      <TopMatches>
        <MatchesHeader>
          Click to <em>Approve</em> or <em>Replace</em> Your Top Matches
          <InfoTooltip
            dark
            text="Approve or reject each job match to finalize your career ai training. These job functions are informative examples only." />
          <DebugIcon name={this.state.debugging ? 'minus' : 'plus'} onClick={() => this.handleToggleDebug()} />
        </MatchesHeader>
        {
          <HiddenDebugData debugging={this.state.debugging}>
            <h4>Debug Data</h4>
            {
              neuralNetResultsData && neuralNetResultsData.error &&
              <div>
                <div><strong>Error Rate:</strong> {neuralNetResultsData.error}</div>
                <div><strong>Training Iterations:</strong> {neuralNetResultsData.iterations}</div>
              </div>
            }
            <MatchScores>
              {
                _.map(averageMatchStats(matches), s =>
                  <MatchScore key={s.stat}>
                    <strong>{s.stat}</strong>:
                    <span>{s.score}</span>
                  </MatchScore>
                )
              }
            </MatchScores>
          </HiddenDebugData>
        }
        {
          _.map(matches, (match, index) =>
            <Match
              key={index}
              description={match ? match.description : ''}
              approved={match.approved}
              onReject={() => this.handleReject(match)}
              onApprove={() => this.handleApprove(match)}
            />
          )
        }
        <ResetWrapper>
          <ResetLink onClick={() => this.props.onStartOver()}>Reset Training and Start Over</ResetLink>
        </ResetWrapper>
        {
          allMatchesRated && this.props.horoscopeSentence &&
            <Horoscope>
              <AiIcon src={aiIcon} alt={'Artificial Intelligence'} />
              <Sentence>
                <QuoteIcon>&ldquo;</QuoteIcon>
                {
                  this.props.horoscopeSentence === 'career'
                    ? buildCareerAiSentence(matches)
                    : this.props.horoscopeSentence === 'culture'
                      ? buildCultureAiSentence(matches)
                      : null
                }
              </Sentence>
            </Horoscope>
        }
        {
          allMatchesRated
            ? (
              <RateTraining>
                <h3>Rate Our Training Peformance <BetaOnlyLabel>BETA ONLY</BetaOnlyLabel></h3>
                <ScoreSlider
                  highLabel={'Nailed It'}
                  lowLabel={'Not even close'}
                  startingValue={this.props.rating || 50}
                  onSave={(rating) => this.props.onChangeRating(rating)}
                />
              </RateTraining>
            )
            : <Instructions>You must approve or replace all matches before continuing</Instructions>
        }

      </TopMatches>
    );
  }
}

const TopMatches = styled.div`
  margin-top: 5px;
  width: 100%;
`;

const MatchesHeader = styled.h3`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  & em {
    color: #000;
    margin: 0 5px;
  }
`;

const DebugIcon = styled(Icon)`
  color: #FFF;
  font-size: 1.3em;
  margin-left: 15px;
  &:hover {
    color: #999;
  }
`;

const HiddenDebugData = styled.div`
  display: ${props => props.debugging ? 'flex' : 'none'};
  flex: 1;
  background: #f9f9f9;
  padding: 0 25px 25px 25px;
  border: #EEE;
  flex-direction: column;
  border-radius: 15px;
`;

const MatchScores = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 15px -10px 0 -10px;
`;

const MatchScore = styled.div`
  background: #fff;
  color: #2c616f;
  padding: 10px;
  margin: 5px 10px;
  border-radius: 10px;
  flex-direction: row;
  display: flex;
  flex-wrap: nowrap;
  flex-shrink: 0;
  border: 1px solid #FFF;
  &>span {
    color: #0082f3;
    margin-left: 5px;
  }
`;

const MatchFunctionDescription = styled.div`
  color: #2a2a2a;
  font-size: 1.1em;
  padding: 10px;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  margin-right: 20px;
`;


const ResetWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 0;
`;

const ResetLink = styled.a`
  font-size: 15px;
  color: ${props => props.theme.primary};
  cursor: pointer;
  &:hover {
    color: #004b91;
  }
`;

const RateTraining = styled.div`
  background: #f9f9f9;
  padding: 10px 20px 0 20px;
  border-radius: 15px;
  ${media.phone`
    padding: 5px 10px;
  `}
`;

const Horoscope = styled.div`
  font-size: 1.1em;
  margin: 25px 0;
  border: 1px solid #f1f1f1;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  flex: 1;
`;

const Sentence = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 999;
  padding-left: 40px;
  position: relative;
  ${media.phone`
    padding-left: 5px;
  `}
`;

const QuoteIcon = styled.div`
  font-family: Georgia, serif;
  font-size: 3.5em;
  color: #DDD;
  position: absolute;
  top: -15px;
  left: 0;
  ${media.phone`
    display: none;
  `}
`;

const AiIcon = styled.img`
  height: 64px;
  width: 64px;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 15px;
`;

const BetaOnlyLabel = styled.span`
  background: ${props => props.theme.primaryLight};
  font-size: .8em;
  font-weight: 100;
  color: #FFF;
  padding: 5px 15px;
  border-radius: 5px;
`;

type MatchProps = {
  description: string,
  approved: boolean,
  onReject: () => void,
  onApprove: () => void
};

class Match extends Component<MatchProps> {

  render() {
    return (
      <MatchWrapper isApproved={this.props.approved}>
        <MatchFunctionDescription>
          {this.props.description}
        </MatchFunctionDescription>
        <Actions>
          <ApproveButton
            type="success"
            outline
            small
            isDisabled={this.props.approved}
            onClick={() => !this.props.approved && this.props.onApprove()}
          >
            Yes
          </ApproveButton>
          {
            !this.props.approved &&
            <DeclineButton type="danger" outline small  onClick={() => this.props.onReject()}>No</DeclineButton>
          }
        </Actions>
      </MatchWrapper>
    );
  }
}


const MatchWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
  align-items: center;
  border-left: 3px solid ${props => props.isApproved ? '#4eb783' : '#f3f3f3'};
  padding: 10px;
  opacity: ${props => props.isApproved ? '0.85' : '1'};
`;

const Actions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ApproveButton = styled(Button)`
  ${props => props.isDisabled && css`
    background: #a7e0b5;
    border-color: #a7e0b5;
  `}
`;

const DeclineButton = styled(Button)`
  margin-left: 5px;
`;
