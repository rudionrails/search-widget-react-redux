/* eslint-disable react/no-find-dom-node */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Search from 'src/containers/pages/Search';
import createStore from 'src/store';
import createRouter from 'src/router';
import './index.css';

function createApp({
  openPath = '#/finder',
  openKeyCode = 'F',
}) {
  const store = createStore();
  let router;
  let container; // container for the react app
  let main; // container for the overall layout

  function closeEventListener({ keyCode }) {
    if (keyCode === 27) router.navigate('#/');
  }

  function openEventListener(event) {
    if (event.key !== openKeyCode) return;

    event.preventDefault();
    router.navigate(openPath);
  }

  function open() {
    if (container) return Promise.resolve();

    return new Promise((resolve) => {
      // handle event listeners
      document.addEventListener('keydown', closeEventListener);
      document.removeEventListener('keydown', openEventListener);

      // mount the app
      container = document.createElement('div'); // eslint-disable-line no-param-reassign
      document.body.appendChild(container);

      ReactDOM.render(
        <Provider store={store}>
          <Search onClose={() => router.navigate('#/')}/>
        </Provider>,
        container,
        () => resolve(),
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
        main = document.getElementById('main'); // eslint-disable-line no-param-reassign
        if (main) main.classList.add('is-hidden');
      }, 17);
    });
  }

  function close() {
    if (!container) return Promise.resolve();

    return new Promise((resolve) => {
      // handle event listeners
      document.removeEventListener('keydown', closeEventListener);
      document.addEventListener('keydown', openEventListener);

      // unmount the app
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

  function destroy() {
    router.destroy();
  }

  // initialization
  document.addEventListener('keydown', openEventListener);

  router = createRouter({
    openPath,
    open,
    close,
  });

  return Object.freeze({
    destroy,
  });
}

createApp({ /* config */ });
