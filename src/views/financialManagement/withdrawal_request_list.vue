<template>
	<!-- 提款申请 -->
	<div class="chongzhi app-container">
		<!-- 顶部筛选 -->
		<div class="topten">

			<el-row :gutter="20">
				<el-col :span="3">
					<div class="grid-content bg-purple">
						<el-input v-model="name"
						          placeholder="请输入查询的账号" clearable></el-input>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="grid-content bg-purple">
						<el-input v-model="flow_num"
						          placeholder="请输入查询流水ID" clearable></el-input>
					</div>
				</el-col>
				<el-col :span="2">
					<el-select v-model="value"
					           placeholder="请选择"
                               style="width:120px;">
						<el-option v-for="item in options1"
						           :key="item.value"
						           :label="item.label"
						           :value="item.value">
						</el-option>
					</el-select>
                    
				</el-col>
                <el-col :span="4">
                    <el-select v-model="status"
                            placeholder="请选择筛选数据"
                            @change="filter"
                            style="width:200px;">
                        <el-option v-for="item in options2"
                                :key="item.status"
                                :label="item.label"
                                :value="item.status"
                                >
                        </el-option>
                    
                    </el-select>
                </el-col>

				<el-col :span="8">
					<div class="block"
					     style="display: inline-block;">
						<el-date-picker v-model="value1"
						                type="datetime"
						                placeholder="选择日期"
						                value-format="yyyy-MM-dd HH:mm:ss">
						</el-date-picker>
					</div>
					至
					<div class="block"
					     style="display: inline-block;">
						<el-date-picker v-model="value2"
						                type="datetime"
						                placeholder="选择日期"
						                value-format="yyyy-MM-dd HH:mm:ss"
                                        default-time="23:59:59">
						</el-date-picker>
					</div>
				</el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="search">查询</el-button>
                </el-col>
                <!-- 搜索财务审核统计 -->
                <el-col :span="8">
                    <div style="height:40px;line-height:40px;margin-top:20px;">财务审核统计：{{financeCount}}<span style="font-size:12px;color:red;margin-left:20px;">注：默认是当天的已到账统计(有时间段就是时间段的统计数)</span></div>
                </el-col>
				<el-col :span="2">
					<div class="grid-content bg-purple" style="margin-top:20px;">
						<el-button type="primary"
						           icon="el-icon-search"
                                   @click="getCount">搜索
                        </el-button>
					</div>
				</el-col>
			</el-row>
		</div>
		<!-- 表格数据  -->
		<el-table :data="tableData"
		          border
		          style="width: 100%">
			<el-table-column label="流水号"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.id }}
				</template>
			</el-table-column>
			<el-table-column label="账号"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.account }}
				</template>
			</el-table-column>
			<el-table-column label="创建时间"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.create_Date_Time | changeTime}}
				</template>
			</el-table-column>
			<el-table-column label="金额"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.amount }}
				</template>
			</el-table-column>
			<el-table-column label="状态"
			                 align="center">
				<template slot-scope="scope">
					<span v-if="scope.row.STATUS === 6" style="color:green">{{ scope.row.STATUS | changeStatus}}</span>
                    <span v-else-if="scope.row.STATUS === 7" style="color:red">{{ scope.row.STATUS | changeStatus}}</span>
                    <span v-else>{{ scope.row.STATUS | changeStatus}}</span>
				</template>
			</el-table-column>
			<el-table-column label="开户支行"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.part_bank}}
				</template>
			</el-table-column>
            <el-table-column label="银行卡"
                             prop="bank_card"
                             width="200px;"
			                 align="center">
			</el-table-column>
			<el-table-column label="提款人"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.name}}
				</template>
			</el-table-column>
				<el-table-column label="汇款时间"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.send_date_time.substring(5)}}
				</template>
			</el-table-column>
			<!-- <el-table-column label="财务审核时间"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.FINANCE_DEAL_DATE_TIME }}
				</template>
			</el-table-column>
			<el-table-column label="客服审核时间	"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.deal_date_time }}
				</template>
			</el-table-column>

			

			<el-table-column label="个人手续费"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.drawing_Fee }}
				</template>
			</el-table-column>
			<el-table-column label="手续费负担方"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.fee_payer_belong }}
				</template>
			</el-table-column>
			<el-table-column label="优惠手续费(公司负担)"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.privilege_drawing_Fee}}
				</template>
			</el-table-column>
			<el-table-column label="手续费(用户支付)"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.show_drawing_Fee}}
				</template>
			</el-table-column>
			<el-table-column label="交易到账时间"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.confirm_date_time}}
				</template>
			</el-table-column> -->
			
			
			
			<!-- <el-table-column label="提款类型平台"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.PLATFORM}}
				</template>
			</el-table-column> -->
			
			<el-table-column label="操作"
			                 align="center">
				<template slot-scope="scope">
					<div style="padding:5px 0">
						<!-- <el-button v-if="scope.row.STATUS === 1"
						    type="primary"
						    @click="examine(scope.row)" v-if="scope.row.STATUS != 6 && scope.row.STATUS != 5 && scope.row.STATUS != 8">客服通过
                        </el-button> -->
						<el-button v-if="scope.row.STATUS === 1"
						    type="primary"
						    @click="examine(scope.row)">客服通过
                        </el-button>
						<el-button v-if="scope.row.STATUS === 7"
						    type="primary"
						    @click="examine(scope.row)">财务通过
                        </el-button>
					</div>
					<div>
						<el-button v-if="scope.row.STATUS === 1"
						    type="danger"
						    @click="reject(scope.row)">客服驳回
                        </el-button>
						<el-button v-if="scope.row.STATUS === 7 || scope.row.STATUS === 2"
						    type="danger"
						    @click="reject(scope.row)">财务驳回
                        </el-button>
					</div>
                    <div v-if="scope.row.STATUS === 6">
						<el-button type="success">已到账</el-button>
					</div>
                    <div v-if="scope.row.STATUS === 5">
						<el-button type="success">汇款驳回</el-button>
					</div>
                    <div v-if="scope.row.STATUS === 8">
						<el-button type="success">财务驳回</el-button>
					</div>
				</template>
			</el-table-column>

		</el-table>
		<!-- 审核弹窗 -->
		<el-dialog title="您确定要通过以下会员的审核吗？"
		           :visible.sync="dialogVisible"
		           width="30%">
			<div>
				<p>姓名：{{ a }}</p>
				<p>金额：{{ b }}</p>
			</div>
			<span slot="footer"
			      class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" v-show="isKF"
				           @click="confirm(1)">确 定</el-button>
				<el-button type="primary" v-show="!isKF"
				           @click="confirm(2)">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 驳回弹窗 -->
		<el-dialog title="您确定要驳回以下会员的审核吗？"
		           :visible.sync="dialogVisible1"
		           width="30%">
			<div>
				<p>姓名：{{ a }}</p>
				<p>金额：{{ b }}</p>
				<div style="padding-bottom:5px">
					<el-select v-model="valueList"
					           placeholder="请选择">
						<el-option v-for="item in optionsList"
						           :key="item.valueList"
						           :label="item.label"
						           :value="item.valueList">
						</el-option>
					</el-select>
				</div>
				<el-input type="textarea"
				          :rows="2"
				          placeholder="请输入驳回描述"
				          v-model="textarea" clearable>
				</el-input>

			</div>
			<span slot="footer"
			      class="dialog-footer">
				<el-button @click="dialogVisible1 = false">取 消</el-button>
				<el-button type="primary" v-show="isKF"
				           @click="sure(1)">确 定</el-button>
				<el-button type="primary" v-show="!isKF"
				           @click="sure(2)">确 定</el-button>
			</span>
		</el-dialog>
		<div class="page"
		     v-show="pageShow">
			<!-- <el-pagination background
			               :page-size=20
			               @current-change="changepage"
			               layout="prev, pager, next"
			               :total="total">
			</el-pagination> -->
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
</template>

