<template>
    <div class="basketball">
         开始时间：<el-date-picker
            v-model="startTime"
            type="date"
            style="margin-bottom:40px;margin-right:20px;width:200px"
            placeholder="请选择开始日期"
            value-format="yyyyMMdd">
            </el-date-picker>
            <el-button type="primary" @click="searchlist" style="margin-top:15px">查询</el-button>
            <el-button type="primary" @click="renew" style="margin-top:15px">更新赛事信息</el-button>
        <el-table
        :data="tableData"
        border
        style="width: 100%; margin-top: 20px">
            <el-table-column
            prop="matchId"
            label="场次号"
            align="center">
            </el-table-column>
            <el-table-column
            prop="gameName"
            label="赛事名称"
            width="100"
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
            prop="guestTeam"
            label="客队"
            align="center">
            </el-table-column>
            <el-table-column
            prop="guestScore"
            label="客队分"
            align="center">
            </el-table-column>
            <el-table-column
            prop="homeTeam"
            label="主队"
            align="center">
            </el-table-column>
            <el-table-column
            prop="homeScore"
            label="主队分	"
            align="center">
            </el-table-column>
            <el-table-column
            prop="rf"
            label="让分"
            align="center">
            </el-table-column>
            <el-table-column
            label="大小分"
            prop="bigOrSmall"
            align="center">
            </el-table-column>
            <el-table-column
            prop="selectStatus"
            label="单关/过关停开售状态"
            align="center">
            </el-table-column>
            <el-table-column
            label="状态"
            align="center">
                <template slot-scope="scope">
                        {{scope.row.status | type}}
                    </template>
            </el-table-column>
            <el-table-column
            label="操作"
            align="center">
                <template slot-scope="scope">
                <el-button type="primary" @click="modify(scope.row)">修改</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 弹框 -->
        <el-dialog :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="大小分基准">
                    <el-input v-model="form.baseBigOrSmall" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="客队分">
                    <el-input v-model="form.guestScore" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="主队分">
                    <el-input v-model="form.homeScore" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="让分">
                    <el-input v-model="form.rf" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态">
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
import { getBasketBallAdmin,updateBasketBallAdmin ,updateMatch} from '@/api/period'
export default {
    data(){
        return{
            tableData:[],
            startTime:'',
            dialogFormVisible:false,
            form:{
                baseBigOrSmall:'',
                guestScore:'',	
                homeScore:'',		
                rf:'',
                status:'',
                id:''	
            }
        }
    },
    filters:{
      type(a){
        if(a == 0){
          return "进行中"
        }else if(a == 1){
          return "已结束"
        }else{
          return "取消"
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
    created(){
            this.gettable()
        },
    methods:{
        renew(){
            updateMatch().then(res=>{
                console.log(res)
                if(res.data.error_code === 200){
                    this.$message.success(res.data.message)
                }else{
                    this.$message.success(res.data.data)
                }
            })
        },
        //查询
        gettable(){
            let time = this.startTime;
            getBasketBallAdmin(time).then(res => {
              this.tableData = res.data.data
           })
        },
        searchlist(){
            this.gettable()
        },
        modify(data){
            console.log(data)
            this.dialogFormVisible = true;
            this.form.id = data.id
            if(data.bigOrSmall != null){
                this.form.baseBigOrSmall = data.bigOrSmall.toString()
            }else{
                this.form.baseBigOrSmall = ''
            }
            if(data.guestScore != null){
                this.form.guestScore = data.guestScore.toString()
            }else{
                this.form.guestScore = ''
            }
            if(data.homeScore != null){
                this.form.homeScore = data.homeScore.toString()
            }else{
                this.form.homeScore = ''
            }
            if(data.rf != null){
                this.form.rf = data.rf.toString()
            }else{
                this.form.rf = ''
            }
            if(data.status != null){
                this.form.status = data.status.toString()
            }else{
                this.form.status = ''
            }
        },
        //确认修改
        submitInfos(){
            updateBasketBallAdmin(this.form).then(res => {
               if(res.data.error_code == 200){
                 this.$message.success(res.data.message)
                 this.dialogFormVisible = false
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
</style>
