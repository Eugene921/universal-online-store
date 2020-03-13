import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import first from './src/middleware/first';
import second from './src/middleware/second';
import third from './src/middleware/third';
import rootReducers from './src/reducers/';
import App from './src/app';

function configureStore() {
  const store = createStore(
    rootReducers,
    composeWithDevTools(
      applyMiddleware(first, second, third)
    )
  );
  return store;
}

ReactDOM.render(
  <Provider store={configureStore()}>
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </Provider>,document.getElementById('root')
);
