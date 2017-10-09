/* global window, document, setTimeout */
import 'whatwg-fetch';

const localStorage = window.localStorage || {
  setItem: () => null,
  getItem: () => null,
};

export {
  window,
  document,
  localStorage,
  setTimeout,

  fetch,
};
