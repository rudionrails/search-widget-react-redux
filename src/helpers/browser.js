/* global window, document, history, location, fetch */
/* global addEventListener, removeEventListener, setTimeout */

import 'whatwg-fetch';

const localStorage = Object.assign({
  setItem: () => null,
  getItem: () => null,
}, window.localStorage);

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
