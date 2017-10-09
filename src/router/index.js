import config from 'src/config';
import {
  window,
  document,
} from 'src/helpers/browser';

export default function create({
  open,
  close,
}) {
  async function handleLocationChange() {
    if (window.location.hash === config.triggerRoute) {
      await open();
    } else {
      await close();
    }
  }

  async function navigate(path) {
    if (path.startsWith('http')) {
      await close();
      Object.assign(window.location, { href: path });
    } else {
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
