<template>
    <div class="backend app-container">
        <div class="layerbody">
            <div class="main" style="width:80%;margin: 0 auto;">
                <el-form :label-position="labelPosition" label-width="280px" :model="formLabelAlign">
                    <el-form-item label="充值比例">
                        <el-input v-model="formLabelAlign.recharge" style="width:45%;margin-right:20px;"></el-input>
                        <el-button type="primary" @click="modifyDialog('recharge')">修改</el-button>
                    </el-form-item>
                    <el-form-item label="100-200赠送比例">
                        <el-input v-model="formLabelAlign.rechargeGiftStart" style="width:45%;margin-right:20px;"></el-input>
                        <el-button type="primary" @click="modifyDialog('rechargeGiftStart')">修改</el-button>
                    </el-form-item>
                    <el-form-item label="充值每100元增加的赠送比例">
                        <el-input v-model="formLabelAlign.rechargeGift" style="width:45%;margin-right:20px;"></el-input>
                        <el-button type="primary" @click="modifyDialog('rechargeGift')">修改</el-button>
                    </el-form-item>
                    <el-form-item label="围观收益比例">
                        平台:<el-input v-model="lookers.platform" style="width:11%;"></el-input>
                        回答者:<el-input v-model="lookers.answer" style="width:11%;"></el-input>
                        提问者:<el-input v-model="lookers.quizzer" style="width:11%;"></el-input>
                        <el-button type="primary" @click="modifyDialog('onlookers')" style="margin-left:20px;">修改</el-button>
                    </el-form-item>
                    <el-form-item label="购买方案平台抽成">
                        <el-input v-model="formLabelAlign.buyOrder" style="width:45%;margin-right:20px;"></el-input>
                        <el-button type="primary" @click="modifyDialog('buyOrder')">修改</el-button>
                    </el-form-item>
                    <el-form-item label="提问抽成">
                        <el-input v-model="formLabelAlign.quiz" style="width:45%;margin-right:20px;"></el-input>
                        <el-button type="primary" @click="modifyDialog('quiz')">修改</el-button>
                    </el-form-item>
                    <el-form-item label="提现抽成">
                        <el-input v-model="formLabelAlign.withdraw" style="width:45%;margin-right:20px;"></el-input>
                        <el-button type="primary" @click="modifyDialog('withdraw')">修改</el-button>
                    </el-form-item>
                    <el-form-item label="围观云豆数量">
                        <el-input v-model="formLabelAlign.onlook" style="width:45%;margin-right:20px;"></el-input>
                        <el-button type="primary" @click="modifyDialog('onlook')">修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <!-- 弹窗事件 -->
        <el-dialog :title="dialogTitle"
		           :visible.sync="dialogVisible"
		           width="40%">
			<span slot="footer"
			      class="dialog-footer">
                  <el-button @click="dialogVisible = false" type="primary">取消</el-button>
				<el-button @click="modifySure()" type="success">确定</el-button>
			</span>
		</el-dialog>
    </div>
</template>

<script>
import { getProportion, modifyProportion } from "@/api/personal_review.js";
import { Message } from "element-ui";
export default {
  data() {
    return {
      labelPosition: "right",
      formLabelAlign: {
        buyOrder: "", //购买方案平台抽成
        id: "",
        onlook: "", //围观云豆数量
        onlookers: "", //围观收益比例
        quiz: "", //提问抽成
        recharge: "", //充值比例
        rechargeGift: "", //充值每100元增加的赠送比例
        rechargeGiftStart: "", //100-200赠送比例
        withdraw: "" //提现抽成
      },
      //围观收益比例
      lookers: {
        platform: "", //平台
        answer: "", //回答者
        quizzer: "" //提问者
      },
      dialogTitle: "确认修改充值比例",
      dialogVisible: false,
      type: "" //修改的类型
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //获取评论列表
    getData() {
      getProportion().then(res => {
        if (res.data.error_code === 200) {
          this.formLabelAlign = res.data.data;
          let arr = [];
          arr = res.data.data.onlookers.split(",");
          this.lookers.platform = arr[0];
          this.lookers.answer = arr[1];
          this.lookers.quizzer = arr[2];
        } else {
          this.$message.error(res.data.message);
        }
      });
    },
    //修改弹窗
    modifyDialog(val) {
      this.dialogVisible = true;
      if (val === "recharge") {
        //充值比例
        this.dialogTitle = "确认修改充值比例";
        this.number = this.formLabelAlign.recharge;
        this.type = 1;
      } else if (val === "rechargeGiftStart") {
        //100-200赠送比例
        this.dialogTitle = "确认修改100-200赠送比例";
        this.number = this.formLabelAlign.rechargeGiftStart;
        this.type = 2;
      } else if (val === "rechargeGift") {
        //充值每100元增加的赠送比例
        this.dialogTitle = "确认修改充值每100元增加的赠送比例";
        this.number = this.formLabelAlign.rechargeGift;
        this.type = 3;
      } else if (val === "onlookers") {
        //围观收益比例 (平台,回答者,提问者)
        this.dialogTitle = "确认修改围观收益比例";
        let arr = [];
        arr[0] = this.lookers.platform;
        arr[1] = this.lookers.answer;
        arr[2] = this.lookers.quizzer;
        this.formLabelAlign.onlookers = arr.join(",");
        this.number = this.formLabelAlign.onlookers;
        this.type = 4;
      } else if (val === "buyOrder") {
        //购买方案平台抽成
        this.dialogTitle = "确认修改购买方案平台抽成";
        this.number = this.formLabelAlign.buyOrder;
        this.type = 5;
      } else if (val === "quiz") {
        //提问抽成
        this.dialogTitle = "确认修改提问抽成";
        this.number = this.formLabelAlign.quiz;
        this.type = 6;
      } else if (val === "withdraw") {
        //提现抽成
        this.dialogTitle = "确认修改提现抽成";
        this.number = this.formLabelAlign.withdraw;
        this.type = 7;
      } else if (val === "onlook") {
        //围观云豆数量
        this.dialogTitle = "确认修改围观云豆数量";
        this.number = this.formLabelAlign.onlook;
        this.type = 8;
      }
    },
    //确认修改
    modifySure() {
      let obj = {
        number: this.number,
        type: this.type
      };
      modifyProportion(obj).then(res => {
        console.log(res);
        if (res.data.error_code === 200) {
          this.$message.success(res.data.message);
          this.dialogVisible = false;
        } else {
          this.$message.error(res.data.message);
          this.dialogVisible = false;
        }
      });
    }
  }
};
</script>

<style scoped>
.main {
  padding-top: 30px;
}
.backend >>> .el-dialog__header {
  text-align: center;
}
.backend >>> .el-dialog__footer {
  text-align: center;
}
.backend >>> .el-button--default {
  background: #e25550;
  color: #fff;
}
.backend >>> .el-tag {
  background: #31b0d5;
  color: #fff;
}
</style>
