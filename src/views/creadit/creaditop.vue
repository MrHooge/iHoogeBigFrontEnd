<template>
	<div class="backend">
		<div class="search">
			<el-input v-model="username"
			          placeholder="请输入会员名进行查询"
			          style="width:12%;" @input="onInput"></el-input>
			<el-input v-model="operator"
			          placeholder="请输入操作人进行查询"
			          style="width:12%;"></el-input>
            <el-date-picker
            v-model="stime"
            type="date"
            style="margin-bottom:40px;margin-right:20px;width:200px"
            placeholder="请选择开始日期"
            value-format="yyyy-MM-dd">
            </el-date-picker>          
            <el-date-picker
            v-model="etime"
            align="right"
            value-format="yyyy-MM-dd"
            type="date"
            style="margin-left:10px;
            width:200px
            margin-bottom:40px;"
            placeholder="请选择结束日期"
            >
            </el-date-picker>		  
			<el-button type="primary"
			           icon="el-icon-search"
			           @click="search">搜索</el-button>
			<el-select v-model="value"
			           placeholder="请选择状态筛选数据"
			           @change="getval">
				<el-option v-for="item in options"
				           :key="item.value"
				           :label="item.label"
				           :value="item.value">
				</el-option>
			</el-select>
		</div>

		<el-table :data="tableData"
		          border
		          style="width: 100%;">
			<!-- <el-table-column prop="account"
			                 label="会员名"
			                 align="center">
			</el-table-column> -->
            <el-table-column type="index" align="center" label="编号"></el-table-column>
			<el-table-column prop="username"
			                 label="昵称"
			                 align="center">
			</el-table-column>
			
			<el-table-column prop="name"
			                 label="真实姓名"
			                 align="center">
			</el-table-column>

			<el-table-column prop="mobile"
			                 label="手机号"
			                 align="center">
			</el-table-column>

			<el-table-column align="center"
			                 label="时间">
				<template slot-scope="scope">
					<span>{{ scope.row.createTime }}</span>
				</template>
			</el-table-column>

			<el-table-column prop="amount"
			                 label="金额"
			                 align="center">
			 </el-table-column>

			<el-table-column align="center"
			                 label="状态">
				<template slot-scope="scope">
					<span>{{ getStr(scope.row.status) }}</span>
				</template>
			</el-table-column>

			<el-table-column prop="operator"
			                 align="center"
			                 label="操作人">
			</el-table-column>

			<el-table-column align="center"
			                 width="180px"
			                 label="操作">
				<template slot-scope="scope">
					<div v-if="scope.row.status==0">
						<el-button size="mini"
						           type="primary"
						           @click="examine(scope.row)">审核</el-button>
						<el-button size="mini"
						           type="danger"
						           @click="reject(scope.row)">驳回</el-button>
					</div>
					<div v-else>
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
				<p>手机号：{{ c }}</p>
			</div>
			<span slot="footer"
			      class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary"
				           @click="confirm(c)">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 驳回弹窗 -->
		<el-dialog title="您确定要驳回以下会员的审核吗？"
		           :visible.sync="dialogVisible1"
		           width="30%">
			<div>
				<p>姓名：{{ a }}</p>
				<p>金额：{{ b }}</p>
				<p>手机号：{{ c }}</p>
			</div>
			<span slot="footer"
			      class="dialog-footer">
				<el-button @click="dialogVisible1 = false">取 消</el-button>
				<el-button type="primary"
				           @click="sure()">确 定</el-button>
			</span>
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
            >
            </el-pagination>
	</div>
</template>

