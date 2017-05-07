const INITIAL_STATE = {
  isLoading: false,
  query: '',
  results: [],
};

const SEARCH = 'SEARCH';
const SEARCH_SUCCESS = 'SEARCH_SUCCESS';

export const types = {
  SEARCH,
  SEARCH_SUCCESS,
}

export const actions = {
  search: (query) => ({ type: SEARCH, query }),
  searchSuccess: (results) => ({ type: SEARCH_SUCCESS, results }),
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH: {
      return Object.assign({}, state, {
        isLoading: true,
        query: action.query,
      });
    }

    case SEARCH_SUCCESS: {
      return Object.assign({}, state, {
        isLoading: false,
        results: action.results,
      });
    }

    default:
      return state;
  }
};
