<template>
  <li
    v-show="visible"
    class="el-select-dropdown__item"
    :class="{
      [$style['selected']]: itemSelected,
      'is-disabled': disabled || groupDisabled || limitReached,
      'hover': hover
    }"
    @mouseenter="hoverItem"
    @click.stop="selectOptionClick"
  >
    <span>
      <!--  -->
      <el-checkbox
        :class="$style['operation']"
        :value='itemSelected'
        @change="clickCheck"
      />
      </el-checkbox>
      <slot>
        <span>{{ currentLabel }}</span>
      </slot>
    </span>
  </li>
</template>

<script type="text/babel">
import ElCheckbox from 'element-ui/packages/checkbox';
import Emitter from 'element-ui/src/mixins/emitter';
import { getValueByPath, escapeRegexpString } from 'element-ui/src/utils/util';

export default {
  name: 'ElCheckOption',
  components: {
    ElCheckbox,
  },
  mixins: [Emitter],

  componentName: 'ElCheckOption',

  inject: ['select'],
  props: {
    value: {
      required: true,
    },
    label: [String, Number],
    created: Boolean,
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data () {
    return {
      index: -1,
      groupDisabled: false,
      visible: true,
      hitState: false,
      hover: false,
    };
  },

  computed: {
    isObject () {
      return (
        Object.prototype.toString.call(this.value).toLowerCase() ===
        '[object object]'
      );
    },

    currentLabel () {
      return this.label || (this.isObject ? '' : this.value);
    },

    currentValue () {
      return this.value || this.label || '';
    },

    itemSelected () {
      if (!this.select.multiple) {
        return this.isEqual(this.value, this.select.value);
      } else {
        return this.contains(this.select.value, this.value);
      }
    },

    limitReached () {
      if (this.select.multiple) {
        return (
          !this.itemSelected &&
          (this.select.value || []).length >= this.select.multipleLimit &&
          this.select.multipleLimit > 0
        );
      } else {
        return false;
      }
    },
  },

  watch: {
    currentLabel () {
      if (!this.created && !this.select.remote) {
        this.dispatch('ElCheckSelect', 'setSelected');
      }
    },
    value (val, oldVal) {
      const { remote, valueKey } = this.select;
      if (!this.created && !remote) {
        if (
          valueKey &&
          typeof val === 'object' &&
          typeof oldVal === 'object' &&
          val[valueKey] === oldVal[valueKey]
        ) {
          return;
        }
        this.dispatch('ElCheckSelect', 'setSelected');
      }
    },
  },

  created () {
    this.select.options.push(this);
    this.select.cachedOptions.push(this);
    this.select.optionsCount++;
    this.select.filteredOptionsCount++;

    this.$on('queryChange', this.queryChange);
    this.$on('handleGroupDisabled', this.handleGroupDisabled);
  },

  beforeDestroy () {
    this.select.onOptionDestroy(this.select.options.indexOf(this));
  },

  methods: {
    isEqual (a, b) {
      if (!this.isObject) {
        return a === b;
      } else {
        const valueKey = this.select.valueKey;
        return getValueByPath(a, valueKey) === getValueByPath(b, valueKey);
      }
    },

    contains (arr = [], target) {
      if (!this.isObject) {
        return arr.indexOf(target) > -1;
      } else {
        const valueKey = this.select.valueKey;
        return arr.some(item => {
          return (
            getValueByPath(item, valueKey) === getValueByPath(target, valueKey)
          );
        });
      }
    },

    handleGroupDisabled (val) {
      this.groupDisabled = val;
    },

    hoverItem () {
      if (!this.disabled && !this.groupDisabled) {
        this.select.hoverIndex = this.select.options.indexOf(this);
      }
    },

    selectOptionClick () {
      if (this.disabled !== true && this.groupDisabled !== true) {
        this.dispatch('ElCheckSelect', 'handleOptionClick', [this, true]);
      }
    },

    clickCheck () {
      if (this.disabled !== true && this.groupDisabled !== true) {
        this.dispatch('ElCheckSelect', 'handleOptionClick', [this, true]);
      }
    },

    queryChange (query) {
      this.visible =
        new RegExp(escapeRegexpString(query), 'i').test(this.currentLabel) ||
        this.created;
      if (!this.visible) {
        this.select.filteredOptionsCount--;
      }
    },
  },
};
</script>
<style lang="scss" module>
.operation {
  margin-right: 8px;
}
.selected {
  color: #666;
  background-color: #ffffff;
}
</style>
