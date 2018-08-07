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
   <!-- <el-form-item label="内容">
    <el-input type="textarea" v-model="form.content" style="width:500px;"></el-input>
    <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
 @change="onEditorChange($event)">
 </quill-editor>
  </el-form-item> -->
  <el-form-item label="创建时间">
    <el-col :span="11">
      <el-date-picker type="date" v-model="form.createDateTime" style="width: 150px;"></el-date-picker>
    </el-col>
  </el-form-item>
   <el-form-item label="显示时间">
    <el-col :span="12">
      <el-date-picker type="date" v-model="form.showDateTime" style="width: 150px;"></el-date-picker>
    </el-col>
  </el-form-item>
  <br />
   <el-form-item label="id">
    <el-input v-model="id" style="width:100px" placeholder="必填"></el-input>
  </el-form-item>
  <el-form-item label="上传图片" style="border:none">
      <!-- <el-input type="file" @change="upload"></el-input> -->
      <el-upload
          class="upload-demo"
          :data="folder"
          action="https://infos.api.qiyun88.cn/information/uploadImage"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
          multiple
          :limit="3"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
  </el-form-item><br />
  <el-form-item>
    <el-button type="primary" @click="update">修改</el-button>
    <el-button type="sendnews" @click="update">发布</el-button>
  </el-form-item>
</el-form>
<div class="quill">
  <h4>编辑内容</h4>
  <quill-editor v-model="form.content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
 @change="onEditorChange($event)">
 </quill-editor>
</div>
<!-- <quill-editor v-model="content" ref="myQuillEditor" :options="editorOption" @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
 @change="onEditorChange($event)">
 </quill-editor> -->
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
import { createNews,uploadImage,setNewsPicetur } from '@/api/news'
import api from '../../../config/dev.env'
export default {
  data() {
    return {
      dialogVisible:false,
      folder:'info',
      file:'',
      id:'',
      imgurl:'',
       form: {
          click:'',
          createDateTime:'',
           content:'',
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
  mounted(){
    this.imgurl = 'https://infos.api.qiyun88.cn/information/uploadImage'
  },

  methods: {
    //上传图片成功回调
    handleAvatarSuccess(res){
      // this.imgurl = 'https://infos.api.qiyun88.cn/information/uploadImage'
      this.file = res;
      console.log(this.folder)
      console.log(res)
      let obj = {
        file:this.file,
        id:this.id
      }
      setNewsPicetur(obj)
      .then(res => {
        if(res.data.error_code == 200){
          this.$message(res.data.message)
        }
      })
    },
     beforeAvatarUpload(file) {
      const JPGArr = ["image/jpg", "image/jpeg", "image/png", "image/gif"]
      const isJPG = JPGArr.indexOf(file.type) > -1;
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传图片只能是 JPG/PNG/GIF 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
    
  }
}
</script>

 <style scoped>
 .quill{
   position: absolute;
   top: 40px;
   right:80px
 }
 .quill-editor {
 height: 425px;
 width: 1000px
}
  .ql-container {
 height: 380px;
 width: 360px
 }
.limit {
 height: 30px;
 border: 1px solid #ccc;
 line-height: 30px;
 text-align: right;
 
 
}
 .limit span {
 color: #ee2a7b;
 }
.ql-snow .ql-editor img {
 max-width: 480px;
}
 
.ql-editor .ql-video {
 max-width: 480px;
}
.el-textarea__inner{
    height: 250px
}
.sendnews{
  padding: 10px 20px
}
/* .sendnews >>> .el-input__inner{
  border: none !important;
} */
</style>
