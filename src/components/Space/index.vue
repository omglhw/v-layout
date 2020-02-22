<template>
  <div
    :class="$style['space']"
    :style="style"
  >
  </div>
</template>

<script>
export default {
  name: 'Space',
  props: {
    height: {
      type: String,
      default: '',
    },
    span: {
      type: Number,
      default: 1,
    },
  },

  computed: {
    style () {
      const style = {};

      // 8的 倍数
      style.height = 8 * this.span + 'px';
      if (this.height) {
        if (this.height.indexOf('px') >= 0) {
          style.height = this.height;
        } else {
          style.height = this.height + 'px';
        }
      }

      return style;
    },
  },
};
</script>

<style lang="scss" module>
.space {
  width: 100%;
}
</style>
