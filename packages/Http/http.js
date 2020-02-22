/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import api from '../../src/api';
import {
  getToken,
  setToken,
  login,
  getUser
} from '../../src/utils/auth';
import {
  getQueryStringFromHashOrSearch
} from '../../src/utils';

export default {

  init (Vue, options) {
    /**
     * 请求失败后的错误统一处理
     * @param {Number} status 请求失败的状态码
     */
    const errorHandle = (status, other) => {
      // 状态码判断
      switch (status) {
        // 401: 未登录状态，跳转登录页
        case 401:

          login(options.loginURL);
          break;
      }
    };

    // 创建axios实例
    var instance = axios.create({
      // timeout: 1000 * 12,
    });
    // 设置post请求头
    instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    // response.setHeader('Access-Control-Expose-Headers', 'token');
    /**
     * 请求拦截器
     * 每次请求前，如果存在token则在请求头中携带token
     */
    instance.interceptors.request.use(
      config => {
        // 登录流程控制中，根据本地是否存在token判断用户的登录情况
        // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
        // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
        // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。
        const token = getToken();

        // 判断缓存和当前的用户是否一致
        // 场景：同一个浏览器多个标签页登录不同的用户
        const newUserInfo = getUser();
        const userInfo = Vue.prototype.$utils && Vue.prototype.$utils.userInfo;

        if (newUserInfo && userInfo) {
          if (newUserInfo.account != userInfo.account) {
            // 两次账号不一致，重新登录
            login(options.loginURL);
            return false;
          }
        }
        token && (config.headers.Authorization = token);
        // get方式带上时间戳,防止缓存
        if (config.method == 'get') {
          config.params = {
            timestamp: new Date().getTime(),
            ...config.params
          };
        }
        const smp = getQueryStringFromHashOrSearch('_smp');
        if (smp) {
          config.params = {
            smp,
            ...config.params
          };
        }
        return config;
      },
      error => Promise.error(error));

    // 响应拦截器
    instance.interceptors.response.use(
      // 请求成功
      res => {
        // 后端是否返回token
        if (res.headers && res.headers.authorization) {
          const token = res.headers.authorization;

          // 刷新token
          setToken(token);
          if (typeof options.tokenChange === 'function') {
            options.tokenChange({
              token
            });
          }
        }

        // 如果配置http回调  基础的框架接口不回调
        if (typeof options.httpSuccess === 'function') {
          // 回调，
          options.httpSuccess(res);
        }

        const data = res.data;
        // if (data.errcode === 0 || data.code === 200) {
        //   // 成功时返回data
        //   // return Promise.resolve(data);
        // } else

        if (data.errcode === 10011) {
          // 无效ticket 重新登录
          login(options.loginURL);
        }
        //  else {
        //   if (data.message) {
        //     $message.warning(data.message);
        //     console.warn(`errcode:${data.errcode},message:${data.message}`);
        //   }
        // }

        return Promise.resolve(data);
      },
      // 请求失败
      error => {
        let isBaseUrl = false;

        if (error.config && error.config.url) {
          // 判断是否基础接口
          const baseUrls = [api.topNavs,
            api.leftMenus,
            api.toolUrls,
            api.generatePermissionList];
          isBaseUrl = baseUrls.some(url => error.config.url.indexOf(url) >= 0);
        }

        const {
          response
        } = error;
        if (response) {
          // 请求已发出，但是不在2xx的范围
          if (response.status) {
            errorHandle(response.status, response.data.message);
          }
        } else {
          // 处理断网的情况

        }

        if (typeof options.httpError === 'function') {
          if (response) {
            // 基础接口，如果是401不需要回调 或者 请求被取消
            if (isBaseUrl && (error.code === 'ECONNABORTED' || response.status === 401)) {

            } else {
              options.httpError(error);
            }
          }
        }
        return Promise.reject(response);
      });

    return instance;
  }
};
