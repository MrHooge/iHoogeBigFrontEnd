<template>
    <div class="wallet">
        <div class="search">
            账号：<el-input v-model="account" placeholder="请输入账户" style="width: 150px;margin-right:40px;margin-bottom:20px;margin-top:40px" clearable></el-input>
            昵称：<el-input v-model="username" placeholder="请输入昵称" style="width: 150px;margin-right:40px;margin-bottom:20px;margin-top:40px" clearable></el-input>
            开始时间：<el-date-picker
            v-model="stime"
            type="datetime"
            style="margin-bottom:40px;margin-right:20px;width:200px"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
            
            结束时间：<el-date-picker
            v-model="etime"
            align="right"
            value-format="yyyy-MM-dd HH:mm:ss"
            default-time="23:59:59"
            type="datetime"
            style="margin-left:10px;
            width:200px
            margin-bottom:40px;"
            placeholder="请选择结束日期"
            >
            </el-date-picker>
            
            <el-select v-model="child_type"
			           placeholder="请选择筛选数据"
			           @change="filter"
                       style="width:11%">
				<el-option v-for="item in options1"
				           :key="item.child_type"
				           :label="item.label"
				           :value="item.child_type"
                           >
				</el-option>
               
			</el-select>
            <el-select v-model="child_type"
			           placeholder="请选择筛选数据"
			           @change="filter"
                       style="width:11%">
				<el-option v-for="item in options2"
				           :key="item.child_type"
				           :label="item.label"
				           :value="item.child_type"
                           >
				</el-option>
               
			</el-select>
            <el-select v-model="child_type"
			           placeholder="请选择筛选数据"
			           @change="filter"
                       style="width:11%">
				<el-option v-for="item in options3"
				           :key="item.child_type"
				           :label="item.label"
				           :value="item.child_type"
                           >
				</el-option>
               
			</el-select>
            <el-select v-model="child_type"
			           placeholder="请选择筛选数据"
			           @change="filter"
                       style="width:11%">
				<el-option v-for="item in options4"
				           :key="item.child_type"
				           :label="item.label"
				           :value="item.child_type"
                           >
				</el-option>
               
			</el-select>
            <el-select v-model="child_type"
			           placeholder="请选择筛选数据"
			           @change="filter"
                       style="width:11%">
				<el-option v-for="item in options5"
				           :key="item.child_type"
				           :label="item.label"
				           :value="item.child_type"
                           >
				</el-option>
               
			</el-select>
            <el-select v-model="child_type"
			           placeholder="请选择筛选数据"
			           @change="filter"
                       style="width:11%">
				<el-option v-for="item in options6"
				           :key="item.child_type"
				           :label="item.label"
				           :value="item.child_type"
                           >
				</el-option>
               
			</el-select>
            <el-select v-model="child_type"
			           placeholder="请选择筛选数据"
			           @change="filter"
                       style="width:18%">
				<el-option v-for="item in options7"
				           :key="item.child_type"
				           :label="item.label"
				           :value="item.child_type"
                           >
				</el-option>
               
			</el-select>
            <!-- <el-select v-model="type"
			           placeholder="请选择状态筛选数据"
			           @change="filter"
                       style="width:11%">
				<el-option v-for="item in options2"
				           :key="item.type"
				           :label="item.label"
				           :value="item.type"
                           >
				</el-option>
               
			</el-select> -->
            <el-button type="primary" @click="search" @keyup.13="getone" style="margin-left:100px;margin-bottom:40px;margin-top:40px">查询</el-button>
            <el-button type="success" @click="exportSome" style="margin-left:50px;">导出</el-button>
        </div>
        <div class="tablelist">
        <el-table :data="tableData" border style="width: 100%;">
            <!-- <el-table-column 
                label="编号"
                align="center"
                type="index"
                width="120px">
			</el-table-column> -->
            <el-table-column
                prop="wallet_Line_No"
                align="center"
                label="流水号">
            </el-table-column>
              <el-table-column
                prop="username"
                align="center"
                label="用户名">
               
            </el-table-column>
            <el-table-column
                prop="ACCOUNT"
                align="center"
                label="账号">
            </el-table-column>
            <el-table-column
                align="center"
                label="发生时间">
                <template slot-scope="scope">
                    {{scope.row.CREATE_DATE_TIME | time}}
                </template>
            </el-table-column>
            <el-table-column
                prop="PLAN_NO"
                align="center"
                label="方案号">           
            </el-table-column>
            <!-- <el-table-column
                prop="LOTTERY_TYPE"
                align="center"
                label="方案类型">
            </el-table-column> -->
            <el-table-column
                prop="LOTTERY_TYPE_NAME"
                align="center"
                label="方案类型说明">
            </el-table-column>
            <el-table-column
                prop="REMARK"
                align="center"
                label="流水描述">           
            </el-table-column>
            <el-table-column
                prop="AMOUNT"
                label="发生金额"
                align="center"
                width="180">
            </el-table-column>
            <el-table-column
                prop="ABLE_BALANCE"
                label="可用金额"
                align="center"
                width="180">
            </el-table-column>
            <el-table-column
                prop="TRANS_TYPE_NAME"
                align="center"
                label="发生类型">
            </el-table-column>
              <el-table-column
                prop="HEAP_BALANCE"
                align="center"
                label="历史消费">
            </el-table-column>
            <!-- <el-table-column
                prop="TRANS_TYPE"
                align="center"
                label="	发生类型说明">
            </el-table-column> -->
        </el-table>
        </div>
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
            style="margin-top:40px"
            >
            </el-pagination>
    </div>
