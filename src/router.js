/**
* Event listeners
*/

export default function createRouter({
  openPath,
  open,
  close,
}) {
  function handleLocation() {
    const currentPath = location.hash || '#/';

    if (currentPath === openPath) {
      open();
    } else {
      close();
    }
  }

  // public interface
  function navigate(path = '#/') {
    history.pushState(undefined, undefined, path);
    handleLocation();
  }

  function destroy() {
    removeEventListener('popstate', handleLocation);
  }

  // initialization
  addEventListener('popstate', handleLocation);
  handleLocation();

  return Object.freeze({
    navigate,
    destroy,
  });
}
