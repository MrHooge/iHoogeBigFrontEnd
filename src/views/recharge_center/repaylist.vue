<template>
	<div class="repaylist app-container">
		<div class="addrp">
			<addrepay></addrepay>
		</div>
		<!-- 表格数据 -->
		<el-table :data="tableData"
		          border
		          style="width: 100%">
			<el-table-column label="姓名"
			                 align="center"
			                 prop="name">
			</el-table-column>

			<el-table-column label="线上|线下"
			                 align="center">
				<template slot-scope="scope">
					{{ scope.row.isOnline|changeType }}
				</template>
			</el-table-column>

			<el-table-column label="图片展示"
			                 align="center">
				<template slot-scope="scope">
					<img :src="'https://'+scope.row.pictureUrl"
					     alt="这是个图片"
					     style="max-width:100%">
				</template>
			</el-table-column>
			<el-table-column label="支付渠道状态"
			                 align="center">
				<template slot-scope="scope">
					<el-button type="text"
					           @click="changeType(scope.row)">
						{{ scope.row.status| changeStatus }}
					</el-button>
				</template>
			</el-table-column>
			<el-table-column label="支付渠道"
			                 align="center"
			                 width="180">
				<template slot-scope="scope">
					{{ scope.row.type | changePay }}
				</template>
			</el-table-column>

			<el-table-column label="操作"
			                 align="center">
				<template slot-scope="scope">
					<el-button size="mini"
					           @click="handleEdit(scope.row)">编辑</el-button>
					<el-button size="mini"
					           type="danger"
					           @click="handleDelete(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<div class="page">
			<el-pagination background
			               layout="prev, pager, next"
			               @current-change="currentPage"
			               :total="totalNum"
                           v-if="totalNum != ''">
			</el-pagination>
		</div>

		<!-- 编辑的弹窗 开始-->
		<el-dialog title="编辑"
		           :visible.sync="dialogVisible"
		           width="510px"
		           top="15%">
			<!-- 弹窗中间展示内容 -->
			<div class="layercontent">
				<!-- 第一行图片 -->
				<el-form :model="ruleForm"
				         :rules="rules"
				         ref="ruleForm"
				         label-width="100px"
				         class="demo-ruleForm">
					<!-- <el-form-item label="名字"
					              prop="name">
						<el-input v-model="ruleForm.name"
						          id="upInput" clearable></el-input>
					</el-form-item> -->
					            <p class="name">
                <el-row :gutter="20">
                    <el-col :span="4">
                      <div class="grid-content bg-purple">
                        名字：
                      </div>
                    </el-col>
                    <el-col :span="18">
                      <div class="grid-content bg-purple">
                        {{ rowdate.name }}
                      </div>
                    </el-col>
                </el-row> 
            </p>
					<el-form-item label="图标"
					              prop="pay_picture">
						<!-- <el-input v-model="ruleForm.pay_picture"
						          type="file"
						          class="addBorder" clearable></el-input> -->
						<el-upload :action="uploadUrl"
						           :data='folder'
						           list-type="picture-card"
						           :on-success="handleAvatarSuccess"
						           :before-upload="beforeAvatarUpload"
						           :on-remove="handleRemove">
							<i class="el-icon-plus"></i>
						</el-upload>
					</el-form-item>
					<el-form-item label="类型"
					              prop="radio">
						<div class="grid-content bg-purple">
							<div>
								<el-radio v-model="ruleForm.radio"
								          label="zfb"
								          border>支付宝</el-radio>
								<el-radio v-model="ruleForm.radio"
								          label="wx"
								          border>微信</el-radio>
							</div>
						</div>
					</el-form-item>
					<el-form-item>
						<el-button type="primary"
						           @click="submitForm('ruleForm')">立即创建</el-button>
						<el-button @click="resetForm('ruleForm')">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
		<!-- 编辑的弹窗 结束-->
		</div>
</template>

<script> 
import addrepay from './addrepay'
import { getPayChannelList, deletePayChannel, updateStatus,updatePayChanne } from '@/api/sys_user'
import waves from '@/directive/waves/index.js' // 水波纹指令
import { Message } from 'element-ui'
import treeTable from '@/components/TreeTable'
import { getCookies, setCookies, removeCookies } from '@/utils/cookies'

