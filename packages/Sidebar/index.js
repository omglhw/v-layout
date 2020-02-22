// 导入组件
import Sidebar from '../../src/layout/Sidebar';

// 为组件提供 install 安装方法，供按需引入
Sidebar.install = function (Vue) {
  Vue.component(Sidebar.name, Sidebar);
};

// 默认导出组件
export default Sidebar;
