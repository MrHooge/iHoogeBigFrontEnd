<template>
    <div class="wallet">
        <div class="search">
            <template>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
            </template>
            <br />
            方案编号：<el-input v-model="name" placeholder="请输入姓名" style="width: 150px;margin-right:40px;margin-bottom:20px;margin-top:40px"></el-input>
            订单编号：<el-input v-model="idcard" placeholder="请输入身份证号" style="width: 150px;margin-right:40px;margin-bottom:20px;margin-top:40px"></el-input>
            追号编号：<el-input v-model="email" placeholder="请输入邮箱" style="width: 150px;margin-right:40px;margin-bottom:20px;margin-top:20px"></el-input>
            钱包流水编号：<el-input v-model="telphone" placeholder="请输入电话" style="width: 150px;margin-right:40px;margin-bottom:20px;margin-top:20px"></el-input>
            渠道ID：<el-input v-model="partner" placeholder="" style="width: 150px;margin-right:40px;margin-bottom:20px;margin-top:20px"></el-input>
            provider：<el-input v-model="partner" placeholder="" style="width: 150px;margin-right:40px;margin-bottom:20px;margin-top:20px"></el-input><br />
            开始时间：<el-date-picker
            v-model="stime"
            type="date"
            style="margin-bottom:40px;margin-right:20px;width:150px"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd">
            </el-date-picker>
            
            结束时间：<el-date-picker
            v-model="etime"
            align="right"
            value-format="yyyy-MM-dd"
            type="date"
            style="margin-left:10px;
            width:150px
            margin-bottom:40px;"
            placeholder="请选择结束日期"
            >
            </el-date-picker>
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
                prop="LOTTERY_TYPE"
                align="center"
                label="彩票类型">
               
            </el-table-column>
            <el-table-column
                prop="PLAN_NO"
                align="center"
                label="	方案号">
               
            </el-table-column>
            <el-table-column
                prop="TRANS_TYPE"
                align="center"
                label="	发生类型">
               
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
    </div>
</template>

<script>
import { findMemberWalletLineByAccount } from '@/api/customerDetails'
import { Message, MessageBox } from 'element-ui'
const cityOptions = ['高频彩', '低频彩', '竞技彩',];
export default {
    data(){
        return {
            checkAll: false,
            checkedCities: [],
            cities: cityOptions,
            isIndeterminate: true,
            tableData:[]
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
                type:''
            }
            findMemberWalletLineByAccount(wallerdata).then(res => {
                this.tableData = res.data.data
            }).catch(error => {
                 Message.error(error)
            })
        }
    }
}
</script>

<style>
.wallet{
    padding: 10px 20px
}
</style>
