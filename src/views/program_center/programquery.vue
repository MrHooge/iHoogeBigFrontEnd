<template>
    <div class="program">
        <div class="search">
            账号：<el-input v-model="account" placeholder="请输入账户" style="width: 120px;margin-right:40px;margin-bottom:20px;margin-top:40px"></el-input>
            发单金额（起始）:<el-input v-model="startAmount" placeholder="请输入账户" style="width: 120px;margin-right:40px;margin-bottom:20px;margin-top:40px"></el-input>
            发单金额（截止）:<el-input v-model="endAmount" placeholder="请输入账户" style="width: 120px;margin-right:40px;margin-bottom:20px;margin-top:40px"></el-input>
            税后奖金（起始）:<el-input v-model="startReturnAmount" placeholder="请输入账户" style="width: 120px;margin-right:40px;margin-bottom:20px;margin-top:40px"></el-input>
            税后奖金（截止）:<el-input v-model="endReturnAmount" placeholder="请输入账户" style="width: 120px;margin-right:40px;margin-bottom:20px;margin-top:40px"></el-input>
            方案编号:<el-input v-model="planNo" placeholder="请输入账户" style="width: 120px;margin-right:40px;margin-bottom:20px;margin-top:40px"></el-input><br />
            方案状态：<el-radio v-model="planStatus" label="1" border style="margin:5px;" size="mini">未支付</el-radio>
                    <el-radio v-model="planStatus" label="3" border style="margin:5px;" size="mini">出票中 </el-radio>
                    <el-radio v-model="planStatus" label="4" border style="margin:5px;" size="mini">已出票</el-radio>
                    <el-radio v-model="planStatus" label="9" border style="margin:5px;" size="mini">未出票作废</el-radio>
            中奖状态：<el-radio v-model="winStatus" label="1" border style="margin:5px;" size="mini">未开奖</el-radio>
                    <el-radio v-model="winStatus" label="2" border style="margin:5px;" size="mini">未中奖 </el-radio>
                    <el-radio v-model="winStatus" label="3" border style="margin:5px;" size="mini">已中奖</el-radio>
                    <el-radio v-model="winStatus" label="4" border style="margin:5px;" size="mini">已派奖</el-radio>
                    <el-radio v-model="winStatus" label="11" border style="margin:5px;" size="mini">未出票作废</el-radio>
            玩法：<el-radio v-model="playType" label="1" border style="margin:5px;" size="mini">未支付</el-radio>
                    <el-radio v-model="playType" label="3" border style="margin:5px;" size="mini">出票中 </el-radio>
                    <el-radio v-model="playType" label="4" border style="margin:5px;" size="mini">已出票</el-radio>
                    <el-radio v-model="playType" label="9" border style="margin:5px;" size="mini">未出票作废</el-radio><br />
            发单时间（起始）：<el-date-picker
            v-model="stime"
            type="date"
            style="margin-bottom:40px;margin-right:20px;width:200px"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd">
            </el-date-picker>
            
            发单时间（截止）：<el-date-picker
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
            <el-button type="primary" @click="search" @keyup.13="getone" style="margin-left:100px;margin-bottom:40px;margin-top:40px">查询</el-button>
        </div>
        <div class="tablelist">
        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column
                prop="account"
                label="用户名"
                align="center"
                width="180">
            </el-table-column>

            <el-table-column
                prop="amount"
                align="center"
                label="		金额">
            </el-table-column>
            <el-table-column
                prop="lotteryType"
                align="center"
                label="	彩种">
            </el-table-column>
            <el-table-column
                prop="planNo"
                align="center"
                label="	方案编号">
            </el-table-column>
            <el-table-column
                prop="planStatus"
                align="center"
                label="方案状态">
            </el-table-column>
            <!-- <el-table-column
                align="center"
                label="发单宣言">
                <template slot-scope="scope">
                     {{scope.row.planDesc |type}}
                </template>
            </el-table-column> -->
            <el-table-column
                prop="playType"
                align="center"
                label="	玩法">           
            </el-table-column>
            <el-table-column
                prop="posttaxPrize"
                align="center"
                label="税后奖金">           
            </el-table-column>
            <el-table-column
                prop="term"
                align="center"
                label="	彩期">
               
            </el-table-column>
            <el-table-column
                align="center"
                label="	发单时间">
                <template slot-scope="scope">
                    {{scope.row.createTime | time}}
                </template>
            </el-table-column>

            <el-table-column
                prop="winStatus"
                align="center"
                label="	中奖状态">
               
            </el-table-column>
           
            <el-table-column
                align="center"
                label="	操作">
                <template slot-scope="scope">
               <el-button type="primary" @click="inquire(scope.row,'modify')">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
         <el-dialog title="修改" :visible.sync="dialogShenVisible" width="500px" top="30vh">
            <div class="body">
              请输入罚单宣言：<el-input v-model="desc"></el-input>
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
    </div>
</template>

<script>
import { selectLotteryPlan,updatePlanDesc } from '@/api/period'
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
            etime:'',
            page:1,
            pageSize:10,
            planStatus:'',
            dialogShenVisible:false
        }
    },
    filters:{
        type(b){
            return b == '' ? '' : b
        },
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
                console.log(res.data.data)
                this.tableData = res.data.data
            })
        },
        //查询
        search(){
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
        //修改
        inquire(data){
            this.dialogShenVisible = true;
            this.planNo = data.planNo;
            this.desc = data.planDesc
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
