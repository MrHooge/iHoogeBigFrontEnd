<template>
    <div class="effectiveagent">
        <div>
            <el-input v-model="account" class="input_width" placeholder="请输入账号"></el-input>
        </div>
       <div>
            <el-input v-model="money" class="input_width" placeholder="充值的金额" type="number"></el-input>
       </div>
        <div style="margin-top:20px;padding: 10px;">
            <el-button size="small" type="primary" @click="recharge">充值</el-button>
        </div>
    </div>
</template>

<script>
import { addClouds } from "@/api/personal_review.js";
export default {
  data() {
    return {
        account:'' , // 账号，
        money:'', // 金额
    };
  },

  methods: {
    //充值
    recharge(){
        if(this.account && this.money){
            let obj ={
                account: this.account,
                money: this.money,
            }
            addClouds(obj).then(res =>{
                if(res.data.error_code === 200){
                    this.$message.success(res.data.message)
                    this.account = ''
                    this.money = ''
                }else{
                    this.$message.error(res.data.message)
                }
            })
        }else{
            this.$message('不能为空')
        }
    }
  }
};
</script>

<style scoped>
.effectiveagent {
  padding: 10px 25px;
}
.input_width {
  width: 400px;
  margin: 5px 0 10px 10px;
}
</style>