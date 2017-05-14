import React from 'react';
import { render, shallow } from 'enzyme';
import Results from './Results';

const props = {
  results: [],
};

test('renders without failures', () => {
  render(<Results { ...props } />);
});

test('does not render sections when results are empty', () => {
  const results = shallow(<Results { ...props } />);
  const sections = results.find('Section');
  expect(sections.length).toBe(0);
});

test('renders sections when results are present', () => {
  const resultsProp = [{
    title: 'Section title 1',
    items: [],
  }, {
    title: 'Section title 2',
    items: [],
  }];
  const results = shallow(<Results { ...props } results={resultsProp} />);
  const sections = results.find('Section');

  expect(sections.length).toBe(2);
});
