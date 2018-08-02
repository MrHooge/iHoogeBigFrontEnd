<template>
	<div class="chongzhi app-container">
		<!-- 顶部筛选 -->
		<div class="topten">
			<el-row :gutter="20">
				<el-col :span="6">
					<div class="grid-content bg-purple">
						<el-input v-model="number"
						          placeholder="请输入需要充值的账号"></el-input>
					</div>
				</el-col>
				<el-col :span="6">
					<div class="grid-content bg-purple">
						<el-button type="primary"
						           icon="el-icon-search"
						           @click="search">搜索</el-button>
					</div>
				</el-col>
			</el-row>
		</div>
		<!-- 表格数据  -->
		<el-table :data="tableData"
		          border
		          style="width: 100%">
			<el-table-column label="用户名"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.account }}
				</template>
			</el-table-column>
			<el-table-column label="可用金额"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.ableBalance |canuse }}
				</template>
			</el-table-column>

			<el-table-column label="冻结金额"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.freezeBalance }}
				</template>
			</el-table-column>

			<el-table-column label="充值金额"
			                 align="center">
				<template slot-scope="scope">
					<el-input v-model="chje"
					          placeholder="请输入需要充值的金额"></el-input>
				</template>
			</el-table-column>

			<el-table-column label="操作"
			                 align="center">
				<template slot-scope="scope">
					<el-button size="mini"
					           :disabled="disabled"
					           @click="handleEdit(scope.row)">充值</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
import { getMemberWalletByAccount, xxCharge } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
	data() {
		return {
			disabled: false,
			number: "", // 输入的账号
			chje: '',
			tableData: [], //表格的数据
		};
	},
	filters: {
		canuse(a) {
			return a.toFixed(2)
		}
	},
	methods: {
		search() {
			if (!this.number) {
				this.$message("请输入您要查询的充值账号")
			} else {
				let obj = {
					account: this.number
				};
				getMemberWalletByAccount(obj).then(res => {
					console.log(res)
					this.tableData = [];
					if (res.status == 200) {
						// this.chje = res.data.data.account
						this.tableData.push(res.data.data);
					}

				})

			}
		},
		handleEdit(a) {
			this.disabled = true
			let obj = {
				account: a.account,
				amount: this.chje
			}
			xxCharge(obj).then(res => {
				console.log(res)
				if (res.data.success) {
					this.$message("充值成功！")
					setTimeout(() => {
						this.disabled = false
					}, 1200);
				} else {
					setTimeout(() => {
						this.disabled = false
					}, 1200);
				}
			})

		}
	}
};
</script>

<style scoped>
.topten {
  padding: 10px 0;
  margin-bottom: 20px;
}
</style>