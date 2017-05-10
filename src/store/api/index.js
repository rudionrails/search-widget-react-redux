import 'whatwg-fetch';
import { stringify } from 'qs';
import config from 'src/config';

const defaultFetchOptions = {
  credentials: 'include',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

function urlFor(params = {}) {
  const url = [config.hostname, config.pathname].join('/');
  const filter = stringify({ filter: params });

  return [
    url,
    filter,
  ].join('?');
}

async function parse({
  data: { relationships },
  included,
}) {
  const match = ({
    type,
    id,
  }) => included.find(i => i.type === type && i.id === id);

  const select = ({
    id,
    attributes: { title },
    links: { self },
  }) => ({
    id,
    title,
    url: self,
  });

  const results = Object.keys(relationships).map((key) => {
    const data = relationships[key].data;
    const items = data.map(item => match(item));
    const list = items.map(item => select(item));
    return {

      title: key,
      list,
    };
  });

  return results;
}

async function get(params = {}) {
  const url = urlFor(params);
  const options = Object.assign({}, defaultFetchOptions);

  try {
    const response = await fetch(url, options);
    const json = await response.json();
    const data = await parse(json);

    return data;
  } catch (e) {
    throw e;
  }
}

export default {
  fetchSearch: query => get({ query }),
};
