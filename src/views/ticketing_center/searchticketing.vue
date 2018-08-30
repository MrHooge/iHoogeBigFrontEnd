<template>
    <div class="ticket">
        <el-collapse accordion>
    <el-collapse-item title="高频彩">
        <div class="eleven">
            <h3>11选5</h3>
    <el-radio v-model="playType" label="50" border style="margin:5px;" size="mini" ref="playType">山东11选5</el-radio>
     <el-radio v-model="type" label="52" border style="margin:5px;" size="mini">江西11选5</el-radio>
     <el-radio v-model="type" label="53" border style="margin:5px;" size="mini">广东11选5</el-radio>
     <el-radio v-model="type" label="54" border style="margin:5px;" size="mini">重庆11选5</el-radio>
     <el-radio v-model="type" label="55" border style="margin:5px;" size="mini">辽宁11选5</el-radio>
     <el-radio v-model="type" label="57" border style="margin:5px;" size="mini">上海11选5</el-radio>
     <el-radio v-model="type" label="73" border style="margin:5px;" size="mini">河南11选5</el-radio>
     <el-radio v-model="type" label="59" border style="margin:5px;" size="mini">江苏11选5</el-radio>
     <el-radio v-model="type" label="60" border style="margin:5px;" size="mini">福建11选5</el-radio>
     <el-radio v-model="type" label="61" border style="margin:5px;" size="mini">浙江11选5</el-radio>
     <el-radio v-model="type" label="62" border style="margin:5px;" size="mini">吉林11选5</el-radio>
     <el-radio v-model="type" label="63" border style="margin:5px;" size="mini">湖北11选5</el-radio>
     <el-radio v-model="type" label="64" border style="margin:5px;" size="mini">广西11选5</el-radio>
     <el-radio v-model="type" label="65" border style="margin:5px;" size="mini">天津11选5</el-radio>
     

      <el-radio v-model="type" label="1" border style="margin:5px;" size="mini">新疆11选5</el-radio>
     <el-radio v-model="type" label="67" border style="margin:5px;" size="mini">安徽11选5</el-radio>
     <el-radio v-model="type" label="68" border style="margin:5px;" size="mini">山西11选5</el-radio>
     <el-radio v-model="type" label="69" border style="margin:5px;" size="mini">甘肃11选5</el-radio>
     <el-radio v-model="type" label="70" border style="margin:5px;" size="mini">四川11选5</el-radio>
     <el-radio v-model="type" label="71" border style="margin:5px;" size="mini">陕西11选5</el-radio>
     <el-radio v-model="type" label="72" border style="margin:5px;" size="mini">贵州11选5</el-radio>


     <el-radio v-model="type" label="74" border style="margin:5px;" size="mini">河北11选5</el-radio>
     <el-radio v-model="type" label="75" border style="margin:5px;" size="mini">北京11选5</el-radio>
     <el-radio v-model="type" label="76" border style="margin:5px;" size="mini">云南11选5</el-radio>
     <el-radio v-model="type" label="77" border style="margin:5px;" size="mini">内蒙选11选5</el-radio>
        <el-radio v-model="type" label="58" border style="margin:5px;" size="mini">黑龙江11选5</el-radio>
    
     
        </div>
        <div class="three">
            <h3>快三</h3>
    <el-radio v-model="type" label="157" border style="margin:5px;" size="mini">江苏快3</el-radio>
     <el-radio v-model="type" label="159" border style="margin:5px;" size="mini">吉林快3</el-radio>
     <el-radio v-model="type" label="161" border style="margin:5px;" size="mini">湖北快3</el-radio>
     <el-radio v-model="type" label="163" border style="margin:5px;" size="mini">安徽快3</el-radio>
     <el-radio v-model="type" label="174" border style="margin:5px;" size="mini">江西快3</el-radio>
     <el-radio v-model="type" label="165" border style="margin:5px;" size="mini">广西快3</el-radio>
     <el-radio v-model="type" label="166" border style="margin:5px;" size="mini">河北快3</el-radio>
     <el-radio v-model="type" label="167" border style="margin:5px;" size="mini">福建快3</el-radio>
     <el-radio v-model="type" label="168" border style="margin:5px;" size="mini">上海快3</el-radio>
     <el-radio v-model="type" label="169" border style="margin:5px;" size="mini">甘肃快3</el-radio>  
        </div>

        <div class="ten">
            <h3>快乐十分</h3>
    <el-radio v-model="type" label="160" border style="margin:5px;" size="mini">河南快乐十分</el-radio>
     <el-radio v-model="type" label="158" border style="margin:5px;" size="mini">重庆快乐十分</el-radio>
     <el-radio v-model="type" label="155" border style="margin:5px;" size="mini">广西快乐十分</el-radio>
     <el-radio v-model="type" label="152" border style="margin:5px;" size="mini">广东快乐十分</el-radio> 
        </div>

         <div class="ten">
            <h3>时时彩</h3>
    <el-radio v-model="type" label="150" border style="margin:5px;" size="mini">重庆时时</el-radio>
     <el-radio v-model="type" label="153" border style="margin:5px;" size="mini">江西时时</el-radio>
        </div>
  </el-collapse-item>
  <el-collapse-item title="低频彩">
   <div class="ten">
            <h3>福彩</h3>
    <el-radio v-model="type" label="100" border style="margin:5px;" size="mini">双色球</el-radio>
     <el-radio v-model="type" label="101" border style="margin:5px;" size="mini">七乐彩</el-radio>
     <el-radio v-model="type" label="102" border style="margin:5px;" size="mini">3D</el-radio>

        </div>
        <div class="pecai">
            <h3>体彩</h3>
    <el-radio v-model="type" label="1" border style="margin:5px;" size="mini">大乐透</el-radio>
     <el-radio v-model="type" label="2" border style="margin:5px;" size="mini">七星彩</el-radio>
     <el-radio v-model="type" label="3" border style="margin:5px;" size="mini">排列3</el-radio>
    <el-radio v-model="type" label="4" border style="margin:5px;" size="mini">排列5</el-radio>
        </div>
  </el-collapse-item>
  <el-collapse-item title="竞技彩">
   <div class="three">
            <h3>竞篮</h3>
    <el-radio v-model="type" label="304" border style="margin:5px;" size="mini">竞彩篮球单关投注</el-radio>
     <el-radio v-model="type" label="30" border style="margin:5px;" size="mini">竞彩篮球胜负</el-radio>
     <el-radio v-model="type" label="31" border style="margin:5px;" size="mini">竞彩篮球让分胜负</el-radio>
    <el-radio v-model="type" label="32" border style="margin:5px;" size="mini">竞彩篮球胜分差</el-radio>
     <el-radio v-model="type" label="33" border style="margin:5px;" size="mini">竞彩篮球大小分</el-radio>
     <el-radio v-model="type" label="43" border style="margin:5px;" size="mini">竞彩篮球混合过关</el-radio>
        <el-radio v-model="type" label="39" border style="margin:5px;" size="mini">竞彩篮球</el-radio>
        </div>

        <div class="three">
            <h3>竞足</h3>
    <el-radio v-model="type" label="303" border style="margin:5px;" size="mini">竞彩足球单关投注</el-radio>
     <el-radio v-model="type" label="42" border style="margin:5px;" size="mini">竞彩足球混合过关</el-radio>
     <el-radio v-model="type" label="41" border style="margin:5px;" size="mini">竞彩足球胜平负</el-radio>
    <el-radio v-model="type" label="34" border style="margin:5px;" size="mini">竞彩足球让球胜平负</el-radio>
     <el-radio v-model="type" label="35" border style="margin:5px;" size="mini">竞彩足球比分</el-radio>
     <el-radio v-model="type" label="36" border style="margin:5px;" size="mini">竞彩足球进球数</el-radio>
        <el-radio v-model="type" label="37" border style="margin:5px;" size="mini">竞彩足球半全场</el-radio>
        </div>
         <div class="three">
            <h3>北单</h3>
    <el-radio v-model="type" label="1" border style="margin:5px;" size="mini">单场胜平负</el-radio>
     <el-radio v-model="type" label="2" border style="margin:5px;" size="mini">单场上下盘单数</el-radio>
     <el-radio v-model="type" label="3" border style="margin:5px;" size="mini">单场总进球数</el-radio>
    <el-radio v-model="type" label="1" border style="margin:5px;" size="mini">单场正确比分</el-radio>
     <el-radio v-model="type" label="2" border style="margin:5px;" size="mini">单场半全场胜平负</el-radio>
     <el-radio v-model="type" label="3" border style="margin:5px;" size="mini">单场胜负过关</el-radio>
        <el-radio v-model="type" label="3" border style="margin:5px;" size="mini">北京单场</el-radio>
        <el-radio v-model="type" label="3" border style="margin:5px;" size="mini">传统足彩</el-radio>
        </div>
         <div class="three">
            <h3>足彩</h3>
    <el-radio v-model="type" label="2" border style="margin:5px;" size="mini">胜负彩14场</el-radio>
     <el-radio v-model="type" label="3" border style="margin:5px;" size="mini">胜负任9</el-radio>
        <el-radio v-model="type" label="3" border style="margin:5px;" size="mini">4场进球</el-radio>
           <el-radio v-model="type" label="3" border style="margin:5px;" size="mini">6场半全场</el-radio>
        </div>
  </el-collapse-item>
