// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import App from './containers/app/app';
import theme from './theme/defaultTheme';

import 'assets/css/index.css';

const rootDiv = document.getElementById('root') || document.createElement('div');

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>
  , rootDiv
);