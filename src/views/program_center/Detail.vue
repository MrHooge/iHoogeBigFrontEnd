<template>
    <div class="details">
        <h2 style="text-align:center;color:#909399">会员方案（编号{{ number }}）详细 <span style="color:red">票查询</span></h2>
        <!-- 详细信息 -->
        <div class="Informationen">
            <div class="title">详细信息</div>
            <div class="Enthalt">
            <div class="hang">
                <div class="left">彩种：</div>
                <div class="right">{{ lotteryType }}</div>
            </div>
            <div class="lei">
                <div class="left">期数：</div>
                <div class="right">{{ term }}</div>
            </div>
            </div>
            <div class="Enthalt">
            
            <div class="hang">
                <div class="left">发单人：</div>
                <div class="right">{{ account }}</div>
            </div>
            <div class="lei">
                <div class="left">方案公开类型：</div>
                <div class="right">{{ publics }}</div>
            </div>
            </div>
            <div class="Enthalt">
            <div class="hang">
                <div class="left">方案金额：</div>
                <div class="right">{{ amount }}</div>
            </div>
            <div class="lei">
                <div class="left">订单状态：</div>
                <div class="right">{{ planOrderStatus }}</div>
            </div>
            </div>
            <div class="Enthalt">
                <div class="hang">
                <div class="left">倍数：</div>
                <div class="right">{{ multiple }}</div>
            </div>
             <div class="lei">
                <div class="left">中奖情况：</div>
                <div class="right">{{ winStatus }}</div>
            </div>
            </div>
            <div class="Enthalt">
            <div class="hang">
                <div class="left">支付状态：</div>
                <div class="right"></div>
            </div>
           <div class="lei">
                <div class="left">税前金额：</div>
                <div class="right">{{ pretaxPrize }}</div>
            </div>
            </div>
            <div class="Enthalt">
                <div class="hang">
                <div class="left">方案状态：</div>
                <div class="right">{{ planStatus }}</div>
            </div>
            <div class="lei">
                <div class="left">税后金额：</div>
                <div class="right">{{ posttaxPrize }}</div>
            </div>
            </div>
            <div class="Enthalt">
             <div class="hang">
                <div class="left">发起时间：</div>
                <div class="right">{{ createDateTime | time }}</div>
            </div>
            <div class="lei">
                <div class="left">提成：</div>
                <div class="right"></div>
            </div>
            </div>
            <div class="Enthalt">
                <div class="hang">
                <div class="left">方案截止时间：</div>
                <div class="right">{{ dealDateTime | time }}</div>
            </div>
            <div class="lei">
                <div class="left">平台：</div>
                <div class="right"></div>
            </div>
            </div>
            <div class="Enthalt">
                <div class="hang">
                <div class="left">方案打票时间：</div>
                <div class="right">{{ printTicketDateTime | time }}</div>
            </div>
            <div class="lei">
                <div class="left">退款日期：</div>
                <div class="right"></div>
            </div>
            </div>
            <div class="Enthalt">
              <div class="hang">
                <div class="left">开奖时间：</div>
                <div class="right">{{ openResultTime | time }}</div>
            </div>
            <div class="lei">
                <div class="left">操作：</div>
                <div class="right" style="border:none"><el-button type="primary"
                 @click="getone"
                 @keyup.13="getone" size="medium" style="border-radius:0">撤销</el-button></div>
            </div>
            </div>
            <!-- 方案内容 -->
            <div class="title">方案内容</div>
            <div class="title" v-for="item in ticketDetail" :key="item.index">
                <div class="title" style="border:none">{{item}}}</div>
            </div>
        </div>
        <!-- 方案详情 -->
        <div class="Lento">
            <el-table :data="messagedata" border style="width: 20%;float:left">
            <el-table-column
                prop="matchId"
                align="center"
                label="场次号">     
            </el-table-column>
            </el-table>
            <div class="newobj">
                <div class="something" style="border-bottom:none">对阵</div>
                <div class="something" style="height:60px"></div>
                <div></div>
                <div></div>
            </div>
            <div class="newobj">
                <div class="something" style="border-bottom:none">对阵</div>
                <div class="something" style="height:60px"></div>
                <div></div>
                <div></div>
            </div>
            <div class="newobj">
                <div class="something" style="border-bottom:none">对阵</div>
                <div class="something" style="height:60px"></div>
                <div></div>
                <div></div>
            </div>
            <div class="newobj">
                <div class="something" style="border-bottom:none">对阵</div>
                <div class="something" style="height:60px"></div>
                <div></div>
                <div></div>
            </div>
            <!-- <el-table :data="tablethis" border style="width: 80%;float:left">
            <el-table-column
                prop="winStatus"
                align="center"
                label="	对阵">
            </el-table-column>
            <el-table-column
                prop="playType"
                align="center"
                label="	玩法">   
            </el-table-column>
             <el-table-column
                prop="option"
                align="center"
                label="选项">       
            </el-table-column>
            <el-table-column
                align="center"
                prop="result"
                label="	赛果">
            </el-table-column>
        </el-table> -->
        </div>
    </div>
