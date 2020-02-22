import {
  subString,
  emptyPlaceholder
} from '../../src/utils';

export default {
  nonComponent: true,
  install (Vue) {
    Vue.filter('subString', function (value, length, suffix) {
      if (!value) return '';
      value = value.toString();
      return subString(value, length, suffix);
    });
    Vue.filter('emptyPlaceholder', function (value, placeholder) {
      return emptyPlaceholder(value, placeholder);
    });
  }
};
