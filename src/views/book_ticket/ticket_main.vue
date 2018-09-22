<template>
    <div class="program">
        <div class="search">
            
            方案号：<el-input v-model="planNo" placeholder="请输入方案号" style="width: 120px;margin-right:40px;margin-bottom:10px;"></el-input>
            方案拆包号：<el-input v-model="id" placeholder="请输入方案拆包号" style="width: 150px;margin-right:40px;"></el-input>
            发起时间：
            <el-date-picker
            v-model="startCreateTime"
            type="datetime"
            style="margin-right:5px;width:200px"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00">
            </el-date-picker>
            至
            <el-date-picker
            v-model="endCreateTime"
            type="datetime"
            style="width:200px;margin-right:40px;margin-left:5px;"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="23:59:59">
            </el-date-picker>
            玩法：
            <el-select v-model="lotteryType"
			           placeholder="请选择状态筛选数据"
			           @change="getval"
                       style="width:180px;margin-right:40px;">
				<el-option v-for="item in directions1"
				           :key="item.lotteryType"
				           :label="item.label"
				           :value="item.lotteryType">
				</el-option>
			</el-select>
            串法：
            <el-select v-model="passType"
			           placeholder="请选择状态筛选数据"
			           @change="getval"
                       style="width:5%;margin-right:180px;">
				<el-option v-for="item in directions2"
				           :key="item.passType"
				           :label="item.label"
				           :value="item.passType">
				</el-option>
			</el-select>
            本金：
            <el-input v-model="startAmount" placeholder="请输入最低的本金" style="width: 150px;margin-right:5px;"></el-input>至
            <el-input v-model="endAmount" placeholder="请输入最高的本金" style="width: 150px;margin-right:40px;margin-left:5px"></el-input>
            预测奖金：
            <el-input v-model="startBonus" placeholder="请输入最低的预测奖金" style="width: 180px;margin-right:5px;"></el-input>至
            <el-input v-model="endBonus" placeholder="请输入最高的预测奖金" style="width: 180px;margin-right:40px;margin-left:5px"></el-input>
            截止时间：
            <el-date-picker
            v-model="startDealTime"
            type="datetime"
            style="margin-right:5px;width:200px"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="00:00:00">
            </el-date-picker>至
            <el-date-picker
            v-model="endDealTime"
            type="datetime"
            style="width:200px;margin-right:220px;margin-left:5px;"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="23:59:59">
            </el-date-picker>
            处理结果：
            <el-select v-model="status"
			           placeholder="请选择状态筛选数据"
			           @change="getval"
                       style="width:100px;">
				<el-option v-for="item in directions3"
				           :key="item.status"
				           :label="item.label"
				           :value="item.status">
				</el-option>
			</el-select>
            
            <el-button type="primary" @click="firstPush" style="margin-left:100px;margin-bottom:40px;margin-top:40px">优先推送</el-button>
            <el-button type="danger" @click="updateTicketStatus(3)" style="margin-left:100px;margin-bottom:40px;margin-top:40px">撤销</el-button>
            <el-button type="success" @click="updateTicketStatus(1)" style="margin-left:100px;margin-bottom:40px;margin-top:40px">成功</el-button>
            <el-button type="primary" @click="updateChaiPiaoCount" style="margin-left:100px;margin-bottom:40px;margin-top:40px;margin-right:400px">修改拆包票数</el-button>
            <el-button type="primary" @click="search" style="margin-left:100px;margin-bottom:40px;margin-top:40px">查询</el-button>
        </div>
        <div class="tablelist">
            <el-table :data="tableData" border style="width: 100%;" @selection-change="handleSelectionChange">
                <el-table-column
                    type="selection">
                </el-table-column>
                <el-table-column
                    prop="planNo"
                    align="center"
                    label="方案号">
                </el-table-column>
                <el-table-column
                    prop="id"
                    align="center"
                    label="拆包号">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="发起时间">
                    <template slot-scope="scope">
                        {{scope.row.createTime | time}}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="截止时间">
                    <template slot-scope="scope">
                        {{scope.row.dealTime | time}}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="推送时间">
                    <template slot-scope="scope">
                        {{scope.row.pushTime | time}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="lotteryType"
                    align="center"
                    label="玩法">
                </el-table-column>
                <el-table-column
                    prop="passType"
                    align="center"
                    label="串法">
                </el-table-column>
                <el-table-column
                    prop="amount"
                    align="center"
                    label="本金">
                </el-table-column>
                <el-table-column
                    prop="multiple"
                    align="center"
                    label="倍数">
                </el-table-column>
                <el-table-column
                    prop="bonus"
                    align="center"
                    label="预测奖金">
                </el-table-column>
                
                <el-table-column
                    align="center"
                    label="处理结果">
                    <template slot-scope="scope">
                        <span v-if="scope.row.status === 0" style="color:red">{{scope.row.status | changeStatus}}</span>
                        <span v-else>{{scope.row.status | changeStatus}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column
                    align="center"
                    label="操作状态">
                    <template slot-scope="scope">
                        {{scope.row.status | changeStatus}}
                    </template>
                </el-table-column> -->
                <el-table-column
                    prop="printAccount"
                    align="center"
                    label="处理人">
                </el-table-column>
                <el-table-column
                    prop="printId"
                    align="center"
                    label="处理机器">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="处理时间">
                    <template slot-scope="scope">
                        {{scope.row.finishTime | time}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="count"
                    align="center"
                    label="总拆张数">
                </el-table-column>
                <el-table-column
                    prop="residueCount"
                    align="center"
                    label="剩余张数">
                </el-table-column>
                <el-table-column
                    prop="dlAccount"
                    align="center"
                    label="代理">
                </el-table-column>
                <el-table-column
                    prop="qdAccount"
                    align="center"
                    label="渠道">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="是否优先">
                    <template slot-scope="scope">
                        {{scope.row.isFirst | isFirst}}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="方案详情"
                    width="120px;">
                    <template slot-scope="scope">
                        <el-button type="primary" style="width:100px" @click="details(scope.row)">点击展开</el-button>
                    </template>
                </el-table-column>
            </el-table>
        <!-- 弹窗 -->
        <el-dialog
            title="修改拆包票数"
            :visible.sync="adddioalog"
            width="500px"
            >
            <el-row>
                <el-col :span="6"><div class="grid-content bg-purple">
                    单个拆包票数
                </div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple-light">
                    <el-input v-model="val" type="number"></el-input>
                </div></el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="adddioalog = false">取 消</el-button>
                <el-button type="primary" @click="sure">确 定</el-button>
            </span>
        </el-dialog>
        <!-- <el-dialog title="退单" :visible.sync="Declarationofwithdrawal" width="500px" top="30vh">
            <div class="body">
              确认退单吗
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogShenVisible = false">取 消</el-button>
                <el-button type="primary" @click="want">确定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="出票" :visible.sync="undesirabledesabel" width="500px" top="30vh">
            <div class="body">
              确认出票吗
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogShenVisible = false">取 消</el-button>
                <el-button type="primary" @click="getfromyicket">确定</el-button>
            </div>
        </el-dialog>
         <el-dialog title="修改" :visible.sync="dialogShenVisible" width="500px" top="30vh">
            <div class="body">
              请输入罚单宣言：<el-input v-model="desc"></el-input>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogShenVisible = false">取 消</el-button>
                <el-button type="primary" @click="sure">确定</el-button>
            </div>
        </el-dialog> -->
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
import { selectLotteryPlan,updatePlanDesc,planBack,getIsFocusPlan,updatePlanStatus } from '@/api/period'
import { ticketPrintSearch , firstPush , updateTicketStatus , updateChaiPiaoCount , getChaiPiaoCount } from '@/api/ticket'
import { Message, MessageBox } from 'element-ui'
export default {
    data(){
        return{
            tableData:[],
            account:'',
            minBonus:'',
            maxBonus:'',
            // startAmount:'',
            // endAmount:'',
            startReturnAmount:'',
            endReturnAmount:'',
            // planNo:'',
            planStatus:'',
            winStatus:'',
            playType:'',
            stime:'',
            etime:'',
            planStatus:'',
            dialogShenVisible:false,
            Declarationofwithdrawal:false,
            undesirabledesabel:false,
            fadan:'',
            desc: '',
            //玩法
            directions1: [
                { lotteryType: "", label: "全部" },
                
				{ lotteryType: "30", label: "竞彩篮球胜负" },
				{ lotteryType: "31", label: "竞彩篮球让分胜负" },
                { lotteryType: "32", label: "竞彩篮球胜分差" },
                { lotteryType: "33", label: "竞彩篮球大小分" },
                { lotteryType: "34", label: "竞彩足球让球胜平负" },
                { lotteryType: "35", label: "竞彩足球比分" },
                { lotteryType: "36", label: "竞彩足球进球数" },
                { lotteryType: "37", label: "竞彩足球半全场" },
                { lotteryType: "41", label: "竞彩足球胜平负" },
                { lotteryType: "42", label: "竞彩足球混合过关" },
                { lotteryType: "43", label: "竞彩篮球混合过关" },
                { lotteryType: "49", label: "竞彩足球胜平负/让球" },

                { lotteryType: "303", label: "竞彩足球单关投注" },
                { lotteryType: "304", label: "竞彩篮球单关投注" },
            ],
            //串法
            directions2: [
                { passType: "", label: "全部" },
				{ passType: "P1", label: "单关" },
				{ passType: "P2_1", label: "2串1" },
                { passType: "P3_1", label: "3串1" },
                { passType: "P4_1", label: "4串1" },
                { passType: "P5_1", label: "5串1" },
                { passType: "P6_1", label: "6串1" },
                { passType: "P7_1", label: "7串1" },
                { passType: "P8_1", label: "8串1" },
            ],
            //处理结果
            directions3: [
                { status: "", label: "全部" },
				{ status: "0", label: "待打" },
				{ status: "1", label: "已完成" },
                { status: "2", label: "正在打" },
                { status: "3", label: "撤销" },

            ],
            dlAccount: '',      //代理用户名
            startAmount: '',  //最低的本金
            endAmount: '',   //最高的本金
            startBonus: '',   //最低的预测奖金
            endBonus: '',     //最高的预测奖金
            startCount: '',   //最低的张数
            endCount: '',    //最高的张数
            startCreateTime: '',  //发起时间的最低值
            endCreateTime: '',   //发起时间的最高值
            startDealTime: '',   //截止时间的最低值
            endDealTime: '',    //截止时间的最高值
            startMultiple: '',  //倍数的最低值
            endMultiple: '',   //倍数的最高值
            startResidueCount: '',  //剩余张数的最低值
            endResidueCount: '',   //剩余张数的最高值
            id: '',           //拆包号
            lotteryType: '',  //彩种（玩法）	
            page: 1,         //页数
            pageSize: 20,	// 一页的条数
            passType: '',   //过关方式（串法）
            planNo: '',   //方案编号
            qdAccount: '',    //渠道用户名
            status: '',   //状态
            totalList: 0,

            ids: '',
            selections: [],
            adddioalog: false, //弹窗
            val: '',   //拆包票数
            count: '', 
        }
    },
    filters:{
        //时间戳转换为日期
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
                return MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            }
        },
        isFirst(a){
            return a === 1? '是':'否'
        },
        
        //处理结果状态
        changeStatus(val){
            if(val === 0){
                return '待打'
            }
            else if(val === 1){
                return '已完成'
            }
            else if(val === 2){
                return '正在打'
            }
            else if(val === 3){
                return '撤销'
            }
        }
    },
    created(){
        // this.gettable()
        this.getTodayDate()
    },
    methods:{
        //点击跳转到打票详情页
        details(d){
            // let routeData = this.$router.resolve({ path: '/bookTicket/ticket_details', query: {  id: parse.id } });
            let routeData = this.$router.resolve({ path: '/bookTicket/ticket_details', query: {  id: d.id }  });

            window.open(routeData.href, '_blank');
        },
        //优先推送
        firstPush(){
            console.log(this.selections)
            if(this.selections.length === 0){
              this.$message('至少选择一个')
            }else{
                let newarr = [];
                this.selections.forEach(e => {
                    //   console.log(e)
                        newarr.push(e.id)
                });
                let newaccount = newarr.join(',');
                this.ids = newaccount;
                console.log(this.ids)
                let obj ={
                    ids: this.ids
                }
                firstPush(obj).then(res => {
                        if (res.data.error_code === 200) {
                            Message.success('优先推送成功')
                            this.ids = ''
                            this.gettable()
                        } else {
                            Message.error(res.data.message)
                        }
                })
            }
        },
        //修改票状态（成功和撤销）
        updateTicketStatus(a){
            if(this.selections.length != 1){
              this.$message('请选择一个选项！')
            }else{
                console.log(this.selections)
                let obj = {
                    id: this.selections[0].id,
                    status: a
                }
                updateTicketStatus(obj).then(res => {
                    console.log(res)
                    if(res.data.error_code === 200){
                        Message.success(res.data.message)
                        this.gettable()
                    }else{
                        this.$message(res.data.message)
                    }
                })
            }
            
        },
        //修改拆包票数
        updateChaiPiaoCount(){

            getChaiPiaoCount().then(res =>{
                console.log(res)
                if(res.data.error_code == 200){    
                    this.adddioalog = true
                    this.val = res.data.data
                }else{
                    this.$message.error(res.data.data)
                }
            })
        },
         // 选择框全部
        handleSelectionChange(selection) {
            this.selections = selection;
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
        getTodayDate(){
            let date = new Date()
            console.log(date)
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            this.startCreateTime =  y + '-' + m + '-' + d +' '+ '00:00:00';
            console.log(this.startCreateTime)
            this.endCreateTime = y + '-' + m + '-' + d +' '+ '23:59:59';
            console.log(this.endCreateTime)
            this.gettable()
        },
        //点击账号跳转会员管理页面
        // getupnewweb(a){
        //      this.$router.push({path:'/customerManager/customerManager',query:{account:a}})
        // },
        //明细页面跳转
        // Szczegol(parse){
        //  let routeData = this.$router.resolve({ path: '/programCenter/Detail', query: {  planNo: parse.planNo } });
        //     window.open(routeData.href, '_blank');
        // },
        getval(){
            // console.log(this.planStatus)
            this.page = 1
            this.gettable()
        },
        //获取数据
        gettable(){
            let obj = {

                dlAccount: this.dlAccount,      //代理用户名

                startAmount: this.startAmount,
                endAmount: this.endAmount,   //本金

                startBonus: this.startBonus,
                endBonus: this.endBonus,     //预测奖金
                
                startCount: this.startCount,
                endCount: this.endCount,    //张数

                startCreateTime: this.startCreateTime,
                endCreateTime: this.endCreateTime,  //发起时间

                startDealTime: this.startDealTime,  
                endDealTime: this.endDealTime,    //截止时间

                startMultiple: this.startMultiple,
                endMultiple: this.endMultiple,   //倍数

                startResidueCount: this.startResidueCount,
                endResidueCount: this.endResidueCount,  //剩余张数

                id: this.id,
                lotteryType: this.lotteryType,  //彩种	
                page: this.page,
                pageSize: this.pageSize,	
                passType: this.passType,   //过关方式(串法)
                planNo: this.planNo,   //方案编号
                qdAccount: this.qdAccount,    //渠道用户名
                status: this.status,   //状态
            }
            ticketPrintSearch(obj).then(res =>{
                if(res.data.error_code === 200){
                    this.tableData = res.data.data
                    this.totalList = res.data.totalCount
                    // Message.success('成功')
                }
            })
        },
        //出票
        // outticket(data){
        //    this.undesirabledesabel = true
        //     this.planNo = data.planNo
            
        // },
        // //确认出票
        // getfromyicket(){
        //     updatePlanStatus(this.planNo).then(res => {
        //         if(res.data.error_code == 200){
        //             this.$message('出票成功')
        //             this.undesirabledesabel = false
        //         }else{
        //              this.$message(res.data.message)
        //         }
        //     })
        // },
        //退单
        // Chargeback(data){
        //     this.Declarationofwithdrawal = true;
        // // console.log(data)
        // this.planNo = data.planNo
        //  this.planNo = ''
        // },
        // want(){
        //     let subject = {
        //     planNo:this.planNo
        // }
        // planBack(subject)
        // .then(res => {
        //     if(res.data.error_code == 200){
        //         this.$message('退单成功')
        //         this.Declarationofwithdrawal = false
        //         this.planNo = ''
        //         this.gettable()
        //     }else{
        //         this.$message(res.data.message)
        //     }
        // })
        // },
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
            if(!this.val){
                this.$message('不能为空')
            }else{
                this.count = this.val;
                let obj = {
                    count: this.count
                }
               updateChaiPiaoCount(obj)
               .then(res => {
                   console.log(res)
                   if(res.data.error_code == 200){
                       this.$message.success(res.data.message)
                       this.adddioalog = false
                   }else{
                       this.$message.error(res.data.message)
                   }
               })
            }
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