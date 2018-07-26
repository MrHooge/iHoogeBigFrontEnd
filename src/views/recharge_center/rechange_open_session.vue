<template>
	<div class="app-container">
		<!--    支付 开 停 操作 -->
		<!-- <div class="search">
			<el-input v-model="username"
			          style="width:300px;"
			          placeholder="请输入用户账号进行筛选"></el-input>
		</div> -->
		<el-table :data="tableData"
		          border
		          style="width: 100%; margin-top: 20px">
			<el-table-column label="编号"
			                 align="center"
			                 type="index"
			                 width="120px">
			</el-table-column>
			<el-table-column prop="pay_name"
			                 align="center"
			                 label="类型">
			</el-table-column>
			<el-table-column label="状态"
			                 align="center">
				<template slot-scope="scope">
					{{scope.row.is_open | type}}
				</template>
			</el-table-column>
			<el-table-column prop="pay_picture"
			                 align="center"
			                 label="图片">
			</el-table-column>
			<el-table-column align="center"
			                 width="220px;"
			                 label="操作">
				<template slot-scope="scope">
					<el-button type="primary"
					           @click="handleEdit(scope.row, 'modify')">查看详情</el-button>
				</template>
			</el-table-column>
		</el-table>

	</div>
</template>

<script>
import { findPaySwitch } from "@/api/sys_user";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message, Checkbox } from "element-ui";
import treeTable from "@/components/TreeTable";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
export default {
	data() {
		return {
			pageShow: true,
			tableData: [],
			total: 0,
			username: "",
			viewFormVisible: false,
			tableData3: [], //
			onePeople: {}, // 存选择的某一条数据
			activeNames: ['2'],  //  折叠面板
			gd_rate: '', //  代购返点
			hm_rate: '', // 合买返点
			startDate: '',  // 返点开始
			endDate: '',  // 返点结束
			value1: '',
			value2: '',
		};
	},
	filters: {
		type(a) {
			return a == "0" ? "开启" : "关闭";
		},

	},

	computed: {

	},
	created() {
		this.getTable();
	},
	methods: {
		handleChange(val) {
			console.log(val);
		},
		getTable() {
			//   获取所有会员列表
			findPaySwitch().then(res => {
				if(res.data.error_code==200){
					this.tableData = res.data.data
				}
				console.log(res);

			});
		},
		handleEdit(obj) {
			this.tableData3 = [];
			this.viewFormVisible = true;
			this.tableData3.push(obj);
			console.log(this.tableData3);
			this.onePeople = obj;
			console.log(this.onePeople);
		},

		// 分页的回调
		changepage(val) {
			this.getTable(val);
		},

	}
};

</script>

<style scoped>
.pierce >>> .el-input__inner {
  outline: none;
  border: 0 !important;
  padding: 0;
}
.pierce >>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
  padding-right: 10px;
  padding-left: 30px;
}
</style>
