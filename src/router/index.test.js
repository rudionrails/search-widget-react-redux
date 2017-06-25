import td from 'testdouble';
import { location, history } from 'src/helpers/browser';
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
    router = create({
      open,
      close,
    });
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

  test('navigate changes pushState', async () => {
    const pushState = td.replace(history, 'pushState', Function.prototype);
    await router.navigate('/foo-bar#/baz');

    td.verify(pushState(undefined, undefined, '/foo-bar#/baz'));
  });

  test('navigate changes location (redirect)', async () => {
    const assign = td.replace(Object, 'assign');
    await router.navigate('http://www.example.com/foo-bar#/baz');

    td.verify(
      assign(location, { href: 'http://www.example.com/foo-bar#/baz' }),
    );
  });

  test('navigate to config.triggerRoute calls open', async () => {
    await router.navigate(config.triggerRoute);

    td.verify(open());
  });

  test('navigate to not config.triggerRoute calls close', async () => {
    await router.navigate(`${config.triggerRoute}-not`);

    td.verify(close());
  });
});
