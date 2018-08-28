<template>
	<!-- 代理分组 -->
	<div class="backend app-container">
		<div class="layerbody">
			<div class="search">
				<el-input v-model="account"
				          placeholder="请输入渠道账号查询名下代理"
				          style="width:50%;"
									@input="onInput"></el-input>
				<el-button type="primary"
				           icon="el-icon-search"
				           @click="search">搜索</el-button>
						   	<el-button type="primary"
			           @click="cofirm" v-show="isShow">确 定</el-button>
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

					<!-- <el-table-column label="ID"
					                 prop="member_id"
					                 align="center">
					</el-table-column> -->

					<el-table-column label="会员名"
					                 prop="ACCOUNT"
					                 align="center">
					</el-table-column>
					<el-table-column label="昵称"
					                 prop="username"
					                 align="center">
					</el-table-column>
					<el-table-column label="姓名"
					                 prop="NAME"
					                 align="center">
					</el-table-column>
					<el-table-column label="代理/渠道"
					                 align="center">
						<template slot-scope="scope">{{ scope.row.AGENT_TYPE |type }}</template>
					</el-table-column>
					<el-table-column label="上级"
					                 prop="upName"
					                 align="center">
					</el-table-column>
					<el-table-column label="分组"
					                 prop="grouping"
					                 align="center">
					</el-table-column>
				</el-table>
			</div>
		</div>
		<el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalList"
            style="margin-top:40px"
            >
            </el-pagination>
		<!-- <div class="page"
		     v-show="pageShow"
		     style="padding:30px 0">
			<el-pagination background
			               :page-size=20
			               @current-change="changepage"
			               layout="prev, pager, next"
			               :total="total">
			</el-pagination>
		</div> -->
		<!-- 弹窗事件 -->
		<el-dialog title="确认分组"
		           :visible.sync="dialogVisible"
		           width="40%">
			<div>
				<el-input v-model="input"
				          placeholder="请输入分组名"></el-input>

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
import { findAllAgentAndQD, findAgentByQDAccount, setAgentToGroup } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
	data() {
		return {
			account:'',
			input: '', //  转移后
			dialogVisible: false, //确认弹框
			isShow: false,
			sjname: '', //  搜索名
			total: 0, //总页数
			tableData: [], //表格数据
			multipleSelection: [], //选中的数据
			number: [],
			arr: [],
			page:1,
            pageSize:20,
            totalList: 0,
		}
	},
	filters: {
		type(a) {

			return a ? '代理' : '渠道'
		}
	},
	created() {
		this.getData()
	},

	methods: {
		//翻页
        handleCurrentChange(num){
            this.page = num;
            this.getData()
        },
        //改变页面大小
        handleSizeChange(num){
            this.pageSize = num;
            this.getData()
        },
		onInput(){
				if(this.sjname==''){
					this.getData()
				}
		},
		//查询
		search(){
			if(this.account == ''){
				this.$message('请输入昵称')
			}else{
				//account = this.account
				this.getData()
			}
		},
		getData() {   //  获取 所有代理和渠道
			let obj = {
				page:this.page,
				pageSize:this.pageSize,
				account:this.account
			}
			findAllAgentAndQD(obj).then(res => {
				if (res.data.error_code == 200) {
                    this.tableData = res.data.data.list
                    this.totalList = res.data.data.total
				} else {
					Message.success(res.data.message)
				}
			})
		},

		// 选择框的回调
		handleSelectionChange(val) {
			this.multipleSelection = val
			if (val.length > 0) {
				this.isShow = true

			} else {
				this.isShow = false
			}

		},
		cofirm() {
			this.number = []
			this.multipleSelection.forEach(e => {  //  循环 选中数据  添加选中ID 放入 新数组中
				this.number.push(e.account)
			});
			this.dialogVisible = true
		},
		makersure() {
			let arr = []
			let myObj = {}
			this.number.forEach(e => {
				myObj[e] = this.input
				// arr.push(myObj)

			});
			Object.keys(myObj).forEach(function (key) {   //   对象循环
				arr.push({ [key]: myObj[key] })
				// console.log(key)
			})
			console.log(arr)

			if (this.input == '') {
				Message.success('请输入分组名')
				return
			} else {
				setAgentToGroup(JSON.stringify(arr)).then(res => {
					console.log(res)
					if (res.data.error_code = 200) {
						Message.success(res.data.message)
						this.dialogVisible = false
						this.input = ''
					} else {
						Message.success(res.data.message)
					}
				})
			}
		},

		// changepage(val) {  //  分页回调
		// 	this.getData(val.id)
		// }
	}
}
</script>

<style scoped>
.main {
  padding-top: 30px;
}
</style>
