/* global window, document, history, location, fetch */
/* global addEventListener, removeEventListener, setTimeout */

import 'whatwg-fetch';

const localStorage = window.localStorage || {
  setItem: () => null,
  getItem: () => null,
};

export {
  window,
  document,
  history,
  location,
  localStorage,

  addEventListener,
  removeEventListener,
  setTimeout,

  fetch,
};
