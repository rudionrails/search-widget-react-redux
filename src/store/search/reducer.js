import { SEARCH_QUERY } from './actions';

export const INITIAL_STATE = {
  query: '',
  results: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_QUERY: {
      return Object.assign({}, state, {
        query: action.query,
      });
    }

    default:
      return state;
  }
}

