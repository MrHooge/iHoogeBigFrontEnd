<template>
    <div class="association">
        <el-input v-model="account" placeholder="请输入用户名" style="width:15%;margin-right:50px;margin-bottom:40px;margin-top:40px" clearable></el-input>
        <el-input v-model="username" placeholder="请输入昵称查询" style="width:15%;margin-right:50px;" clearable></el-input>
        开始时间：
        <el-date-picker
            v-model="start"
            type="datetime"
            style="margin-bottom:40px;margin-right:20px;width:200px"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd HH:mm:ss">
        </el-date-picker>
        结束时间：
        <el-date-picker
            v-model="end"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="23:59:59"
            type="datetime"
            style="margin-left:10px;
            width:200px
            margin-bottom:40px;"
            placeholder="请选择结束日期">
        </el-date-picker>
        <el-button type="primary" @click="search" @keyup.13="search" style="margin-left:100px;margin-bottom:40px;margin-top:40px">搜索</el-button>
        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column
                prop="agent_account"
                label="代理账号"
                align="center"
                width="180">
            </el-table-column>

            <el-table-column
                align="center"
                label="创建时间">
                <template slot-scope="scope">
                    {{scope.row.create_time}}
                </template>
            </el-table-column>
            <el-table-column
                prop="isReal"
                align="center"
                label="是否实名">
            </el-table-column>
            <el-table-column
                prop="member_account"
                align="center"
                label="会员账号">
            </el-table-column>
            <el-table-column
                prop="move_agentName"
                align="center"
                label="移动代理账号">
            </el-table-column>
            <el-table-column
                prop="note"
                align="center"
                label="备注">
            </el-table-column>
            <el-table-column
                align="center"
                label="操作">
                <template slot-scope="scope">
                    <el-button type="warning" @click="editnums(scope.row,'modify')">通过</el-button>
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
            v-if="totalList != ''"
        >
        </el-pagination>
    </div>
</template>

<script>
import { findMemberMove,MemberMoveAudit,findAllMember } from '@/api/customer'
import { Message, MessageBox } from 'element-ui'
export default {
    data(){
        return {
            account:'',
            username: '',   //昵称查询
            // start_time: '',
            // end_time: '',
            end:'',
            is_erview:'',
            start:'',
            tableData:[],
            agentName:'',
            memeberName:'',
            page:1,
            pageSize:10,
            moveAgent:'',
            totalList: 0,
            pickerOptions2: {
            shortcuts: [
               {
                  text: '最近一周',
                  onClick(picker) {
                     const end = new Date()
                     const start = new Date()
                     start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                     picker.$emit('pick', [start, end])
                  }
               },
               {
                  text: '最近一个月',
                  onClick(picker) {
                     const end = new Date()
                     const start = new Date()
                     start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                     picker.$emit('pick', [start, end])
                  }
               }
            ]
         }
        }
    },
    filters:{
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
        },
    },
    created(){
        this.gettabledata();
    },
    methods:{
        //翻页
        handleCurrentChange(num){
            this.page = num;
            this.gettabledata()
        },
        //改变页面大小
        handleSizeChange(num){
            this.pageSize = num;
            this.gettabledata()
        },
        //查询
        search() {
            if (!this.account && !this.username) {
                this.page = 1
                this.gettabledata()
            } else {
                if(this.account === ''){
                    this.getAccount()
                }else{
                    this.page = 1
                    this.gettabledata()
                }
            }
        },
        //用昵称查询账号
        getAccount(){
            let obj = {
                username: this.username
            }
            findAllMember(obj).then(res => {
                this.account = res.data.data.list[0].ACCOUNT
                this.page = 1
                this.gettabledata()
            })
        },
        //获取表单数据
        gettabledata(){
            let obj = {
                agentName:this.account,
                endDate:this.end || '',
                startDate:this.start || '',
                page:this.page,
                pageSize:this.pageSize
            }
            findMemberMove(obj).then(res => {
                if(res.data.error_code === 200){
                    this.tableData = res.data.data.list
                    this.totalList = res.data.data.total
                }else{
                    this.$message.error(res.data.message)
                }
            }).catch(error => {
                Message.error(error)
            })

        },
        //通过操作
        editnums(data){
            this.agentName = data.agent_account;
            this.moveAgent = data.move_agentName;
            this.memeberName = data.member_account
            let newobj = {
                agentName:this.agentName,
                memeberName:this.memeberName,
                is_erview:1,
                moveAgent:this.moveAgent
            }
            MemberMoveAudit(newobj).then(res => {
                if (res.data.error_code === 200) {
                    Message.success('已通过')
                } else {
                    Message.error(res.data.message)
                }

            })
        }
    }

}
</script>

<style scoped>
.association{
    padding: 0px 20px
}
</style>
