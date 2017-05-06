const config = {
  hostname: 'http://jjuhznbemfbsm7ibz-mock.stoplight-proxy.io',
  pathname: 'search',
};

export function configure(options = {}) {
  Object.assign(config, options);
}

export default config;
