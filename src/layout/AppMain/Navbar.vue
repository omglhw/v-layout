<template>
  <div :class="$style['navbar']">
    <slot name="breadcrumb">
       <div :class="$style['breadcrumb']">
        <div
          v-if="showOnlyOneTitle"
          class="pull-left"
        >
          {{title}}
        </div>
        <div
          v-else
          class="pull-left"
        >
          <div :class="$style['icon-left']">
            <i
              class="iconfont-layout icon-left-o"
              @click="goback()"
            ></i>
          </div>
          <el-breadcrumb
            :class="$style['app-breadcrumb']"
            separator="/"
          >
            <transition-group name="breadcrumb">
              <el-breadcrumb-item
                v-for="(item,index) in levelList"
                :key="item.path"
              >
                <span
                  v-if="item.redirect==='noredirect'||index==levelList.length-1"
                  :class="$style['no-redirect']"
                >{{
                  item.meta.title }}</span>
                <a
                  v-else
                  :class="$style['breadcrumb-link']"
                  @click.prevent="handleLink(item)"
                >{{ item.meta.title }}</a>
              </el-breadcrumb-item>
            </transition-group>
          </el-breadcrumb>
        </div>
        <div
          v-if="!!leftComponent"
          :class="$style['left-wrapper']"
        >
          <div :is="leftComponent" />
        </div>
      </div>
      <div :class="$style['navbar-tool']">
        <el-tooltip
          v-if="showFullScreen"
          :content="!isFullScreen?'最大化':'还原'"
          placement="left"
        >
          <i
            class="iconfont-layout"
            :class="{[$style['full-screen']]: true, 'icon-full-screen': !isFullScreen, 'icon-exit-full-screen': isFullScreen}"
            @click="fullScreen"
          />
        </el-tooltip>
        <div
          v-if="!!toolComponent"
          :class="$style['tool-wrapper']"
        >
          <div :is="toolComponent" />
        </div>
      </div>
    </slot>
</div>
</template>

<script>
export default {
  name: 'Navbar',
  props: {
    showFullScreen: {
      type: Boolean,
      default: true,
    },
  },
  data () {
    return {
      levelList: null,
      title: '',
      // 是否只显示一个标题
      showOnlyOneTitle: false,
      // 是否全屏
      isFullScreen: false,
      // 右侧自定义组件
      toolComponent: null,
      // 左侧自定义组件
      leftComponent: null,
    };
  },
  watch: {
    $route () {
      this.initNav();
    },
  },
  created () {
    this.initNav();
  },
  methods: {
    initNav () {
      const { meta } = this.$route;
      if (meta && meta.showOnlyOneTitle === false) {
        this.showOnlyOneTitle = false;
        this.getBreadcrumb();
      } else {
        this.showOnlyOneTitle = true;
        if (meta && meta.title) {
          this.title = meta.title;
        }
        //  else {
        //   this.title = this.$route.name;
        // }
      }
      // 右侧自定义组件
      if (meta && meta.toolComponent) {
        this.toolComponent = meta.toolComponent;
      }
      // 左侧自定义组件
      if (meta && meta.leftComponent) {
        this.leftComponent = meta.leftComponent;
      }
    },
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.meta);

      this.levelList = matched.filter(
        item => item.meta && item.meta.title && item.meta.breadcrumb !== false
      );
    },
    goback () {
      if (this.levelList.length > 0) {
        this.$router.push(this.levelList[0].path);
      } else {
        this.$router.go(-1);
      }
    },
    handleLink (item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(path);
    },
    fullScreen () {
      this.isFullScreen = !this.isFullScreen;
      this.$emit('screenChange', this.isFullScreen);
    },
  },
};
</script>

<style lang="scss" module>
@import '../../assets/style/variables.scss';
@import '../../assets/style/mixin.scss';

.navbar {
  @include clearfix;
  line-height: 44px;
  padding: 2px $spacing * 3;
  background: rgba(255, 255, 255, 0);

  border-bottom: 1px solid $borderColor;
  .breadcrumb {
    float: left;
    .icon-left {
      float: left;
      margin-right: $spacing;

      i {
        font-size: 22px;
        cursor: pointer;
        &:hover {
          color: $colorPrimary;
        }
      }
    }
    .app-breadcrumb {
      float: left;
      line-height: inherit;
      .breadcrumb-link {
        color: $secondaryTextColor;
        font-weight: normal;
      }
      .no-redirect {
        color: $primaryTextColor;
      }
    }
    .left-wrapper {
      float: left;
      margin-left: $spacing;
    }
  }
  .navbar-tool {
    float: right;

    .tool-wrapper {
      float: right;
      margin-right: $spacing;
      height: inherit;
      overflow: hidden;
    }
    .full-screen {
      color: #dddddd;
      float: right;
      cursor: pointer;
      font-size: 12px;
      &:hover {
        color: $gray;
      }
    }
  }
}
</style>
