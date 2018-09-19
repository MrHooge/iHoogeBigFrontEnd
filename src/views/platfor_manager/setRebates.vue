<template>
	<div class="app-container">
		<!-- 设置会员返点 -->
			<div class="search">
				<!-- <el-input v-model="account"
				          placeholder="请输入查询账号"
				          style="width:50%;"></el-input>
                <el-input v-model="username" placeholder="请输入昵称" style="width: 150px;margin-right:40px;margin-bottom:20px;margin-top:40px"></el-input> -->
                账号：<el-input v-model="account" placeholder="请输入账号" style="width: 150px;margin-right:100px;margin-top:40px"></el-input>
                昵称：<el-input v-model="username" placeholder="请输入昵称" style="width: 150px;margin-right:100px;margin-top:40px"></el-input>
                姓名：<el-input v-model="name" placeholder="请输入姓名" style="width: 150px;margin-right:100px;margin-top:40px"></el-input>
                身份证：<el-input v-model="idcard" placeholder="请输入身份证号" style="width: 150px;margin-right:100px;margin-top:40px"></el-input>
                <!-- 邮箱：<el-input v-model="email" placeholder="请输入邮箱" style="width: 150px;margin-right:240px;margin-top:20px"></el-input> -->
                电话：<el-input v-model="mobile" placeholder="请输入电话" style="width: 150px;margin-right:250px;margin-top:20px"></el-input>
                <!-- 合作商：<el-input v-model="partner" placeholder="请输入合作商" style="width: 150px;margin-right:100px;margin-top:20px"></el-input><br /> -->
                开始时间：
                <el-date-picker
                v-model="start_time"
                type="date"
                style="margin-bottom:40px;margin-right:20px;width:200px"
                placeholder="请选择开始日期"
                value-format="yyyy-MM-dd">
                </el-date-picker>
                
                结束时间：
                <el-date-picker
                v-model="end_time"
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
			</div>
		<el-table :data="tableData"
		          border
		          style="width: 100%; margin-top: 20px">
			<el-table-column label="编号"
			                 align="center"
			                 type="index"
			                 width="120px">
			</el-table-column>
			<el-table-column prop="ACCOUNT"
			                 align="center"
			                 label="用户名">
			</el-table-column>
			<el-table-column prop="NAME"
			                 align="center"
			                 label="姓名">
			</el-table-column>
			<el-table-column prop="username"
			                 align="center"
			                 label="昵称">
			</el-table-column>
			<el-table-column prop="MOBILE"
			                 align="center"
			                 label="手机号">
			</el-table-column>
			<el-table-column align="center"
			                 width="220px;"
			                 label="操作">
				<template slot-scope="scope">
					<div>
						<el-button type="primary"
						           @click="showDailag(scope.row, 'modify')"
						           >设置返点</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>
		<div class="page">
			<!-- <el-pagination background
			               :page-size=20
			               @current-change="changepage"
			               layout="prev, pager, next"
			               :total="totalList">
			</el-pagination> -->
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
		<!-- 修改角色信息 -->
		<el-dialog title="返点信息"
		           width='70%'
		           :visible.sync="viewFormVisible">
			<div style="display: flex;">
				<span style="flex:1;">会员账号：{{onePeople.ACCOUNT}}</span>
                <span style="color:red;">注：竞彩足球和竞彩篮球一并勾选</span>
			</div>
			<!--   修改返点 -->
			<div class="pierce">
				<div>
					<el-table :data="tableData3"
					          border
					          tooltip-effect="dark"
					          style="width: 100%">
						<el-table-column label="代购返点"
						                 align="center">
							<template slot-scope="scope">
								<el-input v-model="gd_rate1"
								          placeholder="请输入" style="margin-bottom:20px;"></el-input>
                                <el-input v-model="gd_rate2"
								          placeholder="请输入"></el-input>
							</template>
						</el-table-column>
						<el-table-column label="合买返点"
						                 align="center">
							<template slot-scope="scope">
								<!-- <el-input v-model="hm_rate"
								          placeholder="请输入"></el-input> -->
												<span style="margin-bottom:20px;">0</span><br>0
							</template>
						</el-table-column>
						<el-table-column label="彩种"
						                 align="center">
							<template slot-scope="scope">
								<!-- <el-select v-model="value"
								           placeholder="请选择"
													 @change="changeStatus">
									<el-option v-for="item in options"
									           :key="item.value"
									           :label="item.label"
									           :value="item.value">
									</el-option>
								</el-select> -->
                                <el-checkbox-group v-model="checkList">
                                    <el-checkbox label="38" value="竞彩足球" style="margin-bottom:20px;">竞彩足球</el-checkbox><br>
                                    <el-checkbox label="39" value="竞彩篮球">竞彩篮球</el-checkbox>
                                </el-checkbox-group>
							</template>
						</el-table-column>
						<el-table-column label="点位开始时间"
						                 align="center"
						                 width="210px">
							<template slot-scope="scope">
								<div class="block">
                                    <el-date-picker v-model="startvalue1"
									                type="datetime"
									                value-format="yyyy-MM-dd HH:mm:ss"
                                                    style="margin-bottom:20px;">
									</el-date-picker>
                                    <el-date-picker v-model="startvalue2"
									                type="datetime"
									                value-format="yyyy-MM-dd HH:mm:ss"
                                                    >
									</el-date-picker>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="点位结束时间"
						                 align="center"
						                 width="210px">
							<template slot-scope="scope">
								<div class="block">
                                    <!-- 竞彩足球 -->
									<el-date-picker v-model="endvalue1"
									                type="datetime"
									                value-format="yyyy-MM-dd HH:mm:ss"
                                                    style="margin-bottom:20px;">
									</el-date-picker>
                                    <!-- 竞彩篮球 -->
                                    <el-date-picker v-model="endvalue2"
									                type="datetime"
									                value-format="yyyy-MM-dd HH:mm:ss">
									</el-date-picker>
								</div>
							</template>
						</el-table-column>
						<el-table-column label="返点类型"
						                 align="center">
							<template slot-scope="scope">
								<el-select v-model="valueType1"
								           placeholder="请选择"
                                           style="margin-bottom:20px;">
									<el-option v-for="item in options2"
									           :key="item.value"
									           :label="item.label"
									           :value="item.value">
									</el-option>
								</el-select>
                                <el-select v-model="valueType2"
								           placeholder="请选择">
									<el-option v-for="item in options2"
									           :key="item.value"
									           :label="item.label"
									           :value="item.value">
									</el-option>
								</el-select>
							</template>
						</el-table-column>
					</el-table>
                    
				</div>
			</div>
			<div slot="footer"
			     class="dialog-footer">
				<el-button @click="clearForm">取 消</el-button>
				<el-button type="primary" @click="submitInfos">设置返点</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
