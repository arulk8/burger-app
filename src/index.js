import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import burgerBuildReducer from './store/reducers/burgerBuilder';
import thunk from 'redux-thunk';

import orderReducer from './store/reducers/order';
/*const logger = store => {
  return next => {
    return action => {
      console.log('[middleware] Dispatching', action);
      const result = next(action);
      console.log('[middleware] Dispatching', store.getState());
      return result;
    };
  };
};*/
const rootReducer = combineReducers({
  burgerBuilder: burgerBuildReducer,
  order: orderReducer
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

/*
this is used when we dont have middleware
const store = createStore(
  burgerBuildReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
*/
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
