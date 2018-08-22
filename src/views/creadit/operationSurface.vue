<template>
    <div class="backend">
			<!--  代理给客户加款流水 -->
        <div class="search">
            <el-input v-model="input1" placeholder="请输入会员名进行查询" style="width:60%;"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
        </div>
        <div class="warning">
          <i class="el-icon-star-on"></i>
          <span>支持当前页数据模糊搜索,输入会员名全称进行精确查找</span>
        </div>
        <el-table :data="memberfilter" border style="width: 100%;">
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
            prop="updateTime"
            align="center"
            label="时间">
            </el-table-column>

            <el-table-column
              align="center"
              width="280"
              prop="operator"
              label="操作人">
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        	<!-- <div class="page">
						<el-pagination background
						               :page-size=10
						               @current-change="changepage"
						               layout="prev, pager, next"
						               :total="total">
						</el-pagination>
					</div> -->
    </div>
</template>

<script>
import { getCreditLimitLine } from '@/api/sys_user'
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
      input1: "",
      tableData: [] //表格数据
    };
  },
  created() {
    this.getData(1,'');
  },
  // 按照会员名称进行筛选
  computed:{
    memberfilter:function(){
      return this.tableData.filter((name) =>{
          return name.account.match(this.input1)
      })
    }
  },
  methods: {
    search() {
      // console.log(this.input1);
      this.getData(1, this.input1);
    },
    // 点击授信额度弹窗
    layer() {
      console.log(1);
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
		getData(curr,a){
				let obj = {
				page: curr,
				pageSize: 20,
				loginAccount: getCookies('name'),
				account:a,
			};
			getCreditLimitLine(obj).then(res=>{
					console.log(res)
					if(res.status==200 ){
						this.total = res.data.totalCount;
            this.tableData = res.data.data;
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
