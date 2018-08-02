<template>
    <div class="openprize">
        <el-button type="primary" @click="searchlist">查询中奖方案 </el-button>
        <el-button type="primary" @click="payprize">多个派奖 </el-button>
        <el-table
      :data="tableData"
      border
      style="width: 100%; margin-top: 20px"
      @selection-change="handleSelectionChange">
      <el-table-column
               type="selection"
               width="55">
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
        <template slot-scope="scope">
        <el-button type="success" @click="award(scope.row,'modify')">派奖</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
</template>

<script>
import { openResult,returnPrize } from '@/api/period'
export default {
    data(){
        return{
            tableData:[],
            selection:''
        }
    },
     created(){
      this.gettable()  
    },
    methods:{
        //获取列表数据
        gettable(){
            let lotteryTypes = this.$route.query.radio;
            openResult(lotteryTypes).then(res => {
                console.log(res)
            })
        },
        //派奖
        award(data){
            let plans = data.planNo
            returnPrize(plans).then(res => {
                if(res.data.error_code == 200){
                    this.$message(res.data.message)
                }
            })
        },
        //多个派奖
        payprize(){
             if (this.selections.length == 0) {
                this.$message('请至少选择一条数据')
            } else {
                let arr = []
                this.selections.forEach(e => {
                    arr.push(e.planNo)
                })
                let plans = arr.join(',')
                returnPrize(plans).then(res => {
                if(res.data.error_code == 200){
                    this.$message(res.data.message)
                }
            })
            }
        },
        // 选择框全部
        handleSelectionChange(selection) {
            this.selections = selection
        },
    }

}
</script>

<style scoped>
.openprize{
    padding: 10px 20px
}
</style>
