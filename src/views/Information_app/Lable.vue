<template>
    <div class="effectiveagent">
<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <el-form-item label="账号" prop="name">
    <el-input v-model="ruleForm.name" class="input_width" clearable></el-input>
  </el-form-item>
  <el-form-item label="标签" prop="type">
    <el-checkbox-group v-model="ruleForm.type">
      <el-checkbox label="博彩玩家" name="type"></el-checkbox>
      <el-checkbox label="足彩分析师" name="type"></el-checkbox>
      <el-checkbox label="竞彩分析师" name="type"></el-checkbox>
      <el-checkbox label="实战名家" name="type"></el-checkbox>
    </el-checkbox-group>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
    <el-button @click="resetForm('ruleForm')">重置</el-button>
  </el-form-item>
</el-form>
   </div>
</template>

<script>
import { addLabel } from "@/api/personal_review.js";

export default {
  data() {
    return {
      ruleForm: {
        name: "",
        type: []
      },
      rules: {
        name: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 1, max: 10, message: "长度1-10个", trigger: "blur" }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个标签",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let obj = {
            account: this.ruleForm.name,
            label: this.ruleForm.type.join(",")
          };
          addLabel(obj).then(res => {
            if (res.data.error_code == 200) {
              this.$message.success(res.data.message);
              this.resetForm("ruleForm");
            } else {
              this.$message.error(res.data.message);
            }
          });
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.effectiveagent {
  padding: 10px 25px;
}
.input_width {
  width: 220px;
}
</style>