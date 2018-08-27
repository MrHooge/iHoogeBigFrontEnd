<template>
	<div class="app-container">
		<div class="row">
			<!-- <el-select v-model="datetype"
			           placeholder="请选择时间段"
			           @change="handledate">
				<el-option v-for="item in options"
				           :key="item.value"
				           :label="item.label"
				           :value="item.value">
				</el-option>
			</el-select> -->
			<el-date-picker
            v-model="stime"
            type="date"
            style="margin-bottom:40px;margin-right:20px;width:200px"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd">
            </el-date-picker>            
            <el-date-picker
            v-model="etime"
            align="right"
            value-format="yyyy-MM-dd"
            type="date"
            style="margin-left:10px;
            width:200px
            margin-bottom:40px;"
            placeholder="请选择结束日期"
            >
            </el-date-picker>
			<el-button type="primary"
			           style="margin-left:10%"
			           @click="exportSome">导出</el-button>
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
			<el-table-column label="线下代理授信加款"
			                 prop="officeUnderLineAdd"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.officeUnderLineAdd }}</span>
				</template>
			</el-table-column>
			<el-table-column label="线下运营加款"
			                 prop="operationsUnderLineAdd"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.operationsUnderLineAdd }}</span>
				</template>
			</el-table-column>
			<el-table-column label="线下客服加款"
			                 prop="cusServiceUnderLineAdd"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.cusServiceUnderLineAdd }}</span>
				</template>
			</el-table-column>
			<el-table-column label="线下财务加款"
			                 prop="financialUnderLineAdd"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.financialUnderLineAdd }}</span>
				</template>
			</el-table-column>
			<el-table-column label="易宝"
			                 prop="yibao"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.yibao }}</span>
				</template>
			</el-table-column>
			<el-table-column label="联动"
			                 prop="liandong"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.liandong }}</span>
				</template>
			</el-table-column>
			<el-table-column label="支付宝"
			                 prop="zifubao"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.zifubao }}</span>
				</template>
			</el-table-column>
			<el-table-column label="合计"
			                 prop="allMoney"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.allMoney | commissionUse }}</span>
				</template>
			</el-table-column>
			<el-table-column label="当日提款"
			                 prop="withdrawal"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.withdrawal }}</span>
				</template>
			</el-table-column>
			<el-table-column label="当日赠送"
			                 prop="sendMoney"
			                 align="center">
				<template slot-scope="scope">
					<span>{{ scope.row.sendMoney }}</span>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
import { findFinancialCashInfo, exportExcle } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message, MessageBox } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
	data() {
		return {
			tableData: [], //表格数据
			username: '', // 用户名
			stime:'',
			etime:'',
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
			datetype: '1',
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
			findFinancialCashInfo(model).then(res => {
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
		//合计行的保留两位小数
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
				export2Excel() {

		　　　　},
		　　　formatJson(filterVal, jsonData) {
			　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
		　　　　},
		// 导出
		exportSome() {
			let newobj
			this.tableData.forEach((e, index) => {
				newobj = {
						index: index,
						date: e.date,
						officeUnderLineAdd: e.officeUnderLineAdd.toFixed(2),
						operationsUnderLineAdd: e.operationsUnderLineAdd.toFixed(2),
						cusServiceUnderLineAdd: e.cusServiceUnderLineAdd.toFixed(2),
						financialUnderLineAdd: e.financialUnderLineAdd.toFixed(2),
						yibao: e.yibao.toFixed(2),
						liandong: e.liandong.toFixed(2),
						zifubao: e.zifubao.toFixed(2),
						allMoney: e.allMoney.toFixed(2),
						withdrawal: e.withdrawal.toFixed(2),
						sendMoney: e.sendMoney.toFixed(2)
				}
				this.newarr.push(newobj)
			})
			let model = {
				listParams: JSON.stringify(this.newarr),
				title: '财务现金明细'
			}
			console.log(model)
			exportExcle(model.listParams, model.title)
				.then(res => {})
			require.ensure([], () => {
				const { export_json_to_excel } = require('../../vendor/Export2Excel');
				const tHeader = ['编号', '日期', '线下充值', '提款', '消费', '税后奖金', '当日赠送', '红包嘉奖奖金使用', '彩卡金使用', '佣金使用', '销售佣金', '平台收佣']; //对应表格输出的title
				const filterVal = ['index','date','officeUnderLineAdd','operationsUnderLineAdd','cusServiceUnderLineAdd','financialUnderLineAdd', 'yibao', 'liandong', 'zifubao','allMoney','withdrawal','sendMoney']; // 对应表格输出的数据
				const list = this.tableData;
				console.log(123456789)
				console.log(this.tableData);
				const data = this.formatJson(filterVal, list);
				export_json_to_excel(tHeader, data, '列表excel'); //对应下载文件的名字
			})
		}
	}
}
</script>
<style scoped>
.row {
  padding: 10px 0 20px 0;
}
</style>

