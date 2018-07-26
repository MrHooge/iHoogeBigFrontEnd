<template>
	<div class="backend app-container">
		<div class="search">
            <el-input v-model="input1" placeholder="请输入会员名" style="width:50%;"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </div>
		<el-table :data="tableData"
		          border
		          style="width: 100%;"
		          show-summary>
			<el-table-column prop="account"
			                 label="会员名"
			                 align="center"
			                 width="180">
			</el-table-column>

			<el-table-column align="center"
			                 label="授信值">
				<template slot-scope="scope">
					<el-input v-model="scope.row.creditLimit"
					          placeholder="请输入内容"></el-input>
				</template>
			</el-table-column>

			<el-table-column prop="ableCreditBalance"
			                 align="center"
			                 label="当前可用金额">
			</el-table-column>

			<el-table-column prop="freezeCreditBalance"
			                 align="center"
			                 label="冻结金额">
			</el-table-column>

			<el-table-column align="center"
			                 label="操作">
				<template slot-scope="scope">
					<el-button size="mini"
					           type="primary"
					           @click="shouxin(scope.row)">授信</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="moneyadd">
			<el-row>
				<el-col :span="2">
					<div class="grid-content bg-purple">总计：</div>
				</el-col>
				<el-col :span="3">
					<div class="grid-content bg-purple">可用金额:
						<span>{{ totalMoney }}</span>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="grid-content bg-purple-light">冻结金额:
						<span>{{totalFree}}</span>
					</div>
				</el-col>
				<!-- <el-col :span="16">
					<div class="page">
						<el-pagination background
						               :page-size=10
						               @current-change="changepage"
						               layout="prev, pager, next"
						               :total="total">
						</el-pagination>
					</div>
				</el-col> -->
			</el-row>

		</div>
		<!-- 分页 -->

		<!-- 弹窗事件 -->
		<el-dialog title="提示"
		           :visible.sync="dialogVisible"
		           width="40%">
			<div>
				<p>会员名：{{ username }}</p>
				<p>额度：{{ money }}</p>
			</div>
			<span slot="footer"
			      class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary"
				           @click="makersure">确 定</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
import { getCreditMember, credit } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'

export default {
	data() {
		return {
			obj: "",//每一行的数据
			input1: "",
			total: 0, //总页数
			dialogVisible: false,
			tableData: [], //表格数据
			username: "", //会员名
			money: "",//额度
			totalMoney: "",//总计可用金额
			totalFree: "",//总计冻结金额
		};
	},

	created() {
		this.getData(1,'');
	},
	methods: {
		// 点击的搜索信息
		search() {
			this.getData(1, this.input1);
		},
		//   授信的点击事件
		shouxin(a) {
			console.log(a)
			this.dialogVisible = true;
			this.obj = a
			console.log(this.obj)
			// 获取授信代理用户名
			this.username = a.account;
			// 获取授信额度
			this.money = a.creditLimit;
			// 获取操作人
		},
		// 弹窗的确定回调
		makersure() {
			this.dialogVisible = false;
			let oper = getCookies('name');//假设admin账户
			this.clickCreadit(this.obj.account, this.obj.creditLimit, oper);
		},
		// 调接口数据
		getData(curr,a) {
			let obj = {
				page: curr,
				pageSize: 10,
				loginAccount: getCookies('name'),
				account:a,
			};
			getCreditMember(obj).then(res => {
				console.log(res)
				if (res.status == 200) {
					this.tableData = res.data.data
					this.total = res.data.totalCount;
					let total = 0;
					let free = 0;
					this.tableData.forEach(e => {
						// 全部可用金额
						total += e.ableCreditBalance
						// 全部冻结金额
						free += e.freezeCreditBalance
						this.totalMoney = total
						this.totalFree = free
						// console.log(e)
					})
				}
			})
		},

		// 点击授信按钮调接口数据
		clickCreadit(a,b,c) {
			let creadit = { account: a, creditLimit: b, operater: c };
			credit(creadit).then(res => {
				console.log(res)
				if (res.data.success == false) {
					Message.success(res.data.message)
					return;
				} else {
					Message.success('授信成功！')
					// window.location.reload();
				}
			})
		},
		// 分页的回调
		changepage(val) {
			this.getData(val)
		},
	}
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.backend {
  .search {
    padding: 10px 0;
  }
  .page {
    margin-top: 10px;
    float: right;
  }
  .moneyadd {
    line-height: 60px;
    font-size: 14px;
    span {
      color: #f60;
      font-size: 16px;
      padding: 5px;
    }
  }
}
</style>
