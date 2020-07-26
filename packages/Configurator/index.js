/*
 * @Descripttion:
 * @version:
 * @Author: lihw02
 * @Date: 2020-07-20 18:33:26
 * @LastEditors: lihw02
 * @LastEditTime: 2020-07-21 16:49:49
 */
import configInstance from './configInstance.js';

export default {
  nonComponent: true,
  install (Vue, options) {
    Vue.prototype.$configInstance = configInstance(options);
  }
};
