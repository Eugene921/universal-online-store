import * as React from 'react';
import ReactDOM from 'react-dom';

// import { composeWithDevTools } from 'redux-devtools-extension';
// import { createStore, applyMiddleware } from 'redux';
// import { Provider } from 'react-redux';

// import listMiddleware from './src/middleware/';
// import rootReducers from './src/reducers/';
import App from './src/app';

// const store = createStore(
//   rootReducers,
//   composeWithDevTools(
//     applyMiddleware(listMiddleware)
//   )
// );

// ReactDOM.render(
//   <Provider store={store}>
//     <App />
//   </Provider>,
//   document.getElementById('root'),
// );

ReactDOM.render(
    <App />,
  document.getElementById('root')
);
