<template>
	<div class="app-container">
		<!-- <el-button v-waves type="primary">设置渠道或代理</el-button> -->
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
						           >设置返点</el-button>
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
		<el-dialog title="返点信息"
		           width='70%'
		           :visible.sync="viewFormVisible">
			<div style="display: flex;">
				<span style="flex:1;">会员账号：{{onePeople.account}}</span>
			</div>
			<!--   修改返点 -->
			<div class="pierce">

				<div>
					<el-table :data="tableData3"
					          border
					          tooltip-effect="dark"
					          style="width: 100%">
						<el-table-column label="代购返点"
						                 align="center">
							<template slot-scope="scope">
								<el-input v-model="gd_rate"
								          placeholder="请输入"></el-input>
							</template>
						</el-table-column>
						<el-table-column label="合买返点"
						                 align="center">
							<template slot-scope="scope">
								<!-- <el-input v-model="hm_rate"
								          placeholder="请输入"></el-input> -->
													0
							</template>
						</el-table-column>
						<el-table-column label="彩种"
						                 align="center">
							<template slot-scope="scope">
								<el-select v-model="value"
								           placeholder="请选择"
													 @change="changeStatus">
									<el-option v-for="item in options"
									           :key="item.value"
									           :label="item.label"
									           :value="item.value">
									</el-option>
								</el-select>
							</template>
						</el-table-column>
						<el-table-column label="点位开始时间"
						                 align="center"
						                 width="210px">
							<template slot-scope="scope">
								<div class="block">
									<el-date-picker v-model="value1"
									                type="datetime"
									                format="yyyy-MM-dd hh:mm:ss"
									                value-format="yyyy-MM-dd hh:mm:ss">
									</el-date-picker>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="点位结束时间"
						                 align="center"
						                 width="210px">
							<template slot-scope="scope">
								<div class="block">
									<el-date-picker v-model="value2"
									                type="datetime"
									                format="yyyy-MM-dd hh:mm:ss"
									                value-format="yyyy-MM-dd hh:mm:ss">
									</el-date-picker>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="返点类型"
						                 align="center">
							<template slot-scope="scope">
								<el-select v-model="valueType"
								           placeholder="请选择">
									<el-option v-for="item in options2"
									           :key="item.value"
									           :label="item.label"
									           :value="item.value">
									</el-option>
								</el-select>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
			<div slot="footer"
			     class="dialog-footer">
				<el-button @click="clearForm">取 消</el-button>
				<el-button type="primary"
				           @click="submitInfos">设置返点</el-button>
			</div>

		</el-dialog>
	</div>
</template>

<script>
import { findAllMember, setRate } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message, Checkbox } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
	data() {
		return {
			viewFormVisible: false,
			viewFormType: 'view',
			formLabelWidth: '120px',
			tableData: [], //表格数据
			tableData3: [], //点击数据
			onePeople: {}, // 存选择的某一条数据
			username: '',
			total: 0,
			account: '',
			member_id: '',
			gd_rate: '', //  代购返点
			hm_rate: '', // 合买返点
			startDate: '',  // 返点开始
			endDate: '',  // 返点结束
			remark: '',  //  返点类型
			lotteryType: '', //  彩种
			value1: '',
			value2: '',
			options: [{
				value: '38',
				label: '竞彩足球'
			}, {
				value: '39',
				label: '竞彩篮球'
			}],
			value: '',

			options2: [{
				value: '0',
				label: '非返点'
			}, {
				value: '1',
				label: '返点'
			}, {
				value: '2',
				label: '加奖 '
			}, {
				value: '3',
				label: '返点嘉奖'
			}],
			valueType: '',
			rateParams: []

		}
	},
	created() {
		this.getTable(1)
	},
	methods: {
		changeStatus(val){
		return this.value = val
		},
		handleChange(val) {
			console.log(val);
		},
		getTable(page, pageSize) { //   获取所有会员列表
			findAllMember(page, pageSize).then(res => {
				console.log(res)
				this.tableData = res.data.data.list
				this.total = res.data.data.total
			})
		},
		showDailag(data, type) {
			console.log(data)
			this.viewFormType = type
			this.viewFormVisible = true
			this.tableData3 = []
			this.tableData3.push(data);
			this.onePeople = data
		},

		clearForm() { //取消按钮
			this.viewFormVisible = false

		},
		submitInfos() {  // 确定按钮
			// console.log(this.value)
			let obj = {
				lotteryType: this.value,
				dg_rate: this.gd_rate, //  代购返点
				hm_rate: '0', // 合买返点  
				remark: this.valueType,  //  返点类型
				startDate: this.value1,// 返点开始
				endDate: this.value2,// 返点结束
			}
			console.log(obj)
			console.log(obj)
			this.rateParams.push(obj)
			console.log(this.rateParams)
			let account = this.onePeople.account
			setRate(account, JSON.stringify(this.rateParams)).then(res => {
				if(res.data.error_code==200) {
					Message.success(res.data.message)
					this.viewFormVisible = false
					this.tableData3 = []
				}else {
					Message.success(res.data.message)
					this.viewFormVisible = false
					this.tableData3 = []
					
				}
				console.log(res)
			})
		},

		// 分页的回调
		changepage(val) {
			this.getTable(val)
		},
	}
}
</script>

<style scoped>
.pierce >>> .el-input__inner {
  outline: none;
  border: 0 !important;
  padding: 0;
}
.pierce >>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
  padding-right: 10px;
  padding-left: 30px;
}
</style>
