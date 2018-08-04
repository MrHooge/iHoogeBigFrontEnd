<template>
	<div class="robot app-container">
		<div class="btn">
			<el-button type="primary"
			           @click="addjqr">
				添加机器人
			</el-button>
		</div>
		<!-- 机器人列表 -->
		<el-table :data="tableData"
		          border
		          style="width: 100%">
			<el-table-column prop="account"
			                 align="center"
			                 label="用户名">
			</el-table-column>
			<el-table-column prop="certNo"
			                 align="center"
			                 label="身份证号">
			</el-table-column>
			<el-table-column prop="username"
			                 align="center"
			                 label="昵称">
			</el-table-column>
			<el-table-column prop="mobile"
			                 align="center"
			                 label="电话">
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<div class="page">
			<el-pagination background
			               @current-change="currpage"
			               :page-size="pages"
			               layout="prev, pager, next"
			               :total="total">
			</el-pagination>
		</div>
		<!-- 添加机器人弹窗 -->
		<el-dialog title="添加机器人"
		           :visible.sync="dialogVisible"
		           width="500px">
			<el-row>
				<el-col :span="4">
					<div class="grid-content bg-purple">
						昵称
					</div>
				</el-col>
				<el-col :span="12">
					<div class="grid-content bg-purple-light">
						<el-input v-model="uname"
						          placeholder="请输入昵称"
						          min="0"></el-input>
					</div>
				</el-col>
			</el-row>
			<br>
			<el-row>
				<el-col :span="4">
					<div class="grid-content bg-purple">
						手机号
					</div>
				</el-col>
				<el-col :span="12">
					<div class="grid-content bg-purple-light">
						<el-input v-model="phonenum"
						          placeholder="请输入手机号"
						          type="number"
						          min="0"></el-input>
					</div>
				</el-col>
			</el-row>
			<br>
			<el-row>
				<el-col :span="4">
					<div class="grid-content bg-purple">
						身份证
					</div>
				</el-col>
				<el-col :span="12">
					<div class="grid-content bg-purple-light">
						<el-input v-model="cardnum"
						          placeholder="请输入身份证号"
						          min="0"></el-input>
					</div>
				</el-col>
			</el-row>
			<br>
			<span slot="footer"
			      class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary"
				           @click="sure">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { getRobotList, addRobot } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
	data() {
		return {
			tableData: [], //表格数据
			pages: 20,
			dialogVisible: false,
			total: 0,
			uname: '',
			phonenum: '',
			cardnum: ''
		}
	},
	created() {
		this.getTable(1)
	},
	methods: {
		getTable(curr) {   //  查询所有机器人
			let obj = {
				offset: curr,
				pageSize: 20
			}
			getRobotList(obj).then(res => {
				console.log(res)
				if (res.data.error_code == 200) {
					this.tableData = res.data.data.list
					this.total = res.data.data.total

				}
			})
			// this.$ajax
			//     .get(api.member + '/userManage/getRobotList', obj)
			//     .then(res => {
			//         this.tableData = res.data.list
			//         this.total = res.data.total
			//     })
		},
		addjqr() {
			this.dialogVisible = true
		},
		sure() {
			if (!this.uname) {
				Message.success('请输入昵称')
			} else if (!this.phonenum) {
				Message.success('请输入手机号')
			} else if (!this.cardnum) {
				Message.success('请输入身份证号')
			} else {
				let model = {
					certNo: this.cardnum,
					mobile: this.phonenum,
					userName: this.uname
				}
				addRobot(model).then(res => {
					console.log(res)
					if (res.error_code == 200) {
						Message.success(res.data.message)
						this.getTable(1)
						this.dialogVisible = false
					} else {
						Message.success(res.data.message)
					}
				})
			}
		},
		// 分页回调
		currpage(val) {
			this.getTable(val)
		}
	}
}
</script>

<style scoped>
div.btn {
  padding-bottom: 0.5rem;
}
</style>