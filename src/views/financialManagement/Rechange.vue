<template>
	<div class="chongzhi app-container">
		<!-- 顶部筛选 -->
		<div class="topten">
			<el-row :gutter="20">
				<el-col :span="3">
					<div class="grid-content bg-purple">
						<el-input v-model="number"
						          placeholder="请输入需要充值的账号" clearable></el-input>
					</div>
				</el-col>
                <el-col :span="3">
					<div class="grid-content bg-purple">
						<el-input v-model="username"
						          placeholder="请输入需要充值的昵称" clearable></el-input>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple">
						<el-button type="primary"
						           icon="el-icon-search"
						           @click="search">搜索</el-button>
					</div>
				</el-col>
			</el-row>
		</div>
		<!-- 表格数据  -->
		<el-table :data="tableData"
		          border
		          style="width: 100%">
			<el-table-column label="用户名"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.account }}
				</template>
			</el-table-column>
			<el-table-column label="可用金额"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.ableBalance |canuse }}
				</template>
			</el-table-column>

			<el-table-column label="冻结金额"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.freezeBalance }}
				</template>
			</el-table-column>

			<el-table-column label="充值金额"
			                 align="center">
				<template slot-scope="scope">
					<el-input v-model="chje"
					          placeholder="请输入需要充值的金额" clearable></el-input>
				</template>
			</el-table-column>

			<el-table-column label="操作"
			                 align="center">
				<template slot-scope="scope">
					<el-button size="mini"
					           :disabled="disabled"
                               
                               type="primary"
					           @click="handleEdit(scope.row)">充值</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
import { getMemberWalletByAccount, xxCharge } from "@/api/sys_user";
import { findAllMember } from "@/api/customer";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message } from "element-ui";
import treeTable from "@/components/TreeTable";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
export default {
  data() {
    return {
      disabled: false,
      number: "", // 输入的账号
      chje: "", //充值的金额
      tableData: [], //表格的数据
      username: "", //输入查询的昵称
      today: "" //存储当前时间戳
    };
  },
  filters: {
    canuse(a) {
      return a.toFixed(2);
    }
  },
  created() {},
  methods: {
    search() {
      if (!this.number && !this.username) {
        this.$message("请输入您要查询的充值账号或昵称！");
      } else {
        if (this.number === "") {
          this.getAccount();
        } else {
          this.accountSearch();
        }
      }
    },
    //用账号搜索
    accountSearch() {
      let obj = {
        account: this.number
      };
      getMemberWalletByAccount(obj).then(res => {
        this.tableData = [];
        if (res.status == 200) {
          this.tableData.push(res.data.data);
        }
      });
    },
    //用昵称查询账号
    getAccount() {
      let obj = {
        username: this.username
      };
      findAllMember(obj).then(res => {
        this.number = res.data.data.list[0].ACCOUNT;
        this.accountSearch();
      });
    },
    handleEdit(a) {
      this.disabled = true;
      this.today = new Date().getTime();
      let obj = {
        account: a.account,
        amount: this.chje,
        sign: this.today
      };
      xxCharge(obj).then(res => {
        if (res.data.success) {
          this.$message.success("充值成功！");
          setTimeout(() => {
            this.disabled = false;
          }, 1200);
          this.chje = "";
        } else {
          this.$message.error("充值失败！");
          setTimeout(() => {
            this.disabled = false;
          }, 1200);
        }
      });
    }
  }
};
</script>

<style scoped>
.topten {
  padding: 10px 0;
  margin-bottom: 20px;
}
</style>