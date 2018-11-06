<template>
    <div class="backend app-container">
        <div class="layerbody">
            <div class="search">
                <el-input v-model="account"
                          placeholder="请输入用户名"
                          style="width:10%;margin-right:50px;margin-bottom:40px;margin-top:40px"
                          clearable></el-input>
                <!-- <el-input v-model="username"
                          placeholder="请输入昵称查询"
                          style="width:10%;margin-right:50px;"
                          clearable></el-input> -->
                开始时间：
                <el-date-picker v-model="startDate"
                                type="datetime"
                                style="margin-bottom:40px;margin-right:20px;width:200px"
                                placeholder="请选择开始日期"
                                value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                结束时间：
                <el-date-picker v-model="endDate"
                                align="right"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                default-time="23:59:59"
                                type="datetime"
                                style="margin-left:10px;
                    width:200px
                    margin-bottom:40px;"
                                placeholder="请选择结束日期">
                </el-date-picker>
                <el-button type="primary"
                           icon="el-icon-search"
                           @click="search"
                           style="margin-left:20px;">搜索</el-button>
                <el-button type="success" @click="cofirm('pass')" style="margin-left:100px;margin-bottom:40px;margin-top:40px">审核通过</el-button>
                <el-button type="danger" @click="cofirm('nopass')" style="margin-left:100px;margin-bottom:40px;margin-top:40px">审核不通过</el-button>


            </div>
            <div class="main">
                <el-table :data="tableData"
                          border
                          @selection-change="handleSelectionChange"
                          tooltip-effect="dark"
                          style="width: 100%">
                    <el-table-column type="selection"
                                     align="center">
                    </el-table-column>
                    <el-table-column label="ID"
                                     prop="id"
                                     align="center">
                    </el-table-column>
                    <el-table-column label="账号"
                                     prop="account"
                                     align="center">
                    </el-table-column>
                    <el-table-column label="推荐内容"
                                     prop="content"
                                     align="center">
                    </el-table-column>
                    <!-- <el-table-column label="评论人头像"
                                     prop="picture"
                                     align="center">
                    </el-table-column>
                    <el-table-column label="方案发起人头像"
                                     prop="planPicture"
                                     align="center">
                    </el-table-column> -->
                    
                    <el-table-column label="开奖状态"
                                     align="center">
                                     <template slot-scope="scope">
                                         {{scope.row.bingoStatus | changeStatus}}
                                     </template>
                    </el-table-column>
                    <el-table-column label="串法"
                                     align="center">
                                     <template slot-scope="scope">
                                         {{scope.row.playType | changePlayType}}
                                     </template>
                    </el-table-column>
                    <el-table-column label="类型"
                                     align="center">
                                     <template slot-scope="scope">
                                         {{scope.row.type | changeType}}
                                     </template>
                    </el-table-column>
                    
                    <el-table-column label="点赞总数"
                                     prop="likeCount"
                                     align="center">
                    </el-table-column>
                    <el-table-column label="阅读量"
                                     prop="readNum"
                                     align="center">
                    </el-table-column>
                    <el-table-column label="标题"
                                     prop="title"
                                     align="center">
                    </el-table-column>
                    <el-table-column label="方案创建时间"
                                     align="center">
                        <template slot-scope="scope">
                            {{scope.row.createTime | time}}
                        </template>
                    </el-table-column>
                    <el-table-column label="费用"
                                     prop="fee"
                                     align="center">
                    </el-table-column>
                    <el-table-column label="审核状态"
                                     align="center"
                                     filter-placement="bottom-end">
                        <template slot-scope="scope">
                            <el-tag disable-transitions>{{scope.row.examineStatus | changeExamine}}</el-tag>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="page"
             style="padding:30px 0">
            <el-pagination background
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
        <!-- 弹窗事件 -->
        <el-dialog :title="dialogTitle"
		           :visible.sync="dialogVisible"
		           width="40%"
                   >
			<span slot="footer"
			      class="dialog-footer">
                  <el-button @click="dialogVisible = false" type="primary">取消</el-button>
                <!-- 审核通过 -->
				<el-button @click="review(1)" type="success" v-show="isPass">确定</el-button>
                <!-- 审核不通过 -->
				<el-button @click="review(2)" type="success" v-show="!isPass">确定</el-button>

			</span>
		</el-dialog>
    </div>
