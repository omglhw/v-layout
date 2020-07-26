<template>
  <header :class="$style['header-container']">
    <div :class="$style['header-content']">
      <div :class="$style['logo']">
        <img
          v-if="logoUrl"
          :src="logoUrl"
          :alt="userInfo && userInfo.tenantName"
        />

        <svg
          v-else
          :class="$style['icon']"
          aria-hidden="true"
        >
          <use xlink:href="#icon-logo"></use>
        </svg>
      </div>
      <div :class="$style['header-menu-list']">
        <ul>
          <li
            v-for="item in showNavs"
            :key="item.appCode"
            :class="{[$style['active']]: appCode === item.appCode}"
          >
            <a
              :href="item.url"
              :target="item.target"
              @click="handleClickA(item)"
            >{{item.appName}}</a>
          </li>
        </ul>
        <el-dropdown
          v-if="moreNavs.length > 0"
          :class="{[$style['is-open']]: moreMenuDropdownVisible,[$style['more-menu']]: true}"
          placement="top"
          @visible-change="moreMenuDropdownVisibleChange"
        >
          <span :class="$style['el-dropdown-link']">
            <span>更多导航</span> <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu
            slot="dropdown"
            class="more-menu-dropdown-menu"
          >
            <el-dropdown-item
              v-for="item in moreNavs"
              :key="item.appCode"
              :class="{'active': appCode === item.appCode}"
            >
              <a
                :href="item.url"
                :target="item.target"
              >{{item.appName}}</a>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div :class="$style['header-right-content']">
        <span
          :class="$style['user-info']"
          :title="userInfo && userInfo.username"
        >

          <el-dropdown
            :class="{[$style['is-open']]: userDropdownVisible}"
            placement="top"
            @visible-change="userDropdownVisibleChange"
            @command="handleCommand"
          >
            <span :class="$style['el-dropdown-link']">
              <span>{{userInfo && (userInfo.username || userInfo.userName)}}</span> <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu
              slot="dropdown"
              class="user-dropdown-menu text-center"
              style="min-width:140px"
            >
              <el-dropdown-item :title="userInfo && userInfo.tenantName">{{userInfo&&userInfo.tenantName|subString(8)}}{{`(${userInfo&&userInfo.tenantCode})`}}</el-dropdown-item>
              <el-dropdown-item v-if="showUnifiedPass"  command='unifiedPass' icon="iconfont-layout icon-user">通行证中心</el-dropdown-item>
              <!-- <el-dropdown-item icon="iconfont-layout icon-user">个人中心</el-dropdown-item>
              <el-dropdown-item icon="iconfont-layout icon-lock">修改密码</el-dropdown-item>
              <el-dropdown-item icon="iconfont-layout icon-feedback">意见反馈</el-dropdown-item> -->
              <el-dropdown-item
                divided
                command='logout'
                icon="iconfont-layout icon-quit"
                style="color:#FF5D5D"
              >退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

        </span>
        <span
          :class="$style['split-line-a']"
          class="split-line-a"
        ></span>
        <span
          :class="$style['online-service']"
          @click="onlineService()"
        ><i class="iconfont-layout icon-online-service"></i> 在线服务</span>
      </div>
    </div>
    <div :class="$style['header-spacing']"></div>
  </header>
</template>

<script>

import {
  getQueryStringFromHashOrSearch,
  try2JSON,
  subString,
} from '../../utils';
export default {
  name: 'LayoutHeader',
  filters: {
    subString: (value, length, suffix) => {
      if (!value) return '';
      value = value.toString();
      console.log(value, '234');
      // console.log(subStr, 'subString')
      return subString(value, length, suffix);
    },
  },
  props: {
    logo: {
      type: String,
      default: '',
    },
    topMenus: {
      type: Array,
    },
    user: {
      type: Object,
    },
    showUnifiedPass: {
      type: Boolean,
    }
  },
  data () {
    return {
      topNavs: this.topMenus || (this.$utils && this.$utils.topNavs),
      logoUrl: this.logo || (this.$utils && this.$utils.logoUrl),
      screenWidth: document.body.clientWidth,
      // 更多菜单
      moreMenuDropdownVisible: false,
      userDropdownVisible: false,
      appCode: this.$utils && this.$utils.appCode,
      userInfo: this.user || (this.$utils && this.$utils.userInfo),
    };
  },
  computed: {
    canViewMenu () {
      // 可以显示几个菜单 = 减去logo和右边content-right的宽及更多导航宽 除以 菜单和宽（88）
      const menuNum = parseInt((this.screenWidth - 600) / 88);
      if (menuNum < 0) {
        return 0;
      }
      return menuNum;
    },
    // 头部菜单 (显示部分)
    showNavs () {
      return Array.isArray(this.topNavs)
        ? this.topNavs.slice(0, this.canViewMenu)
        : [];
    },
    // 头部菜单 （更多导航下拉部分）
    moreNavs () {
      return Array.isArray(this.topNavs)
        ? this.topNavs.slice(this.canViewMenu, this.topNavs.length)
        : [];
    },
  },
  watch: {
    user: {
      deep: true,
      handler (newValue, oldValue) {
        this.userInfo = this.user;
      },
    },
  },
  // watch: {
  //   $route (to, from) {
  //     if (to.query._ac) {
  //       // 重置appcode
  //       this.appCode = to.query._ac;
  //     }
  //   },
  // },
  created () {
    this.appCode = getQueryStringFromHashOrSearch('_ac');

    if (!this.topMenus) {
      const topNavsString = localStorage.getItem('topNavs');
      const dataJson = try2JSON(topNavsString);

      if (dataJson) {
        this.topNavs = dataJson.topNavs;
        this.logoUrl = dataJson.logoUrl;
      }
      // 监听storage 变化
      window.addEventListener('setItem', (e) => {
        if (e.key === 'topNavs') {
          const topNavsString = localStorage.getItem('topNavs');
          const dataJson = try2JSON(topNavsString);
          if (dataJson) {
            this.topNavs = dataJson.topNavs;
            this.logoUrl = dataJson.logoUrl;
          }
        }
      });
      this.$eventBus.$on('userInfoChange', userInfo => {
        this.userInfo = userInfo;
      });
    }
    window.addEventListener('resize', () => {
      this.screenWidth = document.body.clientWidth;
    });
  },

  methods: {
    // 用户下拉 change事件
    userDropdownVisibleChange (visible) {
      this.userDropdownVisible = visible;
    },
    // 更多菜单下拉 change事件
    moreMenuDropdownVisibleChange (visible) {
      this.moreMenuDropdownVisible = visible;
    },
    handleCommand (command) {
      this.$emit('command', command);
    },
    // 服务在线
    onlineService () {
      if (this.$utils.toolUrls && this.$utils.toolUrls[this.$utils.appCode]) {
        window.open(this.$utils.toolUrls[this.$utils.appCode], '_blank');
      } else {
        console.warn('服务在线');
      }
    },
    handleClickA (item) {
      this.appCode = item.appCode;
      localStorage.setItem('ac', item.appCode);
    },
  },
};
</script>

