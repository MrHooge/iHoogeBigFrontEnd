<!-- 竞彩日报 -->
<template>
<div class="top">
 <div class="addstationletter">
  <div class="left">
   <p>每日两单（一）</p>
        <el-form ref="form" :model="form" label-width="80px" size="500px" key="dayOneDan2DTO">
          <el-form-item label="玩法" style="width:400px">
    <el-input v-model="form.playType"></el-input>
  </el-form-item>
  <el-form-item label="场次" style="width:400px">
    <el-input v-model="form.matchId"></el-input>
  </el-form-item>
  <el-form-item label="主队" style="width:400px">
    <el-input v-model="form.homeTeam"></el-input>
  </el-form-item>
   <el-form-item label="客队" style="width:400px">
    <el-input v-model="form.guestTeam"></el-input>
  </el-form-item>
   <el-form-item label="推荐" style="width:400px">
    <el-input v-model="form.recommend"></el-input>
  </el-form-item>
   <el-form-item label="sp值" style="width:400px">
    <el-input v-model="form.sp"></el-input>
  </el-form-item>
  <el-form-item label="分析" style="width:400px;">
    <el-input type="textarea" v-model="form.analyze"></el-input>
  </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="onSubmitfirst">提交</el-button>
    <el-button>取消</el-button>
  </el-form-item>
</el-form>
  </div>
  <div class="right">
   <p>每日两单（二）</p>
        <el-form ref="form" :model="formsecond" label-width="80px" size="500px">
         <el-form-item label="玩法" style="width:400px">
    <el-input v-model="formsecond.playType"></el-input>
  </el-form-item>
  <el-form-item label="场次" style="width:400px">
    <el-input v-model="formsecond.matchId"></el-input>
  </el-form-item>
  <el-form-item label="主队" style="width:400px">
    <el-input v-model="formsecond.homeTeam"></el-input>
  </el-form-item>
   <el-form-item label="客队" style="width:400px">
    <el-input v-model="formsecond.guestTeam"></el-input>
  </el-form-item>
   <el-form-item label="推荐" style="width:400px">
    <el-input v-model="formsecond.recommend"></el-input>
  </el-form-item>
   <el-form-item label="sp值" style="width:400px">
    <el-input v-model="formsecond.sp"></el-input>
  </el-form-item>
  <el-form-item label="分析" style="width:400px;">
    <el-input type="textarea" v-model="formsecond.analyze"></el-input>
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
        <el-form :inline="true" :model="formthird" class="demo-form-inline">
        <el-form-item label="场次">
          <el-input v-model="formthird.amount"></el-input>
        </el-form-item>
        <el-form-item label="主队">
          <el-input v-model="formthird.author"></el-input>
        </el-form-item>
        <el-form-item label="客队">
          <el-input v-model="formthird.bonus"></el-input>
        </el-form-item>
        <el-form-item label="推荐">
          <el-input v-model="formthird.guestTeam1"></el-input>
        </el-form-item><br />
        <el-form-item label="场次">
          <el-input v-model="formthird.guestTeam2"></el-input>
        </el-form-item>
        <el-form-item label="主队">
          <el-input v-model="formthird.homeTeam1"></el-input>
        </el-form-item>
        <el-form-item label="客队">
          <el-input v-model="formthird.homeTeam2"></el-input>
        </el-form-item>
        <el-form-item label="推荐">
          <el-input v-model="formthird.matchId1"></el-input>
        </el-form-item><br />
        <el-form-item label="方案注数">
          <el-input v-model="formthird.matchId2"></el-input>
        </el-form-item>
        <el-form-item label="方案金额">
          <el-input v-model="formthird.multiple"></el-input>
        </el-form-item>
        <el-form-item label="预测金额">
          <el-input v-model="formthird.recommend1"></el-input>
        </el-form-item>
         <el-form-item label="预测金额">
          <el-input v-model="formthird.recommend2"></el-input>
        </el-form-item><br />
        <el-form-item>
          <el-button type="primary" @click="onSubmitthird">提交</el-button>
        </el-form-item>
      </el-form>
  </div>
          <div class="no">
   <p>实战二串一（二）</p>
        <el-form :inline="true" :model="formforth" class="demo-form-inline">
        <el-form-item label="场次">
          <el-input v-model="formforth.amount"></el-input>
        </el-form-item>
        <el-form-item label="主队">
          <el-input v-model="formforth.author"></el-input>
        </el-form-item>
        <el-form-item label="客队">
          <el-input v-model="formforth.bonus"></el-input>
        </el-form-item>
        <el-form-item label="推荐">
          <el-input v-model="formforth.guestTeam1"></el-input>
        </el-form-item><br />
        <el-form-item label="场次">
          <el-input v-model="formforth.guestTeam2"></el-input>
        </el-form-item>
        <el-form-item label="主队">
          <el-input v-model="formforth.homeTeam1"></el-input>
        </el-form-item>
        <el-form-item label="客队">
          <el-input v-model="formforth.homeTeam2"></el-input>
        </el-form-item>
        <el-form-item label="推荐">
          <el-input v-model="formforth.matchId1"></el-input>
        </el-form-item><br />
        <el-form-item label="方案注数">
          <el-input v-model="formforth.matchId2"></el-input>
        </el-form-item>
        <el-form-item label="方案金额">
          <el-input v-model="formforth.multiple"></el-input>
        </el-form-item>
        <el-form-item label="预测金额">
          <el-input v-model="formforth.recommend1"></el-input>
        </el-form-item>
         <el-form-item label="预测金额">
          <el-input v-model="formforth.recommend2"></el-input>
        </el-form-item><br />
        <el-form-item>
          <el-button type="primary" @click="onSubmitforth">提交</el-button>
        </el-form-item>
      </el-form>
  </div>
    </div>
