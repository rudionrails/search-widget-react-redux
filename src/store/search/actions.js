/**
* Action Types
*/
export const SEARCH = 'SEARCH';

/**
* Action Creators
*/
export default {
  search: (query) => ({ type: SEARCH, query }),
}
