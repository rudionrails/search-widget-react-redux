const INITIAL_STATE = {
  isLoading: false,
  query: '',
  results: [],
};

const SEARCH = 'SEARCH';
const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
const SEARCH_FAILURE = 'SEARCH_FAILURE';

export const types = {
  SEARCH,
  SEARCH_SUCCESS,
  SEARCH_FAILURE,
};

export const actions = {
  search: query => ({ type: SEARCH, query }),
  searchSuccess: results => ({ type: SEARCH_SUCCESS, results }),
  searchFailure: error => ({ type: SEARCH_FAILURE, error }),
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

    case SEARCH_FAILURE: {
      return Object.assign({}, state, {
        isLoading: false,
        results: INITIAL_STATE.results,
      });
    }

    default:
      return state;
  }
};
