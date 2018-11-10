<template>
	<div class="backend">
		<div class="search">
			<el-input v-model="account"
			          placeholder="请输入账号进行查询"
			          style="width:12%;" clearable>
            </el-input>
            <el-input v-model="username"
			          placeholder="请输入昵称进行查询"
			          style="width:12%;" clearable>
            </el-input>
			      <el-input v-model="realName"
			          placeholder="请输入真实姓名进行查询"
			          style="width:12%;" clearable>
            </el-input>
            <el-input v-model="mobile"
			          placeholder="请输入手机号进行查询"
			          style="width:12%;" clearable>
            </el-input>
            <el-input v-model="identifyId"
			          placeholder="请输入身份证号进行查询"
			          style="width:12%;" clearable>
            </el-input>
			<el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
		</div>
		<el-table :data="tableData"
		          border
		          style="width: 100%;">
      <el-table-column type="index" align="center" label="编号"></el-table-column>
      <el-table-column prop="ACCOUNT"
			                 label="账号"
			                 align="center">
			</el-table-column>
			<el-table-column label="身份证号"
			                 align="center">
                       <template slot-scope="scope">
                        {{scope.row.CERT_NO | afterFour}}
                      </template>
			</el-table-column>
      <!-- <el-table-column prop="MOBILE"
			                 label="手机号"
			                 align="center">
			</el-table-column>
            <el-table-column prop="NAME"
			                 label="真实姓名"
			                 align="center">
			</el-table-column> -->
			<el-table-column label="最后登录时间"
			                 align="center">
                <template slot-scope="scope">
					<span>{{ scope.row.LAST_LOGIN_DATE_TIME | time}}</span>
				</template>
			</el-table-column>
			<el-table-column align="center"
			                 label="注册时间">
				<template slot-scope="scope">
					<span>{{ scope.row.REGISTER_DATE_TIME | time}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="agentAccount"
			                 label="上级名字"
			                 align="center">
			 </el-table-column>
			<el-table-column prop="username"
			                 align="center"
			                 label="昵称">
			</el-table-column>
			<el-table-column align="center"
			                 width="180px"
			                 label="操作">
				<template slot-scope="scope">
						<el-button type="primary" @click="launchApply(scope.row)">发起注销申请</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 申请发起弹窗 -->
		<el-dialog title="您确定要发起申请吗？"
		           :visible.sync="dialogVisible"
		           width="30%"
                   style="text-align:center">
            <el-form :model="form">
                <el-form-item label="昵称" :label-width="formLabelWidth">
                    <el-input v-model="form.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="账号" :label-width="formLabelWidth">
                    <el-input v-model="form.account" disabled></el-input>
                </el-form-item>
                <!-- <el-form-item label="身份证号" :label-width="formLabelWidth">
                    <el-input v-model="form.identify"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" :label-width="formLabelWidth">
                    <el-input v-model="form.mobile"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.name"></el-input>
                </el-form-item> -->
                <el-form-item label="操作人" :label-width="formLabelWidth">
                    <el-input v-model="form.operator" disabled></el-input>
                </el-form-item>
                <el-form-item label="状态" :label-width="formLabelWidth">
                  <el-radio-group v-model="form.status" size="mini" disabled>
                    <el-radio v-model="form.status" label="0" border>未审核</el-radio>
                    <el-radio v-model="form.status" label="1" border>通过</el-radio>
                    <el-radio v-model="form.status" label="2" border>驳回</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="上级账号" :label-width="formLabelWidth">
                    <el-input v-model="form.up_account" disabled></el-input>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="form.note"></el-input>
                </el-form-item>
                <el-form-item :label-width="formLabelWidth">
                    <el-button @click="dialogVisible = false" style="margin-left:-120px;margin-right:100px">取 消</el-button>
                    <el-button type="primary"
                            @click="launchSure()">确 定</el-button>
                </el-form-item>
            </el-form>
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
import { findAllMemberByLoginAcc, memberLogoutReview } from "@/api/customer";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message } from "element-ui";
import treeTable from "@/components/TreeTable";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
export default {
  data() {
    return {
      dialogVisible: false, //发起申请弹窗

      a: "",
      b: "",
      c: "",
      ob: "",
      tableData: [], // 存储表数据
      totalList: 0,

      account: "",
      identifyId: "",
      mobile: "",
      page: 1,
      pageSize: 20,
      realName: "",
      username: "", //输入查询的昵称
      formLabelWidth: "120px",
      form: {
        account: "",
        applicant: this.$store.state.user.name,
        create_time: "",
        identify: "",
        mobile: "",
        name: "",
        note: "",
        operator: this.$store.state.user.name,
        review_time: "",
        status: "",
        up_account: "",
        username: ""
      }
    };
  },
  created() {
    //   调接口返回数据
    // this.getData();
  },
  filters: {
    //保留后四位
    afterFour(val) {
      return val.substring(val.length - 4);
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
      console.log(this.account === "");
      if (
        this.account === "" &&
        this.identifyId === "" &&
        this.username === "" &&
        this.realName === "" &&
        this.mobile === ""
      ) {
        this.$message("请输入查询条件！");
      } else {
        this.page = 1;
        this.getData();
      }
    },
    // 获取列表数据
    getData() {
      let obj = {
        account: this.account,
        identifyId: this.identifyId,
        loginAccount: this.$store.state.user.name,
        mobile: this.mobile,
        page: this.page,
        pageSize: this.pageSize,
        realName: this.realName,
        username: this.username
      };
      findAllMemberByLoginAcc(obj).then(res => {
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
    launchApply(val) {
      this.dialogVisible = true;
      this.form.account = val.ACCOUNT;
      this.form.identify = val.CERT_NO;
      this.form.mobile = val.MOBILE;
      this.form.name = val.NAME;
      this.form.status = val.STATUS.toString();
      this.form.up_account = val.agentAccount;
      this.form.username = val.username;
    },
    // 询问弹出框
    examine(a) {
      this.a = a.name;
      this.b = a.amount;
      this.c = a.mobile;
      this.dialogVisible = true;
      this.ob = a;
    },
    // 确定的回调
    launchSure() {
      this.form.status = Number(this.form.status);
      memberLogoutReview(this.form).then(res => {
        if (res.data.error_code == 200) {
          this.dialogVisible = false;
          this.$message.success(res.data.message);
        } else {
          this.dialogVisible = false;
          this.$message.error(res.data.message);
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
