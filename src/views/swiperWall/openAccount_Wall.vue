<template>
	<div class="app-container">
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
import { openAccountWall } from '@/api/sys_user'
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
        pageSize:20
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
        },
        //改变页面大小
        handleSizeChange(num){
            this.pageSize = num;
            this.getmasage()
        },
		getmasage(){
      let obj = { 
      loginAccount:getCookies('name'),
      page:this.page,
      pageSize:this.pageSize
      }
			console.log()
			openAccountWall(obj).then(res=>{
				console.log(res)
				if(res.data.error_code==200){
					this.tableData = res.data.data
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
