import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { reducer as searchReducer } from './search/index';

const reducer = combineReducers({
  search: searchReducer,
});

export default function() {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = applyMiddleware(sagaMiddleware);

  const store = createStore(reducer, composeWithDevTools(
    middleware,
  ));

  return store;
}
