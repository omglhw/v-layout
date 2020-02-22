<template>
  <div :class="$style['app-wrapper']">
    <layout-header
      v-if="!isHideLayout"
      ref="header"
    ></layout-header>
    <sidebar
      v-if="!isHideLayout"
      :class="$style['sidebar-container']"
    />
    <app-main />
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
export default {
  name: 'Layout',
  components: { Sidebar, LayoutHeader, AppMain },
  computed: {
    navs () {
      return 3;
    },
    isHideLayout () {
      return this.$utils.isHideLayout;
    },
  },
  watch: {
    navs: function (a, b) {},
  },
  created () {},
  mounted () {},
  methods: {
    getName () {},
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
