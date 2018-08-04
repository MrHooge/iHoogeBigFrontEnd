<template>
	<div class="addrepay">
		<el-button @click="addzf"
		           type="primary">
			添加线下支付
		</el-button>
		<!-- ***********添加支付信息的弹窗**-Start********** -->
		<el-dialog title=" 添加线下支付"
		           :visible.sync="dialogVisible"
		           width="70%"
		           top="15%">
			<!-- ==================================================================== -->
			<!-- <input type="file" name="upFile">
							 <button @click="upButn">上传</button> -->
			<!-- ==================================================================== -->
			<!-- 弹窗中间展示内容 -->
			<div class="uploadFrom">
				<el-form :model="ruleForm"
				         :rules="rules"
				         ref="ruleForm"
				         label-width="100px"
				         class="demo-ruleForm">
					<el-form-item label="支付名称"
					              prop="name">
						<el-input v-model="ruleForm.name"
						          id="upInput"></el-input>
					</el-form-item>
					<el-form-item label="图标"
					              prop="pay_picture">
						<!-- <el-input v-model="ruleForm.pay_picture"
						          type="file"
						          class="addBorder"></el-input> -->
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
		<!-- ***********添加支付信息的弹窗**-End********** -->
	</div>
</template>

<script>
import QYAPI from "../../../config/dev.env.js"
import { uploadImage, addPay } from "@/api/sys_user";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message, Checkbox } from "element-ui";
import treeTable from "@/components/TreeTable";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
export default {
	data() {
		return {
			input: "", // 保存输入的姓名
			dialogVisible: false, // 添加支付对应的弹窗
			radio: "zfb", //保存选择的支付方式
			imurl: "", //图片上传的地址
			imageUrl: "",//图片地址,
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
				folder: 'info'
			}
		};
	},
	mounted() {
		// this.uploadUrl = api.member + '/userCount/uploadFile'
		this.uploadUrl = 'https://infos.api.qiyun88.cn/information/uploadImage'
	},
	methods: {

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
				name: this.ruleForm.name,
				type: this.ruleForm.radio
			};
			console.log(obj)

			this.$refs[formName].validate(valid => {
				if (valid) {
					// alert("submit!");
					addPay(obj).then(res => {
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
		// =============================================
		// 添加线下支付的事件回调
		addzf() {
			this.dialogVisible = true;
		},


	}
};
</script>

<style scoped>
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
.el-upload--text {
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
  display: block;
}
p.name {
  padding: 40px 0;
  line-height: 33px;
}
.zhifu {
  line-height: 33px;
}
</style>