<!-- 新闻发布 -->
<template>
  <div class="sendnews">
    <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline"> -->
    <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="新闻类别">
            <div>
                <el-radio label="1" v-model="Turntable">选择历史类别或标签</el-radio>
                <el-radio label="0" v-model="Turntable">填写新类别</el-radio>
            </div>
            <!-- 历史类别 -->
            <div v-if="Turntable == 1">
            <el-button type="primary" @click="history">获取历史类别</el-button>
            <el-select v-model="planStatus"
                            placeholder="请选择状态筛选数据"
                        style="width:55%"
                        @change="handselect">
            <el-option v-for="temp in options"
                                :key="temp.index"
                                :value="temp">
                        </el-option>
            </el-select>
            </div>
            <el-input v-model="form.type" style="width:300px" placeholder="填写新类别" v-else clearable></el-input>
            <!-- </el-input> -->
        </el-form-item><br />
        <el-form-item label="资讯作者">
            <el-input v-model="form.editor" style="width:300px" placeholder="必填" clearable></el-input>
        </el-form-item><br />
        <el-form-item label="文章标题">
            <el-input v-model="form.title" style="width:300px" placeholder="必填" clearable></el-input>
        </el-form-item><br />
        <el-form-item label="资讯摘要">
            <el-input v-model="form.summary" style="width:300px" placeholder="必填" clearable></el-input>
        </el-form-item><br>
        <el-form-item label="短    标    题">
            <el-input v-model="form.shortTitle" style="width:300px" clearable></el-input>
        </el-form-item><br />
        <el-form-item label="显示隐藏">
            <el-radio label="1" v-model="form.isShow">显示</el-radio>
            <el-radio label="0" v-model="form.isShow">隐藏</el-radio>
        </el-form-item><br />
        <el-form-item label="内容类别">
            <el-radio label="0" v-model="form.contentType" @change="getchange">编辑</el-radio>
            <el-radio label="1" v-model="form.contentType" @change="getchange">链接</el-radio>
        </el-form-item><br />
        <el-form-item label="链接" v-show="obviously">
            <el-input v-model="form.link" style="width:200px" clearable></el-input>
        </el-form-item>
        <el-form-item label="文章标签">
            <el-input v-model="form.label" style="width:300px"></el-input>
        </el-form-item><br />
        <el-form-item label="关    键    字">
            <el-input v-model="form.keyword" style="width:100px" placeholder="必填" clearable></el-input>
        </el-form-item>
        <el-form-item label="点击数">
            <el-input v-model="form.click" style="width:100px" placeholder="必填" clearable></el-input>
        </el-form-item>
        <el-form-item label="权重">
            <el-input v-model="form.sort" style="width:100px" clearable></el-input>
        </el-form-item><br />
        <el-form-item label="上传图片" style="border:none">
            <!-- <el-input type="file" @change="upload"></el-input> -->
            <el-upload
                :data="folder"
                class="upload-demo"
                action="https://infos.api.qyun88.com/information/uploadImage"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess"
                multiple
                :limit="3">
                <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form-item><br />
        <el-form-item>
            <el-button type="primary" @click="update" v-show="xiugai">修改</el-button>
            <el-button type="primary" @click="sendnews" v-show="fabu">发布</el-button>
        </el-form-item>
    </el-form>
    <div class="quill">
        <h4>编辑内容</h4>
        <quill-editor v-model="form.content" ref="myQuillEditor">
        </quill-editor>
    </div>
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
                <div class="grid-content bg-purple"></div>
            </el-col>
            </el-row>
        </div>          
        </div>
        <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
