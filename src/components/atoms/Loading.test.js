import React from 'react';
import { render } from 'enzyme';

// module under test
import Loading from './Loading';

const props = {
  show: true,
};

test('renders without failures', () => {
  render(<Loading { ... props } />);
});
