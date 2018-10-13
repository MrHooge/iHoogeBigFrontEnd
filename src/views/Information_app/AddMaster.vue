<template>
    <div class="effectiveagent">
        <div>
            <el-input v-model="val" class="input_width" placeholder="请输入大师账号"></el-input>
        </div>
       <div>
            <el-input v-model="num" class="input_width" placeholder="请输入权重" type="number"></el-input>
       </div>
        <!-- 大神类型 -->
        <div style="margin-left:20px;">
            <el-radio v-model="radio" label="1">专家</el-radio>
            <el-radio v-model="radio" label="2">红人</el-radio>
        </div>
        <div style="margin-top:20px;">
            <el-button size="small" type="primary" @click="sure">保存</el-button>
        </div>
    </div>
</template>

<script>
import { addMantio } from "@/api/personal_review.js";
export default {
  data() {
    return {
        radio:'1',
        val:'' , // 大师的账号，
        num:'', // 权重
    };
  },

  methods: {
    sure(){
        if(this.val&&this.radio&&this.num){
            let obj ={
                account:this.val,
                sort:this.num,
                type:this.radio, 
            }
            addMantio(obj).then(data=>{
                let res = data.data
                if(res.error_code==200){
                    this.$message.success(res.message)
                    this.val=''
                    this.num= ''
                    this.radio = 1
                }else{
                    this.$message.error(res.message)
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