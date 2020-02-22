import Vue from 'vue';
/**
 * 从permissionList中获取authString对应的值
 * @param {string} authString 'CustomerService.Appointment.view'
 * @param {object} permissionList {
 *  CustomerService: {
 *     Appointment: {
 *         view: '0x0000000000000000000000000000000000000000000000000001000000000000'
 *     }
 *   }
 * }
 */
const tryGetListPrototypeValue = (authString, permissionList) => {
  if (typeof authString === 'string' && permissionList) {
    const authMap = authString.split('.');
    let funcAuth = permissionList;
    // 获取传入的
    authMap.forEach((item) => {
      if (funcAuth && funcAuth[item]) {
        funcAuth = funcAuth[item];
      }
    });
    return funcAuth;
  } else {
    return '';
  }
};

/**
 * 从permissionData中获取authString对应的值
 * @param {string} authString 'CustomerService.Appointment.view'
 * @param {object} permissionData {
 *  CustomerService: '0x00000000000000000000007f7ff8001fffffffffffffffffff5ff7f7ffaff77f'
 * }
 */
const tryGetDatePrototypeValue = (authString, permissionData) => {
  if (typeof authString === 'string' && permissionData) {
    const authMap = authString.split('.');
    let funcAuth = permissionData;
    // 获取传入的
    authMap.forEach((item) => {
      if (funcAuth && funcAuth[item]) {
        funcAuth = funcAuth[item];
      }
    });
    return funcAuth;
  } else {
    return '';
  }
};

/**
 *  判断用户是否有权限
 * 计算方式：
 * 1.取出功能权限值的非零位数字 A
 * 2.取出用户权限中与上一步同一位置的娄字B
 * 3.将A,B转成十六进制，A和B进行与位运算得到Ｃ
 * 4.再将C和Ａ进行对比，如果一样帽有权限
 * @param {string} 功能权限
 * @param {string} 用户权限
 */
export const checkAuth = function (authString) {
  if (!authString || typeof authString !== 'string') {
    return false;
  }
  const $utils = Vue.prototype.$utils;
  if (!Vue.prototype.$utils) {
    return false;
  }
  // 功能权限表
  const permissionList = $utils.permissionList;
  // 用户权限表
  const permissionData = $utils.userInfo ? $utils.userInfo.permissionData : '';

  if (permissionList &&
    typeof permissionList === 'object' &&
    Object.keys(permissionList).length > 0 &&
    permissionData
  ) {
    const funcAuth = tryGetListPrototypeValue(authString, permissionList);
    const userAuth = tryGetDatePrototypeValue(authString, permissionData);

    if (funcAuth && typeof funcAuth == 'string' && userAuth) {
      var notZeroIndex = -1;
      var noZeroNum = -1;
      // 些时funcAuth应为１６进度
      funcAuth.split('').forEach((num, index) => {
        if (num > 0) {
          notZeroIndex = index;
          noZeroNum = parseInt(num, 10);
        }
      });
      if (notZeroIndex >= 0) {
        var userAuthNum = userAuth[notZeroIndex];
        var andNum = parseInt(userAuthNum, 16) & parseInt(noZeroNum);

        if (andNum === noZeroNum) {
          return true;
        }
      }
    }
  }

  return false;
};

// 测试权限

/**
 *  判断用户是否有权限
 * 计算方式：
 * 1.取出功能权限值的非零位数字 A
 * 2.取出用户权限中与上一步同一位置的数字B
 * 3.将A,B转成十六进制，A和B进行与位运算得到Ｃ
 * 4.再将C和Ａ进行对比，如果一样帽有权限
 * @param {string} 功能权限
 * @param {string} 用户权限
 */
function Auth (A, B) {
  var notZeroIndex = -1;
  var noZeroNum = -1;
  A.split('').forEach((num, index) => {
    if (num > 0) {
      notZeroIndex = index;
      noZeroNum = parseInt(num, 10);
    }
  });
  if (notZeroIndex >= 0) {
    var userAuthNum = B[notZeroIndex];
    var andNum = parseInt(userAuthNum, 16) & parseInt(noZeroNum);

    if (andNum === noZeroNum) {
      return true;
    }
  }
  return false;
}
