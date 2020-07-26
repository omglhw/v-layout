/*
 * @Descripttion:
 * @version:
 * @Author: lihw02
 * @Date: 2019-04-25 09:05:56
 * @LastEditors: lihw02
 * @LastEditTime: 2020-07-20 17:36:52
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router/routers';
// import store from './store/store';
import '@/plugins/elementui.js';
// import '@/assets/font/iconfont/iconfont.css';
// import './assets/style/reset.scss';
import { createApp } from '../index';

Vue.config.productionTip = false;

Vue.prototype.$ELEMENT = {
  size: 'medium'
};

createApp({
  vue: Vue,
  render: h => h(App),
  router,
  evn: '',
  // 白名单，支持正则
  whitelist: ['/test'],
  loginURL: 'https://passport-test.myyscm.com/auth/login',
  // baseURL: '/baseapi',
  baseURL: 'https://app-test.myyscm.com',
  // interceptors: (axios) => {},
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
