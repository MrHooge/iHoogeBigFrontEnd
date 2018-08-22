<template>
    <div class="withdraw">
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                prop="account"
                label="用户名" align="center">
            </el-table-column>
            <el-table-column
                prop="clouds"
                label="云朵数量" align="center">
            </el-table-column>
           <el-table-column
                prop="picture"
                label="头像" align="center">
            </el-table-column>
            <el-table-column
                prop="userName"
                label="昵称" align="center">
            </el-table-column>
            <el-table-column
                prop="money"
                label="费用" align="center">
            </el-table-column>
            <el-table-column
                label="操作"
                width="200" align="center"
                >
                <template slot-scope="scope">
                    <el-button type="primary" @click="adopt(scope.row)">提款</el-button>           
                </template>    
            </el-table-column>
        </el-table>
        <div class="page">
             <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-count="totalPages"
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
import { withdrawCashList,withdrawCashConfirm } from '@/api/grandmaster'
export default {
    data() {
        return {
            tableData: [], //表格数据
            page:1,
            pageSize:20
        }
    },
    created(){
        this.gettable()
    },
    methods:{
        //翻页
        handleCurrentChange(num){
            this.page = num;
            this.gettable()
        },
        //改变页面大小
        handleSizeChange(num){
            this.pageSize = num;
            this.gettable()
            },
            //获取列表数据
            gettable(){
                let obj = {
                    offset:this.page,
                    pageSize:this.pageSize
                }
                withdrawCashList(obj)
                .then(res => {
                    this.tableData = res.data.data.list
                })
            },
            //提款操作
            adopt(data){
                let account = data.account;
                withdrawCashConfirm(account)
                .then(res => {
                    if(res.data.error_code == 200){
                        this.$message(res.data.message)

                    }
                })
            }
    }
}
</script>

<style scoped>
.withdraw{
    padding: 10px 20px
}
</style>
