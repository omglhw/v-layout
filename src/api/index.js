/*
 * @Descripttion:
 * @version:
 * @Author: lihw02
 * @Date: 2019-04-25 09:05:56
 * @LastEditors: lihw02
 * @LastEditTime: 2020-07-21 16:50:14
 */
export default {
  /**
   * 生成一份当前系统中可用权限的权限点与权限校验值映射关系表
   */
  'generatePermissionList': '/m/common/generate-permission-list',
  /**
   * 根据拿到的 ticket 向单点登录中心 Passport 校验 ticket 的合法性，并获取对应的登录用户数据
   * ticket 是 string 单点登录中心下发的用户登录凭证ticket
   * sid 是 string 单点登录中心下发的sid
   * o 是 string 单点登录中心返回的租户号
   */
  'checkTicket': '/m/common/check-ticket',
  /**
   * 该接口将会返回管理中心顶部导航栏菜单相关的链接、名称等关键数据
   */
  'topNavs': '/m/common/top-navs',
  /**
   * 该接口将会返回管理中心左侧应用菜单相关的链接、名称等关键数据
   */
  'leftMenus': '/m/common/left-menus',
  /**
   * 该接口将会返回管理中心在线咨询工具的相关链接数据
   */
  'toolUrls': '/m/common/tool-urls',
  /**
   * 获取logo
   * _ac: string 如：ManagementCenter
   * _smp: string 如：ManagementCenter.Applicationauth
   */
  'getLogo': '/bms/Organization/layout/get-logo',
  // 获取配置 c_config 表
  'getCommonConfig': '/m/common/get-common-config',
  // 获取配置 t_config 表
  'getConfigParam': '/m/Organization/pub/get-config-param',
};
