/*
 * @Descripttion:
 * @version:
 * @Author: lihw02
 * @Date: 2019-05-07 11:41:50
 * @LastEditors: lihw02
 * @LastEditTime: 2020-07-21 16:45:44
 */
import {
  subString,
  isEmpty,
  emptyPlaceholder,
  getHeaderHeight,
  getQueryStringFromHashOrSearch
} from '../../src/utils';
import {
  getToken,
  getUser,

} from '../../src/utils/auth';
export default {
  nonComponent: true,
  install (Vue, options) {
    Vue.prototype.$utils = {
      subString,
      isEmpty,
      emptyPlaceholder,
      getToken,
      getUser,
      getHeaderHeight,
      getQueryString: getQueryStringFromHashOrSearch,
    };
  }
};
