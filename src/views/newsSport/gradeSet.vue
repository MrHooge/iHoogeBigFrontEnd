<template>
    <div class="Sunburn">
        <div class="box">
            <el-input v-model="account" placeholder="请输入用户名" style="width: 180px;" clearable></el-input>
            <el-button type="primary" style="margin-left:30px;margin-bottom:30px;" @click="search">搜索</el-button>
            <el-select v-model="vip" placeholder="等级排序" @change="changeData">
                <el-option
                v-for="item in gradeOptions"
                :key="item.vip"
                :label="item.label"
                :value="item.vip">
                </el-option>
            </el-select>
        </div>
        <!-- 表格数据 -->
        <el-table
            :data="tablelist"
            border
            style="width: 100%">
            <el-table-column
                type="index"
                label="编号"
                align="center">
            </el-table-column>
            <el-table-column
                prop="account"
                label="用户名"
                align="center">
            </el-table-column>
            <el-table-column
                prop="mobile"
                label="联系方式"
                align="center">
            </el-table-column>
            <el-table-column
                label="等级"
                align="center">
                <template slot-scope="scope">
                    {{scope.row.vip | changeVip}}
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
                align="center">
                <template slot-scope="scope">
                    <el-button type="primary" @click="showSetDialog(scope.row)">
                        修改
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
         <!-- 修改弹窗 -->
        <el-dialog
                title="修改等级抽佣"
                :visible.sync="dialogVisible"
                width="500px">
                <div>
                    VIP等级: <el-input type="text" v-model="updataVip" style="width:20%;margin:20px;" clearable></el-input><br>
                    <el-button type="primary" style="margin-left:300px;" @click="updataSure">确认修改</el-button>
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
            :total="totalList"
            v-if="totalList != ''"
            layout="total, sizes, prev, pager, next, jumper"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import setTime from '@/utils/time.js'
import axios from "axios";
import { newCardList } from "@/api/assport.js";
export default {
  data() {
    return {
      tablelist: [], // 表格数据
      account: "", // 用户名
      stime:'',
      etime:'',
      page:1,
      pageSize: 20,
      totalList: 0,
      vip: '',  //等级的排序
      gradeOptions: [
        { vip: "0", label: "降序"},
        { vip: "1", label: "升序"},
      ],
      fansNum: '',   //粉丝数的排序
      fansOptions: [
        { fansNum: "0", label: "降序"},
        { fansNum: "1", label: "升序"},
      ],
      usage: "",   //体验券使用情况
      usageOptions: [
        { usage: "0", label: "未使用"},
        { usage: "1", label: "已使用"},
        { usage: "2", label: "已过期"} 
      ],
      dialogVisible: false, //修改等级弹窗
      updataVip: "",
      username: ""
    }
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
    },
    cardType(val){
        if(val === 0){
            return '优惠券统计'
        }
    },
    setTime(a) {
      if (a != null) {
        return setTime(a);
      }
    },
    changeVip(val){
        val = Number(val)
        if(val === 0){
            return 'v0'
        }else if(val === 1){
            return 'v1'
        }else if(val === 2){
            return 'v2'
        }else if(val === 3){
            return 'v3'
        }else if(val === 4){
            return 'v4'
        }else if(val === 5){
            return 'v5'
        }else if(val === 6){
            return 'v6'
        }else if(val === 7){
            return 'v7'
        }else if(val === 8){
            return 'v8'
        }
    }
    
  },
  created() {
    this.getTable();//默认显示充值流水
  },
  methods: {
      showSetDialog(val){
          console.log(val)
          this.dialogVisible = true
          this.updataVip = val.vip
          this.username = val.account
      },
      //修改等级
      updataSure(){
        let model = {
            account: this.username,
            vip: this.updataVip
        };
        axios.get('http://192.168.1.37:10130/memberManage/updateLevel',{params: model}).then(res=>{
            console.log(res)
            if (res.status == 200) {
                if(res.data.error_code === 200){
                    this.dialogVisible = false
                    this.$message.success(res.data.message)
                    this.getTable()
                }else{
                    this.$message.error(res.data.message)
                }
            }
        })
        // updateLevel(model)
        // .then(res => {
        //     console.log(res)
        //     if (res.status == 200) {
        //         if(res.data.error_code === 200){
        //             this.dialogVisible = false
        //             this.$message.success(res.data.message)
        //             this.getTable()
        //         }else{
        //             this.$message.error(res.data.message)
        //         }
        //     }
        // });
    },
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
    //搜索
    search(){
        this.page = 1
        this.getTable()
    },
    changeData(){
        this.page = 1
        this.getTable()
    },
    //获取列表数据
    getTable() {
      let model = {
        account: this.account,
        fansNum: this.fansNum,
        offset: this.page,
        pageSize: this.pageSize,
        type: this.usage,
        vip: this.vip
      };
    //   axios.get('http://192.168.1.37:10130/memberManage/newCardList',{params: model}).then(res=>{
    //     if (res.status == 200) {
    //         if(res.data.error_code === 200){
    //             this.tablelist = res.data.data.list
    //             this.totalList = res.data.data.total
    //         }else{
    //             this.$message.error(res.data.message)
    //         }
    //     }
    //   })
      newCardList(model)
        .then(res => {
            console.log(res)
            if (res.status == 200) {
                if(res.data.error_code === 200){
                    this.tablelist = res.data.data.list
                    this.totalList = res.data.data.total
                }else{
                    this.$message.error(res.data.message)
                }
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
