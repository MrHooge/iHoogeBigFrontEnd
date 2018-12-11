<template>
	<!-- 线上充值流水 -->
	<div class="chongzhi app-container">
		<!-- 顶部筛选 -->
		<div class="topten">
			<el-row :gutter="20">

				<el-col :span="3">

					<div class="grid-content bg-purple">
						<el-input v-model="name"
						          placeholder="请输入查询的账号"
						          clearable></el-input>
					</div>

				</el-col>
				<el-col :span="10">
					<div class="block"
					     style="display: inline-block;">
						<el-date-picker v-model="value1"
						                type="datetime"
						                placeholder="选择日期"
						                value-format="yyyy-MM-dd HH:mm:ss">
						</el-date-picker>
					</div>
					至
					<div class="block"
					     style="display: inline-block;">
						<el-date-picker v-model="value2"
						                type="datetime"
						                placeholder="选择日期"
						                value-format="yyyy-MM-dd HH:mm:ss"
						                default-time="23:59:59">
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
			<el-table-column label="流水号"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.numId }}
				</template>
			</el-table-column>
			<el-table-column label="金额"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.money }}
				</template>
			</el-table-column>
			<el-table-column label="来源"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.source }}
				</template>
			</el-table-column>
			<el-table-column label="支付人"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.payUser }}
				</template>
			</el-table-column>
			<el-table-column label="卡号"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.myCard }}
				</template>
			</el-table-column>
			<el-table-column label="卡主人"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.myName }}
				</template>
			</el-table-column>
			<el-table-column label="支付时间"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.time }}
				</template>
			</el-table-column>
			<el-table-column label="描述"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.state }}
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import setTime from "@/utils/time.js";
import { findQrChargeLine } from "@/api/sys_user";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message, Checkbox } from "element-ui";
import treeTable from "@/components/TreeTable";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
export default {
	data() {
		return {
			name: '',
			value1: '',  //  开始时间
			value2: '',  //  开始时间
			page: 1,
			pageSize: 10,
			totalList: 0,
			tableData: [], //表格的数据
			pageShow: true,
		}
	},
	filters: {
		changeTime(timestamp) {
			var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
			let Y = date.getFullYear() + "-";
			let M =
				(date.getMonth() + 1 < 10
					? "0" + (date.getMonth() + 1)
					: date.getMonth() + 1) + "-";
			let D =
				(date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
			let h = date.getHours() + ":";
			let m = date.getMinutes();
			// let s = date.getSeconds();
			return Y + M + D + h + m;
		}
	},
	created() {
		this.search(this.name, this.value1, this.value2)
	},
	methods: {
		search() {
			this.getdata(this.name, this.value1, this.value2)
		},
		getdata(a, b, c) {
			let obj = {
				name: this.name,
				startTime: this.value1,
				endTime: this.value2,
				page: this.page,
				pageSize: this.pageSize,
			}
			findQrChargeLine(obj).then(res => {
				console.log(res)
				if (res.data.error_code == 200) {
					this.tableData = res.data.data
					console.log(this.tableData)
				} else {
					Message.error(res.data.message);
				}
			})
		}
	}
};
</script>

<style scoped>
div.page {
  /* float: right; */
  padding: 10px 0;
}
.topten {
  padding: 10px 0;
  margin-bottom: 20px;
}
.el-select {
  width: 100px;
}
</style>