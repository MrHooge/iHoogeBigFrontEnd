<template>
	<div class="backend app-container">
		<div class="search">
			<el-input v-model="input1" placeholder="请输入会员名" style="width:20%;"></el-input>
			<el-input v-model="input2" placeholder="请输入昵称" style="width:20%;"></el-input>
			<el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
		</div>
		<el-table :data="tableData" border style="width: 100%;" show-summary>
            <el-table-column type="index" align="center" label="编号"></el-table-column>
            <el-table-column prop="account" label="会员名" align="center" width="180"></el-table-column>
            <el-table-column align="center" label="授信值">
                <template slot-scope="scope">
                    <el-input v-model="scope.row.creditLimit" placeholder="请输入内容"></el-input>
                </template>
            </el-table-column>
            <el-table-column prop="ableCreditBalance" align="center" label="当前可用金额"></el-table-column>
            <el-table-column prop="freezeCreditBalance" align="center" label="冻结金额"></el-table-column>
            <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="shouxin(scope.row)">授信</el-button>
                </template>
            </el-table-column>
		</el-table>
		<!-- 分页 -->
		<el-pagination
			background
      @current-change="handleCurrentChange"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="sizes, prev, pager, next"
      :total="total">
    </el-pagination>

		<!-- 弹窗事件 -->
		<el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
			<div>
				<p>会员名：{{ username }}</p>
				<p>额度：{{ money }}</p>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="makersure">确 定</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>
import { getCreditMember, credit } from '@/api/sys_user'
import { findAllMember} from '@/api/customer'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'

export default {
	data () {
		return {
			obj: "",//每一行的数据
			input1: "",
			currentPage: 0,
			total: 0, //总页数
			dialogVisible: false,
			tableData: [], //表格数据
			username: "", //会员名
			money: "",//额度
			totalMoney: "",//总计可用金额
            totalFree: "",//总计冻结金额
            input2: "",   //输入查询的昵称
		};
	},

	created() {
		this.getData(1, '');
	},
	methods: {
		newInput(){  //  s搜索值为空时 调用所有数据
				if(this.input1==''){
					this.getData(1)
				}
		},
		// // 点击的搜索信息
		// search () {
		// 	this.getData(1, this.input1);
        // },
        //查询
        search() {
			if (!this.input1 && !this.input2) {
				this.$message("请输入您要查询的账号或昵称！")
			} else {
                if(this.input1 === ''){
                    this.getAccount()
                }else{
                    this.getData(1, this.input1);
                }
			}
        },
        //用昵称查询账号
        getAccount(){
            let obj = {
                username: this.input2
            }
            findAllMember(obj).then(res => {
                console.log(res.data.data.list[0].ACCOUNT)
                this.input1 = res.data.data.list[0].ACCOUNT
                this.getData(1, this.input1);
            })
        },
		//   授信的点击事件
		shouxin (a) {
			console.log(a)
			this.dialogVisible = true;
			this.obj = a
			console.log(this.obj)
			// 获取授信代理用户名
			this.username = a.account;
			// 获取授信额度
			this.money = a.creditLimit;
			// 获取操作人
		},
		// 弹窗的确定回调
		makersure () {
			this.dialogVisible = false;
			let oper = getCookies('name');//假设admin账户
			this.clickCreadit(this.obj.account, this.obj.creditLimit, oper);
		},
		// 调接口数据
		getData(curr, a) {
			let obj = {
				page: curr,
				pageSize: 20,
				loginAccount: getCookies('name'),
				account: a,
			};
			getCreditMember(obj).then(res => {
				console.log(res)
				if (res.status == 200) {
					this.tableData = res.data.data.list
					this.total = res.data.data.total;
					let total = 0;
					let free = 0;
					this.tableData.forEach(e => {
						// 全部可用金额
						total += e.ableCreditBalance
						// 全部冻结金额
						free += e.freezeCreditBalance
						this.totalMoney = total
						this.totalFree = free
						// console.log(e)
					})
				}
			})
		},
		handleCurrentChange(val){
			this.getData(val, '');
		},

		// 点击授信按钮调接口数据
		clickCreadit(a, b, c) {
			let creadit = { account: a, creditLimit: b, operater: c };
			credit(creadit).then(res => {
				console.log(res)
				if (res.data.success == false) {
					Message.success(res.data.msg)
					return;
				} else {
					Message.success('授信成功！')
					// window.location.reload();
				}
			})
		},
		// 分页的回调
		changepage (val) {
			this.getData(val)
		},
	}
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.backend {
  .search {
    padding: 10px 0;
  }
  .page {
    margin-top: 10px;
    float: right;
  }
  .moneyadd {
    line-height: 60px;
    font-size: 14px;
    span {
      color: #f60;
      font-size: 16px;
      padding: 5px;
    }
  }
}
</style>
