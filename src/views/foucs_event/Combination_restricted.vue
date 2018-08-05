<template>
	<div class="app-container">
		<!--   组合限售 -->
		<div style="padding-bottom:10px">
			<el-button type="danger"
			           @click="addGame">添加组合</el-button>
		</div>
		<el-table :data="tableData"
		          border
		          style="width: 100%">
			<el-table-column label="ID"
			                 align="center"
			                 prop="id"
			                 width="180">
			</el-table-column>
			<el-table-column label="彩种"
			                 align="center"
			                 prop="lotteryType">
				<template slot-scope="scope">
					{{ scope.row.lotteryType | type}}
				</template>
			</el-table-column>
			<el-table-column label="玩法"
			                 prop="passType"
			                 align="center">
			</el-table-column>
			<el-table-column label="状态"
			                 align="center">
											 				<template slot-scope="scope">
					{{ scope.row.status | changeType}}
				</template>
			</el-table-column>
			<el-table-column prop="createTime"
			                 align="center"
			                 label="限售时间">
			</el-table-column>
			<el-table-column prop="dealTime"
			                 align="center"
			                 label="截止时间">
			</el-table-column>
			<el-table-column align="center"
			                 width="240px;"
			                 label="操作">

				<template slot-scope="scope">
					<el-button type="primary"
					           @click="handleEdit(scope.row, 'modify')">修改状态</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 弹窗事件 -->
		<el-dialog title="添加组合限售"
		           :visible.sync="dialogVisible"
		           width="70%">
			<div class="layers">
				<el-row :gutter="20">
					<div class="grid-content bg-purple leftbox">
						组合规则:
						<p>竞彩足球组合格式：【20180804_001_胜~20180804_002_负~20180804_002_平】</p>
						<p>竞彩篮球组合格式：【20180804_001_胜~20180804_002_负~20180804_002_平】</p>
					</div>
					<el-col :span="4">
						<div class="grid-content bg-purple leftbox">
							组合:
						</div>
					</el-col>
					<el-col :span="19">
						<div class="grid-content bg-purple">
							<el-input type="textarea"
							          :rows="2"
							          placeholder="请输入内容"
							          v-model="textarea">
							</el-input>
						</div>
					</el-col>
				</el-row>
				<br>
				<br>
				<el-row :gutter="20">
					<el-col :span="4">
						<div class="grid-content bg-purple leftbox">
							赛事:
						</div>
					</el-col>
					<el-col :span="19">
						<div class="grid-content bg-purple">
							<el-radio v-model="radio"
							          label="38">竞彩足球</el-radio>
							<el-radio v-model="radio"
							          label="39">竞彩篮球</el-radio>
						</div>
					</el-col>
					<el-col :span="40">
						<div class="grid-content bg-purple leftbox">
							玩法:
						</div>
						<div class="grid-content bg-purple">
							<!-- <el-checkbox :indeterminate="isIndeterminate"
							             v-model="checkAll"
							             @change="handleCheckAllChange">全选</el-checkbox> -->
							<div style="margin: 15px 0;"></div>
							<el-checkbox-group v-model="checkedCities"
							                   @change="handleCheckedCitiesChange">
								<el-checkbox v-for="city in cities"
								             :label="city"
								             :key="city.index">{{city.name}}</el-checkbox>
							</el-checkbox-group>
						</div>
					</el-col>
				</el-row>
			</div>
			<span slot="footer"
			      class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary"
				           @click="selfbuy">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 弹窗事件 -->
		<el-dialog title="提示：修改组合限售状态"
		           :visible.sync="dialogVisible2"
		           width="40%">
			<div>
				<el-row :gutter="20">
					<el-col :span="4">
						<div class="grid-content bg-purple leftbox">
							状态:
						</div>
					</el-col>
					<el-col :span="19">
						<div class="grid-content bg-purple">
							<el-radio v-model="radio2"
							          label="1">有效</el-radio>
							<el-radio v-model="radio2"
							          label="0">无效</el-radio>
						</div>
					</el-col>

				</el-row>
			</div>
			<span slot="footer"
			      class="dialog-footer">
				<el-button @click="dialogVisible2 = false">取 消</el-button>
				<el-button type="primary"
				           @click="makersure">确 定</el-button>
			</span>
		</el-dialog>
		<div class="page"
		     style="padding:30px 0">
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
const cityOptions = [
	{ name: '单关', value: 'p1' },
	{ name: '2串1', value: 'p2_1' },
	{ name: '3串1', value: 'p3_1' },
	{ name: '4串1', value: 'p4_1' },
	{ name: '5串1', value: 'p5_1' },
	{ name: '6串1', value: 'p6_1' },
	{ name: '7串1', value: 'p7_1' },
	{ name: '8串1', value: 'p8_1' }
]
import { getLotteryLimit, addLotteryLimit, updateLotteryLimitStatus } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
export default {
	components: { treeTable },
	data() {
		return {
			dialogVisible2: false, // 修改状态弹窗
			tableData: [], //表格数据
			dialogVisible: false,
			tableData3: [], // 弹窗的表格数据
			multipleSelection: [], //选中的数据
			onePeople: {}, // 存选择的某一条数据
			radio: '38',  //  篮球 、足球选项
			radio2: '', //   组合限售状态修改 1 有效 0 无效
			total: 0,
			checkAll: false,
			checkedCities: [],
			cities: cityOptions,
			isIndeterminate: true,
			textarea: '',

		}
	},
	filters: {
		type(a) {
			return a==38 ? '竞彩足球' : '竞彩篮球'
		},
		changeType(s){
			return s==1? '有效' : '无效'
		}
	},
	computed: {

	},
	created() {

		this.getTable(1)
	},
	methods: {
		getTable(curr) {   //  获取 组合限售列表
			let obj = {
				page: curr,
				pageSize: 10
			}
			getLotteryLimit(obj).then(res => {  //  获取渠道数
				console.log(res)
				if(res.data.error_code==200){
					this.tableData = res.data.data.list
					this.total = res.data.data.total
				}
			})
		},
		addGame() {  //  添加组合限售
			this.dialogVisible = true

		},

		handleCheckedCitiesChange(value) {
			this.checkedCities = value
			console.log(this.checkedCities)


		},
		selfbuy() {   //  添加组合限售
			let arr = '';
			this.checkedCities.forEach(e => {
				arr += e.value + ','
			});
			console.log(arr)
			let obj = {
				lotteryType: this.radio, //  彩种
				passType: arr, //  串法
				content: this.textarea,  //  串法
			}
			addLotteryLimit(obj).then(res => {
				console.log(res)
				if (res.status == 200) {
					this.dialogVisible = false
					Message.success(res.data.message)
				}
			})
		},
		handleEdit(val) {
			this.dialogVisible2 = true
			this.onePeople = val
		},
		makersure() {
			let obj = {
				id: this.onePeople.id,
				status: this.radio2,
			}
			updateLotteryLimitStatus(obj).then(res => {
				console.log(res)
				if (res.status == 200) {
					this.dialogVisible2 = false
					Message.success(res.data.message)
				}else {
					Message.success(res.data.message)
				}
			})
		},
		//  分页回调
		changepage(val) {
			this.getTable(val)
		}
	},
}
</script>

<style scoped>
.el-dialog__body {
  padding: 30px 20px;
  color: #606266;
  line-height: 24px;
  font-size: 14px;
  height: 600px;
  overflow: auto;
}
</style>
