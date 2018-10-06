<template>
	<!-- 运营传票记录 -->
	<div class="custorm app-container">
		<el-row :gutter="10">
			<el-col :span="6">
				<div class="grid-content bg-purple">
					<el-input v-model="input"
					          placeholder="请输入客户名" clearable></el-input>
				</div>
			</el-col>
			<el-col :span="3">
				<div class="grid-content bg-purple">
					<el-button type="primary">查询</el-button>
				</div>
			</el-col>
		</el-row>

		<div class="tablebox">
			<el-table :data="tableData"
			          border
			          style="width: 100%;">
				<el-table-column prop="id"
				                 label="编号">
				</el-table-column>

				<el-table-column prop="account"
				                 label="客户昵称">
				</el-table-column>

				<el-table-column prop="planNo"
				                 label="单号">
				</el-table-column>
				<el-table-column label="发起时间"
				                 align="center">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.createDateTime}}</span>
					</template>
				</el-table-column>

				<el-table-column label="寻票时间"
				                 align="center">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.findTime}}</span>
					</template>
				</el-table-column>

				<el-table-column label="寻票状态">
					<template slot-scope="scope">
						<div v-if="scope.row.isFind">
							<span>成功</span>
						</div>
						<div v-else>
							<span v-if="scope.row.isDeliver">
								<el-button type="text"
								           @click="deliveryTicket(scope.row.planNo)">发起送票</el-button>
							</span>
							<span v-else>
								驳回
							</span>
						</div>

					</template>
				</el-table-column>
				<el-table-column label="票状态">
					<template slot-scope="scope">
						<span>{{getStr(scope.row.planStatus)}}</span>
					</template>
				</el-table-column>
				<!-- <el-table-column
                label="添加与否">
                    <template slot-scope="scope">
                        <div v-if="scope.row.xunpiao==1">
                            <span>空</span>
                        </div>
                        <div v-else>
                            <el-button type="primary" icon="el-icon-plus" circle></el-button>
                        </div>
                        
                    </template>
                </el-table-column> -->
			</el-table>
			<el-row :gutter="20">
				<el-col :span="15">
					<div class="grid-content bg-purple">
						<div class="ps">
							<p>
								<i class="el-icon-star-on"></i>
								本周记录： 成功
								<span>80</span>单，失败
								<span>20</span>单，总寻票
								<span>100</span>单，总上传票
								<span>90</span>单；
							</p>
							<p>最新的驳回或失败的置顶，寻票成功后，保留对应记录， 点击寻票功能后，成功或失败</p>
							<p>运营账号可以在投注截止后3分钟内，可以发起寻票。</p>
						</div>
					</div>
				</el-col>
				<el-col :span="9">
					<div class="grid-content bg-purple">
						<div class="pages">
							<el-pagination background
							               layout="prev, pager, next"
							               :total="total"
                                           v-if="total != ''"
							               @current-change="changecurr">
							</el-pagination>
						</div>
					</div>
				</el-col>
			</el-row>

		</div>
	</div>
</template>

<script>
import { findTicketList, deliverTicket } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'
export default {
	data() {
		return {
			input: "",
			total: 0,
			value1: "",
			value2: "",
			value6: "",
			tableData: []
		};
	},
	filters: {
		changeTime(timestamp) {
			var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
			let Y = date.getFullYear() + '-';
			let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
			let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
			let h = date.getHours() + ':';
			let m = date.getMinutes();
			// let s = date.getSeconds();
			return Y + M + D + h + m;
		}

	},
	created() {
		this.getData(1);
	},
	methods: {
		handleEdit(index, row) {
			console.log(index, row);
		},
		handleDelete(index, row) {
			console.log(index, row);
		},
		getData(curr) {  //  获取数据列表
			let obj = { offset: curr, pageSize: 20 }
			findTicketList(obj).then(res => {
				console.log(res)
				if (res.status == 200) {
					if (res.data.findTicketList.list.length > 0) {
						this.total = res.data.findTicketList.total;
						this.tableData = res.data.findTicketList.list;
					} else {
						return;
					}
				}
			})
		},
		// 分页的回调
		changecurr(val) {
			this.getData(val)
		},
		deliveryTicket(planNo) {
			let obj = { planNo: planNo }
			deliverTicket(obj).then(res => {
				if (res.status == 200) {
					if (res.data.code === 200) {
						this.$message(res.data.message);
						this.getData(1)
					} else {
						this.$message(res.data.message);
					}
				}
			})

		},
		getStr(num) {
			if (num == 3) {
				return "出票中";
			} else if (num == 4) {
				return "已出票";
			} else if (num == 5) {
				return "已撤单";
			} else if (num == 6) {
				return "已流单";
			} else if (num == 7) {
				return "受理中";
			} else if (num == 8) {
				return "部分出票";
			} else if (num == 9) {
				return "未出票";
			} else if (num == 10) {
				return "已过期";
			}
		},
	}
};
</script>

<style lang="scss" scoped>
.custorm {
  .tablebox {
    margin-top: 20px;
  }
  div.ps {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    color: #444;
    width: 540px;
    box-shadow: 0px 0px 15px #999;
    background-color: #f9f9f9;
    font-size: 14px;
    margin-top: 20px;
    p {
      line-height: 25px;
    }
    p:first-child {
      color: #e6a23c;
      span {
        color: #555;
        font-size: 16px;
        padding: 0 5px;
      }
    }
  }
  .pages {
    float: right;
    padding: 10px 50px;
  }
}
</style>