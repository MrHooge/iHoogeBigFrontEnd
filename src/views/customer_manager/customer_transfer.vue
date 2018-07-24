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
                prop="create_time"
                align="center"
                label="创建时间">
            </el-table-column>
            <el-table-column
                prop="isReal"
                align="center"
                label="是否实名">
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
                    <el-button type="warning" @click="editnums(scope.row.agent_account)">通过</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { findMemberMove } from '@/api/customer'
import { Message, MessageBox } from 'element-ui'
export default {
    data(){
        return {
            account:'',
            datetime:'',
            end:'',
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
         }
        }
    },
    created(){
        this.gettabledata();
    },
    methods:{
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
                startDate:this.start
            }
            findMemberMove(obj).then(res => {
                console.log(123)
                console.log(res.data)
                this.tableData = res.data.data

            }).catch(error => {
                Message.error(error)
            })

        },
        //通过操作
        editnums(){
            let newobj = {
                is_erview:this.is_erview,
                agentName:this.agentName,
                memeberName:this.memeberName,
                moveAgent:this.moveAgent                              
            }
            
        }
    }

}
</script>

<style scoped>
.association{
    padding: 0px 20px
}
</style>
