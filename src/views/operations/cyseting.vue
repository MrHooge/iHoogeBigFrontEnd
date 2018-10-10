<template>
	<!-- 彩研设置 -->
	<div class="cysetting app-container">
		<div class="search">
			<el-row :gutter="20">
				<el-col :span="5">
					<div class="grid-content bg-purple">
						<div style="width:220px;">
							<el-input v-model="mobile"
							          placeholder="请输入手机号" clearable></el-input>
						</div>
					</div>
				</el-col>
				<el-col :span="5">
					<div class="grid-content bg-purple">
						<div style="width:220px;">
							<el-input v-model="account"
							          placeholder="请输入用户名" clearable></el-input>
						</div>
					</div>
				</el-col>
				<el-col :span="5">
					<div class="grid-content bg-purple">
						<div style="width:220px;">
							<el-input v-model="username"
							          placeholder="请输入昵称" clearable></el-input>
						</div>
					</div>
				</el-col>
				<el-col :span="3">
					<div class="grid-content bg-purple">
						<el-button type="primary"
						           icon="el-icon-search"
						           @click="search">搜索</el-button>
					</div>
				</el-col>
				<el-col :span="5">
					<el-select v-model="typeval"
					           placeholder="请选择一个类型"
					           @change="gettype">
						<el-option v-for="item in options"
						           :key="item.value"
						           :label="item.name"
						           :value="item.id">
						</el-option>
					</el-select>
				</el-col>
			</el-row>
		</div>
		<div class="top20">
			<el-table :data="tabledata"
			          border
			          style="width: 100%;">
				<el-table-column prop="account"
				                 label="用户名"
				                 align="center">
				</el-table-column>

				<el-table-column align="center"
				                 label="手机号">
					<template slot-scope="scope">
						<span>{{ scope.row.mobile }}</span>
					</template>
				</el-table-column>

				<el-table-column align="center"
				                 label="类型">
					<template slot-scope="scope">
						<div slot="reference"
						     class="name-wrapper">
							{{ scope.row.type | typeIn }}
						</div>
					</template>
				</el-table-column>

				<el-table-column prop="name"
				                 align="center"
				                 label="姓名">
				</el-table-column>
				<el-table-column align="center"
				                 label="操作">
					<template slot-scope="scope">
						<div v-if="scope.row.type === 0">
							<el-button type="primary"
							           @click="change(scope.row)">
								设为彩研人员
							</el-button>
						</div>
						<div v-else-if="scope.row.type === 1">
                            <el-button type="success">
								彩研人员
							</el-button>
                        </div>
                        <div v-else>
                            <el-button type="warning">
								机器人
							</el-button>
                        </div>
					</template>
				</el-table-column>
			</el-table>
			<!-- 分页 -->
			<div class="page">
				<el-pagination background
				               layout="prev, pager, next"
				               :page-size="pages"
				               @current-change="currentPage"
				               :total="totalNum"
                               v-if="totalNum != ''">
				</el-pagination>
			</div>
		</div>
		<!-- 弹窗事件 -->
		<el-dialog title="设置彩研人员"
		           :visible.sync="dialogVisible"
		           width="400px"
		           top="20%">
			<div>
				<el-row :gutter="20">
					<el-col :span="5">
						<div class="grid-content bg-purple">
							用户名:
						</div>
					</el-col>
					<el-col :span="5">
						<div class="grid-content bg-purple">
							<div style="width:220px;">
								<el-input v-model="pname"
								          disabled clearable></el-input>
							</div>
						</div>
					</el-col>
				</el-row>
				<br>
				<el-row :gutter="20">
					<el-col :span="5">
						<div class="grid-content bg-purple">
							倍数:
						</div>
					</el-col>
					<el-col :span="5">
						<div class="grid-content bg-purple">
							<div style="width:220px;">
								<el-input v-model="beishu"
								          placeholder="请输入倍数" clearable></el-input>
							</div>
						</div>
					</el-col>
				</el-row>
			</div>
			<span slot="footer"
			      class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary"
				           @click="confim">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { getMember, toCaiYan } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
	data() {
		return {
			tabledata: [], //表格数据
			pages: 20,
			dialogVisible: false, //弹窗隐藏
			totalNum: 0,
			beishu: '', //用户输入的倍数
			mobile: "", // 手机号
			account: "", // 用户名
			username: "", //昵称
			typeval: "", //选中的类型
			everydata: '',  //存储每条数据
			pname: '', //弹窗展示的人名
			options: [
				{ name: "普通会员", id: 0 },
				{ name: "彩研人员", id: 1 },
				{ name: "机器人", id: 2 }
            ], //下拉选择数据
            
            page: 1,
            typeval: "", //选中的类型
            pageSize: 20,
		};
	},
	filters: {
		typeIn(a) {
			if (a === 0) {
				return "普通会员"

			} else if (a === 1) {

				return "彩研人员"

			} else {
				return "机器人"
			}
		}
	},
	created() {
        this.page = 1
		this.getData();
	},
	methods: {
		search() {
            this.page = 1
			this.getData();
		},
		// 设置为彩研人员按钮事件
		change(a) {
			this.everydata = a
			this.pname = a.account
			this.dialogVisible = true
		},
		// 弹窗的确定
		confim() {
			this.dialogVisible = false;
			let obj = {
				account: this.pname,
				multiple: this.beishu
			}
			toCaiYan(obj).then(res => {
				console.log(res)
				if (res.data.success === true) {
                    this.$message.success("设置成功")
                    this.getData();
                    this.beishu = ''
				} else {
					this.$message(res.data.msg)
				}
			})

		},
    /**
     * @argument[
     *  {curr:当前页}
     *  {type:类型}
     *  {account:用户名}
     *  {username:昵称}
     *  {mobile:手机号}
     * ]
     */
		getData() {
			let obj = {
				page: this.page,
				type: this.typeval,
				account: this.account || "",
				username: this.username || "",
				mobile: this.mobile || "",
				pageSize: this.pageSize
			};
			getMember(obj).then(res => {
				console.log(res)
				if (res.data.success === true) {
					this.totalNum = res.data.totalCount;
                    this.tabledata = res.data.data;
				}else{
                    this.$message.error(res.data.msg)
                }
			})
		},
		// 获取类型
		gettype() {
			this.getData();
		},
		// 分页回调 获取当前的点击页码
		currentPage(val) {
            this.page = val
			this.getData();
		}
	}
};
</script>

<style scoped>
.top20 {
  margin-top: 20px;
}
.page {
  padding: 10px 0;
}
</style>