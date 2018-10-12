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
        <p style="color:red;font-size:12px;">注：数据默认显示当天的！</p>
         <el-col :span="12">
            <div class="block"
                    style="display: inline-block;">
                <el-date-picker v-model="value1"
                                type="datetime"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                >
                </el-date-picker>
            </div>
            <div style="display: inline-block;">至</div>
            <div class="block"
                    style="display: inline-block;">
                <el-date-picker v-model="value2"
                                type="datetime"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                default-time="23:59:59">
                </el-date-picker>
            </div>
        </el-col>
        <el-col :span="2">
            <div class="grid-content bg-purple"
                    @click="search">
                <el-button type="primary"
                            icon="el-icon-search">搜索</el-button>
            </div>
        </el-col>
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
        v-if="totalList != ''"
        >
    </el-pagination>
	</div>
</template>

<script>
import { findAccountWall,findAccountActiveWall } from '@/api/sys_user'
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
            value1: '',
            value2: ''
		}
	},
	created() {
		this.getmasage()
	},
	methods: {
        search() {
            // this.getmasage()
            this.handleClick()
        },
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
                pageSize:this.pageSize,
                startTime: this.value1,
                endTime: this.value2,
            }
            //开户墙
            findAccountWall(obj).then(res=>{
                console.log(res)
                if(res.data.error_code == 200){
                    this.tableData = res.data.data.list
                    this.totalList = res.data.data.total
                    console.log(this.tableData)
                }else{
                    this.$message.error(res.data.message)
                }
            })
        },
        getTableData(){
            let obj = { 
                loginAccount: getCookies('name'),
                page:this.page,
                pageSize:this.pageSize,
                startTime: this.value1,
                endTime: this.value2,
            }
			findAccountActiveWall(obj).then(res=>{
				console.log(res)
				if(res.data.error_code === 200){
                    this.tableData = res.data.data.list
                    this.totalList = res.data.data.total
				}else{
                    this.$message.error(res.data.message)
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
