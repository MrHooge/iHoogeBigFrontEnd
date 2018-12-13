<template>
    <div class="backend app-container">
        <div class="layerbody">
            <div class="search">
                <el-input v-model="account"
                          placeholder="请输入用户名"
                          style="width:10%;margin-right:50px;margin-bottom:40px;margin-top:40px"
                          clearable></el-input>
                <el-input v-model="username"
                          placeholder="请输入昵称查询"
                          style="width:10%;margin-right:50px;"
                          clearable></el-input>
                <el-select v-model="commentType"
                           placeholder="筛选"
                           style="width:140px;margin-right: 50px;">
                    <el-option v-for="item in options"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                </el-select>
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
                                style="margin-left:10px;width:200px;margin-bottom:40px;"
                                placeholder="请选择结束日期">
                </el-date-picker>
                <el-button type="primary"
                           icon="el-icon-search"
                           @click="search">搜索</el-button>

            </div>
            <div class="main">
                <el-table :data="tableData"
                          border
                          tooltip-effect="dark"
                          style="width: 100%">
                    <!-- <el-table-column type="selection"
                                     align="center">
                    </el-table-column> -->
                    <el-table-column label="ID"
                                     prop="id"
                                     align="center">
                    </el-table-column>
                      <el-table-column label="方案"
                                       prop="planNo"
                                       align="center">
                      </el-table-column>
                      <el-table-column label="评论人用户名"
                                     prop="account"
                                     align="center">
                    </el-table-column>
                    <!-- <el-table-column label="回复人用户名"
                                     prop="replyAccount"
                                     align="center">
                    </el-table-column> -->
                      <el-table-column label="评论内容"
                                     prop="connect"
                                     align="center">
                    </el-table-column>
                    <!-- <el-table-column label="回复内容"
                                     prop="replyConnect"
                                     align="center">
                    </el-table-column> -->
                    
                    <el-table-column label="方案发起人的用户名"
                                     align="center">
                                     <template slot-scope="scope">
                                         <span v-if="scope.row.planUsername != null">{{scope.row.planUsername}}</span>
                                         <span v-else>{{scope.row.planAccount}}</span>
                                     </template>
                    </el-table-column>
                    <el-table-column label="评论类型"
                                     align="center">
                                     <template slot-scope="scope">
                                         {{scope.row.type | type}}
                                     </template>
                    </el-table-column>
                    <el-table-column label="回复类型"
                                     align="center">
                                     <template slot-scope="scope">
                                         {{scope.row.replyedType | replyedType}}
                                     </template>
                    </el-table-column>
                    
                    <el-table-column label="点赞数"
                                     prop="likeCount"
                                     align="center">
                    </el-table-column>
                    <!-- <el-table-column label="点赞数"
                                     prop="replyLike"
                                     align="center">
                    </el-table-column> -->
                    
                    <el-table-column label="楼层"
                                     prop="floor"
                                     align="center">
                    </el-table-column>
                    <!-- <el-table-column label="楼层"
                                     prop="replyFloor"
                                     align="center">
                    </el-table-column> -->
                    
                    <el-table-column label="评论时间"
                                     align="center">
                        <template slot-scope="scope">
                            {{scope.row.commentTime | setTime}}
                        </template>
                    </el-table-column>
                    <!-- <el-table-column label="回复时间"
                                     prop="replyTime"
                                     align="center">
                        <template slot-scope="scope">
                            {{scope.row.replyTime | setTime}}
                        </template>
                    </el-table-column> -->
                    
                    
                    <el-table-column label="审核状态"
                                     prop="status"
                                     align="center"
                                     filter-placement="bottom-end">
                        <template slot-scope="scope">
                            <el-tag disable-transitions>{{scope.row.status | changeType}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"
                                     prop="status"
                                     align="center">
                        <template slot-scope="scope">
                            <el-button type="danger" @click="cofirm(scope.row)">驳回</el-button>
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
        <el-dialog title="确认驳回"
		           :visible.sync="dialogVisible"
		           width="40%"
                   >
			<span slot="footer"
			      class="dialog-footer">
                  <el-button @click="dialogVisible = false" type="primary">取消</el-button>
				<el-button @click="Reject()" type="success">确定</el-button>
			</span>
		</el-dialog>
    </div>
</template>

<script>
import setTime from '@/utils/time.js'
import { getCommentList, bhComment } from "@/api/personal_review.js";
import { findAllMember } from "@/api/customer";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message } from "element-ui";
import treeTable from "@/components/TreeTable";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
export default {
  data() {
    return {
      selval: "",
      account: "", //用户名
      username: "", //昵称
      type: "1",
      commentType: "1",
      startDate: "",
      endDate: "",
      page: 1,
      pageSize: 20,

      totalList: 0, //总页数
      tableData: [], //表格数据
      options: [
        {
          value: "1",
          label: "推荐",
          disabled: false
        },
        {
          value: "2",
          label: "问答",
          disabled: false
        }
      ],
      id: "", //存储要驳回的方案id
      dialogVisible: false
    };
  },
  created() {
    this.getData();
  },
  filters: {
    type(val) {
      return val === 1 ? "推荐" : "问答";
    },
    replyedType(val) {
      if (val === 0) {
        return "未审核";
      } else if (val === 1) {
        return "通过";
      } else {
        return "不通过";
      }
    },
    changeType(val) {
      if (val === 0 || val === "未审核") {
        return "未审核";
      } else if (val === 1 || val === "审核通过") {
        return "审核通过";
      } else if (val === 2 || val === "审核失败") {
        return "审核失败";
      }
    },
    setTime(a) {
      if (a != null) {
        return setTime(a);
      }
    },
  },
  methods: {
    //查询
    search() {
      if (!this.account && !this.username) {
        this.page = 1;
        this.getData();
      } else {
        if (this.account === "") {
          this.getAccount();
        } else {
          this.page = 1;
          this.getData();
        }
      }
    },
    //用昵称查询账号
    getAccount() {
      let obj = {
        username: this.username
      };
      findAllMember(obj).then(res => {
        this.account = res.data.data.list[0].ACCOUNT;
        this.page = 1;
        this.getData();
      });
    },
    //获取评论列表
    getData() {
      let obj = {
        account: this.account,
        commentType: this.commentType,
        type: this.type,
        startDate: this.startDate,
        endDate: this.endDate,
        offset: this.page,
        pageSize: this.pageSize
      };
      getCommentList(obj).then(res => {
        if (res.data.error_code === 200) {
          this.tableData = res.data.data.list;
          this.totalList = res.data.data.total;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //提示框
    cofirm(val) {
      this.id = val.id;
      this.dialogVisible = true;
    },
    //驳回
    Reject() {
      let obj = {
        id: this.id,
        type: 1
      };
      bhComment(obj).then(res => {
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
