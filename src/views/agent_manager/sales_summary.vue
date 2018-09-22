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
                 style="margin-left:50px;"
                 :loading="istrue">搜索</el-button>
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
      <!-- <el-table-column label="竞彩" prop="allBuy" align="center">
      </el-table-column> -->
      <el-table-column label="消费数(个)"
                       prop="allBuyNum"
                       align="center">
      </el-table-column>
      <el-table-column label="自购数(个)"
                       prop="CountSelfBuyNum"
                       align="center">
      </el-table-column>
            <el-table-column label="跟单数(个)"
                       prop="CountFllowBuyNum"
                       align="center">
      </el-table-column>
      <el-table-column label="竞彩"
                       prop="allBuyMoney"
                       align="center">
      </el-table-column>
      <el-table-column label="自购(金额)"
                       prop="selfBuy"
                       align="center">
      </el-table-column>
      <el-table-column label="跟单(金额)"
                       prop="fllowBuy"
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
      <el-table-column label="渠道"
                       prop="qdName"
                       align="center"
                       v-if="qudaoShow">
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
                   :total="totalList">
    </el-pagination>
  </div>
</template>

<script>
import { Message, MessageBox } from 'element-ui'
import { findAgentInfoByAccount,  exportExcle, findSaleInfo } from '@/api/sys_user'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
  data() {
    return {
      tableData: [],
      account: '', // 用户名
      agentName: '',
      loginAccount: getCookies('name'),
      pageCurr: 1,
      pages: 10,
      start_time: '',
      end_date: '',
      datetime: '', // 获取的日期和时间
      newarr: [],
      totalList: 0,
      istrue: false,
    }
  },
  created() {
      console.log(this.roleId)
    this.getTableList()
    if(this.roleId === '10000181' ){
        this.qudaoShow = false
    }else{
        this.qudaoShow = true
    }
    console.log(this.qudaoShow)
  },
  filters: {
    sumCommision(sum) {
      return sum ? sum : 0
    }
  },
  methods: {
    getone() {
        this.istrue = true
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
        start_time: this.start_time,
        end_date: this.end_date
      }
      findSaleInfo(paramsObj)
        .then(res => {
            if(res.data.error_code === 200){
                this.istrue = false
                this.tableData = res.data.data.list
                this.totalList = res.data.data.total
            }
          
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
          agentName: e.agentName,
          allBuyNum: e.allBuyNum.toFixed(2),
          CountSelfBuyNum: Number(e.CountSelfBuyNum).toFixed(2),
          CountFllowBuyNum:Number(e.CountFllowBuyNum).toFixed(2),
          allBuyMoney:e.allBuyMoney,
          selfBuy: Number(e.selfBuy).toFixed(2),
          fllowBuy: Number(e.followBuy).toFixed(2),
          beidan: Number(e.beidan).toFixed(2),
          laozucai: Number(e.laozucai).toFixed(2),
          shuzi: Number(e.shuzi).toFixed(2),
          koujian: Number(e.koujian).toFixed(2),
          sumCommision: (e.sumCommision ? e.sumCommision : 0).toFixed(2),
          qdName:e.qdName
          
        }
        this.newarr.push(newobj)
      })
      var model = {
        listParmas: JSON.stringify(this.newarr),
        title: "单个代理的销量详情"
      };
      exportExcle(model.listParmas, model.title)
        .then(res => {})
      console.log(this.newarr)
      require.ensure([], () => {　　　　　　　　
        const {
          export_json_to_excel
        } = require('../../vendor/Export2Excel');　　　　　　　　
        const tHeader = ['编号', '代理名字', '消费数(个)', '自购数(个)', '跟单数(个)', '竞彩', '自购(金额)', '跟单(金额)', '北单(金额)', '老足彩(金额)', '数字(金额)','扣减(金额)','佣金(金额)','渠道']; //对应表格输出的title
        　　　　　　　　
         const filterVal = ['num','agentName','allBuyNum','CountSelfBuyNum','CountFllowBuyNum','allBuyMoney', 'selfBuy', 'fllowBuy', 'beidan','laozucai','shuzi','koujian','sumCommision','qdName']; // 对应表格输出的数据　　　　　
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
