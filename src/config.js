const config = {
  endpoint: 'http://jjuhznbemfbsm7ibz-mock.stoplight-proxy.io/search',
};

export function configure(options = {}) {
  Object.assign(config, options);
}

export default config;
