<template>
	<div class="backend app-container">
		<div class="layerbody">
			<div class="search">
				<el-input v-model="sjname"
				          placeholder="请输入宣传ID"
				          style="width:50%;"
				          @input="onInput"></el-input>
				<el-button type="primary"
				           icon="el-icon-search"
				           @click="search">搜索</el-button>
			</div>
            <div slot="footer"
                class="dialog-footer"
                v-show="isShow"
                style="padding:30px 0;">
                <el-button type="primary"
                        style="width:10%;"
                        @click="cofirm">确 定</el-button>
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
                    <el-table-column label="方案发起人"
					                 prop="account"
					                 align="center">
					</el-table-column>
                    <el-table-column label="宣传ID"
					                 prop="propagandaId"
					                 align="center">
					</el-table-column>
					<el-table-column label="评论人"
					                 prop="username"
					                 align="center">
					</el-table-column>
					<el-table-column label="评论内容"
					                 prop="connect"
					                 align="center">
					</el-table-column>
                    <el-table-column label="评论时间"
					                 prop="time"
					                 align="center">
					</el-table-column>
                    <el-table-column label="审核状态"
					                 prop="status"
					                 align="center"
                                     :filters="[{ text: '正在审核', value: '正在审核' }, { text: '审核通过', value: '审核通过' },{ text: '审核不通过', value: '审核不通过' }]"
                                     :filter-method="filterTag"
                                     filter-placement="bottom-end">
                                     <template slot-scope="scope">
                                        <el-tag
                                        type="colorType"
                                        disable-transitions>{{scope.row.status | changeType}}</el-tag>
                                    </template>
					</el-table-column>
				</el-table>
			</div>
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
		<el-dialog title="确认审核"
		           :visible.sync="dialogVisible"
		           width="40%">
			<div>
			</div>
			<span slot="footer"
			      class="dialog-footer">
				<el-button @click="toExamine(2)">驳回</el-button>
				<el-button type="primary"
				           @click="toExamine(1)">审 核</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { getUnreviewedWinCommentList,shWinComment } from '@/api/news'
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
            newNumber: "",
			arr: [],
            pageShow: false,
            status: "",  //审核的状态
            colorType: "", //颜色类型
		}
	},
	created() {
        this.getData(1, this.sjname)
	},
    filters: {
        changeType(val){
            if(val === 0 || val === '正在审核'){
                return '正在审核'
            }
            else if(val === 1 || val === '审核通过'){
                return '审核通过'
            }
            else if(val === 2 || val === '审核不通过'){
                return '审核不通过'
            }
        },
        
    },
	methods: {
		onInput() {
			this.getData(1, this.sjname)
		},
		search() {
			this.getData(1, this.sjname)
        },
        filterTag(value, row) {
            if(row.status === 0){
                return row.status = '正在审核'
            }
            else if(row.status === 1){
                return row.status = '审核通过'
            }
            else if(row.status === 2){
                return row.status = '审核不通过'
            }

            return row.status === value;
        },
        // changeColor(row){
        //     if(row.status === 0){
        //         this.colorType = 'success';
        //     }
            
        // },
        //获取评论列表
		getData(curr, a) {
			let obj = {
                pageSize : 20,
				offset: curr,
                id: a, //  不传 查询全部
			}
			getUnreviewedWinCommentList(obj).then(res => {
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
			if (val.length > 0) {
				this.isShow = true

			} else {
				this.isShow = false
			}

		},
		cofirm() {
            this.number = []
			this.multipleSelection.forEach(e => {  //  循环 选中数据  添加选中ID 放入 新数组中
                this.number.push(e.id)
                this.newNumber = this.number.join(',')
                console.log(this.newNumber)
            });
			this.dialogVisible = true
		},
        //评论审核
        toExamine(val){
			let arr = []
			let myObj = {}
			console.log(arr)
			let type = val
			let cid = Number(this.newNumber)
				shWinComment(type,JSON.stringify(cid)).then(res => {
					console.log(res)
					if (res.data.error_code = 200) {
						Message.success(res.data.message)
                        this.dialogVisible = false
                        this.getData(1, this.sjname)
					} else {
						Message.success(res.data.message)
					}
				})
        },
		changepage(val) {  //  分页回调
			this.getData(val, this.sjname)
		}
	}
}
</script>

<style scoped>
.main {
  padding-top: 30px;
}
.backend >>> .el-dialog__header{
    text-align: center;
}
.backend >>> .el-dialog__footer{
    text-align: center;
}
.backend >>> .el-button--default{
    background: #e25550;
    color: #fff;
}
/* .backend >>> .el-tag{
    background: #31b0d5;
    color: #fff;
} */
</style>
