// 导入组件
import ElCheckOption from '../../src/components/ElCheckSelect/option.vue';

// 为组件提供 install 安装方法，供按需引入
ElCheckOption.install = function (Vue) {
  Vue.component(ElCheckSelect.name, ElCheckOption);
};

// 默认导出组件
export default ElCheckOption;
