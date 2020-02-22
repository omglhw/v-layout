// 导入组件
import ElCheckSelect from '../../src/components/ElCheckSelect/select.vue';

// 为组件提供 install 安装方法，供按需引入
ElCheckSelect.install = function (Vue) {
  Vue.component(ElCheckSelect.name, ElCheckSelect);
};

// 默认导出组件
export default ElCheckSelect;
