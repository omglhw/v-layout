import {
  getQueryStringFromHashOrSearch,
  try2JSON
} from '../../src/utils';
import {
  getToken,
  setUser,
  getUser,
  login
} from '../../src/utils/auth';
import api from '../../src/api';
import qs from 'qs';

export default {
  nonComponent: true,
  async install (Vue, options) {
    const $http = Vue.$http;
    const $eventBus = Vue.prototype.$eventBus;
    let $loading = Vue.prototype.$loading;
    let loading;

    // baseURL
    Vue.prototype.$utils.baseURL = options.baseURL;
    // 默认OperationCenter
    const appCode = getQueryStringFromHashOrSearch('_ac') || 'OperationCenter';
    // 是否隐藏头部和左边
    const isHideLayout = getQueryStringFromHashOrSearch('hide-layout') || false;

    // 下面的$utils会合并到packages/Utils里面的$utils
    Vue.prototype.$utils = {
      ...Vue.prototype.$utils,
      appCode,
      // 基础数据就绪
      isReady: false,
      // 是否隐藏头部和左边
      isHideLayout: isHideLayout == 1,
      // 用户信息
      userInfo: {},
      // 左侧菜单
      leftMenus: [],
      // 在线服务Url
      toolUrls: {},
      // 权限列表
      permissionList: {},
      // 头部菜单
      topNavs: [],
      // logo
      logoUrl: '',
      // 超级用户
      isSuperAdmin: false,
      // 系统管理员
      isSystemManager: false,
      // 普通用户
      isCommonUser: false,
      // 判断是否白名单
      isWhite: isWhite
    };
    /**
     * 监听storage
     * @param {string} key 键
     * @param {string} newVal 值
     * @param {string} type local | session
     */
    function watchSetItem (key, newVal, type = 'local') {
      if (key === 'topNavs' ||
      key === 'leftMenus' ||
      key === 'permissionList') {
        // 创建一个StorageEvent事件
        var newStorageEvent = document.createEvent('StorageEvent');
        const storage = {
          setItem: function (k, val) {
            if (type === 'local') {
              localStorage.setItem(k, val);
            } else {
              sessionStorage.setItem(k, val);
            }

            // 初始化创建的事件
            newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);

            // 派发对象
            window.dispatchEvent(newStorageEvent);
          }
        };
        return storage.setItem(key, newVal);
      }
    }

    /**
     * 获取ticket
     * 如果token不存在，重新请求ticket
     */
    const checkTicket = async function () {
      const token = getToken();
      const userInfo = getUser();
      // localStorage的用户信息是否异常
      const isUserInfoNormal = userInfo && Object.keys(userInfo).length > 0;

      loading = $loading && $loading({
        lock: true,
        text: '初始化数据中...',
        background: 'rgba(255, 255, 255, 1)'
      });

      // 如果token是空的，从新请求数据
      if (!token || !isUserInfoNormal) {
        const ticket = getQueryStringFromHashOrSearch('ticket');
        const sid = getQueryStringFromHashOrSearch('sid');
        const o = getQueryStringFromHashOrSearch('o');
        // console.log('ticket', ticket);

        if (ticket) {
          await $http.post(options.baseURL + api.checkTicket, {
            ticket,
            sid,
            o
          }).then((res) => {
            const {
              data
            } = res;
            if (data) {
              setUser(data);
            }
            $eventBus.$emit('userInfoChange', data);
            // watchSetItem('user-info', JSON.stringify(data), 'local');
            // await getData({
            //   userInfo: data
            // });
          });
        } else {
          login(options.loginURL);
          return;
        }
      }
      await getData({
        oldToken: token,
        userInfo: getUser()
      });
      loading && loading.close && loading.close();
    };

    // 获取基础数据  左侧菜单 头部菜单 权限等
    async function getData ({
      oldToken,
      userInfo
    }) {
      if (userInfo) {
        Vue.prototype.$utils.userInfo = userInfo;
        //  超级管理员 SUPER_ADMIN
        // 系统管理员 SYSTEM_MANAGER
        // 普通用户 COMMON_USER
        switch (userInfo.userType) {
          case 'SUPER_ADMIN':
            Vue.prototype.$utils.isSuperAdmin = true;
            break;
          case 'SYSTEM_MANAGER':
            Vue.prototype.$utils.isSystemManager = true;
            break;
          case 'COMMON_USER':
            Vue.prototype.$utils.isCommonUser = true;
            break;
        }
      }
      const token = getToken();
      if (token) {
        if (oldToken !== token) {
          // 如果新旧token不一致，更新数据
          await Promise.all([
            getGenerateList(),
            // getTopNavs(),
            // getLeftMenu()
          ]).catch((err) => {
            console.warn(err);
          });
          getTopNavs();
          getLeftMenu();

          localStorage.setItem('ac', appCode);
        } else {
          // token一致时， 如果有以下数据在localStorage中没有异常或为空，直接取localStorage数据，否则重新请求数据
          const ajaxList = [];
          const topDatas = try2JSON(localStorage.getItem('topNavs'));
          // 不缓存
          const noCache = false;

          const permissionList = try2JSON(localStorage.getItem('permissionList'));
          if (permissionList && Object.keys(permissionList).length > 0) {
            Vue.prototype.$utils.permissionList = permissionList;
          } else {
            ajaxList.push(getGenerateList());
          }

          if (topDatas && Array.isArray(topDatas.topNavs) && topDatas.topNavs.length > 0 && noCache) {
            Vue.prototype.$utils.topNavs = topDatas.topNavs;
            Vue.prototype.$utils.logoUrl = topDatas.logoUrl;
          } else {
            // ajaxList.push(getTopNavs());
            getTopNavs();
          }
          const leftMenus = try2JSON(localStorage.getItem('leftMenus'));

          if (Array.isArray(leftMenus) && leftMenus.length > 0 && noCache) {
            Vue.prototype.$utils.leftMenus = leftMenus;
          } else {
            // 清空左边菜单
            watchSetItem('leftMenus', '[]');
            // ajaxList.push(getLeftMenu());
            getLeftMenu();
            localStorage.setItem('ac', appCode);
          }

          if (ajaxList.length > 0) {
            await Promise.all(ajaxList).catch((err) => {
              console.warn(err);
            });
          }
        }
        // 获取服务在线
        getToolUrls();
        // loading && loading.close && loading.close();

        Vue.prototype.$utils.isReady = true;
        // 基础数据就绪
        $eventBus.$emit('baseDataReady', userInfo);

        // 删除url的不需要
        // let url = window.location.href;
        // url = removeUrlAuthParameter(url);
        // // console.log(url, 'replaceState');
        // window.history.replaceState(null, null, url);
      }
    }

    // 监听更新左侧菜单
    $eventBus.$on('updateLeftMenu', () => {
      getLeftMenu();
    });

    /**
     * 获取头部
     */
    const getTopNavs = function () {
      // 如果不显示头部，将不会发获取头部的请求
      if (!options.showTopNavs) {
        return Promise.resolve();
      }
      return $http.post(options.baseURL + api.topNavs, {}, {
        headers: {

        }, }).then(res => {
        if (res.errcode === 0) {
          watchSetItem('topNavs', JSON.stringify(res.data));
          Vue.prototype.$utils.topNavs = res.data.topNavs;
          Vue.prototype.$utils.logoUrl = res.data.logoUrl;
        } else {
          console.warn('获取头部菜单失败');
        }
      });
    };

    /**
     * 获取左侧
     */
    const getLeftMenu = function () {
      // 如果不显示左侧，将不会发获取左侧菜单的请求
      if (!options.showLeftMenus) {
        return Promise.resolve();
      }
      return $http.post(options.baseURL + api.leftMenus, qs.stringify({
        appCode: Vue.prototype.$utils.appCode,
      }), {
        headers: {

        }, }).then(res => {
        if (res.errcode === 0) {
          watchSetItem('leftMenus', JSON.stringify(res.data.leftMenus));
          Vue.prototype.$utils.leftMenus = res.data.leftMenus;
        } else {
          console.warn('获取左侧菜单失败');
        }
      });
    };

    /**
     * 获取在线服务
     */
    const getToolUrls = function () {
      return $http.post(options.baseURL + api.toolUrls, { }, {
        headers: {

        }, }).then(res => {
        if (res.errcode === 0) {
          Vue.prototype.$utils.toolUrls = res.data.urls;
        } else {
          console.warn('获取在线服务失败');
        }
      });
    };

    // 当前系统中可用权限的权限点与权限校验值映射关系表 generatePermissionList
    const getGenerateList = function () {
      return $http.post(options.baseURL + api.generatePermissionList, {}, {
        headers: {

        }, }).then(res => {
        if (res.errcode === 0) {
          watchSetItem('permissionList', JSON.stringify(res.data.permissionList));
          Vue.prototype.$utils.permissionList = res.data.permissionList;
        } else {
          console.warn('获取权限列表失败');
        }
      }).finally(() => {

      }); ;
    };

    // 白名单
    function isWhite (path) {
      let flag = false;
      if (Array.isArray(options.whitelist)) {
        const index = options.whitelist.findIndex(r => {
          const reg = new RegExp(r);
          return reg.test(path);
        });
        flag = index !== -1;
      }
      return flag;
    }

    // 获取当前路由
    let path = '';
    if (options.router.mode === 'hash') {
      path = location.hash.replace('#', '');
    } else {
      path = location.pathname;
    }

    if (!isWhite(path)) {
      // tiket
      await checkTicket();
    }

    // 判断权限列表(permissionList)是否为空
    var isEmbtyPermissionList = () => {
      if (!Vue.prototype.$utils.permissionList) {
        return true;
      } else {
        return Object.keys(Vue.prototype.$utils.permissionList).length === 0;
      }
    };

    // 权限跳转
    const permissionNext = (to, from, next, redirect) => {
      if (to.meta.isView) {
        const isView = Vue.prototype.$utils.hasAuth(to.meta.isView);
        if (!isView && !isEmbtyPermissionList()) {
          next(options.unauthorizedPage || '/error/403');
          return;
        }
      }
      // console.log(redirect, 'redirect');
      if (redirect) {
        next(redirect);
      }
      next();
      // let toQuery = removeAuthParameter(JSON.parse(JSON.stringify(to.query)));
      // console.log(toQuery);
      // next({
      //   path: to.path,
      //   // query: toQuery
      // });
    };

    // 删除url的ticket，sid，o参数
    function removeAuthParameter (query) {
      if (query.sid) {
        delete query.sid;
      }
      if (query.ticket) {
        delete query.ticket;
      }
      if (query.o) {
        delete query.o;
      }
      return query;
    }

    // 携带url参数
    const carryUrlParam = (to, from) => {
      let toQuery = JSON.parse(JSON.stringify(to.query));
      // 删除token tiket
      toQuery = removeAuthParameter(JSON.parse(JSON.stringify(toQuery)));
      // let isChange = false;
      if (!to.query._ac && from.query._ac) {
        // isChange = true;
        // 参数_ac带到下一个路由
        toQuery._ac = from.query._ac;
      }
      if (!to.query._smp && from.query._smp) {
        // isChange = true;
        // 参数_smp带到下一个路由
        toQuery._smp = from.query._smp;
      }
      if (!to.query['hide-layout'] && from.query['hide-layout']) {
        // isChange = true;
        // 参数hide-layout带到下一个路由
        toQuery['hide-layout'] = from.query['hide-layout'];
      }

      return toQuery;
    };

    options.router.beforeEach(async (to, from, next) => {
      // start progress bar
      // NProgress.start();
      if (isWhite(to.path)) {
        if (to.query.ticket) {
          // 白名单url中存在ticket时,尝试获取登录 (出现ticket原因可能是白名单的页面使用了需要登录的接口)
          await checkTicket();
        }
      }
      /* 路由发生变化修改页面title */
      if (to.meta.title) {
        document.title = to.meta.title;
      }

      let beforeToQuery = JSON.stringify(to.query);
      let toQuery = carryUrlParam(to, from);

      if (beforeToQuery !== JSON.stringify(toQuery)) {
        permissionNext(to, from, next, {
          path: to.path,
          query: toQuery
        });
      } else {
        permissionNext(to, from, next);
      }
    });

    options.router.afterEach((to, from) => {
      // 用户信息
      // const userInfo = Vue.prototype.$utils && Vue.prototype.$utils.userInfo;

      // finish progress bar
      // 统一给vue实现的$utils加上appCode
      Vue.prototype.$utils.appCode = to.query._ac;

      const fromAppCode = from.query._ac;
      const toAppCode = to.query._ac;
      if (fromAppCode && toAppCode != fromAppCode) {
        // 更新左侧菜单
        $eventBus.$emit('updateLeftMenu');
      }
    });

    new Vue({
      router: options.router,
      store: options.store,
      render: options.render,
    }).$mount(options.el);
  }
};