</div>
</template>

<script>
import { createDayOneDan1,createDayOneDan2,createSZ2C11,createSZ2C12 } from '@/api/news'
export default {
  data() {
    return {
      form:{
      analyze:''||null,	
      author:''||null,
      guestTeam	:''||null,	
      homeTeam:''||null,
      matchId:''||null,
      playType:''||null,
      recommend:''||null,
      sp:''||null
      },
      formsecond:{
       analyze:''||null,	
        author:''||null,
        guestTeam	:''||null,	
        homeTeam:''||null,
        matchId:''||null,
        playType:''||null,
        recommend:''||null,
        sp:''||null
      },
      formthird:{
      amount:'',	
      author:'',
      bonus:'',
      guestTeam1:'',
      guestTeam2:'',	
      homeTeam1:'',	
      homeTeam2:'',
      matchId1:'',	
      matchId2:'',	
      multiple:'',	
      recommend1:'',		
      recommend2:''
      },
      formforth:{
        amount:'',	
        author:'',
        bonus:'',
        guestTeam1:'',
        guestTeam2:'',	
        homeTeam1:'',	
        homeTeam2:'',
        matchId1:'',	
        matchId2:'',	
        multiple:'',	
        recommend1:'',		
        recommend2:''
      }
    }
  },

  components: {},

  methods: {
    onSubmitfirst(){
      if(!this.form.playType){
        this.$message('请输入玩法')
      }else if(!this.form.matchId){
        this.$message('请输入场次')
      }else if(!this.form.homeTeam){
        this.$message('请输入主队')
      }else if(!this.form.guestTeam){
        this.$message('请输入客队')
      }else if(!this.form.recommend){
        this.$message('请输入推荐')
      }else if(!this.form.sp){
        this.$message('请输入sp值')
      }else if(!this.form.analyze){
        this.$message('请输入分析')
      }else{
        let obj = {
 
          analyze:this.form.analyze,	
          author:'manager',
          guestTeam	:this.form.guestTeam,	
          homeTeam:this.form.homeTeam,
          matchId:this.form.matchId,
          playType:this.form.playType,
          recommend:this.form.recommend,
          sp:this.form.sp
        }
        createDayOneDan1(JSON.stringify(obj)).then(res => {
         if(res.error_code == 200){
           thi.$message(res.message)
         }
        })
       }
    },
    onSubmitsecond(){
      if(!this.formsecond.playType){
        this.$message('请输入玩法')
      }else if(!this.formsecond.matchId){
        this.$message('请输入场次')
      }else if(!this.formsecond.homeTeam){
        this.$message('请输入主队')
      }else if(!this.formsecond.guestTeam){
        this.$message('请输入客队')
      }else if(!this.formsecond.recommend){
        this.$message('请输入推荐')
      }else if(!this.formsecond.sp){
        this.$message('请输入sp值')
      }else if(!this.formsecond.analyze){
        this.$message('请输入分析')
      }else{
        let obj = {
          analyze:this.formsecond.analyze,	
          author:'manager',
          guestTeam	:this.formsecond.guestTeam,	
          homeTeam:this.formsecond.homeTeam,
          matchId:this.formsecond.matchId,
          playType:this.formsecond.playType,
          recommend:this.formsecond.recommend,
          sp:this.formsecond.sp
        }
      createDayOneDan2(obj).then(res => {
         if(res.error_code == 200){
           thi.$message(res.message)
         }
      })
      }
    },
    onSubmitthird(){
       if(!this.formthird.amount){
        this.$message('请输入完整数据')
      }else if(!this.formthird.author){
        this.$message('请输入完整数据')
      }else if(!this.formthird.bonus){
        this.$message('请输入完整数据')
      }else if(!this.formthird.guestTeam1){
        this.$message('请输入完整数据')
      }else if(!this.formthird.guestTeam2){
        this.$message('请输入完整数据')
      }else if(!this.formthird.homeTeam1){
        this.$message('请输入完整数据')
      }else if(!this.formthird.homeTeam2){
        this.$message('请输入完整数据')
      }else if(!this.formthird.matchId1){
        this.$message('请输入完整数据')
      }else if(!this.formthird.matchId2){
        this.$message('请输入完整数据')
      }else if(!this.formthird.multiple){
        this.$message('请输入完整数据')
      }else if(!this.formthird.recommend1){
        this.$message('请输入完整数据')
      }else if(!this.formthird.recommend2){
        this.$message('请输入完整数据')
      }else{
        let obj = {
          amount:this.formthird.amount,	
          author:'manager',
          bonus	:this.formthird.bonus,	
          guestTeam1:this.formthird.guestTeam1,
          guestTeam2:this.formthird.guestTeam2,
          homeTeam1:this.formthird.homeTeam1,
          homeTeam2:this.formthird.homeTeam2,
          matchId1:this.formthird.matchId1,
          matchId2:this.formthird.matchId2,
          multiple:this.formthird.multiple,
          recommend1:this.formthird.recommend1,
          recommend2:this.formthird.recommend2
        }
      createSZ2C11(obj).then(res => {
         if(res.error_code == 200){
           thi.$message(res.message)
         }
      })
      }
    },
    onSubmitforth(){
      if(!this.formforth.amount){
        this.$message('请输入完整数据')
      }else if(!this.formforth.author){
        this.$message('请输入完整数据')
      }else if(!this.formforth.bonus){
        this.$message('请输入完整数据')
      }else if(!this.formforth.guestTeam1){
        this.$message('请输入完整数据')
      }else if(!this.formforth.guestTeam2){
        this.$message('请输入完整数据')
      }else if(!this.formforth.homeTeam1){
        this.$message('请输入完整数据')
      }else if(!this.formforth.homeTeam2){
        this.$message('请输入完整数据')
      }else if(!this.formforth.matchId1){
        this.$message('请输入完整数据')
      }else if(!this.formforth.matchId2){
        this.$message('请输入完整数据')
      }else if(!this.formforth.multiple){
        this.$message('请输入完整数据')
      }else if(!this.formforth.recommend1){
        this.$message('请输入完整数据')
      }else if(!this.formforth.recommend2){
        this.$message('请输入完整数据')
      }else{
        let obj = {
          amount:this.formthird.amount,	
          author:'manager',
          bonus	:this.formthird.bonus,	
          guestTeam1:this.formthird.guestTeam1,
          guestTeam2:this.formthird.guestTeam2,
          homeTeam1:this.formthird.homeTeam1,
          homeTeam2:this.formthird.homeTeam2,
          matchId1:this.formthird.matchId1,
          matchId2:this.formthird.matchId2,
          multiple:this.formthird.multiple,
          recommend1:this.formthird.recommend1,
          recommend2:this.formthird.recommend2
        }
      createSZ2C12(obj).then(res => {
         if(res.error_code == 200){
           thi.$message(res.message)
         }
      })
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
