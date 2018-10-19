<template>
    <div class="bonuslist">
        <div class="box">
            <el-input v-model="account" style="width:220px;" placeholder="请输入账号查询" clearable></el-input>
            <el-input v-model="username" placeholder="请输入昵称查询" style="width:15%;" clearable></el-input>
            <el-button @click="search" type="primary">搜索</el-button>
        </div>
        <el-table
        :data="tableData"
        border
        style="width: 100%"
        >
        <el-table-column
            type="index"
            align="center"
            label="编号">
        </el-table-column>
        <el-table-column
            prop="id"
            align="center"
            label="会员ID">
        </el-table-column>
     
        <el-table-column
            prop="status"
            label="状态"
            align="center"
            >
          <template slot-scope="scope">
                <span>{{ scope.row.status | status }}</span>
            </template>
        </el-table-column>
        <el-table-column
        prop="account"
        align="center"
        label="用户名"
        >
        </el-table-column>
        </el-table> 
         <!-- 分页 -->
        <div class="page">
            <el-pagination
               background
               @current-change = "currpage"
               :page-size="pages"
               layout="prev, pager, next"
               :total="total"
               v-if="total != ''">
            </el-pagination>
         </div>
    </div>
</template>

<script>
import { getAddPrizeBlack } from '@/api/events'
import { findAllMember} from '@/api/customer'
export default {
    data() {
        return {
            tableData: [], // 数据表格
            pages: 20,
            account: '', // 搜索的用户名
            username: '',   //搜索的昵称
            total: 0
        }
    },
    filters:{
        status(a){
            return a ? '有效':'无效'
        }
    },
    created(){
        this.getTables(1)
    },
    methods: {
        getTables(curr) {
            let model = {
                account: this.account,
                page: curr,
                pageSize: 20
            }
            getAddPrizeBlack(model)
            .then(res=>{
                if(res.data.error_code == 200){
                    this.tableData = res.data.data.list
                    this.total = res.data.data.total
                }else{
                    this.$message(res.message)
                }
                
            })
        },
        // 筛选
        // getOne(){
        //     this.getTables(1)
        // },
        //查询
        search() {
            if (!this.account && !this.username) {
                this.getTables(1);
            } else {
                if(this.account === ''){
                    this.getAccount()
                }else{
                    // this.page = 1
                    // this.getUsername()
                    this.getTables(1);
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
                // this.page = 1
                // this.getUsername()
                this.getTables(1);
            })
        },
        currpage(val) {
            this.getTables(val)
        }
    }
}
</script>

<style scoped>
.bonuslist{
    padding: 10px 20px
}
div.box{
    padding-bottom: 15px;
}
</style>