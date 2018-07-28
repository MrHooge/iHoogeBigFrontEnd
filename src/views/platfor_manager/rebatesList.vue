<template>
	<div class="app-container">
		<div class="search">
			<el-input v-model="username"
			          style="width:300px;"
			          placeholder="请输入用户账号进行筛选"></el-input>
		</div>
		<el-table :data="memberfilter"
		          border
		          style="width: 100%; margin-top: 20px">
			<el-table-column label="编号"
			                 align="center"
			                 type="index"
			                 width="120px">
			</el-table-column>
			<el-table-column prop="ACCOUNT"
			                 align="center"
			                 label="会员账号">
			</el-table-column>
			<el-table-column label="类型"
			                 align="center">
				<!-- <template slot-scope="scope">
					<div v-if="scope.row.LOTTERY_TYPE=='38'">竞彩足球</div>
					<div v-else>竞彩篮球</div>
				</template> -->
				<template slot-scope="scope">
					{{scope.row.LOTTERY_TYPE | type}}
				</template>
			</el-table-column>
			<el-table-column prop="CREATE_DATE"
			                 align="center"
			                 label="时间">
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
		<div class="page"
		     v-show="pageShow">
			<el-pagination background
			               :page-size=20
			               @current-change="changepage"
			               layout="prev, pager, next"
			               :total="total">
			</el-pagination>
		</div>
		<!-- 修改角色信息 -->
		<el-dialog title="修改角色信息"
		           :visible.sync="viewFormVisible">
			{{ onePeople}}
			<el-table ref="multipleTable"
			          border
			          tooltip-effect="dark"
			          style="width: 100%">
				<el-table-column label="类型"
				                 align="center">
												 <div>123</div>
					<!-- <template slot-scope="scope">{{ onePeople.ACCOUNT}}</template> -->
				</el-table-column>
				<el-table-column label="用户名"
				                 align="center">
					<!-- <template slot-scope="scope">{{ onePeople.ACCOUNT }}</template> -->
					 <div>123</div>
				</el-table-column>
				<el-table-column label="昵称"
				                 align="center">
					<!-- <template slot-scope="scope">{{ onePeople.ACCOUNT }}</template> -->
				</el-table-column>
			</el-table>
			<!-- <div slot="footer"
			     class="dialog-footer">
				<el-button @click="clearForm">取 消</el-button>
				<el-button type="primary"
				           @click="submitInfos">确 定</el-button>
			</div> -->
		</el-dialog>
	</div>
</template>

<script>
import { findAllRate } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message, Checkbox } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
	data() {
		return {
			pageShow: true,
			tableData: [],
			total: 0,
			username: '',
			viewFormVisible: false,
			tableData3: [], // 
			onePeople: {}, // 存选择的某一条数据
		}
	},
	filters: {
		type(a) {
			return a == '38' ? '竞彩足球' : '竞彩篮球'
		}
	},
	computed: {
		memberfilter: function () {
			if (this.username == '') {
				this.pageShow = true
			} else {
				this.pageShow = false
			}
			return this.tableData.filter(name => {
				return name.ACCOUNT.match(this.username)
			})
		},
		// tableDatalayer() {
		// 	return this.tableData3.filter(name => {
		// 		return name.ACCOUNT.match(this.sjname)
		// 	})
		// }

	},
	created() {
		this.getTable(1, 20)
	},
	methods: {
		getTable(page, pageSize) { //   获取所有会员列表
			findAllRate(page, pageSize).then(res => {
				console.log(res)
				this.tableData = res.data.data.list
				this.total = res.data.data.total
			})
		},
		// getData(page) {
		// 	findAllRate(page,).then(res => {
		// 		console.log(res)
		// 	})
		// },
		handleEdit(a) {
			this.viewFormVisible = true
			this.onePeople = a
			console.log(this.onePeople)

		},
		// 分页的回调
		changepage(val) {
			this.getTable(val)
		},
	}
}
</script>

<style scoped>
</style>
