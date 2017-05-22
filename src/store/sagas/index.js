import { delay } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from 'src/store/api';
import { types, actions } from 'src/store/search';

export function* fetchSearch({
  query = '',
} = {}) {
  try {
    yield call(delay, 200);

    const results = yield call(api.fetchSearch, query);
    yield put(actions.searchSuccess(results));
  } catch (error) {
    yield put(actions.searchFailure(error));
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(types.SEARCH, fetchSearch),
  ]);
}
