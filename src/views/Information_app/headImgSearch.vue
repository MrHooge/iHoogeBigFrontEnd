<template>
    <div class="backend app-container">
        <div class="layerbody">
            <div class="search">
                <el-input v-model="account"
                          placeholder="请输入用户名"
                          style="width:10%;margin-right:50px;margin-bottom:40px;margin-top:40px"
                          clearable></el-input>
                <el-select v-model="type"
                           placeholder="筛选"
                           style="width:140px;margin-right: 50px;">
                    <el-option v-for="item in options"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </div>
            <div class="main">
                <el-table :data="tableData"
                          border
                          tooltip-effect="dark"
                          style="width: 100%">
                    <el-table-column label="ID"
                                     prop="id"
                                     align="center">
                    </el-table-column>
                    <el-table-column label="用户名"
                                     prop="account"
                                     align="center">
                    </el-table-column>
                    <el-table-column label="头像图片"
                                     align="center">
                                     <template slot-scope="scope">
                                         <div>
                                            <img :src="'https://'+scope.row.masterPictureUrl" alt="" style="width:20%;height:30%">
                                        </div>
                                     </template>
                    </el-table-column>
                    <el-table-column label="操作"
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
import { getPicture, modifyPicture } from "@/api/personal_review.js";
import { findAllMember } from "@/api/customer";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message } from "element-ui";
import treeTable from "@/components/TreeTable";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
export default {
  data() {
    return {
      account: "", //用户名
      //   username: "", //昵称
      type: "1",
      page: 1,
      pageSize: 20,

      totalList: 0, //总页数
      tableData: [], //表格数据
      options: [
        {
          value: "1",
          label: "全部"
        },
        {
          value: "2",
          label: "修改过头像"
        }
      ],

      id: "", //存储要驳回的方案id
      dialogVisible: false
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //查询
    search() {
      this.page = 1;
      this.getData();
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
        type: this.type,
        offset: this.page,
        pagesize: this.pageSize
      };
      getPicture(obj).then(res => {
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
        id: this.id
      };
      modifyPicture(obj).then(res => {
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
