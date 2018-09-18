<template>
    <div class="searchlist">
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
            </el-collapse-item>
        </el-collapse>
                <el-button type="primary" @click="searchlist" style="margin-top:15px">查询中奖方案 </el-button>
                <el-button type="primary" @click="paiaward" style="margin-top:15px">派奖 </el-button>
         <el-table
      :data="tableData"
      border
      style="width: 100%; margin-top: 20px"
      @selection-change="handleSelectionChange2">
      <el-table-column
               type="selection">
            </el-table-column>
      <el-table-column
        prop="account"
        label="用户名"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="amount"
        label="金额"
        align="center">
      </el-table-column>
      <el-table-column
        prop="createDateTime"
        label="发单时间"
        align="center">
      </el-table-column>
      <el-table-column
        prop="lotteryType"
        label="	彩种"
        align="center">
      </el-table-column>
      <el-table-column
        prop="planNo"
        label="	方案编号"
        align="center">
      </el-table-column>
       <el-table-column
        prop="posttaxPrize"
        label="	税后奖金"
        align="center">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center">
      </el-table-column>
    </el-table>
    </div>
</template>

<script>
import { getWinPlanByType,returnPrize } from '@/api/period'
export default {
    data(){
        return{
            tableData:[],
            radio:1,

            selections1: [],   //查询中奖方案的选择框
            selections2:[],    //派奖的选择框
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
            lotteryTypes: '',  //竞技彩
        }
    },
    
    methods:{
        //获取数据
        gettable(){
            getWinPlanByType(this.lotteryTypes).then(res => {
                console.log(res)
                if(res.data.error_code === 200) {
                    this.tabledata = res.data.data
                    this.$message.success(res.data.message)
                }else{
                    this.$message.error(res.data.message)
                }
            })
        },
        searchlist(){
            if(this.selections1.length === 0){
                this.$message('至少选择一个竞技彩')
            }else{
                let newarr = [];
                this.selections1.forEach(e => {
                    newarr.push(e.radio)
                });
                this.lotteryTypes = newarr.join(',');
                this.gettable()
            }
        },
        //派奖
        paiaward(){
            if(this.selections2.length === 0){
                this.$message('至少选择一个中奖方案')
            }else{
                let newarr = [];
                this.selections2.forEach(e => {
                    newarr.push(e.planNo)
                });
                this.plans = newarr.join(',');
                returnPrize(this.plans).then(res => {
                    if(res.data.error_code === 200) {
                        this.$message('派奖成功')
                        this.gettable()
                    }else{
                        this.$message(res.data.message)
                    }
                })
            }
        },
        //竞技彩的选择框选中
        handleSelectionChange1(selection) {
            this.selections1 = selection;
        },

        //用户的选择框选中
        handleSelectionChange2(selection){
            this.selections2 = selection;
        }
    }
}
</script>

<style scoped>
.searchlist{
    padding: 10px 20px
}
</style>
