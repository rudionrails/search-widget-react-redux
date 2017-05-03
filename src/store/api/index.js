import 'whatwg-fetch';

const API_ROOT = 'http://jjuhznbemfbsm7ibz-mock.stoplight-proxy.io';

async function parse({
  data: { relationships },
  included, 
}) {
  const match = ({ type, id }) =>
    included.find(i => i.type === type && i.id === id);

  const select = ({
    id,
    attributes: { headline },
    links: { self },
  }) => ({
    id,
    headline,
    url: self,
  });
    
  const results = Object.keys(relationships).map(key => { 
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
