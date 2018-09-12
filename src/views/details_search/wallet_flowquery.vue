<template>
    <div class="wallet">
        <div class="search">
            账号：<el-input v-model="account" placeholder="请输入账户" style="width: 150px;margin-right:40px;margin-bottom:20px;margin-top:40px"></el-input>
            昵称：<el-input v-model="username" placeholder="请输入昵称" style="width: 150px;margin-right:40px;margin-bottom:20px;margin-top:40px"></el-input>
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
            <el-select v-model="child_type"
			           placeholder="请选择状态筛选数据"
			           @change="filter"
                       style="width:11%">
				<el-option v-for="item in options1"
				           :key="item.child_type"
				           :label="item.label"
				           :value="item.child_type"
                           >
				</el-option>
               
			</el-select>
            <el-select v-model="type"
			           placeholder="请选择状态筛选数据"
			           @change="filter"
                       style="width:11%">
				<el-option v-for="item in options2"
				           :key="item.type"
				           :label="item.label"
				           :value="item.type"
                           >
				</el-option>
               
			</el-select>
            <!-- <el-radio v-model="child_type" label="41" border>发红包</el-radio>
            <el-radio v-model="child_type" label="42" border>抢红包</el-radio>
            <el-radio v-model="child_type" label="43" border>退还红包</el-radio> -->
            <el-button type="primary" @click="search" @keyup.13="getone" style="margin-left:100px;margin-bottom:40px;margin-top:40px">查询</el-button>
        </div>
        <div class="tablelist">
        <el-table :data="tableData" border style="width: 100%;">
             <el-table-column
                prop="wallet_Line_No"
                align="center"
                label="	流水号">
               
            </el-table-column>
              <el-table-column
                prop="username"
                align="center"
                label="	用户名">
               
            </el-table-column>
            <el-table-column
                prop="ACCOUNT"
                align="center"
                label="	账号">
            </el-table-column>
            <el-table-column
                align="center"
                label="	发生时间">
                <template slot-scope="scope">
                    {{scope.row.CREATE_DATE_TIME | time}}
                </template>
            </el-table-column>
            <el-table-column
                prop="PLAN_NO"
                align="center"
                label="	方案号">           
            </el-table-column>
            <!-- <el-table-column
                prop="LOTTERY_TYPE"
                align="center"
                label="方案类型">
            </el-table-column> -->
            <el-table-column
                prop="LOTTERY_TYPE_NAME"
                align="center"
                label="方案类型说明">
            </el-table-column>
            <el-table-column
                prop="REMARK"
                align="center"
                label="流水描述">           
            </el-table-column>
            <el-table-column
                prop="AMOUNT"
                label="发生金额"
                align="center"
                width="180">
            </el-table-column>
            <el-table-column
                prop="ABLE_BALANCE"
                label="可用金额"
                align="center"
                width="180">
            </el-table-column>
            <el-table-column
                prop="TRANS_TYPE_NAME"
                align="center"
                label="	发生类型">
            </el-table-column>
              <el-table-column
                prop="HEAP_BALANCE"
                align="center"
                label="	历史消费">
            </el-table-column>
            <!-- <el-table-column
                prop="TRANS_TYPE"
                align="center"
                label="	发生类型说明">
               
            </el-table-column> -->
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
            style="margin-top:40px"
            >
            </el-pagination>
    </div>
</template>

<script>
import { findMemberWalletLineByAccount } from '@/api/customerDetails'
import { findAllMember} from '@/api/customer'
import { Message, MessageBox } from 'element-ui'
export default {
    data(){
        return {
            isIndeterminate: true,
            tableData:[],
            account:'',
            stime:'',
            etime:'',
            qdAccount:'',
            dlAccount:'',
            page:1,
            pageSize: 20,
            child_type: '',  //具体类型
            totalList: 0,
            username: '',   //输入查询的昵称
            type: '',   //显示类型

            options1: [
				{ child_type: "41", label: "发红包" },
				{ child_type: "42", label: "抢红包" },
                { child_type: "43", label: "退还红包" },
                { child_type: "1056", label: "返点佣金" },
                { child_type: "2059", label: "发单佣金" },
                { child_type: "2060", label: "跟单佣金" },
            ],

            options2: [
				{ type: "0", label: "全部" },
				{ type: "1", label: "支出" },
                { type: "2", label: "充值类型" },
                { type: "3", label: "消费类型" },
                { type: "4", label: "退款类型" },
                { type: "5", label: "奖金类型" },
                { type: "6", label: "赠送类型" },
                { type: "7", label: "提款" },
                { type: "8", label: "提款退单" },
                { type: "9", label: "其他" },
                { type: "10", label: "可提现" },
            ],
        }
    },
    created(){
        if(this.$route.query.account){
            this.account = this.$route.query.account
        }
        this.inquire()
    },
    filters:{
       time(a){
            let date = new Date(a);
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            return MM + '-' + d + ' ' + h + ':' + m + ':' + s;
        },
  },
    methods:{
        //筛选查询
        filter(){
            this.inquire()
        },
        //获取数据
        inquire(){
            let wallerdata = {
                account: this.account,
                end_time: this.etime,
                start_time: this.stime,
                qdAccount: this.qdAccount,
                dlAccount: this.dlAccount,
                loginAccount: 'manager',
                page: this.page,
                pageSize: this.pageSize,
                child_type: this.child_type,
                type: this.type
            }
            findMemberWalletLineByAccount(wallerdata).then(res => {
                console.log(res)
                if(res.data.error_code === 200){
                    this.tableData = res.data.data.list
                    this.totalList = res.data.data.total
                }else{
                    this.$message.error(res.data.message)
                }
            }).catch(error => {
                Message.error(error)
            })
        },
        //查询
        search() {
			if (!this.account && !this.username) {
                // this.$message("请输入您要查询的账号或昵称！")
                this.inquire()
			} else {
                if(this.account == ''){
                    this.getAccount()
                }else{
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
                console.log(res.data.data.list[0].ACCOUNT)
                this.account = res.data.data.list[0].ACCOUNT
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
