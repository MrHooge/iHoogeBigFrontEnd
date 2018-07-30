<template>
  <div class="backend">

    <!--  代理给客户充值记录 -->
    <div class="search">
      <el-input v-model="input1"
                placeholder="请输入会员名进行查询"
                style="width:60%;"></el-input>
      <el-button type="primary"
                 icon="el-icon-search"
                 @click="search">搜索</el-button>
    </div>
    <div class="warning">
      <i class="el-icon-star-on"></i>
      <span>支持当前页数据模糊搜索,输入会员名全称进行精确查找</span>
    </div>
    <el-table :data="memberfilter"
              border
              style="width: 100%;">
      <el-table-column prop="account"
                       label="会员名"
                       align="center">
      </el-table-column>
      <el-table-column prop="username"
                       label="会员昵称"
                       align="center">
      </el-table-column>
      <el-table-column prop="amount"
                       label="金额"
                       align="center">
      </el-table-column>

      <el-table-column align="center"
                       label="授信额度">
        <template slot-scope="scope">
          <div slot="reference"
               class="name-wrapper">
            {{ scope.row.creditLimit }}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center"
                       prop="ableCreditBalance"
                       label="可用授信额度">

      </el-table-column>
      <el-table-column align="center"
                       prop="freezeCreditBalance"
                       label="冻结授信额度">

      </el-table-column>

      <el-table-column prop="createTime"
                       align="center"
                       label="时间">
      </el-table-column>

      <el-table-column align="center"
                       prop="agentAccount"
                       label="操作人">
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- <div class="page">
            <el-pagination
                background
                :page-size='pages'
                layout="prev, pager, next"
                @current-change="currentPage"
                :total="total">
            </el-pagination>
        </div> -->
  </div>
</template>

<script>
import { getAgentChargeLine } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'

export default {
  data() {
    return {
      input1: "",
      total: 0, //分页数
      pages: 20,
      dialogVisible: false, //控制弹窗隐藏
      input1: "",
      tableData: [] //表格数据
    };
  },
  created() {
    this.getData();
  },
  // 按照会员名称进行筛选
  computed: {
    memberfilter: function () {
      return this.tableData.filter((name) => {
        return name.account.match(this.input1)
      })
    }
  },
  methods: {
    search() {
      // console.log(this.input1);
      this.getData(this.input1);
    },
    // 点击授信额度弹窗
    layer() {
      console.log(1);
    },

    // 调接口数据、
    getData(name) {
      let obj = {
        account: name,
        loginAccount: getCookies('name')
      };
      getAgentChargeLine(obj).then(res => {
        console.log(res)
        if (res.status = 200) {
          this.tableData = res.data.data;
        }
      })
    },

    // getData(curr, name) {
    //   let obj = { page: curr, pageSize: 20, account: name ,loginAccount:localStorage.getItem('account')};
    //   this.$http
    //     .get(api.pay +"/xxPay/getAgentChargeLine", {
    //       params: obj
    //     })
    //     .then(res => {
    //       if ((res.status = 200)) {
    //         // console.log(res.data.data)
    //         this.total = res.data.totalCount;
    //         this.tableData = res.data.data;
    //       }
    //     });
    // },
    // 获取当前的点击页码
    currentPage(val) {
      this.getData(val);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.backend {
  padding: 7px;
  width: 99.5%;
  .search {
    padding: 10px 0;
  }
  .warning {
    color: #e6a23c;
    font-size: 14px;
    padding-bottom: 15px;
  }
  .page {
    margin-top: 10px;
    float: right;
  }
  table tbody tr.el-table__row td.is-center:nth-child(6) {
    cursor: pointer;
  }
}
</style>
