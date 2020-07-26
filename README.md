# vue saas layout
- yarn install安装依赖
- yarn serve 开发
- yarn lib 构建组件
- git打标签如：V1.1.4，引用的项目修改对应标签，如 package中的修改"@yl/vue-saas-layout": "git+ssh://git@git.mysre.cn:SaasComponents/vue-saas-layout.gitt#V1.1.4"



# 主题element-variables.scss调整项见element-variables修改点.md文件

#升级element-ui
- 修改package.json的element-ui为最新版本
- 修改package.json的element-theme-chalk和element-ui一致的版本
- 运行命令yarn install
- 删除element-variables.scss
- 运行命令 et -i 生成element-variables.scss文件
- 对照[element-variables修改点.md](./element-variables修改点.md) 文件修改element-variables.scss调整项
- 运行命令 et 生成主题文件 theme
- 注意留后路，升级可能导致已经使用的一些组件出现兼容问题


# 接入方式

## 方式一

1. package的dependencies中添加依赖包
``` javascript
"@yl/vue-saas-layout": "git+ssh://git@git.mysre.cn:SaasComponents/vue-saas-layout.git#V1.6.1",
```

2. 使用
``` javascript
<template>
  <Layout :left-menus="leftMenus" :top-menus="topMenus">
    <template slot="breadcrumb">标题</template>
  </Layout>
</template>

<script>
// 引入
import { Layout } from '@yl/vue-saas-layout/layout'
export default {
  components: {
    Layout
  },
  data () {
    return {
      leftMenus: [
        {
          icon: 'module-account',
          name: '公众号配置',
          code: 'Wechat',
          url: '',
          isLink: 0,
          childMenus: [
            {
              icon: '',
              name: '自定义菜单',
              code: 'Menu',
              url: 'url',
              isLink: 1
            }
          ]
        }
      ],
      topMenus: [
        {
          url: 'url',
          appName: '管理中心',
          appCode: 'ManagementCenter',
          target: '_self'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

```

## 方式二 （集成http，权限方法，获取基础用户等）

1. package的dependencies中添加依赖包
``` javascript
"@yl/vue-saas-layout": "git+ssh://git@git.mysre.cn:SaasComponents/vue-saas-layout.git#V1.6.1",
```
2. 主文件中注册

``` javascript
import Vue from 'vue';
// 引入组件
import layout from '@yl/vue-saas-layout';

Vue.use(layout, {
  // 框架基础接口
  baseURL: 'https://app-test.myyscm.com',
  // 登录接口
  loginURL: 'https://passport-test.myyscm.com/auth/login',
  httpSuccess: (response) => {

  },
  httpError: (error) => {

  }
});

```

3. 由于vue-saas-layout是vue+es6编写, 需要polyfill (注:接入方式二不需要此步)

``` javascript
  //  正则 .*?vue-saas-layout.* => '_@yl_vue-saas-layout@1.5.3@@yl'
  transpileDependencies: ['.*?vue-saas-layout.*'],
```

## 方式三 （集成http，权限方法，获取基础用户等）

1. package的dependencies中添加依赖包
``` javascript
"@yl/vue-saas-layout": "git+ssh://git@git.mysre.cn:SaasComponents/vue-saas-layout.git#V1.6.1",
```
2. 主文件中注册

``` javascript
import Vue from 'vue';
// 引入组件
import layout from '@yl/vue-saas-layout/dist/vue-saas-layout.umd.min.js';
// 引入样式
import '@yl/vue-saas-layout/dist/vue-saas-layout.css';

Vue.use(layout, {
  // 框架基础接口
  baseURL: 'https://app-test.myyscm.com',
  // 登录接口
  loginURL: 'https://passport-test.myyscm.com/auth/login',
  httpSuccess: (response) => {

  },
  httpError: (error) => {

  }
});

```


## 使用 仅适合方式二和三接入

###  使用Layout组件 (头部菜单,左侧菜单等布局)

``` javascript
import {
  Layout
} from '@yl/vue-saas-layout';
// 如果使用方式二接入,需要指定umd js
// import {
//   Layout
// } from '@yl/vue-saas-layout/dist/vue-saas-layout.umd.min.js';

new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: Layout,
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      children: [{
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
        name: 'home',
        meta: {
          title: '明源云链',
          // 设置左侧活动标签
          selectedMenu: 'Role', // 或 数组['Role',...]
        }
      }]

    },
    { path: '/error',
      component: Layout,
      children: [{
        path: '404',
        component: () => import(/* webpackChunkName: "error" */ '@/views/error/404.vue'),
        name: '找不到页面',
        meta: {
          title: '找不到页面'
        }
      },
      {
        path: '403',
        component: () => import(/* webpackChunkName: "error" */ '@/views/error/403.vue'),
        name: '没权限',
        meta: {
          title: '没权限'
        }
      }] },
  ]
```


### $http: vue实例中的$http (实为axios)

``` javascript
  this.$http.get(url, { params});
  this.$http.post(url, data);
```
### $utils: vue实例中的$utils

``` javascript
 this.$utils.userInfo; // (用户基础信息)
```
