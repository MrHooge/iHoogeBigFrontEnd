<template>
    <div class="program">
        <div class="search">
            账号：<el-input v-model="account" placeholder="请输入账户" style="width: 120px;margin-right:40px;margin-bottom:20px;margin-top:40px"></el-input>
            方案编号:<el-input v-model="planNo" placeholder="请输入账户" style="width: 120px;margin-right:40px;margin-bottom:20px;margin-top:40px"></el-input>
            发单时间（起始）：<el-date-picker
            v-model="stime"
            type="date"
            style="margin-bottom:40px;margin-right:20px;width:180px"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd">
            </el-date-picker>
            
            发单时间（截止）：<el-date-picker
            v-model="etime"
            align="right"
            value-format="yyyy-MM-dd"
            type="date"
            style="margin-left:10px;
            width:180px
            margin-bottom:40px;"
            placeholder="请选择结束日期"
            >
            </el-date-picker>
            <el-button type="primary" @click="search" @keyup.13="getone" style="margin-left:100px;margin-bottom:40px;margin-top:40px">查询</el-button>
        </div>
        <div class="tablelist">
        <el-table :data="tableData" border style="width: 100%;">
                <el-table-column
                prop="planNo"
                align="center"
                label="	方案编号">
            </el-table-column>
            <el-table-column
                label="昵称"
                align="center"
                width="180">
                <template slot-scope="scope">
                    {{scope.row.username}}
                </template>
            </el-table-column>
                        <el-table-column
                align="center"
                label="	发单时间">
                <template slot-scope="scope">
                    {{scope.row.createTime | time}}
                </template>
            </el-table-column>

            <el-table-column
                align="center"
                prop="planDesc"
                label="发单宣言"
                style="width:150%">
            </el-table-column>
            <el-table-column
                align="center"
                label="	操作">
               <template slot-scope="scope">
                      <el-button @click="Modificar(scope.row)" type="primary">修改发单宣言</el-button>
                   </template>
            </el-table-column>
        </el-table>
         <el-dialog title="修改" :visible.sync="dialogShenVisible" width="500px" top="30vh">
            <div class="body">
              请输入发单宣言：<el-input v-model="desc"></el-input>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogShenVisible = false">取 消</el-button>
                <el-button type="primary" @click="sure">确定</el-button>
            </div>
        </el-dialog>
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
    </div>
</template>
<script>
import { selectLotteryPlan,updatePlanDesc,planBack,getIsFocusPlan } from '@/api/period'
export default {
    data(){
        return{
            tableData:[],
            account:'',
            startAmount:'',
            endAmount:'',
            startReturnAmount:'',
            endReturnAmount:'',
            planNo:'',
            planStatus:'',
            winStatus:'',
            playType:'',
            stime:'',
            desc:'',
            etime:'',
            page:1,
            pageSize:20,
            planStatus:'',
            dialogShenVisible:false,
            fadan:'',
            totalList: 0,    //
        }
    },
    filters:{
        type(b){
            return b == '' ? '' : b
        },
        time(a){
            if(a != null){
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
            }
        }
    },
    created(){
        this.gettable()
    },
    methods:{
        //获取数据
        gettable(){
            let obj = {
                account:this.account,
                endAmount:this.endAmount,
                endReturnAmount	:this.endReturnAmount,
                endTime:this.etime,
                page:this.page,
                pageSize:this.pageSize,	
                planNo:this.planNo,
                planStatus:this.planStatus,
                playType:this.playType,
                startAmount	:this.startAmount,
                startReturnAmount:this.startReturnAmount,
                startTime:this.stime,
                winStatus:this.winStatus,
                desc:''
            }
            selectLotteryPlan(obj).then(res =>{
                console.log(res.data.error_code)
                if(res.data.error_code === 200){
                    this.tableData = res.data.data
                    this.fadan = res.data.data.planStatus
                    this.totalList = res.data.totalCount
                }else{
                    this.$message.error(res.data.message)
                }
            })
        },
        //修改发单宣言
        Modificar(){
            this.dialogShenVisible = true;
        },
        //确认修改发单宣言
        sure(){
            let subnewobj ={
                plamNo:this.planNo,
                desc:this.desc
            }
            updatePlanDesc(subnewobj).then(res => {
                if(res.data.error_code == 200){
                    this.$message(res.data.message)
                    this.dialogShenVisible = false
                }else{
                    this.$message(res.data.message)
                }
            })
        },
        //查询
        search(){
            this.page = 1
            this.gettable()
        },
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
        //确认
        sure(){
            updatePlanDesc(this.desc,this.planNo)
            .then(res => {
                if(res.data.error_code == 200){
                    this.$message(res.data.message);
                    this.dialogShenVisible = false;
                    this.planNo = '';
                     this.gettable()
                }
            })
        }
    }
}
</script>

<style>
.program{
    padding: 10px 20px
}
</style>
