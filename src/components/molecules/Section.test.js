import React from 'react';
import { render, shallow } from 'enzyme';
import Section from './Section';

const props = {
  title: 'Some title',
  items: [],
};

test('renders without failures', () => {
  render(<Section { ...props } />);
});

test('renders the title', () => {
  const section = shallow(<Section { ...props } />);
  expect(section.text()).toContain(props.title);
});

test('does not render items when empty', () => {
  const section = shallow(<Section { ...props } />);
  const items = section.find('Item');
  expect(items.length).toBe(0);
});

test('renders items when present', () => {
  const itemsProp = [{
    title: 'Item title',
    url: 'Title url',
  }];
  const section = shallow(<Section { ...props } items={itemsProp} />);
  const items = section.find('Item');

  expect(items.length).toBe(1);
});
