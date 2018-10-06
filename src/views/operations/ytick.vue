<template>

	<div class="custorm app-container">
		<el-row :gutter="10">
			<el-col :span="4">
				<div class="grid-content bg-purple">
					<el-input v-model="planNo"
					          placeholder="请输入方案编号" clearable></el-input>
				</div>
			</el-col>

			<el-col :span="3">
				<div class="grid-content bg-purple">
					<el-button type="primary"
					           @click="seach">查询</el-button>
				</div>
			</el-col>
		</el-row>
		<!-- 弹窗事件 -->
		<el-dialog title="提示"
		           :visible.sync="dialogVisible"
		           width="40%">
			<div>
				<p>信息：{{ message }}</p>

			</div>
			<span slot="footer"
			      class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary"
				           @click="dialogVisible = false">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { findTicke2 } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
// import moment from "moment"
export default {
	data() {
		return {
			planNo: '', //  方案编号
            dialogVisible: false,
            message: '',
		};
	},
	methods: {
		seach() {//  查询按钮
			this.getData()
		},
		handleEdit(index, row) {
			console.log(index, row);
		},
		handleDelete(index, row) {
			console.log(index, row);
		},
		// dateFormat:function(row, column) {  
		//     var date = row[column.property];  
		//     if (date == undefined) {  
		//         return "";  
		//     }  
		//     return moment(date).format("YYYY-MM-DD HH:mm:ss");  
		// },
		getData() {
			let obj = {
				account: getCookies('name'),
				planNo: this.planNo,  // 方案编号
				type: 2, // 1代理列表 2后台列表
			}
			findTicke2(obj).then(res => {
                console.log(res)
                console.log('111')
				if (res.status == 200) {
					this.dialogVisible = true
					this.message = res.data.message

				}
			})
		},
		// 分页的回调
		// changecurr(val) {
		// 	this.getData(val)
		// 	// console.log(val)
		// }

	}
};
</script>

<style lang="scss" scoped>
.custorm {
  .tablebox {
    margin-top: 20px;
  }
  .pages {
    float: right;
    padding: 10px 50px;
  }
}
</style>