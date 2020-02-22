import Vue from 'vue';
import App from './App.vue';
import router from './router/routers';
// import store from './store/store';
import '@/plugins/elementui.js';
// import '@/assets/font/iconfont/iconfont.css';
// import './assets/style/reset.scss';
import layout from '../index';

Vue.config.productionTip = false;

Vue.prototype.$ELEMENT = {
  size: 'medium'
};

Vue.use(layout, {
  evn: '',
  loginURL: 'https://passport-test.myyscm.com/auth/login',
  // baseURL: '/baseapi',
  baseURL: 'https://app-test.myyscm.com',
  interceptors: (axios) => {},
  tokenChange: ({
    token
  }) => {
    console.log(token, 'tokenChange');
  },
  httpSuccess: (response) => {
    console.log(response, 'httpSuccess');
  },
  httpError: (error) => {
    console.log(error, 'httpError');
  }
});

new Vue({
  router,
  // store,
  render: h => h(App),
}).$mount('#app');
