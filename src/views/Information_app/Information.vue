<template>
    <div class="effectiveagent">
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="account"
                align="center"
                label="账号">
            </el-table-column>
            <el-table-column
                align="center"
                prop="autograph"
                label="签名">
            </el-table-column>
            <el-table-column
                align="center"
                label="创建时间"
                prop="createDatetime">
                <template slot-scope="scope">
                    <span>{{ scope.row.createDatetime | time }}</span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="审核">
                <template slot-scope="scope">
                    <el-button size="mini"
                               type="primary"
                               @click="handlePass(scope.row.account)">通过</el-button>
                    <el-button size="mini"
                               type="danger"
                               @click="handleReject(scope.row.account)">拒绝</el-button>
                </template>

            </el-table-column>
        </el-table>
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalList"
            v-if="totalList != ''">
        </el-pagination>
   </div>
</template>

<script>
import { getReviewList, Reviews } from "@/api/personal_review.js";

export default {
  data() {
    return {
        tableData: [], // 表歌数据
        page: 1, // 当前页
        pageSize: 20, //数据条数
        totalList: 0 // 总页数
    };
  },
  filters: {
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
    this.getTable();
  },
  methods: {
    // 获取表格数据
    getTable() {
      let obj = {
        offset: this.page,
        pageSize: this.pageSize
      };
      getReviewList(obj).then(res => {
        if (res.status == 200) {
          let data = res.data;
          if (data.error_code == 200) {
            console.log(data.data);
            let k = res.data.data;
            if (k.list && k.list.length > 0) {
              this.tableData = k.list;
              this.totalList = k.total;
            }
          }
        }
      });
    },
    // 审核通过
    handlePass(a) {
      let obj = {
        account: a,
        examine: 1
      };
      Reviews(obj).then(res => {
        console.log(res);
        if (res.data.error_code == 200) {
          this.$message(res.data.message);
          this.getTable();
        } else {
          this.$message(res.data.message);
        }
      });
    },

    // 审核拒绝
    handleReject(b) {
      let obj = {
        account: b,
        examine: 0
      };
      Reviews(obj).then(res => {
        if (res.data.error_code == 200) {
          this.$message(res.data.message);
          this.getTable();
        } else {
          this.$message(res.data.message);
        }
      });
    },

    handleCurrentChange(num) {
      this.page = num;
      this.getTable();
    },
    //改变页面大小
    handleSizeChange(num) {
      this.pageSize = num;
      this.getTable();
    }
  }
};
</script>

<style scoped>
.effectiveagent {
  padding: 10px 25px;
}
div.page {
  padding: 10px 0;
}
div.bens {
  padding: 0 0 20px 0;
}
</style>