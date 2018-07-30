<template>
   <div class="effectiveagent">
      <!-- 1 2代理及底下会员黑名单 3代理白名单 4代理及底下会员白名单 -->
      <div class="bens">
         <el-button type="primary" @click="setingGames">设置篮球焦点赛事</el-button>
         <el-button type="danger" @click="editTime">修改赛事时间</el-button>
         <el-button type="warning" @click="openclose()">开关投注</el-button>
      </div>
      <!-- 时间弹窗 -->
        <el-dialog
            title="修改时间"
            :visible.sync="dialogVisible"
            width="500px"
            >
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">
                    分钟数
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                    <el-input v-model="val" placeholder="分钟" type="number" min="0"></el-input>
                </div></el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sure">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 开关投注弹窗 -->
        <el-dialog
            title="投注开关设置"
            :visible.sync="dialogTou"
            width="500px"
            >
            <el-row>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                        状态
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <el-switch
                            v-model="isopenSwitch"
                            active-text="开售"
                            inactive-text="停售">
                        </el-switch>
                        <span style="color:#f00;">
                            (注:默认为开)
                        </span>
                    </div>
                </el-col>
            </el-row>
            <br/>
            <el-row>
                <el-col :span="4">
                    <div class="grid-content bg-purple">
                    时间
                    </div>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">
                        <el-date-picker
                            v-model="time"
                            type="datetime"
                            value-format='yyyy-MM-dd HH:mm:ss'
                            placeholder="请选择日期时间">
                        </el-date-picker>
                    </div>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogTou = false">取 消</el-button>
                <el-button type="primary" @click="btnsure">确 定</el-button>
            </span>
        </el-dialog>
          <el-table
            :data="tableData"
            border
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
               type="selection"
               width="55">
            </el-table-column>
            <el-table-column
                prop="GAME_SHORT_NAME"
                align="center"
                label="赛事名称">
            </el-table-column>
            <el-table-column
                prop="matchId"
                align="center"
                label="场次号">
            </el-table-column>
            <el-table-column
            prop="guestTeam"
            label="客队名称"
            align="center"
            >
            </el-table-column>
            <el-table-column
            prop="homeTeam"
            align="center"
            label="主队名称"
            >
            </el-table-column>
            <el-table-column
                prop="matchTime"
                label="开赛日期"
                align="center">
                
            </el-table-column>
            <el-table-column
                prop="matchDealTime"
                label="截止日期"
                align="center">
                
            </el-table-column>

            <!-- <el-table-column
                align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.row)">编辑</el-button>
                </template>
            </el-table-column> -->
         </el-table>
         <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-count="totalPages"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalList"
            >
            </el-pagination>
   </div>
</template>

<script>
import { findFootballMixureInfo,setFbFocusMatch,updateMatchDealTime,updateDGByStatus } from '@/api/events'
export default {
    data() {
        return {
            tableData: [],
            selections: [],
            dialogVisible: false,
            dialogTou: false,
            val: '', // 分钟数
            isopenSwitch:true,
            time:'',
            page:1,
            pageSize:10,
        }
    },
    filters: {
    },
    created() {
        this.getTable()
    },
    methods: {
        // 获取表格数据
        getTable() {
            let obj = {
                isFocus: 0,
                type: 2,
                page:this.page,
                pageSize:this.pageSize
            }
            findFootballMixureInfo(obj)
            .then(res => {
                this.tableData = res.data.data.list

            })
        },
        // 点击进行弹窗
        openclose() {
            this.dialogTou = true
        },
        // 弹窗的确定回调
        btnsure(){
            if(!this.time){
                this.$message('时间不能为空!')
            }else{
                let status; //定义变量存状态值
                if(this.isopenSwitch){
                    status = 1
                }else{
                    status = 0
                }
                let obj = {
                    status:status,
                    time:this.time
                }
                console.log(obj)
                updateDGByStatus(obj)
                .then(res => {
                    console.log(res.data)
                    if(res.data.error_code == 200){
                        this.$message(res.data.message)
                        this.dialogTou = false
                    }else{
                        this.$message(res.data.message)
                    }
                })
                // this.$ajax.get(api.lottery+'/lottery/updateDGByStatus',obj).then(res => {
                //     // console.log(res)
                //     if(res.error_code==200){
                //         this.$message(res.message)
                //         this.dialogTou = false
                //     }else{
                //         this.$message(res.message)
                //     }
                // })

            }
            
        },
        // 编辑赛事时间
        editTime() {
            this.dialogVisible = true
            this.$ajax
                .get(api.lottery + '/lottery/getMatchDealTime')
                .then(res => {
                    if (res.error_code == 200) {
                        this.val = res.data
                    }
                })
        },
        sure() {
            let obj = {
                dealTime: this.val
            }
            this.$ajax
                .get(api.lottery + '/lottery/updateMatchDealTime', obj)
                .then(res => {
                    if (res.error_code == 200) {
                        this.dialogVisible = false
                        this.$message(res.message)
                    }
                })
        },
        setingGames() {
            if (this.selections.length == 0) {
                this.$message('请至少选择一条数据')
            } else {
                let arr = []
                this.selections.forEach(e => {
                    arr.push(e.id)
                })
                let ids = arr.join(',')
                setFbFocusMatch(ids)
                .then(res => {
                    console.log(res)
                    if(res.data.error_code == 200){
                        this.$message(res.data.message)
                    }else{
                        this.$message(res.data.message)
                    }
                })
                }
                
               
        },
        // 选择框全部
        handleSelectionChange(selection) {
            this.selections = selection
        },
        //分页
        handleCurrentChange(num){
            this.page = num;
            this.getTable()
        },
        //改变页面大小
        handleSizeChange(num){
            this.pageSize = num;
            this.getTable()
        },
    }
}
</script>

<style scoped>
.effectiveagent{
    padding: 10px 20px
}
div.page {
    padding: 10px 0;
}
div.bens {
    padding: 0 0 20px 0;
}
</style>