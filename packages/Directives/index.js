import {
  checkAuth
} from '../Auth/auth.js';

export default {
  nonComponent: true,
  install (Vue, options) {
    // 删除节点dom
    const remove = (el) => el.parentNode.removeChild(el);

    Vue.directive('auth', {
      inserted: (el, binding, vNode) => {
        // 获取传入的权限码value（string or array）和修饰符modifiers
        let {
          value,
          modifiers
        } = binding;

        // 判断条件：当传入的值不是数组或者字符串时，直接隐藏元素
        if (
          !(
            typeof value === 'string' ||
            value instanceof Array
          ) ||
          !value
        ) {
          remove(el);
          return console.error('请设置值为string或者array.');
        }

        // 判断条件：如果传入的权限码是string则转化成数组
        if (typeof value === 'string') {
          value = [value];
        }

        /**
         * 判断条件
         *  -修饰符为 every时 value数组只要有一个元素不存在权限集内，隐藏元素
         *  -修饰符为 some或者没有时，value数组所有元素都不存在权限集内，隐藏元素
         */
        if (
          (
            modifiers.every &&
            value.some(v => !checkAuth(v))
          ) ||
          (
            !modifiers.every &&
            value.every(v => !checkAuth(v))
          )
        ) {
          remove(el);
        }
      }
    });
  }
};
