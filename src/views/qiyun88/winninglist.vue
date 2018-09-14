<template>
    <div class="Sunburn">
        <div class="box">
            <el-select v-model="status" placeholder="请选择状态筛选" style="width: 180px;margin-left:30px;" @change="changestatus">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.lable"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" size="mini" @click="adopt" style="margin-left:100px;">发起中奖宣传</el-button>
        </div>
        <!-- 表格数据 -->
        <el-table
            :data="tablelist"
            border
            style="width: 100%">
            <el-table-column
                prop="account"
                label="用户名" align="center">
            </el-table-column>
            <el-table-column
                prop="title"
                label="标题" align="center">
            </el-table-column>
            <el-table-column
                label="内容" align="center">
                <template slot-scope="scope">
                     <!-- <el-button type="text" @click="open">点击打开 Message Box</el-button> -->
                     <el-collapse>
                     <el-collapse-item title="查看详细内容" name="2">
                        {{scope.row.content}} 
                    </el-collapse-item>
                     </el-collapse>
                      <!-- <el-dialog
                    :visible.sync="centerDialogVisible"
                    width="30%"
                    style="height:500px"
                    center>
                       
                    </el-dialog> -->
                </template>  
            </el-table-column>
            <el-table-column
                label="创建时间" align="center">
                <template slot-scope="scope">
                    {{scope.row.createTime | createDateTime }}
                </template>    
            </el-table-column>
            <el-table-column
                label="状态" align="center">
                <template slot-scope="scope">
                    {{scope.row.status| staus}}
                </template>    
            </el-table-column>
            <el-table-column
                label="操作" align="center" width="220px;">
                <template slot-scope="scope">
                    <div>
                        <el-button type="danger" size="mini" @click="prizestatus(scope.row.id,scope.row.status)">编辑状态</el-button>
                    </div>
                </template>    
            </el-table-column>
        </el-table>
        <!-- 中奖状态状态的弹窗 -->
        <el-dialog title="状态" :visible.sync="dialogShenVisible" width="500px" top="30vh">
            <div class="body">
               <el-radio v-model="radio" label="0" border>隐藏</el-radio>
               <el-radio v-model="radio" label="1" border>显示</el-radio>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogShenVisible = false">取 消</el-button>
                <el-button type="primary" @click="sure">确定</el-button>
            </div>
        </el-dialog>
        <!-- 中奖宣传的弹窗 -->
        <el-dialog title="中奖宣传" :visible.sync="dialogVisible" width="610px" top="30vh" class="win">
            <div class="body">
                <el-row>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-dark">
                            <label for="">用户名</label>
                        </div>
                    </el-col>
                    <el-col :span="17">
                        <div class="grid-content bg-purple-dark">
                             <el-input v-model="useracount"></el-input>
                        </div>
                    </el-col>
                </el-row>
                <br>
                <el-row>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-dark">
                            <label for="">宣传标题</label>
                        </div>
                    </el-col>
                    <el-col :span="17">
                        <div class="grid-content bg-purple-dark">
                             <el-input v-model="titles" placeholder="请输入标题语"></el-input>
                        </div>
                    </el-col>
                </el-row> 
                <br>
                <el-row>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-dark">
                            <label for="">宣传内容</label>
                        </div>
                    </el-col>
                    <el-col :span="17">
                        <div class="grid-content bg-purple-dark">
                            <el-input type="textarea" v-model="cont"></el-input>
                        </div>
                    </el-col>
                </el-row> 
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="plasure">确定</el-button>
            </div>
        </el-dialog>
        <!-- 分页 -->
        <div class="page">
           <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { getWinPromotion,addWinPromotion,updateWinPromotionStatus } from '@/api/sunburn'
export default {
  data() {
    return {
      radio: '',
      tablelist: [
        {
          id: 1,
          account: 'aj154578545',
          title: '你好啊',
          content: '我是一直与',
          createTime: '2018-5-14',
          status: 1,
        }
      ], // 表格数据
      dialogShenVisible: false,
       centerDialogVisible:false,
      dialogVisible: false,
      useracount: '', // 选中的用户名
      titles: '', // 中奖标题
      cont: '', // 中奖内容
      total: 0,
      status: '',
      page:1,
      pageSize:20,
      options: [
        { value: '', lable: '全部' },
        { value: '0', lable: '隐藏' },
        { value: '1', lable: '显示' }
      ]
    }
  },
  filters: {
    createDateTime(a) {
      return new Date(a).toLocaleDateString().replace(/\//g, '-')
    },
    staus(a) {
      return a ? '显示' : '隐藏'
    }
  },
  created() {
    this.getTable()
  },
  methods: {
      open(){
          this.centerDialogVisible = true
          console.log(123)
      },
    // 发起中奖宣传
    publicity(a) {
      this.dialogVisible = true
      this.useracount = a
    },
    // 发起中间宣传
    adopt() {
      // this.useracount = a
      this.dialogVisible = true
    },
    // 编辑状态
    prizestatus(id, b) {
      this.id = id
      this.radio = String(b)
      this.dialogShenVisible = true
    },
    // 确定的回调
    sure() {
      let obj = {
        id: this.id,
        status: this.radio
      }
      console.log(obj)
      updateWinPromotionStatus(obj)
        .then(res => {
          if (res.status == 200) {
            if (res.data.error_code == 200) {
              this.$message(res.data.message)
              this.dialogShenVisible = false
              this.getTable()
            } else {
              this.$message(res.data.message)
            }
          }
        })
    },
    // 中奖宣传的确定按钮回调
    plasure() {
      let model = {
        account: this.useracount,
        content: this.cont || '',
        title: this.titles || ''
      }
      addWinPromotion(model)
        .then(res => {
          if (res.status == 200) {
            if (res.data.error_code == 200) {
              this.$message(res.data.message)
              this.dialogVisible = false
              this.getTable()
            } else {
              this.$message(res.data.message)
            }
          }
        })
    },
     //翻页
        handleCurrentChange(num){
            this.page = num;
            this.getTable()
        },
        //改变页面大小
        handleSizeChange(num){
            this.pageSize = num;
            this.getTable()
        },
    // 状态选中的回调
    changestatus() {
      this.getTable()
    },
    getTable() {
      let model = {
        page: this.page,
        pageSize: this.pageSize,
        status: this.status || ''
      }
      getWinPromotion(model)
        .then(res => {
          if (res.status == 200) {
            this.tablelist = res.data.data.list
            this.total = res.data.data.total
          }
        })
    }
  }
}
</script>

<style scoped>
.win >>> .el-textarea__inner{
    height: 250px;
}
.Sunburn{
    padding: 10px 20px
}
.box {
  padding: 10px 0;
}
</style>