<!-- 活动管理 -->
<template>
  <div class="activityGiftcard">
    <div class="btnbox">
            <el-button type="primary" @click="givemoney">充值送彩金卡</el-button>
            <el-button type="primary" @click="modifyCard">修改彩金卡及大转盘</el-button>
            <el-button type="primary" @click="modidyActivity">修改手工充值赠送活动</el-button>
            <!-- 充值送彩金卡 -->
            <el-dialog
                title="充值送彩金卡"
                :visible.sync="dialogVisible"
                width="500px">
                <div class="">
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                用户名
                            </div>
                        </el-col>
                        <el-col :span="15">
                            <div class="grid-content bg-purple-light">
                                <el-input v-model="account" placeholder="请输入用户名" clearable></el-input>
                                <p style="color:red;font-size:14px;">注：不知道用户名时可用昵称查询！</p>
                                <el-input v-model="username" placeholder="请输入昵称" style="width:210px;margin-bottom:20px;" clearable></el-input>
                                <el-button type="primary" @click="getAccount">查询</el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <br>
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                金额
                            </div>
                        </el-col>
                        <el-col :span="15">
                            <div class="grid-content bg-purple-light">
                                <!-- <el-input v-model="money" placeholder="请输入赠送金额" type="number" clearable></el-input> -->
                                <el-select v-model="money" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="sure">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 修改彩金卡及大转盘 -->
            <el-dialog
                title="修改彩金卡及大转盘"
                :visible.sync="dialogVisible1">
                <el-table
                    ref="multipleTable"
                    :data="tableData1"
                    tooltip-effect="dark"
                    style="width: 100%"
                    border
                    >
                    <el-table-column
                        prop="id"
                        align="center"
                        label="id">
                    </el-table-column>
                     
                    <el-table-column
                        align="center"                
                        label="满额度使用">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.full_money"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"                
                        label="价值金额">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.money"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"                
                        label="名字">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.name"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"                
                        label="获得概率">
                        <template slot-scope="scope">
                            <el-input value="0" v-if="scope.row.prob === 0"></el-input>
                            <el-input v-model="scope.row.prob" v-else></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"                
                        label="操作">
                        <template slot-scope="scope">
                            <el-button v-if="scope.row.full_money === -1" disabled>修改</el-button>
                            <el-button type="primary" @click="modifyCardSure(scope.row)" v-else>修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
            <!-- 修改手工充值赠送活动 -->
            <el-dialog
                title="修改手工充值赠送活动"
                :visible.sync="dialogVisible2">
                <p>1.录入起始金额</p>
                <p>2.彩金卡必须是当前已有彩金卡，否则无法使用</p>
                <p>3.赠送彩金卡以数字加英文逗号隔开，可重复（例如：24,8,8,80 即24元彩金卡一张，8元两张，80元一张）</p>
                <el-table
                    ref="multipleTable"
                    :data="tableData2"
                    tooltip-effect="dark"
                    style="width: 100%"
                    border
                    >
                    <el-table-column
                        prop="id"
                        align="center"
                        label="id">
                    </el-table-column>
                    <el-table-column
                        align="center"                
                        label="起始金额">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.begin_money"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"                
                        label="赠送彩金卡id">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.content"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"                
                        label="结束金额">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.end_money"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"                
                        label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="modidyActivitySure(scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
        </div>
  </div>
</template>

