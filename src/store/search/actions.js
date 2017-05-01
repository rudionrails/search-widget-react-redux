/**
* Action Types
*/
export const SEARCH_QUERY = 'SEARCH_QUERY';

/**
* Action Creators
*/
export default {
  search: (query) => ({ type: SEARCH_QUERY, query }),
}
