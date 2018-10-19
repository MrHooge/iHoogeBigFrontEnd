<template>
    <div class="statistics">
        <el-input placeholder="请输入用户名" v-model="account" style="width: 130px;margin-right:20px;margin-bottom:30px" clearable></el-input>
        <el-input placeholder="请输入昵称" v-model="username" style="width: 130px;margin-right:20px;margin-bottom:30px" clearable></el-input>
        <el-input v-model="name" placeholder="请输入姓名" style="width: 150px;margin-right:20px;margin-top:40px" clearable></el-input>
        <el-input v-model="idcard" placeholder="请输入身份证号" style="width: 200px;margin-right:20px;margin-top:40px" clearable></el-input>
        <el-input v-model="mobile" placeholder="请输入电话" style="width: 150px;margin-right:20px;margin-top:20px" clearable></el-input>
        开始时间：
            <el-date-picker
                v-model="startTime"
                type="datetime"
                style="margin-bottom:40px;margin-right:20px;width:200px"
                placeholder="请选择开始日期"
                value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
        结束时间：
            <el-date-picker
                v-model="endTime"
                align="right"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="23:59:59"
                type="datetime"
                style="margin-left:10px;
                width:200px
                margin-bottom:40px;"
                placeholder="请选择结束日期"
                >
            </el-date-picker>

        <el-button type="primary" @click="search_customer" @keyup.13="getone" style="margin-left:100px;margin-bottom:30px">搜索</el-button>
        <el-button type="primary" @click="longtime" @keyup.13="getone" style="margin-left:100px;margin-bottom:30px">一个月以上未登录用户</el-button>
        <el-button type="primary" @click="moredeletewhite">批量取消加白</el-button>
        <p style="font-size:12px;color:red;">注：点击昵称可以跳转到会员资料修改页面</p>
        <el-table
            :data="tableData"
            border
            style="width: 100%;"
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection">
            </el-table-column>
            <el-table-column
                label="昵称"
                align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.username" @click="getupnewweb(scope.row.ACCOUNT)">{{scope.row.username}}</span>
                    <span v-else @click="getupnewweb(scope.row.ACCOUNT)">{{scope.row.ACCOUNT}}</span>
                </template>
            </el-table-column>
            
            <el-table-column
                label="真实姓名"
                prop="NAME"
                align="center">
            </el-table-column>
            <el-table-column
                label="证件号"
                prop="CERT_NO"
                align="center"> 
            </el-table-column>
            <el-table-column
                label="手机"
                prop="MOBILE"
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
                    {{scope.row.IS_CHARGE | port}}
                </template>
            </el-table-column>
            <el-table-column
                label="是否白名单"
                align="center">
                <template slot-scope="scope">
                    {{scope.row.IS_WHITELIST | mtype}}
                </template>
            </el-table-column>

            <el-table-column
                label="操作"
                align="center">
                <template slot-scope="scope">
                    <el-button type="success" @click="addwhite(scope.row,'modify')" style="width:70px;height:30px;line-height:5px;"  v-if="scope.row.IS_WHITELIST === 1">加白</el-button>
                    <el-button type="primary" @click="deletewhite(scope.row,'modify')" style="width:70px;height:30px;line-height:5px;padding-left:10px;" v-if="scope.row.IS_WHITELIST === 0">设为非白</el-button>
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
            v-if="totalList != ''">
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
            account:'',
            name:'',
            idcard: '',
            mobile: '',
            endTime:'',
            mobile:'',
            page: 1,
            pageSize: 20,
            startTime:'',
            username:'',
            type:'',
            totalList: 0,
            addBtn: true,
            cancelBtn: true,
            isBeforMonth: false
        }
    },
    filters:{
        time(a){
            if(a != null && a != ''){
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
        mtype(a){
              return a == 1 ?"否" :  "是"
        },
        port(m){
              return m == 1 ? "否" : "是"
        }
    },
    created(){
        this.gettablelist()
    },
    methods:{
        //点击账号跳转会员管理页面
        getupnewweb(a){
             this.$router.push({path:'/customerManager/customerManager',query:{account:a}})
        },
        //获取表格数据
        gettablelist(){
            let obj = {
                account: this.account,
                end_time: this.endTime || '',
                mobile: this.mobile,
                page: this.page,
                pageSize: this.pageSize,
                start_time: this.startTime || '',
                username: this.username,
                realName: this.name,
                type: this.type,
                identifyId: this.idcard,
                mobile: this.mobile,
            }
            findAllMember(obj).then(res => {
                this.tableData = res.data.data.list
                this.totalList = res.data.data.total
            }).catch(error => {
                Message.error(error)
            })
        },

        //加白
        addwhite(data){
            this.account = data.ACCOUNT;
            this.type = 1
            memberToWrite(this.account,this.type).then(res => {
                if (res.data.error_code === 200) {
                    Message.success('加白成功')
                    this.account = ''
                    if(this.isBeforMonth){
                        this.longtime()
                    }else{
                        this.gettablelist()
                    }
                } else {
                    Message.error(res.data.message)
                }
            })
        },
        //取消加白
        deletewhite(data){
            // if(this.isBeforMonth){
            //     this.account = data.account
            // }else{
            //     this.account = data.ACCOUNT;
            // }
            this.account = data.ACCOUNT;
            this.type = 2
            memberToWrite(this.account,this.type).then(res => {
                if (res.data.error_code === 200) {
                    Message.success('取消加白成功')
                    this.account = ''
                    if(this.isBeforMonth){
                        this.longtime()
                    }else{
                        this.gettablelist()
                    }
                } else {
                    Message.error(res.data.message)
                }
            })
        },
        //批量取消加白
        moredeletewhite(){
            if(this.selections.length === 0){
                this.$message('至少选择一个用户')
            }else{
                let newarr = [];
                this.selections.forEach(e => {
                    // if(this.isBeforMonth){
                    //     newarr.push(e.account)
                    // } else {
                    //     newarr.push(e.ACCOUNT)
                    // }
                    newarr.push(e.ACCOUNT)
                });
                let newaccount = newarr.join(',');
                this.account = newaccount;
                this.type = 2;
                memberToWrite(this.account,this.type).then(res => {
                    if (res.data.error_code === 200) {
                        Message.success('取消加白成功')
                        this.account = ''
                        if(this.isBeforMonth){
                            this.longtime()
                        }else{
                            this.gettablelist()
                        }
                    } else {
                        Message.error(res.data.message)
                    }
                })
            }
        },
         //翻页
        handleCurrentChange(num){
            this.page = num;
            if(this.isBeforMonth){
                this.longtime()
            }else{
                this.gettablelist();
            }
        },
        //改变页面大小
        handleSizeChange(num){
            this.pageSize = num;
            if(this.isBeforMonth){
                this.longtime()
            }else{
                this.gettablelist();
            }
        },
        //显示一个月以上未登录用户
        longtime(){
            // this.page = 1
            this.isBeforMonth = true
            getHistoryClient(this.page, this.pageSize).then(res => {
                if(res.data.error_code === 200){
                    this.tableData = res.data.data.list
                    this.totalList = res.data.data.total
                    this.$message.success(res.data.message)
                }else{
                    this.$message.error(res.data.message)
                }
            }).catch(error => {
                Message.error(error)
            })
        },
        //搜索
        search_customer(){
            this.page = 1
            this.pageSize = 20
            this.gettablelist()
        },
        // 选择框全部
        handleSelectionChange(selection) {
            this.selections = selection;
        }

    }
}
</script>

<style>
.statistics{
    padding: 10px 20px
}
</style>