import React from 'react';
import td from 'testdouble';
import { render, shallow } from 'enzyme';

// module under test
import Search from './Search';

const props = {
  results: [],
  showClose: true,
  onSearch: Function.prototype,
  onClose: Function.prototype,
  onClick: Function.prototype,
};

test('renders without crashing', () => {
  render(<Search { ...props } />);
});

test('renders Bar', () => {
  const bar = shallow(<Search { ...props } />).find('Bar');
  expect(bar.exists()).toBe(true);
});

test('renders Results', () => {
  const results = shallow(<Search { ...props } />).find('Results');
  expect(results.exists()).toBe(true);
});

test('triggers onClose when pressing the close button', () => {
  const onClose = td.function('onClose');
  const search = shallow(<Search { ...props } onClose={onClose} />);
  const closeButton = search.find('.sw-Search-close');

  closeButton.simulate('click');
  td.verify(onClose());
});
