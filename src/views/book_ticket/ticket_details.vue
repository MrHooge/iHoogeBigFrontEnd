<template>
    <div>
        <!-- 原方案详情 -->
        <div style="text-align:center;width:40%;display:inline-block;vertical-align:top;">
            <p>原方案详情</p>
            <div style="text-align:left;padding-left:60px;">
                
                <p>发起时间：{{oldPlan.createDateTime | time}}</p>
                <p>截止时间：{{oldPlan.dealDateTime | time}}</p>
                <p>方案编号：{{oldPlan.planNo}}</p>
                <p>方案金额：{{oldPlan.amount}}</p>
                <p>过关方式：{{oldPlan.playType}}</p>
                <p>倍数：{{oldPlan.multiple}}</p>
                <p>总拆包数：{{oldPlan.ticketCount}}</p>
            </div>
            <el-table
                :data="matchItem"
                border
                >
                
                <el-table-column
                    label="星期"
                    prop="week"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="场次"
                    prop="lineId"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="玩法"
                    align="center">
                    <template slot-scope="scope">
                        <span v-for="v in scope.row.option" :key="v.index">{{v.lotteryType}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="选项"
                    align="center">
                    <template slot-scope="scope">
                        <span v-for="v in scope.row.option" :key="v.index">{{v.typeValueStr}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="SP"
                    align="center">
                    <template slot-scope="scope">
                        <span v-for="v in scope.row.option" :key="v.index">{{v.award}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 拆包详情 -->
        <div style="text-align:center;width:40%;display:inline-block;vertical-align:top;">
            <p>拆包详情</p>
            <div style="text-align:left;padding-left:60px;">
                <p>拆包号：{{chaibao.id}}</p>
                <p>发起时间：{{chaibao.createTime | time}}</p>
                <p>截止时间：{{chaibao.dealTime | time}}</p>
                <p>发单人昵称：{{chaibao.account}}</p>
                <p>过关方式：{{chaibao.passType}}</p>
                <p>倍数：{{chaibao.multiple}}</p>
                <p>方案金额：{{chaibao.amount}}</p>
                <p>代理人昵称：{{chaibao.dlAccount}}</p>
                <p>完成打票时间：{{chaibao.finishTime}}</p>
            </div>
            <el-table
                :data="option"
                border
                >
                <el-table-column
                    label="场次"
                    prop="lineId"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="玩法"
                    prop="type"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="选项"
                    prop="typeValueStr"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="SP"
                    prop="award"
                    align="center">
                </el-table-column>
            </el-table>
        </div>
    
    </div>
</template>

<script>
import { ticketPrintDetail } from '@/api/ticket'
export default {
    data(){
        return {
            id: '',   //获取路径上的id
            oldPlan: [],   //存储原方案详情数据
            chaibao: [],  //存储拆包详情数据
            matchItem: [],
            option: [],  
        }
    },
    filters:{
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
    },
    created(){
        this.id = this.$route.query.id;
        this.getTable()
    },
    methods:{
        //获取数据
        getTable(){
            let obj = {
                id: this.id
            }
            ticketPrintDetail(obj).then(res=>{
                if(res.data.error_code === 200){
                    this.oldPlan = res.data.data.planDetail
                    this.chaibao = res.data.data.ticketDetail
                    this.matchItem = res.data.data.planDetail.matchItem
                    this.option = res.data.data.ticketDetail.option
                }
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
    font-size: 14px;
    width: 100%;
    height: 48px;
    border: 1px solid #cccccc;
    text-align: center;
    line-height: 50px;
    color: #909399
}
.details{
    padding: 10px 20px 
}
.Informationen{
    min-width: 1000px;
    width:60%;
    margin-top: 20px;
    color: #909399;
    float: left;
}
.Lento{
    min-width: 100px;
    width: 40%;
    margin-top: 20px;
    float: left;
}
.title{
    text-align: center;
    width: 95%;
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
