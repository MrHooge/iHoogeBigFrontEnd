<!-- 竞彩日报 -->
<template>
<div class="top">
 <div class="addstationletter">
  <div class="left">
   <p>每日两单（一）</p>
        <el-form ref="form" :model="form" label-width="80px" size="500px">
          <el-form-item label="玩法" style="width:400px">
    <el-input v-model="playType	"></el-input>
  </el-form-item>
  <el-form-item label="场次" style="width:400px">
    <el-input v-model="matchId"></el-input>
  </el-form-item>
  <el-form-item label="主队" style="width:400px">
    <el-input v-model="homeTeam"></el-input>
  </el-form-item>
   <el-form-item label="客队" style="width:400px">
    <el-input v-model="guestTeam"></el-input>
  </el-form-item>
   <el-form-item label="推荐" style="width:400px">
    <el-input v-model="recommend"></el-input>
  </el-form-item>
   <el-form-item label="sp值" style="width:400px">
    <el-input v-model="sp"></el-input>
  </el-form-item>
  <el-form-item label="分析" style="width:400px;">
    <el-input type="textarea" v-model="analyze"></el-input>
  </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="onSubmitfirst">提交</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
  </div>
  <div class="right">
   <p>每日两单（二）</p>
        <el-form ref="form" :model="form" label-width="80px" size="500px">
          <el-form-item label="玩法" style="width:400px">
    <el-input v-model="author"></el-input>
  </el-form-item>
  <el-form-item label="场次" style="width:400px">
    <el-input v-model="title"></el-input>
  </el-form-item>
  <el-form-item label="主队" style="width:400px">
    <el-input v-model="title"></el-input>
  </el-form-item>
   <el-form-item label="客队" style="width:400px">
    <el-input v-model="title"></el-input>
  </el-form-item>
   <el-form-item label="推荐" style="width:400px">
    <el-input v-model="title"></el-input>
  </el-form-item>
   <el-form-item label="sp值" style="width:400px">
    <el-input v-model="title"></el-input>
  </el-form-item>
  <el-form-item label="分析" style="width:400px;">
    <el-input type="textarea" v-model="content"></el-input>
  </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="onSubmitsecond">提交</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
  </div>
  </div>
<!-- <el-dialog title="确认提交吗" :visible.sync="dialogVisible" width="500px" top="30vh">
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="plasure">确定</el-button>
            </div>
        </el-dialog> -->
        <div class="chuan">
          <div class="no">
   <p>实战二串一（一）</p>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="场次">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="主队">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="客队">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="推荐">
          <el-input></el-input>
        </el-form-item><br />
        <el-form-item label="场次">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="主队">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="客队">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="推荐">
          <el-input></el-input>
        </el-form-item><br />
        <el-form-item label="方案注数">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="方案金额">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="预测金额">
          <el-input></el-input>
        </el-form-item><br />
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
  </div>
          <div class="no">
   <p>实战二串一（二）</p>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="场次">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="主队">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="客队">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="推荐">
          <el-input></el-input>
        </el-form-item><br />
        <el-form-item label="场次">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="主队">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="客队">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="推荐">
          <el-input></el-input>
        </el-form-item><br />
        <el-form-item label="方案注数">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="方案金额">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="预测金额">
          <el-input></el-input>
        </el-form-item><br />
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
  </div>
    </div>
</div>
</template>

<script>
import { createDayOneDan1 } from '@/api/news'
export default {
  data() {
    return {
      analyze:'',	
      author:'',
      guestTeam	:'',	
      homeTeam:'',
      matchId:'',
      playType:'',
      recommend:'',
      sp:''
    }
  },

  components: {},

  methods: {
    onSubmitfirst(){
      if(!this.playType){
        this.$message('请输入玩法')
      }else if(!this.matchId){
        this.$message('请输入场次')
      }else if(!this.homeTeam){
        this.$message('请输入主队')
      }else if(!this.guestTeam){
        this.$message('请输入客队')
      }else if(!this.recommend){
        this.$message('请输入推荐')
      }else if(!this.sp){
        this.$message('请输入sp值')
      }else if(!this.analyze){
        this.$message('请输入分析')
      }else{
        // let obj = {
        //   analyze:this.analyze,	
        //   author:'manager',
        //   guestTeam	:this.guestTeam,	
        //   homeTeam:this.homeTeam,
        //   matchId:this.matchId,
        //   playType:this.playType,
        //   recommend:this.recommend,
        //   sp:this.sp
        // }
          var that = this 
        var parmas = new URLSearchParams();
        
        parmas.append('analyze',this.analyze)
        parmas.append('author','manager')
        parmas.append('guestTeam',this.guestTeam)
        parmas.append('homeTeam',this.homeTeam)
        parmas.append('matchId',this.matchId)
        parmas.append('playType',this.playType)
        parmas.append('recommend',this.recommend)
        parmas.append('sp',this.sp)
        createDayOneDan1(parmas).then(res  => {
          console.log(res)
        })
      }
    },
    onSubmitsecond(){
      if(!this.playType){
        this.$message('请输入玩法')
      }else if(!this.matchId){
        this.$message('请输入场次')
      }else if(!this.homeTeam){
        this.$message('请输入主队')
      }else if(!this.guestTeam){
        this.$message('请输入客队')
      }else if(!this.recommend){
        this.$message('请输入推荐')
      }else if(!this.sp){
        this.$message('请输入sp值')
      }else if(!this.analyze){
        this.$message('请输入分析')
      }else{
        let obj = {
          analyze:this.analyze,	
          author:'manager',
          guestTeam	:this.guestTeam,	
          homeTeam:this.homeTeam,
          matchId:this.matchId,
          playType:this.playType,
          recommend:this.recommend,
          sp:this.sp
        }
      }
    }
  }
}
</script>

<style scoped>
.chuan{
  padding: 10px 20px
}
.el-input__inner{
  width: 400px
}
.el-textarea__inner{
    height: 250px;
}
.right{
  float: left;
  margin-left: 400px;
  overflow: hidden
}
.left{
  width: 500px;
  float: left;
}
.addstationletter{
    padding: 10px 20px;
    overflow: hidden;
}
</style>
