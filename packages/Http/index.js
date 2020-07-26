import http from './http.js';

export default {
  nonComponent: true,
  install (Vue, options) {
    const axios = http.init(Vue, options);
    Vue.prototype.$http = axios;
    Vue.$http = axios;
    Vue.prototype.axios = axios;
    Vue.axios = axios;
  }
};
