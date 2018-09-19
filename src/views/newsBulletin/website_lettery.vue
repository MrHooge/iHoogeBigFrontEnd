<!-- 站内信 -->
<template>
  <div class="inputmessage">
    <div style="margin-bottom:20px">
      <!-- 添加站内信 -->
       <el-button type="primary"
                 icon="el-icon-search"
                 @click="addmessage">添加站内信</el-button>&nbsp;&nbsp;&nbsp;
      状态：<el-radio v-model="statuslist" label="0" border>隐藏</el-radio>
              <el-radio v-model="statuslist" label="1" border>显示</el-radio>&nbsp;&nbsp;&nbsp;
       类型：<el-radio v-model="typelist" label="1" border>所有人可见</el-radio>
              <el-radio v-model="typelist" label="2" border>白名单可见</el-radio>
              <el-radio v-model="typelist" label="3" border>指定人可见</el-radio>&nbsp;&nbsp;&nbsp;
        <el-button type="primary"
                 icon="el-icon-search"
                 @click="search">查询</el-button>
    </div>
    <!-- 表格数据 -->
    <div>
        <el-table :data="date"
            border
            style="width: 100%;">
            <el-table-column
                type="index"
                align="center"
                label="编号">
            </el-table-column>
            <el-table-column prop="id"
                label="id"
                align="center">
            </el-table-column>
            <el-table-column
                label="创建时间"
                align="center">
                <template slot-scope="scope">
                    {{scope.row.createDate | time}}
                </template>
            </el-table-column>
            
            <el-table-column prop="content"
                label="内容"
                align="center">
            </el-table-column>
            <el-table-column align="center"
                label="状态 ">
                <template slot-scope="scope">
                    {{ scope.row.status | start }}
                </template>
            </el-table-column>
            <el-table-column prop="title"
                align="center"
                label="标题">
            </el-table-column>
            <el-table-column align="center"
                label="类型">
                <template slot-scope="scope">
                    {{scope.row.type | type}}
                </template>
            </el-table-column>
            <el-table-column prop="author"
                label="作者"
                align="center">
            </el-table-column>
        </el-table>
    <el-dialog :visible.sync="dialogFormVisible">
    标题：<el-input v-model="title"
                placeholder="请输入标题"
                style="width:40%;margin-bottom:30px"></el-input><br />
          内容:&nbsp;&nbsp;<el-input
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="content"
        style="width:40%;">
</el-input><br />
    指定人列表：<el-input v-model="target"
                placeholder="请输入"
                style="width:40%;margin-bottom:30px;margin-top:30px" type=""></el-input><br />
                <div style="margin-bottom:30px">
       状态：<el-radio v-model="status" label="0" border>隐藏</el-radio>
              <el-radio v-model="status" label="1" border>显示</el-radio><br />
                </div>
                <div style="margin-bottom:30px">
        类型：<el-radio v-model="type" label="1" border>所有人可见</el-radio>
              <el-radio v-model="type" label="2" border>白名单可见</el-radio>
              <el-radio v-model="type" label="3" border>指定人可见</el-radio><br />
                </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitInfos">确 定</el-button>
      </div>
    </el-dialog>
    </div>
  </div>
</template>

<script>
import { addMail,getMailList } from '@/api/news'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
  data() {
    return {
      date:[],
     dialogFormVisible:false,
     title:'',
     content:'',
     target:'',
     status:'',
     type:'',
     typelist:'',
     statuslist:''
    }
  },
   filters:{
       time(a){
            if(a != null){
                let date = new Date(a);
                let y = date.getFullYear();
                let MM = date.getMonth() + 1;
                MM = MM < 10 ? ('0' + MM) : MM;
                let d = date.getDate();
                d = d < 10 ? ('0' + d) : d;
                let h = date.getHours();
                h = h < 10 ? ('0' + h) : h;
                let m = date.getMinutes();
                m = m < 10 ? ('0' + m) : m;
                let s = date.getSeconds();
                s = s < 10 ? ('0' + s) : s;
                return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
            }
        },
        type(a){
          if(a == 1){
            return "所有人可见"
          }else if(a == 2){
            return "白名单可见"
          }else{
            return "指定人可见"
          }
        },
        start(a){
          if(a == 1){
            return "显示 "
          }else{
            return "隐藏"
          }
        }
   },
  components: {},
  created(){
      this.getdate()
  },
  methods: {
    addmessage(){
      this.dialogFormVisible = true
    },
    submitInfos(){
      if(this.title == '' ||this.content == '' ||this.target =='' ||this.status == '' || this.type == ''){
        this.$message('请输入相关数据')
      }else{
      let obj = {
        author:getCookies('name'),
        title:this.title,
        content:this.content,
        target:this.target,
        status:this.status,
        type:this.type
      }
      addMail(obj)
      .then(res => {
        console.log(res)
        if(res.data.error_code == 200){
          this.$message.success(res.data.message)
          this.dialogFormVisible = false
        }else{
            this.$message.error(res.data.data)
            this.dialogFormVisible = false
        }
      })
      }
    },
    //查寻
    search(){
      this.getdate()
    },
    //获取数据列表
    getdate(){
      let newobj = {
        status:this.statuslist,
        type:this.typelist
      }
      getMailList(newobj)
      .then(res => {
          console.log(res)
        this.date = res.data.data
      })
    }
  }
}
</script>

<style scoped>
.inputmessage{
  padding: 10px 20px
}
</style>
