import td from 'testdouble';

import {
  location,
  history,
} from 'src/helpers/browser';

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

  test('navigate changes pushState', () => {
    const pushState = td.replace(history, 'pushState');
    router.navigate('/foo-bar#/baz');
  
    td.verify(pushState(undefined, undefined, '/foo-bar#/baz'));
  });

  test('navigate changes location (redirect)', () => {
    const assign = td.replace(Object, 'assign');
    router.navigate('http://www.example.com/foo-bar#/baz');
    
    td.verify(
      assign(location, { href: 'http://www.example.com/foo-bar#/baz' })
    );
  });
});