</el-collapse>
<div class="search">
    <div class="search-top">
    提供商:<el-radio v-model="provider" label="2" border style="margin:5px;" size="mini">全部</el-radio>
    彩期:<el-input v-model="term" style="width: 150px;margin-right:10px;margin-top:40px" size="mini"></el-input>
    票号:<el-input v-model="id" style="width: 150px;margin-right:10px;margin-top:40px" size="mini"></el-input>
    方案编号:<el-input v-model="planNo" style="width: 150px;margin-right:10px;mmargin-top:40px" size="mini"></el-input>
    玩法:<el-input v-model="playType" style="width: 150px;margin-right:10px;margin-top:40px" size="mini"></el-input><br />
    </div>
    <div class="search-midder">
    中奖状态:<el-radio v-model="isBingo" label="-1" border style="margin:5px;" size="mini">全部</el-radio>
            <el-radio v-model="isBingo" label="0" border style="margin:5px;" size="mini">中奖</el-radio>
            <el-radio v-model="isBingo" label="1" border style="margin:5px;" size="mini">未中奖</el-radio>            
    出票状态:<el-radio v-model="status" label="-1" border style="margin:5px;" size="mini">全部</el-radio>
            <el-radio v-model="status" label="1" border style="margin:5px;" size="mini">未送票</el-radio>
            <el-radio v-model="status" label="3" border style="margin:5px;" size="mini">未确认</el-radio>
            <el-radio v-model="status" label="4" border style="margin:5px;" size="mini">出票成功</el-radio>
            <el-radio v-model="status" label="5" border style="margin:5px;" size="mini">出票失败</el-radio>
    是否真实出票:<el-radio v-model="radio" label="0" border style="margin:5px;" size="mini">是</el-radio>
                <el-radio v-model="radio" label="1" border style="margin:5px;" size="mini">否</el-radio><br />
    </div>
    <div class="search-footer">
    生成票时间&nbsp;开始：<el-date-picker
            v-model="createDateTimeStart"
            type="date"
            style="margin-bottom:10px;margin-right:20px;width:200px;"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd hh:mm:ss"
            size="mini"
            >
            </el-date-picker> 
            结束：<el-date-picker
            v-model="createDateTimeEnd"
            type="date"
            style="margin-bottom:10px;margin-right:20px;width:200px"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd hh:mm:ss"
            size="mini">
            </el-date-picker><br />
     打印票时间&nbsp;开始：<el-date-picker
            v-model="printDateTimeStart"
            type="date"
            style="margin-bottom:10px;margin-right:20px;width:200px;"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd hh:mm:ss"
            size="mini"
            >
            </el-date-picker> 
            结束：<el-date-picker
            v-model="printDateTimeEnd"
            type="date"
            style="margin-bottom:10px;margin-right:20px;width:200px"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd hh:mm:ss"
            size="mini">
            </el-date-picker><br />
    送票时间&nbsp;&nbsp;&nbsp;&nbsp;开始：&nbsp;<el-date-picker
            v-model="sendTicketDateTimeStart"
            type="date"
            style="margin-bottom:10px;margin-right:20px;width:200px;"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd hh:mm:ss"
            size="mini"
            >
            </el-date-picker> 
            结束：<el-date-picker
            v-model="sendTicketDateTimeEnd"
            type="date"
            style="margin-bottom:10px;margin-right:20px;width:200px"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd hh:mm:ss"
            size="mini">
            </el-date-picker><br /> 
    彩期&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;开始：&nbsp;<el-date-picker
            v-model="startTerm"
            type="date"
            style="margin-bottom:10px;margin-right:20px;width:200px;"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd hh:mm:ss"
            size="mini"
            >
            </el-date-picker> 
            结束：<el-date-picker
            v-model="endTerm"
            type="date"
            style="margin-bottom:10px;margin-right:20px;width:200px"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd hh:mm:ss"
            size="mini">
            </el-date-picker><br />
             <el-button type="primary" @click="openprize" style="margin-left:26%;margin-bottom:20px">查询 </el-button>
    </div>  
    <!-- 列表 -->
    <span>出票总金额：{{whole}}元&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;中奖总金额：{{wholeget}}元</span>&nbsp;
    <el-table
               :data="tableData"
               border
               style="width: 100%;margin-top:20px">
               <el-table-column
                     label="彩期"
                     prop="term"
                     align="center">
               </el-table-column>    
                <el-table-column
                     label="出票金额"
                     prop="amount"
                     align="center">
               </el-table-column>  
                <el-table-column
                     label="送票日期"
                     align="center">
                      <template slot-scope="scope">
                    {{scope.row.sendDateTime|time}}
                </template>  
               </el-table-column>  
               <el-table-column
                     label="中奖金额"
                     prop="bingoAmount"
                     align="center">  
               </el-table-column>
               <el-table-column
                     label="名片"
                     prop="bingoContent"
                     align="center">
               </el-table-column>
               <!-- <el-table-column
                     label="证件号"
                     prop="content"
                     align="center"> 
               </el-table-column> -->
               <el-table-column
                     label="出票日期"
                     align="center">
                       <template slot-scope="scope">
                    {{scope.row.createDateTime|type}}
                </template>  
               </el-table-column>
               <el-table-column
                     label="中奖状态"
                     align="center">
                     <template slot-scope="scope">
                         {{scope.row.isBingo | white}}
                         </template>
               </el-table-column>
               <el-table-column
                     label="票号"
                     prop="id"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="	彩种"
                     prop=" lotteryType"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="倍数"
                     prop="multiple"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="玩法"
                     prop="fhPlayType"
                     align="center">
                   
               </el-table-column>
               <el-table-column
                     label="打票日期"
                     align="center">
                     <template slot-scope="scope">
                    {{scope.row.printDateTime|type}}
                </template>   
               </el-table-column>    
               <el-table-column
                     label="	出票状态"
                     align="center">
                     <template slot-scope="scope">
                         {{scope.row.status |use }}
                         </template>
               </el-table-column> 
               <el-table-column
                     label="提供商"
                     align="center">
                     <template slot-scope="scope">
                         {{scope.row.provider |come }}
                         </template>
               </el-table-column>  
            </el-table>   
             <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalList"
            >
            </el-pagination>
