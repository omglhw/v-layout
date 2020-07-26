<!--
 * @Descripttion: 配置版
 * @version:
 * @Author: lihw02
 * @Date: 2019-04-25 09:05:56
 * @LastEditors: lihw02
 * @LastEditTime: 2020-07-21 16:48:37
 -->
<template>
  <div :class="$style['app-wrapper']">
    <layout-header
      v-if="!isHideLayout"
      ref="header"
      :top-menus="topMenus"
      :show-unified-pass="showUnifiedPass"
      :user="user"
      @command="handleCommand"
    ></layout-header>
    <sidebar
      v-if="!isHideLayout"
      :left-menus="leftMenus"
      :class="$style['sidebar-container']"
    />
    <app-main :is-hide-layout="isHideLayout">
      <template slot="breadcrumb" slot-scope="{data}">
        <slot name="breadcrumb" :data="data"></slot>
      </template>
      <slot></slot>
    </app-main>
  </div>
</template>

<script>
import '../assets/style/reset.scss';
import '../assets/font/iconfont/iconfont.css';
import '../assets/style/changeElementUI.scss';
import '../assets/style/utilities.scss';
import Sidebar from './Sidebar/index';
import LayoutHeader from './LayoutHeader';
import AppMain from './AppMain';
import '../assets/font/iconfont/iconfont';

import { logout } from '../utils/auth';

export default {
  name: 'Layout',
  components: { Sidebar, LayoutHeader, AppMain },
  props: {
    leftMenus: {
      type: Array,
      default () {
        return [];
      },
    },
    topMenus: {
      type: Array,
    },
    user: {
      type: Object
    },
    showUnifiedPass: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    isHideLayout () {
      return this.$utils ? this.$utils.isHideLayout : false;
    },
  },

  async created () {

  },
  mounted () {

  },
  methods: {
    getName () {},
    handleCommand (command) {
      if (command === 'logout') {
        if (this.$utils) {
          // 登出
          logout(this.$utils.baseURL);
        }
      } else if (command === 'unifiedPass') {
        if (this.$router) {
          //
          this.$router.push('/unified-pass/tenant-info');
        }
      }
      this.$emit('command', command);
    },
  },
};
</script>

<style module lang="scss">
@import '../assets/style/variables.scss';
@import '../assets/style/mixin.scss';
.app-wrapper {
  @include clearfix;

  // background: #f0f2f5;
}
</style>
