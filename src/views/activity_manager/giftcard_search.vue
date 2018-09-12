<template>
    <div class="gift">
        <div>
         账号：<el-input v-model="account" placeholder="请输入账号" style="width: 150px;margin-right:70px;margin-bottom:20px;margin-top:40px"></el-input>
         昵称：<el-input v-model="username" placeholder="请输入昵称" style="width: 150px;margin-right:70px;margin-bottom:20px;margin-top:40px"></el-input>
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
             <el-button type="primary" @click="inquire" @keyup.13="getone" style="margin-left:100px;margin-bottom:40px;margin-top:40px">查询</el-button>
        </div>
        <div>
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
                     label="用户账号"
                     prop="account"
                     align="center">    
               </el-table-column>
                <el-table-column
                     label="彩金卡名字"
                     prop="card_name"
                     align="center">
               </el-table-column> 
                  <el-table-column
                     label="获得时间"
                     align="center">
                     <template slot-scope="scope">
                    {{scope.row.create_time | time}}
                     </template>
               </el-table-column>
                <el-table-column
                     label="截止时间"
                     align="center">
                     <template slot-scope="scope">
                    {{scope.row.deadline_time | time}}
                     </template>
               </el-table-column>    
                <el-table-column
                    prop="full_amount"
                    label="满额度使用"
                    align="center">
               </el-table-column>
               <el-table-column
                     label="金额"
                     prop="money"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="获得渠道"
                     align="center">
                      <template slot-scope="scope">
                    {{scope.row.require_type | type}}
                </template>
               </el-table-column> 
               <el-table-column
                     label="状态"
                     align="center">
                     <template slot-scope="scope">
                    {{scope.row.status | studio}}
                </template>
               </el-table-column>
               <el-table-column
                     label="使用时间"
                     align="center">
                     <template slot-scope="scope">
                    {{scope.row.use_time | time}}
                     </template>
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
            style="margin-top:40px"
            >
            </el-pagination>
    </div>
</template>

<script>
import { findGoldCard } from '@/api/activity'
import { findAllMember} from '@/api/customer'
export default {
    data(){
        return{
            tableData:[],
            account:'',
            etime:'',
            stime:'',
            page: 1,
            pageSize: 20,
            totalList: 0,
            username: "",   //查询输入的昵称
        }
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
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;

        },
        type(m){
            if(m == 0){
                return "抽奖获得"
            }else if(m == 1){
                return "线下充值大礼包"
            }else{
                return "运营后台赠送"
            }
        },
         studio(s){
            if(s == 0){
                return "未使用"
            }else if(s == 1){
                return "已使用"
            }else{
                return "已过期	"
            }
        }
    },
    created(){
        this.getTdable()
    },
    methods:{
        //点击查询按钮调用
        inquire(){
            // if(this.account == ''){
            //     this.$message('请输入账号')
            // }else if(this.stime == ''){
            //     this.$message('请输入开始时间')
            // }else if(this.etime == ''){
            //     this.$message('请输入结束时间')
            // }else{
            //     this.getTdable()
            // }
            if (!this.account && !this.username) {
                // this.$message("请输入您要查询的账号或昵称！")
                this.getTdable()
			} else {
                if(this.account === ''){
                    this.getAccount()
                }else{
                    this.getTdable()
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
                this.getTdable()
            })
        },
        getTdable(){
            let obj = {
                account: this.account,
                endTime: this.etime,
                startTime: this.stime,
                page: this.page,
                pageSize: this.pageSize,
            }
            findGoldCard(obj)
            .then(res => {
                if(res.data.error_code === 200){
                    this.tableData = res.data.data.list
                    this.totalList = res.data.data.total
                }else{
                    this.$message(res.data.message)
                }
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
.gift{
    padding: 10px 20px
}
</style>
