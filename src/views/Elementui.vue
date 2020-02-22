<template>
  <div class="text-left">
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
      <el-button>最</el-button>
    </el-row>
    <space :span="2" />
    <el-checkbox>备选项</el-checkbox>
    <el-checkbox v-model="checkbox">备选项</el-checkbox>
    <el-checkbox disabled>备选项</el-checkbox>

    <el-checkbox
      v-model="checkbox"
      disabled
    >
      备选项
    </el-checkbox>
    <el-radio
      v-model="radio"
      label="1"
    >
      备选项
    </el-radio>
    <el-radio
      v-model="radio"
      label="2"
    >
      备选项
    </el-radio>
    <el-radio
      v-model="radio"
      disabled
      label="1"
    >
      备选项
    </el-radio>
    <space :span="2" />
    <el-row>
      <el-button plain>朴素按钮</el-button>
      <el-button
        type="primary"
        plain
      >
        主要按钮
      </el-button>
      <el-button
        type="success"
        plain
      >
        成功按钮
      </el-button>
      <el-button
        type="info"
        plain
      >
        信息按钮
      </el-button>
      <el-button
        type="warning"
        plain
      >
        警告按钮
      </el-button>
      <el-button
        type="danger"
        plain
      >
        危险按钮
      </el-button>
      <el-button plain>小</el-button>
    </el-row>
    <space :span="2" />
    <el-row>
      <el-button round>圆角按钮</el-button>
      <el-button
        type="primary"
        round
      >
        主要按钮
      </el-button>
      <el-button
        type="success"
        round
      >
        成功按钮
      </el-button>
      <el-button
        type="info"
        round
      >
        信息按钮
      </el-button>
      <el-button
        type="warning"
        round
      >
        警告按钮
      </el-button>
      <el-button
        type="danger"
        round
      >
        危险按钮
      </el-button>
      <el-button round>宽</el-button>
    </el-row>
    <space :span="2" />
    <el-row>
      <el-button
        icon="el-icon-search"
        circle
      ></el-button>
      <el-button
        type="primary"
        icon="el-icon-edit"
        circle
      ></el-button>
      <el-button
        type="success"
        icon="el-icon-check"
        circle
      ></el-button>
      <el-button
        type="info"
        icon="el-icon-message"
        circle
      ></el-button>
      <el-button
        type="warning"
        icon="el-icon-star-off"
        circle
      ></el-button>
      <el-button
        type="danger"
        icon="el-icon-delete"
        circle
      ></el-button>
    </el-row>
    <space :span="2" />
    <el-row>
      <el-button disabled>默认按钮</el-button>
      <el-button
        type="primary"
        disabled
      >
        主要按钮
      </el-button>
      <el-button
        type="success"
        disabled
      >
        成功按钮
      </el-button>
      <el-button
        type="info"
        disabled
      >
        信息按钮
      </el-button>
      <el-button
        type="warning"
        disabled
      >
        警告按钮
      </el-button>
      <el-button
        type="danger"
        disabled
      >
        危险按钮
      </el-button>
    </el-row>
    <space :span="2" />
    <el-row>
      <el-button
        plain
        disabled
      >
        朴素按钮
      </el-button>
      <el-button
        type="primary"
        plain
        disabled
      >
        主要按钮
      </el-button>
      <el-button
        type="success"
        plain
        disabled
      >
        成功按钮
      </el-button>
      <el-button
        type="info"
        plain
        disabled
      >
        信息按钮
      </el-button>
      <el-button
        type="warning"
        plain
        disabled
      >
        警告按钮
      </el-button>
      <el-button
        type="danger"
        plain
        disabled
      >
        危险按钮
      </el-button>
    </el-row>
    <div></div>
    <space height="18px" />
    <el-button
      :plain="true"
      @click="open5"
    >
      消息
    </el-button>
    <el-button
      :plain="true"
      @click="open6"
    >
      成功
    </el-button>
    <el-button
      :plain="true"
      @click="open7"
    >
      警告
    </el-button>
    <el-button
      :plain="true"
      @click="open8"
    >
      错误
    </el-button>
    <space :span="2" />

    <el-button
      type="text"
      @click="openMessageBox"
    >
      点击打开 Message Box
    </el-button>
    <space :span="2" />
    <el-row>
      <el-col>
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="date"
            label="日期"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180"
          >
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址"
          >
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <space :span="2" />
    <el-button
      type="text"
      @click="dialogVisible = true; isCenter = false;"
    >
      点击打开 Dialog
    </el-button>
    <el-button
      type="text"
      @click="dialogVisible = true; isCenter = true"
    >
      点击打开居中 Dialog
    </el-button>
    <el-dialog
      title="提示"
      :center="isCenter"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>这是一段信息</span>
      <span
        slot="footer"
        class="dialog-footer"
      >

        <el-button
          type="primary"
          @click="dialogVisible = false"
        >确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <space />
    <el-button
      type="text"
      @click="dialogTableVisible = true"
    >
      打开嵌套表格的 Dialog
    </el-button>
    <el-dialog
      title="收货地址"
      :visible.sync="dialogTableVisible"
      class="table-no-padding"
    >
      <el-table
        :data="gridData"
        border
      >
        <el-table-column
          property="date"
          label="日期"
          width="150"
        ></el-table-column>
        <el-table-column
          property="name"
          label="姓名"
          width="200"
        ></el-table-column>
        <el-table-column
          property="address"
          label="地址"
        ></el-table-column>
      </el-table>
    </el-dialog>

    <space />
    <el-button
      type="text"
      @click="dialogFormVisible = true"
    >
      打开嵌套表单的 Dialog
    </el-button>

    <el-dialog
      center
      title="收货地址"
      :visible.sync="dialogFormVisible"
    >
      <el-form :model="form">
        <el-form-item
          label="活动名称"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="活动区域"
          :label-width="formLabelWidth"
        >
          <el-select
            v-model="form.region"
            placeholder="请选择活动区域"
          >
            <el-option
              label="区域一"
              value="shanghai"
            ></el-option>
            <el-option
              label="区域二"
              value="beijing"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="dialogFormVisible = false"
        >
          确 定
        </el-button>
        <el-button @click="dialogFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
    <space :span="2" />
    <el-select
      v-model="selectValue"
      placeholder="请选择"
      filterable
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
    <el-select-check
      v-model="selectValues"
      placeholder="请选择"
      filterable
      multiple
      :multiple-limit="8"
    >
      <!-- <template v-slot:selected="selectedSlotProps">

          {{selectedSlotProps.selectedItem.currentLabel}}

      </template> -->
      <el-option-check
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option-check>
    </el-select-check>

    <span @click="$router.push({path: '/about'})">go to about</span>
    <br />
    <el-select
      v-model="value"
      placeholder="请选择"
    >
      <el-option-group
        v-for="group in groupOptions"
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
    <el-button v-auth="'fdsa'">权限</el-button>
    <el-button v-if="hasAuth">权限</el-button>
    <br />
    <p>emptyPlaceholder:{{432 | emptyPlaceholder()}}{{ null | emptyPlaceholder('aa')}} {{ null | emptyPlaceholder()}}</p>
    <br />
    <el-button
      type="danger"
      plain
      @click="handleClickUpdateLeftMenu"
    >
      切换左侧菜单
    </el-button>
  </div>
