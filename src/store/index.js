import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import {
  get as getLocalState,
  set as setLocalState,
} from 'src/store/localstorage';
import { reducer as searchReducer } from 'src/store/redux/search';
import { reducer as loadingReducer } from 'src/store/redux/loading';
import sagas, { fetchSearch } from 'src/store/sagas';

const reducer = combineReducers({
  search: searchReducer,
  loading: loadingReducer,
});

export default function create() {
  const localState = getLocalState();
  const sagaMiddleware = createSagaMiddleware();

  const middleware = applyMiddleware(sagaMiddleware);
  const store = createStore(reducer, localState, composeWithDevTools(
    middleware,
  ));

  // save store to localstorage
  store.subscribe(() => {
    setLocalState(store.getState());
  });

  sagaMiddleware.run(fetchSearch);
  sagaMiddleware.run(sagas);

  return store;
}
