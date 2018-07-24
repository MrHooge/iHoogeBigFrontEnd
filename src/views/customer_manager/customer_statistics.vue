<template>
    <div class="statistics">
         <el-input placeholder="请输入用户名" v-model="account" style="width: 300px;margin-right:100px;margin-bottom:30px"></el-input>
         <el-button type="primary" @click="search_customer" @keyup.13="getone" style="margin-left:100px;margin-bottom:30px">搜索</el-button>
        <el-table
               :data="tableData"
               border
               style="width: 100%;">
               <el-table-column
               type="index"
               align="center"
               label="编号">
               </el-table-column>
               <el-table-column
                     label="id"
                     prop="id"
                     align="center">
               </el-table-column>  
               <el-table-column
                     label="账号"
                     prop="account"
                     align="center">
                     
               </el-table-column>
               <el-table-column
                     label="名片"
                     prop="card"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="证件号"
                     prop="certNo"
                     align="center"> 
               </el-table-column>
               <el-table-column
                     label="证件类型"
                     prop="certType"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="邮箱"
                     prop="email"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="是否充值"
                     prop="isCharge"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="是否白名单"
                     prop="isWhitelist"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="最后登陆时间"
                     prop="lastLoginDateTime"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="手机"
                     prop="mobile"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="真实姓名"
                     prop="name"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="头像·"
                     prop="picture"
                     align="center">
                     <template slot-scope="scope">
                         <img :src="scope.row.picture" >
                     </template>
               </el-table-column>
               <el-table-column
                     label="注册时间"
                     prop="registerDateTime"
                     align="center">
               </el-table-column>    
               <el-table-column
                     label="状态"
                     prop="status"
                     align="center">
               </el-table-column>          
               <el-table-column
                     label="类型"
                     prop="type"
                     align="center">
               </el-table-column>  
               <el-table-column
                     label="昵称"
                     prop="username"
                     align="center">
               </el-table-column>  
            </el-table>
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
</template>

<script>
import { findAllMember } from '@/api/customer'
import { Message, MessageBox } from 'element-ui'
export default {
    data(){
        return {
            tableData:[],
             obj:{
                account:'',
                endTime:'',
                mobile:'',
                page:1,
                pageSize:10,
                startTime:'',
                username:''
            }
        }
    },
    created(){
        this.gettablelist()

    },
    methods:{
        //获取表格数据
        gettablelist(){
            findAllMember(this.obj).then(res => {
                this.tableData = res.data.data.list
            }).catch(error => {
                Message.error(error)
            })
        },
        //搜索
        search_customer(){
            if(!this.account){
                this.$message("请输入用户名")
            }else{
               //console.log(1263)
               this.obj.account = this.account;
               this.gettablelist();

            }
        }

    }

}
</script>

<style>
.statistics{
    padding: 10px 20px
}
</style>