</template>

<script>
import { getPlanList, shPlanById } from "@/api/personal_review.js";
// import { findAllMember } from "@/api/customer";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message } from "element-ui";
import treeTable from "@/components/TreeTable";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
import setTime from "@/utils/time.js";
export default {
  data() {
    return {
      //   options2show: true,
      //   options3show: false,
      account: "", //用户名
      //   username: "", //昵称
      //   type: "1",
      //   commentType: "1",
      startDate: "",
      endDate: "",
      page: 1,
      pageSize: 20,

      totalList: 0, //总页数
      tableData: [], //表格数据

      //   id: "", //存储要驳回的方案id

      //   connectType: "", //存储要驳回的type

      selectios: [], //多选框存储
      dialogVisible: false,
      dialogTitle: "审核通过",
      isPass: true
    };
  },
  created() {
    this.getData();
  },
  filters: {
    changeStatus(val) {
      val = Number(val);
      if (val === 0) {
        return "未开奖";
      } else if (val === 1) {
        return "中奖";
      } else if (val === 2) {
        return "未中奖";
      }
    },
    changeExamine(val) {
      if (val === 0 || val === "未审核") {
        return "未审核";
      } else if (val === 1 || val === "审核通过") {
        return "审核通过";
      } else if (val === 2 || val === "审核失败") {
        return "审核失败";
      }
    },
    changeType(val) {
      val = Number(val);
      return val === 0 ? "不中不退" : "不中全退";
    },
    changePlayType(val) {
      val = Number(val);
      return val === 1 ? "单关" : "二串一";
    },
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
  methods: {
    //查询
    search() {
      this.page = 1;
      this.getData();
    },
    //获取评论列表
    getData() {
      let obj = {
        account: this.account,
        startDate: this.startDate,
        endDate: this.endDate,
        offset: this.page,
        pageSize: this.pageSize
      };
      getPlanList(obj).then(res => {
        if (res.data.error_code === 200) {
          this.tableData = res.data.data.list;
          this.totalList = res.data.data.total;
          this.$message.success(res.data.message);
        } else {
          this.tableData = [];
          this.totalList = "";
          this.$message.error(res.data.message);
        }
      });
    },
    //提示框
    cofirm(type) {
      if (type === "pass") {
        this.isPass = true;
        this.dialogTitle = "审核通过";
      } else {
        this.isPass = false;
        this.dialogTitle = "审核不通过";
      }
      if (this.selectios && this.selectios.length > 0) {
        this.dialogVisible = true;
      } else {
        this.$message("请至少选择一个!");
      }
    },
    //审核
    review(a) {
      let arr = [];
      this.selectios.forEach(e => {
        arr.push(e.id);
      });
      let obj = {
        planId: arr.join(","),
        cz: a
      };
      shPlanById(obj).then(res => {
        if (res.data.error_code === 200) {
          this.$message.success(res.data.message);
          this.dialogVisible = false;
          this.getData();
        } else {
          this.$message.error(res.data.message);
          this.dialogVisible = false;
        }
      });
    },
    handleSelectionChange(val) {
      this.selectios = val;
    },
    //改变页面大小
    handleSizeChange(num) {
      this.pageSize = num;
      this.getData();
    },
    //翻页
    handleCurrentChange(num) {
      this.page = num;
      this.getData();
    }
  }
};
</script>

<style scoped>
.main {
  padding-top: 30px;
}
.backend >>> .el-dialog__header {
  text-align: center;
}
.backend >>> .el-dialog__footer {
  text-align: center;
}
.backend >>> .el-button--default {
  background: #e25550;
  color: #fff;
}
.backend >>> .el-tag {
  background: #31b0d5;
  color: #fff;
}
</style>
