import React from 'react';
import td from 'testdouble';
import { render, shallow } from 'enzyme';
import Search from './Search';

// isLoading: PropTypes.bool,
// query: PropTypes.string,

const props = {
  results: [],
  onSearch: () => {},
  onClose: () => {},
};

test('renders without crashing', () => {
  render(<Search { ...props } />);
});

test('renders Bar', () => {
  const bar = shallow(<Search { ...props } />).find('Bar');
  expect(bar.length).toBe(1);
});

test('renders Results', () => {
  const results = shallow(<Search { ...props } />).find('Results');
  expect(results.length).toBe(1);
});

test('triggers onClose when pressing the close button', () => {
  const onClose = td.function('onClose');
  const search = shallow(<Search { ...props } onClose={onClose} />);
  const closeButton = search.find('.sw-Search-close');

  closeButton.simulate('click');
  td.verify(onClose());
});
