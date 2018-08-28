<template>
	<div class="app-container">
		<el-tabs v-model="activeName2"
		         type="card"
		         @tab-click="handleClick">
			<el-tab-pane label="充值轮播墙"
			             name="first">
				<!-- <v-rechange></v-rechange> -->
			</el-tab-pane>
			<el-tab-pane label="消费轮播墙"
			             name="second"></el-tab-pane>

		</el-tabs>
		<div>
			<el-table :data="tableData"
			          border
			          style="width: 100%">
				<!-- <el-table-column prop="account"
				                 label="会员账号">
				</el-table-column> -->
				<el-table-column prop="username"
				                 label="会员昵称">
				</el-table-column>

				<el-table-column prop="rechargeMoney"
				                 label="金额">

				</el-table-column>
				<!-- <el-table-column prop="rechargeType"
				                 label="类型">
				</el-table-column> -->
				<!-- <el-table-column prop="agentAccount"
				                 label="代理账号">
				</el-table-column> -->
				<el-table-column prop="agentnName"
				                 label="代理昵称">
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
            >
            </el-pagination>
		</div>
	</div>
</template>

<script>
import { findRechargeAndConsumerWall } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
	components: {
	},
	data() {
		return {
			activeName2: 'first',
			tableData: [], //  存储充值消费数据
			page:1,
            pageSize:20,
            totalList: 0,
		}
	},
	created() {
		this.getTableData(1)
	},
	methods: {
		//翻页
        handleCurrentChange(num){
            this.page = num;
            this.handleClick(tab, event)
        },
        //改变页面大小
        handleSizeChange(num){
            this.pageSize = num;
            this.handleClick(tab, event)
        },
		handleClick() {
			// console.log(tab)
			if (this.activeName2 == 'first') {
				this.getTableData(1)
				console.log('11111111111')
			} else {
				this.getTableData(0)
				console.log('22222222222')
			}

		},
		getTableData(a) { //  获取充值消费数据
			let obj = {
				isConsumer: a,
				loginAccount: getCookies('name'),
				page:this.page,
				pageSize:this.pageSize
			}
			findRechargeAndConsumerWall(obj).then(res => {
				console.log(res)
				if (res.data.error_code == 200) {
                    this.tableData = res.data.data
                    this.totalList = res.data.data.total
				}
			})
		}
	}
}
</script>

<style scoped>
</style>
