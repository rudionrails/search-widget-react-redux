import config from 'src/config';
import { localStorage } from 'src/helpers/browser';

export function get() {
  if (config.localStorage === false) return undefined;

  try {
    const serializedState = localStorage.getItem(config.localStorageKey);

    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
}

export function set(state) {
  if (config.localStorage === false) return;

  try {
    const serializedState = JSON.stringify({
      search: state.search,
    });

    localStorage.setItem(config.localStorageKey, serializedState);
  } catch (error) {
    // do nothing
  }
}
