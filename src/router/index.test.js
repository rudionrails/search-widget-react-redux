import td from 'testdouble';
import { window } from 'src/helpers/browser';
import config from 'src/config';

// module under test
import create from './index';

test('exports a default function', () => {
  expect(typeof create).toBe('function');
});

describe('a router instance', () => {
  let router;
  const open = td.function('open');
  const close = td.function('close');

  beforeEach(() => {
    router = create({ open, close });
  });

  afterEach(() => {
    router.destroy();
    td.reset();
  });

  test('instance.destroy is available', () => {
    expect(typeof router.destroy).toBe('function');
  });

  test('instance.navigate is available', () => {
    expect(typeof router.navigate).toBe('function');
  });

  test('navigate changes window.pushState', async () => {
    const pushState = td.replace(window.history, 'pushState', Function.prototype);
    await router.navigate('/foo-bar#/baz');

    td.verify(pushState(undefined, undefined, '/foo-bar#/baz'));
  });

  test.skip('navigate changes window.location (redirect)', async () => {
    const assign = td.replace(Object, 'assign');
    await router.navigate('http://www.example.com/foo-bar#/baz');

    td.verify(assign(window.location, { href: 'http://www.example.com/foo-bar#/baz' }));
  });

  test('navigate to config.trigger.path calls open', async () => {
    await router.navigate(config.trigger.path);

    td.verify(open());
  });

  test('navigate to not config.trigger.path calls close', async () => {
    await router.navigate(`${config.trigger.path}-not`);

    td.verify(close());
  });
});