<style scope lang="scss">
// 下拉菜单
.more-menu-dropdown-menu {
  top: 32px !important;
  li.active {
    background: linear-gradient(
      270deg,
      rgba(69, 183, 255, 1) 0%,
      rgba(54, 120, 255, 1) 100%
    );
    a {
      color: #fff;
    }
  }
}
</style>
<style lang="scss" module>
@import '../../assets/style/variables.scss';
@import '../../assets/style/mixin.scss';

/* // header 头部 */
.header-container {
  background-color: #fff;
  width: 100%;
  height: $headerHeight + $spacing;
  position: fixed;
  overflow: hidden;
  line-height: $headerHeight;
  left: 0;
  top: 0;
  z-index: 1002;
  .header-content {
    @include clearfix;
    height: $headerHeight;
    overflow: hidden;
    border-bottom: 1px solid #ebeef5;
  }
  .logo {
    width: $sideBarWidth;
    float: left;
    text-align: center;
    img {
      max-width: 182px;
      max-height: 55px;
    }
    .icon {
      width: 160px;
      height: 54px;
    }
  }

  /* // 菜单 列表 */
  .header-menu-list {
    @include clearfix;
    float: left;
    // safari浏览器bug
    display: flex;
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      float: left;

      li {
        float: left;
        height: $headerHeight;

        a {
          text-decoration: none;
          display: block;
          height: $headerHeight - 3;
          color: #333333;
          padding: 0 $spacing * 2;
        }

        &.active {
          background: linear-gradient(
            270deg,
            rgba(69, 183, 255, 1) 0%,
            rgba(54, 120, 255, 1) 100%
          );

          a {
            background: linear-gradient(
              180deg,
              #ffffff 0%,
              rgba(234, 242, 255, 1) 100%
            );
            color: $hoverColor;
          }
        }

        &:hover {
          a {
            color: $hoverColor;
          }
        }
      }
    }
    .more-menu {
      line-height: 14px;
      padding-top: 20px;
      margin-left: $spacing * 2;

      cursor: pointer;
      &:hover {
        color: $hoverColor;
      }
      i {
        transition: 0.2s transform;
      }
      &.is-open {
        i {
          transform: rotate(-180deg);
        }
        .el-dropdown-link {
          &:hover {
            color: $hoverColor;
          }
          color: $hoverColor;
        }
      }
    }
  }

  /* // 表头右侧 */
  .header-right-content {
    float: right;
    padding-right: 24px;
    width: 300px;

    .user-info {
      // line-hiehgt为55时影响了 el-dropdown显示的位置，故在此设置默认的line-height，用padding-top调整对齐
      line-height: $defaultFontsize;
      padding-top: 20px;
      .el-dropdown-link {
        line-height: 16px;
        cursor: pointer;
        &:hover {
          color: $hoverColor;
        }
        span {
          float: left;
          max-width: 160px;
          @include text-overflow;
          display: inline-block;
        }
        i {
          transition: 0.2s transform;
        }

        // // i {
        //   // transform: rotate(180deg);
        // }
      }
      .is-open {
        i {
          transform: rotate(180deg);
        }
        .el-dropdown-link {
          color: $hoverColor;
        }
      }

      float: right;
    }

    .online-service {
      float: right;
      cursor: pointer;
      color: #666666;
      &:hover {
        color: $hoverColor;
      }
      i {
        top: 2px;
        position: relative;
      }
    }

    .split-line-a {
      float: right;
      margin: 20px 15px;
    }
  }
  .header-spacing {
    height: $spacing;
    background: rgba(240, 242, 245, 1);
  }
}
</style>
