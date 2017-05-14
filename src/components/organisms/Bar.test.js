import React from 'react';
import td from 'testdouble';
import { render, shallow } from 'enzyme';
import Bar from './Bar';

const props = {
  onSearch: () => {},
};

test('renders without failures', () => {
  render(<Bar { ...props } />);
});

test('renders an input field', () => {
  const input = shallow(<Bar { ...props } />).find('input');
  expect(input.length).toBe(1);
});

test('renders an input field with the right value', () => {
  const input = shallow(<Bar { ...props } />).find('input');
  expect(input.props().value).toBe(props.query);
});

test('does not render loading indicator', () => {
  const loading = shallow(<Bar { ...props } />).find('Loading');
  expect(loading.length).toBe(0);
});

test('renders loading indicator', () => {
  const loading = shallow(<Bar { ...props } isLoading={true} />).find('Loading');
  expect(loading.length).toBe(1);
});

test('triggers onSearch with the right value', () => {
  const onSearch = td.function('onSearch');
  const input = shallow(<Bar { ...props } onSearch={onSearch} />).find('input');

  input.simulate('change', { target: { value: 'Query Change' } });
  td.verify(onSearch('Query Change'));
});
