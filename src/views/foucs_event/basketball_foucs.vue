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
                label="开赛日期"
                align="center">
                 <template slot-scope="scope">
					{{scope.row.matchTime.time | setTime}}
				</template>
            </el-table-column>
            <el-table-column
                label="截止日期"
                align="center">
                <template slot-scope="scope">
					{{scope.row.matchDealTime.time | setTime}}
				</template>
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
import setimes from '@/utils/time.js'
import api from '@/api/Api'
import { updateBbFocusMatchStatus,getBasketBallMatch } from '@/api/events'
export default {
    data() {
        return {
            tableData: []
        }
    },
    filters: {
        setTime(a) {
            if (a != null) {
                return setTime(a);
            }
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
                type: 2
            }
            getBasketBallMatch(obj)
            .then(res => {
                if(res.data.data.length > 0){
                    this.tableData.push(res.data.data[0])
                }
            })
        },
        handleEdit(a) {
            let id = a.id;     
            updateBbFocusMatchStatus(id)
            .then(res => {
                if(res.data.error_code == 200){
                    this.$message.success(res.data.message)
                }else{
                    this.$message.error(res.data.message)
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