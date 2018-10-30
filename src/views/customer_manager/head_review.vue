<template>
	<div class="statistics">
		<el-input placeholder="请输入用户名"
		          v-model="account"
		          style="width: 130px;margin-right:20px;margin-bottom:30px"
		          clearable></el-input>
		开始时间：
		<el-date-picker v-model="startTime"
		                type="datetime"
		                style="margin-bottom:40px;margin-right:20px;width:200px"
		                placeholder="请选择开始日期"
		                value-format="yyyy-MM-dd HH:mm:ss">
		</el-date-picker>
		结束时间：
		<el-date-picker v-model="endTime"
		                align="right"
		                value-format="yyyy-MM-dd HH:mm:ss"
		                default-time="23:59:59"
		                type="datetime"
		                style="margin-left:10px;
            width:200px
            margin-bottom:40px;"
		                placeholder="请选择结束日期">
		</el-date-picker>
		<el-select v-model="value"
		           placeholder="请选择">
			<el-option v-for="item in options"
			           :key="item.value"
			           :label="item.label"
			           :value="item.value">
			</el-option>
		</el-select>
		<el-button type="primary"
		           @click="search_customer"
		           @keyup.13="getone"
		           style="margin-left:100px;margin-bottom:30px">搜索</el-button>
		<!-- <el-button type="primary" @click="moredeletewhite">批量取消加白</el-button> -->
		<el-table :data="tableData"
		          border
		          style="width: 100%;"
		          @selection-change="handleSelectionChange">
			<el-table-column type="selection">
			</el-table-column>
			<el-table-column label="ID"
			                 prop="id"
			                 align="center">
			</el-table-column>
			<el-table-column label="账号"
			                 prop="account"
			                 align="center">
			</el-table-column>
			<el-table-column label="发起时间"
			                 align="center">
				<template slot-scope="scope">
					{{scope.row.create_time | time}}
				</template>
			</el-table-column>
			<el-table-column label="图片"
			                 align="center">
				<template slot-scope="scope">
					<img :src="'https://qyun88.oss-cn-hangzhou.aliyuncs.com/member/'+scope.row.picture"
					     alt=""
					     style="width: 100%;height: 100%;">
				</template>
			</el-table-column>
			<el-table-column label="审核时间"
			                 align="center">
				<template slot-scope="scope">
					{{scope.row.review_time | time}}
				</template>
			</el-table-column>
			<el-table-column label="状态"
			                 align="center">
				<template slot-scope="scope">
					{{scope.row.status | mtype}}
				</template>
			</el-table-column>
			<el-table-column label="操作"
			                 align="center">
				<template slot-scope="scope">
					<div v-if="scope.row.status === 0">
						<el-button type="success"
						           @click="addwhite(scope.row,'modify')"
						           style="width:70px;height:30px;line-height:5px;">通过</el-button>
						<el-button type="primary"
						           @click="deletewhite(scope.row,'modify')"
						           style="width:70px;height:30px;line-height:5px;padding-left:10px;">不通过</el-button>
					</div>
					<div v-else>
						<el-button type="success"
						           @click="addwhite(scope.row,'modify')"
						           style="width:70px;height:30px;line-height:5px;"
						           v-if="scope.row.status === 2">通过</el-button>
						<el-button type="primary"
						           @click="deletewhite(scope.row,'modify')"
						           style="width:70px;height:30px;line-height:5px;padding-left:10px;"
						           v-if="scope.row.status === 1">不通过</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>
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
</template>

<script>
import { findAllMemberPictureReview, updateMemberPictureReview } from '@/api/customer'
import { Message, MessageBox } from 'element-ui'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
	data() {
		return {
			tableData: [],
			selections: [],
			account: '',
			endTime: '',
			page: 1,
			pageSize: 20,
			startTime: '',
			totalList: 0,
			options: [{
				value: '0',
				label: '未审核'
			}, {
				value: '1',
				label: '通过'
			}, {
				value: '2',
				label: '未通过'
			}],
			value: '0'
		}
	},
	filters: {
		time(a) {
			if (a != null && a != '') {
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
			}
		},
		mtype(a) {
			if (a == 0) {
				return '未审核'
			} else if (a == 1) {
				return '通过'
			} else {
				return '未通过'
			}
		},
	},
	created() {
		this.gettablelist()
	},
	methods: {
		//点击账号跳转会员管理页面
		getupnewweb(a) {
			this.$router.push({ path: '/customerManager/customerManager', query: { account: a } })
		},
		//获取表格数据
		gettablelist() {
			let obj = {
				account: this.account,
				end_time: this.endTime || '',
				page: this.page,
				pageSize: this.pageSize,
				start_time: this.startTime || '',
				status: this.value
			}
			findAllMemberPictureReview(obj).then(res => {
				console.log(res)
				if (res.data.error_code == 200) {
					this.tableData = res.data.data.list
					this.totalList = res.data.data.total
				} else {
					this.tableData = []
					this.$message(res.data.message)
				}
			}).catch(error => {
				Message.error(error)
			})
		},

		// 通过按钮
		addwhite(data) {
			let obj = {
				account: data.account,
				id: data.id,
				operator: getCookies('name'),
				status: 1
			}
			updateMemberPictureReview(obj).then(res => {
				if (res.data.error_code == 200) {
					this.$message(res.data.message)
					this.gettablelist()
				} else {
					this.$message(res.data.message)
				}
			})
		},
		// 不通过按钮
		deletewhite(data) {
			let obj = {
				account: data.account,
				id: data.id,
				operator: getCookies('name'),
				status: 1
			}
			updateMemberPictureReview(obj).then(res => {
				if (res.data.error_code == 200) {
					this.$message(res.data.message)
					this.gettablelist()
				} else {
					this.$message(res.data.message)
				}
			})
		},
		// //批量取消加白
		// moredeletewhite(){
		//     if(this.selections.length === 0){
		//         this.$message('至少选择一个用户')
		//     }else{
		//         let newarr = [];
		//         this.selections.forEach(e => {
		//             newarr.push(e.ACCOUNT)
		//         });
		//         let newaccount = newarr.join(',');
		//         this.account = newaccount;
		//         this.type = 2;
		//         memberToWrite(this.account,this.type).then(res => {
		//             if (res.data.error_code === 200) {
		//                 Message.success('取消加白成功')
		//                 this.account = ''
		//                 if(this.isBeforMonth){
		//                     this.longtime()
		//                 }else{
		//                     this.gettablelist()
		//                 }
		//             } else {
		//                 Message.error(res.data.message)
		//             }
		//         })
		//     }
		// },
		//翻页
		handleCurrentChange(num) {
			this.page = num;
			if (this.isBeforMonth) {
				this.longtime()
			} else {
				this.gettablelist();
			}
		},
		//改变页面大小
		handleSizeChange(num) {
			this.pageSize = num;
			if (this.isBeforMonth) {
				this.longtime()
			} else {
				this.gettablelist();
			}
		},
		//搜索
		search_customer() {
			this.page = 1
			this.pageSize = 20
			this.gettablelist()
		},
		// 选择框全部
		handleSelectionChange(selection) {
			this.selections = selection;
		}

	}
}
</script>

<style>
.statistics {
  padding: 10px 20px;
}
</style>