<script>
import { getCreditRefund, passCreditRefundApply, refuseCreditRefundApply } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
	data() {
		return {
			pageshow: false,
			username: '',
			dialogVisible: false,
			dialogVisible1: false,
			total: 0,
			stime:'',
			etime:'',
			page:1,
			pageSize:20,
			a: "",
			b: "",
			c: "",
			ob: "",
			tableData: [], // 存储表数据
			options: [
				{ value: "", label: "全部" },
				{ value: "0", label: "待审核" },
				{ value: "1", label: "已审核" },
				{ value: "2", label: "被驳回" }
			],
            value: '',
            operator: '',
            totalList: 0,
		};
	},
	created() {
		//   调接口返回数据
		this.getData(this.username, this.value,this.operator);
	},
	methods: {
		 //翻页
        handleCurrentChange(num){
            this.page = num;
            this.getData(this.username, this.value,this.operator);
        },
        //改变页面大小
        handleSizeChange(num){
            this.pageSize = num;
            this.getData(this.username, this.value,this.operator);
        },
		onInput(){
			if(this.username==''){
				this.getData(this.username, this.value,this.operator);
			}
		},
		//   下拉选择框的筛选
		getval() {
			// console.log(this.value);

			this.getData(this.username, this.value,this.operator);
		},
		//   搜索查询
		search() {
			if (this.value == '全部') {
				console.log('111111')
				this.value == ''
			}
			// console.log(this.value)
			this.getData(this.username, this.value,this.operator);
		},
		//   接口返回数据数字转换成汉字
		getStr(num) {
			if (num == 0) {
				return "待审核";
			} else if (num == 1) {
				return "已审核";
			} else {
				return "被驳回";
			}
		},

		// 获取接口数据
		getData(name, s,m) {
			let obj = {
				page: this.page,
				pageSize: this.pageSize,
				account: name,
				operator:m,
				startTime:this.stime,
				endTime:this.etime,
				status: s,
				loginAccount: getCookies('name')
			};
			getCreditRefund(obj).then(res => {
				console.log(res)
				if (res.status == 200) {
					this.totalList = res.data.data.total;
					this.tableData = res.data.data.list;
				}
			})
		},

		// getData(currpage, name, s) {
		//   let obj = { page: currpage, pageSize: 10, account: name, status: s,loginAccount:localStorage.getItem('account') };
		//   this.$http.get(api.pay +'/xxPay/getCreditRefund', { params: obj })
		//     .then(res => {
		//       if (res.status == 200) {
		//         console.log(res.data.data)
		//         this.total = res.data.totalCount;
		//         this.tableData = res.data.data;
		//       }
		//     });
		// },
		// 获取当前的点击页码
		changepage(val) {
			this.getData(val);
		},
		// 询问弹出框
		examine(a) {
			this.a = a.name;
			this.b = a.amount;
			this.c = a.mobile;
			this.dialogVisible = true;
			this.ob = a;
		},
		// 确定的回调
		confirm() {
			console.log(this.ob);
			let obj = {
				account: getCookies('name'),
				id: this.ob.id
			}
			passCreditRefundApply(obj).then(res => {
				console.log(res)
				if (res.status == 200) {
					Message.success("审核成功！")
					this.getData(1, this.username, this.value);
					this.dialogVisible = false;
				}
			})
		},
		// 驳回弹窗
		reject(a) {
			this.dialogVisible1 = true;
			this.a = a.name;
			this.b = a.amount;
			this.c = a.mobile;
			this.ob = a;
		},
		// 驳回弹窗的确定回调
		sure() {
			let obj = {
				account: getCookies('name'),
				id: this.ob.id
			};
			refuseCreditRefundApply(obj).then(res => {
				console.log(res)
				if (res.status == 200) {
					Message.success("驳回成功！")
					this.getData(1, this.username, this.value);
					this.dialogVisible1 = false;
				}
			})
			// this.$http
			// 	.get(api.pay + "/xxPay/refuseCreditRefundApply", {
			// 		params: obj
			// 	})
			// 	.then(res => {
			// 		if ((res.status = 200)) {
			// 			this.$message("驳回成功！");
			// 			this.getData(1)
			// 			this.dialogVisible1 = false;
			// 		}
			// 	});
		}
	}
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.el-dialog__body {
  padding: 0 30px;
}
.backend {
  padding: 7px;
  width: 99.5%;
  .search {
    padding: 10px 0;
  }
  .page {
    margin-top: 10px;
    float: right;
  }
}
</style>
