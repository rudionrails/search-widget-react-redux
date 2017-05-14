import { delay } from 'redux-saga';
import { call, put, takeLatest } from 'redux-saga/effects';

import api from 'src/store/api';
import { types, actions } from 'src/store/search';

export function* fetchSearch({
  query = '',
} = {}) {
  yield call(delay, 200);

  try {
    const results = yield call(api.fetchSearch, query);
    yield put(actions.searchSuccess(results));
  } catch (error) {
    yield put(actions.searchFailure(error));
  }
}

export default function* sagas() {
  yield [
    takeLatest(types.SEARCH, fetchSearch),
  ];
}
