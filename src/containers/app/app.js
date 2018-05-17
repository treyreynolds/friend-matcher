// @flow
import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import { Container } from 'components/layout/layout';

import Home from 'containers/home/home';
import Matcher from 'containers/matcher/matcher';
import FriendAi from 'containers/friend-ai/friend-ai';

import NavBar from 'components/navbar/navbar';
import Footer from 'components/footer/footer';

import { withRouter } from 'react-router';

class App extends React.Component<{}> {

  render() {
    return (
      <Switch>
        <Main>
          <NavBarWithRouter
            {...this.props}
          />
          <Container>
            <Route
              path='/matcher'
              component={Matcher}
            />
            <Route
              path='/friend'
              component={FriendAi}
            />
            <Route
              exact
              path='/'
              component={Home}
            />
          </Container>
          <Footer />
        </Main>
      </Switch>
    );
  }
}

const NavBarWithRouter = withRouter(props => <NavBar {...props} />);

export default App;

type MainProps = {children: any};
class Main extends React.Component<MainProps> {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
