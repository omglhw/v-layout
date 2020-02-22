<template>
  <ul
    v-show="visible"
    class="el-select-group__wrap"
  >
    <li class="el-select-group__title">{{ label }}</li>
    <li>
      <ul class="el-select-group">
        <slot></slot>
      </ul>
    </li>
  </ul>
</template>

<script type="text/babel">
import Emitter from 'element-ui/src/mixins/emitter';

export default {
  name: 'ElCheckOptionGroup',
  mixins: [Emitter],

  componentName: 'ElCheckOptionGroup',

  props: {
    label: String,
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data () {
    return {
      visible: true,
    };
  },

  watch: {
    disabled (val) {
      this.broadcast('ElCheckOption', 'handleGroupDisabled', val);
    },
  },

  created () {
    this.$on('queryChange', this.queryChange);
  },

  mounted () {
    if (this.disabled) {
      this.broadcast('ElCheckOption', 'handleGroupDisabled', this.disabled);
    }
  },

  methods: {
    queryChange () {
      this.visible =
        this.$children &&
        Array.isArray(this.$children) &&
        this.$children.some(option => option.visible === true);
    },
  },
};
</script>
