<template>
    <div class="midder">
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            border>
            <el-table-column
                prop="id"
                align="center"
                label="id">
            </el-table-column>
            <el-table-column
                align="center"                
                label="是否可用">
                <template slot-scope="scope">
                    {{scope.row.isAble | userful}}
                </template>
            </el-table-column>
            <el-table-column
                align="center"                
                label="是否当前期">
                <template slot-scope="scope">
                    {{scope.row.isCurrentTerm | present}}
                </template>
            </el-table-column>
            <el-table-column
                prop="lotteryType"
                align="center"                
                label="彩种">
                <template slot-scope="scope">
                    {{scope.row.lotteryType | changeLotteryType}}
                </template>
            </el-table-column>
            <el-table-column
                align="center"                
                label="开奖时间">
                <template slot-scope="scope">
                    {{scope.row.openDateTime | type}}
                </template>
            </el-table-column>
            <!-- <el-table-column
                prop="outTerm"
                align="center"                
                label="外部彩期">
            </el-table-column> -->
            <el-table-column
                prop="result"
                align="center"                
                label="开奖结果">
            </el-table-column>
            <el-table-column
                align="center"                
                label="开始时间">
                <template slot-scope="scope">
                    {{scope.row.startDateTime | type}}
                </template>
            </el-table-column>
            <el-table-column
                prop="term"
                align="center"                
                label="彩期">
            </el-table-column>
            <el-table-column
                align="center"                
                label="终端截止时间">
                <template slot-scope="scope">
                    {{scope.row.terminalEndDateTime | type}}
                </template>
            </el-table-column>
            <!-- <el-table-column
                prop="testMachineCode"
                align="center"                
                label="试机号">
            </el-table-column> -->
            <el-table-column
                prop="totalAmount"
                align="center"                
                label="投注额">
            </el-table-column>
            <el-table-column
                align="center"                
                label="操作">
                <template slot-scope="scope">
                    <el-button type="primary" @click="update(scope.row)">修改</el-button>
                    <el-dialog title="修改" :visible.sync="dialogFormVisible">
                        <el-form :label-position="labelPosition" label-width="280px" :model="formLabelAlign">
                            <el-form-item label="彩种" style="text-align: left;">
                                <el-select v-model="formLabelAlign.lotteryTypeValue" placeholder="请选择" disabled>
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="彩期">
                                <el-input v-model="formLabelAlign.term" style="margin-right:20px;" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="下期奖池">
                                <el-input v-model="formLabelAlign.awardPool" style="margin-right:20px;" clearable></el-input>
                            </el-form-item>
                            <el-form-item label="投注金额">
                                <el-input v-model="formLabelAlign.totalAmount" style="margin-right:20px;" clearable></el-input>
                            </el-form-item>
                            <!-- <el-form-item label="是否可用" style="text-align: left;">
                                <el-radio-group v-model="formLabelAlign.isAble">
                                    <el-radio label="0">可用</el-radio>
                                    <el-radio label="1">不可用</el-radio>
                                </el-radio-group>
                            </el-form-item> -->
                            
                            <el-form-item label="开奖时间" style="text-align: left;">
                                <el-date-picker
                                    v-model="formLabelAlign.openResultTime"
                                    type="datetime"
                                    placeholder="请选择开始日期"
                                    value-format="yyyy-MM-dd HH:mm:ss">
                                </el-date-picker>
                            </el-form-item>
                            <!-- 大乐透和七星彩 -->
                            <el-form-item label="开奖结果" v-if="bigLotto || sevenStar">
                                <el-input v-model="formLabelAlign.result[0]" style="margin-right:10px;width:50px;"></el-input>
                                <el-input v-model="formLabelAlign.result[1]" style="margin-right:10px;width:50px;"></el-input>
                                <el-input v-model="formLabelAlign.result[2]" style="margin-right:10px;width:50px;"></el-input>
                                <el-input v-model="formLabelAlign.result[3]" style="margin-right:10px;width:50px;"></el-input>
                                <el-input v-model="formLabelAlign.result[4]" style="margin-right:10px;width:50px;"></el-input>
                                <el-input v-model="formLabelAlign.result[5]" style="margin-right:10px;width:50px;"></el-input>
                                <el-input v-model="formLabelAlign.result[6]" style="margin-right:10px;width:50px;"></el-input>
                            </el-form-item>
                            <!-- 排列3 -->
                            <el-form-item label="开奖结果" v-if="arrThree">
                                <el-input v-model="formLabelAlign.result[0]" style="margin-right:10px;width:50px;"></el-input>
                                <el-input v-model="formLabelAlign.result[1]" style="margin-right:10px;width:50px;"></el-input>
                                <el-input v-model="formLabelAlign.result[2]" style="margin-right:10px;width:50px;"></el-input>
                            </el-form-item>
                            <!-- 排列5 -->
                            <el-form-item label="开奖结果" v-if="arrFive">
                                <el-input v-model="formLabelAlign.result[0]" style="margin-right:10px;width:50px;"></el-input>
                                <el-input v-model="formLabelAlign.result[1]" style="margin-right:10px;width:50px;"></el-input>
                                <el-input v-model="formLabelAlign.result[2]" style="margin-right:10px;width:50px;"></el-input>
                                <el-input v-model="formLabelAlign.result[3]" style="margin-right:10px;width:50px;"></el-input>
                                <el-input v-model="formLabelAlign.result[4]" style="margin-right:10px;width:50px;"></el-input>
                            </el-form-item>
                            <el-form-item label="试机号" v-if="bigLotto || sevenStar">
                                <el-input v-model="formLabelAlign.testMachineCode[0]" style="margin-right:10px;width:50px;"></el-input>
                                <el-input v-model="formLabelAlign.testMachineCode[1]" style="margin-right:10px;width:50px;"></el-input>
                                <el-input v-model="formLabelAlign.testMachineCode[2]" style="margin-right:10px;width:50px;"></el-input>
                                <el-input v-model="formLabelAlign.testMachineCode[3]" style="margin-right:10px;width:50px;"></el-input>
                                <el-input v-model="formLabelAlign.testMachineCode[4]" style="margin-right:10px;width:50px;"></el-input>
                                <el-input v-model="formLabelAlign.testMachineCode[5]" style="margin-right:10px;width:50px;"></el-input>
                                <el-input v-model="formLabelAlign.testMachineCode[6]" style="margin-right:10px;width:50px;"></el-input>
                            </el-form-item>
                            <el-form-item label="试机号" v-if="arrThree">
                                <el-input v-model="formLabelAlign.testMachineCode[0]" style="margin-right:10px;width:50px;"></el-input>
                                <el-input v-model="formLabelAlign.testMachineCode[1]" style="margin-right:10px;width:50px;"></el-input>
                                <el-input v-model="formLabelAlign.testMachineCode[2]" style="margin-right:10px;width:50px;"></el-input>
                            </el-form-item>
                            <el-form-item label="试机号" v-if="arrFive">
                                <el-input v-model="formLabelAlign.testMachineCode[0]" style="margin-right:10px;width:50px;"></el-input>
                                <el-input v-model="formLabelAlign.testMachineCode[1]" style="margin-right:10px;width:50px;"></el-input>
                                <el-input v-model="formLabelAlign.testMachineCode[2]" style="margin-right:10px;width:50px;"></el-input>
                                <el-input v-model="formLabelAlign.testMachineCode[3]" style="margin-right:10px;width:50px;"></el-input>
                                <el-input v-model="formLabelAlign.testMachineCode[4]" style="margin-right:10px;width:50px;"></el-input>
                            </el-form-item>
                            <el-form-item label="结果详情" style="width:100%">
                                <div>
                                    <h3>中奖数</h3>
                                    <!-- 大乐透 -->
                                    <el-form :label-position="labelPosition" label-width="120px" v-if="bigLotto">
                                        <el-form-item label="一等奖">
                                            <el-input v-model="prizeNum[0]" style="width:300px;margin-bottom:20px;" clearable></el-input>&nbsp;&nbsp;注
                                        </el-form-item>
                                        <el-form-item label="一等奖追加">
                                            <el-input v-model="prizeNum[1]" style="width:300px;margin-bottom:20px;" clearable></el-input>&nbsp;&nbsp;注
                                        </el-form-item>
                                        <el-form-item label="二等奖">
                                            <el-input v-model="prizeNum[2]" style="width:300px;margin-bottom:20px;" clearable></el-input>&nbsp;&nbsp;注
                                        </el-form-item>
                                        <el-form-item label="二等奖追加">
                                            <el-input v-model="prizeNum[3]" style="width:300px;margin-bottom:20px;" clearable></el-input>&nbsp;&nbsp;注
                                        </el-form-item>
                                        <el-form-item label="三等奖">
                                            <el-input v-model="prizeNum[4]" style="width:300px;margin-bottom:20px;" clearable></el-input>&nbsp;&nbsp;注
                                        </el-form-item>
                                        <el-form-item label="三等奖追加">
                                            <el-input v-model="prizeNum[5]" style="width:300px;margin-bottom:20px;" clearable></el-input>&nbsp;&nbsp;注
                                        </el-form-item>
                                        <el-form-item label="四等奖">
                                            <el-input v-model="prizeNum[6]" style="width:300px;margin-bottom:20px;" clearable></el-input>&nbsp;&nbsp;注
                                        </el-form-item>
                                        <el-form-item label="四等奖追加">
                                            <el-input v-model="prizeNum[7]" style="width:300px;margin-bottom:20px;" clearable></el-input>&nbsp;&nbsp;注
                                        </el-form-item>
                                        <el-form-item label="五等奖">
                                            <el-input v-model="prizeNum[8]" style="width:300px;margin-bottom:20px;" clearable></el-input>&nbsp;&nbsp;注
                                        </el-form-item>
                                        <el-form-item label="五等奖追加">
                                            <el-input v-model="prizeNum[9]" style="width:300px;margin-bottom:20px;" clearable></el-input>&nbsp;&nbsp;注
                                        </el-form-item>
                                        <el-form-item label="六等奖">
                                            <el-input v-model="prizeNum[10]" style="width:300px;margin-bottom:20px;" clearable></el-input>&nbsp;&nbsp;注
                                        </el-form-item>
                                    </el-form>
                                    <!-- 七星彩 -->
                                    <el-form :label-position="labelPosition" label-width="120px" v-if="sevenStar">
                                        <el-form-item label="一等奖">
                                            <el-input v-model="prizeNum[0]" style="width:300px;margin-bottom:20px;" clearable></el-input>&nbsp;&nbsp;注
                                        </el-form-item>
                                        <el-form-item label="二等奖">
                                            <el-input v-model="prizeNum[1]" style="width:300px;margin-bottom:20px;" clearable></el-input>&nbsp;&nbsp;注
                                        </el-form-item>
                                        <el-form-item label="三等奖">
                                            <el-input v-model="prizeNum[2]" style="width:300px;margin-bottom:20px;" clearable></el-input>&nbsp;&nbsp;注
                                        </el-form-item>
                                        <el-form-item label="四等奖">
                                            <el-input v-model="prizeNum[3]" style="width:300px;margin-bottom:20px;" clearable></el-input>&nbsp;&nbsp;注
                                        </el-form-item>
                                        <el-form-item label="五等奖">
                                            <el-input v-model="prizeNum[4]" style="width:300px;margin-bottom:20px;" clearable></el-input>&nbsp;&nbsp;注
                                        </el-form-item>
                                        <el-form-item label="六等奖">
                                            <el-input v-model="prizeNum[5]" style="width:300px;margin-bottom:20px;" clearable></el-input>&nbsp;&nbsp;注
                                        </el-form-item>
                                    </el-form>
                                    <!-- 排列3 -->
                                    <el-form :label-position="labelPosition" label-width="120px" v-if="arrThree">
                                        <el-form-item label="排列直选">
                                            <el-input v-model="prizeNum[0]" style="width:300px;margin-bottom:20px;" clearable></el-input>&nbsp;&nbsp;注
                                        </el-form-item>
                                        <el-form-item label="排三组选3">
                                            <el-input v-model="prizeNum[1]" style="width:300px;margin-bottom:20px;" clearable></el-input>&nbsp;&nbsp;注
                                        </el-form-item>
                                        <el-form-item label="排三组选6">
                                            <el-input v-model="prizeNum[2]" style="width:300px;margin-bottom:20px;" clearable></el-input>&nbsp;&nbsp;注
                                        </el-form-item>
                                    </el-form>
                                    <!-- 排列5 -->
                                    <el-form :label-position="labelPosition" label-width="120px" v-if="arrFive">
                                        <el-form-item label="">
                                            <el-input v-model="prizeNum[0]" style="width:300px;margin-bottom:20px;" clearable></el-input>&nbsp;&nbsp;注
                                        </el-form-item>
                                    </el-form>
                                </div>
                                <div>
                                    <h3>奖金</h3>
                                    <!-- 大乐透 -->
                                    <el-form label-width="120px" v-if="bigLotto">
                                        <el-form-item label="一等奖奖金">
                                            <el-input v-model="prizeBonus[0]" style="width:400px;margin-bottom:20px;" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="一等奖追加奖金">
                                            <el-input v-model="prizeBonus[1]" style="width:400px;margin-bottom:20px;" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="二等奖奖金">
                                            <el-input v-model="prizeBonus[2]" style="width:400px;margin-bottom:20px;" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="二等奖追加奖金">
                                            <el-input v-model="prizeBonus[3]" style="width:400px;margin-bottom:20px;" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="三等奖奖金">
                                            <el-input v-model="prizeBonus[4]" style="width:400px;margin-bottom:20px;" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="三等奖追加奖金">
                                            <el-input v-model="prizeBonus[5]" style="width:400px;margin-bottom:20px;" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="四等奖奖金">
                                            <el-input v-model="prizeBonus[6]" style="width:400px;margin-bottom:20px;" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="四等奖追加奖金">
                                            <el-input v-model="prizeBonus[7]" style="width:400px;margin-bottom:20px;" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="五等奖奖金">
                                            <el-input v-model="prizeBonus[8]" style="width:400px;margin-bottom:20px;" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="五等奖追加奖金">
                                            <el-input v-model="prizeBonus[9]" style="width:400px;margin-bottom:20px;" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="六等奖奖金">
                                            <el-input v-model="prizeBonus[10]" style="width:400px;margin-bottom:20px;" clearable></el-input>
                                        </el-form-item>
                                    </el-form>
                                    <!-- 七星彩 -->
                                    <el-form label-width="120px" v-if="sevenStar">
                                        <el-form-item label="一等奖奖金">
                                            <el-input v-model="prizeBonus[0]" style="width:400px;margin-bottom:20px;" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="二等奖奖金">
                                            <el-input v-model="prizeBonus[1]" style="width:400px;margin-bottom:20px;" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="三等奖奖金">
                                            <el-input v-model="prizeBonus[2]" style="width:400px;margin-bottom:20px;" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="四等奖奖金">
                                            <el-input v-model="prizeBonus[3]" style="width:400px;margin-bottom:20px;" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="五等奖奖金">
                                            <el-input v-model="prizeBonus[4]" style="width:400px;margin-bottom:20px;" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="六等奖奖金">
                                            <el-input v-model="prizeBonus[5]" style="width:400px;margin-bottom:20px;" clearable></el-input>
                                        </el-form-item>
                                    </el-form>
                                    <!-- 排列3 -->
                                    <el-form label-width="120px" v-if="arrThree">
                                        <el-form-item label="排列直选奖金">
                                            <el-input v-model="prizeBonus[0]" style="width:400px;margin-bottom:20px;" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="排三组选3奖金">
                                            <el-input v-model="prizeBonus[1]" style="width:400px;margin-bottom:20px;" clearable></el-input>
                                        </el-form-item>
                                        <el-form-item label="排三组选6奖金">
                                            <el-input v-model="prizeBonus[2]" style="width:400px;margin-bottom:20px;" clearable></el-input>
                                        </el-form-item>
                                    </el-form>
                                    <!-- 排列5 -->
                                    <el-form label-width="120px" v-if="arrFive">
                                        <el-form-item label="">
                                            <el-input v-model="prizeBonus[0]" style="width:400px;margin-bottom:20px;" clearable></el-input>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </el-form-item>
                            <div style="text-align:right">
                                <el-button @click="dialogFormVisible = false">取 消</el-button>
                                <el-button type="primary" @click="getroid">确 定</el-button>
                            </div>
                        </el-form>
                    </el-dialog>
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
import { findTerm, updateTerm } from "@/api/period";
export default {
  data() {
    return {
      tableData: [],
      page: 1,
      pageSize: 20,
      startDateTime: "",
      walletData: [],
      dialogFormVisible: false,
      status: "",
      radio: "",
      term: "",
      totalList: 0,

      labelPosition: "right", //标签的位置居右
      // 修改时传的参数
      formLabelAlign: {
        awardPool: "", //下期奖池
        isAble: "", //是否可用
        lotteryTypeValue: "", //彩种
        openResultTime: "", //开奖时间
        result: [], //开奖结果
        resultDetail: "", //结果详情
        status: "", //状态
        term: "", //彩期
        testMachineCode: [], //试机号
        totalAmount: "" //投注金额
      },

      result: "", //传参时的开奖结果
      resultDetail: "", //传参时的结果详情
      testMachineCode: "", //传参时的试机号

      //结果详情
      prizeNum: [], //中奖数
      prizeBonus: [], //奖金
      options: [
        {
          value: "1",
          label: "大乐透"
        },
        {
          value: "2",
          label: "七星彩"
        },
        {
          value: "3",
          label: "排列3"
        },
        {
          value: "4",
          label: "排列5"
        }
      ],

      bigLotto: true, //大乐透显示
      sevenStar: false, //七星彩显示
      arrThree: false, //排列3
      arrFive: false //排列5
    };
  },
  filters: {
    changeLotteryType(val) {
      if (val === 1) {
        return "大乐透";
      } else if (val === 2) {
        return "七星彩";
      } else if (val === 3) {
        return "排列3";
      } else if (val === 4) {
        return "排列5";
      }
    },
    type(a) {
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
    },
    userful(time) {
      return time === 0 ? "是" : "否";
    },
    present(studio) {
      if (studio == 0) {
        return "是";
      } else if (studio == 1) {
        return "否";
      } else {
        return "全部";
      }
    }
  },
  created() {
    this.gettable();
  },
  methods: {
    changeTime(a) {
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
    },
    //获取数据列表
    gettable() {
      let obj = {
        page: this.page,
        pageSize: this.pageSize,
        lotteryTypeValue: this.$route.query.radio,
        term: ""
      };
      findTerm(obj).then(res => {
        this.tableData = res.data.data.list;
        this.totalList = res.data.data.total;
      });
    },
    changeLayout() {
      //根据彩种判断显示
      if (this.formLabelAlign.lotteryTypeValue === "1") {
        //大乐透
        this.bigLotto = true;
        this.sevenStar = false;
        this.arrThree = false;
        this.arrFive = false;
      } else if (this.formLabelAlign.lotteryTypeValue === "2") {
        //七星彩
        this.bigLotto = false;
        this.sevenStar = true;
        this.arrThree = false;
        this.arrFive = false;
      } else if (this.formLabelAlign.lotteryTypeValue === "3") {
        //排列3
        this.bigLotto = false;
        this.sevenStar = false;
        this.arrThree = true;
        this.arrFive = false;
      } else if (this.formLabelAlign.lotteryTypeValue === "4") {
        //排列5
        this.bigLotto = false;
        this.sevenStar = false;
        this.arrThree = false;
        this.arrFive = true;
      }
    },
    // 编辑
    update(data) {
      console.log(data);
      //数组清空（避免再次操作时，之前数组没有清空造成数组数据顺序出错）
      this.prizeNum = [];
      this.prizeBonus = [];
      this.formLabelAlign.result = [];
      this.formLabelAlign.testMachineCode = [];

      this.dialogFormVisible = true;

      this.formLabelAlign.awardPool = data.awardPool; //下期奖池
      this.formLabelAlign.isAble = data.isAble.toString(); //是否可用
      this.formLabelAlign.lotteryTypeValue = data.lotteryType.toString(); //彩种
      this.formLabelAlign.openResultTime = this.changeTime(data.openDateTime); //开奖时间
      if (data.result) {
        this.formLabelAlign.result = data.result.split(","); //开奖结果
      }
      if (data.testMachineCode) {
        this.formLabelAlign.testMachineCode = data.testMachineCode.split(","); //试机号
      }
      //   this.formLabelAlign.resultDetail = data.resultDetail;
      //   this.formLabelAlign.status = data.status; //状态
      this.formLabelAlign.term = data.term; //彩期
      this.formLabelAlign.totalAmount = data.totalAmount; //投注金额
      //结果详情
      let arr = [];
      let newArr = [];

      console.log(data.resultDetail);
      //首先判断resultDetail是否有值
      if (data.resultDetail != null) {
        //对数据第一个是否是#作判断 如果第一个是#则把#删除再分割字符串
        if (data.resultDetail.slice("0", "1") === "#") {
          arr = data.resultDetail.slice("1").split("#");
        } else {
          arr = data.resultDetail.split("#");
        }
      }
      console.log(data.resultDetail);
      console.log(arr);
      for (var i = 0; i < arr.length; i++) {
        newArr.push(arr[i].split("^"));
      }
      console.log(newArr);
      for (var j = 0; j < newArr.length; j++) {
        console.log(newArr[j][1]);
        this.prizeNum.push(newArr[j][1]);
        this.prizeBonus.push(newArr[j][2]);
      }
      //根据彩种判断显示
      if (this.formLabelAlign.lotteryTypeValue === "1") {
        //大乐透
        this.bigLotto = true;
        this.sevenStar = false;
        this.arrThree = false;
        this.arrFive = false;
      } else if (this.formLabelAlign.lotteryTypeValue === "2") {
        //七星彩
        this.bigLotto = false;
        this.sevenStar = true;
        this.arrThree = false;
        this.arrFive = false;
      } else if (this.formLabelAlign.lotteryTypeValue === "3") {
        //排列3
        this.bigLotto = false;
        this.sevenStar = false;
        this.arrThree = true;
        this.arrFive = false;
      } else if (this.formLabelAlign.lotteryTypeValue === "4") {
        //排列5
        this.bigLotto = false;
        this.sevenStar = false;
        this.arrThree = false;
        this.arrFive = true;
      }
    },
    //修改
    getroid() {
      let arr1 = [];
      let arr2 = [];
      let newArr = [];
      let newArr2 = [];
      arr1 = this.prizeNum;
      arr2 = this.prizeBonus;
      for (var i = 0; i < arr1.length; i++) {
        newArr.push("prize" + (i + 1) + "^" + arr1[i] + "^"); //格式拼接中奖注数：prize1^0^
      }
      for (var k = 0; k < arr2.length; k++) {
        newArr2.push(newArr[k] + arr2[k]); //格式拼接上奖金：prize1^0^0
      }
      this.resultDetail = newArr2.join("#"); //结果详情最终拼接：prize1^0^0#prize2^4^70865#prize3^98^1800#prize4^1585^300#prize5^21353^20#prize6^263084^5
      //把需要判断为空的参数放入一个数组
      let arr = [
        this.formLabelAlign.awardPool,
        this.formLabelAlign.lotteryTypeValue,
        this.formLabelAlign.openResultTime,
        this.formLabelAlign.result,
        this.formLabelAlign.term,
        this.formLabelAlign.testMachineCode,
        this.formLabelAlign.totalAmount
      ];

      let num = ""; //中奖数和奖金的个数
      let testNum = ""; //试机号的个数
      console.log(this.bigLotto);
      console.log(this.arrThree);
      if (this.bigLotto) {
        num = 11;
        testNum = 7;
      } else if (this.sevenStar) {
        num = 6;
        testNum = 7;
      } else if (this.arrThree) {
        num = 3;
        testNum = 3;
      } else if (this.arrFive) {
        num = 1;
        testNum = 5;
      }
      console.log(num);
      console.log(this.prizeNum);
      console.log(this.prizeBonus);

      console.log(this.prizeNum.length);
      console.log(this.prizeBonus.length);
      console.log(arr);
      //判断是否每个输入框都有值
      if (
        arr.indexOf(null) === -1 &&
        arr.indexOf("") === -1 &&
        this.prizeNum.length === num &&
        this.prizeBonus.length === num &&
        this.formLabelAlign.result.indexOf("") === -1 &&
        this.formLabelAlign.result.length === testNum &&
        this.formLabelAlign.testMachineCode.indexOf("") === -1 &&
        this.formLabelAlign.testMachineCode.length === testNum
      ) {
        this.result = this.formLabelAlign.result.join(","); //传参时把数组用,拼接成字符串传
        this.testMachineCode = this.formLabelAlign.testMachineCode.join(","); //传参时把数组用,拼接成字符串传
        let obj = {
          awardPool: this.formLabelAlign.awardPool,
          isAble: "",
          lotteryTypeValue: this.formLabelAlign.lotteryTypeValue,
          openResultTime: this.formLabelAlign.openResultTime,
          result: this.result,
          resultDetail: this.resultDetail,
          status: "",
          term: this.formLabelAlign.term,
          testMachineCode: this.testMachineCode,
          totalAmount: this.formLabelAlign.totalAmount
        };
        updateTerm(obj).then(res => {
          //调用修改接口
          if (res.data.error_code === 200) {
            this.dialogFormVisible = false;
            this.$message.success(res.data.message);
            this.gettable();
          } else {
            this.$message.error(res.data.message);
          }
        });
      } else {
        this.$message("输入框不能为空！");
      }
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
    //查看明细
    showdetail(data) {
      let obj = {
        page: this.page,
        pageSize: this.pageSize,
        lotteryTypeValue: data.lotteryType,
        term: data.term
      };
      findTerm(obj).then(res => {
        this.walletData = res.data.data.list;
      });
    }
  }
};
</script>

<style scoped>
.midder {
  padding: 10px 20px;
}
</style>
