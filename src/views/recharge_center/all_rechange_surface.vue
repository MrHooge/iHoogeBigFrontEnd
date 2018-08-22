<template>
	<!-- 线上充值流水 -->
	<div class="chongzhi app-container">
		<!-- 顶部筛选 -->
		<div class="topten">
			<el-row :gutter="20">
			
				<el-col :span="3">
			
								<el-select v-model="value"
				           placeholder="请选择"
									 >
					<el-option v-for="item in options"
					           :key="item.value"
					           :label="item.label"
					           :value="item.value"
										 >
					</el-option>
				</el-select>

				</el-col>
			
				<el-col :span="5">
			
					<div class="grid-content bg-purple">
						<el-input v-model="name"
						          placeholder="请输入查询的账号"
						          @input="onInput"></el-input>
					</div>

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
					至
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
					{{ scope.row.ACCOUNT }}
				</template>
			</el-table-column>
			<el-table-column label="用户名"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.username }}
				</template>
			</el-table-column>
			<el-table-column label="方案号"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.PLAN_NO }}
				</template>
			</el-table-column>
			<el-table-column label="流水号"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.wallet_Line_No }}
				</template>
			</el-table-column>

			<el-table-column label="流水描述"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.REMARK }}
				</template>
			</el-table-column>

			<el-table-column label="类型说明"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.TRANS_TYPE_NAME }}
				</template>
			</el-table-column>
			<el-table-column label="可用金额"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.ABLE_BALANCE }}
				</template>
			</el-table-column>
			<el-table-column label="发生时间"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.CREATE_DATE_TIME | changeTime}}
				</template>
			</el-table-column>

		</el-table>
		<div class="page"
		     v-show="pageShow">
			<el-pagination background
			               :page-size=20
			               @current-change="changepage"
			               layout="prev, pager, next"
			               :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import { findMemberWalletLineByAccount } from "@/api/sys_user";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message, Checkbox } from "element-ui";
import treeTable from "@/components/TreeTable";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
export default {
	data() {
		return {
			pageShow: true,
			name: "", // 用户名
			number: "", // 充值的金额
			total: 0, // 总页数
			tableData: [],//表格的数据
			dialogVisible: false,
			username: '',
			money: '',
			value1: '',
			value2: '',
			options: [{
          value: '1',
          label: '会员'
        }, {
          value: '2',
          label: '代理'
        }, {
          value: '3',
          label: '渠道'
        }],
        value: '1',


		};
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
			this.getData(1, this.name, this.value1, this.value2)

		},
		getData(curr, a, b, c) {
			let obj = {
				loginAccount: getCookies('name'),
				page: curr,
				pageSize: 20,
				start_time: b,
				end_time: c,
				type: 2,
				account:a,
				dlAccount:a,
				qdAccount:a
			}

			if (this.value == '1') {
				console.log('value11111111')
				obj.account= this.name
				obj.dlAccount = ''
				obj.qdAccount = ''
			} else if (this.value == '2') {
				console.log('2222222222222')
				obj.account = ''
				obj.dlAccount = this.name
				obj.qdAccount = ''
			} else {
				obj.account = ''
				obj.dlAccount = ''
				obj.qdAccount = this.name
			}
			console.log(obj)
			findMemberWalletLineByAccount(obj).then(res => {
				if (res.data.error_code == 200) {
					console.log(res)
					this.tableData = res.data.data.list
					this.total = res.data.data.total
				}else {
					console.log(res)
					Message.success(res.data.message)
				}
			})
		},
		changepage(val) {
			this.getData(val, this.name, this.value1, this.value2)
		}
	},
	filters: {
		changeTime(timestamp) {
			var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			let Y = date.getFullYear() + '-';
			let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
			let h = date.getHours() + ':';
			let m = date.getMinutes();
			// let s = date.getSeconds();
			return Y + M + D + h + m;
		}

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
.el-select{
	width: 100px;
}
</style>