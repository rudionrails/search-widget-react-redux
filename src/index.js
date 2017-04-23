import React from 'react';
import ReactDOM from 'react-dom';
import Search from './components/pages/Search';
import './index.css';

let container;

/**
* Keydown event listener
*/
const destroyEventListener = ({ keyCode }) => {
  console.log('destroyEventListener');
  if(keyCode === 27) destroy();
};

const createEventListener = (event) => {
  if (event.key === 'F') {
    event.preventDefault();
    create();
  }
};

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

    /**
    * handle event listeners
    */
    document.removeEventListener('keydown', destroyEventListener);
    document.addEventListener('keydown', createEventListener);

    setTimeout(() => resolve(), 300);
  }).then(() => {
    /**
     * Unmount the whole app and unset the variables
     */
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
  container = document.createElement('div');
  document.body.appendChild(container);

  return new Promise(resolve => {
    /**
    * handle event listeners
    */
    document.addEventListener('keydown', destroyEventListener);
    document.removeEventListener('keydown', createEventListener);

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
  document.addEventListener('keydown', createEventListener);

  Object.assign(window, {
    SearchWidget,
  });
}

export default SearchWidget;
