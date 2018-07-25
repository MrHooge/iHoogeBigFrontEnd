<template>
    <div class="manager">
        <div class="search">
            账号：<el-input v-model="account" placeholder="请输入账号" style="width: 150px;margin-right:70px;margin-bottom:20px;margin-top:40px"></el-input>
            姓名：<el-input v-model="name" placeholder="请输入姓名" style="width: 150px;margin-right:70px;margin-bottom:20px;margin-top:40px"></el-input>
            身份证：<el-input v-model="idcard" placeholder="请输入身份证号" style="width: 150px;margin-right:70px;margin-bottom:20px;margin-top:40px"></el-input>
            邮箱：<el-input v-model="email" placeholder="请输入邮箱" style="width: 150px;margin-right:70px;margin-bottom:20px;margin-top:20px"></el-input>
            电话：<el-input v-model="telphone" placeholder="请输入电话" style="width: 150px;margin-right:70px;margin-bottom:20px;margin-top:20px"></el-input>
            合作商：<el-input v-model="partner" placeholder="" style="width: 150px;margin-right:70px;margin-bottom:20px;margin-top:20px"></el-input><br />
            开始时间：<el-date-picker
            v-model="stime"
            type="date"
            style="margin-bottom:40px;margin-right:20px;width:200px"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd">
            </el-date-picker>
            
            结束时间：<el-date-picker
            v-model="etime"
            align="right"
            value-format="yyyy-MM-dd"
            type="date"
            style="margin-left:10px;
            width:200px
            margin-bottom:40px;"
            placeholder="请选择结束日期"
            >
            </el-date-picker>
            <el-button type="primary" @click="inquire" @keyup.13="getone" style="margin-left:100px;margin-bottom:40px;margin-top:40px">查询</el-button>

        </div>
        <div class="show_data">
            <el-table
               :data="tableData"
               border
               style="width: 100%;">
               <el-table-column
               type="index"
               align="center"
               label="编号">
               </el-table-column>
               <el-table-column
                     label="id"
                     prop="id"
                     align="center">
               </el-table-column>  
               <el-table-column
                     label="账号"
                     prop="account"
                     align="center">
                     
               </el-table-column>
               <el-table-column
                     label="名片"
                     prop="card"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="证件号"
                     prop="certNo"
                     align="center"> 
               </el-table-column>
               <el-table-column
                     label="证件类型"
                     align="center">
                     <template slot-scope="scope">
                    {{scope.row.certType | type}}
                </template>
               </el-table-column>
               <el-table-column
                     label="邮箱"
                     prop="email"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="是否充值"
                     prop="isCharge"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="是否白名单"
                     align="center">
                     <template slot-scope="scope">
                         {{scope.row.isWhitelist | white}}
                         </template>
               </el-table-column>
               <el-table-column
                     label="最后登陆时间"
                     prop="lastLoginDateTime"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="手机"
                     prop="mobile"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="真实姓名"
                     prop="name"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="头像·"
                     prop="picture"
                     align="center">
                     <template slot-scope="scope">
                         <img :src="scope.row.picture" >
                     </template>
               </el-table-column>
               <el-table-column
                     label="注册时间"
                     prop="registerDateTime"
                     align="center">
               </el-table-column>    
               <el-table-column
                     label="状态"
                     align="center">
                     <template slot-scope="scope">
                         {{scope.row.status |use }}
                         </template>
               </el-table-column>          
               <el-table-column
                     label="类型"
                     align="center">
                     <template slot-scope="scope">
                         {{scope.row.type |status }}
                         </template>
               </el-table-column>  
               <el-table-column
                     label="昵称"
                     prop="username"
                     align="center">
               </el-table-column> 
            </el-table>
            <div class="page">
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
        </div>
    </div>
</template>

<script>
import { findAllMember,memberToWrite } from '@/api/customer'
import { Message, MessageBox } from 'element-ui'
export default {
    data(){
        return {
            tableData:[],
            account:'',
            name:'',
            idcard:'',
            email:'',
            telphone:'',
            partner:'',
            page:1,
            pageSize:10
        }
    },
    filters:{
        type(cert){
            return cert == 1?"身份证":""
        },
        white(whitest){
            return whitest ==1?"否":"是"
        },
        use(a){
            return a == 0 ? "可用"  : ""
        },
        status(studio){
            if(studio==0){
                return "普通会员"
            }else if(studio==1){
                return "彩妍人员"
            }else{
                return "机器人"
            }
        }
    },
    created(){
        this.gettablelist()

    },
    methods:{
        inquire(){
            if(this.account ||this.name ||this.idcard ||this.telphone){
                this.gettablelist()
            }else {
                this.$message('请输入相关信息')
            }
        },
        //获取表格数据
        gettablelist(){
            let obj={
                account:this.account,
                endTime:'',
                mobile:this.telphone,
                page:this.page,
                pageSize:this.pageSize,
                startTime:'',
                username:''
            }
            findAllMember(obj).then(res => {
                this.tableData = res.data.data.list
            }).catch(error => {
                Message.error(error)
            })
        },
        //翻页
        handleCurrentChange(num){
            this.page = num;
            this.gettablelist()
        },
        //改变页面大小
        handleSizeChange(num){
            this.pageSize = num;
            this.gettablelist()
        }
    }
}
</script>

<style scoped>
.manager{
    padding: 10px 20px
}
.page{
    margin-top: 30px
}
</style>
