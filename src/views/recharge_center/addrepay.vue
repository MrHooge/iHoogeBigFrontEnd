<template>
	<div class="addrepay">
		<el-button @click="addzf"
		           type="primary">
			添加线下支付
		</el-button>
		<!-- ***********添加支付信息的弹窗**-Start********** -->
		<el-dialog title=" 添加线下支付"
		           :visible.sync="dialogVisible"
		           width="510px"
		           top="15%">
			<!-- 弹窗中间展示内容 -->
			<div class="layercontent">
				<!-- 第一行图片 -->
				<div class="oneimg">
					<el-row :gutter="20">
						<el-col :span="4">
							<div class="grid-content bg-purple">
								图片：
							</div>
						</el-col>
						<!-- <el-col :span="6">
							<div class="grid-content bg-purple">
								<div class="showimg">
									一张图片
								</div>
							</div>
						</el-col> -->
						<el-col :span="12">
							<div class="grid-content bg-purple">
								<!-- <el-upload
                        class="avatar-uploader"
                        :action="imurl"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload> -->
								<el-upload :action="imurl"
								           list-type="picture-card"
								           :on-success="handleAvatarSuccess"
								           :before-upload="beforeAvatarUpload"
								           :on-remove="handleRemove">
									<i class="el-icon-plus"></i>
								</el-upload>
							</div>
						</el-col>
					</el-row>
				</div>
				<!-- 人物名字 -->
				<p class="name">
					<el-row :gutter="20">
						<el-col :span="4">
							<div class="grid-content bg-purple">
								名字：
							</div>
						</el-col>
						<el-col :span="18">
							<div class="grid-content bg-purple">
								<el-input v-model="input"
								          placeholder="请输入姓名"></el-input>
							</div>
						</el-col>
					</el-row>
				</p>
				<!-- 支付类型 -->
				<div class="zhifu">
					<el-row :gutter="20">
						<el-col :span="4">
							<div class="grid-content bg-purple">
								类型：
							</div>
						</el-col>
						<el-col :span="18">
							<div class="grid-content bg-purple">
								<div>
									<el-radio v-model="radio"
									          label="zfb"
									          border>支付宝</el-radio>
									<el-radio v-model="radio"
									          label="wx"
									          border>微信</el-radio>
								</div>
							</div>
						</el-col>
					</el-row>
				</div>
			</div>
			<span slot="footer"
			      class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary"
				           @click="confirmto">确 定</el-button>
			</span>
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
			imurl: "https://member.api.qiyun88.cn/userCount/uploadFile", //图片上传的地址
			imageUrl: "" //图片地址
		};
	},
	methods: {

		handleRemove(file, fileList) {
			console.log(file, fileList);
		},
		handleAvatarSuccess(res, file) {
			console.log(res);
			// console.log(file)
			this.imageUrl = res  //  添加支付的图片名
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
		resetForm(formName) {
			this.$refs[formName].resetFields();
		},
		// 添加线下支付的事件回调
		addzf() {
			this.dialogVisible = true;
		},
		// 弹窗的确定回调
		confirmto() {
			//获取输入的姓名
			let obj = {
				QRCode: this.imageUrl,
				name: this.input,
				type: this.radio
			};
			console.log(obj);
			// addPay(obj).then(res => {
			// 	console.log(res)
			// })
			// this.$http.get(api.pay + "/xxPay/add", { params: obj }).then(res => {
			//   if (res.status == 200) {

			//   }
			// });
		},
		// 上传成功回调
		// handleAvatarSuccess() {

		// }
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
  border: 1px dashed #ddd;
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
.oneimg >>> .el-upload--text {
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