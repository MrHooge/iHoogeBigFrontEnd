<template>
	<div class="checkout app-container">
		<el-button type="primary"
		           @click="zigou">自购</el-button>
		<el-button type="danger"
		           @click="gendan">跟单</el-button>
		<el-dialog :title="tname"
		           :visible.sync="dialogVisible"
		           width="600px">
			<div class="layers">
				<el-row :gutter="20">
					<el-col :span="4">
						<div class="grid-content bg-purple leftbox">
							本金:
						</div>
					</el-col>
					<el-col :span="19">
						<div class="grid-content bg-purple">
							<el-input v-model="amount"
							          placeholder="请输入本金"
							          style="width:200px;" clearable></el-input>
						</div>
					</el-col>
				</el-row>
				<br>
				<el-row :gutter="20">
					<el-col :span="4">
						<div class="grid-content bg-purple leftbox">
							预测奖金:
						</div>
					</el-col>
					<el-col :span="19">
						<div class="grid-content bg-purple">
							<el-input v-model="bonus"
							          placeholder="请输入预测奖金"
							          style="width:200px;" clearable></el-input>
						</div>
					</el-col>
				</el-row>
				<br>
				<el-row :gutter="20">
					<el-col :span="4">
						<div class="grid-content bg-purple leftbox">
							状态:
						</div>
					</el-col>
					<el-col :span="19">
						<div class="grid-content bg-purple">
							<el-radio v-model="radio8"
							          label="1"
							          border>判断</el-radio>
							<el-radio v-model="radio8"
							          label="2"
							          border>自动</el-radio>
							<el-radio v-model="radio8"
							          label="3"
							          border>渠道</el-radio>
						</div>
					</el-col>
				</el-row>
			</div>
			<span slot="footer"
			      class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary"
				           @click="selfbuy(a)"
				           v-if="a==1">确 定</el-button>
				<el-button type="primary"
				           @click="flows(a)"
				           v-else>确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { getTicketConfig, updateTicketConfig } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'

export default {
	data() {
		return {
			amount: '',
			bonus: '',
			tname: '',
			a: '',
			dialogVisible: false,
			radio8: ''
		}
	},
	methods: {
		zigou() {
			this.dialogVisible = true
			this.tname = '自购出票参数编辑'
			this.a = 1
			this.getArguments(1)
		},
		gendan() {
			this.dialogVisible = true
			this.tname = '跟单出票参数编辑'
			this.a = 0
			this.getArguments(0)
		},
		getArguments(a) {
			let obj = {
				isSuper: a,
			}
			getTicketConfig(obj).then(res => {
				if (res.error_code == 200) {
					this.amount = res.data.amount
					this.radio8 = String(res.data.status)
					this.bonus = res.data.bonus
				}
			})
		},
		// 自购编辑
		selfbuy(a) {
			this.edit(a)

		},
		// 跟单编辑
		flows(a) {
			this.edit(a)
		},
		edit(a) {
			let model = {
				amount: this.amount,
				bonus: this.bonus,
				isSuper: a,
				status: this.radio8
			}
			updateTicketConfig(model).then(res => {
				if (res.data.error_code == 200) {
					this.$message(res.data.message)
					this.dialogVisible = false;
				}
		
		})
		// this.$ajax.get(api.ticket + '/ticket/updateTicketConfig', model).then(res => {
		// 	if (res.error_code == 200) {
		// 		this.$message(res.message)
		// 		this.dialogVisible = false;
		// 	}
		// })
	}
}
}
</script>

<style scoped>
div.box {
  width: 50px;
  height: 30px;
}
div.leftbox {
  width: 80px;
  line-height: 31px;
  font-size: 14px;
  text-align: right;
}
.moeny {
  margin-left: 50px;
  margin-top: 45px;
}
</style>