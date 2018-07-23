<template>
	<div class="app-container">
		<el-button v-waves type="primary">添加角色</el-button>
		<el-table :data="tableData"
		          border
		          style="width: 100%; margin-top: 20px">
			<el-table-column label="编号"
			                 align="center"
			                 type="index"
											 width="120px">
			</el-table-column>
			<el-table-column prop="account"
			                 align="center"
			                 label="用户名">
			</el-table-column>
			<el-table-column prop="name"
			                 align="center"
			                 label="姓名">
			</el-table-column>
			<el-table-column prop="username"
			                 align="center"
			                 label="昵称">
			</el-table-column>
			<el-table-column prop="mobile"
			                 align="center"
			                 label="手机号">
			</el-table-column>
			<el-table-column align="center"
			                 width="220px;"
			                 label="操作">
				<template slot-scope="scope">
					<div>
						<el-button type="primary"
						           @click="showDailag(scope.row, 'modify')"
						           icon="el-icon-edit"></el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>
		<div class="page">
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
			<el-form :model="form">
				<el-form-item label="角色名称"
				              :label-width="formLabelWidth">
					<el-input v-model="form.role_name"
					          auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="角色描述"
				              :label-width="formLabelWidth">
					<el-input v-model="form.role_ID"
					          auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="权限配置"
				              :label-width="formLabelWidth">
					<el-checkbox v-model="checked">设置渠道</el-checkbox>
				</el-form-item>
			</el-form>
			<div slot="footer"
			     class="dialog-footer">
				<el-button @click="clearForm">取 消</el-button>
				<el-button type="primary"
				           @click="submitInfos">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { findAllMember, handleEdit } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message, Checkbox } from 'element-ui'
import treeTable from '@/components/TreeTable'
export default {
	data() {
		return {
			viewFormVisible: false,
			checked: false,
			viewFormType: 'view',
			formLabelWidth: '120px',
			tableData: [], //表格数据
			username: '',
			total: 0,
			form: {
				role_ID: '',
				role_name: '',
				type: [],
			},
			account: '',
			member_id: ''

		}
	},
	created() {
		this.getTable(1)
	},
	methods: {
		getTable(page, pageSize) { //   获取所有会员列表
			findAllMember(page, pageSize).then(res => {
				console.log(res)
				this.tableData = res.data.data.list
				this.total = res.data.data.total
			})
		},
		//  渠道设置
		showDailag(data, type) {
			this.viewFormType = type
			this.form = {
				role_ID: data.id,
				role_name: data.account
			}
			this.viewFormVisible = true
			// this.getFindRoleAndPermission(data.NAME)
			this.account = data.account
			this.member_id = data.id
		},

		clearForm() { //表单取消按钮
		this.checked = false
			this.viewFormVisible = false
			
		},
		submitInfos() {  // 确定按钮
			if (this.checked) {
				let obj = {
					account: this.account,
					member_id: this.member_id
				}
				handleEdit(obj).then(res => {
					console.log(res)
					if(res.data.error_code==200){
						this.checked = false
						this.viewFormVisible = false
						Message.success(res.data.message)
					}
				
				})
			} else {
				// this.viewFormVisible = false
			}
		},
		handleCheckChange() {
			console.log('123456')
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
