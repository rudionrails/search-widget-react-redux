import React from 'react';
import { render } from 'enzyme';

// module under test
import Search from './Search';

const store = {
  subscribe: Function.prototype,
  dispatch: Function.prototype,
  getState: () => ({
    search: {
      query: 'The Query',
      results: [],
    },
    loading: false,
  }),
};

const props = {
  onClick: Function.prototype,
  onClose: Function.prototype,
  onSearch: Function.prototype,
  store,
};

test('renders without crashing', () => {
  render(<Search { ...props } />);
});
