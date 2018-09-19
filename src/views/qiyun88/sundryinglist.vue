<template>
    <div class="Sunburn">
        <div class="box">
            <el-input v-model="account" placeholder="请输入用户名" style="width: 180px;" @input="search"></el-input>
            <el-input v-model="number" placeholder="请输入方案编号" style="width: 180px;margin-left:30px;" @input="search"></el-input>
            <el-select v-model="status" placeholder="请选择状态筛选" style="width: 180px;margin-left:30px;" @change="changestatus">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.lable"
                :value="item.value">
                </el-option>
            </el-select>
            <el-select v-model="type" placeholder="请选择类型筛选" style="width: 180px;margin-left:30px;" @change="changetype">
                <el-option
                
                v-for="item in types"
                :key="item.value"
                :label="item.lable"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" style="margin-left:30px;" @click="search">搜索</el-button>
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
            <!-- <el-table-column
                prop="author"
                label="作者"
                align="center">
            </el-table-column> -->
            <el-table-column
                prop="title"
                label="内容" align="center">
            </el-table-column>
            <el-table-column
                label="点赞数" align="center">
                <template slot-scope="scope">
                    {{scope.row.goodCount }}
                </template>    
            </el-table-column>
            <el-table-column
                label="方案号" align="center">
                <template slot-scope="scope">
                    {{scope.row.planNo }}
                </template>    
            </el-table-column>
            <el-table-column
                label="状态" align="center">
                <template slot-scope="scope">
                    {{scope.row.status| staus}}
                </template>    
            </el-table-column>
            <el-table-column
                label="类别" align="center">
                <template slot-scope="scope">
                    {{scope.row.type| stype}}
                </template>    
            </el-table-column>
             <el-table-column
                label="创建时间" align="center">
                <template slot-scope="scope">
                    {{scope.row.createDateTime}}
                </template>    
            </el-table-column>
            <el-table-column
                label="操作" align="center" width="220px;">
                <template slot-scope="scope">
                    <div v-if="scope.row.type==1">
                        <!-- <el-button type="primary" size="mini" @click="adopt(scope.row.id)">通过</el-button>
                        <el-button type="danger" size="mini" @click="reject(scope.row.id)">驳回</el-button> -->
                        <el-button type="default" size="mini" @click="stashow(scope.row.status,scope.row.id)">状态</el-button>
                    </div>
                    <div v-else>
                        <el-button type="primary" size="mini" @click="adopt(scope.row.id)">通过</el-button>
                        <el-button type="danger" size="mini" @click="reject(scope.row.id)">驳回</el-button>
                        <el-button type="default" size="mini" @click="stashow(scope.row.status,scope.row.id)">状态</el-button>
                    </div>
                </template>    
            </el-table-column>
        </el-table>
        <!-- 状态的弹窗 -->
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
import { getPlanShow,updatePlanShowStatus,passShowPlanApply } from '@/api/sunburn'
export default {
  data() {
    return {
      radio: "",// 选中的checkbox,
      id:'',// 那一条数据
      tablelist: [], // 表格数据
      account: "", // 用户名
      number: "", //编号
      status: "",
      total: 0,
      page:1,
      pageSize:20,
      dialogShenVisible: false,
      options: [
        { value: "", lable: "全部" },
        { value: "0", lable: "隐藏" },
        { value: "1", lable: "显示" }
      ],
      type: "",
      types: [
        { value: "", lable: "全部" },
        { value: "0", lable: "待审核" },
        { value: "1", lable: "已审核" },
        { value: "2", lable: "被驳回" }
      ]
    };
  },
  filters: {
    createDateTime(a) {
      return new Date(a).toLocaleDateString().replace(/\//g, "-");
    },
    staus(a) {
      return a ? "显示" : "隐藏";
    },
    stype(a) {
      if (a == 0) {
        return "待审核";
      } else if (a == 1) {
        return "已审核";
      } else {
        return "被驳回";
      }
    }
  },
  created() {
    this.getTable();
  },
  methods: {
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
    // 状态的回调
    stashow(a,b) {
      // console.log(typeof a)
      this.radio = String(a);
      this.id = b
      this.dialogShenVisible = true;
    },
    // 弹窗的确定回调
    sure() {
      let obj = {
        id: this.id,
        status: this.radio
      }
       updatePlanShowStatus(obj)
        .then(res => {
            console.log(res.status)
          if (res.status == 200) {
            if (res.data.error_code == 200) {
              this.$message(res.data.message);
              this.dialogShenVisible = false;
              this.getTable();
            } else {
              this.$message(res.data.message);
            }
          }
        });
    },
     // 通过审核回调
    adopt(id) {
      let model = {
        id: id,
        type: 1
      };
       passShowPlanApply(model)
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            if (res.data.error_code == 200) {
              this.$message(res.data.message);
              this.getTable();
            } else {
              this.$message(res.data.message);
            }
          }
        });
    },  
    // 驳回的回调
    reject(id) {
      let model = {
        id: id,
        type: 2
      };
      passShowPlanApply(model)
        .then(res => {
          console.log(res);
          if (res.status == 200) {
            if (res.data.error_code == 200) {
              this.$message(res.data.message);
              this.getTable();
            } else {
              this.$message(res.data.message);
            }
          }
        });
    },
    // 筛选回调
    search() {
        this.page = 1
        this.getTable();
    },
    // 类型选中后的回调
    changetype() {
        this.page = 1
        this.getTable();
    },
    // 状态选中的回调
    changestatus() {
     // console.log(this.status)
       this.getTable();
    },
    //获取列表数据
    getTable() {
      let model = {
        account: this.account || "",
        page: this.page,
        pageSize: this.pageSize,
        planNo: this.number || "",
        status: this.status || "",
        type: this.type || ""
      };
      getPlanShow(model)
        .then(res => {
            // console.log(res.status);
          if (res.status == 200) {
            this.tablelist = res.data.data            
          }
        });
    }
  }
};
</script>

<style scoped>
.Sunburn{
    padding: 10px 20px
}
.box {
  padding: 10px 0;
}
</style>