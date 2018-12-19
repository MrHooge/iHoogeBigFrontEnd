<template>
	<div class="app-container">
		<el-row>
			<el-button type="primary"
			           @click="showDailag">添加支付</el-button>

		</el-row>
		<!-- <el-button v-waves
		           type="primary"
		           @click="showDailag">上传图片</el-button> -->
		<!--    支付 开 停 操作 -->
		<!-- <div class="search">
			<el-input v-model="username"
			          style="width:300px;"
			          placeholder="请输入用户账号进行筛选" clearable></el-input>
		</div> -->
		<el-table :data="tableData" border style="width: 100%; margin-top: 20px">
			<el-table-column label="编号" align="center" type="index" width="120px">
			</el-table-column>
			<el-table-column prop="pay_name" align="center" label="类型">
			</el-table-column>
			<el-table-column label="状态" align="center">
				<template slot-scope="scope">
					{{scope.row.is_open | type}}
				</template>
			</el-table-column>
			<el-table-column align="center"
			                 label="图片">
				<template slot-scope="scope">
					<img :src="scope.row.pay_picture"
					     alt="">
				</template>
			</el-table-column>
			<el-table-column align="center" width="220px;" label="操作">
				<template slot-scope="scope">
					<el-button type="primary"
					           @click="handleEdit(scope.row, 'modify')">支付修改</el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 弹窗 -->
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
				<el-table-column label="支付名称" align="center">
					<template slot-scope="scope">{{ scope.row.pay_name }}</template>
				</el-table-column>
				<el-table-column label="图标"
				                 align="center">
					<template slot-scope="scope"><img :src="scope.row.pay_picture"
						     alt=""></template>
				</el-table-column>
				<el-table-column label="状态" align="center">
					<template slot-scope="scope">{{ scope.row.is_open | type}}</template>
				</el-table-column>
			</el-table>
			<!--   修改支付 -->
			<div class="pierce">
				<el-collapse v-model="activeNames"
				             @change="handleChange">
					<el-collapse-item title="修改支付"
					                  name="1">
						<div>
							<el-table :data="tableData3" border tooltip-effect="dark" style="width: 100%">
								<el-table-column label="ID" align="center">
									<template slot-scope="scope">
										{{ scope.row.id}}
									</template>
								</el-table-column>
								<el-table-column label="支付名称" align="center">
									<template slot-scope="scope">
										<el-input v-model="rechangeName"
										          placeholder="请输入内容" clearable>
                                        </el-input>
									</template>
								</el-table-column>
								<el-table-column
                                    label="图标"
								    align="center">
									<template slot-scope="scope">
										<el-upload :action="uploadUrl"
                               :data="folder"
										           list-type="picture-card"
										           :on-success="handleAvatarSuccess"
										           :before-upload="beforeAvatarUpload"
										           :on-remove="handleRemove">
											<i class="el-icon-plus"></i>
										</el-upload>
									</template>
								</el-table-column>
								<el-table-column label="状态" align="center">
									<template slot-scope="scope">
										<el-switch v-model="value3" active-text="开" inactive-text="关" @change="switchChange"></el-switch>
									</template>
								</el-table-column>
							</el-table>
						</div>
					</el-collapse-item>
				</el-collapse>
			</div>
			<div slot="footer" class="dialog-footer">
				<el-button @click="clearForm">取 消</el-button>
				<el-button type="primary" @click="submitInfos">修改支付</el-button>
			</div>
		</el-dialog>
		<!-- 添加图片弹窗 -->
		<el-dialog title="添加图片"
		           :visible.sync="dialogVisible1"
		           width="70%">
			<div class="uploadFrom">
				<el-form 
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    label-width="100px"
                    class="demo-ruleForm">
					<el-form-item label="支付名称" prop="name">
						<el-input v-model="ruleForm.name" clearable></el-input>
					</el-form-item>
					<el-form-item label="状态"
					              prop="is_open">
						<el-switch v-model="value3"
						           active-text="开"
						           inactive-text="关"
						           @change="switchChange">
						</el-switch>
					</el-form-item>
					<el-form-item label="图标"
					              prop="pay_picture">
						<el-upload :action="uploadUrl"
                       :data="folder"
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
	</div>
