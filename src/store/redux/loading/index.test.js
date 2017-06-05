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
  test('creates an action for start', () => {
    expect(actions.start()).toEqual({
      type: types.LOADING_START,
    });
  });

  test('creates an action for stop', () => {
    expect(actions.stop()).toEqual({
      type: types.LOADING_STOP,
    });
  });
});

describe('reducer', () => {
  test('returns the initial state', () => {
    const state = reducer(undefined, {});

    expect(state).toEqual({
      isLoading: false,
    });
  });

  test('handles LOADING_START', () => {
    const state = reducer({
      isLoading: false,
    }, {
      type: types.LOADING_START,
    });

    expect(state).toEqual({
      isLoading: true,
    });
  });

  test('handles LOADING_STOP', () => {
    const state = reducer({
      isLoading: true,
    }, {
      type: types.LOADING_STOP,
    });

    expect(state).toEqual({
      isLoading: false,
    });
  });
});
