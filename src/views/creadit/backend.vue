<template>
	<div class="backend app-container">
		<div class="search">
			<el-input v-model="input1" placeholder="请输入会员名" style="width:20%;" clearable></el-input>
			<el-input v-model="input2" placeholder="请输入昵称" style="width:20%;" clearable></el-input>
			<el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
		</div>
		<el-table :data="tableData" border style="width: 100%;" show-summary>
            <el-table-column type="index" align="center" label="编号"></el-table-column>
            <el-table-column prop="account" label="会员名" align="center" width="180"></el-table-column>
            <el-table-column prop="username" label="昵称" align="center" width="180"></el-table-column>
            <el-table-column align="center" label="授信值">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.creditLimit" placeholder="请输入内容" clearable></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="ableCreditBalance" align="center" label="当前可用金额"></el-table-column>
            <el-table-column prop="freezeCreditBalance" align="center" label="冻结金额">
              <template slot-scope="scope">
                <p v-if="scope.row.freezeCreditBalance > 0" style="color:red;">{{scope.row.freezeCreditBalance}}</p>
                <p v-else>{{scope.row.freezeCreditBalance}}</p>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="shouxin(scope.row)">授信</el-button>
                </template>
            </el-table-column>
		</el-table>
		<!-- 分页 -->
    <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalList"
            v-if="totalList != ''"
            style="margin-top:40px">
    </el-pagination>

		<!-- 弹窗事件 -->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
			<div>
				<p>会员名：{{ username }}</p>
				<p>额度：{{ money }}</p>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="makersure">确 定</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
import { getCreditMember, credit } from "@/api/sys_user";
import { findAllMember } from "@/api/customer";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message } from "element-ui";
import treeTable from "@/components/TreeTable";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";

export default {
  data() {
    return {
      obj: "", //每一行的数据
      input1: "",
      currentPage: 0,
      totalList: 0, //总页数
      dialogVisible: false,
      tableData: [], //表格数据
      username: "", //会员名
      money: "", //额度
      totalMoney: "", //总计可用金额
      totalFree: "", //总计冻结金额
      input2: "", //输入查询的昵称

      page: 1,
      pageSize: 20
    };
  },

  created() {
    this.getData("");
  },
  methods: {
    newInput() {
      //搜索值为空时 调用所有数据
      if (this.input1 == "") {
        this.getData(this.input1);
      }
    },
    //查询
    search() {
      if (!this.input1 && !this.input2) {
        this.$message("请输入您要查询的账号或昵称！");
      } else {
        if (this.input1 === "") {
          this.getAccount();
        } else {
          this.getData(this.input1);
        }
      }
    },
    //用昵称查询账号
    getAccount() {
      let obj = {
        username: this.input2
      };
      findAllMember(obj).then(res => {
        this.input1 = res.data.data.list[0].ACCOUNT;
        this.getData(this.input1);
      });
    },
    //   授信的点击事件
    shouxin(a) {
      this.dialogVisible = true;
      this.obj = a;
      // 获取授信代理用户名
      this.username = a.account;
      // 获取授信额度
      this.money = a.creditLimit;
      // 获取操作人
    },
    // 弹窗的确定回调
    makersure() {
      this.dialogVisible = false;
      let oper = getCookies("name"); //假设admin账户
      this.clickCreadit(this.obj.account, this.obj.creditLimit, oper);
    },
    // 获取全部数据
    getData(a) {
      let obj = {
        page: this.page,
        pageSize: this.pageSize,
        loginAccount: getCookies("name"),
        account: a
      };
      getCreditMember(obj).then(res => {
        if (res.status == 200) {
          if (res.data.data.list) {
            this.tableData = res.data.data.list;
            this.totalList = res.data.data.total;
            let total = 0;
            let free = 0;
            this.tableData.forEach(e => {
              // 全部可用金额
              total += e.ableCreditBalance;
              // 全部冻结金额
              free += e.freezeCreditBalance;
              this.totalMoney = total;
              this.totalFree = free;
            });
          }
        }
      });
    },
    //获取授信值不为零的数据
    // getNoZero(curr, a) {
    //   let obj = {
    //     page: curr,
    //     pageSize: 20000,
    //     loginAccount: getCookies("name"),
    //     account: a
    //   };
    //   getCreditMember(obj).then(res => {
    //     if (res.status == 200) {
    //       if (res.data.data.list) {
    //         let arr = [];
    //         arr = res.data.data.list;
    //         let total = 0;
    //         let free = 0;
    //         for (var i = 0; i < arr.length; i++) {
    //           // 全部可用金额
    //           total += arr[i].ableCreditBalance;
    //           // 全部冻结金额
    //           free += arr[i].freezeCreditBalance;
    //           this.totalMoney = total;
    //           this.totalFree = free;
    //           console.log(arr[i].creditLimit != 0);
    //           if (arr[i].creditLimit != 0) {
    //             this.tableData.push(arr[i]);
    //           }
    //         }
    //         this.total = this.tableData.length;
    //       }
    //     }
    //   });
    // },
    handleCurrentChange(val) {
      this.page = val;
      this.getData("");
    },
    //改变页面大小
    handleSizeChange(num) {
      this.pageSize = num;
      this.getData("");
    },

    // 点击授信按钮调接口数据
    clickCreadit(a, b, c) {
      let creadit = { account: a, creditLimit: b, operater: c };
      credit(creadit).then(res => {
        if (res.data.success == false) {
          Message.success(res.data.msg);
          return;
        } else {
          this.getData(1, this.input1);
          Message.success("授信成功！");

          // window.location.reload();
        }
      });
    },
    // 分页的回调
    changepage(val) {
      this.getData(val);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.backend {
  .search {
    padding: 10px 0;
  }
  .page {
    margin-top: 10px;
    float: right;
  }
  .moneyadd {
    line-height: 60px;
    font-size: 14px;
    span {
      color: #f60;
      font-size: 16px;
      padding: 5px;
    }
  }
}
</style>
