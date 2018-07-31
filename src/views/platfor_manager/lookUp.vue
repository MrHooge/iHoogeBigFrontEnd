<template>
	<div class="app-container">
		<el-table :data="memberfilter"
		          border
		          style="width: 100%">
			<el-table-column label="编号"
			                 align="center"
			                 type="index"
			                 width="180">
			</el-table-column>
			<el-table-column label="类型"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.AGENT_TYPE | type}}
				</template>
			</el-table-column>
			<el-table-column prop="ACCOUNT"
			                 align="center"
			                 label="用户名">
			</el-table-column>
			<el-table-column prop="username"
			                 align="center"
			                 label="昵称">
			</el-table-column>
			<el-table-column prop="name"
			                 align="center"
			                 label="姓名">
			</el-table-column>
			<el-table-column align="center"
			                 width="240px;"
			                 label="操作">

				<template slot-scope="scope">
					<el-button type="primary"
					           @click="handleEdit(scope.row, 'modify')">绑定代理</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 弹窗事件 -->
		<el-dialog title="给渠道绑代理"
		           :visible.sync="dialogVisible"
		           width="70%">
			<div class="layerbody"
			     style="height: 600px;overflow: auto;">
				<div style="width：300px; padding: 10px;">
					<el-input v-model="sjname"
					          placeholder="请输入用户名进行查询"></el-input>
				</div>
				<el-table ref="multipleTable"
				          :data="tableDatalayer"
				          border
				          tooltip-effect="dark"
				          style="width: 100%"
				          @selection-change="handleSelectionChange">
					<el-table-column type="selection"
					                 align="center">
					</el-table-column>
					<el-table-column label="类型"
					                 prop="AGENT_TYPE"
					                 align="center">
						<template slot-scope="scope">{{ scope.row.AGENT_TYPE |type }}</template>
					</el-table-column>
					<el-table-column label="用户名"
					                 prop="ACCOUNT"
					                 align="center">
						<template slot-scope="scope">{{ scope.row.ACCOUNT }}</template>
					</el-table-column>
					<el-table-column label="昵称"
					                 prop="username"
					                 align="center">
						<template slot-scope="scope">{{ scope.row.username }}</template>
					</el-table-column>
				</el-table>
			</div>
			<span slot="footer"
			      class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary"
				           @click="cofirm">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { findAllAgentAndQD,addAgency } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
export default {
	components: { treeTable },
	data() {
		return {
			tableData: [], //表格数据
			sjname: '',//模糊搜索
			dialogVisible: false,
			tableData3: [], // 弹窗的表格数据
			multipleSelection: [], //选中的数据
			onePeople: {}, // 存选择的某一条数据
		}
	},
	filters: {
		type(a) {
			
			return a ? '代理' : '渠道'
		}
	},
	computed: {
		memberfilter() {
			return this.tableData.filter(name => {
				return name.ACCOUNT.match(this.username)
			})
		},
		tableDatalayer() {
			return this.tableData3.filter(name => {
				return name.ACCOUNT.match(this.sjname)
			})
		}
	},
	created() {
		this.getTable()
	},
	methods: {
		getTable() {
			findAllAgentAndQD().then(res => {  //  获取渠道数据
				this.tableData = res.data.data.filter((e, index) => {
					return e.AGENT_TYPE == 0
				})
				this.tableData3 = res.data.data.filter((e, index) => {   //  获取代理数据
					return e.AGENT_TYPE == 1
				})
				// console.log(res)
			})
		},
		//  给渠道绑定代理
		handleEdit(a) {
			this.dialogVisible = true
			this.onePeople = a
			console.log(a)

		},
		cofirm() {  //  弹框确定按钮
			if (this.multipleSelection.length < 1) {
				this.$message('请选择一个代理')
			} else {
				let arr = [];
				// console.log(this.multipleSelection)
				// console.log(arr)
				this.multipleSelection.forEach(x => {
					arr.push(x.member_id)
				})
				let a = this.onePeople.member_id
				let obj = {}
				obj[a] = arr.join(',')
				addAgency(JSON.stringify(obj)).then(res => {
				// console.log(res)
					if (res.data.error_code == 200) {
						console.log(res)
						Message.success(res.data.message)
						this.dialogVisible = false
						// this.multipleSelection = []
					} else {
						Message.success(res.data.message)
					}
				})

			}
		},
		// 选择框的回调
		handleSelectionChange(val) {
			this.multipleSelection = val
			console.log(val)
		},
	},





}
</script>

<style scoped>
.el-dialog__body {
  padding: 30px 20px;
  color: #606266;
  line-height: 24px;
  font-size: 14px;
  height: 600px;
  overflow: auto;
}
</style>
