/*
 * @Descripttion:
 * @version:
 * @Author: lihw02
 * @Date: 2019-04-25 09:05:55
 * @LastEditors: lihw02
 * @LastEditTime: 2020-07-21 16:45:37
 */
import Vue from 'vue';
import AppBasic from './packages/AppBasic';
import Directives from './packages/Directives';
import Filters from './packages/Filters';
import Layout from './packages/Layout';
import Sidebar from './packages/Sidebar';
import LayoutHeader from './packages/LayoutHeader';
import Navbar from './packages/Navbar';

import http from './packages/Http';
import auth from './packages/Auth';
import Utils from './packages/Utils';
import Space from './packages/Space';
import SpaceX from './packages/SpaceX';
import EventBus from './packages/EventBus';
import Configurator from './packages/Configurator';

import './theme/index.css';

// 存储组件列表 有顺序依赖
const components = [
  EventBus,
  Utils,
  Directives,
  Filters,
  // Layout,
  // Sidebar,
  // LayoutHeader,
  Space,
  SpaceX,
  http,
  // AppBasic 依赖了EventBus 和utils等
  AppBasic,
  auth,
  Configurator,
  {
    nonComponent: true,
    install (Vue, options) {
      // element设置 中型尺寸
      Vue.prototype.$ELEMENT = {
        size: 'medium'
      };
    }
  }
];

// 定义 install 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue, options) {
  // 判断是否可以安装
  if (install.installed) return;

  // 默认配置
  const defaultOptions = {
    env: '',
    loginURL: 'loginurl',
    baseURL: 'baseApi',
    // 如果不显示头部，将不会发获取头部的请求
    showTopNavs: true,
    // 如果不显示头部，将不会发获取左侧菜单的请求
    showLeftMenus: true,
    // 白名单，支持正则
    whitelist: [],
  };

  // 遍历注册全局组件
  components.map(component => {
    if (component.nonComponent && component.install) {
      // 插件
      component.install(Vue, {
        ...defaultOptions,
        ...options
      });
    } else {
      Vue.component(component.name, component);
    }
  });
};

function createApp (config = {}) {
  const _config = { el: '#app', ...config };
  // const Vue = _config.vue || _config.Vue;
  Vue.use({ install }, _config);
}

export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
};

export {
  createApp,
  Layout,
  Sidebar,
  LayoutHeader,
  Navbar,
};
