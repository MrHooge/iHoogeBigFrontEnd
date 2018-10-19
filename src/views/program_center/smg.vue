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
            <!-- 表格二 -->
            <div class="alltable">
                <!-- 表格一 -->
                <div class="tablefirst">
                    <el-table
                        :data="tableData"
                        border>
                        <el-table-column
                            prop="matchId"
                            label="场次号"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="gameName"
                            label="赛事名称"
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
                            label="主队半场进球"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="halfGuestScore"
                            label="客队半场进球"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="homeScore"
                            label="主队总进球"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="guestScore"
                            label="客队总进球"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            label="比赛时间"
                            align="center">
                            <template slot-scope="scope">
                                {{scope.row.matchTime | time}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="status"
                            label="状态"
                            align="center">
                            <template slot-scope="scope">
                                <el-tag disable-transitions>{{scope.row.status | changeType}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="操作"
                            align="center">
                            <template slot-scope="scope">
                                <el-button type="primary" @click="modify(scope.row,'modify')">修改</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- <div class="tablesecond">
                <div class="table-top">
                    <div class="listnum">过关</div>
                    <div class="listnum">过关</div>
                    <div class="listnum">过关</div>
                    <div class="listnum">过关</div>
                    <div class="listnum">过关</div>
                    <div class="listnum">过关</div>
                    <div class="listnum">过关</div>
                    <div class="listnum">过关</div>
                    <div class="listnum">过关</div>
                    <div class="listnum">过关</div>
                </div>
                <div v-for="(item,index) in tableData" :key="index" class="table-down">
                <div class="testfirst">
                    
                    <div v-for="val in item.selectStatus" :key="val.index" class="testsecond"> <el-checkbox name="type"></el-checkbox></div>
                </div>
                
                <div>
                    {{index}} 
                    <span v-for="val in v.selectStatus" :key="val.index">{{val}}</span>
                </div>
                </div>
                </div> -->
            </div>
     <el-dialog :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="客队总进球">
          <el-input v-model="form.guestScore" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="客队半场进球">
          <el-input v-model="form.halfGuestScore" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="主队半场进球">
          <el-input v-model="form.halfHomeScore" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="主队总进球">
          <el-input v-model="form.homeScore" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="让球">
          <el-input v-model="form.rq" auto-complete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-radio v-model="form.status" label="0" border>进行中</el-radio>
            <el-radio v-model="form.status" label="1" border>截止</el-radio>
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
                status:1,
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
                return '进行中'
            }
            else if(val === 1){
                return '截止'
            }
            else if(val === 2){
                return '取消'
            }
        },
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
    methods:{
        //查询
        gettable(){
            let time = this.startTime;
            getFootBallAdmin(time).then(res => {
               this.tableData = res.data.data
           })
        },
        searchlist(){
            this.gettable()
        },
        modify(data){
            this.dialogFormVisible = true;
            this.form.id = data.id
            if(data.guestScore != null){
                this.form.guestScore = data.guestScore.toString()
            }else{
                this.form.guestScore = ''
            }
            if(data.halfGuestScore != null){
                this.form.halfGuestScore = data.halfGuestScore.toString()
            }
            else{
                this.form.halfGuestScore = ''
            }
            if(data.halfHomeScore != null){
                this.form.halfHomeScore = data.halfHomeScore.toString()
            }
            else{
                this.form.halfHomeScore = ''
            }
            if(data.homeScore != null){
                this.form.homeScore = data.homeScore.toString()
            }
            else{
                this.form.homeScore = ''
            }
            if(data.rq != null){
                this.form.rq = data.rq.toString()
            }
            else{
                this.form.rq = ''
            }
            if(data.status != null){
                this.form.status = data.status.toString()
            }
            else{
                this.form.status = ''
            }
        },
        //确认修改
        submitInfos(){
            updateFootBallAdmin(this.form).then(res => {
                if(res.data.error_code == 200){
                    this.$message.success(res.data.message)
                    this.dialogFormVisible = false
                    this.form.guestScore = ''
                    this.form.halfGuestScore = ''
                    this.form.halfHomeScore = ''
                    this.form.homeScore = ''
                    this.gettable()

                }else{
                    this.$message.error(res.data.message)
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
/* .tablefirst{
  float: left;
}
.tablesecond{
  float: left;
} */
.testfirst{
  width:780px;
  height: 71px;
  border: 1px solid #cccccc
}
.testsecond{
  text-align: center;
  width: 78px;
  height: 71px;
  line-height: 71px;
  border-right: 1px solid #cccccc;
  float: left;
}
.listnum{
  width: 78px;
  height: 71px;
  border: 1px solid #cccccc;
  text-align: center;
  line-height: 71px;
  float: left;
}
.table-top{
  width: 780px;
  height: 71px;
  background: green
}
.table-down{
  margin-top: 0px
}

.Built-inmodule{
  float: left;
}
.el-table_1_column_10{
  width: 150px
}
</style>
