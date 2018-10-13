<template>
	<div class="app-container">
		<el-tabs v-model="activeName"
		         type="card"
		         @tab-click="handleClick">
			<el-tab-pane label="充值轮播墙"
			             name="first">
			</el-tab-pane>
			<el-tab-pane label="消费轮播墙"
			             name="second">
            </el-tab-pane>
		</el-tabs>
        <el-col :span="12">
            <div class="block"
                    style="display: inline-block;">
                <el-date-picker v-model="value1"
                                type="datetime"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
            </div>
            <div style="display: inline-block;">至</div>
            <div class="block"
                    style="display: inline-block;">
                <el-date-picker v-model="value2"
                                type="datetime"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                default-time="23:59:59">
                </el-date-picker>
            </div>
        </el-col>
        <el-col :span="2">
            <div class="grid-content bg-purple"
                    @click="search">
                <el-button type="primary"
                            icon="el-icon-search">搜索</el-button>
            </div>
        </el-col>
		<div>
			<el-table :data="tableData"
			          border
			          style="width: 100%">
				<el-table-column prop="username"
				                 label="会员昵称">
				</el-table-column>

				<el-table-column prop="rechargeMoney"
				                 label="金额">
				</el-table-column>
				<el-table-column prop="agentnName"
				                 label="代理昵称">
				</el-table-column>

			</el-table>
			<el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[10, 20, 30, 40, 50]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalList"
                v-if="totalList != ''"
            >
            </el-pagination>
		</div>
	</div>
</template>

<script>
import { findRechargeAndConsumerWall } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
	components: {
	},
	data() {
		return {
			activeName: 'first',
			tableData: [], //  存储充值消费数据
			page:1,
            pageSize:20,
            totalList: 0,
            value1: '',
            value2: '',
            isRecharge: true,   //是否是充值墙 是为true，默认显示充值墙
		}
	},
	created() {
		this.getTableData(1)
	},
	methods: {
        search() {
            this.page = 1
            this.handleClick()
        },
		//翻页
        handleCurrentChange(num){
            this.page = num;
            if(this.isRecharge){
				this.getTableData(1)
            }else{
				this.getTableData(0)
            }
        },
        //改变页面大小
        handleSizeChange(num){
            this.pageSize = num;
        },
		handleClick() {
            this.page = 1
			if (this.activeName === 'first') {
                this.isRecharge = true
				this.getTableData(1)
			} else {
                this.isRecharge = false
				this.getTableData(0)
			}

		},
		getTableData(a) { //  获取充值消费数据
			let obj = {
				isConsumer: a,
				loginAccount: getCookies('name'),
				page:this.page,
                pageSize:this.pageSize,
                startTime: this.value1 || '',
                endTime: this.value2 || ''
			}
			findRechargeAndConsumerWall(obj).then(res => {
				console.log(res)
				if (res.data.error_code == 200) {
                    this.tableData = res.data.data.list
                    this.totalList = res.data.data.total
				}else{
                    this.$message.error(res.data.message)
                    this.tableData = []
                    this.totalList = ''
                }
			})
		}
	}
}
</script>

<style scoped>
</style>
