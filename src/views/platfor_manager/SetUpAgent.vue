<template>
	<div class="app-container">
		<div class="search">
			<el-input v-model="sjname"
			          placeholder="请输入会员名"
			          style="width:50%;"
								@input="onInput"></el-input>
			<el-button type="primary"
			           icon="el-icon-search"
			           @click="search">搜索</el-button>
		</div>
		<el-table :data="tableData"
		          border
		          style="width: 100%; margin-top: 20px">
			<el-table-column label="编号"
			                 align="center"
			                 type="index"
			                 width="120px">
			</el-table-column>
			<el-table-column prop="ACCOUNT"
			                 align="center"
			                 label="用户名">
			</el-table-column>
			<el-table-column prop="NAME"
			                 align="center"
			                 label="姓名">
			</el-table-column>
			<el-table-column prop="username"
			                 align="center"
			                 label="昵称">
			</el-table-column>
			<el-table-column prop="MOBILE"
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
		<el-dialog title="设置代理或渠道"
		           :visible.sync="viewFormVisible">
			<el-form :model="form">
				<!-- <el-form-item label="角色名称"
				              :label-width="formLabelWidth">
					<el-input v-model="form.role_name"
					          auto-complete="off"></el-input>
				</el-form-item> -->
				<!-- <el-form-item label="角色描述"
				              :label-width="formLabelWidth">
					<el-input v-model="form.role_ID"
					          auto-complete="off"></el-input>
				</el-form-item> -->
				<el-form-item label="权限配置"
				              :label-width="formLabelWidth">
					<el-radio v-model="radio"
					          label="1">设为渠道</el-radio>
					<el-radio v-model="radio"
					          label="2">设为代理</el-radio>
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
import {
	findAllMember,
	handleEdit,
	setMemberToAgent
} from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import {
	Message,
	Checkbox
} from 'element-ui'
import treeTable from '@/components/TreeTable'
import {
	getCookies,
	setCookies,
	removeCookies
} from '@/utils/cookies'
export default {
	data() {
		return {
			sjname: '',
			viewFormVisible: false,
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
			member_id: '',
			radio: '1', //  设置渠道或者代理

		}
	},
	created() {
		this.getTable(1, this.sjname)
	},
	methods: {
		onInput(){
			if (this.sjname=='') {
				this.getTable(1,this,sjname)
			}
		},
		search() {  //  搜索
			this.getTable(1, this.sjname)
		},
		getTable(page, a) { //   获取所有会员列表

			findAllMember(page, a).then(res => {
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
				role_name: data.ACCOUNT
			}
			this.viewFormVisible = true
			// this.getFindRoleAndPermission(data.NAME)
			this.account = data.ACCOUNT
			this.member_id = data.id
		},

		clearForm() { //表单取消按钮
			this.checked = false
			this.viewFormVisible = false

		},
		submitInfos() { // 确定按钮
			if (this.radio == '1') {
				let obj = {
					account: this.account,
					member_id: this.member_id
				}
				handleEdit(obj).then(res => {
					console.log(res)
					if (res.data.error_code == 200) {
						this.viewFormVisible = false
						Message.success(res.data.message)
					} else {
						Message.success(res.data.message)
					}

				})
			} else {
				let obj = {
					QDAccount: '',
					account: this.account
				}
				setMemberToAgent(obj).then(res => {
					console.log(res)
					if (res.data.error_code == 200) {
						this.viewFormVisible = false
						Message.success(res.data.message)
					} else {
						Message.success(res.data.message)
					}
				})
				console.log('设置代理')
			}
		},
		handleCheckChange() {},
		// 分页的回调
		changepage(val) {
			this.getTable(val,this.sjname)
		},
	}
}
</script>

<style scoped>

</style>