</div>
    </div>
</template>

<script>
import { searchTicket } from '@/api/ticket'
import { mapActions } from 'vuex'
export default {
    data(){
        return{
            whole:'',
            wholeget:'',
            tableData:[],
            provider:''||null,
            term:''||null,
            id:''||null,
            planNo:''||null,
            playType:''||null,
            isBingo:''||null,
            status:''||null,
            createDateTimeStart:''||null,
            createDateTimeEnd:''||null,
            printDateTimeStart:''||null,
            printDateTimeEnd:''||null,
            sendTicketDateTimeStart:''||null,
            sendTicketDateTimeEnd:''||null,
            startTerm:''||null,
            endTerm:''||null,
            page:1,
            pagesize:20,
            type:''||null
        }
    },
    filters:{
         type(a){
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
          time(a){
           var date = new Date(a);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			let Y = date.getFullYear() + '-';
			let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
			let h = date.getHours() + ':';
			let m = date.getMinutes();
			// let s = date.getSeconds();
			return Y + M + D + h + m;

        },
        come(a){
            if(a == -1){
                return "全部"
            }else{
                return "其他"
            }
        },
        white(status){
            if(status == 1){
                return "未中奖"
            }else{
                return "中奖"
            }
        },
        use(studio){
            if(studio == 1){
                return "未送票"
            }else if(studio == 3){
                return "未确认"
            }else if(studio == 4){
                return "出票成功"
            }else if(studio == 5){
                return "出票失败"
            }
        }
    },
    created(){
        this.gettable()
    },
    methods:{
        ...mapActions({
                openprize: 'Sendtime'
            }),
            //查询操作openprize
        gettable(){
            let obj = {
            provider:this.provider,//提供商
            term:this.term,//彩期
            id:this.id,//票号
            planNo:this.planNo,//方案编号
            playType:'',//玩法
            isBingo:this.isBingo,//中奖状态
            status:this.status,//出票状态
            createDateTimeStart:this.createDateTimeStart,//生成票时间开始
            createDateTimeEnd:this.createDateTimeEnd,//生成票时间结束
            printDateTimeStart:this.printDateTimeStart,//打印票时间开始
            printDateTimeEnd:this.printDateTimeEnd,//打印票时间结束
            sendTicketDateTimeStart:this.sendTicketDateTimeStart,//送票时间开始
            sendTicketDateTimeEnd:this.sendTicketDateTimeEnd,//送票时间结束
            startTerm:this.startTerm,//彩期开始
            endTerm:this.endTerm,//彩期结束
            offset:this.page,//页数
            pagesize:this.pagesize
            }
            searchTicket(obj).then(res => {
                 console.log(1)
                console.log(res.data.amount)
                console.log(1)
                this.tableData = res.data.data;
                this.whole = res.data.amount;
                this.wholeget = res.data.bingoAmount
              })
           this.$store.dispatch('Sendtime',obj);
           console.log(this.$store.getters)
            //this.$router.push({ path: '/ticketingCenter/ticketlist' })
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
    }
}
</script>

<style scoped>
.search-top{
    margin-left:400px
}
.search-midder{
    margin-left:300px
}
.search-footer{
    margin-left: 500px
}
/* .search{
    margin-left: 400px
} */
.ticket{
    padding: 10px 20px
}
.left{
    float: left;
}
.right{
    float: left;
    width: 1000px
}
.eleven{
    width: 380px;
    height: 300px;
    margin-right: 15px;
    margin-left: 15px;
    border: 1px solid rgb(240, 228, 228);
    float: left;
    padding: 3px;
    overflow: scroll;
}
.three{
     width: 380px;
    height: 230px;
    margin-right: 15px;
    margin-left: 15px;
    border: 1px solid rgb(240, 228, 228);
    float: left;
    padding: 3px;
}
.ten{
     width: 280px;
    height: 150px;
    margin-right: 15px;
    margin-left: 15px;
    border: 1px solid rgb(240, 228, 228);
    float: left;
    padding: 3px;
}
.pecai{
    width: 500px;
    height: 150px;
    margin-right: 15px;
    margin-left: 15px;
    border: 1px solid rgb(240, 228, 228);
    float: left;
    padding: 3px;
}
.everytime{
    width: 200px;
    height: 130px;
    margin-right: 15px;
    border: 1px solid rgb(240, 228, 228);
    float: left;
}
.happy{
    width: 200px;
    height: 130px;
    margin-right: 15px;
    border: 1px solid rgb(240, 228, 228);
    float: left;
}
</style>
