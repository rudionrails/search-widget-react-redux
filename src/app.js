/* eslint-disable react/no-find-dom-node */

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { document } from 'src/helpers/browser';
import config, { configure } from 'src/config';
import createStore from 'src/store';
import createRouter from 'src/router';
import Search from 'src/containers/pages/Search';
import './app.css';

let handleOpen = Function.prototype;
let handleClose = Function.prototype;
let store; // data store
let router; // router to open and close the widget

async function close() {
  if (config.beforeClose) await config.beforeClose(config);

  if (config.trigger) {
    document.removeEventListener('keydown', handleClose);
    document.addEventListener('keydown', handleOpen);
  }

  // unmount the app
  await ReactDOM.unmountComponentAtNode(config.container);

  if (config.afterClose) await config.afterClose(config);
}

async function open() {
  if (config.beforeOpen) await config.beforeOpen(config);

  if (typeof config.trigger === 'object') {
    document.addEventListener('keydown', handleClose);
    document.removeEventListener('keydown', handleOpen);
  }

  await new Promise((resolve) => {
    ReactDOM.render(
      <Provider store={store}>
        <Search
          onClose={() => (config.trigger ? router.navigate('#') : close())}
          onClick={() => console.log('click')}
        />
      </Provider>,
      config.container,
      () => resolve(),
    );
  });

  if (config.afterOpen) await config.afterOpen(config);
}

function destroy() {
  if (config.trigger) {
    document.removeEventListener('keydown', handleOpen);
  }

  if (router) router.destroy();
  // if (store) store.destroy();
  router = undefined;
  store = undefined;
}

export default function create(options = {}) {
  configure(options);

  // app container
  if (!config.container) {
    config.container = document.createElement('div');
    document.body.appendChild(config.container);
  }
  config.container.classList.add('sw-Wrapper');

  // store + router
  store = createStore(config);
  if (typeof config.trigger === 'object') {
    router = createRouter({
      trigger: config.trigger,
      open,
      close,
    });

    document.addEventListener('keydown', handleOpen);
  }

  handleOpen = (event) => {
    if (event.key !== config.trigger.key) return;

    event.preventDefault();
    if (router) {
      router.navigate(config.trigger.path);
    } else {
      close();
    }
  };

  handleClose = (event) => {
    if (event.keyCode !== 27) return;

    if (router) {
      router.navigate('#');
    } else {
      close();
    }
  };

  // public interface
  return Object.freeze({
    get store() {
      return store;
    },

    get config() {
      return config;
    },

    open,
    close,
    destroy,
  });
}
