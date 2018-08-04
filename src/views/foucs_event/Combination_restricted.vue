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
			<el-table-column label="编号"
			                 align="center"
			                 type="index"
			                 width="180">
			</el-table-column>
			<el-table-column label="类型"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.AGENT_TYPE | type}}
				</template>
			</el-table-column>
			<el-table-column prop="ACCOUNT"
			                 align="center"
			                 label="用户名">
			</el-table-column>
			<el-table-column prop="username"
			                 align="center"
			                 label="昵称">
			</el-table-column>
			<el-table-column prop="name"
			                 align="center"
			                 label="姓名">
			</el-table-column>
			<el-table-column prop="upName"
			                 align="center"
			                 label="上级">
			</el-table-column>
			<el-table-column prop="grouping"
			                 align="center"
			                 label="分组">
			</el-table-column>
			<el-table-column align="center"
			                 width="240px;"
			                 label="操作">

				<template slot-scope="scope">
					<el-button type="primary"
					           @click="handleEdit(scope.row, 'modify')">操作</el-button>
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
			tableData: [], //表格数据
			dialogVisible: false,
			tableData3: [], // 弹窗的表格数据
			multipleSelection: [], //选中的数据
			onePeople: {}, // 存选择的某一条数据
			radio: '38',  //  篮球足球选项
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

			return a ? '代理' : '渠道'
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
			getLotteryLimit(obj).then(res => {  //  获取渠道数据

				console.log(res)
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
			})
		},
// handleEdit(val){
// 	this.onePeople = val
// 		let obj = {
// 			id:this.onePeople.id,
// 			status:this.onePeople.status,
// 		}
// },
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
