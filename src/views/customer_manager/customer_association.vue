<template>
    <div class="association">
         <el-input v-model="account" placeholder="请输入用户名" style="width: 300px;margin-right:100px;margin-bottom:40px;margin-top:40px"></el-input>
         <el-date-picker
                     v-model="datetime"
                     type="datetimerange"
                     :picker-options="pickerOptions2"
                     range-separator="至"
                     value-format="yyyy-MM-dd"
                     start-placeholder="开始日期"
                     end-placeholder="结束日期"
                     :default-time="['00:00:00']"
                     align="right"
                     margin-bottom:40px
                     margin-top:40px>
                  </el-date-picker>
                  <el-button type="primary" @click="getone" @keyup.13="getone" style="margin-left:100px;margin-bottom:40px;margin-top:40px">搜索</el-button>
                  <el-table :data="tableData" border style="width: 100%;">
            <el-table-column
                prop="agent_account"
                label="代理昵称"
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
                align="center"
                label="是否实名">
                <template slot-scope="scope">
                    {{scope.row.isReal | type}}
                </template>
            </el-table-column>

            <el-table-column
                prop="member_account"
                align="center"
                label="会员昵称">
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
import { findMemberAssociation,MemberAudit } from '@/api/customer'
import { Message, MessageBox } from 'element-ui'
export default {
    data(){
        return {
            account:'',
            datetime:'',
            end:'',
            page:1,
            pageSize:20,
            is_erview:'',
            start:'',
            tableData:[],
            agentName:'',
            memeberName:'',
            moveAgent:'',
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
         },
        
        }
    },
     filters:{
             type(a){
                 return a == 1?"未实名":"已实名"
             },
        //        time(a){
        //     let date = new Date(a);
        //     let y = date.getFullYear();
        //     let MM = date.getMonth() + 1;
        //     MM = MM < 10 ? ('0' + MM) : MM;
        //     let d = date.getDate();
        //     d = d < 10 ? ('0' + d) : d;
        //     let h = date.getHours();
        //     h = h < 10 ? ('0' + h) : h;
        //     let m = date.getMinutes();
        //     m = m < 10 ? ('0' + m) : m;
        //     let s = date.getSeconds();
        //     s = s < 10 ? ('0' + s) : s;
        //     return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;

        // }
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
        //搜索回调
        getone(){
            if(!this.account){
                this.$message('请输入账户名')
            }else{
               this.end = this.datetime[1];
               this.start = this.datetime[0];
               this.gettabledata();
            }
        },
        //获取表单数据
        gettabledata(){
            let obj = {
                agentName:this.account,
                endDate:this.end,
                startDate:this.start,
                page:this.page,
                pageSize:this.pageSize
            }
            findMemberAssociation(obj).then(res => {
                this.tableData = res.data.data.list

            }).catch(error => {
                Message.error(error)
            })

        },
        //通过操作
        editnums(data){
            //console.log(data.agent_account);
            this.agentName = data.agent_account;
            let newobj = {
                agentName:this.agentName,
                memeberName:data.member_account,
                is_erview:1
            }
            MemberAudit(newobj).then(res => {
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
