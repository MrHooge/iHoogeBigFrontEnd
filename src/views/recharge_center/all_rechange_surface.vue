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
					<el-button type="primary"
						           icon="el-icon-search"
								   @click="typechange">选择类型</el-button>
				</el-col>

				<el-col :span="2">
					<div class="grid-content bg-purple"
					     @click="search">
						<el-button type="primary"
						           icon="el-icon-search">搜索</el-button>
					</div>
				</el-col>
                <el-col :span="2">
					<div class="grid-content bg-purple"
					     @click="exportSome">
						<el-button type="primary">导出</el-button>
					</div>
				</el-col>
			</el-row>
		</div>
		 <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
			  类型：<el-radio v-model="child_type" label="0" border>隐藏</el-radio>
					<el-radio v-model="child_type" label="1" border>显示</el-radio>
					<el-radio v-model="child_type" label="1" border>所有人可见</el-radio><br />
					<el-radio v-model="child_type" label="2" border>白名单可见</el-radio>
					<el-radio v-model="child_type" label="3" border>指定人可见</el-radio>
					<el-radio v-model="child_type" label="0" border>隐藏</el-radio><br />
					<el-radio v-model="child_type" label="1" border>显示</el-radio>
					<el-radio v-model="child_type" label="1" border>所有人可见</el-radio>
					<el-radio v-model="child_type" label="2" border>白名单可见</el-radio>
					<el-radio v-model="child_type" label="3" border>指定人可见</el-radio><br />
					<el-radio v-model="child_type" label="3" border>指定人可见</el-radio>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitInfos">确 定</el-button>
      </div>
    </el-dialog>
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

			<!-- <el-table-column label="类型说明"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.TRANS_TYPE_NAME }}
				</template>
			</el-table-column> -->
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
import { findMemberWalletLineByAccount, exportExcle } from "@/api/sys_user";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message, Checkbox } from "element-ui";
import treeTable from "@/components/TreeTable";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
export default {
	data() {
		return {
			pageShow: true,
			dialogFormVisible:false,
			name: "", // 用户名
			number: "", // 充值的金额
			total: 0, // 总页数
			tableData: [],//表格的数据
			dialogVisible: false,
			username: '',
			money: '',
			value1: '',
			child_type:'',
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
        newarr: [],


		};
	},
	created() {
        this.getData(1, this.name, this.value1, this.value2)
	},
	methods: {
		typechange(){
			this.dialogFormVisible = true
		},
		onInput() {
			if (this.name == '') {
				this.getData(1, this.name, this.value1, this.value2)
			}
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
				child_type:this.child_type,
				account:a,
				dlAccount:a,
				qdAccount:a
			}

			if (this.value == '1') {
				obj.account= this.name
				obj.dlAccount = ''
				obj.qdAccount = ''
			} else if (this.value == '2') {
				obj.account = ''
				obj.dlAccount = this.name
				obj.qdAccount = ''
			} else {
				obj.account = ''
				obj.dlAccount = ''
				obj.qdAccount = this.name
			}
			findMemberWalletLineByAccount(obj).then(res => {
				if (res.data.error_code == 200) {
					this.tableData = res.data.data.list
					this.total = res.data.data.total
				}else {
					Message.success(res.data.message)
				}
			})
		},
		changepage(val) {
			this.getData(val, this.name, this.value1, this.value2)
        },
        formatJson(filterVal, jsonData) {
    　　　　　　return jsonData.map(v => filterVal.map(j => v[j]))
　　　　},
        // changeDate(timestamp) {
		// 	var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
		// 	let Y = date.getFullYear() + '-';
		// 	let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		// 	let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
		// 	let h = date.getHours() + ':';
		// 	let m = date.getMinutes();
		// 	// let s = date.getSeconds();
		// 	return Y + M + D + h + m;
		// },
        // 导出
		exportSome() {
			let newobj
			this.tableData.forEach((e, index) => {
				newobj = {
                        ACCOUNT: e.ACCOUNT,
                        username: e.username,
						PLAN_NO: e.PLAN_NO,
						wallet_Line_No: e.wallet_Line_No,
						REMARK: e.REMARK,
						ABLE_BALANCE: e.ABLE_BALANCE.toFixed(2),
						CREATE_DATE_TIME: e.CREATE_DATE_TIME
                }
				this.newarr.push(newobj)
			})
			let model = {
				listParams: JSON.stringify(this.newarr),
				title: '会员充值流水'
			}
			console.log(model)
			exportExcle(model.listParams, model.title)
				.then(res => {})
			require.ensure([], () => {
				const { export_json_to_excel } = require('../../vendor/Export2Excel');
				const tHeader = ['账号', '用户名', '方案号', '流水号', '流水描述', '可用金额', '发生时间']; //对应表格输出的title
				const filterVal = ['ACCOUNT','username','PLAN_NO','wallet_Line_No','REMARK','ABLE_BALANCE', 'CREATE_DATE_TIME']; // 对应表格输出的数据
				const list = this.tableData;
				console.log(this.tableData);
				const data = this.formatJson(filterVal, list);
				export_json_to_excel(tHeader, data, '列表excel'); //对应下载文件的名字
			})
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