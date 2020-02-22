import http from './http.js';

export default {
  nonComponent: true,
  install (Vue, options) {
    const instance = http.init(Vue, options);
    Vue.prototype.$http = instance;
    Vue.$http = instance;
  }
};
