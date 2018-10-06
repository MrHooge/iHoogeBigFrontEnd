<template>
	<div class="backend app-container">
		<div class="layerbody">
            <p>搜索该代理账号查询名下的客户</p>
			<div class="search">
				<el-input v-model="sjname"
				          placeholder="请输入账号查询"
				          style="width:15%;" clearable></el-input>
                <el-input v-model="username" placeholder="请输入昵称查询" style="width:15%;" clearable></el-input>
                
				<el-button type="primary"
				           icon="el-icon-search"
				           @click="search">搜索</el-button>
                <span>注：用昵称查询时，账号的输入框不能有值！</span>
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
					<el-table-column label="会员名"
					                 prop="account"
					                 align="center">
					</el-table-column>
					<el-table-column label="昵称"
					                 prop="username"
					                 align="center">
					</el-table-column>
					<el-table-column label="姓名"
					                 prop="name"
					                 align="center">
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
			               :total="total"
                           v-if="total != ''">
			</el-pagination>
		</div>
		<!-- 弹窗事件 -->
		<el-dialog title="确认转移"
		           :visible.sync="dialogVisible"
		           width="40%">
			<div>
				<el-input v-model="input"
				          placeholder="请输入转入用户名" clearable></el-input>
                <span>注：不是输入昵称！</span>
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
import { getSubordinateMember, moveMember } from '@/api/sys_user'
import { findAllMember} from '@/api/customer'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
	data() {
		return {
			pageShow: false, //  分页
			input: '', //  转移后
			dialogVisible: false, //确认弹框
			isShow: false,
			sjname: '', //  搜索名
			total: 0, //总页数
			tableData: [], //表格数据
			multipleSelection: [], //选中的数据
            number: [],
            username: '',   //搜索的昵称
            page: 1,
			

		}
	},
	created(){
        // this.getData()
        if(this.$route.query.account){
            this.sjname = this.$route.query.account
            this.search()
        }
	},

	methods: {
        search() {
            if (!this.sjname && !this.username) {
                this.getData();
            } else {
                if(this.sjname === ''){
                    this.getAccount()
                }else{
                    this.page = 1
                    this.getUsername()
                    this.getData()
                }
            }
        },
        //用昵称查询账号
        getAccount(){
            let obj = {
                username: this.username
            }
            findAllMember(obj).then(res => {
                console.log(res.data.data.list[0].ACCOUNT)
                this.sjname = res.data.data.list[0].ACCOUNT
                this.page = 1
                this.getUsername()
                this.getData()
            })
        },
        //用账号查询昵称
        getUsername(){
            if(this.sjname != ''){
                let obj = {
                    account: this.sjname
                }
                findAllMember(obj).then(res => {
                    this.username = res.data.data.list[0].username
                })
            }
        },
		getData() {
			let obj = {
				account: this.sjname,
				page: this.page,
				pageSize: 20
			}
			getSubordinateMember(obj).then(res => {
				console.log(res)
				if (res.data.error_code === 200) {
					this.tableData = res.data.data.list
					this.total = res.data.data.total
					this.pageShow = true
				} else {
					this.pageShow = false
					Message.success(res.data.message)
                    this.tableData = []
				}
			})
		},

		// 选择框的回调
		handleSelectionChange(val) {
			this.multipleSelection = val
			if (val.length > 0) {
				this.isShow = true

			} else {
				this.isShow = false
			}
			console.log(val)

		},
		cofirm() {
			this.number = []
			this.multipleSelection.forEach(e => {  //  循环 选中数据  添加选中ID 放入 新数组中
				return this.number.push(e.id)
			});

			this.num=this.number.join(',');
			console.log(this.num)
			this.dialogVisible = true
		},
		makersure() {
			let oldAccount = this.sjname
			let newAccount = this.input
			let moveMemberId = this.num
			if (this.input == '') {
				Message.success('请输入用户名')
			} else {
				moveMember(oldAccount, newAccount, moveMemberId).then(res => {
					console.log(res)
					if(res.data.error_code = 200){
						Message.success(res.data.message)
						this.dialogVisible = false
                        // this.input = ''
                        this.getData()
					}else {
						Message.success(res.data.message)
					}
				})
			}
		},

        changepage(val) {  //  分页回调
            this.page = val
			this.getData()
		}
	}
}
</script>

<style scoped>
.main {
  padding-top: 30px;
}
</style>
