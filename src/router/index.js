/* global window, location, history */
/* global addEventListener, removeEventListener */

import config from 'src/config';
import {
  location,
  history,
  addEventListener,
  removeEventListener,
} from 'src/helpers/browser';

export default function create({
  open = Function.prototype,
  close = Function.prototype,
} = {}) {
  function handleLocationChange() {
    if (location.hash === config.triggerRoute) {
      open();
    } else {
      close();
    }
  }

  // public interface
  function navigate(path) {
    if (path.startsWith('http')) {
      Object.assign(location, { href: path });
    } else {
      history.pushState(undefined, undefined, path);
      handleLocationChange();
    }
  }

  function destroy() {
    removeEventListener('popstate', handleLocationChange);
  }

  // initialization
  addEventListener('popstate', handleLocationChange);
  handleLocationChange();

  return Object.freeze({
    navigate,
    destroy,
  });
}
