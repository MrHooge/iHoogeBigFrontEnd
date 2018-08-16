<template>
    <div class="effectiveagent">
        <el-table :data="tableData"
                  border
                  style="width: 100%">
            <el-table-column type="index"
                             label="编号">
            </el-table-column>
            <el-table-column prop="GAME_SHORT_NAME"
                             align="center"
                             label="赛事名称">
            </el-table-column>
            <el-table-column prop="concede"
                             align="center"
                             label="让球">
            </el-table-column>
            <!-- <el-table-column prop="drawAward"
                             align="center"
                             label="平sp">
            </el-table-column> -->
            <el-table-column prop="guestTeam"
                             align="center"
                             label="客队">
            </el-table-column>
            <!-- <el-table-column prop="guestWinAward"
                             align="center"
                             label="客胜ps">
            </el-table-column> -->
            <el-table-column prop="homeTeam"
                             align="center"
                             label="主队">
            </el-table-column>
            <!-- <el-table-column prop="homeWinAward"
                             align="center"
                             label="主胜sp">
            </el-table-column> -->
            <el-table-column prop="matchId"
                             align="center"
                             label="id">
            </el-table-column>
            <el-table-column prop="matchIds"
                             align="center"
                             label="场次号">
            </el-table-column>
            <el-table-column align="center"
                             label="比赛时间">
                <template slot-scope="scope">
                    {{scope.row.matchTime.time | setimes}}
                </template>
            </el-table-column>
            <!-- <el-table-column prop="rq_drawAward"
                             align="center"
                             label="让球平sp">
            </el-table-column>
            <el-table-column prop="rq_guestWinAward"
                             align="center"
                             label="让球客胜sp">
            </el-table-column>
            <el-table-column prop="rq_homeWinAward"
                             align="center"
                             label="让球主胜sp">
            </el-table-column> -->
            <el-table-column label="截止日期"
                             align="center">
                <template slot-scope="scope">
                    {{scope.row.MatchDealTime.time | setimes}}
                </template>
            </el-table-column>

            <el-table-column align="center"
                             label="操作">
                <template slot-scope="scope">
                    <el-button size="mini"
                               type="primary"
                               @click="handleEdit(scope.row)">取消篮球焦点赛事</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :page-count="totalPages"
                       :current-page="page"
                       :page-sizes="[10, 20, 30, 40, 50]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="totalList">
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
            page: 1,
            pageSize: 10
        }
    },
    filters: {
        setimes(a) {
            return setimes(a)
        },
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
                    console.log(res.data.data.list)
                    this.tableData = res.data.data.list
                })

        },
        handleEdit(a) {
            let id = a.id;
            updateFbFocusMatchStatus(id)
                .then(res => {
                    if (res.data.error_code == 200) {
                        this.$message(res.data.message)
                    } else {
                        this.$message(res.data.message)
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