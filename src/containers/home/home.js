// @flow
import React, { Component } from 'react';
import { Grid, Column } from 'components/layout/layout';
import styled from 'styled-components';


export default class Home extends Component<{}> {

  render() {
    return (
      <Grid gutterLess>
        <Column>
          <PageHeader>
            <h1>Council of Wisdom</h1>
            <p>This will be the place to manage your account status.</p>
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