</template>

<script>
import { getPlanDetailForManager,planBack } from '@/api/period'
export default {
    data(){
        return {
            number:'',
            tableData:[],
            messagedata:[],
            tablethis:[],
            lotteryType:'',//彩种
            planStatus:'',//方案状态
            term:'',//彩期
            account:'',
            createDateTime:'',
            dealDateTime:'',
            isSuper:'',
            amount:'',
            multiple:'',
            openResultTime:'',
            publics:'',
            winStatus:'',
            pretaxPrize:'',
            posttaxPrize:'',
            printTicketDateTime:'',
            planOrderStatus:'',
            ticketDetail:'',
            posttaxPrize:'',
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
            return MM + '-' + d + ' ' + h + ':' + m + ':' + s;
        },
    },
    created(){
        this.number = this.$route.query.planNo;
        this.gettable()
    },
    methods:{
        //撤销
        getone(){
            let newobj = {
                planNo:this.$route.query.planNo
            }
            planBack(newobj).then(res => {
                if(res.data.error_code == 200){
                    this.$message(res.data.message)
                }
            })
        },
        //获取数据
        gettable(){
            let obj = {
                planNo:this.number
            }
            let arr = [];
            let obje = {
                matchId:''
            }
            getPlanDetailForManager(obj).then(res => {
                let rest = res.data.matchDetail;
                rest.forEach(e => {
                    arr.push(e.options);
                });
                console.log(arr)
                this.messagedata = res.data.matchDetail;
                this.tablethis = res.data.matchDetail.options;
                this.lotteryType = res.data.lotteryType;
                this.planStatus = res.data.planStatus;
                this.term = res.data.term;
                this.account = res.data.account;
                this.createDateTime = res.data.createDateTime;
                this.dealDateTime = res.data.dealDateTime;
                this.isSuper = res.data.isSuper;
                this.amount = res.data.amount;
                this.multiple = res.data.multiple;
                this.publics = res.data.public;
                this.winStatus = res.data.winStatus;
                this.pretaxPrize = res.data.pretaxPrize;
                this.posttaxPrize = res.data.posttaxPrize;
                this.printTicketDateTime = res.data.printTicketDateTime;
                this.ticketDetail = res.data.ticketDetail;
                this.planOrderStatus = res.data.planOrderStatus;
                this.openResultTime = res.data.openResultTime;
                this.posttaxPrize = res.data.posttaxPrize;
            })
        }
    }
}
</script>

<style scoped>
.newobj{
    width: 120px;
    height: 150px;
    float: left;
    
}
.something{
    width: 100%;
    height: 50px;
    border: 1px solid #cccccc;
    text-align: center;
    line-height: 50px;
    color: #909399
}
.details{
    padding: 10px 20px 
}
.Informationen{
    width:60%;
    margin-top: 20px;
    color: #909399;
    float: left;
}
.Lento{
    width: 40%;
    margin-top: 20px;
    float: left;
}
.title{
    text-align: center;
    width: 95%;
    height: 40px;
    line-height: 40px;
    border: 1px  solid #cccccc
}
.Enthalt{
    width: 95%;
    height: 40px;
    margin: 5px 0
}
.hang{
    width: 49%;
    height: 40px;
    float: left;
    margin-right: 18px
}
.lei{
    float: left;
     width: 49%;
    height: 40px;
}
.left{
    float: left;
    width: 49%;
    height: 40px;
    border: 1px solid #cccccc;
    margin-right: 8px;
    text-align: center;
    line-height: 40px
}
.right{
    float: left;
     width: 49%;
    height: 40px;
    border: 1px solid #cccccc;
    text-align: center;
    line-height: 40px
}
</style>
