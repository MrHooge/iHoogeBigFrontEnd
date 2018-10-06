<template>
    <div class="bonuslist">
        <div class="box">
            <el-input v-model="username" style="width:220px;" placeholder="输入用户名自动进行搜索" clearable></el-input>
            <el-button @click="getOne()" type="primary">搜索</el-button>
        </div>
        <el-table
        :data="tableData"
        border
        style="width: 100%"
        >
        <el-table-column
            type="index"
            align="center"
            label="编号">
        </el-table-column>
        <el-table-column
            prop="id"
            align="center"
            label="会员ID">
        </el-table-column>
     
        <el-table-column
            prop="status"
            label="状态"
            align="center"
            >
          <template slot-scope="scope">
                <span>{{ scope.row.status | status }}</span>
            </template>
        </el-table-column>
        <el-table-column
        prop="account"
        align="center"
        label="用户名"
        >
        </el-table-column>
        </el-table> 
         <!-- 分页 -->
        <div class="page">
            <el-pagination
               background
               @current-change = "currpage"
               :page-size="pages"
               layout="prev, pager, next"
               :total="total">
            </el-pagination>
         </div>
    </div>
</template>

<script>
import { getAddPrizeBlack } from '@/api/events'
export default {
    data() {
        return {
            tableData: [], // 数据表格
            pages: 20,
            username: '', // 搜索的用户名
            total: 0
        }
    },
    filters:{
        status(a){
            return a ? '有效':'无效'
        }
    },
    created(){
        this.getTables(1)
    },
    methods: {
        getTables(curr) {
            let model = {
                account: this.username,
                page: curr,
                pageSize: 20
            }
            getAddPrizeBlack(model)
            .then(res=>{
                console.log(res.data.error_code)
                if(res.data.error_code == 200){
                    this.tableData = res.data.data.list
                    this.total = res.data.total
                }else{
                    this.$message(res.message)
                }
                
            })
        },
        // 筛选
        getOne(){
            this.getTables(1)
        },
        currpage(val) {
            this.getTables(val)
        }
    }
}
</script>

<style scoped>
.bonuslist{
    padding: 10px 20px
}
div.box{
    padding-bottom: 15px;
}
</style>