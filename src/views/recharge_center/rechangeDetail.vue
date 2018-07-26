<template>
    <div class="chongzhi app-container">
        <!-- 顶部筛选 -->
        <div class="topten">
            <el-row :gutter="20">
                <el-col :span="6">
                    <div class="grid-content bg-purple">
                        <el-input v-model="name" placeholder="请输入需要充值的账号" @input="onInput"></el-input>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-purple" @click="search">
                        <el-button type="primary" icon="el-icon-search">搜索</el-button>
                    </div>
                </el-col>
            </el-row>  
        </div>
         <!-- 表格数据  -->
        <el-table
            :data="tableData" border
            style="width: 100%">
            <el-table-column
            label="用户名" align="center">
            <template slot-scope="scope">
                {{ scope.row.account }}
            </template>
            </el-table-column>
            <el-table-column
            label="可用金额" align="center">
            <template slot-scope="scope">
                {{ scope.row.ableBalance }}
            </template>
            </el-table-column>

            <el-table-column
            label="冻结金额" align="center">
            <template slot-scope="scope">
                {{ scope.row.freezeBalance }}
            </template>
            </el-table-column>

            <el-table-column
            label="充值金额" align="center">
            <template slot-scope="scope">
                 <el-input v-model="scope.row.number" placeholder="请输入需要充值的金额"></el-input>
            </template>
            </el-table-column>

            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    @click="handleRepy(scope.row)">充值</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="page">
            			<el-pagination background
			               :page-size=20
			               @current-change="changepage"
			               layout="prev, pager, next"
			               :total="total">
			</el-pagination>
        </div>
    </div>
</template>

<script>
import { getMemberWalletLineByXx} from "@/api/sys_user";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message, Checkbox } from "element-ui";
import treeTable from "@/components/TreeTable";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
export default {
  data() {
    return {
      name: "", // 用户名
      number: "", // 充值的金额
      total:0, // 总页数
      tableData:[] //表格的数据
    };
  },
  created(){
		// this.search(1)
		this.getData(1)
  },
  methods: {
		onInput(){
			if(this.name==''){
				this.getData(1,this.name)
			}
			console.log(this.name)
		},
		search(){
		this.getData(1,this.name)
		},
		getData(curr,a){
			let obj ={
				page:curr,
				pageSize:10,
				account:a,
			}
			console.log(obj)
			getMemberWalletLineByXx(obj).then(res=>{
				console.log(res)
				if(res.status==200){
					this.tableData = res.data.data
					this.total = res.data.totalCount
				}
			})
		},

    // 分页的回调
    changepage(val){
		this.getData(val)
    },
    // 点击充值掉接口
    handleRepy(row){
        console.log(row)
    }
  }
};
</script>

<style scoped>
div.page{
    float: right;
    padding: 10px 0;
}
.topten {
  padding: 10px 0;
  margin-bottom: 20px;
}
</style>