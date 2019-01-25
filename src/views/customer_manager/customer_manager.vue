<template>
    <div class="manager">
        <div class="search">
            账号：<el-input v-model="account" placeholder="请输入账号" style="width: 150px;margin-right:100px;margin-top:40px" clearable></el-input>
            昵称：<el-input v-model="username" placeholder="请输入昵称" style="width: 150px;margin-right:100px;margin-top:40px" clearable></el-input>
            姓名：<el-input v-model="name" placeholder="请输入姓名" style="width: 150px;margin-right:100px;margin-top:40px" clearable></el-input>
            身份证：<el-input v-model="idcard" placeholder="请输入身份证号" style="width: 150px;margin-right:100px;margin-top:40px" clearable></el-input>
            电话：<el-input v-model="mobile" placeholder="请输入电话" style="width: 150px;margin-right:250px;margin-top:20px" clearable></el-input>
            开始时间：
            <el-date-picker
                v-model="start_time"
                type="datetime"
                style="margin-bottom:40px;margin-right:20px;width:200px"
                placeholder="请选择开始日期"
                value-format="yyyy-MM-dd HH:mm:ss">
            </el-date-picker>
            结束时间：
            <el-date-picker
                v-model="end_time"
                align="right"
                value-format="yyyy-MM-dd HH:mm:ss"
                default-time="23:59:59"
                type="datetime"
                style="margin-left:10px;
                width:200px
                margin-bottom:40px;"
                placeholder="请选择结束日期">
            </el-date-picker>
            <el-button type="primary" @click="inquire" @keyup.13="getone" style="margin-left:100px;margin-bottom:40px;margin-top:40px">查询</el-button>
        </div>
        <p style="font-size:12px;color:red;">注：点击昵称可以跳转到钱包信息查询页面</p>
        <div class="show_data">
            <el-table
                :data="tableData"
                border
                style="width: 100%;">
                <el-table-column
                    type="index"
                    align="center"
                    label="编号">
                </el-table-column>
                <el-table-column
                    label="昵称"
                    align="center">
                    <template slot-scope="scope">
                        <span v-if="scope.row.username" @click="getupnewweb(scope.row.ACCOUNT)">{{scope.row.username}}</span>
                        <span v-else @click="getupnewweb(scope.row.ACCOUNT)">{{scope.row.ACCOUNT}}</span>
                    </template>
                </el-table-column> 
                <el-table-column
                    label="真实姓名"
                    prop="NAME"
                    align="center">
                </el-table-column>
                <el-table-column
                    label="注册时间"
                    prop="registerDateTime"
                    align="center">
                    <template slot-scope="scope">
                        {{scope.row.registerDateTime}}
                    </template>
                </el-table-column>    
                <el-table-column
                    label="最后登陆时间"
                    align="center">
                    <template slot-scope="scope">
                        {{scope.row.lastLoginDateTime}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="是否充值"
                    align="center">
                    <template slot-scope="scope">
                        {{scope.row.IS_CHARGE | isRecharge}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="是否白名单"
                    align="center">
                    <template slot-scope="scope">
                        {{scope.row.isWhitelist | white}}
                    </template>
                </el-table-column>
                <el-table-column
                    label="状态"
                    align="center">
                    <template slot-scope="scope">
                        {{scope.row.STATUS |use }}
                    </template>
                </el-table-column>          
                <el-table-column
                    label="类型"
                    align="center">
                    <template slot-scope="scope">
                        {{scope.row.type |status }}
                    </template>
                </el-table-column>  
                <el-table-column
                    label="操作"
                    align="center">
                    <template slot-scope="scope">
                        <el-dropdown trigger="click">
                            <el-button type="primary" style="width:70px">操作<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-popover
                                    placement="right"
                                    width="340"
                                    trigger="click">
                                        <el-form :model="form">
                                            <el-form-item label="真实姓名">
                                                    <el-input v-model="form.name" auto-complete="off" style="width:60%" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="邮箱">
                                                    <el-input v-model="form.email" auto-complete="off" style="width:60%" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="联系电话">
                                                <el-input v-model="form.mobile" auto-complete="off" style="width:60%" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="身份证">
                                                    <el-input v-model="form.certNo" auto-complete="off" style="width:60%" clearable></el-input>
                                            </el-form-item>
                                            
                                            <el-form-item label="上级用户名">
                                                    <el-input v-model="form.agentAccount" auto-complete="off" style="width:60%" clearable></el-input>
                                            </el-form-item>
                                            <p style="color:red;font-size:14px;">注：当不知道上级用户名时可用昵称查询！</p>
                                            <el-form-item label="昵称">
                                                    <el-input v-model="searchUsername" auto-complete="off" style="width:60%" clearable></el-input>
                                                    <el-button type="primary" @click="search">查询</el-button>
                                            </el-form-item>
                                            <el-button type="primary" @click="xiugai(scope.row)">确 定</el-button>
                                        </el-form>
                                    <el-button slot="reference" @click="xiugaiKuang(scope.row)">修改</el-button>
                                </el-popover>
                                <el-popover
                                    placement="right"
                                    width="300"
                                    trigger="click">
                                    <el-form :v-model="walletData">
                                        <el-form-item label="可用金额">
                                                <el-input v-model="walletData.ableBalance" auto-complete="off" style="width:60%" :disabled="true" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="用户名">
                                                <el-input v-model="walletData.account" auto-complete="off" style="width:60%" :disabled="true" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="冻结金额">
                                                <el-input v-model="walletData.freezeBalance" auto-complete="off" style="width:60%" :disabled="true" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="历史消费金额">
                                                <el-input v-model="walletData.heapBalance" auto-complete="off" style="width:60%" :disabled="true" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="历史中奖金额">
                                                <el-input v-model="walletData.heapPrize" auto-complete="off" style="width:60%" :disabled="true" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="奖金账户">
                                                <el-input v-model="walletData.prizeBalance" auto-complete="off" style="width:60%" :disabled="true" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="可提现额度">
                                                <el-input v-model="walletData.takeCashQuota" auto-complete="off" style="width:60%" clearable></el-input>
                                            </el-form-item>
                                    </el-form>
                                    <el-button slot="reference" @click="wallet(scope.row)">钱包</el-button>
                                </el-popover>
                                <!-- 绑定银行卡信息 -->
                                <el-popover
                                    placement="right"
                                    width="300"
                                    trigger="click">
                                    <el-form :v-model="bankInfos">
                                        <el-form-item label="账号">
                                                <el-input v-model="bankInfos.account" auto-complete="off" style="width:60%" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="银行">
                                                <el-input v-model="bankInfos.bank" auto-complete="off" style="width:60%" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="银行卡号">
                                                <el-input v-model="bankInfos.bankCard" auto-complete="off" style="width:60%" clearable></el-input>
                                            </el-form-item>
                                            <el-form-item label="开户地区">
                                                <el-input v-model="bankInfos.bankPart" auto-complete="off" style="width:60%" clearable></el-input>
                                                <span style="color:red;"><br>格式：开户省份|开户城市|支行</span>
                                            </el-form-item>
                                            <el-button type="primary" @click="bankbinding(scope.row)">确 定</el-button>
                                    </el-form>
                                    <el-button type="warning" @click="bank(scope.row)" slot="reference">绑定银行</el-button>
                                </el-popover>
                                <el-button type="warning" @click="runningwater(scope.row)">流水</el-button>
                            </el-dropdown-menu>
                        </el-dropdown> 
                    </template>
                </el-table-column> 
            </el-table>
            <div class="page">
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
            >
            </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import { validate } from '@/utils';
import { mapGetters } from "vuex";
import {
  findAllMember,
  memberToWrite,
  getMemberWalletByMemberId,
  getMemberInfoBack,
  getMemberWallet,
  bind,
  updateMemberInfoBack
} from "@/api/customer";
import { Message, MessageBox } from "element-ui";
import { getCookies } from "@/utils/cookies";
export default {
  data() {
    return {
      tableData: [],
      walletData: [], //存储钱包数据信息
      bankInfos: [], //存储银行数据信息
      dialogFormVisible: false,
      email: "",
      partner: "",
      visible2: false,
      isshow: false,
      //操作里的数据
      form: {
        //操作的修改框中的数据
        username: "", //昵称
        name: "", //真实姓名
        email: "", //邮箱
        mobile: "", //联系电话
        certNo: "", //身份证
        agentAccount: "", //上级用户名
        type: "" //会员类型
      },
      bank_type: "",
      totalList: 0,

      account: "", //账号
      end_time: "", //结束时间
      mobile: "", //手机号
      page: 1,
      pageSize: 20,
      start_time: "", //开始时间
      username: "", //昵称
      zhanghao: "", //通过这个账号查询银行信息
      name: "",
      idcard: "",
      zh: "", //支行
      city: "", //开户城市
      province: "", //开户省份

      searchUsername: "" //用昵称查询上级用户名
    };
  },
  computed: {
    ...mapGetters(["roles"]),
    routes() {
      return this.$router.options.routes;
    }
  },
  filters: {
    isRecharge(a) {
      return a === 0 ? "是" : "否";
    },
    type(cert) {
      return cert === 1 ? "身份证" : "";
    },
    white(whitest) {
      return whitest === 1 ? "否" : "是";
    },
    use(a) {
      return a === 0 ? "可用" : "";
    },
    status(studio) {
      if (studio === 0) {
        return "普通会员";
      } else if (studio === 1) {
        return "彩妍人员";
      } else {
        return "机器人";
      }
    }
  },
  created() {
    this.account = this.$route.query.account || "";
    this.gettablelist();
  },
  methods: {
    search() {
      this.getAccount();
    },
    //用昵称查询账号
    getAccount() {
      let obj = {
        username: this.searchUsername
      };
      findAllMember(obj).then(res => {
        this.form.agentAccount = res.data.data.list[0].ACCOUNT;
      });
    },
    //点击账号跳转会员管理页面
    getupnewweb(a) {
      // this.$router.push({
      //   path: "/detailsSearch/walletInformation",
      //   query: { account: a }
      // });
      let routeData = this.$router.resolve({
        path: "/detailsSearch/walletInformation",
        query: { account: a }
      });
      window.open(routeData.href, "_blank");
    },
    //点击修改按钮 跳出修改框
    xiugaiKuang(a) {
      this.form.username = a.username;
      this.form.email = a.EMAIL || "";
      this.form.name = a.NAME;
      this.form.mobile = a.MOBILE;
      this.form.certNo = a.CERT_NO;
      this.form.type = a.type;
      this.form.agentAccount = a.agentAccount || "";
    },
    xiugai(b) {
      let obj = {
        account: b.ACCOUNT,
        email: this.form.email,
        identifyId: this.form.certNo || "",
        realName: this.form.name || "",
        tel: this.form.mobile || "",
        upAccount: this.form.agentAccount || ""
      };
      //验证手机号码
      if(!validate.validateTelePhone(this.form.mobile)){
        this.$message('请输入正确的手机号码！')
      }
      // else if(!validate.validateEmail(this.form.email)){//验证邮箱格式
      //   this.$message('请输入正确的邮箱！')
      // }
      else{
        updateMemberInfoBack(obj).then(res => {
          if (res.data.error_code === 200) {
            this.$message.success(res.data.message);
            this.gettablelist();
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    inquire() {
      this.page = 1;
      this.pageSize = 20;
      this.gettablelist();
    },
    //获取表格数据
    gettablelist() {
      let obj = {
        account: this.account,
        end_time: this.end_time || "",
        mobile: this.mobile,
        page: this.page,
        pageSize: this.pageSize,
        start_time: this.start_time || "",
        username: this.username,
        realName: this.name,
        identifyId: this.idcard
      };
      findAllMember(obj)
        .then(res => {
          if (res.data.error_code === 200) {
            this.tableData = res.data.data.list;
            this.totalList = res.data.data.total;
          } else {
            Message.error(res.data.message);
          }
        })
        .catch(error => {
          Message.error(error);
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
    },
    //通过id获取钱包信息
    wallet(data) {
      let memberId = data.id;
      getMemberWalletByMemberId(memberId).then(res => {
        if (res.status === 200) {
          if (res.data.data && res.data.data != null) {
            this.walletData = res.data.data;
          } else {
            this.$message.error(res.data.msg);
          }
        }
      });
    },
    //通过账号获取绑定银行信息
    bank(data) {
      this.isshow = true;
      this.zhanghao = data.ACCOUNT;
      getMemberInfoBack(this.zhanghao).then(res => {
        if (res.data.data && res.data.data != null) {
          this.bankInfos = res.data.data;
        } else {
          this.bankInfos = "";
          this.$message.error("暂无绑定银行信息！");
        }
      });
    },
    //绑定银行确认
    bankbinding() {
      this.isshow = false;
      let arr = this.bankInfos.bankPart.split("|");
      this.province = arr[0]; //分割后第一个是省份
      this.city = arr[1]; //分割后第二个是城市
      this.zh = arr[2]; //分割后第三个是支行
      let bankfrom = {
        account: this.zhanghao,
        bank: this.bankInfos.bank,
        is_back: 0,
        bankCard: this.bankInfos.bankCard, //银行卡号
        bankPart: this.zh, //支行
        city: this.city, //开户城市
        province: this.province, //开户省份
        bank_type: 1
      };
      bind(bankfrom).then(res => {
        if (res.data.success === true) {
          this.$message.success(res.data.msg);
          this.gettablelist();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //点击按钮跳到流水查询页面
    runningwater(a) {
      // this.$router.push({
      //   path: "/detailsSearch/walletFlowquery",
      //   query: {
      //     account: a.ACCOUNT
      //   }
      // });

      let routeData = this.$router.resolve({
        path: "/detailsSearch/walletFlowquery",
        query: { account: a.ACCOUNT }
      });
      window.open(routeData.href, "_blank");
    }
  }
};
</script>

<style scoped>
.manager {
  padding: 10px 20px;
}
.walletshow {
  width: 80%;
  height: 80%;
  margin: 10% auto;
  border: 1px solid black;
  background: white;
  position: absolute;
  top: 20%;
  left: 15%;
}
.page {
  margin-top: 30px;
}
.el-dropdown {
  vertical-align: top;
}
.el-dropdown + .el-dropdown {
  margin-left: 15px;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>