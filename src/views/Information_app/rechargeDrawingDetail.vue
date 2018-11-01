<template>
    <div class="Sunburn">
        <div class="box">
            账号：<el-input v-model="account" placeholder="请输入用户名" style="width: 180px;" clearable></el-input>
            开始时间：<el-date-picker
            v-model="stime"
            type="datetime"
            style="margin-bottom:40px;margin-right:20px;width:200px"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
            
            结束时间：<el-date-picker
            v-model="etime"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="23:59:59"
            type="datetime"
            style="margin-left:10px;
            width:200px
            margin-bottom:40px;"
            placeholder="请选择结束日期"
            >
            </el-date-picker>
           <el-button type="primary" style="margin-left:30px;" @click="search('recharge')">查询充值</el-button>
           <el-button type="primary" style="margin-left:30px;" @click="search('drawing')">查询提款</el-button>
        </div>
        <!-- 表格数据 -->
        <el-table
            :data="tablelist"
            border
            style="width: 100%">
            <el-table-column
                prop="planNo"
                label="方案编号"
                align="center">
            </el-table-column>
            <el-table-column
                label="流水ID" align="center"
                prop="walletLineNo">
            </el-table-column>
            <el-table-column
                prop="account"
                label="账号"
                align="center">
            </el-table-column>
            <el-table-column
                prop="clouds"
                label="云朵流水数量" align="center">
            </el-table-column>
              <el-table-column
                prop="ableBalance"
                label="可用余额" align="center">
            </el-table-column>
             <el-table-column
                prop="freezeBalance"
                label="冻结余额"
                align="center">
            </el-table-column>
              <el-table-column
                prop="heapBalance"
                label="消费金额"
                align="center">
            </el-table-column>
            <!-- <el-table-column
                prop="operLineNo"
                label="流水编号"
                align="center">
            </el-table-column>
             <el-table-column
                prop="orderNo"
                label="订单编号"
                align="center">
            </el-table-column> -->
             
             <el-table-column
                prop="remark"
                label="备注"
                align="center">
            </el-table-column>
             <!-- <el-table-column
                prop="transType"
                label="流水类型"
                align="center">
            </el-table-column> -->
            <el-table-column
                prop="createDateTime"
                label="充值时间" align="center">
                <template slot-scope="scope">
                  {{scope.row.createDateTime | time}}
                </template>
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
            v-if="totalList != ''"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getRechargeList, getWithdrawList } from "@/api/personal_review";
export default {
  data() {
    return {
      tablelist: [], // 表格数据
      account: "", // 用户名
      stime: "",
      etime: "",
      page: 1,
      pageSize: 20,
      totalList: 0,
      isRecharge: true //默认显示充值数据
    };
  },
  filters: {
    // createDateTime(a) {
    //   return new Date(a).toLocaleDateString().replace(/\//g, "-"); //获取时间并转换成2018-10-30格式
    // },
    time(a) {
      if (a != null) {
        let date = new Date(a);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? "0" + MM : MM;
        let d = date.getDate();
        d = d < 10 ? "0" + d : d;
        let h = date.getHours();
        h = h < 10 ? "0" + h : h;
        let m = date.getMinutes();
        m = m < 10 ? "0" + m : m;
        let s = date.getSeconds();
        s = s < 10 ? "0" + s : s;
        return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
      }
    }
  },
  created() {
    this.getRecharge(); //默认显示充值明细列表
  },
  methods: {
    //查询
    search(val) {
      this.page = 1;
      if (val === "recharge") {
        this.isRecharge = true;
        this.getRecharge();
      } else if (val === "drawing") {
        this.isRecharge = false;
        this.getDrawing();
      }
    },
    //翻页
    handleCurrentChange(num) {
      this.page = num;
      if (this.isRecharge) {
        this.getRecharge();
      } else {
        this.getDrawing();
      }
    },
    //改变页面大小
    handleSizeChange(num) {
      this.pageSize = num;
      if (this.isRecharge) {
        this.getRecharge();
      } else {
        this.getDrawing();
      }
    },
    //充值明细列表
    getRecharge() {
      let obj = {
        account: this.account,
        startTime: this.stime,
        endTime: this.etime,
        offset: this.page,
        pagesize: this.pageSize
      };
      getRechargeList(obj).then(res => {
        if (res.data.error_code === 200) {
          this.tablelist = res.data.data.list;
          this.totalList = res.data.data.total;
          this.$message.success(res.data.message);
        } else {
          this.tablelist = [];
          this.totalList = "";
          this.$message.error(res.data.message);
        }
      });
    },
    //提款明细列表
    getDrawing() {
      let model = {
        account: this.account,
        offset: this.page,
        pagesize: this.pageSize,
        endTime: this.etime,
        startTime: this.stime
      };
      getWithdrawList(model).then(res => {
        if (res.status == 200) {
          if (res.data.error_code === 200) {
            this.tablelist = res.data.data.list;
            this.totalList = res.data.data.total;
          } else {
            this.tablelist = [];
            this.totalList = "";
            this.$message.error(res.data.message);
          }
        }
      });
    }
  }
};
</script>

<style scoped>
.Sunburn {
  padding: 10px 20px;
}
.box {
  padding: 10px 0;
}
</style>
