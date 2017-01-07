import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import 'bootstrap/dist/css/bootstrap.css'
import configureStore from './store/configureStore'
import {Provider as ReduxProvider} from 'react-redux'

const store = configureStore();

ReactDOM.render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
  document.getElementById('root')
);
