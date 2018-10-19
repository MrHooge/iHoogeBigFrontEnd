<template>
    <div class="backend">
        <div class="search">
            <el-input v-model="mobile" placeholder="请输入手机号" style="width:260px;" clearable></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
        </div>
        <el-table :data="tableData" border style="width: 100%;">
            <el-table-column
                prop="id"
                label="编号"
                align="center"
                width="180">
            </el-table-column>

            <el-table-column
                prop="mobile"
                align="center"
                label="手机号">
            </el-table-column>

            <el-table-column
                align="center"
                label="发送时间">
                 <template slot-scope="scope">
                    {{scope.row.lastSendTime | time}}
                </template>
            </el-table-column>

            <el-table-column
                prop="code"
                align="center"
                label="验证码">
            </el-table-column>
        </el-table>
        
    </div>
</template>


<script>
import { getSmsCode } from '@/api/customer'
import { Message, MessageBox } from 'element-ui'
export default {
  data() {
    return {
        mobile:'', // 手机号
        tableData: [], //表格数据
        obj:"",//每一行的数据
        total: 0, //总页数
    };
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
  methods: {
    search() {
        if(!this.mobile){
            this.$message('手机号不能为空!')
        }else {
            let obj = {
                mobile:this.mobile
            }
            getSmsCode(obj).then(res => {
                if(res.data.error_code === 200){
                    this.tableData.push(res.data.data)
                }
            }).catch(error => {
                Message.error(error)
            })
            
        } 
    }
  }
};
</script>

<style scoped>
.backend{
    padding: 10px 20px
}
label{
    font-size: 14px;
    color: #666;
}
div.search{
    padding:10px 20px;
}
</style>