</template>

<script>
import ElSelectCheck from '@/components/ElCheckSelect/select';
import ElOptionCheck from '@/components/ElCheckSelect/option';
export default {
  components: { ElSelectCheck, ElOptionCheck },
  data () {
    return {
      dialogVisible: false,
      isCenter: false,
      radio: '1',
      checkbox: true,
      value: '',
      gridData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
      ],
      options: [
        {
          value: '选项1',
          label: '黄金糕',
        },
        {
          value: '选项2',
          label: '双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶双皮奶',
        },
        {
          value: '选项3',
          label: '蚵仔煎',
        },
        {
          value: '选项4',
          label: '龙须面',
        },
        {
          value: '选项5',
          label: '北京烤鸭',
        },
      ],
      selectValue: '',
      selectValues: [],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
      },
      formLabelWidth: '120px',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
        },
      ],
      groupOptions: [
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
    };
  },
  computed: {
    hasAuth () {
      // 客服 质检 验房
      console.log(this.$utils, '32434');
      let auth = false;
      this.$utils.hasAuth('MobileCheckRoom.ReportStatisticsMenu.manage');
      switch (this.$utils.appCode) {
        case 'CustomerService':
          auth = this.$utils.hasAuth(
            'CustomerService.ReportStatisticsMenu.manage'
          );
          break;
        case 'MobileCheckRoom':
          console.log('MobileCheckRoom323432');
          auth = this.$utils.hasAuth('MobileCheckRoom.ReportStatistics.manage');
          break;
        case 'MobileCheckQuality':
          auth = this.$utils.hasAuth(
            'MobileCheckQuality.ReportStatistics.manage'
          );
          break;
      }
      return auth;
    },
  },
  created () {},
  methods: {
    open5 () {
      this.$message({
        showClose: true,
        message: '这是一条消息提示',
      });
    },

    open6 () {
      this.$message({
        showClose: true,
        message: '恭喜你，这是一条成功消息',
        type: 'success',
      });
    },

    open7 () {
      this.$message({
        showClose: true,
        message: '警告哦，这是一条警告消息',
        type: 'warning',
      });
    },

    open8 () {
      this.$message({
        showClose: true,
        message: '错了哦，这是一条错误消息',
        type: 'error',
      });
    },
    openMessageBox () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!',
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          });
        });
    },
    handleClickUpdateLeftMenu () {
      this.$utils.appCode = 'ManagementCenter';
      this.$eventBus.$emit('updateLeftMenu');
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
