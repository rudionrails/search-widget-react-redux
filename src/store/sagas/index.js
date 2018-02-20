import { delay } from 'redux-saga';
import { all, call, put, takeLatest } from 'redux-saga/effects';

import api from 'src/store/api';
import {
  types as searchTypes,
  actions as searchActions,
} from 'src/store/redux/search';
import { actions as loadingActions } from 'src/store/redux/loading';

export function* fetchSearch({
  query = '',
} = {}) {
  try {
    yield put(loadingActions.start());
    yield call(delay, 200);

    const results = yield call(api.fetchSearch, query);
    yield put(searchActions.searchSuccess(results));
  } catch (error) {
    yield put(searchActions.searchFailure(error));
  } finally {
    yield put(loadingActions.stop());
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(searchTypes.SEARCH, fetchSearch),
  ]);
}
