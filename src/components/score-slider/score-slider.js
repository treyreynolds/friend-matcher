// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import media from 'utils/media-queries';

import Slider from 'rc-slider/lib/Slider';
import 'rc-slider/assets/index.css';


type ScoreSliderProps = {
  lowLabel: string,
  highLabel: string,
  startingValue?: number,
  onSave: Function
};

type ScoreSliderState = {
  score: number
};

class ScoreSlider extends Component<ScoreSliderProps, ScoreSliderState> {
  state = {
    score: this.props.startingValue ? parseInt(this.props.startingValue,10) : 50
  };

  _handleChange(val: number) {
    this.setState({score: val !== 0 ? val : 1});
  }

  static getDerivedStateFromProps(nextProps: ScoreSliderProps, prevState: ScoreSliderState){
    if(nextProps.startingValue && prevState.score !== nextProps.startingValue){
      return {
        score: parseInt(nextProps.startingValue,10)
      };
    }

    return null;
  }

  render() {

    return (
      <SliderContainer>
        <Indicators>
          <Indicator active={this.state.score < 5}  position={9} />
          <Indicator active={this.state.score < 10} position={8} />
          <Indicator active={this.state.score < 15} position={7} />
          <Indicator active={this.state.score < 20} position={6} />
          <Indicator active={this.state.score < 25} position={5} />
          <Indicator active={this.state.score < 30} position={4} />
          <Indicator active={this.state.score < 35} position={3} />
          <Indicator active={this.state.score < 40} position={2} />
          <Indicator active={this.state.score < 45} position={1} />
          <Indicator active={this.state.score < 50} position={0} />

          <Indicator active={this.state.score > 50} position={0} />
          <Indicator active={this.state.score > 55} position={1} />
          <Indicator active={this.state.score > 60} position={2} />
          <Indicator active={this.state.score > 65} position={3} />
          <Indicator active={this.state.score > 70} position={4} />
          <Indicator active={this.state.score > 75} position={5} />
          <Indicator active={this.state.score > 80} position={6} />
          <Indicator active={this.state.score > 85} position={7} />
          <Indicator active={this.state.score > 90} position={8} />
          <Indicator active={this.state.score > 95} position={9} />
        </Indicators>

        <MobileIndicators>
          <Indicator active={this.state.score < 5}  position={9} />
          <Indicator active={this.state.score < 15} position={7} />
          <Indicator active={this.state.score < 25} position={5} />
          <Indicator active={this.state.score < 35} position={3} />
          <Indicator active={this.state.score < 45} position={1} />
          <Indicator active={this.state.score < 50} position={0} />

          <Indicator active={this.state.score > 55} position={1} />
          <Indicator active={this.state.score > 65} position={3} />
          <Indicator active={this.state.score > 75} position={5} />
          <Indicator active={this.state.score > 85} position={7} />
          <Indicator active={this.state.score > 95} position={9} />
        </MobileIndicators>
        <Slider
          defaultValue={this.props.startingValue ? parseInt(this.props.startingValue,10) : 50}
          value={this.state.score}
          trackStyle={{ backgroundColor: '#CCC', height: 10, borderRadius: 0 }}
          handleStyle={{
            borderWidth: 3,
            borderColor: '#68bad0',
            height: 25,
            width: 25,
            marginLeft: -12,
            marginTop: -8,
            backgroundColor: '#FFF'
          }}
          railStyle={{ backgroundColor: '#DDD', height: 10, borderRadius: 0 }}
          onChange={(val) => this._handleChange(val)}
          onAfterChange={this.props.onSave}
        />
        <Legend>
          <Label>{this.props.lowLabel}</Label>
          <Label>{this.props.highLabel}</Label>
        </Legend>
      </SliderContainer>
    );
  }

}

const SliderContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  height: 150px;
  overflow: hidden;
  flex-shrink: 0;
  padding: 20px;
  ${media.phone`
    padding: 5px;
  `}
`;

const Legend = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  justify-content: space-between;
  margin-top: 15px;
`;

const Label = styled.div`
  color: ${props => props.theme.darkText};
  font-size: 1em;
`;

const Indicators = styled.div`
  height: 80px;
  display: flex;
  flex-direction: row;
  margin-bottom: -5px;
  align-items: flex-end;
  justify-content: space-between;
  flex-shrink: 0;
  ${media.phone`
    display: none;
  `}
`;

const MobileIndicators = styled.div`
  height: 50px;
  display: none;
  flex-direction: row;
  margin-bottom: -5px;
  align-items: flex-end;
  justify-content: space-between;
  flex-shrink: 0;
  ${media.phone`
    display: flex;
  `}
`;

const Indicator = styled.div`
  height: ${props => (40 + props.position * 6) + '%'};
  display: flex;
  width: 12px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: ${props => props.theme.lightGrey};
  box-shadow: inset 0 ${props => props.active ? '-100px' : '0'} 0 0 ${props => props.theme.preferenceGradient[props.position]};
  transition: all ease 0.3s;
`;

export default ScoreSlider;