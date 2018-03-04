// module under test
import { create } from './index';

test('exports default create function', () => {
  expect(typeof create).toBe('function');
});

describe('an app instance', () => {
  let app;

  beforeEach(() => {
    app = create();
  });

  afterEach(() => {
    app.destroy();
  });

  test('instance.destroy is available', () => {
    expect(typeof app.destroy).toBe('function');
  });

  test('instance.store is available', () => {
    expect(typeof app.store).toBe('object');
  });

  test('instance.config is available', () => {
    expect(typeof app.config).toBe('object');
  });
});
