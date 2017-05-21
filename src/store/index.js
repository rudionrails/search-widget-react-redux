import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { reducer as searchReducer } from 'src/store/search';
import sagas, { fetchSearch } from 'src/store/sagas';

const reducer = combineReducers({
  search: searchReducer,
});

export default function () {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = applyMiddleware(sagaMiddleware);
  const store = createStore(reducer, middleware);

  sagaMiddleware.run(fetchSearch);
  sagaMiddleware.run(sagas);

  return store;
}