<script>
import { addGoldCard,getAllGift,updateGift,findAllRechargeCardAct,updateRechargeCardAct } from '@/api/activity'
import { findAllMember} from '@/api/customer'
import { Message, MessageBox } from 'element-ui'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
    data() {
        return {
            dialogVisible: false,//充值送彩金卡
            dialogVisible1: false,//修改彩金卡及大转盘
            dialogVisible2: false,//修改手工充值赠送活动
            account: '',
            username:'',
            options: [],   //存储彩金卡
            money:'',
            tableData1: [],   //存储所有礼物及彩金卡数据
            tableData2: [],   //存储所有充值赠送活动配置

            id: '',     //存储礼物的id
            full_money: '',  //存储礼物的满额度使用	
            money: '',    //存储礼物的价值金额	
            name: '',    //存储礼物的名字
            prob: '',    //存储礼物的获得概率

            activityId: '', //存储充值赠送活动的id
            activityContent: '', //存储充值赠送活动的赠送彩金卡id
            activityBegin_money: '',  //存储充值赠送活动的起始金额
            activityEnd_money: '',   //存储充值赠送活动的结束金额	
        }
    },
    created() {
        this.getAllCards()
    },
    components: {},
    methods:{
        // //查询
        // search() {
		// 	if (!this.account && !this.username) {
        //         // this.$message("请输入您要查询的账号或昵称！")
        //         this.page = 1
        //         this.getTable()
		// 	} else {
        //         if(this.account == ''){
        //             this.getAccount()
        //         }else{
        //             this.page = 1
        //             this.getTable()
        //         }
		// 	}
        // },
        //用昵称查询账号
        getAccount(){
            let obj = {
                username: this.username
            }
            findAllMember(obj).then(res => {
                this.account = res.data.data.list[0].ACCOUNT
            })
        },
        //修改彩金卡及大转盘弹出框
        modifyCard(){
            this.dialogVisible1 = true
        },
        //修改彩金卡及大转盘确定按钮
        modifyCardSure(val){
            this.id = val.id
            this.full_money = val.full_money
            this.money = val.money
            this.name = val.name
            this.prob = val.prob
            let obj = {
                id: this.id,
                full_money: this.full_money,
                money: this.money,
                name: this.name,
                prob: this.prob,
                limit_money: '',
            }
            updateGift(obj).then( res=>{
                if(res.data.error_code === 200){
                    this.$message.success(res.data.message)
                    this.dialogVisible1 = false
                }else{
                    this.$message.error(res.data.message)
                }
            })
        },
        //修改手工充值赠送活动弹出框
        modidyActivity(){
            this.dialogVisible2 = true
            this.getAllCardAct()
        },
        //修改手工充值赠送活动确定按钮
        modidyActivitySure(val){
            this.activityId = val.id
            this.activityContent = val.content
            this.activityBegin_money = val.begin_money
            this.activityEnd_money = val.end_money
            let obj = {
                id: this.activityId,
                content: this.activityContent,
                begin_money: this.activityBegin_money,
                end_money: this.activityEnd_money,
            }
            updateRechargeCardAct(obj).then(res =>{
                if(res.data.error_code === 200){
                    this.$message.success(res.data.message)
                    this.dialogVisible2 = false
                }else{
                    this.$message.error(res.data.message)
                }
            })
        },
        //获取所有彩金卡
        getAllCards(){
            getAllGift().then(res => {
                if(res.data.error_code === 200){
                    this.tableData1 = res.data.data
                    res.data.data.forEach(e => {
                        let obj = {
                            value: '',
                            label: '',
                        }
                        if(e.full_money != -1){
                            obj.value = e.money
                            obj.label = e.name
                            this.options.push(obj)
                        }
                        
                    });
                }
            })
        },
        //获取所有活动
        getAllCardAct(){
            findAllRechargeCardAct().then(res =>{
                if(res.data.error_code === 200){
                    this.tableData2 = res.data.data
                }else{
                    this.tableData2 = []
                }
            })
        },
        //弹出框
        givemoney(){
            this.money = '',
            this.account = '',
            this.dialogVisible = true
        },
        //确定按钮的回调
        sure(){
            let arr = []
            let obj = {
                account: this.account,
                money: this.money,
                require_type: 2
            }
            arr.push(obj);
            let params = JSON.stringify(arr)
            let loginAccount = getCookies('name')
            addGoldCard(params,loginAccount).then(res => {
                if(res.data.error_code === 200){
                    this.$message.success(res.data.message)
                    this.dialogVisible = false
                }else{
                    this.$message.error(res.data.message)
                }
            })
        }

    }
}
</script>

<style scoped>
.activityGiftcard{
    padding: 0 20px;
}
.btnbox {
    padding: 20px 0;
}
div.gift {
    padding: 10px 0;
}
</style>
