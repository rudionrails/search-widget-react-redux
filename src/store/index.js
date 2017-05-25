import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { reducer as searchReducer } from 'src/store/redux/search';
import { reducer as loadingReducer } from 'src/store/redux/loading';
import sagas, { fetchSearch } from 'src/store/sagas';

const reducer = combineReducers({
  search: searchReducer,
  loading: loadingReducer,
});

export default function () {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = applyMiddleware(sagaMiddleware);
  const store = createStore(reducer, middleware);

  sagaMiddleware.run(fetchSearch);
  sagaMiddleware.run(sagas);

  return store;
}
