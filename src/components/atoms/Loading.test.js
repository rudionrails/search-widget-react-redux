import React from 'react';
import { render } from 'enzyme';

// module under test
import Loading from './Loading';

test('renders without failures', () => {
  render(<Loading />);
});
