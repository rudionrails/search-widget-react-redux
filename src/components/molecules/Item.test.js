import React from 'react';
import td from 'testdouble';
import { render, shallow } from 'enzyme';

// module under test
import Item from './Item';

const props = {
  title: 'Some title',
  url: 'Some url',
};

const context = {
  onClick: Function.prototype,
};

afterEach(() => {
  td.reset();
});

test('renders without failures', () => {
  render(<Item { ...props } />, { context });
});

test('renders the title', () => {
  const item = shallow(<Item { ...props } />, { context });
  expect(item.text()).toContain(props.title);
});

test('renders the url', () => {
  const item = shallow(<Item { ...props } />, { context });
  expect(item.text()).toContain(props.url);
});

test('triggers onCLick', () => {
  const item = shallow(<Item { ...props } />, { context });
  expect(item.text()).toContain(props.url);
});