</template>

<script>
import { findMemberWalletLineByAccount } from "@/api/customerDetails";
import { findAllMember } from "@/api/customer";
import { Message, MessageBox } from "element-ui";
import { exportExcle } from "@/api/sys_user";
export default {
  data() {
    return {
      newarr: [],
      isIndeterminate: true,
      newTableData: [],
      tableData: [],
      account: "",
      stime: "",
      etime: "",
      qdAccount: "",
      dlAccount: "",
      page: 1,
      pageSize: 20,
      child_type: "", //具体类型
      totalList: 0,
      username: "", //输入查询的昵称
      type: "", //显示类型
      options1: [
        { child_type: "1", label: "赠送" },
        { child_type: "-1001", label: "彩金扣除" },
        { child_type: "1001", label: "注册赠送" },
        { child_type: "1002", label: "充值赠送" },
        { child_type: "1003", label: "彩金卡赠送" },
        { child_type: "1004", label: "消费赠送" },
        { child_type: "1010", label: "合买发单赠送" },
        { child_type: "1015", label: "加奖赠送" },
        { child_type: "1020", label: "优惠赠送" }
      ],
      options2: [
        { child_type: "41", label: "发红包" },
        { child_type: "42", label: "抢红包" },
        { child_type: "43", label: "退还红包" }
        // { child_type: "1056", label: "返点佣金" },
        // { child_type: "2059", label: "发单佣金" },
        // { child_type: "2060", label: "跟单佣金" },
      ],

      options3: [
        { child_type: "2061", label: "复制跟单" },
        { child_type: "30", label: "消费" },
        { child_type: "31", label: "冻结" },
        { child_type: "32", label: "解冻" },
        { child_type: "34", label: "退款" },
        { child_type: "35", label: "返奖" },
        { child_type: "36", label: "提款" },
        { child_type: "37", label: "银行退单" },
        { child_type: "1056", label: "佣金" },
        { child_type: "2059", label: "收佣" },
        { child_type: "2060", label: "付佣" }
      ],
      options4: [
        { child_type: "0", label: "网上充值" },
        { child_type: "1000", label: "现金充值" },
        { child_type: "-1000", label: "冲正" },
        { child_type: "1017", label: "公司账号充值" },
        { child_type: "1018", label: "奖金补发" },
        { child_type: "2062", label: "授信充值" },
        { child_type: "2058", label: "线下充值" }
      ],

      options5: [
        { child_type: "2001", label: "基金款转入" },
        { child_type: "2002", label: "基金款转出" },
        { child_type: "2003", label: "基金清算" },
        { child_type: "1031", label: "单挑王" },
        { child_type: "2053", label: "彩金兑积分" },
        { child_type: "2054", label: "购买靓胆" },
        { child_type: "2055", label: "靓胆推荐" },
        { child_type: "2056", label: "靓胆支出" },
        { child_type: "2057", label: "靓胆收入" }
      ],
      options6: [
        { child_type: "1011", label: "积分兑换" },
        { child_type: "1009", label: "基金赠送" },
        { child_type: "1014", label: "追号套餐赠送" },
        { child_type: "3001", label: "话费充值" }
      ],
      options7: [
        { child_type: "2063", label: "QQ扫码充值//信付宝QQ扫码" },
        { child_type: "2064", label: "QQH5充值//信付宝QQH5" },
        { child_type: "2065", label: "快捷支付充值//信付宝快捷支付" },
        { child_type: "2066", label: "网银充值//信付宝网银" },
        { child_type: "2067", label: "快捷支付充值//易宝快捷支付" },
        { child_type: "2068", label: "支付宝充值//易宝支付宝" },
        { child_type: "2069", label: "微信充值//易宝微信" },
        { child_type: "2070", label: "支付宝充值//unPay支付宝" },
        { child_type: "2071", label: "微信充值//兴业微信" },
        { child_type: "2072", label: "快捷支付充值//连连快捷" }
      ]

      // options2: [
      // 	{ type: "0", label: "全部" },
      // 	{ type: "1", label: "支出" },
      //     { type: "2", label: "充值类型" },
      //     { type: "3", label: "消费类型" },
      //     { type: "4", label: "退款类型" },
      //     { type: "5", label: "奖金类型" },
      //     { type: "6", label: "赠送类型" },
      //     { type: "7", label: "提款" },
      //     { type: "8", label: "提款退单" },
      //     { type: "9", label: "其他" },
      //     { type: "10", label: "可提现" },
      // ],
    };
  },
  created() {
    if (this.$route.query.account) {
      this.account = this.$route.query.account;
    }
    this.inquire();
    this.getAll();
  },
  filters: {
    time(a) {
      if (a != null) {
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
    }
  },
  methods: {
    //筛选查询
    filter() {
      this.page = 1;
      this.inquire();
      this.getAll();
    },

    //获取数据
    inquire() {
      let wallerdata = {
        account: this.account,
        end_time: this.etime || "",
        start_time: this.stime || "",
        qdAccount: this.qdAccount,
        dlAccount: this.dlAccount,
        loginAccount: "manager",
        page: this.page,
        pageSize: this.pageSize,
        child_type: this.child_type,
        type: this.type
      };
      findMemberWalletLineByAccount(wallerdata)
        .then(res => {
          if (res.data.error_code === 200) {
            this.tableData = res.data.data.list;
            this.totalList = res.data.data.total;
            this.inquire();
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(error => {
          Message.error(error);
        });
    },
    //获取所有数据
    getAll() {
      let wallerdata = {
        account: this.account,
        end_time: this.etime || "",
        start_time: this.stime || "",
        qdAccount: this.qdAccount,
        dlAccount: this.dlAccount,
        loginAccount: "manager",
        page: this.page,
        pageSize: this.totalList, //获取总的数据
        child_type: this.child_type,
        type: this.type
      };
      findMemberWalletLineByAccount(wallerdata)
        .then(res => {
          if (res.data.error_code === 200) {
            this.newTableData = res.data.data.list;
            // this.totalList = res.data.data.total;
            // console.log(res.data.data.total);
          } else {
            this.$message.error(res.data.message);
          }
        })
        .catch(error => {
          Message.error(error);
        });
    },
    //查询
    search() {
      if (!this.account && !this.username) {
        this.page = 1;
        this.getAll();
        this.inquire();

        console.log(this.totalList);
      } else {
        if (this.account == "") {
          this.getAccount();
        } else {
          this.page = 1;
          this.inquire();
          this.getAll();
        }
      }
    },
    //用昵称查询账号
    getAccount() {
      let obj = {
        username: this.username
      };
      findAllMember(obj).then(res => {
        this.account = res.data.data.list[0].ACCOUNT;
        this.page = 1;
        this.inquire();
        this.getAll();
      });
    },
    //翻页
    handleCurrentChange(num) {
      this.page = num;
      this.inquire();
    },
    //改变页面大小
    handleSizeChange(num) {
      this.pageSize = num;
      this.inquire();
    },
    // changeTime(a) {
    //   if (a != null) {
    //     let date = new Date(a);
    //     let y = date.getFullYear();
    //     let MM = date.getMonth() + 1;
    //     MM = MM < 10 ? "0" + MM : MM;
    //     let d = date.getDate();
    //     d = d < 10 ? "0" + d : d;
    //     let h = date.getHours();
    //     h = h < 10 ? "0" + h : h;
    //     let m = date.getMinutes();
    //     m = m < 10 ? "0" + m : m;
    //     let s = date.getSeconds();
    //     s = s < 10 ? "0" + s : s;
    //     return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
    //   }
    // },
    export2Excel() {},
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    // 导出
    exportSome() {
      //   this.pageSize = this.totalList;
      //   this.inquire();
      //   this.getAll();
      let newobj;
      this.newTableData.forEach((e, index) => {
        newobj = {
          wallet_Line_No: e.wallet_Line_No, //流水号
          username: e.username, //用户名
          ACCOUNT: e.ACCOUNT, //账号
          CREATE_DATE_TIME: e.CREATE_DATE_TIME, //发生时间
          PLAN_NO: e.PLAN_NO, //方案号
          LOTTERY_TYPE_NAME: e.LOTTERY_TYPE_NAME, // 方案类型说明
          REMARK: e.REMARK, //流水描述
          AMOUNT: Number(e.AMOUNT).toFixed(2), //发生金额
          ABLE_BALANCE: Number(e.ABLE_BALANCE).toFixed(2), //可用金额
          TRANS_TYPE_NAME: e.TRANS_TYPE_NAME, //发生类型
          HEAP_BALANCE: Number(e.HEAP_BALANCE).toFixed(2) //历史消费
        };
        this.newarr.push(newobj);
      });
      var model = {
        listParams: JSON.stringify(this.newarr),
        title: "流水表"
      };

      exportExcle(model.listParams, model.title).then(res => {});
      require.ensure([], () => {
        const { export_json_to_excel } = require("../../vendor/Export2Excel");
        // const tHeader = ['编号', '日期', '开户数', '激活数', '消费数（个）', '竞彩（金额）', '自购（金额）', '跟单（金额）', '北单（金额）', '老足彩（金额）', '数字（金额）', '扣减（金额）', '佣金（金额）']; //对应表格输出的title
        const tHeader = [
          "流水号",
          "用户名",
          "账号",
          "发生时间",
          "方案号",
          "方案类型说明",
          "流水描述",
          "发生金额",
          "可用金额",
          "发生类型",
          "历史消费"
        ]; //对应表格输出的title
        // 对应表格输出的数据
        // const filterVal = ['index','date','accountNum','activeNum','allPayNum','allBuy', 'selfBuy', 'fllowBuy', 'beidan','laozhucai','shuzi','offer','commision'];
        const filterVal = [
          "wallet_Line_No",
          "username",
          "ACCOUNT",
          "CREATE_DATE_TIME",
          "PLAN_NO",
          "LOTTERY_TYPE_NAME",
          "REMARK",
          "AMOUNT",
          "ABLE_BALANCE",
          "TRANS_TYPE_NAME",
          "HEAP_BALANCE"
        ];
        const list = this.newTableData;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "流水表"); //对应下载文件的名字
      });
    }
  }
};
</script>

<style>
.wallet {
  padding: 10px 20px;
}
</style>
