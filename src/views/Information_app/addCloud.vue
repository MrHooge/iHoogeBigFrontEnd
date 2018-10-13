<template>
    <div class="effectiveagent">
        <div>
            <el-input v-model="val" class="input_width" placeholder="请输入账号"></el-input>
        </div>
       <div>
            <el-input v-model="num" class="input_width" placeholder="添加的云豆数量" type="number"></el-input>
       </div>
        <div style="margin-top:20px;padding: 10px;">
            <el-button size="small" type="primary" @click="addSure">添加</el-button>
        </div>
    </div>
</template>

<script>
import { addCloud } from "@/api/personal_review.js";
export default {
  data() {
    return {
        val:'' , // 账号，
        num:'', // 添加的云豆数量
    };
  },

  methods: {
    addSure(){
        if(this.val && this.num){
            let obj ={
                account: this.val,
                clound: this.num,
            }
            addCloud(obj).then(res =>{
                console.log(res)
                if(res.data.error_code === 200){
                    this.$message.success(res.data.message)
                    this.val = ''
                    this.num = ''
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