<template>
   <div class="effectiveagent">
       <div class="btn">
            <el-button type="primary" @click="showAddNewStar">添加新星榜</el-button>      
       </div>
       <!-- 弹窗 -->
        <el-dialog
            title="添加新星榜"
            :visible.sync="dialogVisible"
            width="500px">
            <el-row>
                <el-col :span="4"><div class="grid-content bg-purple">
                    用户名
                </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-light">
                    <el-input v-model="username[0]" placeholder="请输入用户名" style="margin-bottom:20px;" clearable></el-input>
                    <el-input v-model="username[1]" placeholder="请输入用户名" style="margin-bottom:20px;" clearable></el-input>
                    <el-input v-model="username[2]" placeholder="请输入用户名" style="margin-bottom:20px;" clearable></el-input>
                    <el-input v-model="username[3]" placeholder="请输入用户名" style="margin-bottom:20px;" clearable></el-input>
                    <el-input v-model="username[4]" placeholder="请输入用户名" style="margin-bottom:20px;" clearable></el-input>
                    <el-input v-model="username[5]" placeholder="请输入用户名" style="margin-bottom:20px;" clearable></el-input>
                    <el-input v-model="username[6]" placeholder="请输入用户名" style="margin-bottom:20px;" clearable></el-input>
                    <el-input v-model="username[7]" placeholder="请输入用户名" style="margin-bottom:20px;" clearable></el-input>

                    <!-- <div v-for="val in username" :key="val.index">
                      <el-input  placeholder="请输入用户名" style="margin-bottom:20px;" clearable value="val"></el-input>
                    </div> -->
                </div></el-col>
            </el-row>
            <!-- <p class="toasts">注：一次输入多个用户时,请使用“英文逗号”隔开</p>
            <p class="toasts">（例如：香克斯,草小?,你热吗）</p> -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sure">确 定</el-button>
            </span>
            </el-dialog>

        <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
        prop="account"
        label="用户名"
        align="center"
        >
        </el-table-column>
        <el-table-column
            prop="username"
            label="昵称"
            align="center">
        </el-table-column>
        <el-table-column
            align="center"
            label="用户头像"
            >
            <template slot-scope="scope">
                <img :src="'https://qyun88.oss-cn-hangzhou.aliyuncs.com/member/'+scope.row.picture" alt="" width='50px;'>
            </template>
        </el-table-column>
        <el-table-column
            prop="bingoAmount"
            label="中奖率"
            align="center">
        </el-table-column>
        </el-table>
   </div>
</template>

<script>
import { getNewStar, addNewStar } from "@/api/sunburn";
export default {
  data() {
    return {
      tableData: [],
      username: [], //存储原先的昵称
      dialogVisible: false
    };
  },
  filters: {},
  created() {
    this.getTable();
  },
  methods: {
    // 获取表格数据
    getTable() {
      let dan = "";
      getNewStar(dan).then(res => {
        this.tableData = res.data.data;
        res.data.data.forEach(e => {
          this.username.push(e.username);
        });
      });
    },
    showAddNewStar() {
      this.dialogVisible = true;
    },
    sure() {
      let account = [];
      for (var i = 0; i < this.username.length; i++) {
        if (this.username[i] != "") {
          account.push(this.username[i]);
        }
      }
      console.log(account);

      let accounts = account.join(",");
      console.log(accounts);
      addNewStar(accounts).then(res => {
        if (res.data.error_code == 200) {
          this.username = [];
          this.$message.success(res.data.message);
          this.dialogVisible = false;
          this.getTable();
        } else {
          this.$message.error(res.message);
        }
      });
    }
  }
};
</script>

<style scoped>
.effectiveagent {
  padding: 10px 20px;
}
div.btn {
  padding-bottom: 0.5rem;
}
p.toasts {
  color: #f00;
  padding: 10px 0;
}
</style>