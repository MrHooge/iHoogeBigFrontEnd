<template>
    <div class="modify">
        <label for="name">用户名</label>
        <el-input v-model="username" placeholder="请输入用户名" style="width:200px;" clearable></el-input>
        <br>
        <br>
        <label for="password">密&nbsp;&nbsp;&nbsp;码</label>        
        <el-input v-model="password" placeholder="请输入密码" style="width:200px;" type="password" clearable></el-input>
        <br>
        <br>
        <el-button type="primary" @click="modify">修改密码</el-button>
    </div>
</template>

<script>
import { resetPassword } from '@/api/customer'
export default {
    data(){
        return{
            username:'',
            password:'',
        };
    },
    methods:{
        modify(){
            if(!this.username){
                this.$message('用户名不能为空')
            }else if(!this.password){
                this.$message('密码不能为空')
            }else{
                let obj = {
                    name:this.username,
                    pass:this.password
                }
                resetPassword(obj.name,obj.pass).then(res =>{
                    if(res.status == 200){
                        if(res.data.error_code==200){
                            this.$message(res.data.message)
                        }else{
                            this.$message(res.data.message)
                        }
                    }
                })
            }

        }
    }
    

}
</script>

<style scoped>
.modify{
    padding: 10px 20px
}
label{
    font-size: 14px;
    color: #666;
}
</style>
