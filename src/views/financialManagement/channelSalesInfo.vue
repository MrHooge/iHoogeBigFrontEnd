<!-- 渠道销量统计 -->
<template>
  <div class="sales_detail"
       style="padding:0 20px">
    <!-- 搜索 -->
    <div class="row">
        <el-date-picker v-model="datetime"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
        <el-button  type="primary"
                    @click="search"
                    style="margin-left:50px;"
                    :loading="istrue">搜索
        </el-button>
        <p class="taost">
            注:金额默认是消费金额（搜索时时间段默认当天！）
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
		<el-table-column label="渠道用户名"
                        prop="qdName"
                        align="center">
        </el-table-column>
        <el-table-column label="自购(金额)"
                        prop="selfBuy"
                        align="center">
        </el-table-column>
        <el-table-column label="跟单(金额)"
                        prop="follow"
                        align="center">
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination style="margin:20px auto"
                   background
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="page"
                   :page-sizes="[10, 20, 50, 100]"
                   :page-size="10"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="totalList"
                   v-if="totalList != ''">
    </el-pagination>
    </div>
</template>

<script>
import { Message, MessageBox } from "element-ui";
import { findAllMember } from "@/api/customer";
import {
  exportExcle,
  findSaleInfo,
  findAllUserAndRole,
  findQdSaleCount
} from "@/api/sys_user";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
import echarts from "echarts"; //引入图表插件
export default {
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 20,
      start_time: "",
      end_time: "",
      datetime: "", // 获取的日期和时间
      totalList: 0,
      istrue: false
    };
  },
  created() {
    this.getTableList();
  },
  methods: {
    //查询
    search() {
      this.istrue = false;
      this.start_time = this.datetime[0];
      this.end_time = this.datetime[1];
      this.page = 1;
      this.getTableList();
    },
    //获取表单数据
    getTableList() {
      let paramsObj = {
        loginAccount: this.$store.state.user.name, //登陆的账号名
        page: this.page,
        pageSize: this.pageSize,
        start_time: this.start_time || "",
        end_time: this.end_time || ""
      };
      findQdSaleCount(paramsObj)
        .then(res => {
          if (res.data.error_code === 200) {
            this.istrue = false;
            this.tableData = res.data.data.list;
            this.totalList = res.data.data.total;
          } else {
            this.$message.error("搜索失败!");
          }
        })
        .catch(error => {
          Message.error(error);
        });
    },
    //改变页面大小
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTableList();
    },
    //翻页
    handleCurrentChange(val) {
      this.page = val;
      this.getTableList();
    }
  }
};
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
