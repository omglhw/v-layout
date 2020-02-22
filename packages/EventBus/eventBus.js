/**
 * 了解更多
 * https://cn.vuejs.org/v2/guide/migration.html#dispatch-%E5%92%8C-broadcast-%E6%9B%BF%E6%8D%A2
 * 对event bus封装
 *  https://zhuanlan.zhihu.com/p/39537979?utm_source=wechat_session&utm_medium=social&utm_oi=560576136317427712
 */

class EventBus {
  constructor (vue) {
    if (!this.handles) {
      Object.defineProperty(this, 'handles', {
        value: {},
        enumerable: false
      });
    }
    this.Vue = vue;
    this.eventMapUid = {}; // _uid和EventName的映射
  }
  setEventMapUid (uid, eventName) {
    if (!this.eventMapUid[uid]) this.eventMapUid[uid] = [];
    this.eventMapUid[uid].push(eventName); // 把每个_uid订阅的事件名字push到各自uid所属的数组里
  }
  $on (eventName, callback, vm) { // vm是在组件内部使用时组件当前的this用于取_uid
    if (!this.handles[eventName]) this.handles[eventName] = [];
    this.handles[eventName].push(callback);
    if (vm instanceof this.Vue) this.setEventMapUid(vm._uid, eventName);
  }
  $emit () {
    // console.log('EventBus emit eventName===', eventName)
    let args = [...arguments];
    let eventName = args[0];
    let params = args.slice(1);
    if (this.handles[eventName]) {
      let len = this.handles[eventName].length;
      for (let i = 0; i < len; i++) {
        this.handles[eventName][i](...params);
      }
    }
  }
  $offVmEvent (uid) {
    let currentEvents = this.eventMapUid[uid] || [];
    currentEvents.forEach(event => {
      this.$off(event);
    });
  }
  $off (eventName) {
    delete this.handles[eventName];
  }
}

export default EventBus;
