<!-- 活动管理 -->
<template>
  <div class="activityGiftcard">
    <div class="btnbox">
            <el-button type="primary" @click="givemoney">充值送彩金卡</el-button>
            <el-button type="primary" @click="modifyCard">修改礼物及彩金卡</el-button>
            <el-button type="primary" @click="modidyActivity">修改充值赠送活动</el-button>
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
                                <el-input v-model="username" placeholder="请输入用户名" clearable></el-input>
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
            <!-- 修改礼物及彩金卡 -->
            <el-dialog
                title="修改礼物及彩金卡"
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
                            <el-input v-model="scope.row.prob"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"                
                        label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="modifyCardSure(scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
            <!-- 修改充值赠送活动 -->
            <el-dialog
                title="修改充值赠送活动"
                :visible.sync="dialogVisible2">
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
                            <!-- <el-input v-model="scope.row.content"></el-input> -->
                            <el-select>
                                
                            </el-select>
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
import { addGoldCard,getAllGift,updateGift,findAllRechargeCardAct } from '@/api/activity'
import { Message, MessageBox } from 'element-ui'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
    data() {
        return {
            dialogVisible: false,//充值送彩金卡
            dialogVisible1: false,//修改礼物及彩金卡
            dialogVisible2: false,//修改充值赠送活动
            username:'',
            options: [],   //存储彩金卡
            money:'',
            tableData1: [],   //存储所有礼物及彩金卡数据
            tableData2: [],   //存储所有充值赠送活动配置

            id: '',
            full_money: '',
            money: '',
            name: '',
            prob: '',
        }
    },
    components: {},
    methods:{
        //修改礼物及彩金卡弹出框
        modifyCard(){
            this.dialogVisible1 = true
            this.getAllCards()
        },
        //修改礼物及彩金卡确定按钮
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
                console.log(res)
            })
        },
        //修改充值赠送活动弹出框
        modidyActivity(){
            this.dialogVisible2 = true
            this.getAllCardAct()
        },
        modidyActivitySure(val){
            console.log(val)
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
        getAllCardAct(){
            findAllRechargeCardAct().then(res =>{
                console.log(res)
                if(res.data.error_code === 200){
                    this.tableData2 = res.data.data
                    
                }
            })
        },
        //弹出框
        givemoney(){
            this.money = '',
            this.username = '',
            this.dialogVisible = true
            this.getAllCards()
        },
        //确定按钮的回调
        sure(){
            let arr = []
            let obj = {
                account: this.username,
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
