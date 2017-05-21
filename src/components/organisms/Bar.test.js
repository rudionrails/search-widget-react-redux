import React from 'react';
import td from 'testdouble';
import { render, shallow, mount } from 'enzyme';

// module under test
import Bar from './Bar';

const props = {
  onSearch: Function.prototype,
};

test('renders without failures', () => {
  render(<Bar { ...props } />);
});

test('renders an input field with the right value', () => {
  const input = shallow(<Bar { ...props } />).find('input');

  expect(input.exists()).toBe(true);
  expect(input.props().value).toBe(props.query);
});

test('renders and input field and focusses it', () => {
  const bar = mount(<Bar { ...props } />);

  expect(bar.instance().activeElement).toBe(bar.input);
});

test('does not render loading indicator', () => {
  const loading = shallow(<Bar { ...props } />).find('Loading');
  expect(loading.exists()).toBe(false);
});

test('renders loading indicator', () => {
  const loading = shallow(<Bar { ...props } isLoading={true} />).find('Loading');
  expect(loading.exists()).toBe(true);
});

test('triggers onSearch with the right value', () => {
  const onSearch = td.function('onSearch');
  const input = shallow(<Bar { ...props } onSearch={onSearch} />).find('input');

  input.simulate('change', { target: { value: 'Query Change' } });
  td.verify(onSearch('Query Change'));
});
