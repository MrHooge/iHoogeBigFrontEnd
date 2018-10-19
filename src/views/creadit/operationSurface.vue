<template>
    <div class="backend">
			<!--  代理给客户加款流水 -->
        <div class="search">
            <el-input v-model="input1" placeholder="请输入会员名进行查询" style="width:30%;" clearable></el-input>
            <el-input v-model="username" placeholder="请输入昵称查询" style="width:30%;" clearable></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </div>
        <div class="warning">
          <i class="el-icon-star-on"></i>
          <span>支持当前页数据模糊搜索,输入会员名全称进行精确查找（注：模糊查询查到后还需要再次点击搜索按钮！！！）</span>
        </div>
        <el-table :data="memberfilter" border style="width: 100%;">
            <el-table-column type="index" align="center" label="编号"></el-table-column>
            <el-table-column
            prop="updateTime"
            align="center"
            label="时间">
            </el-table-column>
            <el-table-column
            prop="account"
            label="会员名"
            align="center"
            width="180">
            </el-table-column>

            <el-table-column
            align="center"
            label="类型">
                <template slot-scope="scope">
                    <span>{{ getStr(scope.row.type) }}</span>
                </template>  
            </el-table-column>

            <el-table-column
            align="center"
            label="授信额度">
            <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                    {{ scope.row.creditLimit }}
                </div>
            </template>
            </el-table-column>

            <el-table-column
              align="center"
              width="280"
              prop="operator"
              label="操作人">
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
            style="margin-top:40px"
            >
        </el-pagination>
    </div>
</template>

<script>
import { getCreditLimitLine } from '@/api/sys_user'
import { findAllMember} from '@/api/customer'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
  data() {
    return {
      input1: "",
      total: 0, //分页数
      dialogVisible: false, //控制弹窗隐藏
      tableData: [], //表格数据
      page:1,
      pageSize:20,
      totalList: 0,
      username: "",   //输入查询的昵称
    };
  },
  created() {
    this.getData('');
  },
  // 按照会员名称进行筛选
  computed:{
    memberfilter:function(){
        if(this.tableData){
            return this.tableData.filter((name) =>{
                return name.account.match(this.input1)
            })
        }
    }
  },
  methods: {
      
    //翻页
    handleCurrentChange(num){
        this.page = num;
        this.getData('')
    },
    //改变页面大小
    handleSizeChange(num){
        this.pageSize = num;
        this.getData('')
    },
    search() {
        if (!this.input1 && !this.username) {
            // this.$message("请输入您要查询的账号或昵称！")
            this.getData(this.input1);
        } else {
            if(this.input1 === ''){
                this.getAccount()
            }else{
                this.page = 1
                this.getData(this.input1);
                this.getUsername()
            }
        }
    },
    //用昵称查询账号
    getAccount(){
        let obj = {
            username: this.username
        }
        findAllMember(obj).then(res => {
            this.input1 = res.data.data.list[0].ACCOUNT
            this.page = 1
            this.getData(this.input1);
        })
    },
    //用账号查询昵称
    getUsername(){
        let obj = {
            account: this.input1
        }
        findAllMember(obj).then(res => {
            this.username = res.data.data.list[0].username
        })
    },
    // 点击授信额度弹窗
    layer() {
    },
    //   数字转换
    getStr(num) {
      if (num == 0) {
        return "渠道";
      } else if (num == 1) {
        return "代理";
      }
    },
    // 调接口数据
    getData(a){
            let obj = {
            page: this.page,
            pageSize: this.pageSize,
            loginAccount: getCookies('name'),
            account: a,
        };
        getCreditLimitLine(obj).then(res=>{
            if(res.data.success === true){
                this.total = res.data.totalCount;
                this.tableData = res.data.data.list;
                this.totalList = res.data.data.total
            }else{
                this.totalList = 0
                this.$message.error(res.data.msg)
            }
        })
    },
    // 获取当前的点击页码
    changepage(val) {
      this.getData(val);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.backend {
  padding: 7px;
  width: 99.5%;
  .search {
    padding: 10px 0;
  }
  .warning{
    color: #E6A23C;
    font-size: 14px;
    padding-bottom: 15px;
  }
  .page {
    margin-top: 10px;
    float: right;
  }
  table tbody tr.el-table__row td.is-center:nth-child(6) {
    cursor: pointer;
  }
}
</style>
