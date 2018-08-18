<template>
  <div class="backend">

    <!--  代理给客户充值记录 -->
    <div class="search">
      <el-input v-model="input1"
                placeholder="请输入会员名进行查询"
                style="width:20%;"></el-input>
      <el-input v-model="memberAccount"
                placeholder="客户昵称"
                style="width:20%;"></el-input>
        开始时间：<el-date-picker
            v-model="stime"
            type="date"
            style="margin-bottom:40px;margin-right:20px;width:200px"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd">
            </el-date-picker>
            
            结束时间：<el-date-picker
            v-model="etime"
            align="right"
            value-format="yyyy-MM-dd"
            type="date"
            style="margin-left:10px;
            width:200px
            margin-bottom:40px;"
            placeholder="请选择结束日期"
            >
            </el-date-picker>
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
      <el-table-column prop="username"
                       label="会员昵称"
                       align="center">
      </el-table-column>
             <el-table-column prop="createTime"
                       align="center"
                       label="时间">
      </el-table-column>
      <el-table-column prop="account"
                       label="被加款人昵称"
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


      <!-- <el-table-column align="center"
                       prop="agentAccount"
                       label="操作人">
      </el-table-column> -->
    </el-table>
    <!-- 分页 -->
    <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-count="totalPages"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalList"
            >
            </el-pagination>
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
      page:1,
      pageSize:20,
      memberAccount:'',
      tableData: [], //表格数据
      stime:'',
      etime:'' 
 };
  },
  created() {
    this.getData('');
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
     //翻页
        handleCurrentChange(num){
            this.page = num;
            this.getData()
        },
        //改变页面大小
        handleSizeChange(num){
            this.pageSize = num;
            this.getData()
        },
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
        page:this.page,
        pageSize:this.pageSize,
        account: name,
        memberAccount:this.memberAccount,
        start_time:this.stime,
        end_time:this.etime,
        loginAccount: getCookies('name')
      };
      getAgentChargeLine(obj).then(res => {
        console.log(res)
        if (res.status = 200) {
          this.tableData = res.data.data;
          this.total = res.data.totalCount
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
