import React from 'react';
import td from 'testdouble';
import { render, shallow, mount } from 'enzyme';

// module under test
import Bar from './Bar';

const props = Object.freeze({
  onSearch: Function.prototype,
});

test('renders without failures', () => {
  render(<Bar { ...props } />);
});

test('renders an input field with the right value', () => {
  const query = 'Foo';
  const input = shallow(<Bar { ...props } query={query} />).find('input');

  expect(input.exists()).toBe(true);
  expect(input.props().defaultValue).toBe(query);
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

test('triggers onSearch when input has changed', () => {
  const onSearch = td.function('onSearch');
  const input = shallow(<Bar onSearch={onSearch} />).find('input');

  input.simulate('change', { target: { value: 'Foo' } });
  td.verify(onSearch('Foo'));
});

test('triggers onSearch when input receives ENTER key', () => {
  const onSearch = td.function('onSearch');
  const input = shallow(<Bar onSearch={onSearch} />).find('input');

  input.simulate('keyDown', { keyCode: 13, target: { value: 'Foo' } }); // ENTER
  td.verify(onSearch('Foo'));
});

test('does not triggers onSearch when input receives key other than ENTER', () => {
  const onSearch = td.function('onSearch');
  const input = shallow(<Bar onSearch={onSearch} />).find('input');

  input.simulate('keyDown', { keyCode: 27, target: { value: 'Foo' } }); // ESC
  td.verify(onSearch(), { times: 0, ignoreExtraArgs: true });
});
