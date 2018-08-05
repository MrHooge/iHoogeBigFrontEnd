<template>
    <div class="ToBeAudited">
        <el-table
            :data="tableData2"
            border
            style="width: 100%">
            <el-table-column
                type="index"
                label="编号" align="center"
                >
            </el-table-column>
            <el-table-column
                prop="account"
                label="用户名" align="center">
            </el-table-column>
            <el-table-column
                prop="content"
                label="推荐内容" align="center">
            </el-table-column>
            <el-table-column
                label="创建时间" align="center">
                <template slot-scope="scope">
                    {{scope.row.createTime | setimes }}
                </template>
            </el-table-column>
            <el-table-column
                label="截止时间" align="center">
                <template slot-scope="scope">
                    {{scope.row.endTime | setimes}}
                </template>
            </el-table-column>
            <el-table-column
                label="审核状态" align="center">
                <template slot-scope="scope">
                    {{scope.row.examineStatus | examineStatus}}
                </template>
            </el-table-column>
            <el-table-column
                prop="fee"
                label="推荐费用" align="center">
            </el-table-column>
            <el-table-column
                label="操作"
                width="200" align="center"
                >
                <template slot-scope="scope">
                    <el-button type="primary" @click="adopt(scope.row.id)">通过</el-button>    
                    <el-button type="danger" @click="reject(scope.row.id)">驳回</el-button>    
                </template>    
            </el-table-column>
        </el-table>
        <div class="page">
            <el-pagination
                background
                @current-change='pagechange'
                layout="prev, pager, next"
                :total="totalnum">
            </el-pagination>
        </div>
    </div>
</template>

<script>
// import setimes from '@/until.js'
import { examineList,examine } from '@/api/grandmaster'
export default {
    data() {
        return {
            tableData2: [], //表格数据
            totalnum: 0
        }
    },
    filters: {
        setimes(a) {
            return setimes(a)
        },
        examineStatus(a) {
            if (a == 0) {
                return '未审核'
            } else if (a == 1) {
                return '审核成功'
            } else {
                return '审核失败'
            }
        }
    },
    created() {
        this.getTbale(1)
    },
    methods: {
        // 获取表格数据
        getTbale(curr) {
            let obj = {
                offset: curr,
                pageSize: 10
            }
            examineList(obj)
                .then(res => {
                    console.log(res)
                    if (res.status == 200) {
                        if (
                            res.data.data.list &&
                            res.data.data.list.length > 0
                        ) {
                            this.tableData2 = res.data.data.list
                            this.totalnum = res.data.data.total
                        }
                    }
                })
        },
        // 分页回调
        pagechange(val) {
            this.getTbale(val)
        },
        // 审核通过
        adopt(a) {
            let model = {
                id: a,
                type: 1
            }
            examine(obj)
                .then(res => {
                    console.log(res)
                    if (res.status == 200) {
                        if (res.data.error_code == 200) {
                            this.$message(res.data.message)
                            this.getTbale(this.curr)
                        } else {
                            this.$message(res.data.message)
                        }
                    }
                })
        },
        // 审核驳回
        reject(id) {
            let obj = {
                id: id,
                type: 2
            }
            examine(obj)
                .then(res => {
                    console.log(res)
                    if (res.status == 200) {
                        if (res.data.error_code == 200) {
                            this.$message(res.data.message)
                            this.getTbale(this.curr)
                        } else {
                            this.$message(res.data.message)
                        }
                    }
                })
        }
    }
}
</script>

<style scoped>
.ToBeAudited{
    padding: 10px 20px
}
.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}
</style>