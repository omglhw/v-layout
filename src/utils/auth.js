// import {} from "./index.js"
import { removeUrlAuthParameter } from './index';

// token和user-info放到localStorage下为了兼容多标签

const TokenKey = 'token';

export function getToken () {
  return localStorage.getItem(TokenKey);
}

export function setToken (token) {
  return localStorage.setItem(TokenKey, token);
}

export function removeToken () {
  return localStorage.removeItem(TokenKey);
}

const UserKey = 'user-info';

export function getUser () {
  let json;
  try {
    json = JSON.parse(localStorage.getItem(UserKey));
  } catch (e) {
    json = {};
  }
  return json;
}

export function setUser (data) {
  return localStorage.setItem(UserKey, JSON.stringify(data));
}

export function removeUser () {
  return localStorage.removeItem(UserKey);
}

const TicketKey = 'ticket-info';

export function getTicket () {
  let json;
  try {
    json = JSON.parse(sessionStorage.getItem(TicketKey));
  } catch (e) {
    json = {};
  }
  return json;
}

export function setTicket (data) {
  return sessionStorage.setItem(TicketKey, data);
}

export function removeTicket () {
  return sessionStorage.removeItem(TicketKey);
}

/**
 * 退出登录
 */
export function logout (baseURL) {
  removeUser();
  removeToken();
  if (baseURL) {
    window.location.href = baseURL + '/bms/auth/logout';
  }
}

// 防止多次跳转
window.lockNum = localStorage.getItem('lockNum') || 0;
window.lockTime = localStorage.getItem('lockTime') || new Date().getTime();

/**
 * 登录
 */
export function login (loginURL) {
  if (window.lockNum < 10) {
    // 两秒内再请求时lockNum加1
    if (new Date().getTime() - window.lockTime < 2000) {
      window.lockNum++;
      localStorage.setItem('lockNum', window.lockNum);
      localStorage.setItem('lockTime', new Date().getTime());
    }
    removeUser();
    removeToken();
    if (loginURL) {
      let url = window.location.href;
      url = removeUrlAuthParameter(url);
      window.location.href = loginURL + '?returnUrl=' + encodeURIComponent(url);
    }
  } else {
    alert('请求次数过多，请稍后再试！');
    localStorage.setItem('lockNum', '');
    localStorage.setItem('lockTime', '');
  }
}
