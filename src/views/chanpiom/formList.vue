<template>
	<div class="app-container">
		<!-- 设置会员返点 -->
		<div class="search">
			账号：
			<el-input v-model="account"
			          placeholder="请输入账号"
			          style="width: 150px;margin-right:100px;margin-top:40px;margin-bottom:20px;"
			          clearable></el-input>
			订单号：
			<el-input v-model="planId"
			          placeholder="请输入订单号"
			          style="width: 150px;margin-right:100px;margin-top:40px;margin-bottom:20px;"
			          clearable></el-input>
			开始时间：
			<el-date-picker v-model="start_time"
			                type="datetime"
			                style="margin-bottom:40px;margin-right:20px;width:200px"
			                placeholder="请选择开始日期"
			                value-format="yyyy-MM-dd HH:mm:ss">
			</el-date-picker>

			结束时间：
			<el-date-picker v-model="end_time"
			                align="right"
			                value-format="yyyy-MM-dd HH:mm:ss"
			                default-time="23:59:59"
			                type="datetime"
			                style="margin-left:10px;
                width:200px
                margin-bottom:40px;"
			                placeholder="请选择结束日期">
			</el-date-picker>
			<el-button type="primary"
			           icon="el-icon-search"
			           @click="search">搜索
			</el-button>
		</div>
		<el-table :data="tableData"
		          border
		          style="width: 100%; margin-top: 20px">
			<el-table-column label="订单id"
			                 align="center"
			                 prop="id"
			                 width="120px">
			</el-table-column>
			<el-table-column label="类型"
			                 align="center"
			                 width="120px">
				<template slot-scope="scope">
					{{scope.row.type | type}}
				</template>
			</el-table-column>
			<el-table-column prop="account"
			                 align="center"
			                 label="用户名">
			</el-table-column>
			<el-table-column prop="perAmount"
			                 align="center"
			                 label="单价">
			</el-table-column>
			<el-table-column prop="multiple"
			                 align="center"
			                 label="倍数">
			</el-table-column>
			<el-table-column prop="amount"
			                 align="center"
			                 label="总金额">
			</el-table-column>

			<el-table-column prop="bingoMoney"
			                 align="center"
			                 label="中奖金额">
			</el-table-column>
			<el-table-column prop="orderNo"
			                 align="center"
			                 label="订单号">
			</el-table-column>
			<el-table-column align="center"
			                 label="出票状态">
				<template slot-scope="scope">
					{{scope.row.ticketStatus | ticket}}
				</template>

			</el-table-column>
			<el-table-column align="center"
			                 label="中奖状态">
				<template slot-scope="scope">
					{{scope.row.bingoStatus | status}}
				</template>

			</el-table-column>
			<el-table-column align="center"
			                 label="购买时间">
				<template slot-scope="scope">
					{{scope.row.createTime | changeTime}}
				</template>
			</el-table-column>
			<el-table-column align="center"
			                 width="220px;"
			                 label="操作">
				<template slot-scope="scope">
					<div>
						<el-button type="primary"
						           @click="showDailag(scope.row, 'modify')">详情</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>
		<!-- <div class="page">
			<el-pagination background
			               @size-change="handleSizeChange"
			               @current-change="handleCurrentChange"
			               :current-page="page"
			               :page-sizes="[10, 20, 30, 40, 50]"
			               :page-size="pageSize"
			               layout="total, sizes, prev, pager, next, jumper"
			               :total="totalList"
			               v-if="tableData!=''">
			</el-pagination>
		</div> -->
		<!-- 详情信息 -->
		<el-dialog title="提示"
		           :visible.sync="dialogVisible"
		           width="30%">
			<el-table :data="itemData"
			          border
			          style="width: 100%; margin-top: 20px">
				<el-table-column label="订单id"
				                 align="center"
				                 prop="planId"
				                 width="120px">
				</el-table-column>
				<el-table-column label="赛事"
				                 align="center"
				                 prop="teamName">
				</el-table-column>
				<el-table-column label="SP"
				                 align="center"
				                 prop="sp">
				</el-table-column>

				<el-table-column align="center"
				                 label="状态">
					<template slot-scope="scope">
						{{scope.row.status | MsgStatus}}
					</template>
				</el-table-column>
			</el-table>
			<span slot="footer"
			      class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary"
				           @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
import setTime from '@/utils/time.js'
import { getAllPlanList } from "@/api/period";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message } from "element-ui";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
export default {
	data() {
		return {
			dialogVisible: false, //  弹框
			tableData: [], //  存储 数据
			account: '',   //账号
			end_time: '',    //结束时间
			planId: '',  //手机号
			page: 1,
			pageSize: 20,
			start_time: '',  //开始时间
			itemData: [], //  存储选中的数据
		}
	},
	created() {
		this.getTable()
	},
	filters: {
		status(a) {
			if (a == 0) {
				return '未开奖'
			} else if (a == 1) {
				return '中奖'
			} else if (a == 2) {
				return '未中奖'
			}
		},
		MsgStatus(a) {
			if (a == 0) {
				return '待定'
			} else if (a == 1) {
				return '中奖'
			} else if (a == 2) {
				return '未中奖'
			}
		},
		ticket(a) {
			if (a == 0) {
				return '未出票'
			} else if (a == 1) {
				return '出票中'
			} else if (a == 2) {
				return '已出票'
			} else if (a == 3) {
				return '出票失败'
			}
		},
		type(a) {
			if (a == 1) {
				return '猜冠军'
			} else if (a == 2) {
				return '猜冠亚军'
			}
		},
		changeTime(a) {
			return setTime(a)
		}
	},
	methods: {

		showDailag(a) {  //  每条数据详情
			this.itemData = a.planMatchList
			console.log(a)
			console.log(this.itemData)
			this.dialogVisible = true
		},

		search() {  //  搜索按钮
			this.page = 1
			this.pageSize = 20
			this.getTable()
		},
		changeStatus(val) {
			return this.value = val
		},
		//翻页
		handleCurrentChange(num) {
			this.page = num;
			this.getTable()
		},
		//改变页面大小
		handleSizeChange(num) {
			this.pageSize = num;
			this.getTable()
		},

		//获取表格数据
		getTable() {
			let obj = {
				account: this.account,
				endTime: this.end_time || '',
				offset: this.page,
				pageSize: this.pageSize,
				planId: this.planId,
				startTime: this.start_time || '',
			}
			getAllPlanList(obj).then(res => {
				console.log(res)
				if (res.data.error_code === 200) {
					this.tableData = res.data.data
					this.totalList = res.data.total
				} else {
					Message.error(res.data.message)
				}
			}).catch(error => {
				Message.error(error)
			})
		},


		// 分页的回调
		changepage(val) {
			this.getTable(val, this.account)
		},
	}
}
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
