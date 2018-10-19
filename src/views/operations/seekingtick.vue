<template>

	<div class="custorm app-container">
		<el-row :gutter="10">
			<el-col :span="4">
				<div class="grid-content bg-purple">
					<el-input v-model="planNo"
					          placeholder="请输入方案编号" clearable></el-input>
				</div>
			</el-col>

			<el-col :span="3">
				<div class="grid-content bg-purple">
					<el-button type="primary"
					           @click="seach">查询</el-button>
				</div>
			</el-col>
		</el-row>

		<div class="tablebox">
			<el-table :data="tableData"
			          border
			          style="width: 100%;">
				<el-table-column label="用户名"
				                 align="center">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.kh_account }}</span>
					</template>
				</el-table-column>

				<el-table-column label="客户昵称"
				                 align="center">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.kh_username }}</span>
					</template>
				</el-table-column>

				<el-table-column label="方案编号"
				                 align="center">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.plan_no }}</span>
					</template>
				</el-table-column>
				<el-table-column label="状态"
				                 align="center">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.status | changeStatus}}</span>
					</template>
				</el-table-column>
				<el-table-column label="寻票状态"
				                 align="center">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{getStr(scope.row.ticket_status)}}</span>
					</template>
				</el-table-column>

				<el-table-column label="发起时间"
				                 align="center">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.create_date_time | changeTime}}</span>
					</template>
				</el-table-column>

				<el-table-column label="寻票时间"
				                 align="center">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.find_time | changeTime}}</span>
					</template>
				</el-table-column>
				<el-table-column label="寻票人用户名"
				                 align="center">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.xp_account }}</span>
					</template>
				</el-table-column>
				<el-table-column label="寻票人昵称"
				                 align="center">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.xp_username }}</span>
					</template>
				</el-table-column>
				<el-table-column label="抄单方案号"
				                 align="center">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.copy_plan_no }}</span>
					</template>
				</el-table-column>
				<el-table-column label="抄单"
				                 align="center">
					<template slot-scope="scope">
						<div v-if="scope.row.copy_status === 1">
							<el-button type="primary"
							           @click="copyMsg(scope.row)">抄单</el-button>
						</div>
						<div v-else></div>

					</template>
				</el-table-column>
				<!-- <el-table-column label="操作"
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
                               v-if="total != ''"
				               :current-page="1"
				               @current-change="changecurr">
				</el-pagination>
			</div>

		</div>
	</div>
</template>

<script>
import { findTicketList2, copyPlan } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
// import moment from "moment"
export default {
	data() {
		return {
			input: "",
			planNo: '', //  方案编号
			total: 0, // 总页数
			tableData: [],
			planNo: '', //  方案编号
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
		},
		changeStatus(a) {
			return a ? '成功' : '驳回'
		},

	},
	created() {
		this.getData(1)
	},
	methods: {
		copyMsg(a) {  //  抄单
			let obj = {
				planNo: a.plan_no
			}
			copyPlan(obj).then(res => {
				if(res.data.error_code === 200){
					Message.success(res.data.message)
				}else {
					Message.error(res.data.message)
				}
			})
		},
		seach() {//  查询按钮
			this.getData()
		},
		handleEdit(index, row) {
		},
		handleDelete(index, row) {
		},
		// dateFormat:function(row, column) {  
		//     var date = row[column.property];  
		//     if (date == undefined) {  
		//         return "";  
		//     }  
		//     return moment(date).format("YYYY-MM-DD HH:mm:ss");  
		// },
		getData(curr) {
			let obj = {
				account: getCookies('name'),
				planNo: this.planNo,  // 方案编号
				type: 2, // 1代理列表 2后台列表
				page: curr,
				pageSize: 20			}
			findTicketList2(obj).then(res => {
				if (res.status == 200) {

					this.total = res.data.data.total;
					this.tableData = res.data.data.list;

				}
			})
		},
		getStr(num) {
			if (num == 1) {
				return "未支付";
			} else if (num == 2) {
				return "已出票";
			} else if (num == 3) {
				return "出票中";
			} else if (num == 4) {
				return "已出票";
			} else if (num == 5) {
				return "已撤单";
			} else if (num == 6) {
				return "已流单";
			} else if (num == 7) {
				return "受理中";
			} else if (num == 8) {
				return "部分出票";
			} else if (num == 9) {
				return "未出票作废";
			} else if (num == 10) {
				return "已过期";
			}
		},
		// 分页的回调
		changecurr(val) {
			this.getData(val)
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