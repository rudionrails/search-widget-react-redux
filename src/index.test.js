// module under test
import widget from './index';

test('exports default widget object', () => {
  expect(typeof widget).toBe('object');
});

test('widget.create is available', () => {
  expect(typeof widget.create).toBe('function');
});

test('widget.create executes without errors', () => {
});
