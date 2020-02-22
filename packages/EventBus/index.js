import EventBus from './eventBus.js';

export default {
  nonComponent: true,
  install (Vue, options) {
    Vue.prototype.$eventBus = new EventBus(Vue);
    Vue.mixin({

      beforeDestroy () {
        this.$eventBus.$offVmEvent(this._uid); // 拦截beforeDestroy钩子自动销毁自身所有订阅的事件
      },
    });
  }
};
