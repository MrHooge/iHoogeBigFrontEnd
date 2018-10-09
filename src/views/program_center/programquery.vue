<template>
    <div class="program">
        <div class="search">
            账号：<el-input v-model="account" placeholder="请输入账户" style="width: 120px;margin-right:40px;margin-bottom:20px;margin-top:40px" clearable></el-input>
            昵称：<el-input v-model="username" placeholder="请输入昵称" style="width: 120px;margin-right:40px;margin-bottom:20px;margin-top:40px" clearable></el-input>
            方案编号:<el-input v-model="planNo" placeholder="请输入方案编号" style="width: 130px;margin-right:30px;margin-bottom:20px;margin-top:40px" clearable></el-input>
            发单金额:<el-input v-model="startAmount" placeholder="请输入最小值" style="width: 120px;margin-right:5px;margin-bottom:20px;margin-top:40px" clearable></el-input>至<el-input v-model="endAmount" placeholder="请输入最大值" style="width: 120px;margin-right:40px;margin-bottom:20px;margin-top:40px;margin-left:5px"></el-input>
            税后奖金:<el-input v-model="startReturnAmount" placeholder="请输入最小值" style="width: 120px;margin-right:5px;margin-bottom:20px;margin-top:40px" clearable></el-input>至<el-input v-model="endReturnAmount" placeholder="请输入最大值" style="width: 120px;margin-right:300px;margin-bottom:20px;margin-top:40px"></el-input>
            方案状态：<el-select v-model="planStatus"
			           placeholder="请选择状态筛选数据"
			           @change="getval"
                       style="width:8%">
				<el-option v-for="item in options"
				           :key="item.planStatus"
				           :label="item.label"
				           :value="item.planStatus"
                           >
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
                       style="width:10%">
				<el-option v-for="item in directions"
				           :key="item.playType"
				           :label="item.label"
				           :value="item.playType">
				</el-option>
               
			</el-select>
            发单时间（起始）：<el-date-picker
            v-model="stime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="margin-bottom:40px;margin-right:20px;width:200px"
            placeholder="请选择开始日期">
            </el-date-picker>
            
            发单时间（截止）：<el-date-picker
            v-model="etime"
            align="right"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="margin-left:10px;
            margin-right:30px;
            width:200px;
            margin-bottom:40px;"
            placeholder="请选择结束日期"
            default-time="23:59:59"
            
            >
            </el-date-picker>
             预测奖金：<el-input v-model="minBonus" placeholder="请输入奖金最小值" style="width: 150px;margin-right:5px;margin-bottom:20px;margin-top:40px" clearable></el-input>至
             <el-input v-model="maxBonus" placeholder="请输入奖金最大值" style="width: 150px;margin-right:5px;margin-bottom:20px;margin-top:40px" clearable></el-input>
            <el-button type="primary" @click="search" @keyup.13="getone" style="margin-left:100px;margin-bottom:40px;margin-top:40px">查询</el-button>
            <!-- <el-button type="primary" @click="FokusEreignis">是否焦点赛事内购买</el-button> -->
        </div>
        <div class="tablelist">
            <el-table :data="tableData" border style="width: 100%;">
                <el-table-column
                    align="center"
                    label="方案编号">
                    <template slot-scope="scope">
                        {{scope.row.planNo}}<span style="color:red">{{scope.row.isFocus | shape}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="用户名"
                    align="center">
                    <template slot-scope="scope">
                        <span @click="getupnewweb(scope.row.account)" v-if="scope.row.username">
                        {{scope.row.username}}
                        </span>
                        <span @click="getupnewweb(scope.row.account)" v-else>
                        {{ scope.row.account}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="dlAccount"
                    align="center"
                    label="代理用户名">
                </el-table-column>
                <el-table-column
                    prop="qdAccount"
                    align="center"
                    label="	渠道用户名">
                </el-table-column>
                            <el-table-column
                    align="center"
                    label="发单时间">
                    <template slot-scope="scope">
                        {{scope.row.createTime | time}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="amount"
                    align="center"
                    label="金额">
                </el-table-column>
                <el-table-column
                    prop="planStatus"
                    align="center"
                    label="方案状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.planStatus === '未支付' || scope.row.planStatus === '未出票作废'" style="color: #409eff;">{{scope.row.planStatus}}</span>
                        <span v-else-if="scope.row.planStatus === '出票中'" style="color: #ff0134;">{{scope.row.planStatus}}</span>
                        <span v-else-if="scope.row.planStatus === '已出票'" style="color: green;">{{scope.row.planStatus}}</span>
                        <span v-else>{{scope.row.planStatus}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="lotteryType"
                    align="center"
                    label="彩种">
                </el-table-column>
                <!-- <el-table-column
                    prop="term"
                    align="center"
                    label="彩期">
                </el-table-column> -->
                <el-table-column
                    align="center"
                    label="截止时间">
                    <template slot-scope="scope">
                        {{scope.row.dealTime | time}}
                    </template>   
                </el-table-column>
                <el-table-column
                    prop="playType"
                    align="center"
                    label="玩法">           
                </el-table-column>
                <el-table-column
                    align="center"
                    label="来源">
                    <template slot-scope="scope">
                        {{scope.row.platForm | platForm}}
                    </template>          
                </el-table-column>
                <el-table-column
                    prop="addPrize"
                    align="center"
                    label="嘉奖">           
                </el-table-column>
                <el-table-column
                    prop="winStatus"
                    align="center"
                    label="中奖状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.winStatus === '已派奖'" style="color: #409eff;">{{scope.row.winStatus}}</span>
                        <span v-else-if="scope.row.winStatus === '已中奖'" style="color: #ff0134;">{{scope.row.winStatus}}</span>
                        <span v-else>{{scope.row.winStatus}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="posttaxPrize"
                    align="center"
                    label="税后奖金">           
                </el-table-column>
                <el-table-column
                    prop="maxBonus"
                    align="center"
                    label="预测奖金（最大）">           
                </el-table-column>
                <el-table-column
                    prop="minBonus"
                    align="center"
                    label="预测奖金（最小）">           
                </el-table-column>
                <el-table-column
                    align="center"
                    label="跟单/自购">
                    <template slot-scope="scope">
                        {{scope.row.isSuper | isSuperisSuper}}
                    </template>        
                </el-table-column>
                <el-table-column
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <el-dropdown trigger="click">
                            <el-button type="primary">操作</el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-popover
                                    placement="right"
                                    trigger="click">
                                </el-popover>
                                <el-button type="warning" @click="outticket(scope.row,'modify')">设置出票</el-button>&nbsp;
                                &nbsp;&nbsp;<el-button type="danger" @click="Chargeback(scope.row,'modify')">退单</el-button>
                                <!-- <el-button type="warning" @click="wallet(scope.row,'modify')">冲正</el-button> -->
                                <el-button type="success" @click="Szczegol(scope.row)">明细</el-button>
                            </el-dropdown-menu>
                            </el-dropdown> 
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="退单" :visible.sync="Declarationofwithdrawal" width="500px" top="30vh">
                <div class="body">
                确认退单吗
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="Declarationofwithdrawal = false">取 消</el-button>
                    <el-button type="primary" @click="want">确定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="出票" :visible.sync="undesirabledesabel" width="500px" top="30vh">
                <div class="body">
                确认出票吗
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="undesirabledesabel = false">取消</el-button>
                    <el-button type="primary" @click="getfromyicket">确定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="修改" :visible.sync="dialogShenVisible" width="500px" top="30vh">
                <div class="body">
                    请输入罚单宣言：<el-input v-model="desc" clearable></el-input>
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
            v-if="totalList != ''"
            style="margin-top:40px"
            >
            </el-pagination>
        </div>
    </div>
</template>
<script>
import { selectLotteryPlan,updatePlanDesc,planBack,getIsFocusPlan,updatePlanStatus } from '@/api/period'
import { findAllMember} from '@/api/customer'
export default {
    data(){
        return{
            tableData:[],
            account:'',
            minBonus:'',
            maxBonus:'',
            startAmount:'',
            endAmount:'',
            startReturnAmount:'',
            endReturnAmount:'',
            planNo:'',
            onePlanNo: '',
            planStatus:'',
            winStatus:'',
            playType:'',
            stime:'',
            etime:'',
            page:1,
            pageSize:20,
            desc: '',
            planStatus:'',
            dialogShenVisible:false,
            Declarationofwithdrawal:false,
            undesirabledesabel:false,
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
                { winStatus: "11", label: "已退款" }
            ],
            directions: [
                { playType: "", label: "全部" },
                { playType: "116", label: "自由过关" },
				{ playType: "117", label: "单关" },
				{ playType: "118", label: "2串1" },
                { playType: "119", label: "3串1" },
                { playType: "120", label: "4串1" },
                { playType: "121", label: "5串1" },
                { playType: "122", label: "6串1" },
                { playType: "123", label: "7串1" },
                { playType: "124", label: "8串1" },
            ],
            totalList: 0,

            username: "",   //输入查询的昵称
        }
    },
    filters:{
        //是否跟单
        isSuperisSuper(a){
            a = Number(a)
            if(a === 1){
                return '自购'
            }
            else if(a === 0) {
                return '跟单'
            }
        },
        platForm(a){
            a = Number(a)
            if(a === 1){
                return 'ios'
            }
            else if(a === 2){
                return '安卓'
            }
            else if(a === 3){
                return 'm端'
            }
            else if(a === 4){
                return 'pc端'
            }
        },
        //是否嘉奖
        shape(s){
            return s == true ? "嘉" : ""
        },
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
        // this.gettable()
        this.getTodayDate()
    },
    methods:{
        getTodayDate(){
                let date = new Date()
                console.log(date)
                let y = date.getFullYear();
                let m = date.getMonth() + 1;
                m = m < 10 ? ('0' + m) : m;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                this.stime =  y + '-' + m + '-' + d +' '+ '00:00:00';
                console.log(this.stime)
                this.etime = y + '-' + m + '-' + d +' '+ '23:59:59';
                console.log(this.etime)
                this.gettable()
        },
        //将中国标准时间转换为日期
        // changeTime(date){
        //     if(date != ''){
        //         let y = date.getFullYear();
        //         let m = date.getMonth() + 1;
        //         m = m < 10 ? ('0' + m) : m;
        //         let d = date.getDate();
        //         d = d < 10 ? ('0' + d) : d;
        //         let h = date.getHours();
        //         h = h < 10 ? ('0' + h) : h;
        //         let minute = date.getMinutes();
        //         minute = minute < 10 ? ('0' + minute) : minute;
        //         let seconds = date.getSeconds();
        //         seconds = seconds < 10 ? ('0' + seconds) : seconds;
        //         return y + '-' + m + '-' + d +' '+ h + ':' + minute + ':' + seconds;
        //     }
        // },
        //点击账号跳转会员管理页面
        getupnewweb(a){
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
                dlAccount:'',
                pageSize:this.pageSize,	
                planNo:this.planNo,
                planStatus:this.planStatus,
                playType:this.playType,
                startAmount	:this.startAmount,
                startReturnAmount:this.startReturnAmount,
                startTime:this.stime,
                maxBonus:this.maxBonus,
                minBonus:this.minBonus,
                winStatus:this.winStatus,
                desc:this.desc
            }
            selectLotteryPlan(obj).then(res =>{
                console.log(res)
                this.tableData = res.data.data
                this.totalList = res.data.totalCount
                this.fadan = res.data.data.planStatus
                this.tableData.forEach((e,index) => {
                    this.fadan = e.planDesc
                })
            })
        },
        //出票
        outticket(data){
            this.undesirabledesabel = true
            this.onePlanNo = data.planNo
        },
        //确认出票
        getfromyicket(){
            updatePlanStatus(this.onePlanNo).then(res => {
                if(res.data.error_code == 200){
                    this.$message.success('出票成功')
                    this.undesirabledesabel = false
                    this.gettable()
                }else{
                    this.undesirabledesabel = false
                     this.$message.error(res.data.message)
                }
            })
        },
        //退单
        Chargeback(data){
            this.Declarationofwithdrawal = true;
            this.onePlanNo = data.planNo
        },
        want(){
            let subject = {
            planNo:this.onePlanNo
        }
        planBack(subject)
        .then(res => {
            if(res.data.error_code == 200){
                this.$message.success('退单成功')
                this.Declarationofwithdrawal = false
                this.gettable()
            }else{
                this.Declarationofwithdrawal = false
                this.$message.error(res.data.message)
                
            }
        })
        },
        //查询
        // search(){
        //     this.page = 1
        //     this.gettable()
        // },
        search() {
			if (!this.account && !this.username) {
                // this.$message("请输入您要查询的账号或昵称！")
                this.page = 1
                this.gettable()
			} else {
                if(this.account === ''){
                    this.getAccount()
                }else{
                    this.page = 1
                    this.gettable()
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
                this.page = 1
                this.gettable()
            })
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
            this.desc = data.planDesc;
             this.planNo = '';
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
.jiajiang{
    border: 1px solid yellow;
    width: 25px;
    height: 25px;

}
</style>
