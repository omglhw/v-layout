// 导入组件
import Navbar from '../../src/layout/AppMain/Navbar';

// 为组件提供 install 安装方法，供按需引入
Navbar.install = function (Vue) {
  Vue.component(Navbar.name, Navbar);
};

// 默认导出组件
export default Navbar;
