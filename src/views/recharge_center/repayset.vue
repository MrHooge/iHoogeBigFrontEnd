<template>
	<div class="repayset app-container">
		<div class="search">
			<el-input v-model="input"
			          placeholder="请根据姓名进行筛选" clearable></el-input>
		</div>
		<el-table :data="tableDataFilter"
		          border>
			<el-table-column label="用户名"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.account }}
				</template>
			</el-table-column>
			<!-- <el-table-column label="id"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.id }}
				</template>
			</el-table-column> -->
			<el-table-column label="姓名"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.name }}
				</template>
			</el-table-column>
			<el-table-column label="支付编号"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.payWays }}
				</template>
			</el-table-column>
			<el-table-column label="来源用户名"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.sourceAccount }}
				</template>
			</el-table-column>
			<el-table-column label="来源用户名id"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.sourceId }}
				</template>
			</el-table-column>
			<!-- <el-table-column label="来源类型"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.sourceType | sourcetype }}
				</template>
			</el-table-column> -->
			<el-table-column label="类型">
				<template slot-scope="scope">
					{{ scope.row.type | type}}
				</template>
			</el-table-column>
			<el-table-column label="操作"
			                 align="center"
			                 width="200">
				<template slot-scope="scope">
					<el-button size="mini"
					           type="primary"
					           @click="handleEdit(scope.row)">查看</el-button>
					<el-button size="mini"
					           type="danger"
					           @click="handleType(scope.row)">修改支付渠道</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<div class="page">
			<el-pagination background
			               layout="prev, pager, next"
			               @current-change="currentPage"
			               :total="totalNum"
                           v-if="totalNum != ''">
			</el-pagination>
		</div>
		<!-- 查看详情弹窗 -->
		<el-dialog title="用户详细信息"
		           :visible.sync="dialogVisible"
		           width="30%">
			<p class="uuname">用户名：
				<span>{{ datainfor.account }}</span>
			</p>
			<p class="uuname">ID：
				<span>{{ datainfor.id }}</span>
			</p>
			<p class="uuname">姓名：
				<span>{{ datainfor.name }}</span>
			</p>
			<p class="uuname">支付编号：
				<span>{{ datainfor.payWays }}</span>
			</p>
			<p class="uuname">来源用户名：
				<span>{{ datainfor.sourceAccount }}</span>
			</p>
			<p class="uuname">来源ID：
				<span>{{ datainfor.sourceId }}</span>
			</p>
			<p class="uuname">来源类型：
				<span>{{ datainfor.sourceType | sourcetype }}</span>
			</p>
			<p class="uuname">用户类型：
				<span>{{ datainfor.type | type}}</span>
			</p>
			<span slot="footer"
			      class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary"
				           @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>

</template>

<script>
import { getPayMember, getPayMemberByAccount } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'

export default {
	data() {
		return {
			totalNum: 0, //总页数
			tableData: [], //存储表格数据
			dialogVisible: false, //详情的弹窗隐藏
			datainfor: {}, //单个会员的详细信息
			input: "" //输入框的值
		};
	},
	filters: {
		// 过滤返回的类型1  0 的转换
		sourcetype(a) {
			if (a == 1) {
				return "代理";
			} else if (a == 0) {
				return "渠道";
			} else {
				return "";
			}
		},
		// 过滤返回的类型1  0 的转换
		type(a) {
			if (a == 1) {
				return "代理";
			} else if (a == 0) {
				return "渠道";
			} else {
				return "普通会员";
			}
		}
	},
	created() {
		this.getData(1);
	},
	//按名字过滤筛选表格数据
	computed: {
		tableDataFilter() {
			return this.tableData.filter(e => {
				return e.name.match(this.input)
			})
		}
	},
	methods: {
		// 获取所有代理/渠道
		getData(curr) {
			let obj = {
				page: curr,
				pageSize: 20
			};
			getPayMember(obj).then(res => {
				console.log(res)
				if (res.status == 200) {
					this.tableData = res.data.data;
					this.totalNum = res.data.totalCount;
				}
			})
		},
		// 查看的回调
		handleEdit(row) {
			console.log(row.account);
			this.getInfor(row.account);
			this.dialogVisible = true;
		},
		// 获取单个会员的详细信息
		getInfor(account) {
			let obj = {
				account: account
			};
			getPayMemberByAccount(obj).then(res => {
				console.log(res)
				if (res.status == 200) {
					console.log(res.data.data);
					this.datainfor = res.data.data;
				}
			})
			// this.$http
			// 	.get(api.pay + "/xxPay/getPayMemberByAccount", { params: obj })
			// 	.then(res => {
			// 		if (res.status == 200) {
			// 			console.log(res.data.data);
			// 			this.datainfor = res.data.data;
			// 		}
			// 	});
		},
		// 删除的回调
		handleType(row) {
			this.$router.push({ path: '/recharge_center/greaplist', query: { id: row.id } })
			console.log(row);
		},
		//点击当前分页的回调
		currentPage(vla) {
			this.getData(vla)
		}
	}
};
</script>
<style scoped>
p.uuname {
  border-bottom: 1px solid #ddd;
  padding: 10px;
}
p.uuname:hover {
  background-color: bisque;
  opacity: 0.8;
}
p.uuname span {
  color: #f60;
  padding-left: 10px;
}
div.search {
  padding: 10px 0;
}
</style>
