<template>
	<div app-container>
		<div class="main">
			<el-form :model="ruleForm"
			         :rules="rules"
			         ref="ruleForm"
			         label-width="100px"
			         class="demo-ruleForm">
				<el-form-item label="账户名"
				              prop="accountID">
					<el-input v-model="ruleForm.accountID"></el-input>
				</el-form-item>
				<el-form-item label="流水号"
				              prop="chargeNo">
					<el-input v-model="ruleForm.chargeNo"></el-input>
				</el-form-item>
				<el-form-item label="金额"
				              prop="amount">
					<el-input v-model="ruleForm.amount"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary"
					           @click="submitForm('ruleForm')">确认充值</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
import { chargeFix } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
export default {
	data() {
		return {
			ruleForm: {
				accountID: '',  //请输入账户ID
				chargeNo: '', //请输入流水号
				amount: '',  //请输入金额
			},
			rules: {
				accountID: [
					{ required: true, message: '请输入账户名', trigger: 'blur' },
				],

				chargeNo: [
					{ required: true, message: '请输入流水号', trigger: 'blur' },
				],
				amount: [
					{ required: true, message: '请输入金额', trigger: 'blur' },
				],

			}
		};
	},
	methods: {
		submitForm(formName) {
			let obj = {
				memberId: this.ruleForm.accountID,
				amount: this.ruleForm.amount,
				chargeNo: this.ruleForm.chargeNo,
			}
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log(obj)
					chargeFix(obj).then(res=>{
						console.log(res)
						if(res.data.error_code==200){
							Message.success(res.data.message)
							this.resetForm()
						}else {
							Message.success(res.data.message)
						}
					})
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}
	}
}
</script>

<style scoped>
.main {
  width: 70%;
  padding-top: 30px;
}
</style>
