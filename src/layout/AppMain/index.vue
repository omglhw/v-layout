<template>
  <section :class="{[$style['app-main']]: true, [$style['hide-layout']]:isHideLayout }">
    <div :class="{[$style['app-content']]: true, [$style['full-screen']]: isFullScreen}">
      <navbar
        :show-full-screen="!isHideLayout"
        @screenChange="screenChange"
      >
        <template
          slot="breadcrumb"
          slot-scope="{data}"
        >
          <slot
            name="breadcrumb"
            :data="data"
          ></slot>
        </template>
      </navbar>
      <div :class="$style['content']">
        <div :class="$style['inner-content']">
          <slot>
            <transition
             :name="transitionName">
            >
              <router-view class="router-view" />
            </transition>
          </slot>
        </div>
      </div>
    </div>
    <layout-footer />
  </section>
</template>

<script>
import LayoutFooter from '../LayoutFooter';
import Navbar from './Navbar';

export default {
  name: 'AppMain',
  components: { LayoutFooter, Navbar },
  props: {
    isHideLayout: {
      type: Boolean,
      default: false
    },
  },
  data () {
    return {
      isFullScreen: false,
      transitionName: 'slide-left'
    };
  },
  // 监听路由的路径，可以通过不同的路径去选择不同的切换效果
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    }
  },
  methods: {
    screenChange (isFullScreen) {
      this.isFullScreen = isFullScreen;
      if (isFullScreen) {
        document.body.classList.add('no-scroll');
      } else {
        document.body.classList.remove('no-scroll');
      }
    },
  },
};
</script>

<style lang="scss" module>
@import '../../assets/style/variables.scss';
// 内容最小宽
$contentMinWidth: 1080px;
.app-main {
  background: #f0f2f5;
  position: relative;
  // overflow: hidden;
  margin-left: 180px;
  min-width: $contentMinWidth;
  padding: $headerHeight + $spacing 0 $spacing * 2 0;
  // // min-height: calc(100vh - #{$headerHeight + ($spacing * 2)});
  // min-height: 500px;
  border-top: 1px solid $borderColor;
  .app-content {
    // 减去上下header和haderSpace
    min-height: calc(100vh - #{$headerHeight + $spacing});
    background-color: #fff;

    .content {
      padding: $spacing * 3;
    }

    &.full-screen {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 2000;
      bottom: 0;
      .content {
        height: calc(100% - 48px);
        overflow: auto;
        .inner-content {
          min-width: $contentMinWidth;
        }
      }
    }
  }
}
// 隐藏头部和左侧菜单样式调整
.hide-layout {
  padding-top: 0;
  margin: 0;
  .app-content {
    min-height: 100vh;
  }
}
</style>
<style lang="scss">

.router-view {
　　margin: 300px auto;
　　width: 100%;
　　height: 100%;
　　transition: all .5s cubic-bezier(.55,0,.1,1);
}
.slide-left-enter, .slide-right-leave-active {
　　opacity: 0;
　　-webkit-transform: translate(30px, 0);
　　transform: translate(30px, 0);
}
.slide-left-leave-active, .slide-right-enter {
　　opacity: 0;
　　-webkit-transform: translate(-30px, 0);
　　transform: translate(-30px, 0);
}
</style>
