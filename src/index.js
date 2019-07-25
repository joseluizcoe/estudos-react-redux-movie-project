import React from 'react';
import ReactDOM from 'react-dom';

// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware  from 'redux-promise';
import reducers from './reducers';

import App from './components/App/App';

import './index.css';

const withMiddleware = applyMiddleware(promiseMiddleware);
const storeWithMiddleware = withMiddleware(createStore);

ReactDOM.render(
  <Provider store={storeWithMiddleware(reducers)}>
    <App />
  </Provider>
  ,document.getElementById('root')
);
