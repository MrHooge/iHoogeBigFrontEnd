<template>
    <div class="program">
        <div class="search">
            账号：<el-input v-model="account" placeholder="请输入账户" style="width: 120px;margin-right:40px;margin-bottom:20px;margin-top:40px" clearable></el-input>
            昵称：<el-input v-model="username" placeholder="请输入昵称" style="width: 120px;margin-right:40px;margin-bottom:20px;margin-top:40px" clearable></el-input>
            方案编号:<el-input v-model="planNo" placeholder="请输入方案编号" style="width: 130px;margin-right:30px;margin-bottom:20px;margin-top:40px" clearable></el-input>
            发单金额:<el-input v-model="startAmount" placeholder="请输入最小值" style="width: 120px;margin-right:5px;margin-bottom:20px;margin-top:40px" clearable></el-input>至<el-input v-model="endAmount" placeholder="请输入最大值" style="width: 120px;margin-right:40px;margin-bottom:20px;margin-top:40px;margin-left:5px"></el-input>
            税后奖金:<el-input v-model="startReturnAmount" placeholder="请输入最小值" style="width: 120px;margin-right:5px;margin-bottom:20px;margin-top:40px" clearable></el-input>至<el-input v-model="endReturnAmount" placeholder="请输入最大值" style="width: 120px;margin-right:300px;margin-bottom:20px;margin-top:40px"></el-input>

            订单状态：
            <el-select v-model="planStatus"
			           placeholder="请选择订单状态"
			           @change="getval"
                       style="width:10%">
				<el-option v-for="item in sections1"
				           :key="item.planStatus"
				           :label="item.label"
				           :value="item.planStatus"
                           >
				</el-option>
               
			</el-select>
            彩种：
            <el-select v-model="lotteryType"
			           placeholder="请选择彩种类型"
			           @change="getval"
                       style="width:10%">
				<el-option v-for="item in sections2"
				           :key="item.lotteryType"
				           :label="item.label"
				           :value="item.lotteryType"
                           >
				</el-option>
               
			</el-select>
            中奖状态：<el-select v-model="winStatus"
			           placeholder="请选择中奖状态"
			           @change="getval"
                       style="width:10%">
				<el-option v-for="item in sections"
				           :key="item.winStatus"
				           :label="item.label"
				           :value="item.winStatus">
				</el-option>
               
			</el-select><br />
            玩法：<el-select v-model="playType"
			           placeholder="请选择玩法"
			           @change="getval"
                       style="width:10%">
				<el-option v-for="item in directions"
				           :key="item.playType"
				           :label="item.label"
				           :value="item.playType">
				</el-option>
               
			</el-select>
            发单时间（起始）：<el-date-picker
            v-model="stime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="margin-bottom:40px;margin-right:20px;width:200px"
            placeholder="请选择开始日期">
            </el-date-picker>
            
            发单时间（截止）：<el-date-picker
            v-model="etime"
            align="right"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            style="margin-left:10px;
            margin-right:30px;
            width:200px;
            margin-bottom:40px;"
            placeholder="请选择结束日期"
            default-time="23:59:59">
            </el-date-picker>
             预测奖金：<el-input v-model="minBonus" placeholder="请输入奖金最小值" style="width: 150px;margin-right:5px;margin-bottom:20px;margin-top:40px" clearable></el-input>至
             <el-input v-model="maxBonus" placeholder="请输入奖金最大值" style="width: 150px;margin-right:5px;margin-bottom:20px;margin-top:40px" clearable></el-input>
            <el-button type="primary" @click="search" @keyup.13="getone" style="margin-left:100px;margin-bottom:40px;margin-top:40px;margin-right:120px;">查询</el-button>
            <!-- 根据比赛查询方案 -->
            方案购买开始时间:
            <el-date-picker
                v-model="start_time"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="margin-bottom:40px;margin-right:20px;width:200px"
                placeholder="请选择开始日期">
            </el-date-picker>
            方案结束时间:
            <el-date-picker
                v-model="end_time"
                align="right"
                type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss"
                style="margin-left:10px;
                margin-right:30px;
                width:200px;
                margin-bottom:40px;"
                placeholder="请选择结束日期"
                default-time="23:59:59">
            </el-date-picker>
            比赛时间:
            <el-date-picker
                v-model="intTime"
                align="right"
                value-format="yyyyMMdd"
                style="margin-left:10px;
                margin-right:30px;
                width:200px;
                margin-bottom:40px;"
                placeholder="请选择比赛时间">
            </el-date-picker>
            比赛场次:<el-input v-model="lineId" style="width: 120px;margin-right:40px;margin-bottom:20px;margin-top:40px" clearable></el-input>
            <el-button type="primary" @click="matchSearch">根据比赛查询方案</el-button>
            <!-- 中奖金额总和 -->
            <div v-show="isAdmin">
                <span style="display:inline-block;">消费金额:{{consumMoney}}元&nbsp;&nbsp;&nbsp;&nbsp;中奖总金额：{{wingPrize}}元</span>
                <el-button type="primary" @click="searchCount">统计总和</el-button><span style="color:red;font-size:14px;">注：默认显示当天的！</span>
            </div>
            
            <!-- <el-button type="primary" @click="FokusEreignis">是否焦点赛事内购买</el-button> -->
        </div>
        <p style="font-size:12px;color:red;">注：点击昵称可以跳转到会员资料修改页面</p>
        <div class="tablelist">
            <el-table :data="tableData" border style="width: 100%;">
                <el-table-column
                    align="center"
                    label="方案编号">
                    <template slot-scope="scope">
                        {{scope.row.planNo}}<span style="color:red">{{scope.row.isFocus | shape}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="用户名"
                    align="center">
                    <template slot-scope="scope">
                        <span @click="getupnewweb(scope.row.account)" v-if="scope.row.username">
                        {{scope.row.username}}
                        </span>
                        <span @click="getupnewweb(scope.row.account)" v-else>
                        {{ scope.row.account}}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="dlAccount"
                    align="center"
                    label="代理用户名">
                </el-table-column>
                <el-table-column
                    prop="qdAccount"
                    align="center"
                    label="	渠道用户名">
                </el-table-column>
                            <el-table-column
                    align="center"
                    label="发单时间">
                    <template slot-scope="scope">
                        {{scope.row.createTime | time}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="amount"
                    align="center"
                    label="金额">
                </el-table-column>
                <el-table-column
                    prop="planStatus"
                    align="center"
                    label="方案状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.planStatus === '未支付' || scope.row.planStatus === '未出票作废'" style="color: #409eff;">{{scope.row.planStatus}}</span>
                        <span v-else-if="scope.row.planStatus === '出票中'" style="color: #ff0134;">{{scope.row.planStatus}}</span>
                        <span v-else-if="scope.row.planStatus === '已出票'" style="color: green;">{{scope.row.planStatus}}</span>
                        <span v-else>{{scope.row.planStatus}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="lotteryType"
                    align="center"
                    label="彩种">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="截止时间">
                    <template slot-scope="scope">
                        {{scope.row.dealTime | time}}
                    </template>   
                </el-table-column>
                <el-table-column
                    prop="playType"
                    align="center"
                    label="玩法">           
                </el-table-column>
                <el-table-column
                    align="center"
                    label="来源">
                    <template slot-scope="scope">
                        {{scope.row.platForm | platForm}}
                    </template>          
                </el-table-column>
                <el-table-column
                    prop="addPrize"
                    align="center"
                    label="嘉奖">           
                </el-table-column>
                <el-table-column
                    prop="winStatus"
                    align="center"
                    label="中奖状态">
                    <template slot-scope="scope">
                        <span v-if="scope.row.winStatus === '已派奖'" style="color: #409eff;">{{scope.row.winStatus}}</span>
                        <span v-else-if="scope.row.winStatus === '已中奖'" style="color: #ff0134;">{{scope.row.winStatus}}</span>
                        <span v-else>{{scope.row.winStatus}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="posttaxPrize"
                    align="center"
                    label="税后奖金">           
                </el-table-column>
                <el-table-column
                    prop="maxBonus"
                    align="center"
                    label="预测奖金（最大）">           
                </el-table-column>
                <el-table-column
                    prop="minBonus"
                    align="center"
                    label="预测奖金（最小）">           
                </el-table-column>
                <el-table-column
                    align="center"
                    label="跟单/自购">
                    <template slot-scope="scope">
                        {{scope.row.isSuper | isSuper}}
                    </template>        
                </el-table-column>
                <el-table-column
                    align="center"
                    label="操作">
                    <template slot-scope="scope">
                        <el-dropdown trigger="click">
                            <el-button type="primary">操作</el-button>
                            <el-dropdown-menu slot="dropdown">
                                <el-popover
                                    placement="right"
                                    trigger="click">
                                </el-popover>
                                <el-button type="warning" @click="outticket(scope.row,'modify')">设置出票</el-button>&nbsp;
                                &nbsp;&nbsp;<el-button type="danger" @click="Chargeback(scope.row,'modify')">退单</el-button>
                                <!-- <el-button type="warning" @click="wallet(scope.row,'modify')">冲正</el-button> -->
                                <el-button type="success" @click="Szczegol(scope.row)">明细</el-button>
                            </el-dropdown-menu>
                            </el-dropdown> 
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog title="退单" :visible.sync="Declarationofwithdrawal" width="500px" top="30vh">
                <div class="body">
                确认退单吗
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="Declarationofwithdrawal = false">取 消</el-button>
                    <el-button type="primary" @click="want">确定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="出票" :visible.sync="undesirabledesabel" width="500px" top="30vh">
                <div class="body">
                确认出票吗
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="undesirabledesabel = false">取消</el-button>
                    <el-button type="primary" @click="getfromyicket">确定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="修改" :visible.sync="dialogShenVisible" width="500px" top="30vh">
                <div class="body">
                    请输入罚单宣言：<el-input v-model="desc" clearable></el-input>
                </div>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogShenVisible = false">取 消</el-button>
                    <el-button type="primary" @click="sure">确定</el-button>
                </div>
            </el-dialog>
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

            <el-dialog :visible.sync="disabled" width="100%" top="30vh">
                <div class="body">
                    <el-table :data="tableData1" border style="width: 100%;">
                        <el-table-column
                            align="center"
                            label="方案编号">
                            <template slot-scope="scope">
                                {{scope.row.planNo}}<span style="color:red">{{scope.row.isFocus | shape}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            label="用户名"
                            align="center">
                            <template slot-scope="scope">
                                <span @click="getupnewweb(scope.row.account)" v-if="scope.row.username">
                                {{scope.row.username}}
                                </span>
                                <span @click="getupnewweb(scope.row.account)" v-else>
                                {{ scope.row.account}}
                                </span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="dlAccount"
                            align="center"
                            label="代理用户名">
                        </el-table-column>
                        <el-table-column
                            prop="qdAccount"
                            align="center"
                            label="	渠道用户名">
                        </el-table-column>
                            <el-table-column
                                align="center"
                                label="发单时间">
                                <template slot-scope="scope">
                                    {{scope.row.createDateTime | time}}
                                </template>
                            </el-table-column>
                        <el-table-column
                            prop="amount"
                            align="center"
                            label="金额">
                        </el-table-column>
                        <el-table-column
                            prop="planStatus"
                            align="center"
                            label="方案状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.planStatus === 1" style="color: #409eff;">{{scope.row.planStatus | changePlanStatus}}</span>
                                <span v-else-if="scope.row.planStatus === 3" style="color: #ff0134;">{{scope.row.planStatus | changePlanStatus}}</span>
                                <span v-else-if="scope.row.planStatus === 4" style="color: green;">{{scope.row.planStatus | changePlanStatus}}</span>
                                <span v-else>{{scope.row.planStatus | changePlanStatus}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="彩种">
                            <template slot-scope="scope">
                                {{scope.row.lotteryType | changeLotteryType}}
                            </template>
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="截止时间">
                            <template slot-scope="scope">
                                {{scope.row.dealDateTime | time}}
                            </template>   
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="玩法">
                            <template slot-scope="scope">
                                {{scope.row.playType | changePlayType}}
                            </template>        
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="来源">
                            <template slot-scope="scope">
                                {{scope.row.platform | platForm}}
                            </template>          
                        </el-table-column>
                        <el-table-column
                            prop="addPrize"
                            align="center"
                            label="嘉奖">           
                        </el-table-column>
                        <el-table-column
                            prop="winStatus"
                            align="center"
                            label="中奖状态">
                            <template slot-scope="scope">
                                <span v-if="scope.row.winStatus === '已派奖'" style="color: #409eff;">{{scope.row.winStatus}}</span>
                                <span v-else-if="scope.row.winStatus === '已中奖'" style="color: #ff0134;">{{scope.row.winStatus}}</span>
                                <span v-else>{{scope.row.winStatus}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="posttaxPrize"
                            align="center"
                            label="税后奖金">           
                        </el-table-column>
                        <el-table-column
                            prop="maxBonus"
                            align="center"
                            label="预测奖金（最大）">           
                        </el-table-column>
                        <el-table-column
                            prop="minBonus"
                            align="center"
                            label="预测奖金（最小）">           
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="跟单/自购">
                            <template slot-scope="scope">
                                {{scope.row.isSuperMan | isSuper}}
                            </template>        
                        </el-table-column>
                        <el-table-column
                            align="center"
                            label="操作">
                            <template slot-scope="scope">
                                <el-dropdown trigger="click">
                                    <el-button type="primary">操作</el-button>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-popover
                                            placement="right"
                                            trigger="click">
                                        </el-popover>
                                        <el-button type="warning" @click="outticket(scope.row,'modify')">设置出票</el-button>&nbsp;
                                        &nbsp;&nbsp;<el-button type="danger" @click="Chargeback(scope.row,'modify')">退单</el-button>
                                        <!-- <el-button type="warning" @click="wallet(scope.row,'modify')">冲正</el-button> -->
                                        <el-button type="success" @click="Szczegol(scope.row)">明细</el-button>
                                    </el-dropdown-menu>
                                    </el-dropdown> 
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <!-- <div slot="footer" class="dialog-footer">
                    <el-button @click="disabled = false">取 消</el-button>
                    <el-button type="primary" @click="want">确定</el-button>
                </div> -->
            </el-dialog>
        </div>
    </div>
</template>
<script>
import {
  selectLotteryPlan,
  updatePlanDesc,
  planBack,
  getIsFocusPlan,
  updatePlanStatus,
  getPlanByMatch
} from "@/api/period";
import { findAllMember } from "@/api/customer";
import { getPlanWiningPrize } from "@/api/sys_user.js";
export default {
  data() {
    return {
      tableData: [],
      account: "",
      minBonus: "",
      maxBonus: "",
      startAmount: "",
      endAmount: "",
      startReturnAmount: "",
      endReturnAmount: "",
      planNo: "",
      onePlanNo: "",
      planStatus: "",
      winStatus: "",
      playType: "",
      stime: "",
      etime: "",
      page: 1,
      pageSize: 20,
      desc: "",
      dialogShenVisible: false,
      Declarationofwithdrawal: false,
      undesirabledesabel: false,
      fadan: "",
      sections: [
        { winStatus: "", label: "全部" },
        { winStatus: "1", label: "未开奖" },
        { winStatus: "2", label: "未中奖" },
        { winStatus: "3", label: "已中奖" },
        { winStatus: "4", label: "已派奖" },
        { winStatus: "11", label: "已退款" }
      ],
      sections1: [
        { planStatus: "-1", label: "全部" },
        { planStatus: "1", label: "未支付" },
        { planStatus: "2", label: "招募中" },
        { planStatus: "3", label: "出票中" },
        { planStatus: "4", label: "已出票" },
        { planStatus: "5", label: "已撤单" },
        { planStatus: "6", label: "已流单" },
        { planStatus: "7", label: "受理中" },
        { planStatus: "8", label: "部份出票" },
        { planStatus: "9", label: "未出票作废" },
        { planStatus: "10", label: "已过期" }
      ],

      sections2: [
        { lotteryType: "43", label: "竞彩篮球混合过关" },
        { lotteryType: "42", label: "竞彩足球混合过关" },
        { lotteryType: "304", label: "竞彩篮球单关投注" },
        { lotteryType: "30", label: "竞彩篮球胜负" },
        { lotteryType: "31", label: "竞彩篮球让分胜负" },
        { lotteryType: "32", label: "竞彩篮球胜分差" },
        { lotteryType: "33", label: "竞彩篮球大小分" },
        { lotteryType: "303", label: "竞彩足球单关投注" },
        { lotteryType: "41", label: "竞彩足球胜平负" },
        { lotteryType: "34", label: "竞彩足球让球胜平负" },
        { lotteryType: "35", label: "竞彩足球比分" },
        { lotteryType: "36", label: "竞彩足球进球数" },
        { lotteryType: "37", label: "竞彩足球半全场" }
      ],
      directions: [
        { playType: "", label: "全部" },
        { playType: "116", label: "自由过关" },
        { playType: "117", label: "单关" },
        { playType: "118", label: "2串1" },
        { playType: "119", label: "3串1" },
        { playType: "120", label: "4串1" },
        { playType: "121", label: "5串1" },
        { playType: "122", label: "6串1" },
        { playType: "123", label: "7串1" },
        { playType: "124", label: "8串1" }
      ],
      totalList: 0,

      username: "", //输入查询的昵称
      consumMoney: "", //消费金额
      wingPrize: "", //中奖总金额

      lotteryType: "",

      start_time: "", //方案购买开始时间
      end_time: "", //方案结束时间
      intTime: "", //比赛时间
      lineId: "", //比赛场次
      tableData1: [],

      isAdmin: false, //是否是管理员
      disabled: false
    };
  },
  filters: {
    //玩法
    changePlayType(val) {
      if (val === "") {
        return "全部";
      } else if (val === 116) {
        return "自由过关";
      } else if (val === 117) {
        return "单关";
      } else if (val === 118) {
        return "2串1";
      } else if (val === 119) {
        return "3串1";
      } else if (val === 120) {
        return "4串1";
      } else if (val === 121) {
        return "5串1";
      } else if (val === 122) {
        return "6串1";
      } else if (val === 123) {
        return "7串1";
      } else if (val === 124) {
        return "8串1";
      } else if (val === 35) {
        return "竞彩足球比分";
      } else if (val === 36) {
        return "竞彩足球进球数";
      } else if (val === 37) {
        return "竞彩足球半全场";
      }
    },
    //彩种
    changeLotteryType(val) {
      if (val === 42) {
        return "竞彩足球混合过关";
      } else if (val === 43) {
        return "竞彩篮球混合过关";
      } else if (val === 304) {
        return "竞彩篮球单关投注";
      } else if (val === 30) {
        return "竞彩篮球胜负";
      } else if (val === 31) {
        return "竞彩篮球让分胜负";
      } else if (val === 32) {
        return "竞彩篮球胜分差";
      } else if (val === 33) {
        return "竞彩篮球大小分";
      } else if (val === 303) {
        return "竞彩足球单关投注";
      } else if (val === 41) {
        return "竞彩足球胜平负";
      } else if (val === 34) {
        return "竞彩足球让球胜平负";
      } else if (val === 35) {
        return "竞彩足球比分";
      } else if (val === 36) {
        return "竞彩足球进球数";
      } else if (val === 37) {
        return "竞彩足球半全场";
      }
    },
    //出票状态
    changePlanStatus(val) {
      val = Number(val);
      if (val === 1) {
        return "未支付";
      } else if (val === 3) {
        return "出票中";
      } else if (val === 4) {
        return "已出票";
      } else if (val === 8) {
        return "部分出票";
      }
    },
    //是否跟单
    isSuper(a) {
      a = Number(a);
      if (a === 1) {
        return "自购";
      } else if (a === 0) {
        return "跟单";
      }
    },
    platForm(a) {
      a = Number(a);
      if (a === 1) {
        return "ios";
      } else if (a === 2) {
        return "安卓";
      } else if (a === 3) {
        return "m端";
      } else if (a === 4) {
        return "pc端";
      }
    },
    //是否嘉奖
    shape(s) {
      return s == true ? "嘉" : "";
    },
    type(b) {
      return b == "" ? "" : b;
    },
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
  created() {
    // this.gettable()
    this.getTodayDate();
    this.searchCount();

    //只有如下账号的人可以显示
    if (
      this.$store.state.user.name === "develop" ||
      this.$store.state.user.name === "manager" ||
      this.$store.state.user.name === "admin"
    ) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  },
  methods: {
    //根据比赛查询方案
    matchSearch() {
      if (
        this.start_time === "" ||
        this.end_time === "" ||
        this.intTime === "" ||
        this.lineId === ""
      ) {
        this.$message.error("请输入完整信息！");
      } else {
        let obj = {
          start_time: this.start_time,
          end_time: this.end_time,
          intTime: this.intTime,
          lineId: this.lineId,
          page: 1,
          pageSize: 1000
        };
        getPlanByMatch(obj).then(res => {
          if (res.data.error_code === 200) {
            this.disabled = true;
            this.tableData1 = res.data.data.list;
            this.fadan = res.data.data.planStatus;
            this.tableData1.forEach((e, index) => {
              this.fadan = e.planDesc;
            });
            this.$message.success(res.data.message);
          } else {
            this.$message.error(res.data.message);
          }
        });
      }
    },
    //统计总和
    searchCount() {
      let obj = {
        account: this.account,
        startTime: this.stime || "",
        endTime: this.etime || "",
        planStatus: this.planStatus,
        wingStatus: this.winStatus
      };
      getPlanWiningPrize(obj).then(res => {
        if (res.data.error_code === 200) {
          this.consumMoney = res.data.data.consumMoney;
          this.wingPrize = res.data.data.wingPrize;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    getTodayDate() {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      this.stime = y + "-" + m + "-" + d + " " + "00:00:00";
      this.etime = y + "-" + m + "-" + d + " " + "23:59:59";
      this.gettable();
    },
    //点击账号跳转会员管理页面
    getupnewweb(a) {
      this.$router.push({
        path: "/customerManager/customerManager",
        query: { account: a }
      });
    },
    //明细页面跳转
    Szczegol(parse) {
      let routeData = this.$router.resolve({
        path: "/programCenter/Detail",
        query: { planNo: parse.planNo }
      });
      window.open(routeData.href, "_blank");
    },

    getval() {
      this.gettable();
    },
    FokusEreignis() {
      let Schema = {
        planNo: this.planNo
      };
      getIsFocusPlan(Schema).then(res => {
        if (res.data == "true") {
          this.$message("是");
        } else {
          this.$message("否");
        }
      });
    },
    //获取数据
    gettable() {
      let obj = {
        account: this.account,
        endAmount: this.endAmount,
        endReturnAmount: this.endReturnAmount,
        endTime: this.etime || "",
        page: this.page,
        dlAccount: "",
        pageSize: this.pageSize,
        planNo: this.planNo,
        planStatus: this.planStatus,
        playType: this.playType,
        startAmount: this.startAmount,
        startReturnAmount: this.startReturnAmount,
        startTime: this.stime || "",
        maxBonus: this.maxBonus,
        minBonus: this.minBonus,
        winStatus: this.winStatus,
        desc: this.desc,
        lotteryType: this.lotteryType //彩种
      };
      selectLotteryPlan(obj).then(res => {
        this.tableData = res.data.data;
        this.totalList = res.data.totalCount;
        this.fadan = res.data.data.planStatus;
        this.tableData.forEach((e, index) => {
          this.fadan = e.planDesc;
        });
      });
    },
    //出票
    outticket(data) {
      this.undesirabledesabel = true;
      this.onePlanNo = data.planNo;
    },
    //确认出票
    getfromyicket() {
      updatePlanStatus(this.onePlanNo).then(res => {
        if (res.data.error_code == 200) {
          this.$message.success("出票成功");
          this.undesirabledesabel = false;
          this.gettable();
        } else {
          this.undesirabledesabel = false;
          this.$message.error(res.data.message);
        }
      });
    },
    //退单
    Chargeback(data) {
      this.Declarationofwithdrawal = true;
      this.onePlanNo = data.planNo;
    },
    want() {
      let subject = {
        planNo: this.onePlanNo
      };
      planBack(subject).then(res => {
        if (res.data.error_code == 200) {
          this.$message.success("退单成功");
          this.Declarationofwithdrawal = false;
          this.gettable();
        } else {
          this.Declarationofwithdrawal = false;
          this.$message.error(res.data.message);
        }
      });
    },
    search() {
      if (!this.account && !this.username) {
        // this.$message("请输入您要查询的账号或昵称！")
        this.page = 1;
        this.gettable();
      } else {
        if (this.account === "") {
          this.getAccount();
        } else {
          this.page = 1;
          this.gettable();
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
        this.gettable();
      });
    },
    //翻页
    handleCurrentChange(num) {
      this.page = num;
      this.gettable();
    },
    //改变页面大小
    handleSizeChange(num) {
      this.pageSize = num;
      this.gettable();
    },
    //修改
    inquire(data) {
      this.dialogShenVisible = true;
      this.planNo = data.planNo;
      this.desc = data.planDesc;
      this.planNo = "";
    },
    //确认
    sure() {
      updatePlanDesc(this.desc, this.planNo).then(res => {
        if (res.data.error_code == 200) {
          this.$message(res.data.message);
          this.dialogShenVisible = false;
          this.planNo = "";
          this.gettable();
        }
      });
    }
  }
};
</script>

<style>
.program {
  padding: 10px 20px;
}
.jiajiang {
  border: 1px solid yellow;
  width: 25px;
  height: 25px;
}
</style>
