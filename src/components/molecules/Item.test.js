import React from 'react';
import { render, shallow } from 'enzyme';
import Item from './Item';

const props = {
  title: 'Some title',
  url: 'Some url',
};

test('renders without failures', () => {
  render(<Item { ...props } />);
});

test('renders the title', () => {
  const item = shallow(<Item { ...props } />);
  expect(item.text()).toContain(props.title);
});

test('renders the url', () => {
  const item = shallow(<Item { ...props } />);
  expect(item.text()).toContain(props.url);
});
