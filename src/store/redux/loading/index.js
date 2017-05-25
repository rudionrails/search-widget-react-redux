const INITIAL_STATE = false;

const LOADING_START = 'LOADING_STOP';
const LOADING_STOP = 'LOADING_START';

export const types = {
  LOADING_START,
  LOADING_STOP,
};

export const actions = {
  start: () => ({ type: LOADING_START }),
  stop: () => ({ type: LOADING_STOP }),
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING_START: {
      return true;
    }

    case LOADING_STOP: {
      return false;
    }

    default:
      return state;
  }
};

