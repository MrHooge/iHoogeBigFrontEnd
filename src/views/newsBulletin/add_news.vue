<!-- 新闻发布 -->
<template>
  <div class="sendnews">
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
  <el-form-item label="新闻类别">
    <el-input v-model="form.type" style="width:200px" placeholder="必填"></el-input>
  </el-form-item>
  <el-form-item label="标题">
    <el-input v-model="form.title" style="width:300px" placeholder="必填"></el-input>
  </el-form-item><br />
  <el-form-item label="资讯摘要">
    <el-input v-model="form.summary" style="width:200px" placeholder="必填"></el-input>
  </el-form-item>
  <el-form-item label="短标题">
    <el-input v-model="form.shortTitle" style="width:150px"></el-input>
  </el-form-item><br />
  <el-form-item label="显示隐藏">
      <el-radio label="0" v-model="form.isShow">显示</el-radio>
      <el-radio label="1" v-model="form.isShow">隐藏</el-radio>
  </el-form-item><br />
  <el-form-item label="链接">
    <el-input v-model="form.link" style="width:200px"></el-input>
  </el-form-item>
  <el-form-item label="标签">
    <el-input v-model="form.label" style="width:150px"></el-input>
  </el-form-item><br />
  <el-form-item label="关键字">
    <el-input v-model="form.keyword" style="width:100px" placeholder="必填"></el-input>
  </el-form-item>
  <el-form-item label="资讯id">
    <el-input v-model="form.id" style="width:100px"></el-input>
  </el-form-item>
  <el-form-item label="作者">
    <el-input v-model="form.editor" style="width:100px" placeholder="必填"></el-input>
  </el-form-item><br />
  <el-form-item label="内容类别">
      <el-radio label="0" v-model="form.contentType">编辑</el-radio>
      <el-radio label="1" v-model="form.contentType">链接</el-radio>
  </el-form-item><br />
  <el-form-item label="点击数">
    <el-input v-model="form.click" style="width:100px" placeholder="必填"></el-input>
  </el-form-item>
  <el-form-item label="权重">
    <el-input v-model="form.sort" style="width:100px"></el-input>
  </el-form-item><br />
   <el-form-item label="内容">
    <el-input type="textarea" v-model="form.content" style="width:500px;"></el-input>
  </el-form-item>
   <el-form-item label="上传图片">
    <el-button type="sendnews" @click="pictureurl">选择路径</el-button>
  </el-form-item><br />
  <el-form-item label="创建时间">
    <el-col :span="11">
      <el-date-picker type="date" v-model="form.createDateTime" style="width: 150px;"></el-date-picker>
    </el-col>
  </el-form-item>
   <el-form-item label="显示时间">
    <el-col :span="12">
      <el-date-picker type="date" v-model="form.showDateTime" style="width: 150px;"></el-date-picker>
    </el-col>
  </el-form-item><br />
  <el-form-item>
    <el-button type="primary" @click="update">修改</el-button>
    <el-button type="sendnews" @click="update">发布</el-button>
  </el-form-item>
</el-form>
<el-dialog
          title="编辑"
          :visible.sync="dialogVisible"
          width="510px" top="15%">
          <!-- 弹窗中间展示内容 -->
          <div class="layercontent">
            <!-- 第一行图片 -->
            <div class="oneimg">
              <el-row :gutter="20">
                <el-col :span="4">
                  <div class="grid-content bg-purple">
                    图片：
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="grid-content bg-purple">
                      <el-upload
                        class="avatar-uploader"
                        :action="imurl()"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                  </div>
                </el-col>
              </el-row>
            </div>          
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editlayer">确 定</el-button>
          </span>
        </el-dialog>
  </div>
</template>

<script>
import { createNews } from '@/api/news'
import api from '../../../config/dev.env'
export default {
  data() {
    return {
      dialogVisible:false,
       form: {
          click:'',
          content:'',
          createDateTime:'',
          showDateTime:'',	
          cz:'',	
          editor:'',	
          contentType:'',
          id:'',	
          isShow:'',	
          keyword:'',	
          label:'',	
          link:'',	
          shortTitle:'',	
          showDateTime:'',	
          summary:'',	
          title	:'',	
          type:'',
          isShow:0
        }
    }
  },

  components: {},

  methods: {
    imurl(){
      return api + '/information/setNewsPicetur'
    },
    update(){
     if(this.form.click&&this.form.editor&&this.form.keyword&&this.form.summary&&this.form.title&&this.form.type&&this.form.id){
        this.form.cz = 2;
      createNews(this.form)
      .then(res => {
        console.log(res)
      })
      }else{
        this.$message('缺少输入参数')
      }
    },
    sendnews(){
      if(this.form.click&&this.form.editor&&this.form.keyword&&this.form.summary&&this.form.title&&this.form.type){
        this.form.cz = 1;
      createNews(this.form)
      .then(res => {
        console.log(res)
      })
      }else{
        this.$message('缺少输入参数')
      }
      
    },
    pictureurl(){
      this.dialogVisible = true
    },
     //编辑的时候 图片上传***///////////////////
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // console.log(this.imageUrl)
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/png|gig|jpg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    },
  }
}
</script>

<style scoped>
.el-textarea__inner{
    height: 250px
}
.sendnews{
  padding: 10px 20px
}
</style>
