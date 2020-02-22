<template>
  <div>
    <el-button
      :plain="true"
      size="mini"
      @click="click"
    >
      工具按钮2
    </el-button>
    <el-button
      :plain="true"
      size="mini"
      @click="click"
    >
      工具按钮
    </el-button>
</div>
</template>

<script>
export default {
  methods: {
    click () {
      console.log('tool button click!');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
