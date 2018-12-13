<template>
	<div class="backend">
		<div class="search">
			<el-input v-model="account" placeholder="请输入账号进行查询" style="width:12%;" clearable></el-input>
            <el-input v-model="username" placeholder="请输入昵称进行查询" style="width:12%;" clearable></el-input>
			<el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
		</div>
		<el-table :data="tableData"
		          border
		          style="width: 100%;">
      <el-table-column type="index" align="center" label="编号"></el-table-column>
      <!-- <el-table-column prop="id"
			                 label="ID"
			                 align="center">
			</el-table-column> -->
      <el-table-column prop="account"
			                 label="账号"
			                 align="center">
			</el-table-column>
      <el-table-column prop="username"
			                 align="center"
			                 label="昵称">
			</el-table-column>
      <el-table-column prop="applicant"
			                 label="申请人"
			                 align="center">
			</el-table-column>
			<el-table-column label="身份证号"
			                 align="center">
                      <template slot-scope="scope">
                        {{scope.row.identify | afterFour}}
                      </template>
			</el-table-column>
			
			<el-table-column label="审核时间"
			                 align="center">
                <template slot-scope="scope">
					<span>{{ scope.row.review_time | setTime}}</span>
				</template>
			</el-table-column>

			<!-- <el-table-column prop="mobile"
			                 label="手机号"
			                 align="center">
			</el-table-column> -->
      <!-- <el-table-column prop="name"
			                 label="真实姓名"
			                 align="center">
			</el-table-column> -->
            <el-table-column prop="note"
			                 label="备注"
			                 align="center">
			</el-table-column>
            <el-table-column prop="operator"
			                 label="操作人"
			                 align="center">
			</el-table-column>
            <el-table-column label="状态"
			                 align="center">
                <template slot-scope="scope">
					<span>{{ scope.row.status | changeStaus}}</span>
				</template>  
			</el-table-column>

			<el-table-column align="center"
			                 label="发起时间">
				<template slot-scope="scope">
					<span>{{ scope.row.create_time | setTime}}</span>
				</template>
			</el-table-column>

			<el-table-column prop="up_account"
			                 label="上级名字"
			                 align="center">
			 </el-table-column>
			<el-table-column align="center"
			                 width="180px"
			                 label="操作">
				<template slot-scope="scope">
					<div v-if="scope.row.status === 0">
                        <el-button type="success" @click="hint(scope.row,'pass')">通过</el-button>
						<el-button type="danger" @click="hint(scope.row,'nopass')">驳回</el-button>
					</div>
					<div v-else>
                        <el-button type="primary">已审核</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>
		<!-- 弹窗 -->
		<el-dialog :title="dialogTitle"
		           :visible.sync="dialogVisible"
		           width="30%"
                   style="text-align:center">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="launchSure(1)" v-if="isPass">确 定</el-button>
                    <el-button type="primary" @click="launchSure(2)" v-if="!isPass">确 定</el-button>
		</el-dialog>
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
import {
  findMemberLogoutReview,
  memberLogoutReview,
  findAllMember,
  updateMemberLogoutReview
} from "@/api/customer";

import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message } from "element-ui";
import treeTable from "@/components/TreeTable";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
export default {
  data() {
    return {
      dialogVisible: false, //发起申请弹窗
      dialogTitle: "",
      tableData: [], // 存储表数据
      totalList: 0,
      account: "",
      appliant: "",
      status: "",
      page: 1,
      pageSize: 20,
      username: "", //输入查询的昵称
      formLabelWidth: "120px",
      isPass: true,
      form: {
        account: "",
        id: "",
        operator: "",
        status: ""
      }
    };
  },
  created() {
    this.getData();
  },
  filters: {
    //保留后四位
    afterFour(val) {
      return val.substring(val.length - 4);
    },
    setTime(a) {
      if (a != null) {
        return setTime(a);
      }
    },
    changeStaus(val) {
      val === Number(val);
      if (val === 0) {
        return "未审核";
      } else if (val === 1) {
        return "通过";
      } else if (val === 2) {
        return "驳回";
      }
    }
  },
  methods: {
    //翻页
    handleCurrentChange(num) {
      this.page = num;
      this.getData();
    },
    //改变页面大小
    handleSizeChange(num) {
      this.pageSize = num;
      this.getData();
    },
    //   搜索查询
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
    // 获取列表数据
    getData() {
      let obj = {
        account: this.account,
        appliant: this.appliant,
        page: this.page,
        pageSize: this.pageSize,
        status: this.status
      };
      findMemberLogoutReview(obj).then(res => {
        if (res.data.error_code == 200) {
          this.totalList = res.data.data.total;
          this.tableData = res.data.data.list;
          this.$message.success(res.data.message);
        } else {
          this.totalList = "";
          this.tableData = [];
          this.$message.error(res.data.message);
        }
      });
    },
    hint(val, type) {
      this.dialogVisible = true;
      this.form.account = val.account;
      this.form.id = val.id;
      this.form.operator = val.operator;
      if (type === "pass") {
        this.isPass = true;
        this.dialogTitle = "确认通过吗？";
      } else {
        this.isPass = false;
        this.dialogTitle = "确认驳回吗？";
      }
    },
    // 确定的回调
    launchSure(a) {
      if (this.form.operator === null) {
        this.form.operator = "";
      }
      this.form.status = a;
      updateMemberLogoutReview(this.form).then(res => {
        if (res.data.error_code === 200) {
          this.dialogVisible = false;
          this.$message.success(res.data.message);
          this.getData();
        } else {
          this.dialogVisible = false;
          this.$message.error(res.data.message);
          this.getData();
        }
      });
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-dialog__body {
  padding: 0 30px;
}
.backend {
  padding: 7px;
  width: 99.5%;
  .search {
    padding: 10px 0;
  }
  .page {
    margin-top: 10px;
    float: right;
  }
}
</style>
