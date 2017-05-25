import { delay } from 'redux-saga';
import { all, put, call, takeLatest } from 'redux-saga/effects';

import api from 'src/store/api';
import {
  types as searchTypes,
  actions as searchActions,
} from 'src/store/redux/search';
import {
  actions as loadingActions,
} from 'src/store/redux/loading';

// module under test
import rootSaga, { fetchSearch } from './index';

test('exports a default rootSaga function', () => {
  expect(typeof rootSaga).toBe('function');
});

test('export a configure function', () => {
  expect(typeof fetchSearch).toBe('function');
});

test('rootSaga', () => {
  const gen = rootSaga();

  expect(gen.next().value).toEqual(
    all([
      takeLatest(searchTypes.SEARCH, fetchSearch),
    ]),
  );

  // done
  expect(gen.next().done).toBe(true);
});

test('fetchSearch with { query } on success', () => {
  const query = 'The Query';
  const gen = fetchSearch({ query });

  // loading start
  expect(gen.next().value).toEqual(
    put(loadingActions.start()),
  );

  // delay user input
  expect(gen.next().value).toEqual(
    call(delay, 200),
  );

  // fetch data from API
  expect(gen.next().value).toEqual(
    call(api.fetchSearch, query),
  );

  // dispatch SEARCH_SUCCESS action
  const results = [1, 2, 3];
  expect(gen.next(results).value).toEqual(
    put(searchActions.searchSuccess(results)),
  );

  // loading stop
  expect(gen.next().value).toEqual(
    put(loadingActions.stop()),
  );

  // done
  expect(gen.next().done).toBe(true);
});

test('fetchSearch without options', () => {
  const gen = fetchSearch();

  gen.next(); // loading start
  gen.next(); // delay
  expect(gen.next().value).toEqual( // fetch data with default query value
    call(api.fetchSearch, ''),
  );
  gen.next(); // dispatch SEARCH_SUCCESS
  gen.next(); // loading stop

  expect(gen.next().done).toBe(true);
});

test('fetchSearch whth { query } on failure', () => {
  const query = 'The Query';
  const gen = fetchSearch({ query });

  // loading start
  expect(gen.next().value).toEqual(
    put(loadingActions.start()),
  );

  // simulate exception
  const error = new Error();
  expect(gen.throw(error).value).toEqual(
    put(searchActions.searchFailure(error)),
  );

  // loading stop
  expect(gen.next().value).toEqual(
    put(loadingActions.stop()),
  );

  // done
  expect(gen.next().done).toBe(true);
});
