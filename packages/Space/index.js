// 导入组件
import Space from '../../src/components/Space';

// 为组件提供 install 安装方法，供按需引入
Space.install = function (Vue) {
  Vue.component(Space.name, Space);
};

// 默认导出组件
export default Space;
