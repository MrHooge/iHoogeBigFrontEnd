<template>
    <div class="chongzhi app-container">
        <!-- 顶部筛选 -->
        <div class="topten">
            <el-row :gutter="20">
                <el-col :span="3">
                    <div class="grid-content bg-purple">
                        <el-input
                            v-model="name"
                            placeholder="请输入查询的账号"
                            @input="onInput">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="3">
                    <div class="grid-content bg-purple">
                        <el-input
                            v-model="user"
                            placeholder="请输入查询的昵称"
                            @input="onInput">
                        </el-input>
                    </div>
                </el-col>
                <el-col :span="12">
                        <div class="block"
                             style="display: inline-block;">
                            <el-date-picker v-model="value1"
                                            type="date"
                                            placeholder="选择日期"
                                            format="yyyy-MM-dd"
                                            value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </div>
                        <div style="display: inline-block;">至</div>
                        <div class="block"
                             style="display: inline-block;">
                            <el-date-picker v-model="value2"
                                            type="date"
                                            placeholder="选择日期"
                                            format="yyyy-MM-dd"
                                            value-format="yyyy-MM-dd">
                            </el-date-picker>
                        </div>
                </el-col>

                <el-col :span="2">
                    <div class="grid-content bg-purple"
                         @click="search">
                        <el-button type="primary"
                                   icon="el-icon-search">搜索</el-button>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!-- 表格数据  -->
        <el-table :data="tableData"
                  border
                  style="width: 100%">
            <el-table-column label="流水号"
                             align="center">
                <template slot-scope="scope">
                    {{ scope.row.wallet_Line_No }}
                </template>
            </el-table-column>
            <el-table-column label="客户账号"
                             align="center">
                <template slot-scope="scope">
                    {{ scope.row.ACCOUNT }}
                </template>
            </el-table-column>
            <el-table-column label="客户昵称"
                             align="center">
                <template slot-scope="scope">
                    {{ scope.row.username }}
                </template>
            </el-table-column>
            <el-table-column label="可用余额"
                             align="center">
                <template slot-scope="scope">
                    {{ scope.row.ABLE_BALANCE }}
                </template>
            </el-table-column>

            <el-table-column label="客户冻结"
                             align="center">
                <template slot-scope="scope">
                    {{ scope.row.FREEZE_BALANCE }}
                </template>
            </el-table-column>
            <el-table-column label="代理昵称"
                             align="center">
                <template slot-scope="scope">
                    {{ scope.row.agentName }}
                </template>
            </el-table-column>
            <el-table-column label="代理冻结"
                             align="center">
                <template slot-scope="scope">
                    {{ scope.row.freeze_credit_balance }}
                </template>
            </el-table-column>

            <el-table-column label="充值金额"
                             align="center">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.number"
                              placeholder="充值金额"></el-input>
                </template>
            </el-table-column>
            <el-table-column label="创建时间"
                             align="center">
                <template slot-scope="scope">
                    {{ scope.row.CREATE_DATE_TIME | time }}
                </template>
            </el-table-column>

            <el-table-column label="操作"
                             align="center">
                <template slot-scope="scope">
                    <el-button size="mini"
                               @click="handleRepy(scope.row)">充值</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <div class="page">
            <el-pagination background
                           :page-size=20
                           @current-change="changepage"
                           layout="prev, pager, next"
                           :total="total">
            </el-pagination>
        </div> -->
        <!-- 弹窗事件 -->
        <el-dialog title="提示"
                   :visible.sync="dialogVisible"
                   width="40%">
            <div>
                <p>会员名：{{ username }}</p>
                <p>额度：{{ money }}</p>
            </div>
            <span slot="footer"
                  class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary"
                           @click="makersure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { findRechargeUnderLine, xxCharge } from "@/api/sys_user";
import { findAllMember} from '@/api/customer'
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message, Checkbox } from "element-ui";
import treeTable from "@/components/TreeTable";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
export default {
    data() {
        return {
            name: "", // 用户名
            number: "", // 充值的金额
            total: 0, // 总页数
            tableData: [],//表格的数据
            dialogVisible: false,
            username: '',
            money: '',
            value1: '',
            value2: '',
            user: '',   //搜索的用户的昵称

        };
    },
    created() {
        // this.search(1)
        this.getData(this.name, this.value1, this.value2)
    },
    filter:{
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
    methods: {
        onInput() {   //  input 事件
            if (this.name === ''&& this.user === '') {
                this.getData(this.name, this.value1, this.value2)
            }
        },
        search() {
            if(this.name === ''){
                this.getAccount()
            }else{
                this.getData(this.name, this.value1, this.value2)
            }
        },
        getData(a, b, c) {   //  获取数据列表
            let obj = {
                loginAccount: getCookies('name'),
                agentName: a,
                startTime: b,
                endTime: c,
            }
            console.log(obj)
            findRechargeUnderLine(obj).then(res => {
                console.log(res)
                if (res.status == 200) {
                    if(res.data.error_code === 200){
                        this.tableData = res.data.data
                        this.total = res.data.totalCount
                    }else{
                        this.$message.error(res.data.data)
                    }
                }
            })
        },
        getAccount(){
            let obj = {
                username: this.user
            }
            findAllMember(obj).then(res => {
                console.log(res.data.data.list[0].ACCOUNT)
                this.name = res.data.data.list[0].ACCOUNT
                // this.accountSearch()
                this.getData(this.name, this.value1, this.value2)
            })
        },

        // 分页的回调
        changepage(val) {
            this.getData(val)
        },
        // 点击充值掉接口
        handleRepy(row) {
            this.dialogVisible = true
            this.username = row.account
            this.money = row.number
            console.log(row)
        },
        makersure() {
            let obj = {
                account: this.username,
                amount: this.money
            }
            xxCharge(obj).then(res => {
                console.log(res)
                if (res.status == 200) {
                    this.dialogVisible = false
                    Message.success('充值成功')
                    this.getData()
                } else {

                }
            })
        }
    }
};
</script>

<style scoped>
div.page {
  float: right;
  padding: 10px 0;
}
.topten {
  padding: 10px 0;
  margin-bottom: 20px;
}
</style>