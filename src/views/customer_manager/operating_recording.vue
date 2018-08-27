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
                prop="is_success"
                align="center"
                label="是否成功">
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
            tableData:[]
        }
    },
    created(){
        this.gettabledata()
    },
    methods:{
        gettabledata(){

            memberMoveLogs(this.page,this.pageSize).then(res => {
                //console.log(res.data)
                this.tableData.push(res.data.data.list)
            }).catch(error =>{
                Message.error(error)
            })
        }
    }

}
</script>

<style scoped>
.search{
    padding: 10px 20px;
}
</style>
