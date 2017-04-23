import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/pages/Search';
import './index.css';

let container;


/**
* Keydown event listener
*/
const closeEventListener = ({ keyCode }) => {
  if(keyCode === 27) destroy();
};

const createEventListener = (event) => {
  if (event.code === 'KeyF') {
    event.preventDefault();
    create();
  }
};

document.addEventListener('keypress', createEventListener);

/**
* Destroys the widget instance
*
* @returns {Promise}
*/
function destroy() {
  if (!container) throw new Error('Widget not created');

  return new Promise(resolve => {
    /**
     * We transition the React container out and then resolve the promise
     */
    const DOMNode = ReactDOM.findDOMNode(container);
    DOMNode.firstChild.classList.remove('Search--open');

    /**
    * show main content
    */
    const main = document.getElementById('main');
    main.classList.remove('main--hide');

    setTimeout(() => resolve(), 300);
  }).then(() => {
    /**
     * Unmount the whole app and unset the variables
     */
    ReactDOM.unmountComponentAtNode(container);

    document.body.removeChild(container);
    document.removeEventListener('keydown', closeEventListener);

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
  container = document.createElement('div');

  /**
  * append to body and add ESC key listener
  */
  document.body.appendChild(container);
  document.addEventListener('keydown', closeEventListener);

  return new Promise(resolve => {
    ReactDOM.render(
      <Search onClose={destroy} />,
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
      DOMNode.firstChild.classList.add('Search--open');

      /**
      * hide main content
      */
      const main = document.getElementById('main');
      main.classList.add('main--hide');
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
  Object.assign(window, {
    SearchWidget,
  });
}

export default SearchWidget;