import { createNews,uploadImage,setNewsPicetur,getTypes,getNew,reviseNews } from '@/api/news'
import api from '../../../config/dev.env'
export default {
  data() {
    return {
      dialogVisible:false,
      folder: {
				folder: 'info'
			},
      file:'',
      id:'',
      imgurl:'',
      planStatus:'',
      Turntable:'',
      temp:'',
      command:'',
      options: [],
      obviously:'',
       form: {
          click:'',
          createDateTime:'',
          content:'',
          showDateTime:'',
          editor:'',	
          contentType:'',
          id:'',	
          isShow:'',	
          keyword:'',	
          label:'',	
          picture:'',
          link:'',	
          shortTitle:'',	
          showDateTime:'',	
          summary:'',	
          title	:'',	
          type:'',
        },
        fabu: true,
        xiugai: false,
    }
  },
  components: {},
  created(){
      if(this.$route.query.id){
          this.xiugai = true
          this.fabu = false
          this.id = this.$route.query.id
      }
    this.getupdatedata()
  },
  updated(){
    this.id = ''
  },
  mounted(){
    this.imgurl = 'https://infos.api.qyun88.com/information/uploadImage'
  },

  methods: {
   //链接显示隐藏
    getchange(date){
        if(this.form.contentType == 1){
            this.obviously = true
        }else{
            this.obviously = false
        }
    },
    // Showhidden(){
    //   if(this.form.contentType == 1){
    //     this.obviously = true
    //   }else{
    //     this.obviously =false
    //   }
    // },
     handleCommand(command) {
        this.command = command;
      },
 
    //上传图片成功回调
    handleAvatarSuccess(res){
      this.form.picture = res
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
        //状态选中
        handselect(value){
            this.form.type = value
        },
        //修改新闻
        update(){
            if(this.form.editor && this.form.keyword && this.form.summary && this.form.title && this.form.type && this.form.contentType){
                reviseNews(this.form).then(res => {
                    if(res.data.error_code == 200){
                        this.$message.success(res.data.message)
                    }else{
                        this.$message.error(res.data.message)
                    }
                })
            }else{
                this.$message.error('缺少输入参数')
            }
        },
        //发布新闻
        sendnews(){
            if(this.form.click && this.form.editor && this.form.keyword && this.form.summary && this.form.title && this.form.type && this.form.contentType){
                createNews(this.form).then(res => {
                    if(res.data.error_code == 200){
                        this.$message.success(res.data.message)
                    }else{
                        this.$message.error(res.data.message)
                    }
                })
            }else{
                this.$message.error('缺少输入参数')
            }
        },
    pictureurl(){
      this.dialogVisible = true
    },
    //获取新闻类别
    history(){
      let obj = {
        type:1
      }
      getTypes(obj)
      .then(res => {
        this.options = res.data.data
      })
    },
    //获取修改资讯数据
    getupdatedata(){
      let newobject= {
        id: this.id
      }
      getNew(newobject).then(res => {
        if(res.data.error_code ===200){
            this.form.click = res.data.data.click
            this.form.content = res.data.data.content
            this.form.contentType = res.data.data.contentType
            this.form.editor = res.data.data.editor
            this.form.id = res.data.data.id
            this.form.keyword = res.data.data.keyword
            this.form.label = res.data.data.label
            this.form.type = res.data.data.type
            this.form.title = res.data.data.title
            this.form.summary = res.data.data.summary
            this.form.showDateTime = res.data.data.showDateTime
            this.form.sort = res.data.data.sort
            this.form.link = res.data.data.link
            this.form.shortTitle = res.data.data.shortTitle
            this.form.isShow = res.data.data.isShow.toString()
            this.form.contentType = res.data.data.contentType.toString()
        }
      })
    },
    //刷新页面
    flashwebsite(){
      window.onload = function(){
        this.$route.query.id = '';
      }
    }
  }
}
</script>

 <style scoped>
 .quill{
   /* position: absolute;
   top: 40px;
   right:80px */
 }
 .quill-editor {
 height: 425px;
 width: 1000px;
 min-width: 1000px;
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
    width: 100%;
    min-width: 1200px;
  padding: 10px 20px;
  display: flex;
  justify-content: flex-start;

}
</style>
