const INITIAL_STATE = {
  query: '',
  results: {
    accounts: [
      'Bob',
      'Alice',
    ],
    transactions: [
      'Dude',
      'Awesome',
    ],
    other: [
      'Hey',
      'Ho',
      'Lets go',
    ],
  },
};

/**
* Action Types
*/
export const SEARCH = 'SEARCH';

/**
* Action Creators
*/
export const actions = {
  search: (query) => ({ type: SEARCH, query }),
};

/**
* Reducer
*/
export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH: {
      return Object.assign({}, state, {
        query: action.query,
      });
    }

    default:
      return state;
  }
};
