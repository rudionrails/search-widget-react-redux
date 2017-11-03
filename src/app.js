/* eslint-disable react/no-find-dom-node */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { setTimeout } from 'src/helpers/browser';
import config, { configure } from 'src/config';
import createStore from 'src/store';
import createRouter from 'src/router';
import Search from 'src/containers/pages/Search';
import './app.css';

let store; // data store
let router; // router to open and close the widget
let container; // container for the react app

function closeEventListener(event) {
  if (event.keyCode === 27) router.navigate('#'); // ESC
}

function openEventListener(event) {
  if (event.key !== config.triggerKey) return;

  event.preventDefault();
  router.navigate(config.triggerRoute);
}

async function open() {
  if (container) return;

  await new Promise((resolve) => {
    // handle event listeners
    document.addEventListener('keydown', closeEventListener);
    document.removeEventListener('keydown', openEventListener);

    // mount the app
    container = document.createElement('div');
    document.body.appendChild(container);

    ReactDOM.render(
      <Provider store={store}>
        <Search
          onClose={() => router.navigate('#/')}
          onClick={path => router.navigate(path)}
        />
      </Provider>,
      container,
      () => resolve(),
    );
  });

  /**
  * Use setTimeout to place the operation into the
  * event loop (outside the stack) --R
  */
  await setTimeout(() => {
    const DOMNode = ReactDOM.findDOMNode(container);
    DOMNode.firstChild.classList.add('is-open');

    // prevent scolling
    document.body.classList.add('is-hidden');
  }, 17);
}

async function close() {
  if (!container) return;

  await new Promise((resolve) => {
    // handle event listeners
    document.removeEventListener('keydown', closeEventListener);
    document.addEventListener('keydown', openEventListener);

    // unmount the app
    const DOMNode = ReactDOM.findDOMNode(container);
    DOMNode.firstChild.classList.remove('is-open');

    // enable scrolling
    document.body.classList.remove('is-hidden');

    // wait for CSS animation to complete
    setTimeout(() => resolve(), 250);
  });

  // unmount the app
  ReactDOM.unmountComponentAtNode(container);
  document.body.removeChild(container);

  container = undefined;
}

function create(options = {}) {
  if (store) throw new Error('already created');

  // handle event listeners
  document.addEventListener('keydown', openEventListener);

  // initialize
  configure(options);
  store = createStore();
  router = createRouter({ open, close });

  // public interface
  function destroy() {
    document.removeEventListener('keydown', openEventListener);

    router.destroy();
    // store.destroy();

    router = undefined;
    store = undefined;
  }

  return Object.freeze({
    get store() {
      return store;
    },

    get config() {
      return config;
    },

    destroy,
  });
}

export default create;
