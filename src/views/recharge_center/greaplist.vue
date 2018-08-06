<template>
	<div class="repaylist app-container">
		<div class="rowone">
			<el-button type="primary"
			           @click="pushData">
				提交
			</el-button>
			<span style="color:#E6A23C;font-size:14px;">
				<i class="el-icon-star-on"></i>全选情况下,提交数据只是当前页全选的数据</span>
		</div>
		<el-table ref="multipleTable"
		          :data="tableData"
		          border
		          tooltip-effect="dark"
		          style="width: 100%"
		          @selection-change="handleSelectionChange">
			<el-table-column type="selection"
			                 align="center"
			                 width="55">
				<template>
					全选
				</template>
			</el-table-column>
			<el-table-column label="编号"
			                 align="center">
				<template slot-scope="scope">{{ scope.$index + 1 }}</template>
			</el-table-column>
			<el-table-column label="姓名"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.name }}
				</template>
			</el-table-column>
			<el-table-column label="图片"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.picture }}
				</template>
			</el-table-column>
			<el-table-column label="支付类型"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.type | changePay }}
				</template>
			</el-table-column>
			<el-table-column label="线上线下"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.isOnline | changeType }}
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<div class="page">
			<el-pagination background
			               layout="prev, pager, next"
			               @current-change="currentPage"
			               :total="totalNum">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import { getPayChannelList, updateMemberPayWays } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
	data() {
		return {
			bianhao: 1,
			tableData: [], //表格数据
			totalNum: 0, //总页
			currentPage: 1, //默认当前页
			ids: [], //存储选择的人员的id
			seletData:[],//  存储 选中数据
		};
	},
	filters: {
		changeType(a) {
			return a ? "线上" : "线下";
		},
		changePay(a) {
			if (a == "wx") {
				return "微信";
			} else {
				return "支付宝";
			}
		}
	},
	created() {
		this.getRepayList(1);
	},
	methods: {
		// 调支付列表接口数据
		getRepayList(curr) {
			let obj = {
				page: curr,
				pageSize: 10
			};
			getPayChannelList(obj).then(res => {
				console.log(res)
				if (res.status == 200) {
					this.tableData = res.data.data;
					this.totalNum = res.data.totalCount;
				}
			})
		},
		// 选择框的回调
		handleSelectionChange(val) {
			this.seletData = val
			// console.log(val)
			// val.forEach(e => {
			// 	this.ids.push(e.id)
			// });
			console.log(this.seletData)
		},
	
		pushData() {
			if (this.seletData.length > 0 && this.seletData != null) {
				this.seletData.forEach(e => {
					this.ids.push(e.id)
				});
				console.log(this.ids)
				// let obj = {
				// 	id: this.$route.query.id,
				// 	ids: this.ids
				// };
				let id =this.$route.query.id
				let ids = this.ids
				console.log(ids)
				updateMemberPayWays(id,JSON.stringify(ids)).then(res => {
					console.log(res)
					if (res.status == 200) {
						if (res.data.success = true) {
							this.$message(res.data.msg)
						}
					}
				})
			} else {
				this.$message('请至少选择一个')
			}

		}
	}
};
</script>

<style scoped>
.rowone {
  padding: 10px 0;
  margin-bottom: 10px;
}
</style>