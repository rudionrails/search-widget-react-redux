import td from 'testdouble';

// module under test
import config, { configure } from './index';

test('exports a default config object', () => {
  expect(typeof config).toBe('object');
});

test('export a configure function', () => {
  expect(typeof configure).toBe('function');
});

describe('configure', () => {
  afterEach(() => {
    td.reset();
  });

  test('assigns value to config', () => {
    const assign = td.replace(Object, 'assign');
    configure({ foo: 'bar' });

    td.verify(assign(config, { foo: 'bar' }));
  });

  test('does not assign value when undefined', () => {
    const assign = td.replace(Object, 'assign');

    configure({ foo: undefined });
    td.verify(assign(), { times: 0, ignoreExtraArgs: true });
  });
});
