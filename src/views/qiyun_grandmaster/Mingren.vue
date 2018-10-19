<template>
    <div class="mingren">
        <div class="rowm">
            <el-button type="primary" @click="addming">添加认证名人</el-button>
        </div>
        <!-- 名人的弹窗 -->
        <el-dialog title="添加名人" :visible.sync="dialogFormVisible" width="500px" top="30vh">
            <el-form :model="form" :rules="rules" ref="ruleForm">
                <el-form-item label="用户昵称" :label-width="formLabelWidth" prop="username">
                    <el-input v-model="form.username" style="width:70%" clearable></el-input>
                </el-form-item>
                <el-form-item label="排序权重" :label-width="formLabelWidth" prop="sort">
                    <el-input v-model="form.sort" style="width:70%" type="number"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
            </div>
        </el-dialog>
        <!-- 名人列表 -->
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
                type="index"
                align="center"
                label="编号">
            </el-table-column>
            <el-table-column
                prop="account"
                align="center"
                label="账户名">
            </el-table-column>
            <el-table-column
                align="center"
                width="60px"
                label="头像">
               <template slot-scope="scope">
                  <img :src="'https://qyun88.oss-cn-hangzhou.aliyuncs.com/member/'+scope.row.picture " style="width:100%">
               </template> 
            </el-table-column>
            <el-table-column
                prop="userName"
                align="center"
                label="昵称">
            </el-table-column>
            <el-table-column
                label="操作"
                align="center">
                <template slot-scope="scope">
                    <el-button type="danger" @click="delMing(scope.row.account)">取消认证名人</el-button>
                    <el-button type="default" @click="Modifysort(scope.row.account)">修改排序权重</el-button>
                </template>    
            </el-table-column>
        </el-table>
        <!-- 权重排序的弹窗 -->
        <el-dialog title="名人排序" :visible.sync="dialogMingVisible" width="500px" top="30vh">
            <div class="body">
                <el-row>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-dark">
                            <label for="">用户名</label>
                        </div>
                    </el-col>
                    <el-col :span="17">
                        <div class="grid-content bg-purple-dark">
                             <el-input v-model="account" placeholder="请输入用户名" disabled="disabled" clearable></el-input>
                        </div>
                    </el-col>
                </el-row>
                <br>
                <el-row>
                    <el-col :span="4">
                        <div class="grid-content bg-purple-dark">
                            <label for="">排序权重</label>
                        </div>
                    </el-col>
                    <el-col :span="17">
                        <div class="grid-content bg-purple-dark">
                             <el-input v-model="numbers" placeholder="请输入最多4位数字" type="number"></el-input>
                        </div>
                    </el-col>
                </el-row> 
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogMingVisible = false">取 消</el-button>
                <el-button type="primary" @click="sortl">确定</el-button>
            </div>
        </el-dialog>
        <!-- 分页 -->
       <div class="page">
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="currentPage"
                :total="total"
                v-if="total != ''">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { changeSort,getMasterList,addMaster,cancelMaster } from '@/api/grandmaster'
export default {
  data() {
    return {
      tableData: [],
      total:0,
      account:'', // 用户名
      numbers:'', //排序号
      dialogFormVisible: false,
      dialogMingVisible:false, // 权重的弹窗
      form: {
          username:'',
          sort:''
      },
      rules:{
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            // 
          ],
          sort:[
            { min: 1, max: 4, message: '长度在 1 到 4 个字符', trigger: 'blur' }
          ]
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    this.getTbale(1);
  },
  methods: {
    // 获取表格数据
    getTbale(curr) {
      let obj = {
        offset: curr,
        pageSize: 20
      };
     getMasterList(obj)
        .then(res => {
          if (res.status == 200) {
            if (res.data.data.list && res.data.data.list.length > 0) {
              this.tableData = res.data.data.list;
              this.total = res.data.data.total
            }
          }
        });
    },
    // 添加名人
    addming() {
       this.dialogFormVisible = true 
    },
    // 按钮的确定回调
    submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.AddGreatGod();
            this.dialogFormVisible = false;
            this.form.username = ''
            this.form.sort = ''
            this.getTbale(1)
          } else {
            return false;
          }
        });
      },
    //   分页的回调
    currentPage(val){
        this.getTbale(val)
    },
    // 将瞬狙保存到接口
    AddGreatGod() {
      let obj = {
        account: this.form.username,
        sort: this.form.sort||0
      };
      addMaster(obj)
        .then(res => {
          if (res.status == 200) {
            if (res.data.error_code == 200) {
              this.$message(res.data.message);
              this.getTbale(1)
            } else {
              this.$message(res.data.message);
            }
          }
        });
    },
    // 取消名人
    delMing(a) {
      let obj = {
        account: a,
      };
      cancelMaster(obj)
        .then(res => {
          if (res.status == 200) {
            if (res.data.error_code == 200) {
              this.$message(res.data.message);
              this.getTbale(1)
            } else {
              this.$message(res.data.message);
            }
          }
        });
    },
    // 排序的权重
    Modifysort(a){
        this.account = a
        this.dialogMingVisible = true
    },
    sortl(){
        if(!this.numbers){
            this.$message('不能为空！')
        }else if(this.numbers.length > 4){
            this.$message('长度不能超过4位')            
        }else{
            let obj= {
                account: this.account,
                sort:this.numbers
            }
            changeSort(obj)
                .then(res => {
                if (res.status == 200) {
                    if (res.data.error_code == 200) {
                        this.$message(res.data.message);
                        this.dialogMingVisible = false
                        this.getTbale(1)
                    } else {
                        this.$message(res.data.message);
                    }
                }
            });
        }

    }
  }
};
</script>

<style scoped>
div.rowm {
  padding: 10px 0;
}
</style>