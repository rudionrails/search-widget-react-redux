import React from 'react';
import { render } from 'enzyme';

// module under test
import Search from './Search';

const store = {
  subscribe: Function.prototype,
  dispatch: Function.prototype,
  getState: () => ({
    search: {
      isLoading: false,
      query: 'The Query',
      results: [],
    },
  }),
};

const props = {
  onClick: Function.prototype,
  onClose: Function.prototype,
  store,
};

test('renders without crashing', () => {
  render(<Search { ...props } />);
});