<script>
import {
  findMemberDrawingList,
  memberDrawingReview,
  getFinanceCount
} from "@/api/sys_user";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message, Checkbox } from "element-ui";
import treeTable from "@/components/TreeTable";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
export default {
  data() {
    return {
      pageShow: true,
      name: "", // 用户名
      number: "", // 充值的金额
      totalList: 0, // 总页数
      tableData: [], //表格的数据

      dialogVisible: false,
      dialogVisible1: false,
      username: "",
      money: "",
      value1: "",
      value2: "",
      options1: [
        {
          value: "2",
          label: "申请时间"
        },
        {
          value: "1",
          label: "汇款时间"
        }
      ],
      value: "2",
      flow_num: "", //   流水 ID
      a: "", //  姓名
      b: "", // 金额
      ob: "",
      textarea: "", //  驳回描述
      optionsList: [
        {
          //  驳回 选项
          valueList: "-1",
          label: "其他"
        },
        {
          valueList: "0",
          label: "重复购买"
        },
        {
          valueList: "1",
          label: "方案过期"
        },
        {
          valueList: "2",
          label: "出票失败"
        }
      ],
      valueList: "-1",
      status: "", //状态筛选
      options2: [
        { status: "", label: "全部" },
        { status: "-2", label: "待审核" },
        { status: "-3", label: "审核驳回" },
        { status: "-4", label: "所有失败记录" },
        { status: "-5", label: "所有进行中" },
        // { status: "1", label: "客服待审核" },
        // { status: "2", label: "客服驳回" },
        { status: "7", label: "财务待审核" },
        { status: "8", label: "财务驳回" },
        { status: "3", label: "待汇款" },
        { status: "5", label: "汇款驳回" },
        // { status: "0", label: "已汇出" },
        // { status: "4", label: "银行退单" },
        { status: "6", label: "已到账" }
      ],
      financeCount: "", //存储财务审核总和（根据时间段的筛选）
      pageSize: 20,

      isKF: false //是否是客服待审核
    };
  },
  created() {
    // this.search(1)
    this.getData(1);
    this.getCount();
  },
  methods: {
    //获取财务审核统计
    getCount() {
      this.page = 1;
      if (this.value1 === null) {
        this.value1 = "";
      }
      if (this.value2 === null) {
        this.value2 = "";
      }
      let obj = {
        account: this.name,
        startTime: this.value1,
        endTime: this.value2,
        status: this.status
      };
      getFinanceCount(obj).then(res => {
        if (res.data.error_code === 200) {
          this.financeCount = res.data.data.financeCount;
        } else {
          this.$message.error("财务审核统计" + res.data.message);
        }
      });
    },
    //筛选查询
    filter() {
      this.getData(1);
    },
    search() {
      this.getData(1);
    },
    getData(curr) {
      // a 账号， b 开始时间
      let obj = {
        loginAccount: "",
        page: curr,
        pageSize: this.pageSize,
        start_time: this.value1 || "",
        end_time: this.value2 || "",
        account: this.name, //  账号
        flow_num: this.flow_num, //  流水 ID
        is_drawing_time: this.value, // 0 申请时间,1汇款时间
        status: this.status
      };
      findMemberDrawingList(obj).then(res => {
        if (res.status == 200) {
          if (res.data.msg === "数据获取成功") {
            this.tableData = res.data.data.list;
            this.totalList = res.data.data.total;
          } else {
            this.$message.error(res.data.msg);
            this.tableData = [];
            this.totalList = "";
          }
        } else {
          Message.success(res.data.message);
        }
      });
    },
    // 询问弹出框
    examine(a) {
      console.log(a);
      if (a.STATUS === 1) {
        this.isKF = true;
      } else {
        this.isKF = false;
      }
      this.a = a.account;
      this.b = a.amount;
      this.dialogVisible = true;
      this.ob = a;
    },
    // 确定的回调
    confirm(a) {
      let obj = {
        drawingId: this.ob.id,
        account: this.ob.account,
        status: 1, //0 不通过 1通过
        remark: "",
        returnRemark: "",
        indentifyType: a
      };
      memberDrawingReview(obj).then(res => {
        if (res.status == 200) {
          this.getData(this.page);
          this.dialogVisible = false;
        } else {
          this.dialogVisible = false;
        }
      });
    },
    // 驳回弹窗
    reject(a) {
      console.log(a.STATUS);
      if (a.STATUS === 1) {
        this.isKF = true;
      } else {
        this.isKF = false;
      }
      this.dialogVisible1 = true;
      this.a = a.account;
      this.b = a.amount;
      this.ob = a;
    },
    // 驳回弹窗的确定回调
    sure(a) {
      let obj = {
        drawingId: this.ob.id,
        account: this.ob.account,
        status: 0, //0 不通过 1通过
        remark: this.textarea,
        returnRemark: this.valueList,
        indentifyType: a
      };
      memberDrawingReview(obj).then(res => {
        if (res.status == 200) {
          Message.success("驳回成功！");
          this.getData(this.page);
          this.dialogVisible1 = false;
        } else {
          this.dialogVisible1 = false;
        }
      });
    },
    //改变页面大小
    handleSizeChange(val) {
      this.getData(val);
    },
    // 分也回调
    handleCurrentChange(val) {
      this.getData(val);
    }
  },
  filters: {
    //改变时间
    changeTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      let Y = date.getFullYear() + "-";
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      let h = date.getHours() + ":";
      let m = date.getMinutes();
      // let s = date.getSeconds();
      return M + D + h + m;
    },
    //改变状态
    changeStatus(val) {
      // if(val === 0){
      //     return '已汇出'
      // }
      if (val === 1) {
        return "客服待审核";
      } else if (val === 2) {
        return "客服驳回";
      } else if (val === 3) {
        return "待汇款";
      }
      // else if(val === 4){
      //     return '银行退单'
      // }
      else if (val === 5) {
        return "汇款驳回";
      } else if (val === 6) {
        return "已到账";
      } else if (val === 7) {
        return "财务待审核";
      } else if (val === 8) {
        return "财务驳回";
      }
    }
  }
};
</script>

<style scoped>
div.page {
  float: right;
  padding: 10px 0;
}
.topten {
  padding: 10px 0;
  margin-bottom: 20px;
}
.el-select {
  width: 100px;
}
</style>