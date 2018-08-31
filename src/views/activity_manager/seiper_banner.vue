<template>
	<div class="app-container">
		<!--    轮播图 管理 -->
		<el-row>
			<el-button type="primary"
			           @click="showDailag">添加轮播图</el-button>

		</el-row>

		<div style="padding-top:10px">
			<el-select v-model="value"
			           placeholder="请选择"
			           @change="selectChange">
				<el-option v-for="item in options"
				           :key="item.value"
				           :label="item.label"
				           :value="item.value">
				</el-option>
			</el-select>
		</div>

		<el-table :data="tableData"
		          border
		          style="width: 100%; margin-top: 20px">
			<el-table-column label="ID"
			                 align="center"
			                 prop="id"
			                 width="120px">
			</el-table-column>
			<el-table-column align="center"
			                 label="创建时间">
				<template slot-scope="scope">
					{{scope.row.create_time}}
				</template>
			</el-table-column>
			<el-table-column label="状态"
			                 align="center">
				<template slot-scope="scope">
					{{scope.row.is_use | type}}
				</template>
			</el-table-column>
			<el-table-column align="center"
			                 label="图片"
                             >
				<template slot-scope="scope">
					<img :src="scope.row.picture"
                            
					     alt=""
                         width="100%">
				</template>
			</el-table-column>
			<el-table-column align="center"
			                 label="跳转地址"
			                 prop="render_url">

			</el-table-column>
			<el-table-column align="center"
			                 label="位置"
			                 prop="weights">

			</el-table-column>
			<el-table-column align="center"
			                 width="220px;"
			                 label="操作">
				<template slot-scope="scope">
					<el-button type="primary"
					           @click="handleEdit(scope.row, 'modify')">轮播修改</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 弹窗 -->
		<el-dialog title="轮播信息"
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
				<el-table-column label="状态"
				                 align="center">
					<template slot-scope="scope">{{scope.row.is_use | type}}</template>
				</el-table-column>
				<el-table-column label="图标"
				                 align="center">
					<template slot-scope="scope"> <img :src="scope.row.picture"
						     alt=""></template>
				</el-table-column>
				<el-table-column label="跳转地址"
				                 align="center">
					<template slot-scope="scope">{{ scope.row.render_url}}</template>
				</el-table-column>
				<el-table-column label="位置"
				                 align="center">
					<template slot-scope="scope">{{ scope.row.weights}}</template>
				</el-table-column>
			</el-table>
			<!--   修改轮播图 -->
			<div class="pierce">
				<el-collapse v-model="activeNames"
				             @change="handleChange">
					<el-collapse-item title="修改轮播"
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
								<el-table-column label="图标"
								                 align="center">
									<template slot-scope="scope">
										<el-upload :action="uploadUrl"
										           :data='folder'
										           list-type="picture-card"
										           :on-success="handleAvatarSuccess"
										           :before-upload="beforeAvatarUpload"
										           :on-remove="handleRemove">
											<i class="el-icon-plus"></i>
										</el-upload>
									</template>
								</el-table-column>
								<el-table-column label="状态"
								                 align="center">
									<template slot-scope="scope">
										<el-switch v-model="value3"
										           active-text="开"
										           inactive-text="关"
										           @change="switchChange">
										</el-switch>
									</template>
								</el-table-column>
								<el-table-column label="跳转地址"
								                 align="center">
									<template slot-scope="scope">
										<el-input v-model="input"
										          placeholder="请输入跳转地址"></el-input>
                                                  <!-- {{scope.row.id}} -->
									</template>
								</el-table-column>
									<el-table-column label="位置"
								                 align="center">
									<template slot-scope="scope">
										<el-input v-model="weightsout"
										          placeholder="请输入位置数值">{{scope.row.id}}</el-input>
                                        
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
				           @click="submitInfos">修改</el-button>
			</div>

		</el-dialog>
		<!-- 添加图片弹窗 -->
		<el-dialog title="添加图片"
		           :visible.sync="dialogVisible1"
		           width="70%">
			<div class="uploadFrom">
				<el-form :model="ruleForm"
				         :rules="rules"
				         ref="ruleForm"
				         label-width="100px"
				         class="demo-ruleForm">

					<el-form-item label="状态"
					              prop="is_user">
						<el-switch v-model="value3"
						           active-text="开"
						           inactive-text="关"
						           @change="switchChange">
						</el-switch>
					</el-form-item>
						<el-form-item label="位置"
					              prop="weights">
					<el-input v-model="ruleForm.weights" placeholder="请输入位置数值" style="width:5%;"></el-input><br />
					<span style="color:red">注释：‘1’代表第一位，‘2’代表第二位，以此类推</span>
					</el-form-item>
					<el-form-item label="跳转地址"
					              prop="upUrle">
						<el-input v-model="ruleForm.upUrle"
						          placeholder="请输入跳转地址"></el-input>

					</el-form-item>
					<el-form-item label="图标"
					              prop="picture">
						<el-upload :action="uploadUrl"
						           :data='folder'
						           list-type="picture-card"
						           :on-success="handleAvatarSuccess"
						           :before-upload="beforeAvatarUpload"
						           :on-remove="handleRemove">
							<i class="el-icon-plus"></i>
						</el-upload>
						<!-- <el-dialog :visible.sync="dialogVisible">
							<img width="100%"
							     :src="dialogImageUrl"
							     alt="">
						</el-dialog> -->
					</el-form-item>
					<el-form-item>
						<el-button type="primary"
						           @click="submitForm('ruleForm')">立即创建</el-button>
						<el-button @click="resetForm('ruleForm')">重置</el-button>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
		<!-- 分页 -->
		<div class="page">
			<el-pagination background
			               :page-size=10
			               @current-change="changepage"
			               layout="prev, pager, next"
			               :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
