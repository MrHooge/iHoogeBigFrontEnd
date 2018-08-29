<template>
	<!-- 线上充值流水 -->
	<div class="chongzhi app-container">
		<!-- 顶部筛选 -->
		<div class="topten">
			<el-row :gutter="20">
			
				<el-col :span="2">
					<el-select v-model="child_type" placeholder="请选择充值类型">
					<el-option v-for="item in options"
					           :key="item.child_type"
					           :label="item.label"
					           :value="item.child_type">
					</el-option>
				</el-select>
				</el-col>
				<el-col :span="2">
					<el-select v-model="child_type" placeholder="请选择充值类型">
					<el-option v-for="item in options2"
					           :key="item.child_type"
					           :label="item.label"
					           :value="item.child_type">
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
				<el-col :span="10">
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
		 <el-dialog :visible.sync="dialogFormVisible">
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
        <!-- <el-button type="primary" @click="submitInfos">确 定</el-button> -->
        <el-button type="primary">确 定</el-button>

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
					{{ scope.row.ABLE_BALANCE  }}
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
import setTime from '@/utils/time.js'
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
			options: [  {label: '网上充值', child_type: '0'},
						{label: '现金充值', child_type: '1000'}, 
						{label: '冲正', child_type: '-1000'},
						{label: '赠送', child_type: '1'},
						{label: '彩金扣除', child_type: '-1001'}, 
						{label: '注册赠送', child_type: '-1000'},
						{label: '充值赠送', child_type: '1002'},
						{label: '彩金卡赠送', child_type: '1003'}, 
						{label: '消费赠送', child_type: '1004'},
						{label: '基金赠送', child_type: '1009'},
						{label: '合买发单赠送', child_type: '1010'}, 
						{label: '积分兑换', child_type: '1011'},
						{label: '追号套餐赠送', child_type: '1014'},
						{label: '嘉奖赠送', child_type: '1015'},
						{label: '公司账号充值', child_type: '1017'}, 
						{label: '奖金补发', child_type: '1018'},
						{label: '优惠赠送', child_type: '1020'},
						{label: '基金款转入', child_type: '2001'}, 
						{label: '基金款转出', child_type: '2002'},
						{label: '基金清算', child_type: '2003'}, 
						{label: '消费', child_type: '30'},
						{label: '话费充值', child_type: '3001'},
						{label: '冻结', child_type: '31'},
						{label: '退款', child_type: '34'}, 
						{label: '返奖', child_type: '35'},
						{label: '解冻', child_type: '32'}

			 ],
			 options2: [  {label: '提款', child_type: '36'},
						{label: '银行退单', child_type: '37'}, 
						{label: '单挑王', child_type: '1031'},
						{label: '佣金', child_type: '1056'},
						{label: '彩金兑积分', child_type: '2053'}, 
						{label: '购买靓胆', child_type: '2054'},
						{label: '靓胆推荐', child_type: '2055'},
						{label: '靓胆支出', child_type: '2056'}, 
						{label: '靓胆收入', child_type: '2057'},
						{label: '线下充值', child_type: '2058'},
						{label: '收佣', child_type: '2059'}, 
						{label: '付佣', child_type: '2060'},
						{label: '复制跟单', child_type: '2061'},
						{label: '授信充值', child_type: '2062'},
						{label: 'QQ扫码充值', child_type: '2063'}, 
						{label: 'QQH5充值', child_type: '2064'},
						{label: '信付宝快捷支付充值', child_type: '2065'},
						{label: '网银充值', child_type: '2066'}, 
						{label: '易宝快捷支付', child_type: '2067'},
						{label: '易宝支付宝', child_type: '2068'}, 
						{label: '易宝微信', child_type: '2069'},
						{label: 'unpay支付宝', child_type: '2070'},
						{label: '兴业微信', child_type: '2071'},
						{label: '连连快捷', child_type: '2072'}, 
						{label: '发红包', child_type: '41'},
						{label: '抢红包', child_type: '42'},
						{label: '退还红包', child_type: '43'}, 
			 ],
        value: '1',
        newarr: [],


		};
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