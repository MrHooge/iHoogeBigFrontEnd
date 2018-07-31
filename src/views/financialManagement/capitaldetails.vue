<template>
	<div class="app-container">
		<!--   财务资金明细 -->
		<div class="row">
			<el-select v-model="datetype"
			           placeholder="请选择时间段"
			           @change="handledate">
				<el-option v-for="item in options"
				           :key="item.value"
				           :label="item.label"
				           :value="item.value">
				</el-option>
			</el-select>
			<!-- <el-button type="primary"
			           style="margin-left:10%;"
			           @click="exportSome">导出</el-button> -->
		</div>
		<el-table :data="tableData"
		          border
		          show-summary
		          :summary-method="getSummaries"
		          style="width: 100%">
			<el-table-column label="编号"
			                 type="index"
			                 align="center">
			</el-table-column>
			<el-table-column label="日期"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.date }}</span>
				</template>
			</el-table-column>
			<el-table-column label="线上充值"
			                 prop="allOnLineMoney"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.allOnLineMoney | commissionUse }}</span>
				</template>
			</el-table-column>
			<el-table-column label="线下充值"
			                 prop="allUnderLineMoney"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.allUnderLineMoney | commissionUse }}</span>
				</template>
			</el-table-column>
			<el-table-column label="提款"
			                 prop="allWithdrawalMoney"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.allWithdrawalMoney | commissionUse }}</span>
				</template>
			</el-table-column>
			<el-table-column label="消费"
			                 prop="allconsumMoney"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.allconsumMoney | commissionUse }}</span>
				</template>
			</el-table-column>
			<el-table-column label="税后奖金"
			                 prop="posttaxPrize"
			                 align="center">
			</el-table-column>
			<el-table-column label="当日赠送"
			                 prop="todaySend"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.todaySend | commissionUse }}</span>
				</template>
			</el-table-column>
			<el-table-column label="红包嘉奖奖金使用"
			                 prop="lotteryCard"
			                 align="center">
			</el-table-column>
			<el-table-column label="彩卡金使用"
			                 prop="lotteryCardUse"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.lotteryCardUse | commissionUse}}</span>
				</template>
			</el-table-column>
			<el-table-column label="佣金使用"
			                 prop="commissionUse"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.commissionUse | commissionUse }}</span>
				</template>
			</el-table-column>
			<el-table-column label="销售佣金"
			                 prop="saleCommissionMoney"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.saleCommissionMoney | commissionUse }}</span>
				</template>
			</el-table-column>
			<el-table-column label="平台收佣"
			                 prop="platformCommissionMoney"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.platformCommissionMoney | commissionUse }}</span>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import { findFinancialMoneyInfo,exportExcle } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
	data() {
		return {
			tableData: [], //表格数据
			username: '', // 用户名
			options: [
				{
					value: '1',
					label: '七天'
				},
				{
					value: '0',
					label: '当前月'
				}
			],
			datetype: '',
			newarr: []
		}
	},
	created() {
		this.getTableList()
	},
	filters: {
		commissionUse(a) {
			return a.toFixed(2)
		}
	},
	methods: {
		// 下拉框的回调
		getval(val) {
			this.getTableList()
		},
		//   筛选数据
		getone() {
			this.getTableList()
		},
		// 对接接口数据
		getTableList() {
			let model = {
				isMonth: this.datetype || 1
			}
			findFinancialMoneyInfo(model).then(res => {
				console.log(res)
				if (res.status == 200) {
					if (res.data.data && res.data.data.length > 0) {
						this.tableData = res.data.data
					}
				}
			})

		},
		// 时间段的回调
		handledate() {
			this.getTableList(this.datetype)
		},
		//   合计的方法
		getSummaries(param) {
			const { columns, data } = param
			const sums = []
			columns.forEach((column, index) => {
				if (index === 0) {
					sums[index] = '合计'
					return
				}
				const values = data.map(item => Number(item[column.property]))
				if (!values.every(value => isNaN(value))) {
					sums[index] = values.reduce((prev, curr) => {
						const value = Number(curr)
						if (!isNaN(value)) {
							let numsum = prev + curr
							let y = numsum.toFixed(2)
							return Number(y)
						} else {
							return prev
						}
					}, 0)
					sums[index] += ' 元'
				} else {
					sums[index] = ''
				}
			})
			return sums
		},
		// exportSome() {
		// 	let newobj
		// 	this.tableData.forEach((e, index) => {
		// 		newobj = {
		// 			"编号": index + 1,
		// 			"日期": e.date,
		// 			"线下充值": e.allUnderLineMoney.toFixed(2),
		// 			"提款": e.commissionUse.toFixed(2),
		// 			"消费": e.allconsumMoney.toFixed(2),
		// 			"税后奖金": e.posttaxPrize.toFixed(2),
		// 			"当日赠送": e.todaySend.toFixed(2),
		// 			"红包嘉奖奖金使用": e.lotteryCard.toFixed(2),
		// 			"彩卡金使用": e.lotteryCardUse.toFixed(2),
		// 			"佣金使用": e.commissionUse.toFixed(2),
		// 			"销售佣金": e.saleCommissionMoney.toFixed(2),
		// 			"平台收佣": e.platformCommissionMoney.toFixed(2)
		// 		}
		// 		this.newarr.push(newobj)
		// 	})
		// 	let model = {
		// 		listParams: JSON.stringify(this.newarr),
		// 		title: '财务资金明细'
		// 	}
		// 	console.log(model)
		// 	// this.$http
		// 	// 	.post(api.member + '/user/exportExcle', {
		// 	// 		params: model
		// 	// 	})
		// 	// 	.then(res => { })
		// 		 exportExcle(model).then(res=>{
		// 			 	console.log(res)
		// 		 })
		// }
	}
}
</script>
<style scoped>
.row {
  padding: 10px 0 20px 0;
}
</style>

