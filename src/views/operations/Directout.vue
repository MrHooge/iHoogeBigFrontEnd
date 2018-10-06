<template>
    <div class="directout app-container">
        <div class="btns">
            <el-button type="primary"
                       @click="setmember">设置出票会员</el-button>
        </div>
        <el-table :data="tableData"
                  border
                  style="width: 100%">
            <el-table-column label="用户名"
                             align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.account }}</span>
                </template>
            </el-table-column>
            <el-table-column label="昵称"
                             align="center">
                <template slot-scope="scope">
                    <span>{{ scope.row.username }}</span>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="page">
            <el-pagination background
                           @current-change="currpage"
                           :page-size="pages"
                           layout="prev, pager, next"
                           :total="total"
                           v-if="total != ''">
            </el-pagination>
        </div>
        <el-dialog title="设置会员出票"
                   :visible.sync="dialogVisible"
                   width="600px">
            <div class="main">
                <div class="boxner">
                    <label class="labname">用户名：</label>
                    <el-input v-model="username"
                              placeholder="请输入用户名"
                              style="width:220px;" clearable></el-input>
                </div>
                <div class="boxner">
                    <label class="labname">是否直接出票：</label>
                    <el-radio v-model="radio7"
                              label="0"
                              border>否</el-radio>
                    <el-radio v-model="radio7"
                              label="1"
                              border>是</el-radio>
                </div>
            </div>
            <span slot="footer"
                  class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary"
                           @click="sure">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getMemberTicket, setMemberTicket } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
    data() {
        return {
            tableData: [],
            total: 0,
            pages: 20,
            dialogVisible: false,
            username: '',
            planNo: '',
            radio7: '0'
        }
    },
    created() {
        this.getTables(1)
    },
    methods: {
        getTables(curr) {   //  获取直接出票会员列表
            let obj = {
                page: curr,
                pageSize: 20,
            }
            getMemberTicket(obj).then(res => {
                console.log(res)
                if (res.data.error_code == 200) {
                    this.tableData = res.data.data.list
                    this.total = res.data.data.total
                }
            })
        },
        // 分页的回调
        currpage(val) {
            this.getTables(val)
        },
        setmember() {
            this.username = ''
            this.radio7 = "0"
            this.dialogVisible = true
        },
        sure() {
            let model = {
                account: this.username,
                status: String(this.radio7)
            }
            setMemberTicket(model).then(res => {
                console.log(res)
                if (res.status == 200) {
                    Message.success(res.data.message)
                    this.getTables(1)
                } else {
                    this.$message(res.data.message)
                }
                this.dialogVisible = false
            })
        }
    }
}
</script>

<style scoped>
div.btns {
  padding: 10px;
}
.boxner {
  padding: 10px;
}
label.labname {
  width: 103px;
  display: inline-block;
  text-align: right;
}
</style>