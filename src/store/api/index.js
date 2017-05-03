import 'whatwg-fetch';

const API_ROOT = 'http://jjuhznbemfbsm7ibz-mock.stoplight-proxy.io';

async function parse({
  data: { relationships },
  included, 
}) {
  const match = ({ type, id }) =>
    included.find(i => i.type === type && i.id === id);

  const select = ({
    attributes: { headline },
    links: { self },
  }) => ({
    headline
  });
    

  const results = {};
  Object.keys(relationships).forEach(key => { 
    const data = relationships[key].data;
    results[key] = data.map(item => match(item))
                       .map(item => select(item));
  });

  return results;
}

async function get(path, params = {}) {
  const url = [API_ROOT, path].join('/');

  try {
    const response = await fetch(url, params);
    const json = await response.json();
    const data = await parse(json);

    return data;
  } catch(e) {
    console.log('Error: ', e);
  }
}

export default {
  fetchSearch: (query) => get('search', { query }),
}
