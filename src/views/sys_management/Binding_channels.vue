<template>
	<div class="app-container">
		<el-table :data="memberfilter"
		          border
		          style="width: 100%"
		          @selection-change="handleSelectionChange">
			<el-table-column type="selection"
			                 align="center">
			</el-table-column>
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
			<el-table-column prop="upName"
			                 align="center"
			                 label="上级">
			</el-table-column>
			<el-table-column prop="grouping"
			                 align="center"
			                 label="分组">
			</el-table-column>
			<!-- <el-table-column align="center"
			                 width="240px;"
			                 label="操作">

				<template slot-scope="scope">
					<el-button type="primary"
					           @click="handleEdit(scope.row, 'modify')">绑定代理</el-button>
				</template>
			</el-table-column> -->
		</el-table>
		<!-- 弹窗事件 -->
		<el-dialog title="提示"
		           :visible.sync="dialogVisible"
		           width="40%">
			<div>
				<el-input v-model="input"
				          placeholder="请输入绑定人账号"></el-input>
			</div>
			<span slot="footer"
			      class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary"
				           @click="makersure">确 定</el-button>
			</span>
		</el-dialog>
		<div slot="footer"
		     class="dialog-footer"
		     v-show="isShow"
		     style="padding:30px 0">
			<el-button type="primary"
			           style="width:100%"
			           @click="cofirm">确 定</el-button>
		</div>
	</div>
</template>

<script>
import { findAllAgentAndQD, setOrUpdateQDtoUser } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
export default {
	components: { treeTable },
	data() {
		return {
			input: '', //  绑定账号
			isShow: false, //  确定按钮
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
		// tableDatalayer() {
		// 	return this.tableData3.filter(name => {
		// 		return name.ACCOUNT.match(this.sjname)
		// 	})
		// }
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
				// console.log(res)
			})
		},

		cofirm() {  //  弹框确定按钮
			// console.log(this.multipleSelection)

			if (this.multipleSelection.length < 1) {
				this.$message('请选择一个代理')
			} else {
				this.dialogVisible = true
			}
		},
		makersure() {
			let arr = '';
			this.multipleSelection.forEach(x => {
				// arr.push(x.ACCOUNT)
					arr +=x.ACCOUNT+','
			})
			console.log(arr)
			if (this.input == '') {
				this.$message('请输入绑定账号')
			} else {
				let obj = {
					is_del: 1, //1 增加,0 删除
					member_account: arr, //渠道账号,渠道账号
					user_account: this.input

				}
				let is_del = 1
				let member_account = arr
				let user_account = this.input
				setOrUpdateQDtoUser(is_del,member_account,user_account).then(res => {
					console.log(res)
					if(res.data.error_code==200){
						this.dialogVisible = false
						Message.success(res.data.message)
					}else {
						Message.success(res.data.message)
					}
				})
			}


		},
		// 选择框的回调
		handleSelectionChange(val) {
			this.multipleSelection = val
			if (val.length > 0) {
				this.isShow = true

			} else {
			
				
				this.isShow = false
			}

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
