<template>
    <div class="addstationletter">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="添加人" style="width:50%">
    <el-input v-model="author"></el-input>
  </el-form-item>
  <el-form-item label="标题" style="width:50%">
    <el-input v-model="title"></el-input>
  </el-form-item>
  <el-form-item label="内容" style="width:50%;">
    <el-input type="textarea" v-model="content"></el-input>
  </el-form-item>
  <el-form-item label="状态">

      <el-radio label="1" v-model="status">显示</el-radio>
      <el-radio label="0" v-model="status">隐藏</el-radio>

  </el-form-item>
  <el-form-item label="类型">

      <el-radio label="1" v-model="type">所有人可见</el-radio>
      <el-radio label="2" v-model="type">白名单可见</el-radio>
      <el-radio label="3" v-model="type">指定人可见</el-radio>

  </el-form-item>
   <el-form-item label="指定人">
    <el-select v-model="target" placeholder="选择指定人">
      <el-option label="区域一" value="shanghai"></el-option>
      <el-option label="区域二" value="beijing"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit">添加</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
<el-dialog title="确认提交吗" :visible.sync="dialogVisible" width="500px" top="30vh">
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="plasure">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { addMail } from '@/api/sunburn'
export default {
     data() {
      return {
          dialogVisible: false,
          author:'',
          title:'',
          content:'',
          target:'',
          status:1,
          type:1

       
      }
    },
    methods: {
      onSubmit() {
        if(!this.author){
          this.$message('请输入作者名')
        }else if(!this.title){
          this.$message('请输入标题')
        }else if(!this.content){
          this.$message('请输入内容')
        }else{
          this.dialogVisible = true;
        
      }
      },
      plasure(){
        let obj = {
          content:this.content,
          title:this.title,
          author:this.author,
          target:this.target,
          status:this.status,
          type:this.type
        }
        addMail(obj)
        .then(res => {
          console.log(res.data.error_code)
            if(res.data.error_code == 200) {
              this.$message(res.data.message)
              this.content = '',
              this.title = '',
              this.author = '',
              this.target = '',
              this.status = '',
              this.type = '',
              this.dialogVisible = false
            }
        })
      },
      changestatus(a){
        if(this.time == 1){
          console.log(1)
        }
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
