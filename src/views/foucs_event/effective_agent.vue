<template>
   <div class="effectiveagent">
      <!-- 1 2代理及底下会员黑名单 3代理白名单 4代理及底下会员白名单 -->
      <div class="bens">
         <el-button type="primary" @click="setAgent(1)">设置代理黑名单</el-button>
         <el-button type="primary" @click="setAgent(2)">设置代理及底下黑名单</el-button>
         <el-button type="danger" @click="setAgent(3)">设置代理白名单</el-button>
         <el-button type="primary" @click="setAgent(4)">设置代理及底下黑名单</el-button>
         <!-- <el-button type="danger">设置代理及底下会员黑名单</el-button>
         <el-button type="danger">设置代理及底下会员白名单</el-button> -->
      </div>
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
               type="selection"
               width="55">
            </el-table-column>
            <el-table-column
            prop="account"
            label="用户名"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="mobile"
            align="center"
            
            label="手机号"
            >
            </el-table-column>
            <el-table-column
            prop="name"
            label="姓名"
            align="center">
            </el-table-column>
            <el-table-column
            prop="username"
            align="center"
            
            label="昵称">
            </el-table-column>
         </el-table>
         <!-- 分页 -->
           <div class="page">
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
   </div>
</template>

<script>
import { getAgentList,setAddPrizeBlackOrWhite } from '@/api/events'

export default {
    data() {
        return {
            tableData: [],
            pageSize: 20,
            selections:[],
            total: 0,
            page:1,
            totalList: 0,
        }
    },
    filters: {},
    created() {
        this.getTable()
    },
    methods: {
        // 获取表格数据
        getTable() {
            let obj = {
                page: this.page,
                pageSize: this.pageSize
            }
            getAgentList(obj)
            .then(res => {
                console.log(res.data.data.list)
                this.tableData = res.data.data.list
                this.totalList = res.data.data.total
            })
            
        },
        // 分页的回调
        currpage(val) {
            this.getTable(val)
        },
        // 选择框全部
        handleSelectionChange(selection) {
            console.log(selection)
            this.selections = selection
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
        //   设置黑名单
        setAgent(types) {
            if(this.selections&&this.selections.length > 0){
                let arr = [];
                this.selections.forEach(e=>{
                    arr.push(e.id)
                })
                let obj = {
                    ids:arr.join(','),
                    type:types
                }
               setAddPrizeBlackOrWhite(obj)
               .then(res => {
                    if(res.error_code==200) {
                        this.$message('设置' + res.message)
                        this.getTable()
                    } else {
                        this.$message(res.message)
                    }
                })
            }else{
                this.$message('请至少选择一个代理人员')
            }
          
        },
    }
}
</script>

<style scoped>
.effectiveagent{
    padding: 10px 20px 
}
div.page {
    padding: 10px 0;
}
div.bens {
    padding: 0 0 20px 0;
}
</style>