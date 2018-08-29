<template>
    <div class="basketball">
         开始时间：<el-date-picker
            v-model="startTime"
            type="date"
            style="margin-bottom:40px;margin-right:20px;width:200px"
            placeholder="请选择开始日期"
            value-format="yyyyMMdd">
            </el-date-picker>
            <el-button type="primary" @click="searchlist" style="margin-top:15px">查询 </el-button>
        <el-table
      :data="tableData"
      border
      style="width: 100%; margin-top: 20px"
      @selection-change="handleSelectionChange">
      <el-table-column
        prop="bigOrSmall"
        label="	大小分"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="gameName"
        label="	赛事名称"
        width="100"
        align="center">
      </el-table-column>
      <el-table-column
        prop="guestScore"
        label="客队分"
        align="center">
      </el-table-column>
      <el-table-column
        prop="guestTeam"
        label="客队"
        align="center">
      </el-table-column>
       <el-table-column
        prop="homeScore"
        label="主队分	"
        align="center">
      </el-table-column>
      <el-table-column
        prop="homeTeam"
        label="主队"
        align="center">
      </el-table-column>
       <el-table-column
        prop="matchId"
        label="场次号"
        align="center">
      </el-table-column>
      <el-table-column
        prop="matchTime"
        label="	比赛时间"
        align="center">
      </el-table-column>
       <el-table-column
        prop="rf"
        label="让分"
        align="center">
      </el-table-column>
       <el-table-column
        prop="selectStatus"
        label="单关/过关停开售状态"
        align="center">
      </el-table-column>
      <el-table-column
        prop="status"
        label="	状态"
        align="center">
      </el-table-column>
    </el-table>
    </div>
</template>

<script>
import { getBasketBallAdmin } from '@/api/period'
export default {
    data(){
        return{
            tableData:[],
            startTime:'',
        }
    },
    // filters:{
    // },
    created(){
            this.gettable()
        },
    methods:{
        //查询
        gettable(){
            let time = this.startTime;
            getBasketBallAdmin(time).then(res => {
               console.log(res)
           })
        },
        searchlist(){
            this.gettable()
        }
    }
}
</script>

<style>
.basketball{
    padding: 10px 20px
}
</style>
