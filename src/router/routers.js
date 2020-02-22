import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/Home.vue';
import { Layout } from '../../index';
import ElmentuiTool from '@/views/ElmentuiTool.vue';
// Vue.use(layout)
Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'home',
    component: Layout,
    meta: {
      title: '参数设置',
      icon: 'home'
    },
    children: [{
      path: 'elementui',
      component: () => import(/* webpackChunkName: "contentPage" */ '@/views/Elementui.vue'),
      name: 'element ui',
      meta: {
        showOnlyOneTitle: false,
        title: '自定义平台logo',
        toolComponent: ElmentuiTool,
        leftComponent: ElmentuiTool,
        selectedMenu: ['AutoResponse', 'Channel'],

      }
    }]
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
        import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    path: '/layout',
    name: 'layout',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "layout" */ '@/views/Layout.vue')
  },
  {
    path: '/test',
    name: 'test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Test" */ '@/views/Test.vue')
  }
  ],
});
