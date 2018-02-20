import React from 'react';
import td from 'testdouble';
import { render, shallow, mount } from 'enzyme';

// module under test
import Bar from './Bar';

const props = Object.freeze({
  isLoading: false,
  onSearch: Function.prototype,
});

test('renders without failures', () => {
  render(<Bar { ...props } />);
});

test('to match snapshot', () => {
  const bar = render(<Bar { ...props } />);
  expect(bar).toMatchSnapshot();
});

describe('the loading indicator', () => {
  test('renders loading indicator', () => {
    const loading = shallow(<Bar { ...props } isLoading={true} />).find('Loading');
    expect(loading.exists()).toBe(true);
  });
});

describe('the input field', () => {
  test('renders with the right value', () => {
    const query = 'Foo';
    const input = shallow(<Bar { ...props } query={query} />).find('input');

    expect(input.exists()).toBe(true);
    expect(input.props().value).toBe(query);
  });

  test('is focussed', () => {
    const bar = mount(<Bar { ...props } />);
    expect(bar.instance().activeElement).toBe(bar.input);
  });
});

describe('onSearch', () => {
  test('triggers when input has changed', () => {
    const onSearch = td.function('onSearch');
    const input = shallow(<Bar { ...props } onSearch={onSearch} />).find('input');

    input.simulate('change', { target: { value: 'Foo' } });
    td.verify(onSearch('Foo'));
  });

  test('triggers when input receives ENTER key', () => {
    const onSearch = td.function('onSearch');
    const input = shallow(<Bar { ...props } onSearch={onSearch} />).find('input');

    input.simulate('keyDown', { keyCode: 13, target: { value: 'Foo' } }); // ENTER
    td.verify(onSearch('Foo'));
  });

  test('does not trigger when input receives key other than ENTER', () => {
    const onSearch = td.function('onSearch');
    const input = shallow(<Bar { ...props } onSearch={onSearch} />).find('input');

    input.simulate('keyDown', { keyCode: 27, target: { value: 'Foo' } }); // ESC
    td.verify(onSearch(), { times: 0, ignoreExtraArgs: true });
  });
});
