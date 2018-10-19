<template>
    <div class="backend app-container">
        <div class="layerbody">
            <div class="search">
                <el-select v-model="type"
                           placeholder="请选择举报类型"
                           style="width:140px;margin-right: 50px;"
                           @change="report">
                    <el-option v-for="item in options1"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                </el-select>
                <el-select v-model="states"
                           placeholder="请选择审核状态"
                           style="width:140px;margin-right: 50px;"
                           @change="examine">
                    <el-option v-for="item in options2"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                </el-select>
                开始时间：
                <el-date-picker v-model="startDate"
                                type="datetime"
                                style="margin-bottom:40px;margin-right:20px;width:200px"
                                placeholder="请选择开始日期"
                                value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                结束时间：
                <el-date-picker v-model="endDate"
                                align="right"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                default-time="23:59:59"
                                type="datetime"
                                style="margin-left:10px;
                    width:200px
                    margin-bottom:40px;"
                                placeholder="请选择结束日期">
                </el-date-picker>
                <el-button type="primary"
                           icon="el-icon-search"
                           @click="search">搜索</el-button>

            </div>
            <div class="main">
                <el-table :data="tableData"
                          border
                          tooltip-effect="dark"
                          style="width: 100%">
                    <el-table-column label="id"
                                     prop="id"
                                     align="center">
                    </el-table-column>
                    <el-table-column label="用户名"
                                     prop="account"
                                     align="center">
                    </el-table-column>
                    <el-table-column label="举报成功的钱是否退回"
                                     align="center">
                                     <template slot-scope="scope">
                                         {{scope.row.isArrival | isArrival}}
                                     </template>
                    </el-table-column>
                    <el-table-column label="到账时间"
                                     align="center">
                        <template slot-scope="scope">
                            {{scope.row.arrivalTime | time}}
                        </template>
                    </el-table-column>
                    <el-table-column label="举报时间"
                                     align="center">
                        <template slot-scope="scope">
                            {{scope.row.time | time}}
                        </template>
                    </el-table-column>
                    <el-table-column label="举报内容"
                                     prop="reportType"
                                     align="center">
                    </el-table-column>
                    <el-table-column label="审核状态"
                                     align="center"
                                     filter-placement="bottom-end">
                        <template slot-scope="scope">
                            <el-tag disable-transitions>{{scope.row.states | changeType}}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"
                                     prop="status"
                                     align="center">
                        <template slot-scope="scope">
                            <div v-if="scope.row.states === 0">
                                <el-button type="success" @click="cofirm(scope.row,1)">通过</el-button>
                                <el-button type="danger" @click="cofirm(scope.row,2)">不通过</el-button>
                            </div>
                            <div v-else>
                                <el-button type="primary">已审核</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="page"
             style="padding:30px 0">
            <el-pagination background
                           @size-change="handleSizeChange"
                           @current-change="handleCurrentChange"
                           :current-page="page"
                           :page-sizes="[10, 20, 30, 40, 50]"
                           :page-size="pageSize"
                           layout="total, sizes, prev, pager, next, jumper"
                           :total="totalList"
                           v-if="totalList != ''">
            </el-pagination>
        </div>
        <!-- 弹窗事件 -->
        <el-dialog title="确认举报"
		           :visible.sync="dialogVisible"
		           width="40%"
                   >
			<span slot="footer"
			      class="dialog-footer">
                    <el-button @click="dialogVisible = false" type="primary">取消</el-button>
				    <el-button @click="Reject(1)" type="success" v-show="tg">确定</el-button>
                    <el-button @click="Reject(2)" type="success" v-show="btg">确定</el-button>
			</span>
		</el-dialog>
    </div>
</template>

<script>
import { getReportList,shReport } from '@/api/personal_review.js'
import { findAllMember } from '@/api/customer'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
    data() {
        return {
            // options2show: true,
            // options3show: false,
            account: '',   //用户名
            username: '', //昵称
            type: '1',      //举报类型
            states: '0',    //审核状态
            startDate: '',
            endDate: '',
            page: 1,
            pageSize: 20,

            totalList: 0, //总页数
            tableData: [], //表格数据
            options1: [
                {
                    value: '1',
                    label: '问答举报',

                },
                {
                    value: '2',
                    label: '评论举报'
                },
                {
                    value: '3',
                    label: '回复举报'
                },
            ],
            options2: [
                 
                {
                    value: '0',
                    label: '未审核',
                },
                {
                    value: '1',
                    label: '审核成功',
                },
                {
                    value: '2',
                    label: '审核失败',
                },
            ],

            id: '',    //存储要驳回的方案id
            dialogVisible: false,

            tg: false,
            btg: false,
        }
    },
    created() {
        this.getData()
    },
    filters: {
        isArrival(val){
            return val === 1 ? '已退回':'未退回'
        },
        changeType(val) {
            if (val === 0 || val === '未审核') {
                return '未审核'
            }
            else if (val === 1 || val === '审核通过') {
                return '审核通过'
            }
            else if (val === 2 || val === '审核失败') {
                return '审核失败'
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
    methods: {
        
        //查询
        search() {
            this.getData()
        },
        //举报类型
        report(val) {
            this.type = val
            this.getData()
        },
        //审核选择
        examine(val) {
            this.states = val
            this.getData()
        },
        //获取数据列表
        getData() {
            let obj = {
                // account: this.account,
                states: this.states,
                type: this.type,
                // startDate: this.startDate,
                // endDate: this.endDate,
                offset: this.page,
                pageSize: this.pageSize,
                // otherId: ""
            }
            getReportList(obj).then(res => {
                if(res.data.error_code === 200){
                    this.tableData = res.data.data.list
                    this.totalList = res.data.data.total
                }else{
                    this.$message.error(res.data.message)
                }
            })
        },
        //提示框
        cofirm(val,num){
            this.id = val.id
            this.dialogVisible = true
            if(num === 1){
                this.tg = true
                this.btg = false
            }else{
                this.tg = false
                this.btg = true
            }
        },
        //审核
        Reject(a){
            let obj = {
                id: this.id,
                type: a
            }
            shReport(obj).then(res=>{
                if(res.data.error_code === 200){
                    this.$message.success(res.data.message)
                    this.dialogVisible = false
                    this.getData()
                }else{
                    this.$message.error(res.data.message)
                    this.dialogVisible = false
                }
            })
        },
        //改变页面大小
        handleSizeChange(num) {
            this.pageSize = num;
            this.getData()
        },
        //翻页
        handleCurrentChange(num) {
            this.page = num;
            this.getData()
        },

    }
}
</script>

<style scoped>
.main {
  padding-top: 30px;
}
.backend >>> .el-dialog__header {
  text-align: center;
}
.backend >>> .el-dialog__footer {
  text-align: center;
}
.backend >>> .el-button--default {
  background: #e25550;
  color: #fff;
}
.backend >>> .el-tag {
  background: #31b0d5;
  color: #fff;
}
</style>
