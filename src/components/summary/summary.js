// @flow
import React, { Component } from 'react';
import styled from 'styled-components';

type Props = {};

class Summary extends Component<Props> {

  render() {
    return (
      <SummaryWrapper>
        <Title>Summary</Title>
        <Text>My ideal <em>next role</em> looks like...</Text>

        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean suscipit ultrices nisl, eu ornare leo
          accumsan vel. Morbi a hendrerit justo.
        </Text>

        <Text>
          Phasellus ultrices pulvinar orci id pellentesque. Sed non purus sagittis, volutpat purus ut, bibendum eros.
          In placerat felis elit.
        </Text>

        <Text>
          Nulla vulputate placerat aliquet. Aser non purus sagistiis.
        </Text>
      </SummaryWrapper>
    );
  }

}

const SummaryWrapper = styled.div`
  background: ${props => props.theme.primary};
  color: ${props => props.theme.lightText};
  display: flex;
  flex-direction: column;
  width: 25%;
  justify-content: flex-start;
  flex-shrink: 0;
  padding: 40px;
  align-items: flex-start;
  overflow: hidden;
`;

const Title = styled.h3`
  color: #278fab;
  text-transform: uppercase;
  font-size: 1.4em;
  text-align: left;
  font-weight: 100;
  margin-bottom: 0;
`;

const Text = styled.p`
  line-height: 1.4em;
  color: #EFEFEF;
  font-size: 1.1em;
`;

export default Summary;