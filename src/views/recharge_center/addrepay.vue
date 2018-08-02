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
			<!-- 弹窗中间展示内容 -->
			<div class="uploadFrom">
				<el-form :model="ruleForm"
				         :rules="rules"
				         ref="ruleForm"
				         label-width="100px"
				         class="demo-ruleForm">
					<el-form-item label="支付名称"
					              prop="name">
						<el-input v-model="ruleForm.name"></el-input>
					</el-form-item>
					<el-form-item label="图标"
					              prop="pay_picture">
						<el-input v-model="ruleForm.pay_picture"
						          type="file"
						          class="addBorder"></el-input>
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
import { addPay } from "@/api/sys_user";
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
			imageUrl: "",//图片地址
			ruleForm: {
				name: "",
				is_open: "",
				pay_picture: "",
				radio:''
			},
			rules: {
				name: [
					{ required: true, message: "请输入活动名称", trigger: "blur" },
					{ min: 1, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
				]
			},
			uploadUrl: "",//  图片上传接口
			fileUrl: ''
		};
	},
	methods: {
		// 添加线下支付的事件回调
		addzf() {
			this.dialogVisible = true;
		},
		// 弹窗的确定回调
		confirmto() {
			//获取输入的姓名
			let obj = {
				QRCode: "",
				name: this.input,
				type: this.radio
			};
			console.log(obj);
			addPay().then(res => {
				console.log(res)
			})
			// this.$http.get(api.pay + "/xxPay/add", { params: obj }).then(res => {
			// 	if (res.status == 200) {

			// 	}
			// });
		},
		// 上传成功回调
		handleAvatarSuccess() {

		}
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