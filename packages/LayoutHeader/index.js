// 导入组件
import LayoutHeader from '../../src/layout/LayoutHeader';

// 为组件提供 install 安装方法，供按需引入
LayoutHeader.install = function (Vue) {
  Vue.component(LayoutHeader.name, LayoutHeader);
};

// 默认导出组件
export default LayoutHeader;