</template>
<script>
import { findPaySwitch, addPaySwitch } from "@/api/sys_user";
import waves from "@/directive/waves/index.js"; // 水波纹指令
import { Message, Checkbox } from "element-ui";
import treeTable from "@/components/TreeTable";
import { getCookies, setCookies, removeCookies } from "@/utils/cookies";
// import api from "@/api/api.js";
export default {
  data() {
    return {
      pageShow: true,
      tableData: [],
      total: 0,
      username: "",
      viewFormVisible: false,
      dialogVisible1: false,
      tableData3: [], //
      onePeople: {}, // 存选择的某一条数据
      rechangeName: "", //  修改支付的名称
      activeNames: ["2"], //  折叠面板
      is_open: "",
      value1: "",
      value2: "",
      value3: true,
      value4: true,
      dialogImageUrl: "",
      dialogVisible2: false,
      imageUrl: "",
      ruleForm: {
        name: "",
        is_open: "",
        pay_picture: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 1, max: 10, message: "长度在 1 到 10 个字符", trigger: "blur" }
        ]
      },
      uploadUrl: "", //  图片上传接口
      fileUrl: "",


      folder:{
        folder:"pay"
      }
    };
  },
  filters: {
    type(a) {
      return a == "0" ? "关闭" : "开启";
    }
  },

  computed: {},
  created() {
    this.getTable();
  },
  mounted() {
    // this.uploadUrl = api.member + '/userCount/uploadFile'
    // this.uploadUrl = "https://member.api.qiyun88.cn/userCount/uploadFile";
    this.uploadUrl = "https://infos.api.qyun88.com/information/uploadImage";
  },

  methods: {
    handleRemove(file, fileList) {
      // console.log(file, fileList);
    },
    handleAvatarSuccess(res, file) {
      this.ruleForm.pay_picture = res; //  添加支付的图片名
      this.fileUrl = res; //  修改支付的图片名
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const JPGArr = ["image/jpg", "image/jpeg", "image/png", "image/gif"];
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
    submitForm(formName) {
      //   添加支付
      if (this.value3 == true) {
        this.ruleForm.is_open = 1;
      } else {
        this.ruleForm.is_open = 0;
      }
      let obj = {
        id: 1,
        is_update: 0,
        pay_name: this.ruleForm.name,
        is_open: this.ruleForm.is_open,
        pay_picture: this.ruleForm.pay_picture
      };
      console.log(obj);
      // addPaySwitch(obj).then(res=>{

      // })
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!");
          addPaySwitch(obj).then(res => {
            console.log(res);
            if (res.data.error_code == 200) {
              Message.success(res.data.message);
              this.dialogVisible1 = false;
              this.getTable()
            } else {
              Message.success(res.data.message);
            }
          });
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

        // this.is_open=''
        // this.rechangeName=''
        // this.fileUrl=''
        this.ruleForm.name = ''
        // this.ruleForm.pay_picture = ""
    },
    switchChange() {
      //   console.log(this.value3)
      if (this.value3 == true) {
        this.is_open = 1;
      } else {
        this.is_open = 0;
      }
    },
    handleChange(val) {
      console.log(val);
    },
    getTable() {
      //   获取所有会员列表
      findPaySwitch().then(res => {
        console.log(res);
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
        console.log(this.tableData3);
      this.onePeople = obj;
      //   console.log(this.onePeople);
      this.rechangeName = ""
      // this.ruleForm.pay_picture = ""
    },
    submitInfos() {
      //  修改支付
      if (this.value3 == true) {
        this.is_open = 1;
      } else {
        this.is_open = 0;
      }
      let obj = {
        id: this.onePeople.id,
        is_open: this.is_open,
        is_update: 1,
        pay_name: this.rechangeName,
        pay_picture: this.fileUrl
      };
      console.log(obj.pay_name == "")
      console.log(obj.pay_picture == "")
      //如果操作者只是想修改其中一个内容，其他为空的默认传入原先的数据
      if(obj.pay_name == ""){
        obj.pay_name = this.tableData3[0].pay_name
      }
      if(obj.pay_picture == ""){
        obj.pay_picture = this.tableData3[0].pay_picture
      }
      addPaySwitch(obj).then(res => {
        if (res.data.error_code == 200) {
          Message.success(res.data.message);
          this.viewFormVisible = false;
          this.rechangeName = "";
          this.getTable();
        } else {
          Message.success(res.data.message);
        }
      });
      
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
  width: 50px;
  height: 50px;
}
</style>
