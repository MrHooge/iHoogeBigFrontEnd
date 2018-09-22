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
			                 align="center">
				<template slot-scope="scope">
					{{ plays }}
				</template>
			</el-table-column>
			<el-table-column label="状态"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.status | changeType}}
				</template>
			</el-table-column>
            <el-table-column align="center"
			                 label="内容">
				<template slot-scope="scope">
					{{ scope.row.content}}
				</template>
            </el-table-column>
			<el-table-column align="center"
			                 label="限售时间">
				<template slot-scope="scope">
					{{ scope.row.createTime | changeTime}}
				</template>
			</el-table-column>
			<el-table-column align="center"
			                 label="截止时间">
				<template slot-scope="scope">
					{{ scope.row.dealTime | changeTime}}
				</template>
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
						<p>竞彩足球胜平负组合格式：【20180804_1_胜~20180804_2_负~20180804_2_平】</p>
						<p>竞彩足球让球胜平负组合格式：【20180804_1_让球胜~20180804_2_让球负~20180804_2_让球平】</p>
						<p>竞彩篮球组合格式：【20180804_1_胜~20180804_2_负~20180804_2_平】</p>
						<p>竞彩足球组合格式：【20180804_1_胜~20180804_2_负~20180804_2_平】</p>
						<p>竞彩足球比分组合格式：【20180804_1_胜其他~20180804_2_负其他~20180804_2_平其他】</p>
						<p>竞彩足球半全场组合格式：【20180804_1_平~20180804_2_平】</p>
						<p>竞彩篮球让分胜负组合格式：【20180804_1_让分主胜~20180804_2_让分客胜】</p>
					</div>
                    <div>
                        <img src="../../assets/404_images/rule.png" alt="">
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
			               :total="total"
                           v-if="tableData != ''">
			</el-pagination>
		</div>
	</div>
</template>

<script>
const cityOptions = [
	{ name: '单关', value: 'P1' },
	{ name: '2串1', value: 'P2_1' },
	{ name: '3串1', value: 'P3_1' },
	{ name: '4串1', value: 'P4_1' },
	{ name: '5串1', value: 'P5_1' },
	{ name: '6串1', value: 'P6_1' },
	{ name: '7串1', value: 'P7_1' },
	{ name: '8串1', value: 'P8_1' }
]
import { getLotteryLimit, addLotteryLimit, updateLotteryLimitStatus } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import setTime from '@/utils/time.js'
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
			numPlay: [], //  存储分割的玩法
            plays: '', //  存储删选的 玩法对应的 name
            
            page: 1,

		}
	},
	filters: {
		type(a) {
			return a == 38 ? '竞彩足球' : '竞彩篮球'
		},
		changeType(s) {
			return s == 1 ? '有效' : '无效'
		},
		changeTime(b){
			return setTime(b)
		}
	},
	computed: {

	},
	created() {

		this.getTable()
	},
	methods: {
		getTable() {   //  获取 组合限售列表
			let obj = {
				page: this.page,
				pageSize: 20
			}
			getLotteryLimit(obj).then(res => {  //  
				// console.log(res)
				if (res.data.error_code == 200) {
					this.plays = '' //  
					this.tableData = res.data.data.list
					this.tableData.forEach(e => {
						// console.log(e)
						this.numPlay = e.passType.split(',')
                    });
                    let arr = []
					this.numPlay.forEach(x => {
						cityOptions.forEach(v => {
							if (x == v.value) {
                                arr.push(v.name)
                                this.plays = arr.join(',')
							}
						});
					});
					this.total = res.data.data.total
					console.log(this.plays)
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
            let arr = [];
            let newArr = ''
            // if(this.checkedCities.length > 1){
            //    arr = this.checkedCities.join(',')
                this.checkedCities.forEach(e => {
                    arr.push(e.value)
                });
                newArr = arr.join(',')
                console.log(newArr)
            // }else{
            //     arr = this.checkedCities[0]
            // }
			let obj = {
				lotteryType: this.radio, //  彩种
				passType: newArr, //  串法
				content: this.textarea,  //  串法
			}
			addLotteryLimit(obj).then(res => {
				if (res.status == 200) {
                    console.log(res)
                    if(res.data.error_code === 200){
                        this.dialogVisible = false
                        Message.success(res.data.message)
                        this.getTable()
                    }else{
                        this.dialogVisible = false
                        Message.error(res.data.message)
                    }
					
				}
			})
		},
		handleEdit(val) {
			this.dialogVisible2 = true
            this.onePeople = val
            this.radio2 = val.status.toString()
		},
		makersure() {  //  修改 组合限售的状态
			let obj = {
				id: this.onePeople.id,
				status: this.radio2,
			}
			updateLotteryLimitStatus(obj).then(res => {
				console.log(res)
				if (res.status == 200) {
					this.dialogVisible2 = false
					Message.success(res.data.message)
					this.getTable()
				} else {
					Message.success(res.data.message)
				}
			})
		},
		//  分页回调
		changepage(val) {
            this.page = val
			this.getTable()
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
