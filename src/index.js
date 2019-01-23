import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/Profile';
// for connecting App to Redux store
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {
  BrowserRouter
} from 'react-router-dom';

import rootReducer from './redux/reducers';
// Redux store to be used in Provider component
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    // hooks up app to Redux Tools chrome extention
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

// ** initialsState is stored in reducers.js **

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
