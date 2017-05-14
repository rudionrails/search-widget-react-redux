import React from 'react';
import { render } from 'enzyme';
import Loading from './Loading';

test('renders without failures', () => {
  render(<Loading />);
});
