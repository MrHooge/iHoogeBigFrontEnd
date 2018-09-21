<template>
	<div class="app-container">
        <el-tabs v-model="activeName2"
		         type="card"
		         @tab-click="handleClick">
			<el-tab-pane label="开户轮播墙"
			             name="first">
				<!-- <v-rechange></v-rechange> -->
			</el-tab-pane>
			<el-tab-pane label="激活轮播墙"
			             name="second"></el-tab-pane>

		</el-tabs>
		<el-table
    :data="tableData"
    border
    style="width: 100%">
    <!-- <el-table-column
      prop="account"
      label="代理账号">
    </el-table-column> -->
      <el-table-column
      prop="username"
      label="代理名字">
    </el-table-column>
    <el-table-column
      prop="countNum"
      label="数量">
    </el-table-column>
    <el-table-column
      prop="grouping"
      label="分组">
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
            >
            </el-pagination>
	</div>
</template>

<script>
import { openAccountWall,findAccountActiveWall } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
	components: { treeTable },
	data() {
		return {
        tableData:[],
        page:1,
        pageSize:20,
        totalList: 0,
        activeName2: 'first',
		}
	},
	created() {
		this.getmasage()
	},
	methods: {
    	//翻页
        handleCurrentChange(num){
            this.page = num;
            this.getmasage()
            this.handleClick(tab, event)
        },
        //改变页面大小
        handleSizeChange(num){
            this.pageSize = num;
            this.getmasage()
            this.handleClick(tab, event)
        },
        handleClick() {
			// console.log(tab)
			if (this.activeName2 == 'first') {
				this.getmasage()
				console.log('11111111111')
			} else {
				this.getTableData()
				console.log('22222222222')
			}

		},
		getmasage(){
            let obj = { 
                loginAccount:getCookies('name'),
                page:this.page,
                pageSize:this.pageSize
            }
            openAccountWall(obj).then(res=>{
                console.log(res)
                if(res.data.error_code == 200){
                    this.tableData = res.data.data.list
                    this.totalList = res.data.data.total
                    console.log(this.tableData)
                }
            })
        },
        getTableData(){
            let obj = { 
                loginAccount: getCookies('name'),
                page:this.page,
                pageSize:this.pageSize
            }
			findAccountActiveWall(obj).then(res=>{
				console.log(res)
				if(res.data.error_code==200){
                    this.tableData = res.data.data.list
                    this.totalList = res.data.data.total
				}
		    })
		}
	}
}
</script>

<style scoped>
/* .cell {
	padding-right: 0px;
	white-space:nowrap;
}
.xx .cell{
	padding:0;
	white-space:nowrap;
} */
label {
	padding:0;
	white-space:nowrap;
}
</style>
