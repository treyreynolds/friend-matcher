// @flow
import React, { Component } from 'react';
import { Grid, Column } from 'components/layout/layout';
import styled from 'styled-components';

export default class Matcher extends Component<{}> {

  render() {
    return (
      <Grid gutterLess>
        <Column>
          <PageHeader>
            <h1>Matcher</h1>
            <p>matching it.</p>
          </PageHeader>
        </Column>
      </Grid>
    );
  }
}


const PageHeader = styled.div`
  margin-top: 15px;
  background: ${props => props.theme.veryLightGrey};
  padding: 40px;
`;
