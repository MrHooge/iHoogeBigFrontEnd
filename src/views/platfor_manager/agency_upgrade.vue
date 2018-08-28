<template>
<!-- // 代理升级为渠道 -->
	<div class="app-container">
		<el-input v-model="account" placeholder="请输入昵称" style="width: 250px;margin-right:70px;margin-bottom:20px;margin-top:40px"></el-input>
		<el-button type="primary" @click="inquire" @keyup.13="getone" style="margin-left:100px;margin-bottom:40px;margin-top:40px">查询</el-button>
		<el-table :data="tableData"
		          border
		          style="width: 100%">
			<el-table-column label="编号"
			                 align="center"
			                 type="index"
			                 width="180">
			</el-table-column>
			<el-table-column label="类型"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.AGENT_TYPE | type}}
				</template>
			</el-table-column>
			<el-table-column prop="ACCOUNT"
			                 align="center"
			                 label="用户名">
			</el-table-column>
			<el-table-column prop="username"
			                 align="center"
			                 label="昵称">
			</el-table-column>
			<el-table-column prop="NAME"
			                 align="center"
			                 label="姓名">
			</el-table-column>
			<el-table-column prop="upName"
			                 align="center"
			                 label="上级">
			</el-table-column>
			<el-table-column prop="grouping"
			                 align="center"
			                 label="分组">
			</el-table-column>
			<el-table-column align="center"
			                 width="240px;"
			                 label="操作">

				<template slot-scope="scope">
					<el-button type="primary"
					           @click="handleEdit(scope.row, 'modify')">升为渠道</el-button>
				</template>
			</el-table-column>
		</el-table>
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
		<!-- 弹窗事件 -->
		<el-dialog title="提示"
		           :visible.sync="dialogVisible"
		           width="40%">
			<div>
				<p>会员名：{{ username }}</p>
				<p>设置：升为渠道</p>
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
import { findAllAgentAndQD, upgradeAgentToQD } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
export default {
	components: { treeTable },
	data() {
		return {
			account:'',
			username: '',
			tableData: [], //表格数据
			sjname: '',//模糊搜索
			dialogVisible: false,
			tableData3: [], // 弹窗的表格数据
			multipleSelection: [], //选中的数据
			onePeople: {}, // 存选择的某一条数据
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
	computed: {

	},
	created() {
		this.getTable()
	},
	methods: {
			//查询
		inquire(){
			if(this.account == ''){
				this.$message('请输入昵称')
			}else{
				//account = this.account
				this.getTable()
			}
		},
		  //翻页
        handleCurrentChange(num){
            this.page = num;
            this.getTable()
        },
        //改变页面大小
        handleSizeChange(num){
            this.pageSize = num;
            this.getTable()
        },
		getTable() {
				let obj = {
				page:this.page,
				pageSize:this.pageSize,
				account:this.account
			}
			findAllAgentAndQD(obj).then(res => {  //  获取渠道列表
				if (res.status == 200) {
                    this.tableData = res.data.data.list
                    this.totalList = res.data.data.total
					// filter((e, index) => {
					// 	return e.AGENT_TYPE == 1
					// })
				}
				console.log(this.tableData)
			})
		},
		//  给渠道绑定代理
		handleEdit(a) {
			this.dialogVisible = true
			this.onePeople = a
			this.username = this.onePeople.ACCOUNT
		},
		makersure() {   // 弹窗确认按钮
			let obj = {
				account: this.onePeople.ACCOUNT
			}
			console.log(obj)
			upgradeAgentToQD(obj).then(res => {
				console.log(res)
				if (res.status == 200) {
					this.dialogVisible = false
					Message.success(res.data.message)
				} else {

				}
			})
		}
	},





}
</script>

<style scoped>
.el-dialog__body {
  padding: 30px 20px;
  color: #606266;
  line-height: 24px;
  font-size: 14px;
  height: 600px;
  overflow: auto;
}
</style>
