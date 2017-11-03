import _debug from 'debug';
import config from 'src/config';
import {
  window,
  document,
} from 'src/helpers/browser';

const debug = _debug('app:router');

export default function create({
  open,
  close,
}) {
  async function handleLocationChange() {
    if (window.location.hash === config.triggerRoute) {
      debug('handleLocationChange', 'open');
      await open();
    } else {
      debug('handleLocationChange', 'close');
      await close();
    }
  }

  async function navigate(path) {
    debug('navigate: ', path);

    if (path.startsWith('http')) { // redirect
      await close();
      Object.assign(window.location, { href: path });
    } else { // open/close widget
      await window.history.pushState(undefined, undefined, path);
      await handleLocationChange();
    }
  }

  function destroy() {
    document.removeEventListener('popstate', handleLocationChange);
  }

  // initialization
  document.addEventListener('popstate', handleLocationChange);
  handleLocationChange();

  return Object.freeze({
    navigate,
    destroy,
  });
}
