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
      getQueryString: getQueryStringFromHashOrSearch
    };
  }
};
