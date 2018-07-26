<template>
	<div class="app-container">
		<!--    支付 开 停 操作 -->
		<!-- <div class="search">
			<el-input v-model="username"
			          style="width:300px;"
			          placeholder="请输入用户账号进行筛选"></el-input>
		</div> -->
		<el-table :data="tableData"
		          border
		          style="width: 100%; margin-top: 20px">
			<el-table-column label="编号"
			                 align="center"
			                 type="index"
			                 width="120px">
			</el-table-column>
			<el-table-column prop="pay_name"
			                 align="center"
			                 label="类型">
			</el-table-column>
			<el-table-column label="状态"
			                 align="center">
				<template slot-scope="scope">
					{{scope.row.is_open | type}}
				</template>
			</el-table-column>
			<el-table-column prop="pay_picture"
			                 align="center"
			                 label="图片">
			</el-table-column>
			<el-table-column align="center"
			                 width="220px;"
			                 label="操作">
				<template slot-scope="scope">
					<el-button type="primary"
					           @click="handleEdit(scope.row, 'modify')">查看详情</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog title="支付信息"
		           width='70%'
		           :visible.sync="viewFormVisible">
			<el-table :data="tableData3"
			          border
			          tooltip-effect="dark"
			          style="width: 100%">
				<el-table-column label="ID"
				                 align="center">
					<template slot-scope="scope">{{ scope.row.id}}</template>
				</el-table-column>
				<el-table-column label="支付名称"
				                 align="center">
					<template slot-scope="scope">{{ scope.row.pay_name }}</template>
				</el-table-column>
				<el-table-column label="图标"
				                 align="center">
					<template slot-scope="scope">{{ scope.row.pay_picture }}</template>
				</el-table-column>
				<el-table-column label="状态"
				                 align="center">
					<template slot-scope="scope">{{ scope.row.is_open | type}}</template>
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
								<el-table-column label="ID"
								                 align="center">
									<template slot-scope="scope">
											{{ scope.row.id}}
									</template>
								</el-table-column>
								<el-table-column label="支付名称"
								                 align="center">
									<template slot-scope="scope">
										<el-input v-model="scope.row.pay_name"
												placeholder="请输入内容"></el-input>

									</template>
								</el-table-column>
								<el-table-column label="图标"
								                 align="center">
									<template slot-scope="scope">{{ scope.row.pay_picture }}</template>
								</el-table-column>
								<el-table-column label="状态"
								                 align="center">
									<template slot-scope="scope">
										<el-switch
											v-model="value3"
											active-text="开"
											inactive-text="关"
											@change="switchChange">
										</el-switch>
									</template>
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
	</div>
</template>

<script>
import { findPaySwitch, addPaySwitch } from "@/api/sys_user";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message, Checkbox } from "element-ui";
import treeTable from "@/components/TreeTable";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
export default {
  data() {
    return {
      pageShow: true,
      tableData: [],
      total: 0,
      username: "",
      viewFormVisible: false,
      tableData3: [], //
      onePeople: {}, // 存选择的某一条数据
      activeNames: ["2"], //  折叠面板
      is_open:'',
      value1: "",
	  value2: "",
	  value3: true,
	value4: true,
    };
  },
  filters: {
    type(a) {
      return a == "0" ? "开启" : "关闭";
    }
  },

  computed: {},
  created() {
    this.getTable();
  },
  methods: {
	  switchChange(){
		//   console.log(this.value3)
		  if(this.value3==true){
			this.is_open=1
		}else {
			this.is_open=0
		}
	  },
    handleChange(val) {
      console.log(val);
    },
    getTable() {
      //   获取所有会员列表
      findPaySwitch().then(res => {
        if (res.data.error_code == 200) {
          this.tableData = res.data.data;
        }
        console.log(res);
      });
    },
    handleEdit(obj) {
      console.log(obj);
      this.tableData3 = [];
      this.viewFormVisible = true;
      this.tableData3.push(obj);
      //   console.log(this.tableData3);
      this.onePeople = obj;
      //   console.log(this.onePeople);
    },
    submitInfos() {
		  if(this.value3==true){
			this.is_open=1
		}else {
			this.is_open=0
		}
      let obj = {
        is_open: this.is_open,
        is_update: 1,
        pay_name: this.onePeople.pay_name
	  };
	  console.log(obj)
    //   addPaySwitch(obj).then(res => {
    //     console.log(res);
    //   });
    },
    clearForm() {
      //  取消按钮
      this.viewFormVisible = false;
    },
    // 分页的回调
    changepage(val) {
      this.getTable(val);
    }
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
