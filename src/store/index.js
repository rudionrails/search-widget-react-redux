import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import config from 'src/config';
import {
  get as getLocalStorage,
  set as setLocalStorage,
} from 'src/store/localstorage';
import { reducer as searchReducer } from 'src/store/redux/search';
import { reducer as loadingReducer } from 'src/store/redux/loading';
import sagas, { fetchSearch } from 'src/store/sagas';

const reducer = combineReducers({
  search: searchReducer,
  loading: loadingReducer,
});

export default function create() {
  const localStorage = getLocalStorage();
  const sagaMiddleware = createSagaMiddleware();

  const middleware = applyMiddleware(sagaMiddleware);
  const store = createStore(reducer, localStorage, composeWithDevTools(
    middleware,
  ));

  // save store to localstorage
  store.subscribe(() => {
    setLocalStorage(store.getState());
  });

  if (config.preload) {
    const { search } = Object.assign({}, localStorage);
    sagaMiddleware.run(fetchSearch, search);
  }
  sagaMiddleware.run(sagas);

  return store;
}
