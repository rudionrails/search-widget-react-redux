import config from 'src/config';
import {
  window,
  document,
} from 'src/helpers/browser';

export default function create({
  open,
  close,
}) {
  function handleLocationChange() {
    if (window.location.hash === config.trigger.path) {
      open();
    } else {
      close();
    }
  }

  function navigate(href = '#') {
    window.history.pushState(undefined, undefined, href);
    handleLocationChange();
  }

  function handleButtonClick(event) {
    if (!event.target.hash || event.target.hash !== config.trigger.path) return;

    event.preventDefault();
    navigate(event.target.href);
  }

  function destroy() {
    document.removeEventListener('click', handleButtonClick);
    document.removeEventListener('popstate', handleLocationChange);
  }

  /**
   * initialization & public interface
   */
  document.addEventListener('popstate', handleLocationChange);
  document.addEventListener('click', handleButtonClick);
  handleLocationChange();

  return Object.freeze({
    navigate,
    destroy,
  });
}
