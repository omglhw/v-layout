<!--
 * @Descripttion:
 * @version:
 * @Author: lihw02
 * @Date: 2019-04-25 09:05:56
 * @LastEditors: lihw02
 * @LastEditTime: 2020-05-08 19:25:18
 -->
<template>
  <div class="about">
    <layout>
      <div>
    <el-select
      v-model="value"
      placeholder="请选择"
    >
      <el-option-group
        v-for="group in options"
        :key="group.label"
        :label="group.label"
      >
        <el-option
          v-for="item in group.options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-option-group>
    </el-select>
    <h2>过滤器</h2>

    <h3>截断字符，超出补后缀</h3>
    <p>
      {{lenghtString | subString}}
    </p>
    <p>
      {{lenghtString | subString(23,'???')}}
      <pre>
        <span v-pre>
       {{lenghtString | subString(23,'???')}}
      </span>
      </pre>
    </p>
    <h3>格式化手机号码 星星符号替换</h3>

    <p>
      {{'15011112222' | starPhone}}
      <pre>
        <span v-pre>
       {{'15011112222' | starPhone}}
      </span>
      </pre>
    </p>
    </div>
    </layout>
  </div>
</template>
<script>
import { Layout } from '../../index';
export default {
  components: {
    Layout,
  },
  data () {
    return {
      options: [
        {
          label: '热门城市',
          options: [
            {
              value: 'Shanghai',
              label: '上海',
            },
            {
              value: 'Beijing',
              label: '北京',
            },
          ],
        },
        {
          label: '城市名',
          options: [
            {
              value: 'Chengdu',
              label: '成都',
            },
            {
              value: 'Shenzhen',
              label: '深圳',
            },
            {
              value: 'Guangzhou',
              label: '广州',
            },
            {
              value: 'Dalian',
              label: '大连',
            },
          ],
        },
      ],
      value: '',
      lenghtString:
        '深圳公司文字超长文,字超长文字超长文字超长文字超长文字超长文字超长文字超长文字超长文',
    };
  },
};
</script>
