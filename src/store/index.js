import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { reducer as searchReducer } from './search/index';

const reducer = combineReducers({
  search: searchReducer,
});

export default function() {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = applyMiddleware(sagaMiddleware);

  const store = createStore(reducer, middleware);

  return store;
}
