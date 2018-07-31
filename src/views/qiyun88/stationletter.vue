<template>
    <div class="addstationletter">
        <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="标题" style="width:50%">
    <el-input v-model="form.title"></el-input>
  </el-form-item>
  <el-form-item label="内容" style="width:50%;">
    <el-input type="textarea" v-model="form.text"></el-input>
  </el-form-item>
  <el-form-item label="状态">
    <el-radio-group >
      <el-radio label="1" v-model="form.status">显示</el-radio>
      <el-radio label="0" v-model="form.status">隐藏</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="类型">
    <el-radio-group>
      <el-radio label="1" v-model="form.type">所有人可见</el-radio>
      <el-radio label="2" v-model="form.type">白名单可见</el-radio>
      <el-radio label="3" v-model="form.type">指定人可见</el-radio>
    </el-radio-group>
  </el-form-item>
   <el-form-item label="指定人">
    <el-select v-model="form.altmen" placeholder="选择指定人">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">添加</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
    </div>
</template>

<script>
import { addMail } from '@/api/sunburn'
export default {
     data() {
      return {
        form: {
         title:'',
          text:'',
          status:1||0,
          type:1||2||3,
          altmen:''
        }
      }
    },
    methods: {
      onSubmit() {
        addMail(this.form)
        .then(res => {
            console.log(res)
        })
      }
    }
}
</script>

<style>
.el-textarea__inner{
    height: 250px
}
.addstationletter{
    padding: 10px 20px
}
</style>
