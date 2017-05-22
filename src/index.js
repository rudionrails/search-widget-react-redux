import { window } from 'src/helpers/browser';
import create from 'src/app';

const SearchWidget = Object.freeze({
  create,
});

/**
* Make it globalle accessible only in the browser
*/
if (typeof window !== 'undefined') {
  Object.assign(window, { SearchWidget });
}

export default SearchWidget;
