# vue layout
- yarn install安装依赖
- yarn serve 开发
- yarn lib 构建组件
- git打标签如：V1.1.4，引用的项目修改对应标签，如 package中的修改"v-layout": "https://github.com/omglhw/v-layout.git#V1.1.4"




# 升级element-ui

- 修改package.json的element-ui为最新版本
- 修改package.json的element-theme-chalk和element-ui一致的版本
- 运行命令yarn install
- 删除element-variables.scss
- 运行命令 et -i 生成element-variables.scss文件
- 对照element-variables修改点.md 文件修改element-variables.scss调整项
- 运行命令 et 生成主题文件 theme
- 注意留后路，升级可能导致已经使用的一些组件出现兼容问题

## 主题element-variables.scss调整项见element-variables修改点.md文件

# 接入方式

## 方式一(建议)

1. package的dependencies中添加依赖包
``` javascript
"v-layout": "https://github.com/omglhw/v-layout.git#V1.1.4",
```
2. 主文件中注册

``` javascript
import Vue from 'vue';
// 引入组件
import layout from 'v-layout';

Vue.use(layout, {
  // 框架基础接口
  baseURL: 'https://api-test.test.com',
  // 登录接口
  loginURL: 'https://passport-test.test.com/auth/login',
  httpSuccess: (response) => {

  },
  httpError: (error) => {

  }
});

```

3. 由于v-layout是vue+es6编写, 需要polyfill (注:接入方式二不需要此步)

``` javascript
  //  正则 .*?v-layout.* => '_@yl_v-layout@1.5.3@@yl'
  transpileDependencies: ['.*?v-layout.*'],
```

## 方式二

1. package的dependencies中添加依赖包
``` javascript
"v-layout": "https://github.com/omglhw/v-layout.git#V1.1.4",
```
2. 主文件中注册

``` javascript
import Vue from 'vue';
// 引入组件
import layout from 'v-layout/dist/v-layout.umd.min.js';
// 引入样式
import 'v-layout/dist/v-layout.css';

Vue.use(layout, {
   // 框架基础接口
  baseURL: 'https://api-test.test.com',
  // 登录接口
  loginURL: 'https://passport-test.test.com/auth/login',
  httpSuccess: (response) => {

  },
  httpError: (error) => {

  }
});

```


## 使用

###  使用Layout组件 (头部菜单,左侧菜单等布局)

``` javascript
import {
  Layout
} from 'v-layout';
// 如果使用方式二接入,需要指定umd js
// import {
//   Layout
// } from 'v-layout/dist/v-layout.umd.min.js';

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
          title: 'v-layout',
          // 设置左侧活动标签
          selectedMenu: 'Role', // 或 数组['Role',...]
        }
      }]

    },

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
