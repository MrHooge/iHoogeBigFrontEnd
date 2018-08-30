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
        prop="matchId"
        label="场次号"
        align="center">
      </el-table-column>
      <el-table-column
        prop="gameName"
        label="	赛事名称"
        width="100"
        align="center">
      </el-table-column>
       <el-table-column
        prop="homeTeam"
        label="主队"
        align="center">
      </el-table-column>
      <el-table-column
        prop="guestTeam"
        label="客队"
        align="center">
      </el-table-column>
       <el-table-column
        prop="rq"
        label="让球数"
        align="center">
      </el-table-column>
      <el-table-column
        prop="halfHomeScore"
        label="	主队半场进球"
        align="center">
      </el-table-column>
      <el-table-column
        prop="halfGuestScore"
        label="	客队半场进球"
        align="center">
      </el-table-column>
       <el-table-column
        prop="homeScore"
        label="主队总进球	"
        align="center">
      </el-table-column>
       <el-table-column
        prop="guestScore"
        label="客队总进球"
        align="center">
      </el-table-column>
      <el-table-column
        label="	比赛时间"
        align="center">
         <template slot-scope="scope">
                    {{scope.row.matchTime | time}}
                </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label="	状态"
        align="center">
        <template slot-scope="scope">
            <el-tag
            disable-transitions>{{scope.row.status | changeType}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="	操作"
        align="center">
        <template slot-scope="scope">
        <el-button type="primary" @click="modify(scope.row,'modify')">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="客队总进球" :label-width="formLabelWidth">
          <el-input v-model="form.guestScore" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="客队半场进球" :label-width="formLabelWidth">
          <el-input v-model="form.halfGuestScore" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="主队半场进球" :label-width="formLabelWidth">
          <el-input v-model="form.halfHomeScore" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="主队总进球" :label-width="formLabelWidth">
          <el-input v-model="form.homeScore" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="让球" :label-width="formLabelWidth">
          <el-input v-model="form.rq" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-radio v-model="form.status" label="0" border>进行中</el-radio>
            <el-radio v-model="form.status" label="1" border>已结束</el-radio>
            <el-radio v-model="form.status" label="2" border>取消</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitInfos">确 定</el-button>
      </div>
    </el-dialog>
    </div>
</template>

<script>
import { getFootBallAdmin,updateFootBallAdmin } from '@/api/period'
export default {
    data(){
        return{
            tableData:[],
            startTime:'',
            dialogFormVisible:false,
            form:{
                guestScore:'',	
                halfGuestScore:'',	
                halfHomeScore:'',	
                homeScore:'',		
                rq:'',
                status:'',
                id:''	
            }
        }
    },
    created(){
            this.gettable()
        },
    filters: {
        changeType(val){
            val = Number(val)
            if(val === 0){
                return '在售'
            }
            else if(val === 1){
                return '截止'
            }
            else if(val === 2){
                return '取消'
            }
        },
         time(a){
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

        },
    },
    methods:{
        //查询
        gettable(){
            let time = this.startTime;
            getFootBallAdmin(time).then(res => {
               console.log(res)
               this.tableData = res.data.data
           })
        },
        searchlist(){
            this.gettable()
        },
        modify(data){
            this.dialogFormVisible = true;
            this.form.id = data.id
        },
        //确认修改
        submitInfos(){
            updateFootBallAdmin(this.form).then(res => {
               if(res.data.error_code == 200){
                 this.$message(res.data.message)
                 this.dialogFormVisible = false
               }else{
                 this.$message(res.data.message)
                 this.dialogFormVisible = false
               }
            })
        }
    }
}
</script>

<style>
.basketball{
    padding: 10px 20px
}
</style>
