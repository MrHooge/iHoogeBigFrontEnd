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
                    <span>{{ scope.row.createDatetime | setTime }}</span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="审核">
                <template slot-scope="scope">
                    <el-button size="mini"
                               type="primary"
                               @click="handle(scope.row.account,'pass')">通过</el-button>
                    <el-button size="mini"
                               type="danger"
                               @click="handle(scope.row.account,'reject')">拒绝</el-button>
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
import setTime from '@/utils/time.js'
import { getReviewList, Reviews } from "@/api/personal_review.js";

export default {
  data() {
    return {
      tableData: [], // 表歌数据
      page: 1, // 当前页
      pageSize: 20, //数据条数
      totalList: 0, // 总页数

      account: "",
      examine: ""
    };
  },
  filters: {
    setTime(a) {
      if (a != null) {
        return setTime(a);
      }
    },
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
    handle(a, b) {
      this.account = a;
      if (b === "pass") {
        this.examine = 1;
      } else if ("reject") {
        this.examine = 0;
      }
      this.handleSure();
    },

    // 审核拒绝
    handleSure() {
      let obj = {
        account: this.account,
        examine: this.examine
      };
      Reviews(obj).then(res => {
        if (res.data.error_code == 200) {
          this.$message.success(res.data.message);
          this.getTable();
        } else {
          this.$message.error(res.data.message);
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