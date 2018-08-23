<template>
    <div class="statistics">
         <el-input placeholder="请输入用户名" v-model="account" style="width: 300px;margin-right:100px;margin-bottom:30px"></el-input>
         <el-button type="primary" @click="search_customer" @keyup.13="getone" style="margin-left:100px;margin-bottom:30px">搜索</el-button>
         <el-button type="primary" @click="longtime" @keyup.13="getone" style="margin-left:100px;margin-bottom:30px">一个月以上未登录用户</el-button>
          <el-button type="primary" @click="moredeletewhite">批量取消加白</el-button>
        <el-table
               :data="tableData"
               border
               style="width: 100%;"
               @selection-change="handleSelectionChange">
               <el-table-column
               type="selection"
               width="55">
            </el-table-column>
               <el-table-column
               type="index"
               align="center"
               label="编号">
               </el-table-column>
               <!-- <el-table-column
                     label="id"
                     prop="id"
                     align="center">
               </el-table-column>   -->
               <el-table-column
                     label="账号"
                     prop="account"
                     align="center">
                     
               </el-table-column>
                <el-table-column
                     label="昵称"
                     prop="username"
                     align="center">
               </el-table-column>
                <el-table-column
                     label="真实姓名"
                     prop="name"
                     align="center">
               </el-table-column>
               <!-- <el-table-column
                     label="名片"
                     prop="card"
                     align="center">
               </el-table-column> -->
               <el-table-column
                     label="证件号"
                     prop="certNo"
                     align="center"> 
               </el-table-column>
                   <el-table-column
                     label="手机"
                     prop="mobile"
                     align="center">
               </el-table-column>
                <el-table-column
                     label="注册时间"
                     align="center">
                       <template slot-scope="scope">
                    {{scope.row.registerDateTime | time}}
                     </template>
               </el-table-column>  
                 <el-table-column
                     label="最后登陆时间"
                     align="center">
                      <template slot-scope="scope">
                    {{scope.row.lastLoginDateTime | time}}
                     </template>
               </el-table-column>  
                  <el-table-column
                     label="是否充值"
                     align="center">
                      <template slot-scope="scope">
                            {{scope.row.isCharge | port}}
                     </template>
               </el-table-column>
               <!-- <el-table-column
                     label="证件类型"
                     prop="certType"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="邮箱"
                     prop="email"
                     align="center">
               </el-table-column> -->
               <el-table-column
                     label="是否白名单"
                     align="center">
                     <template slot-scope="scope">
                            {{scope.row.isWhitelist | mtype}}
                     </template>
               </el-table-column>
               <!-- <el-table-column
                     label="头像·"
                     prop="picture"
                     align="center">
                     <template slot-scope="scope">
                         <img :src="scope.row.picture" >
                     </template>
               </el-table-column> -->
               <!-- <el-table-column
                     label="状态"
                     prop="status"
                     align="center">
               </el-table-column>          
               <el-table-column
                     label="类型"
                     prop="type"
                     align="center">
               </el-table-column>   -->
               <el-table-column
                     label="操作"
                     align="center">
                     <template slot-scope="scope">
                           <el-button type="success" @click="addwhite(scope.row,'modify')" style="width:70px;height:30px;line-height:10px;margin-bottom:5px">加白</el-button><br />
                           <el-button type="primary" @click="deletewhite(scope.row,'modify')" style="width:70px;height:30px;line-height:10px;padding-left:10px">取消加白</el-button>
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
import { findAllMember,memberToWrite,getHistoryClient } from '@/api/customer'
import { Message, MessageBox } from 'element-ui'
export default {
    data(){
        return {
            tableData:[],
            selections:[],
             obj:{
                account:'',
                endTime:'',
                mobile:'',
                page:1,
                pageSize:20,
                startTime:'',
                username:'',
                type:''
            }
        }
    },
    filters:{
                 time(a){
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

        },
        mtype(a){
              return a == 1 ?"否" :  "是"
        },
        port(m){
              return m == 1 ?"未充值" : "充值"
        }
    },
    created(){
        this.gettablelist()
        
    },
    methods:{
        //获取表格数据
        gettablelist(){
            findAllMember(this.obj).then(res => {
                this.tableData = res.data.data.list
            }).catch(error => {
                Message.error(error)
            })
        },
        //搜索
        search_customer(){
            if(!this.account){
                this.$message("请输入用户名")
            }else{
               //console.log(1263)
               this.obj.account = this.account;
               this.gettablelist();

            }
        },
        //加白
        addwhite(data){
              this.obj.account = data.account;
              this.obj.type = 1
              memberToWrite(this.obj.account,this.obj.type).then(res => {
                    if (res.data.error_code === 200) {
                     Message.success('加白成功')
                     } else {
                         Message.error(res.data.message)
                         }
              })
        },
        //取消加白
        deletewhite(data){
              this.obj.account = data.account;
              this.obj.type = 2
              memberToWrite(this.obj.account,this.obj.type).then(res => {
                    if (res.data.error_code === 200) {
                     Message.success('取消加白成功')
                     } else {
                         Message.error(res.data.message)
                         }
              })
        },
        //批量取消加白
        moredeletewhite(){
              if(this.selections === 0){
              this.$message('至少选择一个用户')
        }else{
              let newarr = [];
              this.selections.forEach(e => {
                    //console.log(e.account);
                    newarr.push(e.account)
              });
              let newaccount = newarr.join(',');
              this.obj.account = newaccount;
              this.obj.type = 2;
              memberToWrite(this.obj.account,this.obj.type).then(res => {
                    if (res.data.error_code === 200) {
                     Message.success('取消加白成功')
                     } else {
                         Message.error(res.data.message)
                         }
              })
        }
        },
         //翻页
        handleCurrentChange(num){
            this.obj.page = num;
            this.gettablelist();
            this.longtime()
        },
        //改变页面大小
        handleSizeChange(num){
            this.obj.pageSize = num;
            this.gettablelist();
            this.longtime()
        },
        //显示一个月以上未登录用户
        longtime(){
              console.log(this.obj.page, this.obj.pageSize)
              getHistoryClient(this.obj.page, this.obj.pageSize).then(res => {
                    this.tableData = res.data.data
              }).catch(error => {
                    Message.error(error)
              })
        },
        // 选择框全部
        handleSelectionChange(selection) {
            this.selections = selection;
            // console.log(this.selections.length)
            // // console.log(this.selections[0].account)
            // for(let i = 0;i<this.selections.length;i++){
            //       //console.log(this.selections[i].account);
            //       let newarr =[];
            //       newarr.push(this.selections[i].account);
            //       //console.log(newarr)
            // }
        }

    }

}
</script>

<style>
.statistics{
    padding: 10px 20px
}
</style>
