<template>
	<!-- 资金冲正 -->
	<div app-container>
		<div class="main">
			<el-form :model="ruleForm"
			         :rules="rules"
			         ref="ruleForm"
			         label-width="100px"
			         class="demo-ruleForm">
				<el-form-item label="账号"
				              prop="accountID">
					<el-input v-model="ruleForm.accountID" clearable></el-input>
				</el-form-item>
				<p style="color:red;font-size:14px;margin-left:100px;">注：当不知道账号时可用昵称查询！</p>
				<el-form-item label="昵称">
					<el-input v-model="username" clearable style="width:90%;margin-right:30px;"></el-input><el-button type="primary" @click="search">查询</el-button>
				</el-form-item>
				<el-form-item label="金额"
				              prop="amount">
					<el-input v-model="ruleForm.amount" clearable></el-input>
                    <span>只能输入正数！！！</span>
				</el-form-item>
				<el-form-item label="描述"
				              prop="des">
					<el-input type="textarea"
					          v-model="ruleForm.des" clearable></el-input>
                              
				</el-form-item>
				<el-form-item>
					<el-button type="primary"
					           :disabled="disable"
					           @click="submitForm('ruleForm')">确认</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-radio v-model="radio" label="1" border style="margin-left:20px;">扣可提现余额</el-radio>
                    <el-radio v-model="radio" label="2" border>不扣可提现余额</el-radio>
				</el-form-item>
                    
			</el-form>
		</div>
	</div>
</template>

<script>
import { chargeRight } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { findAllMember} from '@/api/customer'
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
export default {
	data() {
		return {
            disable: false,
            radio: '1',     //选择是否扣可提现余额
			ruleForm: {
				accountID: '',  //请输入账户ID
				des: '', //请输入描述信息
				amount: '',  //请输入金额
			},
			rules: {
				accountID: [
					{ required: true, message: '请输入账户名', trigger: 'blur' },
				],

				des: [
					{ required: true, message: '请输入描述信息', trigger: 'blur' },
				],
				amount: [
					{ required: true, message: '请输入金额', trigger: 'blur' },
				],

			},
			username: "",   //输入查询的昵称
		};
	},
	methods: {
		search() {
			this.getAccount()
        },
		//用昵称查询账号
        getAccount(){
            let obj = {
                username: this.username
            }
            findAllMember(obj).then(res => {
                this.ruleForm.accountID = res.data.data.list[0].ACCOUNT
            })
        },
		submitForm(formName) {
            this.disable = true
            if(this.ruleForm.amount < 0){
                this.$message('请输入正数！')
            }else{
                let obj = {
                    account: this.ruleForm.accountID,
                    amount: this.ruleForm.amount,
                    des: this.ruleForm.des,
                    type: this.radio
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log(obj)
                        chargeRight(obj).then(res => {
                            console.log(res)
                            if (res.data.error_code == 200) {
                                Message.success(res.data.message)
                                this.resetForm(formName)
                                setTimeout(() => {
                                    this.disable = false
                                }, 1200);
                            } else {
                                Message.success(res.data.message)
                                setTimeout(() => {
                                    this.disable = false
                                }, 1200);
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
			
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
