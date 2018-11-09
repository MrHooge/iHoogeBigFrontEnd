<template>
	<div class="app-container">
		<el-input v-model="account" placeholder="请输入账号查询" style="width: 250px;margin-right:70px;margin-bottom:20px;margin-top:40px" @input="newVal" clearable></el-input>
        <el-input v-model="name" placeholder="请输入昵称查询" style="width:15%;" clearable></el-input>
		<el-button type="primary" @click="inquire" style="margin-left:100px;margin-bottom:40px;margin-top:40px">查询</el-button>
		<el-button type="primary" @click="bind" style="margin-left:100px;margin-bottom:40px;margin-top:40px">绑定渠道</el-button>
		<el-table ref="multipleTable"
					:data="tableDatalayer"
					border
					tooltip-effect="dark"
					style="width: 100%"
					@selection-change="handleSelectionChange">
			<el-table-column type="selection"
								align="center">
			</el-table-column>
			<el-table-column label="类型"
								prop="AGENT_TYPE"
								align="center">
				<template slot-scope="scope">{{ scope.row.AGENT_TYPE |type }}</template>
			</el-table-column>
			<el-table-column label="昵称"
								prop="username"
								align="center">
			</el-table-column>
			<el-table-column label="用户名"
								prop="ACCOUNT"
								align="center">
			</el-table-column>
			<el-table-column label="上级用户名"
								prop="upName"
								align="center">
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
		<!-- 弹窗事件 -->
		<el-dialog title="给渠道绑代理"
		           :visible.sync="dialogVisible"
		           width="70%">
			<div class="layerbody">
				<el-table :data="memberfilter"
								border
								style="width: 100%">
					<el-table-column label="编号"
									align="center"
									type="index"
									width="180">
					</el-table-column>
					<el-table-column prop="username"
									align="center"
									label="昵称">
					</el-table-column>
					<el-table-column prop="NAME"
									align="center"
									label="姓名">
					</el-table-column>
					<el-table-column label="类型"
									align="center">
						<template slot-scope="scope">
							{{ scope.row.AGENT_TYPE | type}}
						</template>
					</el-table-column>
					<el-table-column prop="ACCOUNT"
									align="center"
									label="用户名">
					</el-table-column>
					<el-table-column align="center"
									width="240px;"
									label="操作">

						<template slot-scope="scope">
							<el-button type="primary"
									@click="handleEdit(scope.row, 'modify')">绑定渠道</el-button>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { findAllAgentAndQD, addAgency } from "@/api/sys_user";
import { findAllMember } from "@/api/customer";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message } from "element-ui";
import treeTable from "@/components/TreeTable";
export default {
  components: { treeTable },
  data() {
    return {
      account: "",
      tableData: [], //表格数据
      sjname: "", //模糊搜索
      dialogVisible: false,
      tableData3: [], // 弹窗的表格数据
      multipleSelection: [], //选中的数据
      onePeople: {}, // 存选择的某一条数据
      page: 1,
      pageSize: 20,
      totalList: 0,
      name: "" //昵称查询
    };
  },
  filters: {
    type(a) {
      return a ? "代理" : "渠道";
    }
  },
  computed: {
    memberfilter() {
      return this.tableData.filter(name => {
        return name.ACCOUNT.match(this.username);
      });
    },
    tableDatalayer() {
      return this.tableData3.filter(name => {
        return name.ACCOUNT.match(this.sjname);
      });
    }
  },
  created() {
    this.getTable();
  },
  methods: {
    //把代理绑定渠道
    bind() {
      this.getAllQD();
      if (this.multipleSelection && this.multipleSelection.length > 0) {
        this.dialogVisible = true;
      } else {
        this.$message("请至少选择一个!");
      }
    },
    newVal() {
      if (this.account == "") {
        this.getTable();
      }
    },
    //查询
    inquire() {
      if (!this.account && !this.name) {
        this.getTable();
      } else {
        if (this.account === "") {
          this.getAccount();
        } else {
          this.page = 1;
          this.getTable();
        }
      }
    },
    //用昵称查询账号
    getAccount() {
      let obj = {
        username: this.name
      };
      findAllMember(obj).then(res => {
        this.account = res.data.data.list[0].ACCOUNT;
        this.page = 1;
        // this.getUsername()
        this.getTable();
      });
    },
    //翻页
    handleCurrentChange(num) {
      this.page = num;
      this.getTable();
    },
    //改变页面大小
    handleSizeChange(num) {
      this.pageSize = num;
      this.getTable();
    },
    getTable() {
      let obj = {
        page: this.page,
        pageSize: this.pageSize,
        account: this.account
      };
      findAllAgentAndQD(obj).then(res => {
        this.totalList = res.data.data.total;
        this.tableData3 = res.data.data.list.filter((e, index) => {
          //  获取代理数据
          return e.AGENT_TYPE == 1;
        });
      });
    },
    //获取所有渠道数据
    getAllQD() {
      let obj = {
        page: 1,
        pageSize: 10000,
        account: ""
      };
      findAllAgentAndQD(obj).then(res => {
        //  获取渠道数据
        this.tableData = res.data.data.list.filter((e, index) => {
          return e.AGENT_TYPE == 0;
        });
      });
    },
    //  给代理绑定渠道
    handleEdit(a) {
      this.onePeople = a;
      this.cofirm();
    },
    cofirm() {
      //  弹框确定按钮
      if (this.multipleSelection.length < 1) {
        this.$message("请选择一个代理");
      } else {
        let arr = [];
        this.multipleSelection.forEach(x => {
          arr.push(x.member_id);
        });
        let a = this.onePeople.member_id;
        let obj = {};
        obj[a] = arr.join(",");
        addAgency(JSON.stringify(obj)).then(res => {
          if (res.data.error_code == 200) {
            Message.success(res.data.message);
            this.dialogVisible = false;
            this.getTable();
          } else {
            Message.success(res.data.message);
          }
        });
      }
    },
    // 选择框的回调
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style scoped>
.el-dialog__body {
  padding: 30px 20px;
  color: #606266;
  line-height: 24px;
  font-size: 14px;
  height: 600px;
  overflow: auto;
}
</style>