// import { findAllMember, setRate } from '@/api/sys_user'
import { setRate } from '@/api/sys_user'
import { findAllMember} from '@/api/customer'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message, Checkbox } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
	data() {
		return {
			// sjname:'',  //  搜索值
			viewFormVisible: false,
			viewFormType: 'view',
			formLabelWidth: '120px',
			tableData: [], //表格数据
			tableData3: [], //点击数据
			onePeople: {}, // 存选择的某一条数据
			// username: '',
			totalList: 0,
			// account: '',
			member_id: '',
            gd_rate1: '', //  竞彩足球的代购返点
			gd_rate2: '', //  竞彩篮球代购返点
			hm_rate: '', // 合买返点
			startDate: '',  // 返点开始
			endDate: '',  // 返点结束
			remark: '',  //  返点类型
			lotteryType: '', //  彩种
            startvalue1: '',   //存储竞彩足球的点位开始时间
            startvalue2: '',   //存储竞彩篮球的点位开始时间
			endvalue1: '',   //存储竞彩足球点位结束时间
			endvalue2: '',   //存储竞彩篮球点位结束时间
			// options: [{
			// 	value: '38',
			// 	label: '竞彩足球'
			// }, {
			// 	value: '39',
			// 	label: '竞彩篮球'
			// }],
            value1: '',   //存储需要修改的竞彩足球的彩种
            value2: '',   //存储需要修改的竞彩篮球的彩种
			options2: [{
				value: '0',
				label: '非返点'
			}, {
				value: '1',
				label: '返点'
			}, {
				value: '2',
				label: '加奖 '
			}, {
				value: '3',
				label: '返点加奖'
			}],
            valueType1: '',  //竞彩足球的返点类型
			valueType2: '',  //竞彩篮球的返点类型
            rateParams: [],
            checkList: [],

            account: '',   //账号
            end_time: '',    //结束时间
            mobile: '',  //手机号
            page: 1,
            pageSize: 20,
            start_time: '',  //开始时间
            username: '',   //昵称
            name:'',
            idcard:'',
		}
	},
	created() {
		this.getTable()
	},
	methods: {
        search(){  //  搜索按钮
            this.page = 1
            this.pageSize = 20
			this.getTable()
        },       
		changeStatus(val){
		    return this.value = val
        },
        //翻页
        handleCurrentChange(num){
            this.page = num;
            this.getTable()
        },
        //改变页面大小
        handleSizeChange(num){
            this.pageSize = num;
            this.getTable()
        },
        
        //获取表格数据
        getTable(){
            let obj = {
                account: this.account,
                end_time: this.end_time,
                mobile: this.mobile,
                page: this.page,
                pageSize: this.pageSize,
                start_time: this.start_time,
                username: this.username,
                realName: this.name,
                identifyId: this.idcard,
            }
            findAllMember(obj).then(res => {
                if(res.data.error_code === 200){
                    this.tableData = res.data.data.list
                    this.totalList = res.data.data.total
                }else{
                    Message.error(res.data.message)
                }
            }).catch(error => {
                Message.error(error)
            })
        },        
		showDailag(data, type) {
			this.viewFormType = type
			this.viewFormVisible = true
			this.tableData3 = []
			this.tableData3.push(data);
			this.onePeople = data
		},
		clearForm() { //取消按钮
			this.viewFormVisible = false
		},
		submitInfos() {  // 确定按钮
            // console.log(this.value)
            // let arr =  []
            
            // if(this.checkList.length > 1){
            //     this.checkList.forEach(e => {
            //         arr.push(e) 
            //     });
            //     this.value = arr.join(',')    //当选择多个时
            // }else{
            //     this.value = this.checkList[0]  //当只选择一个时
            // }
            // let arr =  []
            // console.log(this.checkList)
            // if(this.checkList.length > 1){
            //     this.checkList.forEach(e => {
            //         arr.push(e)
            //         console.log(e)
            //     });
            //     this.value1 = arr[0]
            //     this.value2 = arr[1]
            //     // this.value = arr.join(',')    //当选择多个时
            // }else if(this.checkList[0] === '38'){
            //     console.log('111')
            //     this.value1 = this.checkList[0]  //当只选择一个时(竞彩足球)
            //     this.value2 = '39'
            //     this.gd_rate2 = '0'
            // }else if(this.checkList[0] === '39'){
            //     console.log('222')
            //     this.value1 = '38'
            //     this.value2 = this.checkList[0]  //当只选择一个时(竞彩篮球)
            //     this.gd_rate1 = '0'
            // }
            // let arr =  []
            // console.log(this.checkList)
            if(this.checkList.length < 2){
                this.$message.error('请选择两个！')
            }else{
                // this.checkList.forEach(e => {
                //     arr.push(e)
                //     console.log(e)
                // });
                // this.value1 = arr[0]
                // this.value2 = arr[1]
                if(this.gd_rate1 === '' || this.valueType1 === '' || this.startvalue1 === '' || this.endvalue1 === '' || this.gd_rate2 === '' || this.valueType2 === '' || this.endvalue2 === ''){
                    console.log('dfdsfd')
                    this.$message.error('请填完整！')
                }
                else{
                    this.setRate()
                }
            }
        },

        //设置返点
        setRate(){
            //竞彩足球
			let obj1 = {
				lotteryType: '38',
				dg_rate: this.gd_rate1, //  代购返点
				hm_rate: '0', // 合买返点  
				remark: this.valueType1,  //  返点类型
				startDate: this.startvalue1,// 返点开始
				endDate: this.endvalue1,// 返点结束
            }
            // 竞彩篮球
            let obj2 = {
				lotteryType: '39',
				dg_rate: this.gd_rate2, //  代购返点
				hm_rate: '0', // 合买返点  
				remark: this.valueType2,  //  返点类型
				startDate: this.startvalue2,// 返点开始
				endDate: this.endvalue2,// 返点结束
            }
            this.rateParams.push(obj1)
            this.rateParams.push(obj2)
			let account = this.onePeople.ACCOUNT
			setRate(account, JSON.stringify(this.rateParams)).then(res => {
				if(res.data.error_code==200) {
					Message.success(res.data.message)
					this.viewFormVisible = false
					this.tableData3 = []
				}else {
					Message.error(res.data.message)
					this.viewFormVisible = false
					this.tableData3 = []
				}
			})
        },
        
		// 分页的回调
		changepage(val) {
			this.getTable(val,this.sjname)
		},
	}
}
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
