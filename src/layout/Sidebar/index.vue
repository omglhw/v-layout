<template>
  <aside
    :class="$style['sidebar']"
    class="el-sidebar-wrapper"
  >
    <el-scrollbar :wrap-class="$style['scrollbar-wrapper']">
      <el-menu
        :default-active="activeIndex"
        :class="$style['menu']"
        @select="handleSelect"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-submenu
          v-for="item in leftMenus"
          :key="item.code"
          :index="item.code"
          padding-style="10px"
        >
          <template slot="title">
            <i
              :class="{[$style['iconfont-layout']]: true,
              [getIcon(item)]: true,
              }"
              class="iconfont-layout "
            ></i>
            <a
              v-if="!!item.url"
              :href="item.url"
              onclick="return false"
            >
              <span
                :title="item.name"
                :class="$style['menu-title']"
              >{{item.name}}</span></a>
            <span
              v-else
              :title="item.name"
              :class="$style['menu-title']"
            >{{item.name}}</span>
          </template>
          <template v-if="item.childMenus">
            <el-menu-item
              v-for="childItem in item.childMenus"
              :key="childItem.code"
              :title="childItem.name"
              :index="childItem.code"
            >
              <a
                :href="childItem.url"
                onclick="return false"
              ><span
                  :href="childItem.url"
                  :class="$style['menu-title']"
                >{{childItem.name}}</span></a>
            </el-menu-item>
          </template>
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </aside>
</template>

<script>
// import { Scrollbar } from 'element-ui';
import { try2JSON } from '../../utils';
export default {
  name: 'Sidebar',

  data () {
    return {
      leftMenus: this.$utils.leftMenus,
      // activeIndex: '',
    };
  },
  computed: {
    routes () {
      return this.$router.options.routes;
    },
    // 通过跌幅配置的meta selectedMenu和name来选中菜单
    activeIndex () {
      if (this.$route) {
        const meta = this.$route.meta;
        let selectedMenu = this.$route.name;
        if (meta && meta.selectedMenu) {
          if (Array.isArray(meta.selectedMenu)) {
            const menu = this.findLeftMenus(meta.selectedMenu);
            if (menu) {
              selectedMenu = menu;
            }
          } else {
            selectedMenu = meta.selectedMenu;
          }
        }
        return selectedMenu;
      }
      return '';
    },
  },
  created () {
    const leftMenusString = localStorage.getItem('leftMenus');
    this.leftMenus = try2JSON(leftMenusString);

    window.addEventListener('setItem', () => {
      const leftMenusString = localStorage.getItem('leftMenus');
      this.leftMenus = try2JSON(leftMenusString);
    });
  },
  mounted () {},
  methods: {
    getIcon (item) {
      if (item.code) {
        return 'icon-' + item.code;
      }
      return 'icon-Others';
    },
    handleOpen (key, keyPath) {},
    handleClose (key, keyPath) {},
    handleSelect (key, keyPath) {
      this.leftMenus.forEach(item => {
        if (key === item.code && item.url) {
          // 如果一级有url就跳转
          location.href = item.url;
        }
        if (item.childMenus && item.childMenus.length > 0) {
          item.childMenus.forEach(child => {
            if (child.code === key && child.url) {
              // 如果二级有url就跳转
              location.href = child.url;
            }
          });
        }
      });
    },
    // 查找selectedMenus中的项是否在菜单里面出现并返回当前项，否返回空
    findLeftMenus (selectedMenus) {
      let menu = '';
      if (Array.isArray(this.leftMenus)) {
        this.leftMenus.some(item => {
          if (!item.childMenus) {
            return false;
          }
          return item.childMenus.some(child => {
            if (selectedMenus.includes(child.code)) {
              menu = child.code;
              return true;
            }
            return false;
          });
        });
      }
      return menu;
    },
  },
};
</script>

<style module lang="scss">
@import '../../assets/style/variables.scss';
@import '../../assets/style/mixin.scss';
.sidebar {
  position: fixed;
  left: 0;
  width: $sideBarWidth;
  top: $headerHeight + $spacing;
  height: calc(100% - #{$headerHeight + $spacing});
  background: $subMenuBg;
  text-align: left;
  overflow: hidden;
  z-index: 1002;
  border-right: 1px solid $borderColor;
  border-top: 1px solid $borderColor;
  .scrollbar-wrapper {
    overflow-x: hidden !important;
    // height: 100%;
    // :global(.el-scrollbar__view) {
    //   height: 100%;
    // }
  }
  :global(.el-scrollbar) {
    height: 100%;
  }
  .menu {
    margin-top: 4px;
    height: 100%;
    .icon {
      position: relative;
      padding-right: 4px;
      left: -4px;
      top: -2px;
    }
    .iconfont-layout {
      position: relative;
      padding-right: 4px;
      color: #65b5ff;
      left: -4px;
    }
    .menu-title {
      @include text-overflow;
      display: inline-block;
      width: $sideBarWidth - $spacing * 9;
    }
  }
}
</style>
