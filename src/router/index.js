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
  async function handleLocationChange() {
    if (location.hash === config.triggerRoute) {
      await open();
    } else {
      await close();
    }
  }

  // initialization
  addEventListener('popstate', handleLocationChange);
  handleLocationChange();

  // public interface
  async function navigate(path) {
    if (path.startsWith('http')) {
      await close();
      Object.assign(location, { href: path });
    } else {
      await history.pushState(undefined, undefined, path);
      await handleLocationChange();
    }
  }

  function destroy() {
    removeEventListener('popstate', handleLocationChange);
  }

  return Object.freeze({
    navigate,
    destroy,
  });
}
