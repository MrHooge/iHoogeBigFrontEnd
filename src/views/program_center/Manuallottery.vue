<template>
    <div class="lotterymanager">
        <el-collapse accordion>
            <el-collapse-item title="竞技彩">
                <div class="three">
                    <el-table
                        :data="basketballDataAndfootballData"
                        border
                        style="width: 50%;margin-left:380px;"
                        @selection-change="handleSelectionChange1">
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column
                            label="竞篮和竞足"
                            prop="lottery"
                            align="center">
                        </el-table-column>
                    </el-table>
                </div>
                <!-- <div class="three">
                    <el-table
                        :data="basketballData"
                        border
                        style="width: 50%;float:left"
                        @selection-change="handleSelectionChange1">
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column
                            label="竞篮"
                            prop="lottery"
                            align="center">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="three">
                    <el-table
                        :data="footballData"
                        border
                        style="width: 50%;float:left"
                        @selection-change="handleSelectionChange1">
                        <el-table-column type="selection"></el-table-column>
                        <el-table-column
                            label="竞足"
                            prop="lottery"
                            align="center">
                        </el-table-column>
                    </el-table>
                </div> -->
                    <!-- <div class="three">
                        <el-table
                        :data="singerData"
                        border
                        style="width: 25%;float:left"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                            <el-table-column
                                label="昵称"
                                prop="lottery"
                                align="center">
                        </el-table-column>
                </el-table>
                        <h3>北单</h3>
                <el-radio v-model="radio" label="1" border style="margin:5px;" size="mini">单场胜平负</el-radio>
                <el-radio v-model="radio" label="2" border style="margin:5px;" size="mini">单场上下盘单数</el-radio>
                <el-radio v-model="radio" label="3" border style="margin:5px;" size="mini">单场总进球数</el-radio>
                <el-radio v-model="radio" label="1" border style="margin:5px;" size="mini">单场正确比分</el-radio>
                <el-radio v-model="radio" label="2" border style="margin:5px;" size="mini">单场半全场胜平负</el-radio>
                <el-radio v-model="radio" label="3" border style="margin:5px;" size="mini">单场胜负过关</el-radio>
                    <el-radio v-model="radio" label="3" border style="margin:5px;" size="mini">北京单场</el-radio>
                    <el-radio v-model="radio" label="3" border style="margin:5px;" size="mini">传统足彩</el-radio>
                    </div> -->
                    <!-- <div class="three">
                        <el-table
                        :data="winData"
                        border
                        style="width: 25%;float:left"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                            <el-table-column
                                label="昵称"
                                prop="lottery"
                                align="center">
                        </el-table-column>
                </el-table>
                        <h3>足彩</h3>
                <el-radio v-model="radio" label="2" border style="margin:5px;" size="mini">胜负彩14场</el-radio>
                <el-radio v-model="radio" label="3" border style="margin:5px;" size="mini">胜负任9</el-radio>
                    <el-radio v-model="radio" label="3" border style="margin:5px;" size="mini">4场进球</el-radio>
                    <el-radio v-model="radio" label="3" border style="margin:5px;" size="mini">6场半全场</el-radio>
                    </div> -->
            </el-collapse-item>
        </el-collapse>
        <el-button type="primary" @click="addjqr" style="margin-left:800px">开奖 </el-button>
        <el-button type="primary" @click="Award" style="margin:20px 0 0 0">派奖 </el-button><br />
            <div>
                <el-table
                :data="tabledata"
                border
                style="width: 100%;"
                @selection-change="handleSelectionChange2">
                    <el-table-column type="selection"></el-table-column>
                    <el-table-column
                        label="用户名"
                        prop="account"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        label="金额"
                        prop="amount"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        label="发单时间"
                        align="center">
                        <template slot-scope="scope">
                            {{scope.row.createDateTime | setTime}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="彩种"
                        prop="lotteryType"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        label="方案编号"
                        prop="planNo"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        label="税后奖金"
                        prop="posttaxPrize"
                        align="center">
                    </el-table-column>
                </el-table> 
            </div>
    </div>
</template>

<script>
import setTime from '@/utils/time.js'
import { openResult,returnPrize } from '@/api/period'
export default {
    data(){
        return {
            selections1: [],   //竞技彩的选择框
            selections2: [],   //用户的选择框
            lotteryTypes:'',   //竞技彩
            plans:'',    //方案号
            // basketballData:[
            //     {radio:"304",lottery:"竞彩篮球单关投注"},
            //     {radio:"30",lottery:"竞彩篮球胜负"},
            //     {radio:"31",lottery:"竞彩篮球让分胜负"},
            //     {radio:"32",lottery:"竞彩篮球胜分差"},
            //     {radio:"33",lottery:"竞彩篮球大小分"},
            //     {radio:"43",lottery:"竞彩篮球混合过关"},
            //     // {radio:"39",lottery:"竞彩篮球"}
            // ],
            // footballData:[
            //     {radio:"303",lottery:"竞彩足球单关投注"},
            //     {radio:"42",lottery:"竞彩足球混合过关"},
            //     {radio:"41",lottery:"竞彩足球胜平负"},
            //     {radio:"34",lottery:"竞彩足球让球胜平负"},
            //     {radio:"35",lottery:"竞彩足球比分"},
            //     {radio:"36",lottery:"竞彩足球进球数"},
            //     {radio:"37",lottery:"竞彩足球半全场"}
            // ],
            basketballDataAndfootballData: [
                {radio:"304",lottery:"竞彩篮球单关投注"},
                {radio:"30",lottery:"竞彩篮球胜负"},
                {radio:"31",lottery:"竞彩篮球让分胜负"},
                {radio:"32",lottery:"竞彩篮球胜分差"},
                {radio:"33",lottery:"竞彩篮球大小分"},
                {radio:"43",lottery:"竞彩篮球混合过关"},
                {radio:"303",lottery:"竞彩足球单关投注"},
                {radio:"42",lottery:"竞彩足球混合过关"},
                {radio:"41",lottery:"竞彩足球胜平负"},
                {radio:"34",lottery:"竞彩足球让球胜平负"},
                {radio:"35",lottery:"竞彩足球比分"},
                {radio:"36",lottery:"竞彩足球进球数"},
                {radio:"37",lottery:"竞彩足球半全场"}
            ],
            tabledata:[]
        }
    },
    filters:{
        setTime(a) {
            if (a != null) {
                return setTime(a);
            }
        },
    },
    methods:{
        //开奖
        addjqr(){
            if(this.selections1.length === 0){
                this.$message('至少选择一个竞技彩')
            }else{
                let newarr = [];
                this.selections1.forEach(e => {
                    newarr.push(e.radio)
                });
                let newaccount = newarr.join(',');
                this.lotteryTypes = newaccount;
                openResult(this.lotteryTypes).then(res => {
                    if(res.data.error_code === 200) {
                        this.tabledata = res.data.data
                        this.$message.success(res.data.message)
                    }else{
                        this.$message.error(res.data.message)
                    }
                })
            }
        },
        //派奖
        Award(){
             if(this.selections2.length === 0){
              this.$message('至少选择一个用户')
        }else{
            let newarr = [];
            this.selections2.forEach(e => {
                newarr.push(e.planNo)
            });
            this.plans = newarr.join(',');
            returnPrize(this.plans).then(res => {
                if(res.data.error_code === 200) {
                    this.$message.success('派奖成功')
                }else{
                    this.$message(res.data.message)
                }
            })
        }
        },
        //竞技彩的选择框
        handleSelectionChange1(selection) {
            this.selections1 = selection;
        },
        //用户的选择框
        handleSelectionChange2(selection) {
            this.selections2 = selection;
        }
    }
}
</script>

<style scoped>
.lotterymanager{
    padding: 10px 20px
}
</style>
