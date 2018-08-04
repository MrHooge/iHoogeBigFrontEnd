<template>
	<div class="custorm app-container">
		<el-row :gutter="10">
			<el-col :span="6">
				<div class="grid-content bg-purple">
					<el-input v-model="input"
					          placeholder="请输入客户名"></el-input>
				</div>
			</el-col>
			<el-col :span="10">
				<el-date-picker v-model="value6"
				                type="datetimerange"
				                start-placeholder="寻票开始日期"
				                end-placeholder="寻票结束日期"
				                :default-time="['12:00:00']">
				</el-date-picker>
			</el-col>
			<el-col :span="3">
				<div class="grid-content bg-purple">
					<el-button type="primary">查询</el-button>
				</div>
			</el-col>
		</el-row>

		<div class="tablebox">
			<el-table :data="tableData"
			          border
			          style="width: 100%;">
				<el-table-column label="编号"
				                 align="center">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.account }}</span>
					</template>
				</el-table-column>

				<el-table-column label="客户昵称"
				                 align="center">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.account }}</span>
					</template>
				</el-table-column>

				<el-table-column label="单号"
				                 align="center">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.planNo }}</span>
					</template>
				</el-table-column>

				<el-table-column label="发起时间"
				                 align="center">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.createDateTime | changeTime}}</span>
					</template>
				</el-table-column>

				<el-table-column label="寻票时间"
				                 align="center">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.findTime | changeTime}}</span>
					</template>
				</el-table-column>
				<!-- <el-table-column label="照片预览"
				                 align="center">
					<template slot-scope="scope">
						<el-button type="primary">点击查看</el-button>
					</template>
				</el-table-column> -->
			</el-table>
			<div class="pages">
				<el-pagination background
				               layout="prev, pager, next"
				               :total="total"
				               :current-page="1"
				               @current-change="changecurr">
				</el-pagination>
			</div>

		</div>
	</div>
</template>

<script>
import { findTicketList } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
// import moment from "moment"
export default {
	data() {
		return {
			input: "",
			total: 0, // 总页数
			value1: "",
			value2: "",
			value6: "",
			tableData: [
			]
		};
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

	},
	created() {
		this.getData(1)
	},
	methods: {
		handleEdit(index, row) {
			console.log(index, row);
		},
		handleDelete(index, row) {
			console.log(index, row);
		},
		// dateFormat:function(row, column) {  
		//     var date = row[column.property];  
		//     if (date == undefined) {  
		//         return "";  
		//     }  
		//     return moment(date).format("YYYY-MM-DD HH:mm:ss");  
		// },
		getData(curr) {
			let obj = { offset: curr, pageSize: 20 }
			findTicketList(obj).then(res => {
				console.log(res)
				if (res.status == 200) {
					if (res.data.findTicketList.list.length > 0) {
						this.total = res.data.findTicketList.total;
						this.tableData = res.data.findTicketList.list;
					} else {
						return;
					}
				}
			})
		},
		// 分页的回调
		changecurr(val) {
			this.getData(val)
			// console.log(val)
		}

	}
};
</script>

<style lang="scss" scoped>
.custorm {
  .tablebox {
    margin-top: 20px;
  }
  .pages {
    float: right;
    padding: 10px 50px;
  }
}
</style>