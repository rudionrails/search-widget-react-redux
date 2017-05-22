import { delay } from 'redux-saga';
import { all, put, call, takeLatest } from 'redux-saga/effects';

import api from 'src/store/api';
import { types, actions } from 'src/store/search';

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
      takeLatest(types.SEARCH, fetchSearch),
    ]),
  );

  // done
  expect(gen.next().done).toBe(true);
});

test('fetchSearch with { query } on success', () => {
  const query = 'The Query';
  const gen = fetchSearch({ query });

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
    put(actions.searchSuccess(results)),
  );

  // done
  expect(gen.next().done).toBe(true);
});

test('fetchSearch whth { query } on failure', () => {
  const query = 'The Query';
  const gen = fetchSearch({ query });

  // delay user input
  expect(gen.next().value).toEqual(
    call(delay, 200),
  );

  // fetch data from API raises
  const error = new Error();
  expect(gen.throw(error).value).toEqual(
    put(actions.searchFailure(error)),
  );

  // done
  expect(gen.next().done).toBe(true);
});

test('fetchSearch without options', () => {
  const gen = fetchSearch();

  gen.next(); // delay
  expect(gen.next().value).toEqual( // fetch data with default query value
    call(api.fetchSearch, ''),
  );
  gen.next(); // dispatch

  expect(gen.next().done).toBe(true);
});
