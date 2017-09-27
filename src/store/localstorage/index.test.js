import td from 'testdouble';
import config from 'src/config';
import { localStorage } from 'src/helpers/browser';

// module under test
import { get, set } from './index';

afterEach(() => {
  td.reset();
});

describe('get', () => {
  test('returns undefined object when localstorage is disabled', () => {
    td.replace(config, 'localStorage', false);

    expect(get()).toEqual(undefined);
  });

  test('returns data from localStorage', () => {
    const getItem = td.replace(localStorage, 'getItem');
    td.when(getItem(config.localStorageKey)).thenReturn(
      JSON.stringify({ foo: 'bar' }),
    );

    expect(get()).toEqual({
      foo: 'bar',
    });
  });

  test('returns undefined when nothing in localStorage', () => {
    const getItem = td.replace(localStorage, 'getItem');
    td.when(getItem(config.localStorageKey)).thenReturn(null);

    expect(get()).toEqual(undefined);
  });

  test('returns undefined upon Error', () => {
    const getItem = td.replace(localStorage, 'getItem');
    td.when(getItem()).thenThrow(new Error('foo'));

    expect(get()).toEqual(undefined);
  });
});

describe('set', () => {
  test('writes stringified data to localStorage', () => {
    const store = { search: { foo: 'bar' } };
    const setItem = td.replace(localStorage, 'setItem');
    set(store);

    td.verify(setItem(config.localStorageKey, JSON.stringify(store)));
  });
});
