<template>
    <div class="wallet">
        <div class="search">
            账号：<el-input v-model="account" placeholder="请输入账户" style="width: 150px;margin-right:40px;margin-bottom:20px;margin-top:40px"></el-input>
            开始时间：<el-date-picker
            v-model="stime"
            type="date"
            style="margin-bottom:40px;margin-right:20px;width:200px"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd">
            </el-date-picker>
            
            结束时间：<el-date-picker
            v-model="etime"
            align="right"
            value-format="yyyy-MM-dd"
            type="date"
            style="margin-left:10px;
            width:200px
            margin-bottom:40px;"
            placeholder="请选择结束日期"
            >
            </el-date-picker>
            <el-radio v-model="type" label="41" border>发红包</el-radio>
            <el-radio v-model="type" label="42" border>抢红包</el-radio>
            <el-radio v-model="type" label="43" border>退还红包</el-radio>
            <el-button type="primary" @click="inquire" @keyup.13="getone" style="margin-left:100px;margin-bottom:40px;margin-top:40px">查询</el-button>
        </div>
        <div class="tablelist">
        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column
                prop="ABLE_BALANCE"
                label="可用金额"
                align="center"
                width="180">
            </el-table-column>

            <el-table-column
                prop="ACCOUNT"
                align="center"
                label="	账号">
            </el-table-column>
            <el-table-column
                prop="CREATE_DATE_TIME"
                align="center"
                label="	发生时间">
               
            </el-table-column>

            <el-table-column
                prop="HEAP_BALANCE"
                align="center"
                label="	历史消费">
            </el-table-column>
            <el-table-column
                prop="HEAP_BALANCE"
                align="center"
                label="方案类型">
            </el-table-column>
            <el-table-column
                prop="HEAP_BALANCE"
                align="center"
                label="方案类型说明">
            </el-table-column>
            <el-table-column
                prop="PLAN_NO"
                align="center"
                label="	方案号">           
            </el-table-column>
            <el-table-column
                prop="REMARK"
                align="center"
                label="流水描述">           
            </el-table-column>
            <el-table-column
                prop="TRANS_TYPE"
                align="center"
                label="	发生类型">
               
            </el-table-column>
            <el-table-column
                prop="TRANS_TYPE"
                align="center"
                label="	发生类型说明">
               
            </el-table-column>
            <el-table-column
                prop="username"
                align="center"
                label="	用户名">
               
            </el-table-column>
            <el-table-column
                prop="wallet_Line_No"
                align="center"
                label="	流水号">
               
            </el-table-column>
        </el-table>
        </div>
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
            style="margin-top:40px"
            >
            </el-pagination>
    </div>
</template>

<script>
import { findMemberWalletLineByAccount } from '@/api/customerDetails'
import { Message, MessageBox } from 'element-ui'
export default {
    data(){
        return {
            type:'',
            isIndeterminate: true,
            tableData:[],
            account:'',
            stime:'',
            etime:'',
            qdAccount:'',
            dlAccount:'',
            page:1,
            pageSize:20
        }
    },
    created(){
        this.getfluwwallet()
    },
    methods:{
        getfluwwallet(){
            let wallerdata = {
                account:'',
                end_time:'',
                start_time:'',
                child_type:'',
                qdAccount:'',
                dlAccount:'',
                loginAccount:'manager',
                page:this.page,
                pageSize:this.pageSize,
                child_type:this.type
            }
            findMemberWalletLineByAccount(wallerdata).then(res => {
                console.log(res.data.data.list)
                 this.tableData = res.data.data.list
            }).catch(error => {
                 Message.error(error)
            })
        },
         //查询
        inquire(){
            let wallerdata = {
                account:this.account,
                end_time:this.etime,
                start_time:this.stime,
                qdAccount:this.qdAccount,
                dlAccount:this.dlAccount,
                loginAccount:'manager',
                page:this.page,
                pageSize:this.pageSize,
                child_type:this.type,
                type:''
            }
            findMemberWalletLineByAccount(wallerdata).then(res => {
                this.tableData = res.data.data.list
            }).catch(error => {
                 Message.error(error)
            })
        },
        //翻页
        handleCurrentChange(num){
            this.page = num;
            this.getfluwwallet()
        },
        //改变页面大小
        handleSizeChange(num){
            this.pageSize = num;
            this.getfluwwallet()
        },
    }
}
</script>

<style>
.wallet{
    padding: 10px 20px
}
</style>
