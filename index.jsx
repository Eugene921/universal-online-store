import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import { AuthProvider } from './src/auth/auth_admin';

import listMiddleware from './src/middleware/';
import rootReducers from './src/reducers/';
import App from './src/app';

function configureStore(preloadedState) {
  const store = createStore(
    rootReducers,
    preloadedState,
    composeWithDevTools(
      applyMiddleware(listMiddleware)
    )
  );
  return store;
}

ReactDOM.render(
  <Provider store={configureStore()}>
    <AuthProvider>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </AuthProvider>
  </Provider>,
  document.getElementById('root'),
);
