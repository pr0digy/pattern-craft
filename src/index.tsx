import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { Normalize } from 'styled-normalize';

import App from './App';

const rootElement = document.getElementById('root');
render(
  <Fragment>
    <Normalize />
    <App />
  </Fragment>,
  rootElement,
);
