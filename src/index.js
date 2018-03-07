/* eslint-disable react/no-find-dom-node */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { document } from 'src/helpers/browser';
import config, { configure } from 'src/config';
import createStore from 'src/store';
import createRouter from 'src/router';
import Search from 'src/containers/pages/Search';

let handleOpen = Function.prototype;
let handleClose = Function.prototype;
let store; // data store
let router; // router to open and close the widget

async function close() {
  if (config.beforeClose) await config.beforeClose(config);

  document.removeEventListener('keydown', handleClose);
  document.addEventListener('keydown', handleOpen);

  // unmount the app
  await ReactDOM.unmountComponentAtNode(config.container);

  if (config.afterClose) await config.afterClose(config);
}

async function open() {
  if (config.beforeOpen) await config.beforeOpen(config);

  document.addEventListener('keydown', handleClose);
  document.removeEventListener('keydown', handleOpen);

  await new Promise((resolve) => {
    ReactDOM.render(
      <Provider store={store}>
        <Search
          showClose={typeof config.trigger === 'object'}
          onClose={() => (config.trigger ? router.navigate() : close())}
          onClick={href => config.onClick(href)}
        />
      </Provider>,
      config.container,
      () => resolve(),
    );
  });

  if (config.afterOpen) await config.afterOpen(config);
}

/* eslint-disable-next-line import/prefer-default-export */
export function create(options = {}) {
  configure(options);

  // container setup
  if (!config.container) {
    config.container = document.createElement('div');
    document.body.appendChild(config.container);
  }
  config.container.classList.add('sw-Wrapper');

  // store + router + event listeners
  store = createStore(config);

  if (typeof config.trigger === 'object') {
    router = createRouter({ open, close });

    handleOpen = (event) => {
      if (event.key !== config.trigger.key) return;

      event.preventDefault();
      router.navigate(config.trigger.path);
    };

    handleClose = (event) => {
      if (event.keyCode !== 27) return;

      event.preventDefault();
      router.navigate();
    };

    document.addEventListener('keydown', handleOpen);
  }

  // public interface
  return Object.freeze({
    get store() {
      return store;
    },

    get config() {
      return config;
    },

    destroy() {
      document.removeEventListener('keydown', handleOpen);
      config.container.classList.remove('sw-Wrapper');

      if (router) router.destroy();
      // if (store) store.destroy();
      router = undefined;
      store = undefined;
    },

    open,
    close,
  });
}