import setTime from '@/utils/time.js'
import { findAllBanner, addBanner } from "@/api/sys_user";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message, Checkbox } from "element-ui";
import treeTable from "@/components/TreeTable";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
// import api from "@/api/api.js";
export default {
	data() {
		return {
			weightsout:'',
			pageShow: true,
			tableData: [],
			total: 0,
			username: "",
			viewFormVisible: false,
			dialogVisible1: false,
			tableData3: [], //
			onePeople: {}, // 存选择的某一条数据
			activeNames: ["2"], //  折叠面板
			is_user: "",
			value1: "",
			value2: "",
			value3: true,
			value4: true,
			dialogImageUrl: "",
			dialogVisible2: false,
			imageUrl: '',
			ruleForm: {
				weights:'',
				name: "",
				is_user: "",
				picture: "",
				upUrle: '', //  跳转地址
			},
			rules: {
				name: [
					{ required: true, message: "请输入活动名称", trigger: "blur" },
					{ min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
				]
			},
			uploadUrl: "",//  图片上传接口
			fileUrl: '',
			options: [{
				value: '0',
				label: '当前未使用'
			}, {
				value: '1',
				label: '当前使用'
			},],
			value: '',
			render_url: '',  // 跳转地址
			folder: {
				folder: 'info'
			},
			input: '', //  修改跳转的地址

		}
	},
	filters: {
		type(a) {
			return a == "0" ? "未使用" : "使用中";
		},
		changeTime(b) {
			return setTime(b)
		}
	},

	computed: {},
	created() {
		this.getTable(1, this.value);
	},
	mounted() {
		// this.uploadUrl = api.member + '/userCount/uploadFile'
		this.uploadUrl = 'https://infos.api.qiyun88.cn/information/uploadImage'
	},

	methods: {
		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		handleAvatarSuccess(res, file) {
			console.log(res);
			// console.log(file)
			this.ruleForm.picture = res  //  添加支付的图片名
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
		submitForm(formName) {  //   添加 轮播图
			if (this.value3 == true) {
				this.ruleForm.is_user = 1;
			} else {
				this.ruleForm.is_user = 0;
			}
			let obj = {
				id: '',
				weights:this.ruleForm.weights,
				is_user: this.ruleForm.is_user,  //  是否使用
				picture: this.ruleForm.picture,  //  图片地址
				render_url: this.ruleForm.upUrle, //  跳转地址
			}
			console.log(obj)
			// addPaySwitch(obj).then(res=>{

			// })
			this.$refs[formName].validate(valid => {
				if (valid) {
					// alert("submit!");
					addBanner(obj).then(res => {
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
		//   ===================================================================
		showDailag() {
			//  添加图片
			this.dialogVisible1 = true;
		},
		switchChange() {
			//   console.log(this.value3)
			if (this.value3 == true) {
				this.is_user = 1;   //  使用
			} else {
				this.is_user = 0; //  不使用
			}
		},
		handleChange(val) {
			console.log(val);
		},
		getTable(curr, a) {  //   获取所有banner 列表

			let obj = {
				is_user: a,  //0 当前未使用,1当前使用
				page: curr,
				pageSize: 20
			}
			findAllBanner(obj).then(res => {
				console.log(res)
				if (res.data.error_code == 200) {
					this.tableData = res.data.data.list;
					this.total = res.data.data.total
				}
				console.log(res);
			});
		},
		selectChange() {   //select 选中回调
			this.getTable(1, this.value)
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
		submitInfos() {   //  修改轮播图
			if (this.value3 == true) {
				this.is_user = 1;
			} else {
				this.is_user = 0;
            }
            if(this.weightsout == ''){
                this.weightsout = this.onePeople.weights
            }
            if(this.fileUrl == ''){
                this.fileUrl = this.onePeople.picture
            }
            if(this.input == ''){
                this.input = this.onePeople.render_url
            }
			let obj = {
				id: this.onePeople.id,
				weights: this.weightsout,// 图片位置
				is_user: this.is_user,
				picture: this.fileUrl, //  图片地址
				render_url: this.input, // 图片跳转地址
			}
			addBanner(obj).then(res => {
				console.log(res)
				if (res.data.error_code == 200) {
					Message.success(res.data.message)
					this.viewFormVisible = false
					// this.findPaySwitch()
				} else {
					Message.success(res.data.message)
				}
			})
			console.log(obj);
		},
		clearForm() {
			//  取消按钮
			this.viewFormVisible = false;
		},
		// 分页的回调
		changepage(val) {
			this.getTable(val, this.value);
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.uploadFrom >>> .el-upload.el-upload--text {
  border: 1px dashed #d9d9d9 !important;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
img {
  width: 100%;
  height: 50px;
  /* height: 50px; */
}
</style>


