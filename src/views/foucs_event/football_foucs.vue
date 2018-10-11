<template>
    <div class="effectiveagent">
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                type="index"
                label="编号"
               >
            </el-table-column>
            <el-table-column
                prop="GAME_SHORT_NAME"
                align="center"
                label="赛事名称">
            </el-table-column>
            <el-table-column
                prop="matchIds"
                align="center"
                label="赛事场次">
            </el-table-column>
            <el-table-column
                prop="homeTeam"
                align="center"
                label="主队">
            </el-table-column>
            <el-table-column
                prop="guestTeam"
                align="center"
                label="客队">
            </el-table-column>
           <el-table-column
                align="center"
                label="比赛时间">
                 <template slot-scope="scope">
                    {{scope.row.matchTime.time | time}}
                </template>
            </el-table-column>
            <el-table-column
                prop="showNum"
                align="center"
                label="停开售">
                 <template slot-scope="scope">
                    {{scope.row.showNum | sells}}
                </template>
            </el-table-column>
            <el-table-column
                label="截止日期"
                align="center">
                 <template slot-scope="scope">
                    {{scope.row.MatchDealTime.time | time}}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button size="mini"
                               type="primary"
                               @click="handleEdit(scope.row)">取消篮球焦点赛事</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
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
import setimes from '@/utils/time.js'
import api from '@/api/Api'
import { findFootballMixureInfo, updateFbFocusMatchStatus } from '@/api/events'
// import settime from './index.js'
export default {
    data() {
        return {
            tableData: [],
            page:1,
            pageSize:20,
            totalList: 0
        }
    },
    filters: {
        time(a) {
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
            
        },
        sells(arr){
            let temp = []
            arr.forEach((element, index) => {
                if(element){
                    temp.push('开')
                } else {
                    temp.push('停')
                }
            });
            return temp.join(',')
        }
    },
    created() {
        this.getTable()
    },
    methods: {
        // 获取表格数据
        getTable() {
            let obj = {
                isFocus: 1,
                type: 2,
                page: this.page,
                pageSize: this.pageSize
            }
            findFootballMixureInfo(obj)
            .then(res => {
                console.log(res)
                if(res.data.error_code === 200){
                    this.tableData = res.data.data
                    this.totalList = res.data.total
                }else{
                    this.$message.error('失败！')
                }
            })
            
        },
        handleEdit(a) {
            let id = a.matchId;     
            updateFbFocusMatchStatus(id)
                .then(res => {
                    if (res.data.error_code == 200) {
                        this.$message.success(res.data.message)
                    } else {
                        this.$message.error(res.data.message)
                    }
                })
        },
        handleCurrentChange(num) {
            this.page = num;
            this.getTable()
        },
        //改变页面大小
        handleSizeChange(num) {
            this.pageSize = num;
            this.getTable()
        },
    }
}
</script>

<style scoped>
.effectiveagent {
  padding: 10px 25px;
}
div.page {
  padding: 10px 0;
}
div.bens {
  padding: 0 0 20px 0;
}
</style>