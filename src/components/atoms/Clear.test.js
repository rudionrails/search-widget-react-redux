import React from 'react';
import td from 'testdouble';
import { render, shallow } from 'enzyme';

// module under test
import Clear from './Clear';

const onClick = td.function('.onClick');

afterEach(() => {
  td.reset();
});

test('renders without failures', () => {
  render(<Clear onClick={onClick} />);
});

test('triggers onCLick', () => {
  const clear = shallow(<Clear onClick={onClick} />);
  clear.simulate('click');

  td.verify(onClick());
});
