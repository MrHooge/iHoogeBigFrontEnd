<template>
	<div class="backend app-container">
		<div class="layerbody">
			<div class="search">
				<el-input v-model="sjname"
				          placeholder="请输入查询账号"
				          style="width:100%;"
				          @input="onInput"></el-input>
				<el-button type="primary"
				           icon="el-icon-search"
				           @click="search">搜索</el-button>
			</div>
			<div class="main">
				<el-table :data="tableData"
				          border
				          tooltip-effect="dark"
				          style="width: 100%"
				          @selection-change="handleSelectionChange">
					<el-table-column type="selection"
					                 align="center">
					</el-table-column>
					<el-table-column
                     label="账号"
                     prop="ACCOUNT"
                     align="center">
                     
               </el-table-column>
                <el-table-column
                     label="昵称"
                     prop="username"
                     align="center">
               </el-table-column>
                <el-table-column
                     label="真实姓名"
                     prop="NAME"
                     align="center">
               </el-table-column>
               <el-table-column
                     label="证件号"
                     prop="CERT_NO"
                     align="center"> 
               </el-table-column>
                   <el-table-column
                     label="手机"
                     prop="MOBILE"
                     align="center">
               </el-table-column>
                <el-table-column
                     label="注册时间"
                     align="center">
                       <template slot-scope="scope">
                    {{scope.row.registerDateTime}}
                     </template>
               </el-table-column>  
                 <el-table-column
                     label="最后登陆时间"
                     align="center">
                      <template slot-scope="scope">
                    {{scope.row.LAST_LOGIN_DATE_TIME}}
                     </template>
               </el-table-column>  
                  <el-table-column
                     label="是否充值"
                     align="center">
                      <template slot-scope="scope">
                            {{scope.row.isCharge | port}}
                     </template>
               </el-table-column>
               <el-table-column
                     label="是否白名单"
                     align="center">
                     <template slot-scope="scope">
                            {{scope.row.isWhitelist | mtype}}
                     </template>
               </el-table-column>
				</el-table>
			</div>
		</div>
		<div slot="footer"
		     class="dialog-footer"
		     v-show="isShow"
		     style="padding:30px 0">
			<el-button type="primary"
			           style="width:100%"
			           @click="cofirm">确 定</el-button>
		</div>
		<div class="page"
		     v-show="pageShow"
		     style="padding:30px 0">
			<el-pagination background
			               :page-size=20
			               @current-change="changepage"
			               layout="prev, pager, next"
			               :total="total">
			</el-pagination>
		</div>
		<!-- 弹窗事件 -->
		<el-dialog title="确认赠送"
		           :visible.sync="dialogVisible"
		           width="40%">
			<div>
				<el-input v-model="input"
				          placeholder="请输入赠送金额"></el-input>

			</div>
			<span slot="footer"
			      class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary"
				           @click="makersure">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { findAllMember, presentes } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
	data() {
		return {
			input: '', //  分组名
			dialogVisible: false, //确认弹框
			isShow: false,
			sjname: '', //  搜索名
			total: 0, //总页数
			tableData: [], //表格数据
			multipleSelection: [], //选中的数据
			number: [],
			arr: [],
			pageShow: false
		}
	},
	filters:{
		time(a){
            let date = new Date(a);
            let y = date.getFullYear();
            let MM = date.getMonth() + 1;
            MM = MM < 10 ? ('0' + MM) : MM;
            let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            let m = date.getMinutes();
            m = m < 10 ? ('0' + m) : m;
            let s = date.getSeconds();
            s = s < 10 ? ('0' + s) : s;
            return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;

        },
        mtype(a){
              return a == 1 ?"否" :  "是"
        },
        port(m){
              return m == 1 ?"未充值" : "充值"
        }
	},
	created() {
		this.getData(1, this.sjname)
	},

	methods: {
		onInput() {
			this.getData(1, this.sjname)
		},
		search() {
			this.getData(1, this.sjname)
		},
		getData(curr, a) {
			let obj = {
				page: curr,
				account: a //  不传 查询全部
			}
			findAllMember(curr, a).then(res => {
				console.log(res)
				if (res.data.error_code == 200) {
					this.tableData = res.data.data.list
					this.total = res.data.data.total
					this.pageShow = true
				} else {
					this.pageShow = false
					Message.success(res.data.message)
				}
			})
		},

		// 选择框的回调
		handleSelectionChange(val) {
			this.multipleSelection = val
			console.log(val)
			if (val.length > 0) {
				this.isShow = true

			} else {
				this.isShow = false
			}

		},
		cofirm() {
			this.number = []

			this.multipleSelection.forEach(e => {  //  循环 选中数据  添加选中ID 放入 新数组中
				this.number.push(e.ACCOUNT)
			});
			this.dialogVisible = true
		},
		makersure() {
			let arr = []
			let myObj = {}
			this.number.forEach(e => {
				myObj[e] = this.input
			});
			Object.keys(myObj).forEach(function (key) {   //   对象循环
				arr.push({ [key]: myObj[key] })
				// console.log(key)
			})
			console.log(arr)
			let userName = getCookies('name')
			let params = arr
			if (this.input == '') {
				Message.success('请输入赠送金额')
				return
			} else {
				presentes(userName,JSON.stringify(params)).then(res => {
					console.log(res)
					if (res.data.error_code = 200) {
						Message.success(res.data.message)
						this.dialogVisible = false
						this.input = ''
					} else {
						Message.success(res.data.message)
					}
				})
			}
		},

		changepage(val) {  //  分页回调
			this.getData(val, this.sjname)
		}
	}
}
</script>

<style scoped>
.main {
  margin-top: 30px;
}
</style>
