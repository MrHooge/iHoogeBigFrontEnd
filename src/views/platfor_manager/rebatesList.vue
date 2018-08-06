<template>
	<div class="app-container">
		<div class="search">
			<el-input v-model="username"
			          style="width:300px;"
			          placeholder="请输入用户账号进行筛选"></el-input>
		</div>
		<el-table :data="memberfilter"
		          border
		          style="width: 100%; margin-top: 20px">
			<el-table-column label="编号"
			                 align="center"
			                 type="index"
			                 width="120px">
			</el-table-column>
			<el-table-column prop="ACCOUNT"
			                 align="center"
			                 label="会员账号">
			</el-table-column>
			<el-table-column label="类型"
			                 align="center">
				<!-- <template slot-scope="scope">
					<div v-if="scope.row.LOTTERY_TYPE=='38'">竞彩足球</div>
					<div v-else>竞彩篮球</div>
				</template> -->
				<template slot-scope="scope">
					{{scope.row.LOTTERY_TYPE | type}}
				</template>
			</el-table-column>
			<el-table-column prop="CREATE_DATE"
			                 align="center"
			                 label="时间">
			</el-table-column>
			<el-table-column align="center"
			                 width="300px;"
			                 label="操作">
				<template slot-scope="scope">
					<el-button type="primary"
					           @click="handleEdit(scope.row, 'modify')">修改返点</el-button>
					<!-- <el-button type="primary"
					           @click="deleteRebates(scope.row, 'modify')">删除返点</el-button> -->
										 <el-button type="info" @click="deleteRebates(scope.row, 'modify')">删除返点</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div class="page"
		     v-show="pageShow">
			<el-pagination background
			               :page-size=20
			               @current-change="changepage"
			               layout="prev, pager, next"
			               :total="total">
			</el-pagination>
		</div>
		<!-- 查看返点详情 -->
		<el-dialog title="返点信息"
		           width='70%'
		           :visible.sync="viewFormVisible">
			<div style="display: flex;">
				<span style="flex:1;">会员账号：{{onePeople.ACCOUNT}}</span>
				<span style="flex:1;text-align: right;">创建时间：{{onePeople.CREATE_DATE}}</span>
			</div>
			<el-table :data="tableData3"
			          border
			          tooltip-effect="dark"
			          style="width: 100%">
				<el-table-column label="代购返点"
				                 align="center">
					<template slot-scope="scope">{{ scope.row.FD_DG_RATE}}</template>
				</el-table-column>
				<el-table-column label="合买返点"
				                 align="center">
					<template slot-scope="scope">{{ scope.row.FD_HM_RATE }}</template>
				</el-table-column>
				<el-table-column label="彩种"
				                 align="center">
					<template slot-scope="scope">{{ scope.row.LOTTERY_TYPE | type }}</template>
				</el-table-column>
				<el-table-column label="点位开始时间"
				                 align="center">
					<template slot-scope="scope">{{ scope.row.RATE_CREATE_DATE }}</template>
				</el-table-column>
				<el-table-column label="点位结束时间"
				                 align="center">
					<template slot-scope="scope">{{ scope.row.RATE_END_DATE }}</template>
				</el-table-column>
				<el-table-column label="返点类型"
				                 align="center">
					<template slot-scope="scope">
						<div v-if="scope.row.RETURN_POINT_TYPE==0">
							非返点
						</div>
						<div v-if="scope.row.RETURN_POINT_TYPE==1">
							返点
						</div>
						<div v-if="scope.row.RETURN_POINT_TYPE==2">
							加奖
						</div>
						<div v-if="scope.row.RETURN_POINT_TYPE==3">
							返点加奖
						</div>
					</template>
				</el-table-column>
				<el-table-column label="点位ID"
				                 align="center">
					<template slot-scope="scope">{{ scope.row.rate_id }}</template>
				</el-table-column>
			</el-table>
			<!--   修改返点 -->
			<div class="pierce">
				<el-collapse v-model="activeNames"
				             @change="handleChange">
					<el-collapse-item title="修改返点"
					                  name="1">
						<div>
							<el-table :data="tableData3"
							          border
							          tooltip-effect="dark"
							          style="width: 100%">
								<el-table-column label="代购返点"
								                 align="center">
									<template slot-scope="scope">
										<el-input v-model="gd_rate"
										          class="xx"
										          placeholder="请输入"></el-input>
									</template>
								</el-table-column>
								<el-table-column label="合买返点"
								                 align="center">
									<template slot-scope="scope">
										<!-- <el-input v-model="hm_rate"
										          class="xx"
										          placeholder="请输入"></el-input> -->
										0
									</template>
								</el-table-column>
								<el-table-column label="彩种"
								                 align="center">
									<template slot-scope="scope">{{ scope.row.LOTTERY_TYPE | type }}</template>
								</el-table-column>
								<el-table-column label="点位开始时间"
								                 align="center"
								                 width="210px">
									<template slot-scope="scope">
										<div class="block">
											<el-date-picker v-model="value1"
											                type="datetime"
											                format="yyyy-MM-dd hh:mm:ss"
											                value-format="yyyy-MM-dd hh:mm:ss">
											</el-date-picker>
										</div>
									</template>
								</el-table-column>
								<el-table-column label="点位结束时间"
								                 align="center"
								                 width="210px">
									<template slot-scope="scope">
										<div class="block">
											<el-date-picker v-model="value2"
											                type="datetime"
											                format="yyyy-MM:dd hh-mm:ss"
											                value-format="yyyy-MM-dd hh:mm:ss">
											</el-date-picker>
										</div>
									</template>
								</el-table-column>
								<el-table-column label="返点类型"
								                 align="center">
									<template slot-scope="scope">
										<div v-if="scope.row.RETURN_POINT_TYPE==0">
											非返点
										</div>
										<div v-if="scope.row.RETURN_POINT_TYPE==1">
											返点
										</div>
										<div v-if="scope.row.RETURN_POINT_TYPE==2">
											加奖
										</div>
										<div v-if="scope.row.RETURN_POINT_TYPE==3">
											返点加奖
										</div>
									</template>
								</el-table-column>
								<el-table-column label="点位ID"
								                 align="center">
									<template slot-scope="scope">{{ scope.row.rate_id }}</template>
								</el-table-column>
							</el-table>
						</div>
					</el-collapse-item>
				</el-collapse>
			</div>
			<div slot="footer"
			     class="dialog-footer">
				<el-button @click="clearForm">取 消</el-button>
				<el-button type="primary"
				           @click="submitInfos">修改返点</el-button>
			</div>

		</el-dialog>
		<!-- 弹窗事件 -->
		<el-dialog title="提示 : 删除此会员返点"
		           :visible.sync="dialogVisible2"
		           width="40%">
			<div>
				<p>会员名：{{ ACCOUNT }}</p>
				<p>类型：{{ LOTTERY_TYPE | type}}</p>
			</div>
			<span slot="footer"
			      class="dialog-footer">
				<el-button @click="dialogVisible2 = false">取 消</el-button>
				<el-button type="primary"
				           @click="makersure">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { findAllRate, updateRateByAccount, delRateByAccount } from "@/api/sys_user";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message, Checkbox } from "element-ui";
