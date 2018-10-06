<template>
	<!-- 线上充值流水 -->
	<div class="chongzhi app-container">
		<!-- 顶部筛选 -->
		<div class="topten">
			<el-row :gutter="20">
				<el-col :span="6">
					<div class="grid-content bg-purple">
						<el-input v-model="name"
						          placeholder="请输入查询的账号"
						          @input="onInput" clearable></el-input>
					</div>

				</el-col>
				<el-col :span="12">
					<div class="block"
					     style="display: inline-block;">
						<el-date-picker v-model="value1"
						                type="date"
						                placeholder="选择日期"
						                format="yyyy-MM-dd"
						                value-format="yyyy-MM-dd">
						</el-date-picker>
					</div>
					至
					<div class="block"
					     style="display: inline-block;">
						<el-date-picker v-model="value2"
						                type="date"
						                placeholder="选择日期"
						                format="yyyy-MM-dd"
						                value-format="yyyy-MM-dd">
						</el-date-picker>
					</div>
				</el-col>

				<el-col :span="2">
					<div class="grid-content bg-purple"
					     @click="search">
						<el-button type="primary"
						           icon="el-icon-search">搜索</el-button>
					</div>
				</el-col>
			</el-row>
		</div>
		<!-- 表格数据  -->
		<el-table :data="tableData"
		          border
		          style="width: 100%">

			<el-table-column label="客户账号"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.ACCOUNT }}
				</template>
			</el-table-column>
			<el-table-column label="客户昵称"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.username }}
				</template>
			</el-table-column>
			<el-table-column label="流水号"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.wallet_Line_No }}
				</template>
			</el-table-column>
			<el-table-column label="类别"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.species }}
				</template>
			</el-table-column>
			<el-table-column label="时间"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.CREATE_DATE_TIME |changeTime }}
				</template>
			</el-table-column>
			<el-table-column label="充值补单人"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.rechargeCompensation }}
				</template>
			</el-table-column>

		</el-table>
		<!-- 弹窗事件 -->
		<!-- <el-dialog title="提示"
		           :visible.sync="dialogVisible"
		           width="40%">
			<div>
				<p>会员名：{{ username }}</p>
				<p>额度：{{ money }}</p>
			</div>
			<span slot="footer"
			      class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary"
				           @click="makersure">确 定</el-button>
			</span>
		</el-dialog> -->
	</div>
</template>

<script>
import { findRechargeOnLine } from "@/api/sys_user";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message, Checkbox } from "element-ui";
import treeTable from "@/components/TreeTable";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
export default {
	data() {
		return {
			name: "", // 用户名
			number: "", // 充值的金额
			total: 0, // 总页数
			tableData: [],//表格的数据
			dialogVisible: false,
			username: '',
			money: '',
			value1: '',
			value2: ''


		};
	},
	created() {
		// this.search(1)
		this.getData(this.name, this.value1, this.value2)
	},
	methods: {
		onInput() {
			if (this.name == '') {
				this.getData(this.name, this.value1, this.value2)
			}
			console.log(this.name)
		},
		search() {
			this.getData(this.name, this.value1, this.value2)
		},
		getData(a, b, c) {
			let obj = {
				loginAccount: getCookies('name'),
				agentName: a,
				startTime: b,
				endTime: c,
			}
			console.log(obj)
			findRechargeOnLine(obj).then(res => {
				console.log(res)
				if (res.status == 200) {
					this.tableData = res.data.data
					this.total = res.data.totalCount
				}
			})
		},
	},
	filters: {
		changeTime(timestamp) {
			var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			let Y = date.getFullYear() + '-';
			let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
			let h = date.getHours() + ':';
			let m = date.getMinutes();
			// let s = date.getSeconds();
			return Y + M + D + h + m;
		}

	}
};
</script>

<style scoped>
div.page {
  float: right;
  padding: 10px 0;
}
.topten {
  padding: 10px 0;
  margin-bottom: 20px;
}
</style>