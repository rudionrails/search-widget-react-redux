import { call, takeLatest } from 'redux-saga/effects';

import api from 'src/store/api';
import { SEARCH } from 'src/store/search';

function* fetchSearch({ query }) {
  try {
    const results = yield call(api.fetchSearch, query);

    console.log('results: ', results);
  } catch(e) {
    console.log('catch: ', e);
  }
}

export default function* sagas() {
  yield [
    takeLatest(SEARCH, fetchSearch),
  ]
}
