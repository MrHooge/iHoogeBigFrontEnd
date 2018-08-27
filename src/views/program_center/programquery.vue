<template>
    <div class="program">
        <div class="search">
            账号：<el-input v-model="account" placeholder="请输入账户" style="width: 120px;margin-right:40px;margin-bottom:20px;margin-top:40px"></el-input>
            方案编号:<el-input v-model="planNo" placeholder="请输入账户" style="width: 120px;margin-right:40px;margin-bottom:20px;margin-top:40px"></el-input>
            发单金额:<el-input v-model="startAmount" placeholder="请输入最小值" style="width: 120px;margin-right:5px;margin-bottom:20px;margin-top:40px"></el-input>至<el-input v-model="endAmount" placeholder="请输入最大值" style="width: 120px;margin-right:40px;margin-bottom:20px;margin-top:40px;margin-left:5px"></el-input>
            税后奖金:<el-input v-model="startReturnAmount" placeholder="请输入最小值" style="width: 120px;margin-right:5px;margin-bottom:20px;margin-top:40px"></el-input>至<el-input v-model="endReturnAmount" placeholder="请输入最大值" style="width: 120px;margin-right:40px;margin-bottom:20px;margin-top:40px"></el-input>
            方案状态：<el-select v-model="planStatus"
			           placeholder="请选择状态筛选数据"
			           @change="getval"
                       style="width:7%">
				<el-option v-for="item in options"
				           :key="item.planStatus"
				           :label="item.label"
				           :value="item.planStatus">
				</el-option>
               
			</el-select>
            中奖状态：<el-select v-model="winStatus"
			           placeholder="请选择状态筛选数据"
			           @change="getval"
                       style="width:7%">
				<el-option v-for="item in sections"
				           :key="item.winStatus"
				           :label="item.label"
				           :value="item.winStatus">
				</el-option>
               
			</el-select><br />
            玩法：<el-select v-model="playType"
			           placeholder="请选择状态筛选数据"
			           @change="getval"
                       style="width:5%">
				<el-option v-for="item in directions"
				           :key="item.playType"
				           :label="item.label"
				           :value="item.playType">
				</el-option>
               
			</el-select>
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
            <el-button type="primary" @click="FokusEreignis">是否焦点赛事内购买</el-button>
        </div>
        <div class="tablelist">
        <el-table :data="tableData" border style="width: 100%;">
                        <el-table-column
                prop="planNo"
                align="center"
                label="	方案编号">
            </el-table-column>
            <el-table-column
                label="用户名"
                align="center"
                width="180">
                <template slot-scope="scope">
                    <span @click="getupnewweb(scope.row.account)">
                    {{scope.row.account}}
                    </span>
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
                prop="amount"
                align="center"
                label="		金额">
            </el-table-column>
            <el-table-column
                prop="planStatus"
                align="center"
                label="方案状态">
            </el-table-column>
            <el-table-column
                prop="lotteryType"
                align="center"
                label="	彩种">
            </el-table-column>
                        <el-table-column
                prop="term"
                align="center"
                label="	彩期">
               
            </el-table-column>
            <el-table-column
                prop="playType"
                align="center"
                label="	玩法">           
            </el-table-column>

            <el-table-column
                prop="winStatus"
                align="center"
                label="	中奖状态">
               
            </el-table-column>
                       <el-table-column
                prop="posttaxPrize"
                align="center"
                label="税后奖金">           
            </el-table-column>
            <el-table-column
                align="center"
                label="发单宣言">
                <template slot-scope="scope">
                    <el-popover
                        placement="top-start"
                        width="200"
                        trigger="hover"
                        :content="fadan">
                        <el-button slot="reference">详细内容</el-button>
                    </el-popover>

                     <!-- {{scope.row.planDesc |type}} -->
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="	操作">
               <template slot-scope="scope">
                       <el-dropdown>
                           <el-button type="primary" style="width:70px">操作</el-button>
                           <el-dropdown-menu slot="dropdown">
                               <el-button type="warning" @click="wallet(scope.row,'modify')">修改宣言</el-button>
                                   <el-popover
                                    placement="right"
                                    width="1300"
                                    trigger="click">
                                   </el-popover>
                                   <el-button type="warning" @click="Szczegol(scope.row)">明细</el-button>&nbsp;
                                   &nbsp;&nbsp;<el-button type="warning" @click="Chargeback(scope.row,'modify')">退单</el-button>
                                   <el-button type="warning" @click="wallet(scope.row,'modify')">冲正</el-button>
                                </el-dropdown-menu>
                                </el-dropdown> 
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
            etime:'',
            page:1,
            pageSize:20,
            planStatus:'',
            dialogShenVisible:false,
            fadan:'',
            options: [
				{ planStatus: "", label: "全部" },
				{ planStatus: "1", label: "未支付" },
				{ planStatus: "3", label: "出票中" },
                { planStatus: "4", label: "已出票" },
                { planStatus: "9", label: "未出票作废" }
            ],
            sections: [
				{ winStatus: "", label: "全部" },
				{ winStatus: "1", label: "未开奖" },
				{ winStatus: "2", label: "未中奖" },
                { winStatus: "3", label: "已中奖" },
                { winStatus: "4", label: "已派奖" },
                { winStatus: "11", label: "未出票作废" }
            ],
            directions: [
				{ playType: "", label: "全部" },
				{ playType: "117", label: "单关" },
				{ playType: "118", label: "2串1" },
                { playType: "119", label: "3串1" },
                { playType: "120", label: "4串1" },
                { playType: "121", label: "5串1" },
                { playType: "122", label: "6串1" },
                { playType: "123", label: "7串1" },
                { playType: "124", label: "8串1" },
            ]
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
            return MM + '-' + d + ' ' + h + ':' + m + ':' + s;

        },
    },
    created(){
        this.gettable()
    },
    methods:{
        //点击账号跳转会员管理页面
        getupnewweb(a){
            // console.log(111111111111111111)
            // console.log(a)

             this.$router.push({path:'/customerManager/customerManager',query:{account:a}})
        },
        //明细页面跳转
        Szczegol(parse){
         let routeData = this.$router.resolve({ path: '/programCenter/Detail', query: {  planNo: parse.planNo } });
            window.open(routeData.href, '_blank');
        },
        getval(){
            console.log(this.planStatus)
            this.gettable()
        },
        FokusEreignis(){
            let Schema = {
                planNo:this.planNo
            }
            getIsFocusPlan(Schema)
            .then(res => {
                if(res.data == 'true'){
                    this.$message('是')
                }else{
                    this.$message('否')
                }
            })
        },
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
                this.tableData = res.data.data
                this.fadan = res.data.data.planStatus
                this.tableData.forEach((e,index) => {
                    console.log(1324654879)
                    console.log(e)
                    this.fadan = e.planDesc
                })
            })
        },
        //退单
        Chargeback(data){
        // console.log(data)
        let subject = {
            planNo:data.planNo
        }
        planBack(subject)
        .then(res => {
            if(res.data.error_code == 200){
                this.$message('退单成功')
            }else{
                this.$message(res.data.message)
            }
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
