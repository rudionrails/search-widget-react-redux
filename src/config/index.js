/**
* All the options that can be passed into the widget
*/
const config = {
  container: null, // the container to mount the app to

  preload: true, // whether to fetch data on create or not

  // to disable this altogether, use `trigger: false`
  trigger: {
    path: '#/finder', // unsed to mount the app via window.location
    key: 'F', // used to mount the app via keypress
  },

  apiUrl: null, // http://jjuhznbemfbsm7ibz-mock.stoplight-proxy.io/search

  // to disable this altogether, use `localStorage: false`
  localStorage: 'search-widget-react-redux', // used to identity data in localstorage
};

export function configure(options) {
  Object.keys(options).forEach((key) => {
    if (typeof options[key] === 'undefined') return;

    Object.assign(config, { [key]: options[key] });
  });
}

export default config;
