/**
* All the options that can be passed into the widget
*/
const config = {
  preload: true, // whether to fetch data on create or not
  triggerRoute: '#/finder', // unsed to mount the app via window.location
  triggerKey: 'F', // used to mount the app via keypress
  apiUrl: undefined, // http://jjuhznbemfbsm7ibz-mock.stoplight-proxy.io/search
  localStorageKey: 'search-widget-react-redux', // used to identity data in localstorage
};

export function configure(options) {
  Object.keys(options).forEach((key) => {
    if (typeof options[key] === 'undefined') return;

    Object.assign(config, { [key]: options[key] });
  });
}

export default config;
