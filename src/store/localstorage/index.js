import config from 'src/config';
import { localStorage } from 'src/helpers/browser';

export function get() {
  if (!config.localStorage) return undefined;

  try {
    const serializedState = localStorage.getItem(config.localStorageKey);

    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (error) {
    return undefined;
  }
}

export function set(state) {
  if (!config.localStorage) return;

  try {
    const serializedState = JSON.stringify({
      search: state.search,
    });

    localStorage.setItem(config.localStorageKey, serializedState);
  } catch (error) {
    // do nothing
  }
}
