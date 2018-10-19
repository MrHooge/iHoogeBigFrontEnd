<template>
    <div class="search">
        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column
                prop="create_time"
                label="时间"
                align="center"
                width="180">
            </el-table-column>

            <el-table-column
                prop="is_move"
                align="center"
                label="操作">
            </el-table-column>

            <el-table-column
                align="center"
                label="是否成功">
                <template slot-scope="scope">
                    {{scope.row.is_success | issuccess}}
                </template>
            </el-table-column>

            <el-table-column
                prop="member_account"
                align="center"
                label="会员昵称">
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
import { memberMoveLogs } from '@/api/customer'
import { Message, MessageBox } from 'element-ui'
export default {
    data(){
        return {
            page:1,
            pageSize:20,
            tableData:[],
            totalList: 0,  
        }
    },
    created(){
        this.gettabledata()
    },
    filters:{
        issuccess(a){
            return a === 0 ? '成功':'失败'
        }
    },
    methods:{
        gettabledata(){
            memberMoveLogs(this.page,this.pageSize).then(res => {
                if(res.data.error_code === 200){
                    this.tableData = res.data.data.list
                    this.totalList = res.data.data.total
                }else{
                    this.$message.error(res.data.data)
                }
                
            }).catch(error =>{
                Message.error(error)
            })
        },
        //翻页
        handleCurrentChange(num){
            this.page = num;
            this.gettabledata()
        },
        //改变页面大小
        handleSizeChange(num){
            this.pageSize = num;
            this.gettabledata()
        },
    }

}
</script>

<style scoped>
.search{
    padding: 10px 20px;
}
</style>
