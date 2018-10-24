<template>
    <div class="LuckyDraw">
        <div class="btnbox">
            <el-button type="primary" @click="addactivey">添加活动</el-button>
            <el-button type="primary" @click="givemoney">充值送彩金卡</el-button>
            <el-button type="primary" @click="modifyCard">修改彩金卡及大转盘</el-button>
            <el-button type="primary" @click="modidyActivity">修改手工充值赠送彩金卡</el-button>
            <el-button type="primary" @click="givePrizes">充值赠送彩金</el-button>

            <!-- 充值送彩金卡 -->
            <el-dialog
                title="充值送彩金卡"
                :visible.sync="dialogVisible0"
                width="500px">
                <div class="">
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                用户名
                            </div>
                        </el-col>
                        <el-col :span="15">
                            <div class="grid-content bg-purple-light">
                                <el-input v-model="account" placeholder="请输入用户名" clearable></el-input>
                                <p style="color:red;font-size:14px;">注：不知道用户名时可用昵称查询！</p>
                                <el-input v-model="username" placeholder="请输入昵称" style="width:210px;margin-bottom:20px;" clearable></el-input>
                                <el-button type="primary" @click="getAccount">查询</el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <br>
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                金额
                            </div>
                        </el-col>
                        <el-col :span="15">
                            <div class="grid-content bg-purple-light">
                                <!-- <el-input v-model="money" placeholder="请输入赠送金额" type="number" clearable></el-input> -->
                                <el-select v-model="money" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible0 = false">取 消</el-button>
                    <el-button type="primary" @click="sure1">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 修改彩金卡及大转盘 -->
            <el-dialog
                title="修改彩金卡及大转盘"
                :visible.sync="dialogVisible1">
                <el-table
                    ref="multipleTable"
                    :data="tableData1"
                    tooltip-effect="dark"
                    style="width: 100%"
                    border
                    >
                    <el-table-column
                        prop="id"
                        align="center"
                        label="id">
                    </el-table-column>
                        
                    <el-table-column
                        align="center"                
                        label="满额度使用">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.full_money"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"                
                        label="价值金额">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.money"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"                
                        label="名字">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.name"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"                
                        label="获得概率">
                        <template slot-scope="scope">
                            <el-input value="0" v-if="scope.row.prob === 0"></el-input>
                            <el-input v-model="scope.row.prob" v-else></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"                
                        label="操作">
                        <template slot-scope="scope">
                            <!-- <el-button v-if="scope.row.full_money === -1" disabled>修改</el-button> -->
                            <el-button type="primary" @click="modifyCardkuang(scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
            <!-- 弹窗事件 -->
            <el-dialog title="确认修改"
                        :visible.sync="isSure1"
                        width="40%">
                <span slot="footer" class="dialog-footer">
                    <el-button @click="isSure1 = false" type="primary">取消</el-button>
                    <el-button @click="modifyCardSure()" type="success">确定</el-button>
                </span>
            </el-dialog>
            <!-- 修改手工充值赠送活动 -->
            <el-dialog
                title="修改手工充值赠送活动"
                :visible.sync="dialogVisible2">
                <p>1.录入起始金额</p>
                <p>2.彩金卡必须是当前已有彩金卡，否则无法使用</p>
                <p>3.赠送彩金卡以数字加英文逗号隔开，可重复（例如：24,8,8,80 即24元彩金卡一张，8元两张，80元一张）</p>
                <el-table
                    ref="multipleTable"
                    :data="tableData2"
                    tooltip-effect="dark"
                    style="width: 100%"
                    border
                    >
                    <el-table-column
                        prop="id"
                        align="center"
                        label="id">
                    </el-table-column>
                    <el-table-column
                        align="center"                
                        label="起始金额">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.begin_money"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"                
                        label="赠送内容">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.content"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"                
                        label="结束金额">
                        <template slot-scope="scope">
                            <el-input v-model="scope.row.end_money"></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"                
                        label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="modidyActivitykuang(scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
            <!-- 弹窗事件 -->
            <el-dialog title="确认修改"
                        :visible.sync="isSure2"
                        width="30%">
                <span slot="footer" class="dialog-footer">
                    <el-button @click="isSure2 = false" type="primary">取消</el-button>
                    <el-button @click="modidyActivitySure()" type="success">确定</el-button>
                </span>
            </el-dialog>

            <!-- 充值赠送彩金 -->
            <el-dialog
                title="充值赠送彩金"
                :visible.sync="dialogVisible3"
                width="80%">
                <el-button type="primary" style="margin-left:1365px;margin-bottom:20px;" @click="addPresentes">添加</el-button>
                <el-table
                    ref="multipleTable"
                    :data="tableData3"
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
                        prop="begin_money"               
                        label="起始金额">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="end_money"              
                        label="结束金额">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="send_money"               
                        label="赠送金额">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="send_percentage"            
                        label="赠送百分比">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="类别">
                        <template slot-scope="scope">
                            {{scope.row.is_percentage | isPercentage}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        label="选择">
                        <template slot-scope="scope">
                            {{scope.row.is_use | isUse}}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"                
                        label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" @click="givePrizeskuang(scope.row)">修改</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-dialog>
            <!-- 弹窗事件 -->
            <el-dialog :visible.sync="isSure3">
                <el-form>
                    <el-form-item label="开始金额">
                        <el-input v-model="begin_money" auto-complete="off" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="结束金额">
                        <el-input v-model="end_money" auto-complete="off" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="类别：">
                        <el-radio-group v-model="is_percentage" size="mini">
                            <el-radio label="0">金额</el-radio>
                            <el-radio label="1">百分比</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="状态：">
                        <el-switch
                            v-model="is_use"
                            active-text="开启"
                            inactive-text="关闭">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="赠送金额">
                        <el-input v-model="send_money" auto-complete="off" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="赠送百分比">
                        <el-input v-model="send_percentage" auto-complete="off" clearable></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="isSure3 = false">取 消</el-button>
                    <el-button type="primary" @click="givePrizesSure">确 定</el-button>
                </div>
            </el-dialog>
            
            <!-- 弹窗事件 添加充值赠送彩金 -->
            <el-dialog :visible.sync="isSure4">
                <el-form v-model="addForm">
                    <el-form-item label="开始金额">
                        <el-input v-model="addForm.begin_money" auto-complete="off" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="结束金额">
                        <el-input v-model="addForm.end_money" auto-complete="off" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="类别：">
                        <el-radio-group v-model="addForm.is_percentage" size="mini">
                            <el-radio label="0">金额</el-radio>
                            <el-radio label="1">百分比</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="状态：">
                        <el-switch
                            v-model="addForm.is_use"
                            active-text="开启"
                            inactive-text="关闭">
                        </el-switch>
                    </el-form-item>
                    <el-form-item label="赠送金额">
                        <el-input v-model="addForm.send_money" auto-complete="off" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="赠送百分比">
                        <el-input v-model="addForm.send_percentage" auto-complete="off" clearable></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="isSure4 = false">取 消</el-button>
                    <el-button type="primary" @click="addPresentesSure">确 定</el-button>
                </div>
            </el-dialog>

        </div>
        <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            align="center"
            label="活动名称">
            <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.activity_name }}</span>
            </template>
            </el-table-column>
            <el-table-column
            align="center"
            label="活动内容" >
            <template slot-scope="scope">
                <span>{{scope.row.content}}</span>
            </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="活动描述" >
                <template slot-scope="scope">
                    <span>{{scope.row.description}}</span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="开始时间" >
                <template slot-scope="scope">
                    <span>{{scope.row.start_time | times}}</span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="结束时间" >
                <template slot-scope="scope">
                    <span>{{scope.row.end_time | times}}</span>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                label="活动状态" >
                <template slot-scope="scope">
                    <span>
                        {{scope.row.is_switch | status}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="操作" algin="center">
            <template slot-scope="scope">
                <el-button
                size="mini"
                type="primary"
                @click="handleEdit(scope.row)">编辑</el-button>
                <!-- <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button> -->
            </template>
            </el-table-column>
        </el-table>
        <!-- 添加活动的弹窗 -->
        <el-dialog
            :title="title"
            :visible.sync="dialogVisible"
            width="700px"
            >
            <div class="content">
                <div class="frow">
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                活动名称
                            </div>
                        </el-col>
                        <el-col :span="18">
                            <div class="grid-content bg-purple">
                                <el-input v-model="aname" clearable></el-input>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="frow">       
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                活动内容
                            </div>
                        </el-col>
                        <el-col :span="18">
                            <div class="grid-content bg-purple">
                                <el-checkbox-group v-model="checkList">
                                    <el-checkbox  v-for="(name,index) in lables" :key="index" :label="name"></el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="frow">                
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                活动描述
                            </div>
                        </el-col>
                        <el-col :span="18">
                            <div class="grid-content bg-purple">
                                <el-input v-model="description" type="textarea" clearable></el-input>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="frow">                
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                活动时间
                            </div>
                        </el-col>
                        <el-col :span="18">
                            <div class="grid-content bg-purple">
                                <el-date-picker
                                    v-model="stime"
                                    value-format="yyyy-MM-dd HH-mm-ss"
                                    type="datetimerange"
                                    placeholder="选择开始日期时间">
                                </el-date-picker>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <div class="frow">                
                    <el-row>
                        <el-col :span="4">
                            <div class="grid-content bg-purple">
                                活动状态
                            </div>
                        </el-col>
                        <el-col :span="18">
                            <div class="grid-content bg-purple">
                                <el-switch
                                    v-model="Switchstatus"
                                    active-text="开启"
                                    inactive-text="关闭">
                                </el-switch>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="sure" v-if="title=='添加活动'">确 定</el-button>
                <el-button type="primary" @click="editsure" v-else>确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
// import { addGoldCard, getAllGift, updateGift, findAllRechargeCardAct, updateRechargeCardAct} from "@/api/activity";
import {
  getActivityData,
  addActivity,
  addGoldCard,
  getAllGift,
  updateGift,
  findAllRechargeCardAct,
  updateRechargeCardAct,
  findChargePresentes,
  updateChargePresentes,
  addChargePresentes
} from "@/api/activity";
import { findAllMember } from "@/api/customer";
import { Message, MessageBox } from "element-ui";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
import setTime from "./index.js";
export default {
  data() {
    return {
      tableData: [], //表格数据
      value3: "",
      title: "",
      dialogVisible: false,
      aname: "", // 活动名称
      description: "", //描述
      checkList: [], //选中的模块
      stime: [], //活动时间
      id: "", //每条数据的id
      Switchstatus: false,
      lables: [
        "竞彩足球",
        "竞彩篮球",
        "跟单详情页",
        "冠亚军",
        "数字彩",
        "北单",
        "老足彩"
      ],

      dialogVisible0: false, //充值送彩金卡
      dialogVisible1: false, //修改彩金卡及大转盘
      dialogVisible2: false, //修改手工充值赠送活动
      dialogVisible3: false, //修改充值赠送彩金
      account: "",
      username: "",
      options: [], //存储彩金卡
      money: "",
      tableData1: [], //存储所有礼物及彩金卡数据
      tableData2: [], //存储所有充值赠送活动配置
      tableData3: [], //存储所有充值赠送彩金内容

      id: "", //存储礼物的id
      full_money: "", //存储礼物的满额度使用
      money: "", //存储礼物的价值金额
      name: "", //存储礼物的名字
      prob: "", //存储礼物的获得概率

      activityId: "", //存储充值赠送活动的id
      activityContent: "", //存储充值赠送活动的赠送彩金卡id
      activityBegin_money: "", //存储充值赠送活动的起始金额
      activityEnd_money: "", //存储充值赠送活动的结束金额

      isSure1: false,
      isSure2: false,
      isSure3: false,
      isSure4: false,

      presentesId: "", //存储id
      begin_money: "", //开始金额
      end_money: "", //结束金额
      is_percentage: "", //是赠送金额还是百分比 0为金额 1为百分比
      is_use: "", //使用开关
      isUseNum: "", //存储使用开关的数值
      send_money: "", //赠送金额
      send_percentage: "", //赠送百分比

      addForm: {
        begin_money: "",
        end_money: "",
        is_percentage: "",
        is_use: "",
        send_money: "",
        send_percentage: ""
      }
    };
  },
  filters: {
    status(a) {
      return a ? "开启" : "关闭";
    },
    times(b) {
      return setTime(b);
    },
    //类别
    isPercentage(val) {
      Number(val);
      return val === 0 ? "金额" : "百分比";
    },
    //使用状态
    isUse(val) {
      Number(val);
      return val === 0 ? "不使用" : "使用中";
    }
  },
  //获取数据
  created() {
    this.getTable();
    this.getAllCards();
  },
  methods: {
    //用昵称查询账号
    getAccount() {
      let obj = {
        username: this.username
      };
      findAllMember(obj).then(res => {
        this.account = res.data.data.list[0].ACCOUNT;
      });
    },
    //修改彩金卡及大转盘弹出框
    modifyCard() {
      this.dialogVisible1 = true;
    },
    //修改彩金卡及大转盘确定弹出框
    modifyCardkuang(val) {
      this.id = val.id;
      this.full_money = val.full_money;
      this.money = val.money;
      this.name = val.name;
      this.prob = val.prob;
      this.isSure1 = true;
    },
    //修改彩金卡及大转盘确定按钮
    modifyCardSure() {
      let obj = {
        id: this.id,
        full_money: this.full_money,
        money: this.money,
        name: this.name,
        prob: this.prob,
        limit_money: ""
      };
      updateGift(obj).then(res => {
        if (res.data.error_code === 200) {
          this.$message.success(res.data.message);
          this.isSure1 = false;
        } else {
          this.$message.error(res.data.message);
          this.isSure1 = false;
        }
      });
    },
    //修改手工充值赠送活动弹出框
    modidyActivity() {
      this.dialogVisible2 = true;
      this.getAllCardAct();
    },
    //修改手工充值赠送活动确认弹出框
    modidyActivitykuang(val) {
      this.activityId = val.id;
      this.activityContent = val.content;
      this.activityBegin_money = val.begin_money;
      this.activityEnd_money = val.end_money;
      this.isSure2 = true;
    },
    //修改手工充值赠送活动确定按钮
    modidyActivitySure() {
      let obj = {
        id: this.activityId,
        content: this.activityContent,
        begin_money: this.activityBegin_money,
        end_money: this.activityEnd_money
      };
      updateRechargeCardAct(obj).then(res => {
        if (res.data.error_code === 200) {
          this.$message.success(res.data.message);
          this.isSure2 = false;
        } else {
          this.$message.error(res.data.message);
          this.isSure2 = false;
        }
      });
    },
    //修改充值赠送彩金弹出框
    givePrizes() {
      this.dialogVisible3 = true;
      this.getGivePrizes();
    },
    //修改充值赠送彩金确认弹出框
    givePrizeskuang(val) {
      this.presentesId = val.id;
      this.begin_money = val.begin_money;
      this.end_money = val.end_money;
      this.is_percentage = val.is_percentage.toString();
      if (val.is_use === 1) {
        this.is_use = true;
      } else {
        this.is_use = false;
      }

      this.send_money = val.send_money;
      this.send_percentage = val.send_percentage;

      this.isSure3 = true;
    },
    //修改充值赠送彩金确定按钮
    givePrizesSure() {
      if (this.is_use === true) {
        this.isUseNum = 1;
      } else {
        this.isUseNum = 0;
      }
      let obj = {
        id: Number(this.presentesId),
        begin_money: Number(this.begin_money),
        end_money: Number(this.end_money),
        is_percentage: Number(this.is_percentage),
        is_use: Number(this.isUseNum),
        send_money: Number(this.send_money),
        send_percentage: Number(this.send_percentage)
      };
      updateChargePresentes(obj).then(res => {
        if (res.data.error_code === 200) {
          this.$message.success("修改成功");
          this.isSure3 = false;
          this.getGivePrizes();
        } else {
          this.$message.error("修改失败");
          this.isSure3 = false;
        }
      });
    },
    //添加充值赠送彩金
    addPresentes() {
      this.isSure4 = true;
    },
    //添加充值赠送彩金确认
    addPresentesSure() {
      let obj = {
        id: "",
        begin_money: Number(this.addForm.begin_money),
        end_money: Number(this.addForm.end_money),
        is_percentage: Number(this.addForm.is_percentage),
        is_use: Number(this.addForm.is_use),
        send_money: Number(this.addForm.send_money),
        send_percentage: Number(this.addForm.send_percentage)
      };
      addChargePresentes(obj).then(res => {
        console.log(res);
        if (res.data.error_code === 200) {
          this.$message.success("添加成功");
          this.isSure4 = false;
          this.getGivePrizes();
        } else {
          this.$message.error("添加失败");
          this.isSure4 = false;
        }
      });
    },
    //获取所有彩金卡
    getAllCards() {
      getAllGift().then(res => {
        if (res.data.error_code === 200) {
          this.tableData1 = res.data.data;
          res.data.data.forEach(e => {
            let obj = {
              value: "",
              label: ""
            };
            if (e.full_money != -1) {
              obj.value = e.money;
              obj.label = e.name;
              this.options.push(obj);
            }
          });
        }
      });
    },
    //获取所有活动
    getAllCardAct() {
      findAllRechargeCardAct().then(res => {
        if (res.data.error_code === 200) {
          this.tableData2 = res.data.data;
        } else {
          this.tableData2 = [];
        }
      });
    },

    //获取所有充值赠送彩金内容
    getGivePrizes() {
      findChargePresentes().then(res => {
        console.log(res);
        if (res.data.error_code === 200) {
          this.tableData3 = res.data.data;
        } else {
          this.tableData3 = [];
        }
      });
    },
    //弹出框
    givemoney() {
      // [this.money, this.account] = ''
      this.dialogVisible0 = true;
      // (this.money = ""), (this.account = ""), (this.dialogVisible0 = true);
    },
    //确定按钮的回调
    sure1() {
      let arr = [];
      let obj = {
        account: this.account,
        money: this.money,
        require_type: 2
      };
      arr.push(obj);
      let params = JSON.stringify(arr);
      let loginAccount = getCookies("name");
      addGoldCard(params, loginAccount).then(res => {
        if (res.data.error_code === 200) {
          this.$message.success(res.data.message);
          this.dialogVisible0 = false;
        } else {
          this.$message.error(res.data.message);
          this.dialogVisible0 = false;
        }
      });
    },
    getTable() {
      getActivityData()
        .then(res => {
          this.tableData = res.data.data;
        })
        .catch(error => {
          Message.error(error);
        });
    },
    //添加活动
    addactivey() {
      this.aname = "";
      this.checkList = [];
      this.description = "";
      this.stime = [];
      this.Switchstatus == true;
      this.title = "添加活动";
      this.dialogVisible = true;
    },
    //添加活动确定
    sure() {
      if (!this.aname) {
        this.$message("请输入活动名称");
      } else if (!this.checkList) {
        this.$message("请选择至少一个活动名称");
      } else if (!this.description) {
        this.$message("请输入活动描述");
      } else if (this.stime.length == 0) {
        this.$message("请选择活动时间");
      } else {
        let is_switch;
        if (this.Switchstatus == true) {
          is_switch = 1;
        } else {
          is_switch = 0;
        }

        let form = {
          activity_id: this.id || "",
          activity_name: this.aname,
          content: this.checkList.join(","),
          description: this.description,
          end_time: this.stime[1],
          is_edit: 0,
          start_time: this.stime[0],
          is_switch
        };

        addActivity(form).then(res => {
          if (res.data.error_code === 200) {
            Message.success("添加信息成功");
            this.dialogVisible = false;
            this.getTable();
          } else {
            Message.error(res.data.message);
          }
        });
      }
    },
    //编辑
    handleEdit(a) {
      this.stime = [];
      this.title = "编辑活动";
      this.dialogVisible = true;
      this.aname = a.activity_name;
      this.id = a.id;
      this.checkList = a.content.split(",");
      this.description = a.description;
      this.stime.push(setTime(a.start_time));
      this.stime.push(setTime(a.end_time));
      if (a.is_switch == 1) {
        this.Switchstatus = true;
      } else {
        this.Switchstatus = false;
      }
    },
    //编辑确定
    editsure() {
      if (!this.aname) {
        this.$message("请输入活动名称");
      } else if (!this.checkList) {
        this.$message("请选择至少一个活动名称");
      } else if (!this.description) {
        this.$message("请输入活动描述");
      } else if (this.stime.length == 0) {
        this.$message("请选择活动时间");
      } else {
        let is_switch;
        if (this.Switchstatus == true) {
          is_switch = 1;
        } else {
          is_switch = 0;
        }

        let form = {
          activity_id: this.id,
          activity_name: this.aname,
          content: this.checkList.join(","),
          description: this.description,
          end_time: this.stime[1],
          is_edit: 1,
          start_time: this.stime[0],
          is_switch
        };

        addActivity(form).then(res => {
          if (res.data.error_code === 200) {
            Message.success("修改信息成功");
            this.dialogVisible = false;
            this.getTable();
          } else {
            Message.error(res.data.message);
          }
        });
      }
    }
  }
};
</script>

<style scoped>
.LuckyDraw {
  padding: 0 20px;
}
.btnbox {
  padding: 20px 0;
}
div.frow {
  padding: 10px 0;
}
</style>