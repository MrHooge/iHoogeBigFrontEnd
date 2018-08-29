<template>
	<div class="chongzhi app-container">
		<!-- 顶部筛选 -->
		<div class="topten">
			<el-row :gutter="20">
				<el-col :span="6">
					<div class="grid-content bg-purple">
						<el-input v-model="name"
						          placeholder="请输入查询的账号"
						          @input="onInput"
								  style="width:40%"></el-input>
								  <el-input v-model="id"
						          placeholder="请输入查询的流水号"
						          @input="onInput"
								  style="width:50%"></el-input>

					</div>
					<!-- <div class="grid-content bg-purple">
						<el-input v-model="id"
						          placeholder="请输入查询的流水号"
						          @input="onInput"></el-input>
					</div> -->
				</el-col>
				<el-col :span="12">
					<div class="block"
					     style="display: inline-block;">
						<el-date-picker v-model="value1"
						                type="date"
						                placeholder="选择日期"
						                format="yyyy-MM-dd"
						                value-format="yyyy-MM-dd">
						</el-date-picker>
					</div>
					<div style="display: inline-block;">至</div>
					<div class="block"
					     style="display: inline-block;">
						<el-date-picker v-model="value2"
						                type="date"
						                placeholder="选择日期"
						                format="yyyy-MM-dd"
						                value-format="yyyy-MM-dd">
						</el-date-picker>
					</div>
				</el-col>
				<el-col :span="2">
					
					<div class="grid-content bg-purple"
					     @click="search">
						<el-button type="primary"
						           icon="el-icon-search">搜索</el-button>
					</div>
				</el-col>
			</el-row>
		</div>
		<!-- 表格数据  -->
		<el-table :data="tableData"
		          border
		          style="width: 100%">
			<el-table-column label="账号"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.account }}
				</template>
			</el-table-column>
			<el-table-column label="客户昵称"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.username }}
				</template>
			</el-table-column>
			<!-- <el-table-column label="用户ID"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.member_id }}
				</template>
			</el-table-column> -->
			<el-table-column label="金额"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.amount }}
				</template>
			</el-table-column>
			<el-table-column label="流水号"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.id }}
				</template>
			</el-table-column>

			<el-table-column label="支付时间"
			                 align="center">
				<template slot-scope="scope">
                    {{scope.row.pay_time | time}}
                </template>
			</el-table-column>

			<el-table-column label="操作"
			                 align="center">
				<template slot-scope="scope">
					<el-button size="mini"
					           @click="handleRepy(scope.row)">充值</el-button>
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
		<!-- 弹窗事件 -->
		<el-dialog title="充值补单"
		           :visible.sync="dialogVisible"
		           width="40%">
			<el-form :model="ruleForm"
			         ref="ruleForm"
			         label-width="100px"
			         class="demo-ruleForm">
				<el-form-item label="账户名"
				              prop="accountID">
					<el-input v-model="ruleForm.accountID" readonly="readonly"></el-input>
				</el-form-item>
				<el-form-item label="流水号"
				              prop="chargeNo">
					<el-input v-model="ruleForm.chargeNo" readonly="readonly"></el-input>
				</el-form-item>
				<el-form-item label="金额"
				              prop="amount">
					<el-input v-model="ruleForm.amount" ></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" :disabled="disable"
					           @click="submitForm('ruleForm')">确认充值</el-button>
					<el-button @click="resetForm('ruleForm')">重置</el-button>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script>
import setTime from '@/utils/time.js'
import { getAllFailPayOrder,chargeFix } from "@/api/sys_user";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message, Checkbox } from "element-ui";
import treeTable from "@/components/TreeTable";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
export default {
	data() {
		return {
			disable:false,
			name: "", // 用户名
			number: "", // 充值的金额
			total: 0, // 总页数
			tableData: [],//表格的数据
			dialogVisible: false,
			username: '',
			money: '',
			value1: '',
			value2: '',
			ruleForm: {
				accountID: '',  //请输入账户ID
				chargeNo: '', //请输入流水号
				amount: '',  //请输入金额
			},

		};
	},
		filters: {
		changeTime(b) {
			return setTime(b)
		},
		 time(a){
            let date = new Date(a);
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            return MM + '-' + d + ' ' + h + ':' + m + ':' + s;

        },
	},

	created() {
		// this.search(1)
		this.getData(1, this.name, this.value1, this.value2)
	},
	methods: {
		onInput() {
			if (this.name == '') {
				this.getData(1, this.name, this.value1, this.value2)
			}
			console.log(this.name)
		},
		search() {
			console.log(this.value1)
			console.log(this.value2)
			this.getData(1, this.name, this.value1, this.value2)
		},
		getData(curr, a, b, c) {
			let obj = {
				account: a,
				startTime: b,
				endTime: c,
				page: curr,
				pageSize: 20
			}
			console.log(obj)
			getAllFailPayOrder(obj).then(res => {
				console.log(res)
				if (res.status == 200) {
					this.tableData = res.data.data.list
					this.total = res.data.data.total
				}
			})
		},
		handleRepy(row) {  //  操作按钮
			console.log(row)
			this.ruleForm.accountID = row.member_id
			this.ruleForm.chargeNo =  row.id
			this.dialogVisible = true
		},

		submitForm(formName) {
			this.disable = true
			let obj = {
				memberId: this.ruleForm.accountID,
				amount: this.ruleForm.amount,
				chargeNo: this.ruleForm.chargeNo,
			}
			this.$refs[formName].validate((valid) => {
				if (valid) {
					console.log(obj)
					chargeFix(obj).then(res => {
						console.log(res)
						if (res.data.error_code == 200) {
							Message.success(res.data.message)
							this.dialogVisible = false
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
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 分页的回调
		changepage(val) {
			this.getData(val, this.name, this.value1, this.value2)
		},

	}
};
</script>

<style scoped>
div.page {
  float: right;
  padding: 10px 0;
}
.topten {
  padding: 10px 0;
  margin-bottom: 20px;
}
</style>