export default {
	components: {
		addrepay
	},
	data() {
		return {
			tableData: [], //表格数据
			totalNum: 0, //总页
			dialogVisible: false, //弹窗隐藏
			rowdate: "", //保存每一行的数据对象
			radio: "zfb", //单选框
			imageUrl: "", // 图片地址
			has: '', // 保存选择的有效和无效的状态
			ids: '', // 存储选择的当前行数据的id
			imurl: '', //图片上传地址
			ruleForm: {
				name: "",
				radio: '',
				pay_picture: ""
			},
			rules: {
				name: [
					{ required: true, message: "请输入活动名称", trigger: "blur" },
					{ min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
				]
			},
			uploadUrl: "",//  图片上传接口
			fileUrl: '',
			folder: {
				folder: 'pay'
			}

		};
	},
	filters: {
		changeStatus(a) {

			return a ? "有效" : "无效";
		},
		changeType(a) {
			return a ? "线上" : "线下";
		},
		changePay(a) {
			if (a == "wx") {
				return "微信";
			} else {
				return "支付宝";
			}
		}
	},
	created() {
		this.getRepayList(1);
	},
	mounted() {
		// this.uploadUrl = api.member + '/userCount/uploadFile'
		this.uploadUrl = 'https://pay.api.qiyun88.cn/information/uploadImage'
	},
	methods: {
		// ====================== 修改支付 ========================================
		// =====================================================
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		handleAvatarSuccess(res, file) {
			console.log(res);
			console.log(file)
			this.ruleForm.pay_picture = res  //  添加支付的图片名
			this.fileUrl = res  //  修改支付的图片名
			this.imageUrl = URL.createObjectURL(file.raw);
		},
		beforeAvatarUpload(file) {
			const JPGArr = ["image/jpg", "image/jpeg", "image/png", "image/gif"]
			const isJPG = JPGArr.indexOf(file.type) > -1;
			const isLt2M = file.size / 1024 / 1024 < 2;

			if (!isJPG) {
				this.$message.error("上传图片只能是 JPG/PNG/GIF 格式!");
			}
			if (!isLt2M) {
				this.$message.error("上传图片大小不能超过 2MB!");
			}
			return isJPG && isLt2M;
		},
		submitForm(formName) {  //   添加支付

			let obj = {
				QRCode: this.ruleForm.pay_picture,
				name: this.rowdate.name,
				type: this.ruleForm.radio,
				id:this.rowdate.id
			};
			console.log(obj)

			this.$refs[formName].validate(valid => {
				if (valid) {
					// alert("submit!");
					updatePayChanne(obj).then(res => {
						console.log(res)
						if (res.data.error_code == 200) {
							Message.success(res.data.message)
							this.dialogVisible1 = false
							// this.findPaySwitch()
						} else {
							Message.success(res.data.message)
						}
					})
				} else {
					console.log("error submit!!");
					return false;
				}
			});
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// ==============================================================
		currentPage(val) {
			this.getRepayList(val)
		},
		// 图片上传***///////////////////
		// 调支付列表接口数据
		getRepayList(curr) {
			let obj = {
				page: curr,
				pageSize: 20
			};
			getPayChannelList(obj).then(res => {
				console.log(res)
				if (res.status == 200) {
					// console.log(res.data);
					this.tableData = res.data.data;
					this.totalNum = res.data.totalCount;

				}
			})
		},
		// 删除一条充值渠道
		clearData(id) {
			console.log(id)
			let obj = { id: id };
			deletePayChannel(obj).then(res => {
				console.log(res)
				if (res.status == 200) {
					Message.success(res.data.msg)
				}
			})
		},
		// 修改按钮的弹窗
		handleEdit(row) {
			this.dialogVisible = true;
			this.rowdate = row;
			console.log()
		},
		// 编辑弹窗的确定按钮回调
		editlayer() {
			console.log(this.rowdate.id);
			console.log(this.rowdate.name);
			console.log(this.rowdate.type);
		},
		// 保存到更新数据接口
    /**
     * @param{
     *  a:当前id
     *  b：当前名字，
     *  c: 类型
     * }
     */
		update(a, b, c, d) {
			let obj = {
				id: a,
				name: b,
				type: c,
				QRCode: d
			};
			this.$http
				.get(api.pay + "/xxPay/updatePayChannel", { params: obj })
				.then(res => {
					console.log(res)

				});
		},
		// 删除按钮的回调
		handleDelete(row) {
			// console.log(index, row);
			this.$confirm("您确定要删除吗?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					console.log(row.id);
					this.clearData(row.id);
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消删除"
					});
				});
		},
		// 点击支付状态弹窗
		changeType(row) {
			if (row.status == 1) {
				this.has = 1
			} else {
				this.has = 0
			}
			let obj = {
				id: row.id,
				status: this.has
			}
			this.$confirm("您确定要修改吗?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning"
			})
				.then(() => {
					console.log(row.id);
					updateStatus(obj).then(res => {
						if (res.status == 200) {
							Message.success(res.data.msg)
						} else {
							Message.success(res.data.msg)
						}
					})
				})
				.catch(() => {
					this.$message({
						type: "info",
						message: "已取消修改"
					});
				});

			// this.$http.get(api.pay + '/xxPay/updateStatus', { params: obj }).then(res => {
			// 	console.log(res)
			// 	if (res.data.success == true) {
			// 		this.$message(res.data.msg)
			// 	}
			// })
			this.getRepayList(1)
			this.layerShow = true
		},

	}
};
</script>

<style scoped>
.addrp {
  margin-bottom: 15px;
}
p.name {
  padding: 20px 0;
}
.oneimg {
  line-height: 100px;
}
.showimg {
  width: 100px;
  height: 100px;
  border: 1px dash #ddd;
  border-radius: 7px;
  border: 1px dashed #666;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.bg-purple >>> .el-upload--text {
  background-color: #fff;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100px;
  height: 100px;
  text-align: center;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader {
  height: 100px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar {
  /* width: 178px;
  height: 178px; */
  display: block;
}
img {
  width: 100px;
  height: 100px;
}
</style>