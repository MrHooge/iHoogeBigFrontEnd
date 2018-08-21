<!-- 业绩明细 -->
<template>
  <div class="sales_detail"
       style="padding:0 20px">
    <!-- 搜索 -->
    <div class="row">
      <el-input placeholder="请输入代理用户名"
                v-model="account"
                style="width: 200px;margin-right:50px;"></el-input>
      <el-date-picker v-model="datetime"
                      value-format="yyyy-MM-dd"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期">
      </el-date-picker>
      <el-button type="primary"
                 @click="getone"
                 @keyup.13="getone"
                 style="margin-left:50px;">搜索</el-button>
      <el-button type="success"
                 @click="exportSome"
                 style="margin-left:50px;">导出</el-button>
      <p class="taost">
        注:金额默认是消费金额
      </p>
      <!-- 上下页 -->
    </div>
    <el-table :data="tableData"
              border
              style="width: 100%;">
      <el-table-column type="index"
                       align="center"
                       label="编号">
      </el-table-column>
      <el-table-column label="代理名字"
                       prop="agentName"
                       align="center">
      </el-table-column>
      <el-table-column label="注册"
                       prop="regist"
                       align="center">
      </el-table-column>
      <el-table-column label="激活数"
                       prop="active"
                       align="center">
      </el-table-column>
      <!-- <el-table-column label="竞彩" prop="allBuy" align="center">
      </el-table-column> -->
      <el-table-column label="消费数(个)"
                       prop="payNum"
                       align="center">
      </el-table-column>
      <el-table-column label="自购(金额)"
                       prop="selfBuy"
                       align="center">
      </el-table-column>
      <el-table-column label="跟单(金额)"
                       prop="followBuy"
                       align="center">
      </el-table-column>
            <el-table-column label="北单(金额)"
                       prop="beidan"
                       align="center">
      </el-table-column>
      <el-table-column label="老足彩(金额)"
                       prop="laozucai"
                       align="center">
      </el-table-column>
      <el-table-column label="数字(金额)"
                       prop="shuzi"
                       align="center">
      </el-table-column>
            <el-table-column label="扣减(金额)"
                       prop="koujian"
                       align="center">
      </el-table-column>
            <el-table-column label="佣金(金额)"
                       prop="sumCommision"
                       align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.sumCommision | sumCommision }}</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination style="margin:20px auto"
                   background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pageCurr"
                   :page-sizes="[10, 20, 50, 100]"
                   :page-size="10"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="total">
    </el-pagination>
  </div>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
import { findAgentInfoByAccount,  exportExcle, findSaleInfo } from '@/api/sys_user'
export default {
  data() {
    return {
      tableData: [],
      account: '', // 用户名
      agentName: '',
      loginAccount: localStorage.getItem('adminUser'),
      pageCurr: 1,
      pages: 10,
      start_time: '',
      end_date: '',
      datetime: '', // 获取的日期和时间
      newarr: [],
      total: 0
    }
  },
  created() {
    this.getTableList('', 1)
  },
  filters: {
    sumCommision(sum) {
      return sum ? sum : 0
    }
  },
  methods: {
    getone() {
      console.log(this.datetime)
      this.agentName = this.account
      this.start_time = this.datetime[0]
      this.end_date = this.datetime[1]
      this.getTableList()
    },
    handleSizeChange(val) {
      this.pages = val
      this.getTableList()
    },
    handleCurrentChange(val) {
      this.pageCurr = val
      this.getTableList()
    },
    //获取表单数据
    getTableList() {
      let paramsObj = {
        agentName: this.agentName,
        loginAccount: this.loginAccount,
        page: this.pageCurr,
        pageSize: this.pages,
        'start_time': this.start_time,
        'end_date': this.end_date
      }
      findSaleInfo(paramsObj)
        .then(res => {
          this.tableData = res.data.data
          this.total = res.data.data.total
        })
        .catch(error => {
          Message.error(error)
        })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    //导出表格
    exportSome() {
      this.tableData.forEach((e, index) => {
        console.log(e)
        let newobj = {
          num: index + 1,
          "开户数": e.regist,
          "激活数": e.active,
          "消费数": Number(e.payNum).toFixed(2),
          "北单": Number(e.beidan).toFixed(2),
          "佣金": (e.sumCommision ? e.sumCommision : 0).toFixed(2),
          "日期": e.date,
          "跟单": Number(e.followBuy).toFixed(2),
          "老足彩": Number(e.laozucai).toFixed(2),
          "扣减": Number(e.koujian).toFixed(2),
          "自购": Number(e.selfBuy).toFixed(2),
          "数字": Number(e.shuzi).toFixed(2)
        }
        this.newarr.push(newobj)
      })
      var model = {
        listParmas: JSON.stringify(this.newarr),
        title: "单个代理的销量详情"
      };
      exportExcle(model.listParmas, model.title)
        .then(res => {
          //window.location.href = "https://member.api.qiyun88.cn/user/exportExcle?listParmas="+model.listParmas+"&title="+model.title
        })
      console.log(this.newarr)
      require.ensure([], () => {
        const {
          export_json_to_excel
        } = require('../../vendor/Export2Excel');
        const tHeader = ['编号', '开户数', '激活数', '消费数', '北单', '佣金', '日期', '跟单', '老足彩', '扣减', '自购', '数字']; //对应表格输出的title

        const filterVal = this.newarr; // 对应表格输出的数据

        const list = this.tableData;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '列表excel'); //对应下载文件的名字　　　　
      })
    }
  }
}
</script>

<style scoped>
div.row {
  padding: 20px 0;
}

p.taost {
  color: #f00;
  font-size: 14px;
  padding-top: 10px;
}
</style>
