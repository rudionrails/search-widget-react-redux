// module under test
import { types, actions, reducer } from './index';

test('exports a types object', () => {
  expect(typeof types).toBe('object');
});

test('export a actions object', () => {
  expect(typeof actions).toBe('object');
});

test('export a reducer function', () => {
  expect(typeof reducer).toBe('function');
});

describe('actions', () => {
  test('creates an action for search', () => {
    const query = 'The Query';
    const expected = {
      type: types.SEARCH,
      query,
    };

    expect(actions.search(query)).toEqual(expected);
  });

  test('creates an action for searchSuccess', () => {
    const results = [];
    const expected = {
      type: types.SEARCH_SUCCESS,
      results,
    };

    expect(actions.searchSuccess(results)).toEqual(expected);
  });

  test('creates an action for searchFailure', () => {
    const expected = {
      type: types.SEARCH_FAILURE,
    };

    expect(actions.searchFailure()).toEqual(expected);
  });
});

describe('reducer', () => {
  test('returns the initial state', () => {
    const state = reducer(undefined, {});

    expect(state).toEqual({
      query: '',
      results: [],
    });
  });

  test('handles SEARCH', () => {
    const query = 'The Query';
    const state = reducer(undefined, {
      type: types.SEARCH,
      query,
    });

    expect(state).toEqual({
      query,
      results: [],
    });
  });

  test('handles SEARCH_SUCCESS', () => {
    const results = 'The Results';
    const state = reducer({
      query: 'unchanged',
      results: 'will-change',
    }, {
      type: types.SEARCH_SUCCESS,
      results,
    });

    expect(state).toEqual({
      query: 'unchanged',
      results,
    });
  });

  test('handles SEARCH_FAILURE', () => {
    const state = reducer({
      query: 'unchanged',
      results: 'will-change',
    }, {
      type: types.SEARCH_FAILURE,
    });

    expect(state).toEqual({
      query: 'unchanged',
      results: [],
    });
  });
});
