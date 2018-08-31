<template>
    <div class="searchlist">
                <el-collapse accordion>
        <el-collapse-item title="竞技彩">
   <div class="three">
            <h3>竞篮</h3>
    <el-radio v-model="radio" label="304" border style="margin:5px;" size="mini">竞彩篮球单关投注</el-radio>
     <el-radio v-model="radio" label="30" border style="margin:5px;" size="mini">竞彩篮球胜负</el-radio>
     <el-radio v-model="radio" label="31" border style="margin:5px;" size="mini">竞彩篮球让分胜负</el-radio>
    <el-radio v-model="radio" label="32" border style="margin:5px;" size="mini">竞彩篮球胜分差</el-radio>
     <el-radio v-model="radio" label="33" border style="margin:5px;" size="mini">竞彩篮球大小分</el-radio>
     <el-radio v-model="radio" label="43" border style="margin:5px;" size="mini">竞彩篮球混合过关</el-radio>
        <el-radio v-model="radio" label="39" border style="margin:5px;" size="mini">竞彩篮球</el-radio>
        </div>

        <div class="three">
            <h3>竞足</h3>
    <el-radio v-model="radio" label="303" border style="margin:5px;" size="mini">竞彩足球单关投注</el-radio>
     <el-radio v-model="radio" label="42" border style="margin:5px;" size="mini">竞彩足球混合过关</el-radio>
     <el-radio v-model="radio" label="41" border style="margin:5px;" size="mini">竞彩足球胜平负</el-radio>
    <el-radio v-model="radio" label="34" border style="margin:5px;" size="mini">竞彩足球让球胜平负</el-radio>
     <el-radio v-model="radio" label="35" border style="margin:5px;" size="mini">竞彩足球比分</el-radio>
     <el-radio v-model="radio" label="36" border style="margin:5px;" size="mini">竞彩足球进球数</el-radio>
        <el-radio v-model="radio" label="37" border style="margin:5px;" size="mini">竞彩足球半全场</el-radio>
        </div>
         <div class="three">
            <h3>北单</h3>
    <el-radio v-model="radio" label="1" border style="margin:5px;" size="mini">单场胜平负</el-radio>
     <el-radio v-model="radio" label="2" border style="margin:5px;" size="mini">单场上下盘单数</el-radio>
     <el-radio v-model="radio" label="3" border style="margin:5px;" size="mini">单场总进球数</el-radio>
    <el-radio v-model="radio" label="1" border style="margin:5px;" size="mini">单场正确比分</el-radio>
     <el-radio v-model="radio" label="2" border style="margin:5px;" size="mini">单场半全场胜平负</el-radio>
     <el-radio v-model="radio" label="3" border style="margin:5px;" size="mini">单场胜负过关</el-radio>
        <el-radio v-model="radio" label="3" border style="margin:5px;" size="mini">北京单场</el-radio>
        <el-radio v-model="radio" label="3" border style="margin:5px;" size="mini">传统足彩</el-radio>
        </div>
         <div class="three">
            <h3>足彩</h3>
    <el-radio v-model="radio" label="2" border style="margin:5px;" size="mini">胜负彩14场</el-radio>
     <el-radio v-model="radio" label="3" border style="margin:5px;" size="mini">胜负任9</el-radio>
        <el-radio v-model="radio" label="3" border style="margin:5px;" size="mini">4场进球</el-radio>
           <el-radio v-model="radio" label="3" border style="margin:5px;" size="mini">6场半全场</el-radio>
        </div>
  </el-collapse-item>
                </el-collapse>
                <el-button type="primary" @click="searchlist" style="margin-top:15px">查询中奖方案 </el-button>
                <el-button type="primary" @click="paiaward" style="margin-top:15px">派奖 </el-button>
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
           selections:[]
        }
    },
    
    methods:{
       //获取数据
       gettable(){
           let lotteryTypes = this.radio;
           getWinPlanByType(lotteryTypes).then(res => {
               this.tableData = res.data.data
           })
       },
       searchlist(){
           //console.log(lotteryTypes)
           this.gettable()
       },
       //派奖
       paiaward(){
           if(this.selections == 0){
              this.$message('至少选择一个中奖方案')
        }else{
             let newarr = [];
              this.selections.forEach(e => {
                    //console.log(e.account);
                    newarr.push(e.planNo)
              });
              this.plans = newarr.join(',');
              returnPrize(this.plans).then(res => {
                    if (res.data.error_code === 200) {
                     this.$message('派奖成功')
                     this.gettable()
                     } else {
                         this.$message(res.data.message)
                         }
              })
        }
       },
       // 选择框全部
        handleSelectionChange(selection) {
            this.selections = selection;
            
        }
    }
}
</script>

<style scoped>
.searchlist{
    padding: 10px 20px
}
</style>
