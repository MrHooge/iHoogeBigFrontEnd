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
                prop="matchName"
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

            <el-table-column
                align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="primary"
                    @click="handleEdit(scope.row)">取消篮球焦点赛事</el-button>
                </template>
            </el-table-column>
        </el-table>
   </div>
</template>

<script>
import api from '@/api/Api'
import { getBasketBallMatch } from '@/api/events'
// import settime from './index.js'
export default {
    data() {
        return {
            tableData: []
        }
    },
    filters: {
        // times(a) {
        //     return settime(a)
        // }
    },
    created() {
        this.getTable()
    },
    methods: {
        // 获取表格数据
        getTable() {
            let obj = {
                isFocus: 1,
                type: 2
            }
            getBasketBallMatch(obj)
            .then( res => {
                 this.tableData.push(res.data.data[0])
            })
            
        },
        handleEdit(a) {
            let obj = {
                id: a.id
            }
            this.$ajax
                .get(api.lottery + '/lottery/updateBbFocusMatchStatus', obj)
                .then(res => {
                    if (res.error_code == 200) {
                        this.$message(res.message)
                        this.getTable()
                    } else {
                        this.$message(res.message)
                    }
                })
        }
    }
}
</script>

<style scoped>
.effectiveagent{
    padding: 10px 25px
}
div.page {
    padding: 10px 0;
}
div.bens {
    padding: 0 0 20px 0;
}
</style>