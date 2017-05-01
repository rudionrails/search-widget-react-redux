import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Search from './components/pages/Search';
import createStore from './store/index';
import './index.css';

const store = createStore();
let container; // container for the react app
let main; // container for the overall layout

/**
* Event listeners
*/
const destroyEventListener = ({ keyCode }) => {
  if(keyCode === 27) destroy();
};

const createEventListener = (event) => {
  if (event.key !== 'F') return;

  event.preventDefault();
  create();
};

/**
* Destroys the widget instance
*
* @returns {Promise}
*/
function destroy() {
  if (!container) throw new Error('Widget not created');

  // handle event listeners
  document.removeEventListener('keydown', destroyEventListener);
  document.addEventListener('keydown', createEventListener);

  return new Promise(resolve => {
    // hide app
    const DOMNode = ReactDOM.findDOMNode(container);
    DOMNode.firstChild.classList.remove('is-open');

    // show main content
    if (main) main.classList.remove('is-hidden');

    // wait for CSS animation to complete
    setTimeout(() => resolve(), 300);
  }).then(() => {
    // unmount the app
    ReactDOM.unmountComponentAtNode(container);
    document.body.removeChild(container);

    container = undefined;
  });
}

/**
* Creates the widget instance
*
* @returns {Promise}
*/
function create() {
  if (container) throw new Error('Widget already created');

  // handle event listeners
  document.addEventListener('keydown', destroyEventListener);
  document.removeEventListener('keydown', createEventListener);

  return new Promise(resolve => {
    // mount the app
    container = document.createElement('div');
    document.body.appendChild(container);

    ReactDOM.render(
      <Provider store={store}>
        <Search onClose={destroy} />
      </Provider>,
      container,
      () => resolve()
    );
  }).then(() => {
    /**
     * Use setTimeout to place the operation into the
     * event loop (outside the stack) --R
     */
    setTimeout(() => {
      const DOMNode = ReactDOM.findDOMNode(container);
      DOMNode.firstChild.classList.add('is-open');

      // hide main
      main = document.getElementById('main');
      if (main) main.classList.add('is-hidden');
    }, 17);
  });
}

const SearchWidget = Object.freeze({
  create,
  destroy,
});

/**
 * Make the library globally accessible via `SignupWidget` in
 * the browser. For NodeJS, just export the CommonJS module.
 */
if (typeof window !== 'undefined') {
  document.addEventListener('keydown', createEventListener);

  Object.assign(window, {
    SearchWidget,
  });
}

export default SearchWidget;
