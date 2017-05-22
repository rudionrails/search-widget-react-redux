const config = {
  triggerRoute: '#/finder', // unsed to mount the app via window.location
  triggerKey: 'F', // used to mount the app via keypress
  apiUrl: undefined, // http://jjuhznbemfbsm7ibz-mock.stoplight-proxy.io/search
};

export function configure(options) {
  Object.keys(options).forEach((key) => {
    if (typeof options[key] === 'undefined') return;

    Object.assign(config, { [key]: options[key] });
  });
}

export default config;