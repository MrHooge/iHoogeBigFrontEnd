<template>
    <div class="openprize">
        <el-table
      :data="tableData"
      border
      style="width: 100%; margin-top: 20px">
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
            tableData:[]
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
        }
    }

}
</script>

<style scoped>
.openprize{
    padding: 10px 20px
}
</style>
