import { call, put, takeLatest } from 'redux-saga/effects';

import api from 'src/store/api';
import { types, actions } from 'src/store/search';

export function* fetchSearch({
  query = '',
} = {}) {
  try {
    const results = yield call(api.fetchSearch, query);
    yield put(actions.searchSuccess(results));
  } catch(e) {
    console.log('catch: ', e);
  }
}

export default function* sagas() {
  yield [
    takeLatest(types.SEARCH, fetchSearch),
  ]
}