import treeTable from "@/components/TreeTable";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
export default {
	data() {
		return {
			dialogVisible2: false, //  删除会员返点弹框
			pageShow: true,
			tableData: [],
			total: 0,
			username: "",
			viewFormVisible: false,
			tableData3: [], //
			onePeople: {}, // 存选择的某一条数据
			activeNames: ['2'],  //  折叠面板
			gd_rate: '', //  代购返点
			hm_rate: '', // 合买返点
			startDate: '',  // 返点开始
			endDate: '',  // 返点结束
			value1: '',
			value2: '',
			ACCOUNT:'',
			LOTTERY_TYPE:'',
		};
	},
	filters: {
		type(a) {
			return a == "38" ? "竞彩足球" : "竞彩篮球";
		},

	},

	computed: {
		memberfilter: function () {
			if (this.username == "") {
				this.pageShow = true;
			} else {
				this.pageShow = false;
			}
			return this.tableData.filter(name => {
				return name.ACCOUNT.match(this.username);
			});
		}
		// tableDatalayer() {
		// 	return this.tableData3.filter(name => {
		// 		return name.ACCOUNT.match(this.sjname)
		// 	})
		// }
	},
	created() {
		this.getTable(1, 20);
	},
	methods: {
		handleChange(val) {
			console.log(val);
		},
		getTable(page, pageSize) {
			//   获取所有会员列表
			findAllRate(page, pageSize).then(res => {
				console.log(res);
				this.tableData = res.data.data.list;
				this.total = res.data.data.total;
			});
		},
		// getData(page) {
		// 	findAllRate(page,).then(res => {
		// 		console.log(res)
		// 	})
		// },
		handleEdit(obj) {
			this.tableData3 = [];
			this.viewFormVisible = true;
			this.tableData3.push(obj);
			console.log(this.tableData3);
			this.onePeople = obj;
			console.log(this.onePeople);
		},
		clearForm() {  //  取消按钮
			this.viewFormVisible = false
		},
		submitInfos() {  //  弹窗确认按钮
			console.log(this.value1)
			let params = {
				account: this.onePeople.ACCOUNT,
				gd_rate: this.gd_rate, // 代购返点
				hm_rate: 0,  //  合买返点
				rate_id: this.onePeople.rate_id, //返点id
				startDate: this.value1, //  返点开始
				endDate: this.value2, //  返点结束
				lottery_type: this.onePeople.LOTTERY_TYPE,
			}
			if (this.value1 == '' || this.value2 == '') {
				Message.success('请填写时间')
				return
			} else if (this.gd_rate == '') {
				Message.success('请填写完整信息')
			} else {
				updateRateByAccount(params).then(res => {
					console.log(res)
					if (res.data.error_code == 200) {
						Message.success(res.data.message)
						this.viewFormVisible = false;
					} else {
						Message.success(res.data.message)
					}
				})
			}

		},
		deleteRebates(row) {  //  返点删除 按钮
			this.dialogVisible2 = true
			this.LOTTERY_TYPE = row.LOTTERY_TYPE
			this.ACCOUNT = row.ACCOUNT

		},
		makersure(){
			let obj = {
					account: this.ACCOUNT,
					lottery_type :this.LOTTERY_TYPE
			}
			console.log(obj)
			delRateByAccount(obj).then(res => {
				console.log(res)
				if(res.data.error_code==200){
					Message.success(res.data.message)
					this.dialogVisible2 = false
				}else {
					Message.success(res.data.message)
				}
			})
		},
		// 分页的回调
		changepage(val) {
			this.getTable(val);
		},

	}
};

</script>

<style scoped>
.pierce >>> .el-input__inner {
  outline: none;
  border: 0 !important;
  padding: 0;
}
.pierce >>> .el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
  padding-right: 10px;
  padding-left: 30px;
}
</style>
