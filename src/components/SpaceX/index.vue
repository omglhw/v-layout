<template>
  <span
    :class="$style['space']"
    :style="style"
  >
  </span>
</template>

<script>
export default {
  name: 'SpaceX',
  props: {
    width: {
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
      style.marginLeft = 8 * this.span + 'px';
      if (this.width) {
        if (this.width.indexOf('px') >= 0) {
          style.marginLeft = this.width;
        } else {
          style.marginLeft = this.width + 'px';
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
