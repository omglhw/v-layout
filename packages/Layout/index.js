// 导入组件
import Layout from '../../src/layout/Layout';

// 为组件提供 install 安装方法，供按需引入
Layout.install = function (Vue) {
  Vue.component(Layout.name, layout);
};

// 默认导出组件
export default Layout;
