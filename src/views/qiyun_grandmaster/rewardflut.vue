<template>
    <div class="Sunburn">
        <div class="box">
            账号：<el-input v-model="account" placeholder="请输入用户名" style="width: 180px;" @input="search"></el-input>
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
           
            <el-button type="primary" style="margin-left:30px;" @click="Reward">搜索打赏流水</el-button>
 
        </div>
        <!-- 表格数据 -->
        <el-table
            :data="tablelist"
            border
            style="width: 100%">
            <el-table-column
                prop="ableBalance"
                label="可用余额" align="center">
            </el-table-column>
            <el-table-column
                prop="account"
                label="	账户"
                align="center">
            </el-table-column>
            <el-table-column
                prop="clouds"
                label="云朵流水数量" align="center">
            </el-table-column>
            <el-table-column
                prop="createDateTime"
                label="充值时间" align="center">
            </el-table-column>
             <el-table-column
                prop="freezeBalance"
                label="	冻结余额"
                align="center">
            </el-table-column>
              <el-table-column
                prop="heapBalance"
                label="		消费金额"
                align="center">
            </el-table-column>
             <el-table-column
                prop="memberId"
                label="账户ID"
                align="center">
            </el-table-column>
             <el-table-column
                prop="operLineNo"
                label="流水编号"
                align="center">
            </el-table-column>
             <el-table-column
                prop="orderNo"
                label="	订单编号"
                align="center">
            </el-table-column>
             <el-table-column
                prop="planNo"
                label="	方案编号"
                align="center">
            </el-table-column>
             <el-table-column
                prop="remark"
                label="	备注"
                align="center">
            </el-table-column>
             <el-table-column
                prop="transType"
                label="	流水类型"
                align="center">
            </el-table-column>
            <el-table-column
                label="	流水ID" align="center"
                prop="walletLineNo">
               
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
import { getRewardList } from '@/api/grandmaster'
export default {
  data() {
    return {
      tablelist: [], // 表格数据
      account: "", // 用户名
      stime:'',
      etime:'',
      page:1,
      pageSize:20
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
    //查询购买推荐明细列表
    Reward(){
        let model = {
        account: this.account || "",
        offset: this.page,
        pageSize: this.pageSize,
        endTime:this.etime,
        startTime:this.stime
      };
      getRewardList(model)
        .then(res => {
            // console.log(res.status);
          if (res.status == 200) {
            this.tablelist = res.data.data            
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
      getRewardList(model)
        .then(res => {
            // console.log(res.status);
          if (res.status == 200) {
            this.tablelist = res.data.data            
          }
        });
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
