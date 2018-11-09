<template>
    <div class="statistics">
       <p style="color:red;font-size:14px;">注：只显示当日注册的客户，加白不可随意更改！</p>
        <el-table
            :data="tableData"
            border
            style="width: 100%;">
            <el-table-column
                label="昵称"
                align="center">
                <template slot-scope="scope">
                    <span v-if="scope.row.username" @click="getupnewweb(scope.row.ACCOUNT)">{{scope.row.username}}</span>
                    <span v-else @click="getupnewweb(scope.row.ACCOUNT)">{{scope.row.ACCOUNT}}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="注册时间"
                align="center">
                <template slot-scope="scope">
                    {{scope.row.REGISTER_DATE_TIME | time}}
                </template>
            </el-table-column>
            <el-table-column
                label="最后登陆时间"
                align="center">
                <template slot-scope="scope">
                    {{scope.row.LAST_LOGIN_DATE_TIME | time}}
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                align="center">
                <template slot-scope="scope">
                    <el-button type="success" @click="addwhite(scope.row,'modify')" style="width:70px;height:30px;line-height:5px;"  v-if="scope.row.IS_WHITELIST === 1">加白</el-button>
                    <el-button type="primary" @click="deletewhite(scope.row,'modify')" style="width:70px;height:30px;line-height:5px;padding-left:10px;" v-if="scope.row.IS_WHITELIST === 0">设为非白</el-button>
                </template>
            </el-table-column>  
        </el-table>
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalList"
            v-if="totalList != ''">
        </el-pagination>
    </div>
</template>

<script>
import {
  findAllMember,
  memberToWrite,
  getHistoryClient,
  findAllMemberByLoginAcc
} from "@/api/customer";
import { Message, MessageBox } from "element-ui";
export default {
  data() {
    return {
      tableData: [],
      account: "",
      name: "",
      idcard: "",
      mobile: "",
      endTime: "",
      mobile: "",
      page: 1,
      pageSize: 20,
      startTime: "",
      username: "",
      type: "",
      totalList: 0,

      today: ""
    };
  },
  filters: {
    time(a) {
      if (a != null && a != "") {
        let date = new Date(a);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? "0" + MM : MM;
        let d = date.getDate();
        d = d < 10 ? "0" + d : d;
        let h = date.getHours();
        h = h < 10 ? "0" + h : h;
        let m = date.getMinutes();
        m = m < 10 ? "0" + m : m;
        let s = date.getSeconds();
        s = s < 10 ? "0" + s : s;
        return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
      }
    },
    mtype(a) {
      return a == 1 ? "否" : "是";
    },
    port(m) {
      return m == 1 ? "否" : "是";
    }
  },
  created() {
    this.gettablelist();
    this.getTodayDate();
  },
  methods: {
    //获取当前日期
    getTodayDate() {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      //   let h = date.getHours();
      //   h = h < 10 ? "0" + h : h;
      //   let min = date.getMinutes();
      //   min = min < 10 ? "0" + min : min;
      //   let s = date.getSeconds();
      //   s = s < 10 ? "0" + s : s;
      this.today = y + "-" + m + "-" + d;
    },
    //时间戳转日期
    time(a) {
      if (a != null && a != "") {
        let date = new Date(a);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? "0" + MM : MM;
        let d = date.getDate();
        d = d < 10 ? "0" + d : d;
        // let h = date.getHours();
        // h = h < 10 ? "0" + h : h;
        // let m = date.getMinutes();
        // m = m < 10 ? "0" + m : m;
        // let s = date.getSeconds();
        // s = s < 10 ? "0" + s : s;
        return y + "-" + MM + "-" + d;
      }
    },
    //获取表格数据
    // gettablelist() {
    //   let obj = {
    //     account: this.account,
    //     end_time: this.endTime,
    //     mobile: this.mobile,
    //     page: this.page,
    //     pageSize: this.pageSize,
    //     start_time: this.startTime,
    //     username: this.username,
    //     realName: this.name,
    //     type: this.type,
    //     identifyId: this.idcard,
    //     mobile: this.mobile
    //   };
    //   findAllMember(obj)
    //     .then(res => {
    //       if (res.data.error_code === 200) {
    //         this.tableData = res.data.data.list;
    //         this.totalList = res.data.data.total;
    //       } else {
    //         this.$message.error(res.data.message);
    //       }
    //     })
    //     .catch(error => {
    //       Message.error(error);
    //     });
    // },

    gettablelist() {
      let obj = {
        account: "",
        identifyId: "",
        loginAccount: this.$store.state.user.name,
        mobile: "",
        page: this.page,
        pageSize: this.pageSize,
        realName: "",
        username: ""
      };
      findAllMemberByLoginAcc(obj).then(res => {
        if (res.data.error_code == 200) {
          this.totalList = res.data.data.total;
          this.tableData = res.data.data.list.filter(e => {
            // console.log(this.time(e.REGISTER_DATE_TIME));
            return this.today === this.time(e.REGISTER_DATE_TIME);
          });
          this.totalList = this.tableData.length;
          this.$message.success(res.data.message);
        } else {
          this.totalList = "";
          this.tableData = [];
          this.$message.error(res.data.message);
        }
      });
    },

    //加白
    addwhite(data) {
      this.account = data.ACCOUNT;
      this.type = 1;
      memberToWrite(this.account, this.type).then(res => {
        if (res.data.error_code === 200) {
          this.account = "";
          this.gettablelist();
          Message.success("加白成功");
        } else {
          Message.error(res.data.message);
        }
      });
    },
    //取消加白
    deletewhite(data) {
      this.account = data.ACCOUNT;
      this.type = 2;
      memberToWrite(this.account, this.type).then(res => {
        if (res.data.error_code === 200) {
          this.account = "";
          this.gettablelist();
          Message.success("取消加白成功");
        } else {
          Message.error(res.data.message);
        }
      });
    },
    //翻页
    handleCurrentChange(num) {
      this.page = num;
      this.gettablelist();
    },
    //改变页面大小
    handleSizeChange(num) {
      this.pageSize = num;
      this.gettablelist();
    }
  }
};
</script>

<style>
.statistics {
  padding: 10px 20px;
}
</style>