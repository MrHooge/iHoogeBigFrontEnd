<!-- 竞彩日报 -->
<template>
	<div class="top">
		<div class="balanceMoney">
			账户余额：
			<span>{{balance}}</span>元
		</div>
		<div class="addstationletter">
			<div class="left">
				<p>提款信息录入</p>
				<el-form ref="form"
				         :model="form"
				         label-width="200px"
				         size="500px"
				         key="dayOneDan2DTO">
					<el-form-item label="金额"
					              style="width:500px">
						<el-input v-model="form.orderAmount"
						          clearable></el-input>
					</el-form-item>
					<el-form-item label="代付人账户名"
					              style="width:500px">
						<el-input v-model="form.bankcardowner"
						          clearable></el-input>
					</el-form-item>
					<el-form-item label="代付人银行账号"
					              style="width:500px">
						<el-input v-model="form.bankno"
						          clearable></el-input>
					</el-form-item>
					<el-form-item label="银行账户（1 对公/ 2 对私）"
					              style="width:500px">
						<el-input v-model="form.banktype"
						          clearable></el-input>
					</el-form-item>
					<el-form-item label="银行编码"
					              style="width:500px">
						<span style="color:red">（输入银行百度查）</span>
						<el-input v-model="form.bankcode"
						          clearable></el-input>
					</el-form-item>
					<el-form-item label="代付人开户行信息"
					              style="width:500px">
						<el-input v-model="form.depositbank"
						          clearable></el-input>
					</el-form-item>
					<el-form-item label="预存在银行手机号"
					              style="width:500px;">
						<el-input v-model="form.phonenumber"
						          clearable></el-input>
					</el-form-item>
					<el-form-item label="代付银行联行号"
					              style="width:500px;">
						<span style="color:red">（金额大于 50000 时 为必填）</span>
						<el-input v-model="form.payeebankLinesno"
						          clearable></el-input>
					</el-form-item>
					<el-form-item label="代付银行开户行省"
					              style="width:500px;">
						<span style="color:red">（金额大于 50000 时 为必填）</span>
						<el-input v-model="form.bankprovince"
						          clearable></el-input>
					</el-form-item>
					<el-form-item label="代付银行开户行市"
					              style="width:500px;">
						<span style="color:red">（金额大于 50000 时 为必填）</span>
						<el-input v-model="form.bankcity"
						          clearable></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary"
						           :disabled="disabled"
						           @click="onSubmitfirst">提交</el-button>
					</el-form-item>
				</el-form>
			</div>
		</div>
	</div>
</template>

<script>
import { createDayOneDan1, createDayOneDan2, createSZ2C11, createSZ2C12 } from '@/api/news'
import { exportExcle, findSaleInfo, findAllUserAndRole, findQdSaleCount, bankCardReceive, findMoney } from "@/api/sys_user";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message, Checkbox } from "element-ui";
import treeTable from "@/components/TreeTable";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
export default {
	data() {
		return {
			disabled: false,
			balance: 0, //  存储账户余额
			form: {
				orderAmount: '', //金额分
				bankcardowner: '',//代付人账户名
				bankno: '',//代付人银行账号
				banktype: '',//银行账户 1 对公/ 2 对私
				bankcode: '',//银行编码(详见字典二)
				depositbank: '',//代付人开户行信息
				phonenumber: '',//预存在银行手机号
				payeebankLinesno: '',//代付银行联行号（金额大于 50000 时 为必填）
				bankprovince: '',//代付银行开户行省（金额大于 50000 时 为必填）
				bankcity: '',//代付银行开户行市（金额大于 50000 时 为必填）
			},
		}
	},

	components: {},
	created() {
		this.getFindMoney()
	},
	methods: {
		//  获取余额
		getFindMoney() {

			findMoney().then(res => {
				console.log(res)
				if (res.data.error_code == 200) {
					this.balance = res.data.data.balance
				}
			})
		},
		//  提交申请
		onSubmitfirst() {

			if (!this.form.orderAmount) {
				this.$message('请输入金额')
			} else if (!this.form.bankcardowner) {
				this.$message('请输入代付人账户')
			} else if (!this.form.bankno) {
				this.$message('请输入银行账户')
			} else if (!this.form.bankcode) {
				this.$message('请输入银行编码')
			} else if (!this.form.depositbank) {
				this.$message('请输入代付人开户行信息')
			} else {
				if (this.form.orderAmount > 50000) {
					if (!this.form.payeebankLinesno) {
						this.$message('请输入代付银行联行号')
					} else if (!this.form.bankprovince) {
						this.$message('请输入代付银行开户行省')
					} else if (!this.form.bankcity) {
						this.$message('请输入代付银行开户行市')
					} else {
						this.sunbMit() //  金额大于 50000
					}
				} else {
					this.sunbMit() //  金额小于 50000
				}
			}
		},
		sunbMit() {
			this.disabled = true
			let obj = {
				orderAmount: Number(this.form.orderAmount) * 100, //金额分
				bankcardowner: this.form.bankcardowner,//代付人账户名
				bankno: this.form.bankno,//代付人银行账号
				banktype: this.form.banktype,//银行账户 1 对公/ 2 对私
				bankcode: this.form.bankcode,//银行编码(详见字典二)
				depositbank: this.form.depositbank,//代付人开户行信息
				phonenumber: this.form.phonenumber,//预存在银行手机号
				payeebankLinesno: this.form.payeebankLinesno,//代付银行联行号（金额大于 50000 时 为必填）
				bankprovince: this.form.bankprovince,//代付银行开户行省（金额大于 50000 时 为必填）
				bankcity: this.form.bankcity,//代付银行开户行市（金额大于 50000 时 为必填）
			}
			bankCardReceive(obj).then(res => {
				console.log(res)
				if (res.data.error_code == 200) {
					Message.success(res.data.message);
					this.getFindMoney()
					setTimeout(() => {
						this.disabled = false
					}, 1500);
				} else {
					Message.success(res.data.message);
					this.disabled = false
				}
			})

		}
	}
}
</script>

<style scoped>
.balanceMoney {
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
}
.balanceMoney span {
  color: red;
}
.chuan {
  padding: 10px 20px;
}
.el-input__inner {
  width: 400px;
}
.el-textarea__inner {
  height: 250px;
}
.el-form-item__label {
  width: 200px;
}
.left {
  width: 500px;
  /* float: left; */
}
.addstationletter {
  min-width: 1200px;
  width: 100%;
  padding: 10px 20px;
  overflow: hidden;
  display: flex;
  justify-content: flex-start;
}
</style>
