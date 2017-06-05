import td from 'testdouble';
import * as browser from 'src/helpers/browser';

// module under test
import api from './index';

const query = 'fooBar';

afterEach(() => {
  td.reset();
});

test('fetchSearch gets and parses correctly', async () => {
  const fetch = td.replace(browser, 'fetch');
  td.when(fetch(), { ignoreExtraArgs: true }).thenResolve({
    json: () => ({
      data: {
        relationships: {
          foo: {
            data: [
              { id: 1, type: 'bar' },
            ],
          },
        },
      },

      included: [
        {
          id: 1,
          type: 'bar',
          attributes: {
            title: 'Bar',
          },
          links: {
            self: 'bar.com',
          },
        },
      ],
    }),
  });

  const promise = api.fetchSearch(query);
  expect(promise).resolves.toEqual([
    {
      title: 'foo',
      items: [
        { id: 1, title: 'Bar', url: 'bar.com' },
      ],
    },
  ]);
});

test('fetchSearch throws errors', async () => {
  const fetch = td.replace(browser, 'fetch');
  const error = new Error('something went wrong');
  td.when(fetch(), { ignoreExtraArgs: true }).thenThrow(error);

  const promise = api.fetchSearch(query);
  expect(promise).rejects.toEqual(error);
});
