<template>
	<div class="backend app-container">
		<div class="layerbody"
		     style="height: 600px;overflow: auto;">
			<div class="search">
				<el-input v-model="sjname"
				          placeholder="请输入会员名"
				          style="width:50%;"></el-input>
				<el-button type="primary"
				           icon="el-icon-search"
				           @click="search">搜索</el-button>
			</div>
			<div class="main">
				<el-table :data="tableData"
				          border
				          tooltip-effect="dark"
				          style="width: 100%"
				          @selection-change="handleSelectionChange">
					<el-table-column type="selection"
					                 align="center">
					</el-table-column>
					<el-table-column label="会员名"
					                 prop="account"
					                 align="center">
					</el-table-column>
					<el-table-column label="昵称"
					                 prop="username"
					                 align="center">
					</el-table-column>
					<el-table-column label="姓名"
					                 prop="name"
					                 align="center">
					</el-table-column>
				</el-table>
			</div>
		</div>
		<div class="page">
			<el-pagination background
			               :page-size=20
			               @current-change="changepage"
			               layout="prev, pager, next"
			               :total="total">
			</el-pagination>
		</div>
		<!-- <span slot="footer"
		      class="dialog-footer">
			<el-button @click="dialogVisible = false">取 消</el-button>
			<el-button type="primary"
			           @click="cofirm">确 定</el-button>
		</span> -->
	</div>
</template>

<script>
import { getSubordinateMember } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
	data() {
		return {
			sjname: '', //  搜索名
			total: 0, //总页数
			tableData: [], //表格数据
			multipleSelection: [], //选中的数据
			number:[]
		}
	},
	// created(){
	// 	this.getData()
	// }

	methods: {
		search() {
			this.getData(1, this.sjname)
		},
		getData(curr, a) {
			let obj = {
				account: a,
				page: curr,
				pageSize: 20
			}
			getSubordinateMember(obj).then(res => {
				console.log(res)
				if(res.data.error_code==200){
					this.tableData = res.data.data.list
				}
			})
		},
		cofirm() {
			this.multipleSelection.forEach(e => {  //  循环 选中数据  添加选中ID 放入 新数组中
				return this.number.push(e.id)
			});
			console.log(this.number)
		},
		// 选择框的回调
		handleSelectionChange(val) {
			this.multipleSelection = val
			// console.log(val)

		},
		changepage(val) {  //  分页回调
			this.getData(val.id)
		}
	}
}
</script>

<style scoped>
.main {
  padding-top: 30px;
}
</style>
