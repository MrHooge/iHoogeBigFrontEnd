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
								  style="width:40%" clearable></el-input>
								  <!-- <el-input v-model="id" -->
                                  <el-input
						          placeholder="请输入查询的流水号"
						          @input="onInput"
								  style="width:50%" clearable></el-input>

					</div>
					<!-- <div class="grid-content bg-purple">
						<el-input v-model="id"
						          placeholder="请输入查询的流水号"
						          @input="onInput" clearable></el-input>
					</div> -->
				</el-col>
				<el-col :span="12">
					<div class="block"
					     style="display: inline-block;">
						<el-date-picker v-model="value1"
						                type="datetime"
						                placeholder="选择日期"
						                value-format="yyyy-MM-dd HH:mm:ss">
						</el-date-picker>
					</div>
					<div style="display: inline-block;">至</div>
					<div class="block"
					     style="display: inline-block;">
						<el-date-picker v-model="value2"
						                type="datetime"
						                placeholder="选择日期"
						                value-format="yyyy-MM-dd HH:mm:ss"
                                        default-time="23:59:59">
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
                    {{scope.row.pay_time | setTime}}
                </template>
			</el-table-column>

			<el-table-column label="操作"
			                 align="center">
				<template slot-scope="scope">
					<el-button size="mini" type="primary"
					           @click="handleRepy(scope.row)">充值</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="page">
			<!-- <el-pagination background
			               :page-size=20
			               @current-change="changepage"
			               layout="prev, pager, next"
			               :total="total"
                           v-if="total != ''">
			</el-pagination> -->
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[10, 20, 30, 40, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalList"
                v-if="totalList != ''"
                >
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
					<el-input v-model="ruleForm.accountID" readonly="readonly" clearable></el-input>
				</el-form-item>
				<el-form-item label="流水号"
				              prop="chargeNo">
					<el-input v-model="ruleForm.chargeNo" readonly="readonly" clearable></el-input>
				</el-form-item>
				<el-form-item label="金额"
				              prop="amount">
					<el-input v-model="ruleForm.amount" clearable></el-input>
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
			totalList: 0, // 总页数
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
            page: 1,
            pageSize: 20,

		};
	},
		filters: {
		setTime(a) {
			if (a != null) {
				return setTime(a);
			}
		},
	},

	created() {
		// this.search(1)
		this.getData(this.name, this.value1, this.value2)
	},
	methods: {
		onInput() {
            this.page = 1
			if (this.name == '') {
				this.getData(this.name, this.value1, this.value2)
			}
		},
		search() {
            this.page = 1
			this.getData(this.name, this.value1, this.value2)
		},
		getData(a, b, c) {
			let obj = {
				account: a,
				startTime: b || '',
				endTime: c || '',
				page: this.page,
				pageSize: this.pageSize
			}
			getAllFailPayOrder(obj).then(res => {
				console.log(res)
				if (res.data.error_code == 200) {
					this.tableData = res.data.data.list
					this.totalList = res.data.data.total
				}else{
                    this.$message.error(res.data.message)
                    this.tableData = []
					this.totalList = ''
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
        //改变页面大小
        handleSizeChange(val){
            this.page = val
           	this.getData(this.name, this.value1, this.value2)

        },
		// 分页的回调
		handleCurrentChange(val) {
            this.page = val
			this.getData(this.name, this.value1, this.value2)
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