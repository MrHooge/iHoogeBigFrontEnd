<template>
    <div class="backend app-container">
        <div class="layerbody">
            <div class="main">
                <el-table :data="tableData"
                          border
                          tooltip-effect="dark"
                          style="width: 100%">
                    <el-table-column label="昵称"
                                     align="center">
                                     <template slot-scope="scope">
                                         <span v-if="scope.row.userName != null">{{scope.row.userName}}</span>
                                         <span v-else>{{scope.row.account}}</span>
                                     </template>
                    </el-table-column>
                    
                    <el-table-column label="提现云朵数"
                                     prop="clouds"
                                     align="center">
                    </el-table-column>
                    <el-table-column label="提现金额"
                                     prop="money"
                                     align="center">
                    </el-table-column>
                    
                    <el-table-column label="操作"
                                     prop="status"
                                     align="center">
                        <template slot-scope="scope">
                            <el-button type="success" @click="cofirm(scope.row,1)">确认</el-button>
                            <el-button type="danger" @click="cofirm(scope.row,2)">驳回</el-button>
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
        <el-dialog title="确认提现"
		           :visible.sync="dialogVisible1"
		           width="40%"
                   >
			<span slot="footer"
			      class="dialog-footer">
                  <el-button @click="dialogVisible1 = false" type="primary">取消</el-button>
				<el-button @click="sure()" type="success">确定</el-button>
			</span>
		</el-dialog>

        <el-dialog title="确认驳回"
		           :visible.sync="dialogVisible2"
		           width="40%"
                   >
			<span slot="footer"
			      class="dialog-footer">
                  <el-button @click="dialogVisible2 = false" type="primary">取消</el-button>
				<el-button @click="bohui()" type="success">确定</el-button>
			</span>
		</el-dialog>
    </div>
</template>

<script>
import { withdrawCashList,withdrawCashConfirm,withdrawCashReject } from '@/api/personal_review.js'
import { findAllMember } from '@/api/customer'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
    data() {
        return {
            page: 1,
            pageSize: 20,
            
            totalList: 0, //总页数
            tableData: [], //表格数据
            

            account: '',    //存储要提现的account
            dialogVisible1: false,
            dialogVisible2: false

        }
    },
    created() {
        this.getData()
    },
    filters: {
        type(val){
            return val === 1 ? '推荐':'问答'
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

        //获取列表数据
        getData() {
            let obj = {
                offset: this.page,
                pageSize: this.pageSize,
            }
            withdrawCashList(obj).then(res => {
                console.log(res)
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
            this.account = val.account
            if(num === 1){
                this.dialogVisible1 = true
                
            }else{
                this.dialogVisible2 = true
            }
        },
        //提现确认
        sure(){
            let obj = {
                account: this.account,
            }
            withdrawCashConfirm(obj).then(res=>{
                console.log(res)
                if(res.data.error_code === 200){
                    this.$message.success(res.data.message)
                    this.dialogVisible1 = false
                    this.getData()
                }else{
                    this.$message.error(res.data.message)
                    this.dialogVisible1 = false
                }
            })
        },
        bohui(){
            let obj = {
                account: this.account,
            }
            withdrawCashReject(obj).then(res=>{
                console.log(res)
                if(res.data.error_code === 200){
                    this.$message.success(res.data.message)
                    this.dialogVisible2 = false
                    this.getData()
                }else{
                    this.$message.error(res.data.message)
                    this.dialogVisible2 = false
                }
            })
        },
        //改变页面大小
        handleSizeChange(num) {
            this.pageSize = num;
            this.gettabledata()
        },
        //翻页
        handleCurrentChange(num) {
            this.page = num;
            this.gettabledata()
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
