<template>
    <div class="backend app-container">
        <div class="layerbody">
            <div class="search">
                <!-- <el-select v-model="type"
                           placeholder="请选择举报类型"
                           style="width:140px;margin-right: 50px;"
                           @change="report">
                    <el-option v-for="item in options1"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                </el-select> -->
                <!-- <el-select v-model="states"
                           placeholder="请选择审核状态"
                           style="width:140px;margin-right: 50px;"
                           @change="examine">
                    <el-option v-for="item in options2"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                    </el-option>
                </el-select> -->
                开始时间：
                <el-date-picker v-model="startDate"
                                type="datetime"
                                style="margin-bottom:40px;margin-right:20px;width:200px"
                                placeholder="请选择开始日期"
                                value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
                结束时间：
                <el-date-picker v-model="endDate"
                                align="right"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                default-time="23:59:59"
                                type="datetime"
                                style="margin-left:10px;
                    width:200px
                    margin-bottom:40px;"
                                placeholder="请选择结束日期">
                </el-date-picker>
                <el-button type="primary"
                           icon="el-icon-search"
                           @click="search">搜索</el-button>

            </div>
            <div class="main">
                <el-table :data="tableData"
                          border
                          tooltip-effect="dark"
                          style="width: 100%">
                    <el-table-column label="id"
                                     prop="id"
                                     align="center">
                    </el-table-column>
                    <el-table-column label="反馈人账号"
                                     prop="account"
                                     align="center">
                    </el-table-column>
                    
                    <el-table-column label="反馈内容"
                                     prop="content"
                                     align="center">
                    </el-table-column>
                    <el-table-column label="反馈人的联系方式"
                                     prop="phone"
                                     align="center">
                    </el-table-column>
                    <el-table-column label="反馈理由"
                                     prop="reason"
                                     align="center">
                    </el-table-column>
                    <el-table-column label="反馈时间"
                                     align="center">
                        <template slot-scope="scope">
                            {{scope.row.time | setTime}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
        <div class="page"
             style="padding:30px 0">
            <el-pagination background
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
    </div>
</template>

<script>
import setTime from '@/utils/time.js'
import { getFeedbackList } from "@/api/personal_review.js";
import { findAllMember } from "@/api/customer";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message } from "element-ui";
import treeTable from "@/components/TreeTable";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
export default {
  data() {
    return {
      account: "", //用户名
      username: "", //昵称
      startDate: "",
      endDate: "",
      page: 1,
      pageSize: 20,

      totalList: 0, //总页数
      tableData: [] //表格数据
    };
  },
  created() {
    this.getData();
  },
  filters: {
    setTime(a) {
      if (a != null) {
        return setTime(a);
      }
    },
  },
  methods: {
    //查询
    search() {
      this.getData();
    },
    //获取数据列表
    getData() {
      let obj = {
        startDate: this.startDate || "",
        endDate: this.endDate || "",
        offset: this.page,
        pageSize: this.pageSize
      };
      getFeedbackList(obj).then(res => {
        console.log(res);
        if (res.data.error_code === 200) {
          this.tableData = res.data.data.list;
          this.totalList = res.data.data.total;
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //改变页面大小
    handleSizeChange(num) {
      this.pageSize = num;
      this.getData();
    },
    //翻页
    handleCurrentChange(num) {
      this.page = num;
      this.getData();
    }
  }
};
</script>

<style scoped>
