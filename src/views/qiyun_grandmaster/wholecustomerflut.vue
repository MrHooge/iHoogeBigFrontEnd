<template>
    <div class="Sunburn">
        <div class="box">
            账号：<el-input v-model="account" placeholder="请输入用户名" style="width: 180px;"></el-input>
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
           
            <el-button type="primary" style="margin-left:30px;" @click="cloud">搜索</el-button>
            <el-button type="primary" style="margin-left:30px;" @click="exportSome">导出</el-button>

        </div>
        <!-- 表格数据 -->
        <el-table
            :data="tablelist"
            border
            style="width: 100%">
            <el-table-column
                prop="account"
                label="	用户账户" align="center">
            </el-table-column>
            <el-table-column
                prop="buyRecommend"
                label="购买推荐云朵"
                align="center">
            </el-table-column>
            <el-table-column
                prop="clound"
                label="当前云朵" align="center">
            </el-table-column>
            <el-table-column
                prop="quickReviw"
                label="快速审核扣款云朵" align="center">
            </el-table-column>
             <el-table-column
                prop="recharge"
                label="充值云朵"
                align="center">
            </el-table-column>
              <el-table-column
                prop="recommendIncome"
                label="被购加款云朵"
                align="center">
            </el-table-column>
             <el-table-column
                prop="recommendRefund"
                label="不中退款云朵"
                align="center">
            </el-table-column>
             <el-table-column
                prop="reward"
                label="打赏云朵"
                align="center">
            </el-table-column>
             <el-table-column
                prop="rewardIncome"
                label="	被打赏云朵"
                align="center">
            </el-table-column>
             <el-table-column
                prop="withdraw"
                label="	提现云朵"
                align="center">
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="page">
            <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalList"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import {exportExcle} from '@/api/sys_user';
import { getCloundSummaryList } from '@/api/grandmaster';
export default {
  data() {
    return {
      tablelist: [], // 表格数据
      account:''||null, // 用户名
      stime:''||null,
      etime:''||null,
      page:1,
      pageSize:20,
      newarr: [],
      totalList: 0,
    }
  },
  filters: {
    createDateTime(a) {
      return new Date(a).toLocaleDateString().replace(/\//g, "-");
    },
    staus(a) {
      return a ? "显示" : "隐藏";
    },
    stype(a) {
      if (a == 0) {
        return "待审核";
      } else if (a == 1) {
        return "已审核";
      } else {
        return "被驳回";
      }
    }
  },
  created() {
    this.getTable();//默认显示充值流水
  },
  methods: {
    //翻页
        handleCurrentChange(num){
            this.page = num;
            this.getTable()
        },
        //改变页面大小
        handleSizeChange(num){
            this.pageSize = num;
            this.getTable()
            },
    //加款
    cloud(){
        let model = {
        account: this.account,
        offset: this.page,
        pageSize: this.pageSize,
        endTime:this.etime,
        startTime:this.stime
      };
    getCloundSummaryList(model).then(res => {
        console.log(res.data.error_code)
        if (res.data.error_code === 200) {
            this.tablelist = res.data.data.list  
            this.totalList = res.data.data.total
            this.$message.success(res.data.message)   
        }else{
           this.$message.error(res.data.message) 
        }
    });
    },
    //获取列表数据
    getTable() {
        let model = {
            account: this.account || "",
            offset: this.page,
            pageSize: this.pageSize,
            endTime:this.etime,
            startTime:this.stime
        };
        getCloundSummaryList(model).then(res => {
            console.log(res)
            if (res.data.error_code === 200) {
                this.tablelist = res.data.data.list
                this.totalList = res.data.data.total 
            }else{
                this.$message.error(res.data.message)
            }
        });
    },
    formatJson(filterVal, jsonData) {
　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
　　},
    // 导出
    exportSome() {
        let newobj
        this.tablelist.forEach((e, index) => {
            newobj = {
                    account: e.account,
                    buyRecommend: e.buyRecommend,
                    clound: e.clound.toFixed(2),
                    quickReviw: e.quickReviw,
                    recharge: e.recharge,
                    recommendIncome: e.recommendIncome,
                    recommendRefund: e.recommendRefund,
                    reward: e.reward,
                    rewardIncome: e.rewardIncome,
                    withdraw: e.withdraw,
            }
            this.newarr.push(newobj)
        })
        let model = {
            listParams: JSON.stringify(this.newarr),
            title: '会员充值流水'
        }
        console.log(model)
        exportExcle(model.listParams, model.title)
            .then(res => {})
        require.ensure([], () => {
            const { export_json_to_excel } = require('../../vendor/Export2Excel');
            const tHeader = ['用户账户', '购买推荐云朵', '当前云朵', '快速审核扣款云朵', '充值云朵', '被购加款云朵', '不中退款云朵','打赏云朵','被打赏云朵','提现云朵']; //对应表格输出的title
            const filterVal = ['account','buyRecommend','clound','quickReviw','recharge','recommendIncome', 'recommendRefund','reward','rewardIncome','withdraw']; // 对应表格输出的数据
            const list = this.tablelist;
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '列表excel'); //对应下载文件的名字
        })
    }
  }
};
</script>

<style scoped>
.Sunburn{
    padding: 10px 20px
}
.box {
  padding: 10px 0;
}
</style>
