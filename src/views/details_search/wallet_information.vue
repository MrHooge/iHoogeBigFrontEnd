<template>
    <div class="wallet">
        <div class="search">
            账号：<el-input v-model="account" placeholder="请输入账户" style="width: 150px;margin-right:40px;margin-bottom:20px;margin-top:40px" clearable></el-input>
            昵称：<el-input v-model="username" placeholder="请输入昵称" style="width: 150px;margin-right:40px;margin-bottom:20px;margin-top:40px" clearable></el-input>
            <el-button type="primary" @click="search" @keyup.13="getone" style="margin-left:100px;margin-bottom:40px;margin-top:40px">查询</el-button>
            <span style="font-size:16px;">可用余额统计：{{ableBalanceCount}}元</span>
            <span style="color:red;font-size:14px;margin-left:10px;">注：该统计数是所有用户的统计</span>
        </div>
        <div class="tablelist">
        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column
                prop="account"
                align="center"
                label="	账号">
            </el-table-column>
            <el-table-column
                prop="memberId"
                align="center"
                label="账号id">
            </el-table-column>
             <el-table-column
                prop="id"
                align="center"
                label="钱包id">
            </el-table-column>
            <el-table-column
                prop="freezeBalance"
                align="center"
                label="冻结金额">           
            </el-table-column>
            <el-table-column
                prop="takeCashQuota"
                align="center"
                label="可提现余额">
            </el-table-column>
            <el-table-column
                prop="ableBalance"
                align="center"
                label="可用余额">
            </el-table-column>
        </el-table>
        </div>
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
            style="margin-top:40px"
            >
            </el-pagination>
    </div>
</template>

<script>
import { findAllMemberWalletInfo,countMemberWalletInfo } from '@/api/sys_user'
import { findAllMember} from '@/api/customer'
import { Message, MessageBox } from 'element-ui'
export default {
    data(){
        return {
            tableData:[],
            account:'',
            page:1,
            pageSize: 20,
            totalList: 0,
            username: '',   //输入查询的昵称
            ableBalanceCount: '',   //可用余额统计
        }
    },
    created(){
        if(this.$route.query.account){
            this.account = this.$route.query.account
        }
        this.inquire()
        this.getCount()
    },
    methods:{
        //筛选查询
        filter(){
            this.page = 1
            this.inquire()
        },
        //获取数据
        inquire(){
            let obj = {
                account: this.account,
                page: this.page,
                pageSize: this.pageSize,
            }
            findAllMemberWalletInfo(obj).then(res => {
                if(res.data.error_code === 200){
                    this.tableData = res.data.data.list
                    this.totalList = res.data.data.total
                    this.$message.success(res.data.message)
                }else{
                    this.$message.error(res.data.message)
                }
            }).catch(error => {
                Message.error(error)
            })
        },
        //获取金额统计
        getCount(){
            countMemberWalletInfo().then(res =>{
                if(res.data.error_code === 200){
                    this.ableBalanceCount = res.data.data.ABLE_BALANCE
                }else{
                    this.$message.error('金额统计失败！')
                }
            })
        },
        //查询
        search() {
			if (!this.account && !this.username) {
                this.page = 1
                this.inquire()
			} else {
                if(this.account === ''){
                    this.getAccount()
                }else{
                    this.page = 1
                    this.inquire()
                }
			}
        },
        //用昵称查询账号
        getAccount(){
            let obj = {
                username: this.username
            }
            findAllMember(obj).then(res => {
                this.account = res.data.data.list[0].ACCOUNT
                this.page = 1
                this.inquire()
            })
        },
        //翻页
        handleCurrentChange(num){
            this.page = num;
            this.inquire()
        },
        //改变页面大小
        handleSizeChange(num){
            this.pageSize = num;
            this.inquire()
        },
    }
}
</script>

<style>
.wallet{
    padding: 10px 20px
}
</style>
